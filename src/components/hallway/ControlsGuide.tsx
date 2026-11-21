'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { actions, useHallway } from './store'

const SHOW_FOR_MS = 12_000

function Key({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <kbd
      className={`inline-grid h-7 place-items-center rounded-md border border-line bg-bg/80 px-1.5 font-mono text-[11px] text-fg shadow-[inset_0_-2px_0_rgb(255_255_255/0.06)] ${wide ? 'min-w-14' : 'min-w-7'}`}
    >
      {children}
    </kbd>
  )
}

function MouseIcon({ wheel = false }: { wheel?: boolean }) {
  return (
    <svg width="20" height="28" viewBox="0 0 20 28" aria-hidden className="text-accent">
      <rect x="1" y="1" width="18" height="26" rx="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
      {wheel ? (
        <motion.rect x="8.5" y="6" width="3" height="6" rx="1.5" fill="currentColor" animate={{ y: [6, 10, 6] }} transition={{ duration: 1.4, repeat: Infinity }} />
      ) : (
        <path d="M10 1v9" stroke="currentColor" strokeWidth="1.6" />
      )}
    </svg>
  )
}

function Row({ keys, label }: { keys: React.ReactNode; label: string }) {
  return (
    <li className="grid grid-cols-[minmax(0,13.5rem)_1fr] items-center gap-4 py-2">
      <span className="flex flex-wrap items-center gap-1.5">{keys}</span>
      <span className="text-sm text-fg/90">{label}</span>
    </li>
  )
}

const or = <span className="px-0.5 font-mono text-[10px] text-muted">or</span>

/**
 * "How to explore" card shown when the hallway first finishes loading (and from the Controls button).
 * It closes itself after a few seconds (paused while hovered), on "Got it", or with Esc. It never blocks
 * walking: wheel and keys keep working while it is visible.
 */
export function ControlsGuide() {
  const open = useHallway((s) => s.guideOpen)
  const [touch] = useState(() => window.matchMedia('(pointer: coarse)').matches)
  const [paused, setPaused] = useState(false)
  const remaining = useRef(SHOW_FOR_MS)

  // Auto-close timer, paused while the pointer is over the card.
  useEffect(() => {
    if (!open) {
      remaining.current = SHOW_FOR_MS
      return
    }
    if (paused) return
    const startedAt = Date.now()
    const t = setTimeout(() => actions.closeGuide(), remaining.current)
    return () => {
      clearTimeout(t)
      remaining.current = Math.max(1500, remaining.current - (Date.now() - startedAt))
    }
  }, [open, paused])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') actions.closeGuide()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.section
          role="dialog"
          aria-modal="false"
          aria-labelledby="hallway-guide-title"
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          className="pointer-events-auto absolute top-[56%] left-1/2 z-20 w-[min(34rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-line bg-bg-elev/90 p-5 shadow-[0_0_60px_rgb(0_0_0/0.55)] backdrop-blur-xl sm:p-6"
        >
          <p className="mono-label">Welcome to the hallway</p>
          <h2 id="hallway-guide-title" className="mt-1 font-display text-2xl font-semibold">
            How to explore
          </h2>

          <ul className="mt-3 divide-y divide-line">
            {touch ? (
              <>
                <Row keys={<Key wide>Swipe ↑ ↓</Key>} label="Walk forward and back" />
                <Row keys={<Key wide>Drag ← →</Key>} label="Look around" />
                <Row keys={<Key wide>Tap</Key>} label="Tap a frame to open the project" />
                <Row keys={<Key wide>◆ ◆ ◆</Key>} label="Use the bar at the bottom to jump to any project" />
              </>
            ) : (
              <>
                <Row
                  keys={
                    <>
                      <MouseIcon wheel />
                      {or}
                      <Key>W</Key>
                      <Key>S</Key>
                      {or}
                      <Key>↑</Key>
                      <Key>↓</Key>
                    </>
                  }
                  label="Scroll or hold a key to walk"
                />
                <Row keys={<MouseIcon />} label="Move the mouse to look around" />
                <Row
                  keys={
                    <>
                      <Key>A</Key>
                      <Key>D</Key>
                      {or}
                      <Key>←</Key>
                      <Key>→</Key>
                    </>
                  }
                  label="Jump to the previous or next project"
                />
                <Row
                  keys={
                    <>
                      <Key wide>Click</Key>
                      {or}
                      <Key wide>Enter</Key>
                    </>
                  }
                  label="Open the project in front of you"
                />
                <Row keys={<Key wide>Esc</Key>} label="Close a panel" />
              </>
            )}
          </ul>

          <p className="mt-3 text-xs text-muted">Prefer a normal page? Use “2D view” in the top-right corner at any time.</p>

          <div className="mt-4 flex items-center gap-4">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-line" aria-hidden>
              {/* Countdown bar: a CSS animation that pauses together with the auto-close timer. */}
              <div
                className="h-full origin-left bg-gradient-to-r from-accent to-accent-2"
                style={{ animation: `guide-countdown ${SHOW_FOR_MS}ms linear forwards`, animationPlayState: paused ? 'paused' : 'running' }}
              />
            </div>
            <button type="button" onClick={() => actions.closeGuide()} className="btn btn-primary !px-4 !py-2 text-sm">
              Got it
            </button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
