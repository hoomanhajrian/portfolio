'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useProgress } from '@react-three/drei'
import { profile } from '@/data/profile'
import { setViewMode } from '@/lib/preferences'
import { DownloadIcon, GridIcon, MailIcon } from '@/components/site/icons'
import { frames, RAIL_LENGTH, viewDistanceFor } from './layout'
import { actions, rail, useHallway } from './store'
import { walkToEnd, walkToFrame } from './useRailControls'

function ProgressRail() {
  const marker = useRef<HTMLDivElement>(null)
  const fill = useRef<HTMLDivElement>(null)
  const nearest = useHallway((s) => s.nearest)

  // Position updates come straight from the rail object every animation frame (no React renders).
  useEffect(() => {
    let raf = 0
    const tick = () => {
      const p = Math.min(1, Math.max(0, rail.current / RAIL_LENGTH))
      if (marker.current) marker.current.style.left = `${p * 100}%`
      if (fill.current) fill.current.style.transform = `scaleX(${p})`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <nav aria-label="Hallway progress" className="pointer-events-auto relative mx-auto h-10 w-[min(44rem,70vw)]">
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line" />
      <div ref={fill} className="absolute inset-x-0 top-1/2 h-px origin-left -translate-y-1/2 bg-gradient-to-r from-accent to-accent-2" />
      {frames.map((f) => {
        const left = (viewDistanceFor(f) / RAIL_LENGTH) * 100
        const active = nearest === f.index
        return (
          <button
            key={f.project.slug}
            type="button"
            onClick={() => {
              walkToFrame(f.index)
              setTimeout(() => actions.focus(f.index), 350)
            }}
            className="group absolute top-1/2 -translate-x-1/2 -translate-y-1/2 p-1.5"
            style={{ left: `${left}%` }}
            aria-label={`Go to ${f.project.name}`}
          >
            <span
              className="block size-2 rotate-45 border transition-transform group-hover:scale-150"
              style={{ borderColor: f.project.accent, background: active ? f.project.accent : 'transparent' }}
            />
            <span className="pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-bg-elev px-2 py-1 font-mono text-[10px] text-fg opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              {f.project.name}
            </span>
          </button>
        )
      })}
      <button
        type="button"
        onClick={walkToEnd}
        className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 p-1.5 font-mono text-[10px] text-muted hover:text-accent"
        aria-label="Go to the end of the hallway (About, Contact, Resume)"
      >
        ▣
      </button>
      <div ref={marker} aria-hidden className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
    </nav>
  )
}

function NearestHint() {
  const nearest = useHallway((s) => s.nearest)
  const busy = useHallway((s) => s.focused !== null || s.panel !== null)
  const slot = nearest !== null ? frames[nearest] : null
  return (
    <AnimatePresence>
      {slot && !busy && (
        <motion.button
          key={slot.project.slug}
          type="button"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          onClick={() => actions.focus(slot.index)}
          className="glass pointer-events-auto mx-auto flex items-center gap-3 rounded-2xl px-4 py-2 text-sm"
        >
          <span className="size-2 rotate-45" style={{ background: slot.project.accent }} aria-hidden />
          <span className="font-medium">{slot.project.name}</span>
          <span className="font-mono text-xs text-muted">Enter / click to open</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export function Hud() {
  const interacted = useHallway((s) => s.interacted)
  const busy = useHallway((s) => s.focused !== null || s.panel !== null)
  // The hallway is client-only (never server-rendered), so reading the media query during render is safe.
  const [touch] = useState(() => window.matchMedia('(pointer: coarse)').matches)

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-3 sm:p-4">
      <header className="flex items-start justify-between gap-3">
        <button
          type="button"
          onClick={() => actions.openPanel('about')}
          className="glass pointer-events-auto flex items-center gap-3 rounded-2xl px-3 py-2 text-left"
        >
          <Image src="/img/logo.webp" alt="" width={32} height={32} className="size-8 rounded-full" />
          <span>
            <span className="block font-display text-sm font-semibold leading-tight">{profile.name}</span>
            <span className="block font-mono text-[10px] tracking-[0.18em] text-accent uppercase">{profile.headline}</span>
          </span>
        </button>

        <div className="pointer-events-auto flex flex-wrap items-center justify-end gap-2">
          <button type="button" onClick={() => actions.openPanel('projects')} className="btn btn-ghost glass !px-3 !py-2 text-sm">
            Projects
          </button>
          <button type="button" onClick={() => actions.openPanel('contact')} className="btn btn-ghost glass !px-3 !py-2 text-sm">
            <MailIcon size={16} /> Contact
          </button>
          <a href={profile.links.resume} download="Hooman-Hajarian-Resume.pdf" className="btn btn-primary !px-3 !py-2 text-sm">
            <DownloadIcon size={16} /> Resume
          </a>
          <button
            type="button"
            onClick={() => {
              setViewMode('2d')
              window.scrollTo({ top: 0 })
            }}
            className="btn btn-ghost glass !px-3 !py-2 text-sm"
            title="Switch to the classic 2D website"
          >
            <GridIcon size={16} /> 2D view
          </button>
        </div>
      </header>

      <div className={`space-y-3 transition-opacity duration-300 ${busy ? 'pointer-events-none opacity-0' : 'opacity-100'}`}>
        <NearestHint />
        <ProgressRail />
        <AnimatePresence>
          {!interacted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mx-auto w-fit rounded-full border border-line bg-bg/70 px-4 py-1.5 text-center font-mono text-[11px] tracking-wider text-muted backdrop-blur"
            >
              {touch ? 'Swipe up to walk · drag sideways to look · tap a frame' : 'Scroll or W/S to walk · A/D to jump · move the mouse to look · click a frame'}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export function Loader() {
  const { progress, active } = useProgress()
  const ready = useHallway((s) => s.ready)
  const done = ready && !active
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-5 bg-bg"
          role="status"
          aria-live="polite"
        >
          <p className="font-display text-2xl font-semibold">{profile.name}</p>
          <div className="h-px w-56 overflow-hidden bg-line">
            <motion.div className="h-full bg-gradient-to-r from-accent to-accent-2" animate={{ width: `${Math.max(8, progress)}%` }} />
          </div>
          <p className="font-mono text-xs tracking-[0.3em] text-muted uppercase">Building the hallway · {Math.round(progress)}%</p>
          <button
            type="button"
            onClick={() => setViewMode('2d')}
            className="mt-4 font-mono text-xs text-muted underline underline-offset-4 hover:text-accent"
          >
            Skip to the 2D site
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
