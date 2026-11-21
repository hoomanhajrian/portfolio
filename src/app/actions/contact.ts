'use server'

import { headers } from 'next/headers'
import { Resend } from 'resend'
import { z } from 'zod'
import ContactNotification from '@/emails/ContactNotification'
import { contactSchema, MIN_FILL_MS, type ContactFieldErrors, type ContactState } from '@/lib/contact-schema'
import { SITE_URL } from '@/lib/site'

// Best-effort per-instance rate limit (serverless instances don't share memory, so this only slows down floods).
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(key: string) {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(key, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > MAX_PER_WINDOW
}

const FIELDS = ['name', 'email', 'company', 'message'] as const

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

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const raw = Object.fromEntries(FIELDS.map((f) => [f, String(formData.get(f) ?? '')]))
  const values = raw as Record<(typeof FIELDS)[number], string>

  const parsed = contactSchema.safeParse({
    ...raw,
    website: String(formData.get('website') ?? ''),
    startedAt: formData.get('startedAt'),
  })

  if (!parsed.success) {
    const flat = z.flattenError(parsed.error).fieldErrors as Record<string, string[] | undefined>
    // A filled honeypot or a missing timestamp means a bot: pretend it worked.
    if (flat.website || flat.startedAt) return { status: 'success', message: 'Thanks! Your message has been sent.' }
    const fieldErrors: ContactFieldErrors = {}
    for (const f of FIELDS) if (flat[f]?.[0]) fieldErrors[f] = flat[f]![0]
    return { status: 'error', message: 'Please fix the highlighted fields.', fieldErrors, values }
  }

  const data = parsed.data
  if (Date.now() - data.startedAt < MIN_FILL_MS) {
    return { status: 'success', message: 'Thanks! Your message has been sent.' }
  }

  const h = await headers()
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown'
  if (rateLimited(ip)) {
    return { status: 'error', message: 'Too many messages in a short time. Please try again in a few minutes.', values }
  }

  const RESEND_API_KEY = env('RESEND_API_KEY')
  const CONTACT_TO_EMAIL = env('CONTACT_TO_EMAIL')
  const CONTACT_FROM_EMAIL = env('CONTACT_FROM_EMAIL')
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    const missing = Object.entries({ RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL })
      .filter(([, v]) => !v)
      .map(([k]) => k)
    console.error(`[contact] Missing environment variables: ${missing.join(', ')} (set them in Vercel, then redeploy)`)
    return { status: 'error', message: 'The contact form is temporarily unavailable. Please reach out on LinkedIn instead.', values }
  }

  const sentAt = new Date().toUTCString()
  const company = data.company || undefined
  const resend = new Resend(RESEND_API_KEY)
  const from = senderAddress(CONTACT_FROM_EMAIL)
  const { error } = await resend.emails.send({
    from,
    to: CONTACT_TO_EMAIL,
    replyTo: data.email,
    subject: `Portfolio contact: ${data.name}${company ? ` (${company})` : ''}`,
    react: ContactNotification({ name: data.name, email: data.email, company, message: data.message, sentAt, siteUrl: SITE_URL }),
    text: [`New message from ${data.name} <${data.email}>`, company ? `Company: ${company}` : '', `Sent: ${sentAt}`, '', data.message].filter(Boolean).join('\n'),
    tags: [{ name: 'source', value: 'portfolio-contact' }],
  })

  if (error) {
    // Shows up in Vercel → Logs. Never logs the API key or the visitor's message.
    console.error(
      `[contact] Resend rejected the email: ${error.name} – ${error.message} ` +
        `(from domain: ${domainOf(from)}, to domain: ${domainOf(CONTACT_TO_EMAIL)}, key: ${RESEND_API_KEY.slice(0, 3)}…${RESEND_API_KEY.length} chars)`,
    )
    return { status: 'error', message: 'Sorry, your message could not be sent. Please try again or reach out on LinkedIn.', values }
  }

  return { status: 'success', message: `Thanks, ${data.name.split(' ')[0]}! Your message is on its way. I'll get back to you soon.` }
}
