import { skillGroups } from '@/data/profile'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal'
import { SectionHeading } from './SectionHeading'

const marqueeA = ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'Stripe', 'REST APIs']
const marqueeB = ['React Native', 'Tailwind CSS', 'Express', 'Firebase', 'CI/CD', 'SQL', 'Java', 'C#', 'Python', 'Figma']

function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]" aria-hidden>
      <div className={`flex shrink-0 gap-3 pr-3 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {[...items, ...items].map((s, i) => (
          <span key={i} className="whitespace-nowrap rounded-xl border border-line bg-surface px-4 py-2 font-display text-lg text-muted md:text-2xl">
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="skills-title"
          index="02"
          label="Skills"
          title="Tools I ship with"
          intro="The stack I use day to day for production work, from typed front ends to cloud deployment."
        />
      </div>

      <div className="mb-14 space-y-3">
        <Marquee items={marqueeA} />
        <Marquee items={marqueeB} reverse />
      </div>

      <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
        {skillGroups.map((g, gi) => (
          <Reveal key={g.title} delay={(gi % 3) * 0.08}>
            <div className="panel h-full p-6">
              <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold">
                <span className="font-mono text-xs text-accent">{String(gi + 1).padStart(2, '0')}</span>
                {g.title}
              </h3>
              <RevealGroup className="flex flex-wrap gap-2" stagger={0.04}>
                {g.skills.map((s) => (
                  <RevealItem key={s} as="span" className="chip">
                    {s}
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
