import { projects } from '@/data/projects'
import { SectionHeading } from './SectionHeading'
import { Projects } from './Projects'

export function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="projects-title"
          index="04"
          label="Projects"
          title="Selected work"
          intro={`${projects.length} projects across marketplaces, client websites, mobile apps and tools. Tap any project for the full story, stack and links.`}
        />
        <Projects />
      </div>
    </section>
  )
}
