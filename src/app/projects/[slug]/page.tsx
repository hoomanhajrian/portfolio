import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProject, projects } from '@/data/projects'
import { SiteChrome } from '@/components/site/SiteChrome'
import { MotionProvider } from '@/components/motion/MotionProvider'
import { ProjectDetails } from '@/components/project/ProjectDetails'
import { jsonLdString, projectJsonLd } from '@/lib/jsonld'

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(props: PageProps<'/projects/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const p = getProject(slug)
  if (!p) return {}
  const title = `${p.name}: ${p.stack.slice(0, 3).join(', ')} project`
  return {
    title,
    description: `${p.summary} Built by Hooman Hajarian (${p.role}).`,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { url: `/projects/${p.slug}`, title, description: p.summary, images: [{ url: p.image.src, width: p.image.width, height: p.image.height, alt: p.image.alt }] },
    twitter: { card: 'summary_large_image', title, description: p.summary, images: [p.image.src] },
  }
}

export default async function ProjectPage(props: PageProps<'/projects/[slug]'>) {
  const { slug } = await props.params
  const project = getProject(slug)
  if (!project) notFound()

  const index = projects.findIndex((p) => p.slug === slug)
  const prev = projects[index - 1]
  const next = projects[index + 1]

  return (
    <MotionProvider>
      <SiteChrome>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(projectJsonLd(project)) }} />
        <article className="mx-auto max-w-4xl px-4 pt-28 pb-20 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-muted">
            <Link href="/" className="hover:text-accent">Home</Link> / <Link href="/projects" className="hover:text-accent">Projects</Link> / <span className="text-fg">{project.name}</span>
          </nav>
          <ProjectDetails project={project} showFullPageLink={false} />
          <nav aria-label="More projects" className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
            {prev ? (
              <Link href={`/projects/${prev.slug}`} className="panel p-4 hover:border-accent/50">
                <span className="mono-label">Newer</span>
                <span className="mt-1 block font-display text-lg font-semibold">{prev.name}</span>
              </Link>
            ) : <span />}
            {next && (
              <Link href={`/projects/${next.slug}`} className="panel p-4 text-right hover:border-accent/50">
                <span className="mono-label">Older</span>
                <span className="mt-1 block font-display text-lg font-semibold">{next.name}</span>
              </Link>
            )}
          </nav>
          <div className="mt-10 text-center">
            <Link href="/#contact" className="btn btn-primary">Interested? Get in touch</Link>
          </div>
        </article>
      </SiteChrome>
    </MotionProvider>
  )
}
