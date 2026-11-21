import { profile } from '@/data/profile'
import { ContactForm } from '@/components/contact/ContactForm'
import { Reveal } from '@/components/motion/Reveal'
import { DownloadIcon, GitHubIcon, LinkedInIcon } from '@/components/site/icons'
import { SectionHeading } from './SectionHeading'

export function ContactLinks() {
  const items = [
    { href: profile.links.linkedin, label: 'LinkedIn', sub: 'linkedin.com/in/hooman-hajarian', icon: <LinkedInIcon />, external: true },
    { href: profile.links.github, label: 'GitHub', sub: 'github.com/hoomanhajrian', icon: <GitHubIcon />, external: true },
    { href: profile.links.resume, label: 'Resume', sub: 'Download PDF', icon: <DownloadIcon />, download: true },
  ]
  return (
    <ul className="space-y-3">
      {items.map((it) => (
        <li key={it.label}>
          <a
            href={it.href}
            {...(it.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            {...(it.download ? { download: 'Hooman-Hajarian-Resume.pdf' } : {})}
            className="panel group flex items-center gap-4 p-4 transition-colors hover:border-accent/50"
          >
            <span className="grid size-11 place-items-center rounded-xl border border-line bg-bg text-accent transition-shadow group-hover:shadow-[var(--glow)]">{it.icon}</span>
            <span>
              <span className="block font-medium text-fg">{it.label}</span>
              <span className="block text-sm text-muted">{it.sub}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-24 md:py-32">
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-[radial-gradient(ellipse_at_bottom,color-mix(in_srgb,var(--accent-2)_16%,transparent),transparent_65%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="contact-title"
          index="06"
          label="Contact"
          title="Let's work together"
          intro="Hiring for a full stack or front end role, or have a project in mind? Send me a message and it lands straight in my inbox."
        />
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <ContactLinks />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="panel neon-border p-6 md:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
