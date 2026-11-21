'use client'

import { useMemo, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text, useCursor } from '@react-three/drei'
import { easing } from 'maath'
import * as THREE from 'three'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { CORRIDOR, DOORS, END_WALL_Z, START_Z, type DoorId } from './layout'
import { actions, useHallway } from './store'

const FONT_DISPLAY = '/fonts/SpaceGrotesk-Bold.woff'
const FONT_MONO = '/fonts/JetBrainsMono-Medium.woff'

/** Title sign hanging over the entrance. */
export function EntranceSign() {
  const z = START_Z - 5
  // Shrink the sign on portrait screens (tablets held upright) so the name stays fully visible.
  const aspect = useThree((s) => s.size.width / s.size.height)
  const scale = Math.min(1, aspect * 1.1)
  return (
    <group position={[0, CORRIDOR.height - 0.95, z]} scale={scale}>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[6.4, 1.5]} />
        <meshBasicMaterial color="#05070d" />
      </mesh>
      <mesh position={[0, -0.76, -0.01]}>
        <planeGeometry args={[6.4, 0.025]} />
        <meshBasicMaterial color={new THREE.Color('#22d3ee').multiplyScalar(2.5)} toneMapped={false} />
      </mesh>
      <Text font={FONT_MONO} fontSize={0.11} letterSpacing={0.35} color="#22d3ee" position={[0, 0.48, 0]} anchorY="middle">
        {`// ${profile.headline.toUpperCase()}`}
      </Text>
      <Text font={FONT_DISPLAY} fontSize={0.52} color="#e6edf7" position={[0, 0.08, 0]} anchorY="middle" letterSpacing={-0.01}>
        {profile.name.toUpperCase()}
      </Text>
      <Text font={FONT_MONO} fontSize={0.12} color="#a78bfa" position={[0, -0.38, 0]} anchorY="middle" letterSpacing={0.08}>
        {`${profile.tagline}  ·  ${projects.length} PROJECTS AHEAD`}
      </Text>
    </group>
  )
}

function Door({ id, label, sub, x, color }: { id: DoorId; label: string; sub: string; x: number; color: string }) {
  const [hover, setHover] = useState(false)
  const active = useHallway((s) => s.panel === id)
  const frameMat = useRef<THREE.MeshBasicMaterial>(null)
  const portalMat = useRef<THREE.MeshBasicMaterial>(null)
  const glow = useRef({ v: 0.6 })
  const base = useMemo(() => new THREE.Color(color), [color])
  const tmp = useMemo(() => new THREE.Color(), [])
  useCursor(hover)

  useFrame((state, delta) => {
    const pulse = 0.15 * Math.sin(state.clock.elapsedTime * 2 + x)
    easing.damp(glow.current, 'v', active ? 2.6 : hover ? 2.2 : 1.1 + pulse, 0.2, delta)
    frameMat.current?.color.copy(tmp.copy(base).multiplyScalar(glow.current.v))
    if (portalMat.current) portalMat.current.opacity = 0.08 + glow.current.v * 0.06
  })

  const W = 1.5
  const H = 2.7
  return (
    <group
      position={[x, H / 2, END_WALL_Z + 0.02]}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHover(true)
      }}
      onPointerOut={() => setHover(false)}
      onClick={(e) => {
        e.stopPropagation()
        actions.openPanel(id)
      }}
    >
      {/* Outline */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[W + 0.08, H + 0.08]} />
        <meshBasicMaterial ref={frameMat} color={color} toneMapped={false} />
      </mesh>
      {/* Portal surface */}
      <mesh position={[0, 0, 0.005]}>
        <planeGeometry args={[W, H]} />
        <meshBasicMaterial color="#05070d" />
      </mesh>
      <mesh position={[0, 0, 0.008]}>
        <planeGeometry args={[W, H]} />
        <meshBasicMaterial ref={portalMat} color={color} transparent opacity={0.12} toneMapped={false} />
      </mesh>
      <Text font={FONT_DISPLAY} fontSize={0.22} color="#e6edf7" position={[0, 0.25, 0.02]} anchorY="middle" maxWidth={W - 0.2} textAlign="center">
        {label}
      </Text>
      <Text font={FONT_MONO} fontSize={0.075} color={color} position={[0, -0.05, 0.02]} anchorY="middle" letterSpacing={0.1}>
        {sub.toUpperCase()}
      </Text>
      <Text font={FONT_MONO} fontSize={0.07} color={hover ? color : '#4b5a73'} position={[0, -H / 2 + 0.25, 0.02]} anchorY="middle" letterSpacing={0.2}>
        {hover ? 'CLICK TO ENTER' : 'DOOR'}
      </Text>
    </group>
  )
}

/** The end of the hallway: three doors for About, Contact and Resume. */
export function EndRoom() {
  return (
    <group>
      <Text font={FONT_MONO} fontSize={0.14} color="#93a1b8" position={[0, 3.35, END_WALL_Z + 0.02]} letterSpacing={0.4} anchorY="middle">
        {'END OF THE HALLWAY  ·  WHAT NEXT?'}
      </Text>
      {DOORS.map((d) => (
        <Door key={d.id} {...d} />
      ))}
    </group>
  )
}
