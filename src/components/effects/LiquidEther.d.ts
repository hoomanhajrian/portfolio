import type { CSSProperties, JSX } from 'react'

export type LiquidEtherProps = {
  mouseForce?: number
  cursorSize?: number
  isViscous?: boolean
  viscous?: number
  iterationsViscous?: number
  iterationsPoisson?: number
  dt?: number
  BFECC?: boolean
  resolution?: number
  isBounce?: boolean
  colors?: string[] | null
  style?: CSSProperties
  className?: string
  autoDemo?: boolean
  autoSpeed?: number
  autoIntensity?: number
  takeoverDuration?: number
  autoResumeDelay?: number
  autoRampDuration?: number
}

export default function LiquidEther(props: LiquidEtherProps): JSX.Element
