'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'

/** Vertical timeline rail that "draws" itself as you scroll through the children. */
export function TimelineLine({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="absolute top-0 bottom-0 left-[11px] w-px bg-line md:left-1/2" />
      <motion.div
        aria-hidden
        style={{ scaleY }}
        className="absolute top-0 bottom-0 left-[11px] w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-accent-3 shadow-[0_0_10px_var(--accent)] md:left-1/2"
      />
      {children}
    </div>
  )
}
