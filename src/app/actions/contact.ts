'use server'

import { createHash } from 'node:crypto'
import { headers } from 'next/headers'
import { Resend } from 'resend'
import { z } from 'zod'
import ContactNotification from '@/emails/ContactNotification'
import {
  CONTACT_FIELDS,
  LIMITS,
  cleanContactInput,
  contactSchema,
  type ContactField,
  type ContactFieldErrors,
  type ContactState,
} from '@/lib/contact-schema'
import { issueToken, verifyToken, TOKEN_MAX_AGE_MS } from '@/lib/contact/form-token'
import { hit, hitAll, markUsedOnce, releaseUsed } from '@/lib/contact/rate-limit'
import { SITE_URL } from '@/lib/site'

/*
 * Contact form security, in order:
 *  1. Same-origin only: Next.js rejects cross-origin Server Action calls; requests without an Origin header are rejected here.
 *  2. Request size: the Server Action body is capped (next.config.ts), and every field has a hard length cap.
 *  3. Honeypot field and a signed, time-limited, single-use form token (see lib/contact/form-token.ts).
 *  4. Rate limits per IP, per sender address and for the whole site (see lib/contact/rate-limit.ts).
 *  5. Strict validation after Unicode normalization; control/invisible characters stripped; limited links; no HTML.
 *  6. The email body is rendered by React (escaped), and single-line values can't contain line breaks.
 *  Logs never contain the visitor's message or the API key; IPs and addresses are stored only as hashes.
 */

const FAKE_SUCCESS: ContactState = { status: 'success', message: 'Thanks! Your message has been sent.' }
const GENERIC_ERROR = 'Sorry, your message could not be sent. Please try again or reach out on LinkedIn.'

/**
 * Reads an env var defensively. Vercel stores values literally, so a value pasted with quotes
 * (e.g. "Portfolio <contact@example.com>") would keep them and Resend would reject the address.
 */
function env(name: string) {
  const value = process.env[name]?.trim().replace(/^(['"])(.*)\1$/, '$2').trim()
  return value || undefined
}

/** Accepts "Name <email>" or a bare email; a bare email gets a friendly sender name. */
function senderAddress(from: string) {
  return /<[^<>\s]+@[^<>\s]+>$/.test(from) ? from : `Portfolio <${from}>`
}

const domainOf = (address: string) => address.match(/@([^>\s]+)/)?.[1] ?? '(none)'

/** Short, non-reversible identifier for rate-limit keys (no raw IPs or emails are stored). */
const fingerprint = (value: string) => createHash('sha256').update(`contact:${value}`).digest('base64url').slice(0, 22)

async function requestInfo() {
  const h = await headers()
  // On Vercel, x-real-ip / x-forwarded-for are set by the platform edge and can't be spoofed by the client.
  const ip = h.get('x-real-ip')?.trim() || h.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  return { ip: fingerprint(ip), origin: h.get('origin'), fetchSite: h.get('sec-fetch-site') }
}

function waitMessage(seconds: number) {
  const minutes = Math.ceil(seconds / 60)
  return minutes >= 60
    ? 'You have reached the daily message limit. Please try again tomorrow or reach out on LinkedIn.'
    : `Too many messages in a short time. Please try again in ${minutes} minute${minutes === 1 ? '' : 's'}.`
}

/** Issues a contact-form token. Called by the form when the visitor first interacts with it. */
export async function getContactToken(): Promise<string | null> {
  const { ip, origin } = await requestInfo()
  if (!origin) return null
  const limit = await hit('tokensPerIp', ip)
  return limit.ok ? issueToken() : null
}

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // ---- 1. Origin and raw input shape -------------------------------------------------------
  const { ip, origin, fetchSite } = await requestInfo()
  if (!origin || (fetchSite && fetchSite !== 'same-origin')) return { status: 'error', message: GENERIC_ERROR }

  const raw = {} as Record<ContactField, string>
  for (const field of CONTACT_FIELDS) {
    const value = formData.get(field) ?? ''
    // Reject files and absurdly long values before doing any other work.
    if (typeof value !== 'string' || value.length > LIMITS.rawField) return { status: 'error', message: GENERIC_ERROR }
    raw[field] = value
  }
  const honeypot = formData.get('website')
  const token = formData.get('token')

  // ---- 2. Bot traps ------------------------------------------------------------------------
  // A filled honeypot means a bot: pretend it worked so it doesn't adapt.
  if (typeof honeypot !== 'string' || honeypot.length > 0) return FAKE_SUCCESS

  const attempts = await hit('attemptsPerIp', ip)
  if (!attempts.ok) return { status: 'error', message: waitMessage(attempts.retryAfterSec), values: raw }

  const check = verifyToken(typeof token === 'string' ? token : null)
  if (!check.ok) {
    if (check.reason === 'too-fast' || check.reason === 'bad-signature' || check.reason === 'malformed') return FAKE_SUCCESS
    return { status: 'error', message: 'Your session expired. Please press send again.', values: raw }
  }

  // ---- 3. Validation -------------------------------------------------------------------------
  const cleaned = cleanContactInput(raw)
  const parsed = contactSchema.safeParse(cleaned)
  if (!parsed.success) {
    const flat = z.flattenError(parsed.error).fieldErrors as Record<string, string[] | undefined>
    const fieldErrors: ContactFieldErrors = {}
    for (const f of CONTACT_FIELDS) if (flat[f]?.[0]) fieldErrors[f] = flat[f]![0]
    return { status: 'error', message: 'Please fix the highlighted fields.', fieldErrors, values: cleaned }
  }
  const data = parsed.data

  // ---- 4. Send limits --------------------------------------------------------------------------
  const limit = await hitAll([
    ['sendsPerIpShort', ip],
    ['sendsPerIpDay', ip],
    ['sendsPerEmailDay', fingerprint(data.email)],
    ['sendsGlobalDay', 'site'],
  ])
  if (!limit.ok) return { status: 'error', message: waitMessage(limit.retryAfterSec), values: cleaned }

  // Each token sends at most one email (released again below if sending fails, so the visitor can retry).
  const tokenKey = `token:${check.nonce}`
  if (!(await markUsedOnce(tokenKey, Math.ceil(TOKEN_MAX_AGE_MS / 1000)))) return FAKE_SUCCESS

  // ---- 5. Send -----------------------------------------------------------------------------------
  const RESEND_API_KEY = env('RESEND_API_KEY')
  const CONTACT_TO_EMAIL = env('CONTACT_TO_EMAIL')
  const CONTACT_FROM_EMAIL = env('CONTACT_FROM_EMAIL')
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    const missing = Object.entries({ RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL })
      .filter(([, v]) => !v)
      .map(([k]) => k)
    console.error(`[contact] Missing environment variables: ${missing.join(', ')} (set them in Vercel, then redeploy)`)
    await releaseUsed(tokenKey)
    return { status: 'error', message: 'The contact form is temporarily unavailable. Please reach out on LinkedIn instead.', values: cleaned }
  }

  const sentAt = new Date().toUTCString()
  const company = data.company || undefined
  const from = senderAddress(CONTACT_FROM_EMAIL)
  const resend = new Resend(RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from,
    to: CONTACT_TO_EMAIL,
    replyTo: data.email,
    subject: `Portfolio contact: ${data.name}${company ? ` (${company})` : ''}`.slice(0, 200),
    react: ContactNotification({ name: data.name, email: data.email, company, message: data.message, sentAt, siteUrl: SITE_URL }),
    text: [`New message from ${data.name} <${data.email}>`, company ? `Company: ${company}` : '', `Sent: ${sentAt}`, '', data.message]
      .filter(Boolean)
      .join('\n'),
    tags: [{ name: 'source', value: 'portfolio-contact' }],
  })

  if (error) {
    // Shows up in Vercel → Logs. Never logs the API key or the visitor's message.
    console.error(
      `[contact] Resend rejected the email: ${error.name} – ${error.message} ` +
        `(from domain: ${domainOf(from)}, to domain: ${domainOf(CONTACT_TO_EMAIL)}, key: ${RESEND_API_KEY.slice(0, 3)}…${RESEND_API_KEY.length} chars)`,
    )
    await releaseUsed(tokenKey)
    return { status: 'error', message: GENERIC_ERROR, values: cleaned }
  }

  return { status: 'success', message: `Thanks, ${data.name.split(' ')[0]}! Your message is on its way. I'll get back to you soon.` }
}
