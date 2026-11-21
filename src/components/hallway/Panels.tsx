'use client'

import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { profile, experience, skillGroups, education, certifications } from '@/data/profile'
import { formatPeriod } from '@/data/projects'
import { setViewMode } from '@/lib/preferences'
import { ProjectDetails } from '@/components/project/ProjectDetails'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactLinks } from '@/components/sections/Contact'
import { CloseIcon, DownloadIcon, ExternalIcon, ArrowRightIcon } from '@/components/site/icons'
import { frames } from './layout'
import { actions, useHallway } from './store'
import { walkToFrame } from './useRailControls'

function SidePanel({ open, onClose, title, children, footer }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; footer?: React.ReactNode }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement | null
      // Wait for the slide-in so focus doesn't jump the scroll position.
      const t = setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 50)
      return () => clearTimeout(t)
    }
    returnFocus.current?.focus?.({ preventScroll: true })
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          role="dialog"
          aria-modal="false"
          aria-label={title}
          initial={{ x: '105%', opacity: 0.4 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '105%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 32 }}
          className="absolute top-[4.75rem] right-3 bottom-3 z-20 flex w-[min(30rem,46vw)] min-w-[20rem] flex-col overflow-hidden rounded-3xl border border-line bg-bg-elev/95 shadow-[0_0_60px_rgb(0_0_0/0.6)] backdrop-blur-xl"
        >
          <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
            <p className="mono-label truncate">{title}</p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="grid size-9 shrink-0 place-items-center rounded-xl border border-line bg-surface hover:text-accent"
              aria-label="Close panel (Esc)"
            >
              <CloseIcon size={18} />
            </button>
          </div>
          <div data-hud-scroll className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
            {children}
          </div>
          {footer && <div className="border-t border-line px-5 py-3">{footer}</div>}
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

export function ProjectPanel() {
  const focused = useHallway((s) => s.focused)
  const slot = focused !== null ? frames[focused] : null
  return (
    <SidePanel
      open={slot !== null}
      onClose={() => actions.unfocus()}
      title={slot ? `Project ${String(slot.index + 1).padStart(2, '0')} of ${frames.length}` : 'Project'}
      footer={
        slot && (
          <div className="flex items-center justify-between gap-2">
            <button type="button" className="btn btn-ghost !px-3 !py-2 text-sm" disabled={slot.index === 0} onClick={() => actions.focus(slot.index - 1)}>
              ← Newer
            </button>
            <button type="button" className="btn btn-ghost !px-3 !py-2 text-sm" disabled={slot.index === frames.length - 1} onClick={() => actions.focus(slot.index + 1)}>
              Older →
            </button>
          </div>
        )
      }
    >
      {slot && <ProjectDetails key={slot.project.slug} project={slot.project} />}
    </SidePanel>
  )
}

function AboutContent() {
  return (
    <div className="space-y-7">
      <div>
        <h2 className="font-display text-3xl font-semibold">{profile.name}</h2>
        <p className="text-accent">{profile.headline}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{profile.summary}</p>
        <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
          <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden /> {profile.availability}
        </p>
      </div>
      <section>
        <h3 className="mono-label mb-3">Experience</h3>
        <ol className="space-y-4">
          {experience.map((j) => (
            <li key={j.company + j.role} className="panel p-4">
              <p className="font-mono text-[11px] text-accent">
                {j.start} — {j.end}
              </p>
              <p className="font-semibold">{j.role}</p>
              <p className="text-sm text-muted">{j.company}</p>
              <ul className="mt-2 space-y-1 text-sm text-muted">
                {j.bullets.slice(0, 3).map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>
      <section>
        <h3 className="mono-label mb-3">Skills</h3>
        <div className="space-y-3">
          {skillGroups.slice(0, 5).map((g) => (
            <div key={g.title}>
              <p className="mb-1.5 text-xs text-muted">{g.title}</p>
              <ul className="flex flex-wrap gap-1.5">
                {g.skills.map((s) => (
                  <li key={s} className="chip !px-2.5 !py-0.5 !text-xs">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h3 className="mono-label mb-3">Education & certification</h3>
        <ul className="space-y-2 text-sm">
          {education.map((e) => (
            <li key={e.credential}>
              <span className="text-fg">{e.credential}</span> <span className="text-muted">· {e.school}</span>
            </li>
          ))}
          <li>
            <span className="text-fg">{certifications[0].name}</span>
          </li>
        </ul>
      </section>
    </div>
  )
}

function ResumeContent() {
  return (
    <div className="space-y-5">
      <h2 className="font-display text-3xl font-semibold">Resume</h2>
      <p className="text-sm leading-relaxed text-muted">
        My experience, skills, selected projects, education and certifications in an ATS-friendly PDF.
      </p>
      <div className="flex flex-wrap gap-3">
        <a href={profile.links.resume} download="Hooman-Hajarian-Resume.pdf" className="btn btn-primary">
          <DownloadIcon size={18} /> Download PDF
        </a>
        <a href={profile.links.resume} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
          <ExternalIcon size={18} /> Open in new tab
        </a>
      </div>
      <div className="panel p-4 text-sm">
        <p className="font-semibold">{profile.headline}</p>
        <p className="mt-1 text-muted">{profile.tagline}</p>
        <ul className="mt-3 space-y-1 text-muted">
          {experience.map((j) => (
            <li key={j.company + j.role}>
              {j.role}, {j.company} <span className="font-mono text-xs">({j.start} – {j.end})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ProjectsList() {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold">Jump to a project</h2>
      <ol className="mt-4 space-y-1.5">
        {frames.map((f) => (
          <li key={f.project.slug}>
            <button
              type="button"
              onClick={() => {
                actions.closePanel()
                walkToFrame(f.index)
                setTimeout(() => actions.focus(f.index), 450)
              }}
              className="group flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2 text-left hover:border-line hover:bg-surface"
            >
              <span className="font-mono text-xs" style={{ color: f.project.accent }}>
                {String(f.index + 1).padStart(2, '0')}
              </span>
              <span className="flex-1">
                <span className="block font-medium">{f.project.name}</span>
                <span className="block text-xs text-muted">
                  {formatPeriod(f.project.period)} · {f.project.stack.slice(0, 3).join(' · ')}
                </span>
              </span>
              <ArrowRightIcon size={16} className="text-muted group-hover:text-accent" />
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function InfoPanel() {
  const panel = useHallway((s) => s.panel)
  const titles = { about: 'About me', contact: 'Contact', resume: 'Resume', projects: 'All projects' } as const
  return (
    <SidePanel
      open={panel !== null}
      onClose={() => actions.closePanel()}
      title={panel ? titles[panel] : ''}
      footer={
        panel === 'about' ? (
          <button
            type="button"
            className="btn btn-ghost w-full !py-2 text-sm"
            onClick={() => {
              setViewMode('2d')
              requestAnimationFrame(() => document.getElementById('experience')?.scrollIntoView())
            }}
          >
            Read the full 2D page
          </button>
        ) : undefined
      }
    >
      {panel === 'about' && <AboutContent />}
      {panel === 'resume' && <ResumeContent />}
      {panel === 'projects' && <ProjectsList />}
      {panel === 'contact' && (
        <div className="space-y-6">
          <div>
            <h2 className="font-display text-3xl font-semibold">Let&apos;s talk</h2>
            <p className="mt-2 text-sm text-muted">Send a message straight to my inbox, or reach me on LinkedIn.</p>
          </div>
          <ContactForm />
          <ContactLinks />
        </div>
      )}
    </SidePanel>
  )
}
