'use client'

import { useEffect } from 'react'
import { actions, getState, rail } from './store'
import { clampDistance, frames, RAIL_LENGTH, viewDistanceFor, zAtDistance } from './layout'

const MAX_YAW = 0.35 // ~20°
const MAX_PITCH = 0.14 // ~8°

function nextFrameIndex(dir: 1 | -1) {
  const z = zAtDistance(rail.target)
  if (dir === 1) {
    const i = frames.findIndex((f) => f.z < z - 1.3)
    return i === -1 ? null : i
  }
  for (let i = frames.length - 1; i >= 0; i--) if (frames[i].z > z + 0.2) return i
  return null
}

/**
 * Guided-rail input: wheel / W,S / arrows / PageUp,PageDown / Home,End / swipe move along the corridor;
 * mouse position or horizontal drag looks around; A,D or ←,→ jump between frames; Enter opens the nearest frame.
 */
export function useRailControls(element: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = element.current
    if (!el) return

    const busy = () => {
      const s = getState()
      return s.focused !== null || s.panel !== null
    }
    const isTyping = (t: EventTarget | null) =>
      t instanceof HTMLElement && (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName))

    const onWheel = (e: WheelEvent) => {
      if (busy()) return
      // Don't hijack scrolling inside HUD menus.
      if ((e.target as HTMLElement).closest?.('[data-hud-scroll]')) return
      e.preventDefault()
      const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY
      rail.target = clampDistance(rail.target + delta * 0.012)
      actions.interacted()
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (isTyping(e.target)) return
      const s = getState()
      if (e.key === 'Escape') {
        if (s.focused !== null) actions.unfocus()
        else if (s.panel) actions.closePanel()
        return
      }
      if (busy()) return
      switch (e.key) {
        case 'w':
        case 'W':
        case 'ArrowUp':
          rail.walk = 1
          break
        case 's':
        case 'S':
        case 'ArrowDown':
          rail.walk = -1
          break
        case 'PageDown':
          rail.target = clampDistance(rail.target + 8)
          break
        case 'PageUp':
          rail.target = clampDistance(rail.target - 8)
          break
        case 'Home':
          rail.target = 0
          break
        case 'End':
          rail.target = RAIL_LENGTH
          break
        case 'd':
        case 'D':
        case 'ArrowRight': {
          const i = nextFrameIndex(1)
          rail.target = i === null ? RAIL_LENGTH : viewDistanceFor(frames[i])
          break
        }
        case 'a':
        case 'A':
        case 'ArrowLeft': {
          const i = nextFrameIndex(-1)
          rail.target = i === null ? 0 : viewDistanceFor(frames[i])
          break
        }
        case 'Enter': {
          if (s.nearest !== null && !(e.target instanceof HTMLButtonElement || e.target instanceof HTMLAnchorElement)) actions.focus(s.nearest)
          break
        }
        default:
          return
      }
      e.preventDefault()
      actions.interacted()
    }
    const onKeyUp = (e: KeyboardEvent) => {
      if (['w', 'W', 's', 'S', 'ArrowUp', 'ArrowDown'].includes(e.key)) rail.walk = 0
    }

    // Mouse look: pointer position relative to the viewport centre.
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      rail.yawTarget = -nx * MAX_YAW
      rail.pitchTarget = -ny * MAX_PITCH
    }

    // Touch: vertical swipe walks, horizontal drag looks.
    let lastX = 0
    let lastY = 0
    let touching = false
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return
      touching = true
      lastX = e.touches[0].clientX
      lastY = e.touches[0].clientY
    }
    const onTouchMove = (e: TouchEvent) => {
      if (!touching || busy() || e.touches.length !== 1) return
      if ((e.target as HTMLElement).closest?.('[data-hud-scroll]')) return
      const t = e.touches[0]
      const dx = t.clientX - lastX
      const dy = t.clientY - lastY
      lastX = t.clientX
      lastY = t.clientY
      rail.target = clampDistance(rail.target + dy * 0.045)
      rail.yawTarget = Math.max(-MAX_YAW * 1.6, Math.min(MAX_YAW * 1.6, rail.yawTarget + dx * 0.004))
      actions.interacted()
      e.preventDefault()
    }
    const onTouchEnd = () => {
      touching = false
    }

    const onBlur = () => {
      rail.walk = 0
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onBlur)
    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', onBlur)
    }
  }, [element])
}

/** Move the camera so a frame is in view (used by HUD ticks and "Jump to" menu). */
export function walkToFrame(index: number) {
  rail.target = viewDistanceFor(frames[index])
  actions.interacted()
}

export function walkToEnd() {
  rail.target = RAIL_LENGTH
  actions.interacted()
}

