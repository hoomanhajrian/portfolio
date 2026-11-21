'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/\\[]{}=+*#%&$'

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
 * The real text is always server-rendered (SEO, no layout shift) and exposed via aria-label.
 */
export function ScrambleText({ text, className, trigger = 'view', duration = 900, delay = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (reduce) return
    if (trigger === 'view' && !inView) return
    let raf = 0
    let start = 0
    const chars = [...text]
    const tick = (t: number) => {
      if (!start) start = t
      const elapsed = t - start - delay
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick)
        return
      }
      const p = Math.min(1, elapsed / duration)
      const out = chars
        .map((c, i) => {
          if (c === ' ' || p >= 1) return c
          const lockAt = (i / chars.length) * 0.75 + 0.2
          return p >= lockAt ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]
        })
        .join('')
      setDisplay(out)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduce, text, trigger, duration, delay])

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{display}</span>
    </span>
  )
}
