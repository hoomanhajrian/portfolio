'use client'

import { useSyncExternalStore } from 'react'

/**
 * Theme and view-mode preferences live on <html> data attributes so CSS can
 * react before hydration (see PREFERENCES_SCRIPT, injected in the root layout).
 * These hooks read them with useSyncExternalStore: the server snapshot is the
 * default, and React re-renders with the real value right after hydration.
 */

export type Theme = 'dark' | 'light'
export type ViewMode = '2d' | '3d'

const listeners = new Set<() => void>()
const subscribe = (cb: () => void) => {
  listeners.add(cb)
  return () => listeners.delete(cb)
}
const emit = () => listeners.forEach((l) => l())

const root = () => document.documentElement

export function setTheme(theme: Theme) {
  root().dataset.theme = theme
  try {
    localStorage.setItem('theme', theme)
  } catch {}
  emit()
}

export function setViewMode(mode: ViewMode) {
  if (mode === '3d' && root().dataset.can3d !== '1') return
  root().dataset.view = mode
  try {
    localStorage.setItem('view-mode', mode)
  } catch {}
  emit()
}

export function useTheme(): Theme {
  return useSyncExternalStore(
    subscribe,
    () => (root().dataset.theme === 'light' ? 'light' : 'dark'),
    () => 'dark',
  )
}

export function useViewMode(): ViewMode {
  return useSyncExternalStore(
    subscribe,
    () => (root().dataset.view === '3d' ? '3d' : '2d'),
    () => '2d',
  )
}

export function useCan3D(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => root().dataset.can3d === '1',
    () => false,
  )
}
