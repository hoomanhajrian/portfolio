'use client'

import { useEffect, useRef } from 'react'

/**
 * Lightweight 2D-canvas starfield used as the page background.
 * Stars drift slowly and shift with scroll for depth. Pauses when the tab is hidden,
 * draws a single static frame for reduced-motion users, and uses fewer stars on small screens.
 */
export function Starfield({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let raf = 0
    let running = true

    type Star = { x: number; y: number; z: number; tw: number; hue: number }
    let stars: Star[] = []

    const resize = () => {
      // clientWidth/Height = the real viewport, unaffected by any content overflow.
      w = document.documentElement.clientWidth
      h = document.documentElement.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(160, (w * h) / 9000))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.9 + 0.1,
        tw: Math.random() * Math.PI * 2,
        hue: Math.random() < 0.2 ? 280 : 190,
      }))
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const scroll = window.scrollY
      const light = document.documentElement.dataset.theme === 'light'
      for (const s of stars) {
        const y = (((s.y - scroll * s.z * 0.15) % h) + h) % h
        const twinkle = reduce ? 0.8 : 0.55 + 0.45 * Math.sin(t * 0.0015 + s.tw)
        const r = s.z * 1.4
        ctx.beginPath()
        ctx.fillStyle = light
          ? `hsla(${s.hue}, 70%, 40%, ${0.25 * twinkle * s.z})`
          : `hsla(${s.hue}, 90%, 80%, ${twinkle * s.z})`
        ctx.arc(s.x, y, r, 0, Math.PI * 2)
        ctx.fill()
        if (!reduce) s.x = (s.x + s.z * 0.04 + w) % w
      }
      if (running && !reduce) raf = requestAnimationFrame(draw)
    }

    const onVisibility = () => {
      running = document.visibilityState === 'visible'
      cancelAnimationFrame(raf)
      if (running) raf = requestAnimationFrame(draw)
    }
    const onScroll = () => {
      if (reduce) draw(0)
    }

    resize()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  // Explicit size: a canvas's default CSS size is its pixel buffer (viewport × DPR), which would
  // overflow the page and widen the mobile layout viewport.
  return <canvas ref={ref} aria-hidden className={`pointer-events-none fixed inset-0 -z-10 h-full w-full ${className}`} />
}
