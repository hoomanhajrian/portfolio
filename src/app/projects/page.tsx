import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { formatPeriod, projects } from '@/data/projects'
import { SiteChrome } from '@/components/site/SiteChrome'
import { MotionProvider } from '@/components/motion/MotionProvider'
import { Reveal } from '@/components/motion/Reveal'
import { StatusBadge } from '@/components/project/ProjectDetails'
import { ArrowRightIcon } from '@/components/site/icons'

export const metadata: Metadata = {
  title: 'Projects',
  description: `All ${projects.length} projects by Hooman Hajarian: Next.js marketplaces and client websites, React apps and React Native mobile apps, with stacks, roles and links.`,
  alternates: { canonical: '/projects' },
  openGraph: { url: '/projects' },
}

export default function ProjectsPage() {
  return (
    <MotionProvider>
      <SiteChrome>
        <section className="mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
          <p className="mono-label">Portfolio</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-6xl">All projects</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            {projects.length} projects, newest first. Each page covers what was built, the stack and links to the live site or source code where available.
          </p>
          <ol className="mt-12 divide-y divide-line border-y border-line">
            {projects.map((p, i) => (
              <li key={p.slug}>
                <Reveal blur={false} amount={0.3}>
                  <Link href={`/projects/${p.slug}`} className="group grid items-center gap-4 py-5 sm:grid-cols-[3rem_7rem_1fr_auto] sm:gap-6">
                    <span className="hidden font-mono text-xs text-muted sm:block">{String(i + 1).padStart(2, '0')}</span>
                    <span
                      className="relative hidden aspect-[16/10] overflow-hidden rounded-xl border border-line sm:block"
                      style={{ background: `radial-gradient(circle, ${p.accent}33, transparent 70%), var(--bg-elev)` }}
                    >
                      <Image src={p.image.src} alt="" fill sizes="112px" className={p.image.fit === 'contain' ? 'object-contain p-2' : 'object-cover object-top'} />
                    </span>
                    <span>
                      <span className="flex flex-wrap items-center gap-3">
                        <span className="font-display text-xl font-semibold transition-colors group-hover:text-accent md:text-2xl">{p.name}</span>
                        <StatusBadge status={p.status} />
                      </span>
                      <span className="mt-1 block text-sm text-muted">{p.summary}</span>
                      <span className="mt-1 block font-mono text-xs text-muted">
                        {formatPeriod(p.period)} · {p.stack.slice(0, 4).join(' · ')}
                      </span>
                    </span>
                    <ArrowRightIcon className="hidden text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent sm:block" />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>
      </SiteChrome>
    </MotionProvider>
  )
}
