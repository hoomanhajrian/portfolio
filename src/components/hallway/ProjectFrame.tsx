'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { Text, useCursor, useTexture } from '@react-three/drei'
import { easing } from 'maath'
import * as THREE from 'three'
import { formatPeriod } from '@/data/projects'
import { FRAME_Y, zAtDistance, type FrameSlot } from './layout'
import { actions, getState, rail, useHallway } from './store'

const FONT_DISPLAY = '/fonts/SpaceGrotesk-Bold.woff'
const FONT_MONO = '/fonts/JetBrainsMono-Medium.woff'
const LOAD_AHEAD = 32 // metres: textures load when the visitor gets this close

function Artwork({ slot }: { slot: FrameSlot }) {
  const { project, w, h } = slot
  const texture = useTexture(project.image.texture, (t) => {
    const tex = Array.isArray(t) ? t[0] : t
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 4
  })
  const contain = project.image.fit === 'contain'
  // Logos sit inside a padded square; screenshots fill the frame.
  const iw = contain ? Math.min(w, h) * 0.78 : w
  const ih = contain ? iw * (project.image.height / project.image.width) : h
  return (
    <mesh position={[0, 0, 0.012]}>
      <planeGeometry args={[iw, ih]} />
      <meshBasicMaterial map={texture} toneMapped={false} transparent={contain} />
    </mesh>
  )
}

/** Suspense fallback while a nearby frame's artwork downloads; reports itself to the HUD's small loading pill. */
function LoadingPlaceholder({ slot }: { slot: FrameSlot }) {
  useEffect(() => {
    actions.frameLoading(slot.project.slug, true)
    return () => actions.frameLoading(slot.project.slug, false)
  }, [slot.project.slug])
  return <Placeholder slot={slot} />
}

function Placeholder({ slot }: { slot: FrameSlot }) {
  return (
    <mesh position={[0, 0, 0.011]}>
      <planeGeometry args={[slot.w * 0.98, slot.h * 0.98]} />
      <meshBasicMaterial color={slot.project.accent} transparent opacity={0.08} />
    </mesh>
  )
}

export function ProjectFrame({ slot }: { slot: FrameSlot }) {
  const { project, index, side, x, z, w, h } = slot
  const [near, setNear] = useState(index < 3)
  const [hover, setHover] = useState(false)
  const nearest = useHallway((s) => s.nearest === index)
  const focused = useHallway((s) => s.focused === index)
  const group = useRef<THREE.Group>(null)
  const border = useRef<THREE.MeshBasicMaterial>(null)
  const glow = useRef({ v: 0.25 })
  const accent = useMemo(() => new THREE.Color(project.accent), [project.accent])
  const tmp = useMemo(() => new THREE.Color(), [])
  useCursor(hover)

  useFrame((_, delta) => {
    const camZ = zAtDistance(rail.current)
    if (!near && Math.abs(camZ - z) < LOAD_AHEAD) setNear(true)
    const target = focused ? 2.4 : hover ? 2.2 : nearest ? 1.4 : 0.35
    easing.damp(glow.current, 'v', target, 0.2, delta)
    if (border.current) border.current.color.copy(tmp.copy(accent).multiplyScalar(glow.current.v))
    if (group.current) {
      // Hovered frames lean out of the wall a little.
      easing.damp(group.current.position, 'x', x - side * (hover ? 0.12 : 0), 0.15, delta)
    }
  })

  const onOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    if (getState().focused !== null) return
    setHover(true)
    actions.setHovered(index)
  }
  const onOut = () => {
    setHover(false)
    actions.setHovered(null)
  }
  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    actions.focus(index)
  }

  const plaqueY = -h / 2 - 0.32
  const stack = project.stack.slice(0, 3).join('  ·  ')

  return (
    <group
      ref={group}
      position={[x, FRAME_Y, z]}
      rotation={[0, side < 0 ? Math.PI / 2 : -Math.PI / 2, 0]}
      onPointerOver={onOver}
      onPointerOut={onOut}
      onClick={onClick}
    >
      {/* Glowing border (slightly larger plane behind the artwork) */}
      <mesh position={[0, 0, 0.004]}>
        <planeGeometry args={[w + 0.09, h + 0.09]} />
        <meshBasicMaterial ref={border} color={accent} toneMapped={false} />
      </mesh>
      {/* Backing */}
      <mesh position={[0, 0, 0.008]}>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial color="#0b1222" />
      </mesh>
      {near ? (
        <Suspense fallback={<LoadingPlaceholder slot={slot} />}>
          <Artwork slot={slot} />
        </Suspense>
      ) : (
        <Placeholder slot={slot} />
      )}

      {/* Index + status above the frame, hint on the right */}
      <Text font={FONT_MONO} fontSize={0.13} color={project.accent} anchorX="left" anchorY="bottom" position={[-w / 2, h / 2 + 0.12, 0.01]} letterSpacing={0.2}>
        {`${String(index + 1).padStart(2, '0')} / ${project.status === 'Archived' ? 'OFFLINE' : (project.status?.toUpperCase() ?? '')}`}
      </Text>
      <Text
        font={FONT_MONO}
        fontSize={0.075}
        color={project.accent}
        anchorX="right"
        anchorY="bottom"
        position={[w / 2, h / 2 + 0.13, 0.01]}
        letterSpacing={0.14}
        fillOpacity={(hover || nearest) && !focused ? 1 : 0}
      >
        {hover ? 'CLICK TO OPEN' : 'ENTER / CLICK'}
      </Text>

      {/* Plaque */}
      <Text font={FONT_DISPLAY} fontSize={0.2} color="#e6edf7" anchorX="left" anchorY="top" position={[-w / 2, plaqueY + 0.18, 0.01]} maxWidth={Math.max(w, 1.6)}>
        {project.name}
      </Text>
      <Text font={FONT_MONO} fontSize={0.075} color="#93a1b8" anchorX="left" anchorY="top" position={[-w / 2, plaqueY - 0.08, 0.01]} maxWidth={Math.max(w, 1.6)} letterSpacing={0.05}>
        {`${formatPeriod(project.period)}  ·  ${stack}`}
      </Text>
    </group>
  )
}
