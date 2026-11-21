'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

const NARROW = 'iljtfr'
const UPPER = 'ABCDEFGHJKLNOPRSTUVXYZ'
const LOWER = 'abcdeghknopqsuvxyz'
const DIGITS = '0123456789'
const SYMBOLS = '<>/[]{}=+*#%&$'

/** A random glyph of a similar kind and width to `c`, so the scrambled line stays close to the real text's width. */
function glyphFor(c: string) {
  const set = /[iljtfrI1'.,:;!|]/.test(c) ? NARROW : /[A-Z]/.test(c) ? UPPER : /[a-z]/.test(c) ? LOWER : /[0-9]/.test(c) ? DIGITS : SYMBOLS
  return set[(Math.random() * set.length) | 0]
}

type Props = {
  text: string
  className?: string
  /** "mount" starts immediately; "view" waits until the text scrolls into view. */
  trigger?: 'mount' | 'view'
  duration?: number
  delay?: number
}

/**
 * "Decrypts" text: characters cycle through random glyphs and lock into place left to right.
 *
 * The real text always stays in the layout (server-rendered for SEO, exposed via aria-label) and
 * keeps its exact size. While scrambling, it is hidden and the random glyphs are drawn in an
 * absolutely positioned copy on top, so wider glyphs or extra line wraps can never resize the
 * heading or move anything around it.
 */
export function ScrambleText({ text, className = '', trigger = 'view', duration = 900, delay = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState<{ text: string; nowrap: boolean } | null>(null)

  useEffect(() => {
    if (reduce) return
    if (trigger === 'view' && !inView) return
    let raf = 0
    let start = 0
    const chars = [...text]
    // Text that fits on one line stays on one line while scrambling (the overlay box is exactly as wide as the real text).
    let nowrap = false
    const tick = (t: number) => {
      if (!start) {
        start = t
        nowrap = (textRef.current?.getClientRects().length ?? 0) <= 1
      }
      const elapsed = t - start - delay
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick)
        return
      }
      const p = Math.min(1, elapsed / duration)
      if (p >= 1) {
        setDisplay(null)
        return
      }
      setDisplay({
        nowrap,
        text: chars
          .map((c, i) => {
            if (c === ' ') return c
            const lockAt = (i / chars.length) * 0.75 + 0.2
            return p >= lockAt ? c : glyphFor(c)
          })
          .join(''),
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduce, text, trigger, duration, delay])

  const scrambling = display !== null
  return (
    <span ref={ref} className={`relative ${className}`} aria-label={text}>
      <span ref={textRef} aria-hidden className={scrambling ? 'invisible' : undefined}>
        {text}
      </span>
      {scrambling && (
        // Same classes as the wrapper so gradient text effects (background-clip: text) still apply.
        <span aria-hidden className={`pointer-events-none absolute inset-0 ${display.nowrap ? 'whitespace-nowrap' : ''} ${className}`}>
          {display.text}
        </span>
      )}
    </span>
  )
}
