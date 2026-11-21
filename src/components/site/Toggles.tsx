'use client'

import { useRouter, usePathname } from 'next/navigation'
import { setTheme, setViewMode, useTheme } from '@/lib/preferences'
import { CubeIcon, MoonIcon, SunIcon } from './icons'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const theme = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className={`grid size-10 place-items-center rounded-xl border border-line bg-surface text-fg transition hover:text-accent ${className}`}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

/**
 * "Enter 3D hallway" button for devices that can run the 3D view (tablet/desktop + WebGL2).
 * It is always rendered and hidden with CSS (html[data-can3d="0"], set before first paint) rather than
 * added after hydration, so it never pops in and shifts the hero layout.
 */
export function Enter3DButton({ className = '', label = '3D hallway' }: { className?: string; label?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <button
      type="button"
      onClick={() => {
        setViewMode('3d')
        if (pathname !== '/') router.push('/')
        else window.scrollTo({ top: 0 })
      }}
      className={`needs-3d btn btn-ghost !px-3 !py-2 text-sm ${className}`}
      title="Walk through my projects in a 3D hallway"
    >
      <CubeIcon size={18} />
      <span>{label}</span>
    </button>
  )
}
