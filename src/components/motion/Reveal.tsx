'use client'

import { motion, type HTMLMotionProps } from 'motion/react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 36 },
  right: { x: -36 },
  none: {},
}

type RevealProps = HTMLMotionProps<'div'> & {
  direction?: Direction
  delay?: number
  blur?: boolean
  amount?: number
}

/** Fades/slides content in the first time it scrolls into view. */
export function Reveal({ direction = 'up', delay = 0, blur = true, amount = 0.2, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, ...offsets[direction], ...(blur ? { filter: 'blur(8px)' } : {}) }}
      whileInView={{ opacity: 1, x: 0, y: 0, ...(blur ? { filter: 'blur(0px)' } : {}) }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Container that staggers its <RevealItem> children. */
export function RevealGroup({ children, stagger = 0.06, className, amount = 0.15 }: { children: React.ReactNode; stagger?: number; className?: string; amount?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className, as = 'div' }: { children: React.ReactNode; className?: string; as?: 'div' | 'li' | 'span' }) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      variants={{
        hidden: { opacity: 0, y: 16, scale: 0.96 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </Comp>
  )
}
