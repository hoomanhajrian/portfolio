'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { profile } from '@/data/profile'
import { ScrambleText } from '@/components/motion/ScrambleText'
import { HeroFluid } from '@/components/effects/HeroFluid'
import { Enter3DButton } from '@/components/site/Toggles'
import { ArrowRightIcon, DownloadIcon, GitHubIcon, LinkedInIcon } from '@/components/site/icons'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 0.85])

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 pb-28">
      <HeroFluid />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,color-mix(in_srgb,var(--accent)_14%,transparent),transparent_60%)]" />
      <motion.div aria-hidden style={{ y: gridY }} className="absolute inset-x-[-50%] bottom-[-10%] -z-10 h-[55%]">
        <div className="grid-floor h-full w-full animate-grid-scroll opacity-40" />
      </motion.div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.35fr_0.65fr] lg:px-8">
        <div>
          <motion.p {...fadeUp(0)} className="mono-label flex items-center gap-2">
            <span className="text-muted">{'//'}</span> {profile.headline}
            <span className="animate-blink inline-block h-4 w-2 bg-accent" aria-hidden />
          </motion.p>

          <h1 id="hero-title" className="mt-5 font-display text-5xl leading-[0.95] font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="block text-muted text-2xl font-medium tracking-normal sm:text-3xl md:text-4xl">Hi, I&apos;m</span>
            <ScrambleText text={profile.name} trigger="mount" duration={1100} delay={150} className="neon-text block pb-2" />
          </h1>

          <motion.p {...fadeUp(0.25)} className="mt-4 font-mono text-sm text-accent-2 sm:text-base">
            {profile.tagline}
          </motion.p>

          {/* Not faded in: this paragraph can be the mobile LCP element, so it must paint immediately. */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            {profile.valueProp}
          </p>

          {profile.openToWork && (
            <motion.p {...fadeUp(0.45)} className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-sm text-emerald-300 light:text-emerald-700">
              <span className="animate-pulse-ring size-2 rounded-full bg-emerald-400" aria-hidden />
              {profile.availability}
            </motion.p>
          )}

          <motion.div {...fadeUp(0.55)} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn btn-primary">
              View projects <ArrowRightIcon size={18} />
            </a>
            <a href={profile.links.resume} download="Hooman-Hajarian-Resume.pdf" className="btn btn-ghost">
              <DownloadIcon size={18} /> Download resume
            </a>
            <a href="#contact" className="btn btn-ghost">
              Contact me
            </a>
            <Enter3DButton className="!py-3" label="Walk the 3D hallway" />
          </motion.div>

          <motion.div {...fadeUp(0.65)} className="mt-8 flex items-center gap-4 text-muted">
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm hover:text-accent">
              <LinkedInIcon /> LinkedIn
            </a>
            <span className="h-4 w-px bg-line" aria-hidden />
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm hover:text-accent">
              <GitHubIcon /> GitHub
            </a>
          </motion.div>

          <motion.dl {...fadeUp(0.75)} className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-line pt-6">
            {profile.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-semibold text-fg md:text-4xl">{s.value}</dd>
                <dd className="mt-1 text-xs leading-snug text-muted sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div style={{ scale: photoScale }} className="relative mx-auto hidden w-full max-w-sm lg:block">
          <div aria-hidden className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-accent/30 via-accent-2/20 to-accent-3/20 blur-2xl" />
          <div className="neon-border relative overflow-hidden rounded-[2rem] border border-line bg-bg-elev">
            <Image
              src={profile.photo.src}
              alt={profile.photo.alt}
              width={profile.photo.width}
              height={profile.photo.height}
              priority
              sizes="(min-width: 1024px) 384px, 0px"
              className="h-auto w-full object-cover"
            />
            <div aria-hidden className="scanlines pointer-events-none absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/85 to-transparent p-5 pt-16">
              <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">Currently</p>
              <p className="mt-1 text-sm text-fg">Founder &amp; developer at Threeprinted</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <a href="#about" aria-label="Scroll to About" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted hover:text-accent">
        <span className="flex h-10 w-6 justify-center rounded-full border border-current pt-2">
          <motion.span
            className="block h-2 w-1 rounded-full bg-current"
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </a>
    </section>
  )
}
