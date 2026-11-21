import { profile } from '@/data/profile'

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hoomanhajarian.com').replace(/\/$/, '')

export const SITE_TITLE = `${profile.name} — ${profile.headline} (React, Next.js, TypeScript, Node.js)`

export const SITE_DESCRIPTION =
  'Hooman Hajarian is a Full Stack Developer building production web and mobile products with React, Next.js, TypeScript and Node.js. Founder of Threeprinted. Open to full-time roles. View projects, experience and resume.'

export const NAV_SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'data', label: 'Data' },
  { id: 'contact', label: 'Contact' },
] as const

export function absoluteUrl(path = '/') {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
