'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'
import * as THREE from 'three'
import { actions, getState, rail } from './store'
import { CORRIDOR, DOORS, END_WALL_Z, FOCUS_DISTANCE, FRAME_Y, frames, clampDistance, zAtDistance } from './layout'

const WALK_SPEED = 7 // m/s while a key is held

/**
 * Drives the camera every frame:
 * - walking: damped position along the rail plus a gentle look toward the nearest frame and mouse/drag offsets
 * - focused: flies to stand in front of the chosen frame, framed on the left so the details panel fits on the right
 * - end-room panel open: faces the door that was opened
 */
export function CameraRig() {
  const camera = useThree((s) => s.camera)
  const look = useRef(new THREE.Vector3(0, CORRIDOR.eye, -10))
  const pos = useRef(new THREE.Vector3())
  const dir = useRef(new THREE.Vector3())
  const ahead = useRef(new THREE.Vector3())
  const yaw = useRef({ v: 0, p: 0 })
  const lastNearest = useRef<number | null>(null)

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.1)
    const s = getState()

    if (rail.walk !== 0 && s.focused === null && s.panel === null) {
      rail.target = clampDistance(rail.target + rail.walk * WALK_SPEED * delta)
    }
    easing.damp(rail, 'current', rail.target, 0.35, delta)
    easing.damp(yaw.current, 'v', rail.yawTarget, 0.25, delta)
    easing.damp(yaw.current, 'p', rail.pitchTarget, 0.25, delta)

    const z = zAtDistance(rail.current)

    // Nearest frame (for the HUD hint, proximity glow and Enter-to-open).
    let nearest: number | null = null
    let best = 3.2
    for (const f of frames) {
      const d = Math.abs(f.z - (z - 1.2))
      if (d < best) {
        best = d
        nearest = f.index
      }
    }
    if (nearest !== lastNearest.current) {
      lastNearest.current = nearest
      actions.setNearest(nearest)
    }

    const focused = s.focused !== null ? frames[s.focused] : null
    const door = s.panel && s.panel !== 'projects' ? DOORS.find((d) => d.id === s.panel) : null

    if (focused) {
      // Face the wall square-on, shifted along it so the frame sits in the left part of the screen
      // (the details panel takes the right side).
      const shift = focused.side * Math.max(0.9, focused.w * 0.5)
      pos.current.set(focused.side * (Math.abs(focused.x) - FOCUS_DISTANCE), FRAME_Y - 0.1, focused.z + shift)
      easing.damp3(camera.position, pos.current, 0.45, delta)
      easing.damp3(look.current, [focused.x, FRAME_Y - 0.1, focused.z + shift], 0.35, delta)
    } else if (door) {
      pos.current.set(door.x + 0.9, CORRIDOR.eye, END_WALL_Z + 4.2)
      easing.damp3(camera.position, pos.current, 0.45, delta)
      easing.damp3(look.current, [door.x + 0.9, 1.6, END_WALL_Z], 0.35, delta)
    } else {
      // Walking: drift the gaze toward the closest frame's wall for a natural "looking at the art" feel.
      let bias = 0
      if (nearest !== null) {
        const f = frames[nearest]
        const prox = 1 - Math.min(1, Math.abs(f.z - (z - 1.6)) / 3)
        bias = -f.side * 0.28 * prox
      }
      const yawAngle = yaw.current.v + bias
      const pitch = yaw.current.p
      pos.current.set(0, CORRIDOR.eye, z)
      easing.damp3(camera.position, pos.current, 0.18, delta)
      dir.current.set(-Math.sin(yawAngle) * Math.cos(pitch), Math.sin(pitch), -Math.cos(yawAngle) * Math.cos(pitch))
      ahead.current.copy(camera.position).addScaledVector(dir.current, 6)
      easing.damp3(look.current, ahead.current, 0.12, delta)
    }

    camera.lookAt(look.current)
  })

  return null
}
