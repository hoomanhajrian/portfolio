import { ImageResponse } from 'next/og'
import { join } from 'node:path'
import { readFile } from 'node:fs/promises'
import { profile } from '@/data/profile'

export const alt = `${profile.name}, ${profile.headline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const photo = `data:image/jpeg;base64,${await readFile(join(process.cwd(), 'assets/images/me.jpg'), 'base64')}`

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'radial-gradient(circle at 20% 0%, #0e3a4a 0%, #05070d 55%), #05070d',
          color: '#e6edf7',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 720 }}>
          <div style={{ display: 'flex', fontSize: 22, letterSpacing: 6, color: '#22d3ee', textTransform: 'uppercase' }}>{'// Portfolio'}</div>
          <div style={{ display: 'flex', fontSize: 84, fontWeight: 700, lineHeight: 1.02, marginTop: 20 }}>{profile.name}</div>
          <div style={{ display: 'flex', fontSize: 40, marginTop: 18, color: '#a78bfa' }}>{profile.headline}</div>
          <div style={{ display: 'flex', fontSize: 28, marginTop: 14, color: '#93a1b8' }}>{profile.tagline}</div>
          <div style={{ display: 'flex', marginTop: 40, height: 4, width: 320, background: 'linear-gradient(90deg, #22d3ee, #a78bfa, #f472b6)' }} />
          <div style={{ display: 'flex', fontSize: 24, marginTop: 24, color: '#93a1b8' }}>hoomanhajarian.com</div>
        </div>
        <div style={{ display: 'flex', borderRadius: 32, padding: 4, background: 'linear-gradient(135deg, #22d3ee, #a78bfa)' }}>
          <img src={photo} width={300} height={386} alt="" style={{ borderRadius: 28, objectFit: 'cover' }} />
        </div>
      </div>
    ),
    size,
  )
}
