import type { MetadataRoute } from 'next'
import { profile } from '@/data/profile'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — ${profile.headline}`,
    short_name: 'HH Portfolio',
    description: `${profile.name}, ${profile.headline}. ${profile.tagline}.`,
    start_url: '/',
    display: 'standalone',
    background_color: '#05070d',
    theme_color: '#05070d',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
