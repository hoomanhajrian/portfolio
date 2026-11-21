import { z } from 'zod'

/**
 * Contact form rules, shared by the browser (input limits) and the server (the real validation).
 * Never trust the browser: the server re-checks everything below.
 */
export const LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  company: { max: 100 },
  message: { min: 20, max: 3000 },
  /** Hard cap for any raw field before parsing; anything longer is rejected outright. */
  rawField: 6000,
  maxLinks: 3,
} as const

export type ContactField = 'name' | 'email' | 'company' | 'message'
export const CONTACT_FIELDS: ContactField[] = ['name', 'email', 'company', 'message']

// Invisible characters used to disguise spam or spoof text direction (zero-width, bidi overrides, BOM).
const INVISIBLE = /[­​-‏‪-‮⁠-⁤⁦-⁩﻿]/g
// ASCII control characters except tab/newline/carriage return.
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g

/** Normalizes untrusted text: Unicode NFKC, no invisible/control characters, tidy whitespace. */
export function cleanText(value: string, { multiline = false } = {}) {
  let s = value.normalize('NFKC').replace(INVISIBLE, '').replace(CONTROL, '')
  if (multiline) {
    s = s
      .replace(/\r\n?/g, '\n')
      .replace(/\t/g, '  ')
      .replace(/[  ]+\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
  } else {
    // Single-line fields must never carry line breaks (they end up in the email subject).
    s = s.replace(/[\r\n\t]+/g, ' ').replace(/\s{2,}/g, ' ')
  }
  return s.trim()
}

const LINK = /\b(?:https?:\/\/|www\.)\S+/gi
const countLinks = (s: string) => s.match(LINK)?.length ?? 0
const looksLikeLinkOrMarkup = (s: string) => /https?:\/\/|www\.|<|>/i.test(s)

export const contactSchema = z.object({
  name: z
    .string()
    .min(LIMITS.name.min, 'Please enter your name.')
    .max(LIMITS.name.max, `Name is too long (${LIMITS.name.max} characters max).`)
    .regex(/^[\p{L}\p{M}][\p{L}\p{M}\s'’.,-]*$/u, 'Please use letters only for your name.'),
  email: z
    .string()
    .max(LIMITS.email.max, 'Email is too long.')
    .pipe(z.email('Please enter a valid email address.')),
  company: z
    .string()
    .max(LIMITS.company.max, `Company name is too long (${LIMITS.company.max} characters max).`)
    .refine((s) => !looksLikeLinkOrMarkup(s), 'Please enter the company name without links.'),
  message: z
    .string()
    .min(LIMITS.message.min, `Message should be at least ${LIMITS.message.min} characters.`)
    .max(LIMITS.message.max, `Message is too long (${LIMITS.message.max.toLocaleString('en-US')} characters max).`)
    .refine((s) => countLinks(s) <= LIMITS.maxLinks, `Please include at most ${LIMITS.maxLinks} links.`)
    .refine((s) => !/<\s*\/?\s*(script|iframe|object|embed|style|a|img|form)\b/i.test(s), 'Please remove the HTML from your message.')
    .refine((s) => !/(.)\1{24,}/u.test(s), 'Please write a real message.'),
})

export type ContactInput = z.infer<typeof contactSchema>

/** Cleans raw form values before validation (emails are lower-cased; the message keeps its line breaks). */
export function cleanContactInput(raw: Record<ContactField, string>): Record<ContactField, string> {
  return {
    name: cleanText(raw.name),
    email: cleanText(raw.email).toLowerCase(),
    company: cleanText(raw.company),
    message: cleanText(raw.message, { multiline: true }),
  }
}

export type ContactFieldErrors = Partial<Record<ContactField, string>>

export type ContactState =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string; fieldErrors?: ContactFieldErrors; values?: Partial<Record<ContactField, string>> }
