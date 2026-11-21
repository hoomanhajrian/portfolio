import { experience, earlierExperience, education, certifications } from '@/data/profile'
import { Reveal } from '@/components/motion/Reveal'
import { TimelineLine } from '@/components/motion/TimelineLine'
import { SectionHeading } from './SectionHeading'

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="experience-title"
          index="03"
          label="Experience"
          title="Where I've built things"
          intro="From founding my own marketplace to freelance client work and enterprise software."
        />

        <TimelineLine>
          <ol className="space-y-10 md:space-y-14">
            {experience.map((job, i) => (
              <li key={`${job.company}-${job.role}`} className="relative pl-10 md:pl-0">
                <span
                  aria-hidden
                  className="absolute top-2 left-[11px] size-3 -translate-x-1/2 rounded-full border-2 border-accent bg-bg shadow-[0_0_12px_var(--accent)] md:left-1/2"
                />
                <Reveal direction={i % 2 === 0 ? 'right' : 'left'} className={`md:w-[calc(50%-2.5rem)] ${i % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                  <article className="panel p-6 md:p-7">
                    <p className="font-mono text-xs tracking-wider text-accent">
                      {job.start} — {job.end}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold md:text-2xl">{job.role}</h3>
                    <p className="text-muted">{job.company}</p>
                    {job.summary && <p className="mt-4 text-sm leading-relaxed text-fg/90">{job.summary}</p>}
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                      {job.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5">
                          <span aria-hidden className="mt-2 size-1.5 shrink-0 rotate-45 bg-accent-2" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    {job.stack && (
                      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                        {job.stack.map((s) => (
                          <li key={s} className="chip !text-xs">
                            {s}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </TimelineLine>

        <Reveal className="mt-10">
          <p className="text-sm text-muted">
            <span className="font-mono text-xs tracking-wider text-accent uppercase">Earlier · </span>
            {earlierExperience.map((e, i) => (
              <span key={e.company}>
                {i > 0 && ' · '}
                {e.role}, {e.company} ({e.start} – {e.end})
              </span>
            ))}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="panel h-full p-6 md:p-7">
              <h3 className="mono-label mb-5">Education</h3>
              <ul className="space-y-5">
                {education.map((e) => (
                  <li key={e.credential}>
                    <p className="font-medium text-fg">{e.credential}</p>
                    <p className="text-sm text-muted">
                      {e.school} · {e.start} – {e.end}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="panel h-full p-6 md:p-7">
              <h3 className="mono-label mb-5">Certifications</h3>
              <ul className="space-y-5">
                {certifications.map((c) => (
                  <li key={c.name}>
                    <p className="font-medium text-fg">{c.name}</p>
                    <p className="text-sm text-muted">
                      {c.issuer}
                      {c.note ? ` · ${c.note}` : ''}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
