'use client'

import dynamic from 'next/dynamic'
import { useCan3D, useViewMode } from '@/lib/preferences'

// three.js + R3F live in this chunk; it is only requested when the 3D view is active,
// so phones (which can never enter 3D) never download it.
const Hallway = dynamic(() => import('./Hallway'), { ssr: false })

export function ExperienceShell() {
  const mode = useViewMode()
  const can3D = useCan3D()
  if (mode !== '3d' || !can3D) return null
  return <Hallway />
}
