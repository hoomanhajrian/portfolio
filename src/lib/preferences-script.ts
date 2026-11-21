/**
 * Runs synchronously in <head> before first paint:
 * - applies the saved theme (dark by default)
 * - decides whether this device may use the 3D hallway: the screen's short side
 *   must be >= 600px (tablets/desktops, never phones) and WebGL2 must exist
 * - picks the view mode: saved choice, else 3D unless reduced motion is preferred
 */
export const PREFERENCES_SCRIPT = `(function(){try{var d=document.documentElement;var t=localStorage.getItem('theme');d.dataset.theme=t==='light'?'light':'dark';var s=Math.min(screen.width,screen.height);var can=s>=600&&typeof WebGL2RenderingContext!=='undefined';var v=localStorage.getItem('view-mode');var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;var hash=location.hash||'';var force2d=/^#(about|skills|experience|projects|data|contact)$/.test(hash);d.dataset.can3d=can?'1':'0';d.dataset.view=can&&!force2d?(v==='2d'||v==='3d'?v:(rm?'2d':'3d')):'2d'}catch(e){}})()`
