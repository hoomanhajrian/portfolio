'use client'

import { useEffect, useRef } from 'react'
import type { Project } from '@/data/projects'
import { CloseIcon } from '@/components/site/icons'
import { ProjectDetails } from './ProjectDetails'

/**
 * Accessible modal built on the native <dialog> element (focus trap, Esc to close, inert background).
 * Used by the 2D project grid and the 3D hallway.
 */
export function ProjectDialog({
  project,
  onClose,
  children,
  label,
}: {
  project?: Project | null
  onClose: () => void
  children?: React.ReactNode
  label?: string
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const open = Boolean(project || children)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
      aria-label={label ?? project?.name}
      className="m-auto max-h-[92dvh] w-[min(56rem,94vw)] overflow-hidden rounded-3xl border border-line bg-bg-elev p-0 text-fg shadow-[0_0_80px_rgb(34_211_238/0.15)] backdrop:bg-black/70 backdrop:backdrop-blur-sm open:animate-[dialog-in_240ms_cubic-bezier(0.22,1,0.36,1)]"
    >
      {open && (
        <div className="max-h-[92dvh] overflow-y-auto p-5 sm:p-8">
          <button
            type="button"
            onClick={onClose}
            className="sticky top-0 z-10 float-right -mt-1 -mr-1 grid size-10 place-items-center rounded-xl border border-line bg-bg-elev/90 backdrop-blur hover:text-accent"
            aria-label="Close"
            autoFocus
          >
            <CloseIcon />
          </button>
          {project ? <ProjectDetails project={project} /> : children}
        </div>
      )}
    </dialog>
  )
}
