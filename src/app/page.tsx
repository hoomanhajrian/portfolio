import { SiteChrome } from '@/components/site/SiteChrome'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Experience } from '@/components/sections/Experience'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { DataAnalytics } from '@/components/sections/DataAnalytics'
import { Contact } from '@/components/sections/Contact'
import { ExperienceShell } from '@/components/hallway/ExperienceShell'
import { BootLoader } from '@/components/hallway/BootLoader'
import { MotionProvider } from '@/components/motion/MotionProvider'

export default function HomePage() {
  return (
    <MotionProvider>
      <SiteChrome home>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <ProjectsSection />
        <DataAnalytics />
        <Contact />
      </SiteChrome>
      <BootLoader />
      <ExperienceShell />
    </MotionProvider>
  )
}
