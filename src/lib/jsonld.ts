import { profile, keywords, education } from '@/data/profile'
import type { Project } from '@/data/projects'
import { SITE_URL, absoluteUrl } from './site'

/** Serialize JSON-LD safely for a <script> tag (prevents `</script>` injection). */
export function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: profile.name,
    url: SITE_URL,
    image: absoluteUrl(profile.photo.src),
    jobTitle: profile.headline,
    description: profile.summary,
    email: `mailto:${profile.email}`,
    sameAs: [profile.links.linkedin, profile.links.github],
    knowsAbout: keywords,
    knowsLanguage: profile.languages,
    alumniOf: [...new Set(education.map((e) => e.school))].map((name) => ({ '@type': 'CollegeOrUniversity', name })),
    worksFor: { '@type': 'Organization', name: 'Threeprinted', url: 'https://www.threeprinted.com/' },
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: `${profile.name} — Portfolio`,
    author: { '@id': `${SITE_URL}/#person` },
  }
}

export function projectJsonLd(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.summary,
    url: absoluteUrl(`/projects/${project.slug}`),
    image: absoluteUrl(project.image.src),
    dateCreated: project.period.start,
    keywords: project.stack.join(', '),
    author: { '@id': `${SITE_URL}/#person` },
    ...(project.links.live ? { sameAs: project.links.live } : {}),
  }
}
