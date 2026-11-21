import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto'

/**
 * Signed, short-lived contact-form tokens.
 * The browser asks for one when the visitor first focuses the form; the server only accepts a
 * submission that carries a valid token that is at least MIN_AGE old (bots submit instantly) and at
 * most MAX_AGE old. Tokens can't be forged without the secret, and each one sends at most one email.
 */
export const TOKEN_MIN_AGE_MS = 2500
export const TOKEN_MAX_AGE_MS = 2 * 60 * 60 * 1000

let fallbackSecret: Buffer | null = null

function secret(): Buffer {
  const explicit = process.env.CONTACT_FORM_SECRET?.trim()
  if (explicit) return createHash('sha256').update(explicit).digest()
  // Derive a stable secret from the Resend key so no extra setup is required.
  const resend = process.env.RESEND_API_KEY?.trim()
  if (resend) return createHash('sha256').update(`contact-form-token:${resend}`).digest()
  // No key at all: the form can't send anyway; use a per-instance secret.
  fallbackSecret ??= randomBytes(32)
  return fallbackSecret
}

const sign = (payload: string) => createHmac('sha256', secret()).update(payload).digest('base64url')

export function issueToken(now = Date.now()) {
  const payload = `${now.toString(36)}.${randomBytes(12).toString('base64url')}`
  return `${payload}.${sign(payload)}`
}

export type TokenCheck =
  | { ok: true; nonce: string; ageMs: number }
  | { ok: false; reason: 'missing' | 'malformed' | 'bad-signature' | 'too-fast' | 'expired' }

export function verifyToken(token: string | null | undefined, now = Date.now()): TokenCheck {
  if (!token) return { ok: false, reason: 'missing' }
  const parts = token.split('.')
  if (parts.length !== 3 || token.length > 200) return { ok: false, reason: 'malformed' }
  const [ts, nonce, sig] = parts
  const expected = Buffer.from(sign(`${ts}.${nonce}`))
  const given = Buffer.from(sig)
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return { ok: false, reason: 'bad-signature' }
  const issued = parseInt(ts, 36)
  if (!Number.isFinite(issued)) return { ok: false, reason: 'malformed' }
  const ageMs = now - issued
  if (ageMs < TOKEN_MIN_AGE_MS) return { ok: false, reason: 'too-fast' }
  if (ageMs > TOKEN_MAX_AGE_MS) return { ok: false, reason: 'expired' }
  return { ok: true, nonce, ageMs }
}
