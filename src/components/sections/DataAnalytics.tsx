import { analytics } from '@/data/analytics'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal'
import { SectionHeading } from './SectionHeading'

export function DataAnalytics() {
  return (
    <section id="data" aria-labelledby="data-title" className="relative py-24 md:py-32">
      <div aria-hidden className="grid-bg absolute inset-0 -z-10 opacity-60" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="data-title" index="05" label="Data & Analytics" title="Engineering with data discipline" intro={analytics.intro} />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="panel neon-border h-full p-6 md:p-8">
              <p className="mono-label">Credential</p>
              <p className="mt-3 font-display text-2xl font-semibold">{analytics.credential.name}</p>
              <p className="text-sm text-muted">{analytics.credential.issuer}</p>
              <RevealGroup className="mt-6 flex flex-wrap gap-2">
                {analytics.skills.map((s) => (
                  <RevealItem key={s} as="span" className="chip">
                    {s}
                  </RevealItem>
                ))}
              </RevealGroup>
              <p className="mono-label mt-8 mb-3">Where it shows up in my engineering</p>
              <ul className="space-y-2.5 text-sm text-muted">
                {analytics.inEngineering.map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rotate-45 bg-accent" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <ol className="relative grid gap-4">
            {analytics.process.map((p, i) => (
              <li key={p.step}>
                <Reveal direction="left" delay={i * 0.07}>
                  <div className="panel group flex items-start gap-4 p-5 transition-colors hover:border-accent/50">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-bg font-mono text-sm text-accent transition-shadow group-hover:shadow-[var(--glow)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="font-display text-lg font-semibold">{p.step}</p>
                      <p className="text-sm text-muted">{p.detail}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
