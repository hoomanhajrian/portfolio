import Link from 'next/link'
import { profile } from '@/data/profile'
import { NAV_SECTIONS } from '@/lib/site'
import { GitHubIcon, LinkedInIcon, MailIcon } from './icons'

export function Footer({ home = false }: { home?: boolean }) {
  const year = new Date().getFullYear()
  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-display text-xl font-semibold">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">
            {profile.headline} · {profile.tagline}
          </p>
          <p className="mt-4 max-w-sm text-sm text-muted">{profile.availability}.</p>
        </div>
        <nav aria-label="Footer">
          <p className="mono-label mb-3">Explore</p>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {NAV_SECTIONS.map((s) => (
              <li key={s.id}>
                <a className="text-muted hover:text-accent" href={home ? `#${s.id}` : `/#${s.id}`}>
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <Link className="text-muted hover:text-accent" href="/projects">
                All projects
              </Link>
            </li>
            <li>
              <a className="text-muted hover:text-accent" href={profile.links.resume}>
                Resume (PDF)
              </a>
            </li>
          </ul>
        </nav>
        <div>
          <p className="mono-label mb-3">Connect</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a className="inline-flex items-center gap-2 text-muted hover:text-accent" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon size={16} /> LinkedIn
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2 text-muted hover:text-accent" href={profile.links.github} target="_blank" rel="noopener noreferrer">
                <GitHubIcon size={16} /> GitHub
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2 text-muted hover:text-accent" href={home ? '#contact' : '/#contact'}>
                <MailIcon size={16} /> Contact form
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-4 py-5 font-mono text-xs text-muted sm:px-6 lg:px-8">
          © {year} {profile.name} · Built with Next.js, React Three Fiber &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  )
}
