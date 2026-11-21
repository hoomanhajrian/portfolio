import { ScrambleText } from '@/components/motion/ScrambleText'
import { Reveal } from '@/components/motion/Reveal'

export function SectionHeading({ index, label, title, intro, id }: { index: string; label: string; title: string; intro?: string; id?: string }) {
  return (
    <div className="mb-10 max-w-3xl md:mb-14">
      <p className="mono-label flex items-center gap-3">
        <span className="text-muted">{index}</span>
        <span className="h-px w-10 bg-gradient-to-r from-accent to-transparent" aria-hidden />
        {label}
      </p>
      <h2 id={id} className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
        <ScrambleText text={title} />
      </h2>
      {intro && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{intro}</p>
        </Reveal>
      )}
    </div>
  )
}
