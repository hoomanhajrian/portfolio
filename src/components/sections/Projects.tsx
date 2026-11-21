'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { categories, featuredProjects, formatPeriod, projects, type Project } from '@/data/projects'
import { TiltCard } from '@/components/motion/TiltCard'
import { ProjectDialog } from '@/components/project/ProjectDialog'
import { StatusBadge } from '@/components/project/ProjectDetails'
import { ArrowRightIcon } from '@/components/site/icons'

function ProjectImage({ project, sizes, className = '' }: { project: Project; sizes: string; className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: `radial-gradient(circle at 50% 45%, ${project.accent}30, transparent 70%), var(--bg-elev)` }}
    >
      <Image
        src={project.image.src}
        alt={project.image.alt}
        width={project.image.width}
        height={project.image.height}
        sizes={sizes}
        style={project.image.fit === 'contain' ? { maxWidth: Math.min(project.image.width, 300) } : undefined}
        className={`transition-transform duration-700 group-hover:scale-[1.04] ${project.image.fit === 'contain' ? 'h-auto max-h-full w-[62%] object-contain p-4' : 'h-full w-full object-cover object-top'}`}
      />
      <div aria-hidden className="scanlines pointer-events-none absolute inset-0 opacity-60" />
    </div>
  )
}

/** Desktop/tablet grid card. The link is a real <a> (crawlable, works without JS); a normal click opens the dialog. */
function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  return (
    <TiltCard className="h-full rounded-3xl">
      <article className="group panel relative flex h-full flex-col overflow-hidden rounded-3xl">
        <ProjectImage project={project} sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw" className="aspect-[16/10] border-b border-line" />
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="font-mono text-xs text-muted">{formatPeriod(project.period)}</span>
            <StatusBadge status={project.status} />
          </div>
          <h3 className="font-display text-xl font-semibold">
            <Link
              href={`/projects/${project.slug}`}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
                e.preventDefault()
                onOpen(project)
              }}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {project.name}
            </Link>
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{project.summary}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.stack.slice(0, 4).map((s) => (
              <li key={s} className="chip !px-2.5 !py-0.5 !text-xs">
                {s}
              </li>
            ))}
          </ul>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-accent">
            View details <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
        <span aria-hidden className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity group-hover:opacity-100" style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }} />
      </article>
    </TiltCard>
  )
}

/** Mobile: sticky cards that stack and shrink as you scroll past them. */
function StackCard({ project, i, total, progress, onOpen }: { project: Project; i: number; total: number; progress: MotionValue<number>; onOpen: (p: Project) => void }) {
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - i) * 0.035])
  const brightness = useTransform(progress, [i / total, 1], [1, 0.55])
  const filter = useTransform(brightness, (b) => `brightness(${b})`)
  return (
    <div className="sticky top-20 flex h-[78svh] items-start justify-center">
      <motion.article
        style={{ scale, filter, top: i * 14 }}
        className="group panel relative w-full origin-top overflow-hidden rounded-3xl bg-bg-elev shadow-[0_-12px_40px_rgb(0_0_0/0.45)]"
      >
        {/* Wipe reveal: a cover panel slides away (clip-path on the observed element would block IntersectionObserver). */}
        <motion.div className="relative overflow-hidden" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <motion.div variants={{ hidden: { scale: 1.15 }, show: { scale: 1 } }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
            <ProjectImage project={project} sizes="100vw" className="aspect-[16/10]" />
          </motion.div>
          <motion.div
            aria-hidden
            className="absolute inset-0 origin-top bg-bg-elev"
            style={{ boxShadow: `inset 0 -2px 0 ${project.accent}` }}
            variants={{ hidden: { scaleY: 1 }, show: { scaleY: 0 } }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
        <div className="p-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-xs" style={{ color: project.accent }}>
              {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <StatusBadge status={project.status} />
          </div>
          <h3 className="font-display text-2xl font-semibold">
            <Link
              href={`/projects/${project.slug}`}
              onClick={(e) => {
                e.preventDefault()
                onOpen(project)
              }}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {project.name}
            </Link>
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>
          <p className="mt-3 font-mono text-xs text-muted">{project.stack.slice(0, 4).join(' · ')}</p>
        </div>
      </motion.article>
    </div>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<(typeof categories)[number]['id']>('all')
  const [selected, setSelected] = useState<Project | null>(null)
  const stackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] })

  const filtered = useMemo(() => {
    const list = filter === 'all' ? projects : projects.filter((p) => p.category === filter)
    // Featured first, then newest.
    return [...list].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
  }, [filter])

  return (
    <>
      {/* Mobile: featured projects as a sticky card stack */}
      <div className="md:hidden">
        <div ref={stackRef} className="relative">
          {featuredProjects.map((p, i) => (
            <StackCard key={p.slug} project={p} i={i} total={featuredProjects.length} progress={scrollYProgress} onOpen={setSelected} />
          ))}
        </div>
        <Link href="/projects" className="btn btn-ghost mt-8 w-full">
          See all {projects.length} projects <ArrowRightIcon size={18} />
        </Link>
      </div>

      {/* Tablet/desktop: filterable grid */}
      <div className="hidden md:block">
        <div role="tablist" aria-label="Filter projects" className="mb-8 inline-flex flex-wrap gap-1 rounded-2xl border border-line bg-surface p-1">
          {categories.map((c) => {
            const count = c.id === 'all' ? projects.length : projects.filter((p) => p.category === c.id).length
            const active = filter === c.id
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(c.id)}
                className={`relative rounded-xl px-4 py-2 text-sm font-medium transition-colors ${active ? 'text-[#03141a]' : 'text-muted hover:text-fg'}`}
              >
                {active && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-xl bg-accent" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className="relative">
                  {c.label} <span className="font-mono text-xs opacity-70">{count}</span>
                </span>
              </button>
            )
          })}
        </div>

        <motion.ul layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={p} onOpen={setSelected} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </>
  )
}
