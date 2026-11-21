'use client'

import { Component, Suspense, useEffect, useRef, type ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerformanceMonitor, Preload } from '@react-three/drei'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { setViewMode } from '@/lib/preferences'
import { frames, START_Z, CORRIDOR } from './layout'
import { actions, useHallway } from './store'
import { useRailControls } from './useRailControls'
import { CameraRig } from './CameraRig'
import { Corridor } from './Corridor'
import { ProjectFrame } from './ProjectFrame'
import { EndRoom, EntranceSign } from './Landmarks'
import { Hud, Loader } from './Hud'
import { InfoPanel, ProjectPanel } from './Panels'

/** If WebGL fails for any reason, fall back to the 2D site instead of showing a broken screen. */
class HallwayErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(error: unknown) {
    console.error('[hallway] falling back to 2D:', error)
    setViewMode('2d')
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

/** A light that travels with the visitor so nearby walls and floor are lit without dozens of lights. */
function CameraLight() {
  const light = useRef<THREE.PointLight>(null)
  const camera = useThree((s) => s.camera)
  useFrame(() => {
    if (light.current) light.current.position.set(camera.position.x, 3.4, camera.position.z - 1.5)
  })
  return <pointLight ref={light} color="#bdeffc" intensity={14} distance={14} decay={1.6} />
}

/** Wider field of view on portrait screens so the corridor doesn't feel cramped. */
function ResponsiveFov() {
  const get = useThree((s) => s.get)
  const aspect = useThree((s) => s.size.width / s.size.height)
  useEffect(() => {
    const camera = get().camera as THREE.PerspectiveCamera
    camera.fov = aspect < 1 ? 72 : aspect < 1.4 ? 64 : 58
    camera.updateProjectionMatrix()
  }, [aspect, get])
  return null
}

/** Marks the scene as ready after its first rendered frame (hides the loader). */
function ReadySignal() {
  const done = useRef(false)
  useFrame(() => {
    if (done.current) return
    done.current = true
    actions.setReady()
  })
  return null
}

function Scene({ tier }: { tier: 'high' | 'low' }) {
  return (
    <>
      <color attach="background" args={['#05070d']} />
      <fog attach="fog" args={['#05070d', 7, 36]} />
      <ambientLight intensity={0.45} />
      <hemisphereLight args={['#164e63', '#05070d', 0.6]} />
      <CameraLight />
      <Corridor tier={tier} />
      <EntranceSign />
      {frames.map((slot) => (
        <ProjectFrame key={slot.project.slug} slot={slot} />
      ))}
      <EndRoom />
      <ReadySignal />
      {tier === 'high' && (
        <EffectComposer multisampling={0}>
          <Bloom mipmapBlur intensity={0.85} luminanceThreshold={0.95} luminanceSmoothing={0.2} />
          <Vignette eskil={false} offset={0.25} darkness={0.75} />
        </EffectComposer>
      )}
      <Preload all />
    </>
  )
}

export default function Hallway() {
  const root = useRef<HTMLDivElement>(null)
  const tier = useHallway((s) => s.tier)
  useRailControls(root)

  useEffect(() => {
    // Touch devices (tablets) start on the lighter render path; PerformanceMonitor can lower desktops too.
    if (window.matchMedia('(pointer: coarse)').matches) actions.setTier('low')
    // Deep link: /#project-<slug> opens that frame.
    const m = window.location.hash.match(/^#project-(.+)$/)
    if (m) {
      const i = frames.findIndex((f) => f.project.slug === m[1])
      if (i >= 0) setTimeout(() => actions.focus(i), 600)
    }
    return () => {
      actions.unfocus()
      actions.closePanel()
    }
  }, [])

  return (
    <div ref={root} className="fixed inset-0 z-[70] overflow-hidden bg-bg text-fg select-none" data-hallway>
      <h1 className="sr-only">Hooman Hajarian, Full Stack Developer: 3D project hallway</h1>
      <HallwayErrorBoundary>
        <Canvas
          aria-hidden
          style={{ touchAction: 'none' }}
          dpr={tier === 'high' ? [1, 1.75] : [1, 1.25]}
          camera={{ fov: 58, near: 0.1, far: 60, position: [0, CORRIDOR.eye, START_Z] }}
          gl={{ antialias: tier === 'high', powerPreference: 'high-performance', alpha: false, stencil: false }}
        >
          <PerformanceMonitor flipflops={3} onDecline={() => actions.setTier('low')} onFallback={() => actions.setTier('low')} />
          <CameraRig />
          <ResponsiveFov />
          <Suspense fallback={null}>
            <Scene tier={tier} />
          </Suspense>
        </Canvas>
      </HallwayErrorBoundary>
      <Hud />
      <ProjectPanel />
      <InfoPanel />
      <Loader />
    </div>
  )
}
