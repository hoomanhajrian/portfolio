import { projects, type Project } from '@/data/projects'

/** World units are metres. The corridor runs along -Z; the visitor starts at START_Z looking toward -Z. */
export const CORRIDOR = { width: 7, height: 4.4, eye: 1.65 }
export const HALF_W = CORRIDOR.width / 2
export const START_Z = 7
export const FIRST_FRAME_Z = -3
export const STEP = 4.4
export const FRAME_Y = 1.85
export const FRAME_MAX = { w: 2.8, h: 1.85 }
/** How far from the wall the camera stands when focusing a frame. */
export const FOCUS_DISTANCE = 3.3

export type FrameSlot = {
  project: Project
  index: number
  /** -1 = left wall, +1 = right wall */
  side: -1 | 1
  x: number
  z: number
  w: number
  h: number
}

export const frames: FrameSlot[] = projects.map((project, index) => {
  const side = index % 2 === 0 ? -1 : 1
  const aspect = project.image.width / project.image.height
  let w = FRAME_MAX.w
  let h = w / aspect
  if (h > FRAME_MAX.h) {
    h = FRAME_MAX.h
    w = h * aspect
  }
  return { project, index, side, x: side * (HALF_W - 0.04), z: FIRST_FRAME_Z - index * STEP, w, h }
})

export const LAST_FRAME_Z = frames[frames.length - 1].z
export const END_WALL_Z = LAST_FRAME_Z - 10
/** The rail stops in front of the end-room doors. */
export const RAIL_END_Z = END_WALL_Z + 5.5
export const RAIL_LENGTH = START_Z - RAIL_END_Z
export const CORRIDOR_LENGTH = START_Z - END_WALL_Z + 4

/** Rail distance (0..RAIL_LENGTH) <-> world z. */
export const zAtDistance = (d: number) => START_Z - d
export const distanceAtZ = (z: number) => START_Z - z
export const clampDistance = (d: number) => Math.min(RAIL_LENGTH, Math.max(0, d))

/** Rail distance at which a frame is comfortably in view while walking. */
export const viewDistanceFor = (slot: FrameSlot) => clampDistance(distanceAtZ(slot.z) - 1.2)

export const DOORS = [
  { id: 'about', label: 'About me', sub: 'Experience & skills', x: -2.3, color: '#22d3ee' },
  { id: 'contact', label: 'Contact', sub: 'Send me a message', x: 0, color: '#a78bfa' },
  { id: 'resume', label: 'Resume', sub: 'Download PDF', x: 2.3, color: '#f472b6' },
] as const

export type DoorId = (typeof DOORS)[number]['id']
