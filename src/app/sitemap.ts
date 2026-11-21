import type { MetadataRoute } from 'next'
import { projects } from '@/data/projects'
import { absoluteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: absoluteUrl('/'), lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: absoluteUrl('/projects'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    ...projects.map((p) => ({
      url: absoluteUrl(`/projects/${p.slug}`),
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: p.featured ? 0.8 : 0.6,
    })),
    { url: absoluteUrl('/resume.pdf'), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
