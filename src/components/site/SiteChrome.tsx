import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { Starfield } from '@/components/motion/Starfield'

/** Standard 2D page frame: background, navbar, main content and footer. */
export function SiteChrome({ children, home = false }: { children: React.ReactNode; home?: boolean }) {
  return (
    <div className="site-2d relative" data-home={home ? '' : undefined}>
      <Starfield />
      <Navbar home={home} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer home={home} />
    </div>
  )
}
