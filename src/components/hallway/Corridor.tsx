'use client'

import { useLayoutEffect, useMemo, useRef } from 'react'
import { MeshReflectorMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { CORRIDOR, CORRIDOR_LENGTH, END_WALL_Z, FIRST_FRAME_Z, HALF_W, START_Z, STEP, frames } from './layout'

const WALL_COLOR = '#0a0f1c'
const CYAN = new THREE.Color('#22d3ee').multiplyScalar(2.2)
const VIOLET = new THREE.Color('#a78bfa').multiplyScalar(2)

/** Vertical light pillars between frames on both walls, drawn as one instanced mesh. */
function WallPillars() {
  const ref = useRef<THREE.InstancedMesh>(null)
  const positions = useMemo(() => {
    const list: { x: number; z: number; c: THREE.Color }[] = []
    for (let i = -1; i < frames.length + 1; i++) {
      const z = FIRST_FRAME_Z - i * STEP + STEP / 2
      list.push({ x: -HALF_W + 0.03, z, c: i % 2 ? VIOLET : CYAN })
      list.push({ x: HALF_W - 0.03, z, c: i % 2 ? CYAN : VIOLET })
    }
    return list
  }, [])

  useLayoutEffect(() => {
    const mesh = ref.current
    if (!mesh) return
    const m = new THREE.Matrix4()
    positions.forEach((p, i) => {
      m.makeTranslation(p.x, CORRIDOR.height / 2, p.z)
      mesh.setMatrixAt(i, m)
      mesh.setColorAt(i, p.c)
    })
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [positions])

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, positions.length]} frustumCulled={false}>
      <boxGeometry args={[0.04, CORRIDOR.height - 0.6, 0.06]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  )
}

/** Thin glowing lines across the floor, aligned with the wall pillars. */
function FloorLines() {
  const ref = useRef<THREE.InstancedMesh>(null)
  const count = frames.length + 2
  useLayoutEffect(() => {
    const mesh = ref.current
    if (!mesh) return
    const m = new THREE.Matrix4()
    const r = new THREE.Matrix4().makeRotationX(-Math.PI / 2)
    for (let i = 0; i < count; i++) {
      const z = FIRST_FRAME_Z - (i - 1) * STEP + STEP / 2
      m.makeTranslation(0, 0.003, z).multiply(r)
      mesh.setMatrixAt(i, m)
    }
    mesh.instanceMatrix.needsUpdate = true
  }, [count])
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]} frustumCulled={false}>
      <planeGeometry args={[CORRIDOR.width, 0.02]} />
      <meshBasicMaterial color={new THREE.Color('#0e7490')} toneMapped={false} transparent opacity={0.55} />
    </instancedMesh>
  )
}

export function Corridor({ tier }: { tier: 'high' | 'low' }) {
  const len = CORRIDOR_LENGTH
  const midZ = START_Z + 4 - len / 2

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, midZ]}>
        <planeGeometry args={[CORRIDOR.width, len]} />
        {tier === 'high' ? (
          <MeshReflectorMaterial
            resolution={512}
            blur={[300, 80]}
            mixBlur={1}
            mixStrength={30}
            roughness={0.9}
            depthScale={1}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.3}
            color="#06080f"
            metalness={0.6}
            mirror={0.6}
          />
        ) : (
          <meshStandardMaterial color="#070a12" roughness={0.45} metalness={0.6} />
        )}
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, CORRIDOR.height, midZ]}>
        <planeGeometry args={[CORRIDOR.width, len]} />
        <meshStandardMaterial color="#05070d" roughness={1} />
      </mesh>

      {/* Walls */}
      {[-1, 1].map((side) => (
        <mesh key={side} rotation={[0, (-side * Math.PI) / 2, 0]} position={[side * HALF_W, CORRIDOR.height / 2, midZ]}>
          <planeGeometry args={[len, CORRIDOR.height]} />
          <meshStandardMaterial color={WALL_COLOR} roughness={0.85} metalness={0.2} />
        </mesh>
      ))}

      {/* End wall */}
      <mesh position={[0, CORRIDOR.height / 2, END_WALL_Z]}>
        <planeGeometry args={[CORRIDOR.width, CORRIDOR.height]} />
        <meshStandardMaterial color="#070b16" roughness={0.9} />
      </mesh>
      {/* Wall behind the start */}
      <mesh position={[0, CORRIDOR.height / 2, START_Z + 4]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[CORRIDOR.width, CORRIDOR.height]} />
        <meshStandardMaterial color="#070b16" roughness={0.9} />
      </mesh>

      {/* Neon strips: ceiling rails and floor edges */}
      {[-1.4, 1.4].map((x) => (
        <mesh key={`c${x}`} position={[x, CORRIDOR.height - 0.02, midZ]}>
          <boxGeometry args={[0.06, 0.02, len]} />
          <meshBasicMaterial color={CYAN} toneMapped={false} />
        </mesh>
      ))}
      {[-1, 1].map((side) => (
        <mesh key={`f${side}`} position={[side * (HALF_W - 0.02), 0.03, midZ]}>
          <boxGeometry args={[0.03, 0.04, len]} />
          <meshBasicMaterial color={side < 0 ? CYAN : VIOLET} toneMapped={false} />
        </mesh>
      ))}
      {/* Centre guide line on the floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, midZ]}>
        <planeGeometry args={[0.025, len]} />
        <meshBasicMaterial color={new THREE.Color('#22d3ee').multiplyScalar(1.2)} toneMapped={false} transparent opacity={0.6} />
      </mesh>

      <WallPillars />
      <FloorLines />
    </group>
  )
}
