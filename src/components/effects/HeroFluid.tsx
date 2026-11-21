'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useTheme } from '@/lib/preferences'

const LiquidEther = dynamic(() => import('./LiquidEther'), { ssr: false })

/**
 * Interactive fluid background for the 2D hero. Desktop with a fine pointer only,
 * never on phones/tablets or for reduced-motion users (three.js is never downloaded there).
 */
export function HeroFluid() {
  const [enabled, setEnabled] = useState(false)
  const theme = useTheme()

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  if (!enabled) return null
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60">
      <LiquidEther
        colors={theme === 'dark' ? ['#22d3ee', '#a78bfa', '#0ea5e9'] : ['#0891b2', '#7c3aed', '#38bdf8']}
        mouseForce={18}
        cursorSize={90}
        resolution={0.4}
        autoDemo
        autoSpeed={0.4}
        autoIntensity={1.8}
      />
    </div>
  )
}
