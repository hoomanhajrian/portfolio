import Image from 'next/image'
import { profile, education, certifications } from '@/data/profile'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from './SectionHeading'

const facts = [
  { label: 'Role', value: profile.headline },
  { label: 'Currently', value: 'Founder & developer, Threeprinted · Freelance full stack developer' },
  { label: 'Core stack', value: profile.tagline },
  { label: 'Education', value: `${education[0].credential} (${education[0].school}) · ${education[1].credential}` },
  { label: 'Certified', value: certifications[0].name },
  { label: 'Languages', value: profile.languages.join(', ') },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="about-title" index="01" label="About" title="Product-minded full stack developer" />
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-5 text-base leading-relaxed text-muted md:text-lg">
            {profile.about.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal direction="left" delay={0.1}>
            <aside className="panel neon-border p-6" aria-label="Quick facts">
              <div className="mb-5 flex items-center gap-4 lg:hidden">
                <Image src={profile.photo.src} alt={profile.photo.alt} width={64} height={82} className="h-20 w-16 rounded-xl object-cover" />
                <div>
                  <p className="font-display text-lg font-semibold">{profile.name}</p>
                  <p className="text-sm text-muted">{profile.headline}</p>
                </div>
              </div>
              <p className="mono-label mb-4">Quick facts</p>
              <dl className="space-y-4">
                {facts.map((f) => (
                  <div key={f.label} className="grid grid-cols-[6.5rem_1fr] gap-3 text-sm">
                    <dt className="font-mono text-xs tracking-wider text-muted uppercase">{f.label}</dt>
                    <dd className="text-fg">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
