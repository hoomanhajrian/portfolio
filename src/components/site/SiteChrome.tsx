import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { Starfield } from '@/components/motion/Starfield'

/** Standard 2D page frame: background, navbar, main content and footer. */
export function SiteChrome({ children, home = false }: { children: React.ReactNode; home?: boolean }) {
  return (
    // overflow-x: clip here (not on <body>, where it propagates to the viewport and is ignored by mobile
    // browsers when sizing the layout viewport) keeps slide-in animations from widening the page on phones.
    <div className="site-2d relative overflow-x-clip" data-home={home ? '' : undefined}>
      <Starfield />
      <Navbar home={home} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer home={home} />
    </div>
  )
}
