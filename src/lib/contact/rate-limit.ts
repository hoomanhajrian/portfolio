import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

/**
 * Sliding-window rate limits for the contact form.
 *
 * With Upstash Redis configured (Vercel Marketplace → Upstash, which sets KV_REST_API_URL / KV_REST_API_TOKEN,
 * or UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN), limits are shared by every server instance and
 * survive cold starts. Without it, each instance keeps its own in-memory counters: still useful against
 * bursts, but not a hard global limit.
 */

type Rule = { max: number; windowSec: number }

export const RULES = {
  /** Any submission attempt (valid or not) from one IP. */
  attemptsPerIp: { max: 15, windowSec: 10 * 60 },
  /** Contact-form tokens handed out to one IP. */
  tokensPerIp: { max: 30, windowSec: 10 * 60 },
  /** Emails actually sent per IP. */
  sendsPerIpShort: { max: 3, windowSec: 10 * 60 },
  sendsPerIpDay: { max: 10, windowSec: 24 * 60 * 60 },
  /** Emails sent per visitor address (reply-to). */
  sendsPerEmailDay: { max: 3, windowSec: 24 * 60 * 60 },
  /** All emails sent by the site; protects the inbox and the Resend quota. */
  sendsGlobalDay: { max: 40, windowSec: 24 * 60 * 60 },
} satisfies Record<string, Rule>

export type RuleName = keyof typeof RULES
export type LimitResult = { ok: boolean; retryAfterSec: number }

const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN
const redis = url && token ? new Redis({ url, token }) : null

export const sharedRateLimits = Boolean(redis)

const limiters = new Map<RuleName, Ratelimit>()
function limiter(rule: RuleName) {
  let l = limiters.get(rule)
  if (!l && redis) {
    const { max, windowSec } = RULES[rule]
    l = new Ratelimit({ redis, prefix: `contact:${rule}`, limiter: Ratelimit.slidingWindow(max, `${windowSec} s`), analytics: false })
    limiters.set(rule, l)
  }
  return l
}

// In-memory fallback (per server instance).
const memory = new Map<string, number[]>()
function memoryLimit(rule: RuleName, key: string): LimitResult {
  const { max, windowSec } = RULES[rule]
  const now = Date.now()
  const id = `${rule}:${key}`
  const hits = (memory.get(id) ?? []).filter((t) => now - t < windowSec * 1000)
  if (hits.length >= max) {
    memory.set(id, hits)
    return { ok: false, retryAfterSec: Math.ceil((hits[0] + windowSec * 1000 - now) / 1000) }
  }
  hits.push(now)
  memory.set(id, hits)
  if (memory.size > 10_000) memory.clear()
  return { ok: true, retryAfterSec: 0 }
}

/** Counts one hit for `key` under `rule` and reports whether it is still within the limit. */
export async function hit(rule: RuleName, key: string): Promise<LimitResult> {
  const l = limiter(rule)
  if (!l) return memoryLimit(rule, key)
  try {
    const r = await l.limit(key)
    return { ok: r.success, retryAfterSec: r.success ? 0 : Math.max(1, Math.ceil((r.reset - Date.now()) / 1000)) }
  } catch (err) {
    // If Redis is unreachable, fall back to local limits rather than blocking every visitor.
    console.error('[contact] Rate-limit store unavailable, using in-memory limits:', (err as Error).message)
    return memoryLimit(rule, key)
  }
}

/** Checks several rules; the first one exceeded wins. Every rule is counted so limits stay accurate. */
export async function hitAll(checks: [RuleName, string][]): Promise<LimitResult> {
  const results = await Promise.all(checks.map(([rule, key]) => hit(rule, key)))
  const blocked = results.filter((r) => !r.ok)
  return blocked.length ? { ok: false, retryAfterSec: Math.max(...blocked.map((r) => r.retryAfterSec)) } : { ok: true, retryAfterSec: 0 }
}

/** One-time use markers (e.g. form-token nonces). Returns false if `key` was already used. */
const usedMemory = new Map<string, number>()
export async function markUsedOnce(key: string, ttlSec: number): Promise<boolean> {
  if (redis) {
    try {
      const res = await redis.set(`contact:used:${key}`, 1, { nx: true, ex: ttlSec })
      return res === 'OK'
    } catch {
      // fall through to memory
    }
  }
  const now = Date.now()
  const exp = usedMemory.get(key)
  if (exp && exp > now) return false
  usedMemory.set(key, now + ttlSec * 1000)
  if (usedMemory.size > 10_000) for (const [k, e] of usedMemory) if (e <= now) usedMemory.delete(k)
  return true
}

/** Undoes markUsedOnce (e.g. when sending failed, so the visitor can retry with the same token). */
export async function releaseUsed(key: string) {
  usedMemory.delete(key)
  if (redis) {
    try {
      await redis.del(`contact:used:${key}`)
    } catch {
      // ignore
    }
  }
}
