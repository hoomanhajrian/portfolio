'use client'

import { useRouter, usePathname } from 'next/navigation'
import { setTheme, setViewMode, useCan3D, useTheme } from '@/lib/preferences'
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

/** "Enter 3D hallway" button. Only rendered on devices that can run the 3D view (tablet/desktop + WebGL2). */
export function Enter3DButton({ className = '', label = '3D hallway' }: { className?: string; label?: string }) {
  const can3D = useCan3D()
  const router = useRouter()
  const pathname = usePathname()
  if (!can3D) return null
  return (
    <button
      type="button"
      onClick={() => {
        setViewMode('3d')
        if (pathname !== '/') router.push('/')
        else window.scrollTo({ top: 0 })
      }}
      className={`btn btn-ghost !px-3 !py-2 text-sm ${className}`}
      title="Walk through my projects in a 3D hallway"
    >
      <CubeIcon size={18} />
      <span>{label}</span>
    </button>
  )
}
