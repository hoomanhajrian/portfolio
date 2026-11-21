'use client'

import { useSyncExternalStore } from 'react'
import { frames, clampDistance, distanceAtZ, type DoorId } from './layout'

/**
 * Per-frame camera values live in a plain mutable object (read/written inside useFrame, never causing React renders).
 * UI state (focused frame, open panel, hover...) lives in a tiny subscribable store used by the DOM HUD and the scene.
 */
export const rail = {
  /** Where the visitor wants to be along the rail (metres). */
  target: 0,
  /** Damped current position along the rail (metres). */
  current: 0,
  /** Held-key walking direction: -1 back, 0 none, 1 forward. */
  walk: 0,
  /** Look offsets in radians (targets set by mouse/drag, damped in the rig). */
  yawTarget: 0,
  pitchTarget: 0,
}

export type Panel = DoorId | 'projects' | null

type State = {
  focused: number | null
  panel: Panel
  hovered: number | null
  nearest: number | null
  ready: boolean
  interacted: boolean
  tier: 'high' | 'low'
}

let state: State = {
  focused: null,
  panel: null,
  hovered: null,
  nearest: null,
  ready: false,
  interacted: false,
  tier: 'high',
}

const listeners = new Set<() => void>()
const set = (patch: Partial<State>) => {
  let changed = false
  for (const k in patch) {
    const key = k as keyof State
    if (state[key] !== patch[key]) changed = true
  }
  if (!changed) return
  state = { ...state, ...patch }
  listeners.forEach((l) => l())
}

export const getState = () => state

export function useHallway<T>(selector: (s: State) => T): T {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => selector(state),
    () => selector(state),
  )
}

export const actions = {
  focus(index: number) {
    const i = Math.max(0, Math.min(frames.length - 1, index))
    set({ focused: i, panel: null, interacted: true })
    // Keep the rail position next to the focused frame so closing returns you there.
    rail.target = clampDistance(distanceAtZ(frames[i].z) - 0.4)
  },
  unfocus() {
    if (state.focused === null) return
    set({ focused: null })
  },
  openPanel(panel: Panel) {
    set({ panel, focused: null, interacted: true })
  },
  closePanel() {
    set({ panel: null })
  },
  setHovered(i: number | null) {
    set({ hovered: i })
  },
  setNearest(i: number | null) {
    set({ nearest: i })
  },
  setReady() {
    set({ ready: true })
  },
  setTier(tier: State['tier']) {
    set({ tier })
  },
  interacted() {
    set({ interacted: true })
  },
  reset() {
    rail.target = 0
    rail.current = 0
    rail.walk = 0
    rail.yawTarget = 0
    rail.pitchTarget = 0
    state = { ...state, focused: null, panel: null, hovered: null, nearest: null, ready: false, interacted: false }
  },
}
