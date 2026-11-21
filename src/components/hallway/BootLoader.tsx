/** Shown by CSS (html[data-view="3d"]) before the 3D bundle has loaded, so there is no flash of the 2D site. */
export function BootLoader() {
  return (
    <div id="boot-loader" aria-hidden className="fixed inset-0 z-[60] flex-col items-center justify-center gap-4 bg-bg">
      <div className="size-12 animate-spin rounded-full border-2 border-line border-t-accent" />
      <p className="font-mono text-xs tracking-[0.3em] text-muted uppercase">Initializing hallway</p>
    </div>
  )
}
