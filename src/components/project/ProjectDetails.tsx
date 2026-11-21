import Image from 'next/image'
import Link from 'next/link'
import { formatPeriod, type Project } from '@/data/projects'
import { ExternalIcon, GitHubIcon, ArrowRightIcon } from '@/components/site/icons'

export function StatusBadge({ status }: { status?: Project['status'] }) {
  if (!status) return null
  const styles: Record<NonNullable<Project['status']>, string> = {
    Live: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300 light:text-emerald-700',
    Beta: 'border-amber-400/40 bg-amber-400/10 text-amber-300 light:text-amber-700',
    Archived: 'border-line bg-surface text-muted',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] tracking-wider uppercase ${styles[status]}`}>
      {status !== 'Archived' && <span className="size-1.5 rounded-full bg-current" aria-hidden />}
      {status === 'Archived' ? 'Offline' : status}
    </span>
  )
}

export function ProjectLinks({ project, size = 'md' }: { project: Project; size?: 'sm' | 'md' }) {
  const cls = size === 'sm' ? 'btn btn-ghost !px-3 !py-1.5 text-xs' : 'btn btn-ghost !py-2.5 text-sm'
  return (
    <>
      {project.links.live && (
        <a href={project.links.live} target="_blank" rel="noopener noreferrer" className={size === 'sm' ? cls : 'btn btn-primary !py-2.5 text-sm'}>
          <ExternalIcon size={16} /> Live site
        </a>
      )}
      {project.links.code && (
        <a href={project.links.code} target="_blank" rel="noopener noreferrer" className={cls}>
          <GitHubIcon size={16} /> Source code
        </a>
      )}
    </>
  )
}

/** Full project write-up. Shared by the 2D dialog, the 3D overlay and /projects/[slug]. */
export function ProjectDetails({ project, headingLevel = 2, showFullPageLink = true }: { project: Project; headingLevel?: 2 | 3; showFullPageLink?: boolean }) {
  const H = headingLevel === 2 ? 'h2' : 'h3'
  const Sub = headingLevel === 2 ? 'h3' : 'h4'
  return (
    <div>
      <div
        className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl border border-line"
        style={{ background: `radial-gradient(circle at 50% 40%, ${project.accent}33, transparent 70%), var(--bg-elev)` }}
      >
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          sizes="(min-width: 1024px) 720px, 100vw"
          // Logos are shown no larger than their real size so small sources stay sharp.
          style={project.image.fit === 'contain' ? { maxWidth: Math.min(project.image.width, 420) } : undefined}
          className={project.image.fit === 'contain' ? 'h-auto max-h-full w-[70%] object-contain p-6' : 'h-full w-full object-cover object-top'}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <StatusBadge status={project.status} />
        <span className="font-mono text-xs text-muted">{formatPeriod(project.period)}</span>
        <span className="font-mono text-xs text-muted">·</span>
        <span className="font-mono text-xs text-muted">{project.role}</span>
      </div>
      <H className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl" style={{ textShadow: `0 0 28px ${project.accent}55` }}>
        {project.name}
      </H>
      <p className="mt-2 text-lg text-fg/90">{project.summary}</p>
      <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

      <Sub className="mono-label mt-7 mb-3">Highlights</Sub>
      <ul className="space-y-2.5">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-3 text-sm leading-relaxed text-fg/90">
            <span aria-hidden className="mt-1.5 size-2 shrink-0 rotate-45" style={{ background: project.accent }} />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <Sub className="mono-label mt-7 mb-3">Stack</Sub>
      <ul className="flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <li key={s} className="chip">
            {s}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-3">
        <ProjectLinks project={project} />
        {showFullPageLink && (
          <Link href={`/projects/${project.slug}`} className="btn btn-ghost !py-2.5 text-sm">
            Full page <ArrowRightIcon size={16} />
          </Link>
        )}
      </div>
      {!project.links.live && project.status === 'Archived' && (
        <p className="mt-4 text-xs text-muted">This project is no longer online; screenshots and details are kept here for reference.</p>
      )}
    </div>
  )
}
