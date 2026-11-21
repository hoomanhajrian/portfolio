import Link from 'next/link'
import { SiteChrome } from '@/components/site/SiteChrome'

export default function NotFound() {
  return (
    <SiteChrome>
      <section className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 pt-24 text-center">
        <p className="mono-label">Error 404</p>
        <h1 className="mt-3 font-display text-5xl font-semibold">Lost in the hallway</h1>
        <p className="mt-4 text-muted">That page doesn&apos;t exist. It may have moved when the site was rebuilt.</p>
        <div className="mt-8 flex gap-3">
          <Link href="/" className="btn btn-primary">Back home</Link>
          <Link href="/projects" className="btn btn-ghost">All projects</Link>
        </div>
      </section>
    </SiteChrome>
  )
}
