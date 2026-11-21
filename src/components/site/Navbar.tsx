'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { profile } from '@/data/profile'
import { NAV_SECTIONS } from '@/lib/site'
import { Enter3DButton, ThemeToggle } from './Toggles'
import { CloseIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MenuIcon } from './icons'

export function Navbar({ home = false }: { home?: boolean }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const pendingTarget = useRef<string | null>(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the section currently in view (home page only).
  useEffect(() => {
    if (!home) return
    const els = NAV_SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [home])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open && pendingTarget.current) {
      const id = pendingTarget.current
      pendingTarget.current = null
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: 'start' })
        history.replaceState(null, '', `#${id}`)
      })
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const href = (id: string) => (home ? `#${id}` : `/#${id}`)

  // Close the menu first; the effect above unlocks page scrolling and then scrolls to the section.
  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    setOpen(false)
    if (!home) return
    e.preventDefault()
    pendingTarget.current = id
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || open ? 'glass border-x-0 border-t-0' : 'border-b border-transparent'}`}
    >
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-accent via-accent-2 to-accent-3"
        style={{ scaleX: progress }}
      />
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image src="/img/logo.webp" alt="" width={32} height={32} className="size-8 rounded-full" priority />
          <span className="font-display text-base font-semibold tracking-tight sm:text-lg">
            {profile.name}
            <span className="ml-2 hidden font-mono text-[11px] font-normal tracking-[0.2em] text-muted uppercase lg:inline">
              / {profile.headline}
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={href(s.id)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-accent ${active === s.id ? 'text-accent' : 'text-muted'}`}
                aria-current={active === s.id ? 'true' : undefined}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Enter3DButton className="hidden md:inline-flex" />
          <a href={profile.links.resume} download="Hooman-Hajarian-Resume.pdf" className="btn btn-primary hidden !px-3.5 !py-2 text-sm sm:inline-flex">
            <DownloadIcon size={16} />
            Resume
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="grid size-10 place-items-center rounded-xl border border-line bg-surface md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          // Its own fixed layer below the bar (not part of the header's height), so the header never
          // grows taller than the screen and mobile browsers don't shift the visual viewport.
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto overscroll-contain border-t border-line bg-bg/95 pb-10 backdrop-blur-xl md:hidden"
          >
            <ul className="space-y-1 px-4 pt-4">
              {NAV_SECTIONS.map((s, i) => (
                <motion.li key={s.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i + 0.1 }}>
                  <a
                    href={href(s.id)}
                    onClick={(e) => goTo(e, s.id)}
                    className="flex items-baseline gap-3 rounded-xl px-3 py-3 font-display text-2xl font-semibold"
                  >
                    <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                    {s.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3 px-7">
              <a href={profile.links.resume} download="Hooman-Hajarian-Resume.pdf" className="btn btn-primary">
                <DownloadIcon size={16} /> Resume
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" aria-label="GitHub">
                <GitHubIcon />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
