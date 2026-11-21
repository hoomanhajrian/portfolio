import images from './images.generated.json'

export type ProjectCategory = 'web' | 'mobile' | 'frontend'

export type Project = {
  slug: string
  name: string
  period: { start: string; end: string | 'Present' }
  role: string
  category: ProjectCategory
  /** One line, used on cards, frames and meta descriptions. */
  summary: string
  /** Two or three sentences for the detail view. */
  description: string
  highlights: string[]
  stack: string[]
  links: { live?: string; code?: string }
  image: { src: string; texture: string; width: number; height: number; alt: string; fit: 'cover' | 'contain' }
  featured?: boolean
  team?: boolean
  status?: 'Live' | 'Beta' | 'Archived'
  /** Neon colour used for the 3D frame glow and 2D accents. */
  accent: string
}

type ImageKey = keyof typeof images

function img(slug: ImageKey, alt: string, fit: 'cover' | 'contain' = 'cover') {
  const meta = images[slug] as { src: string; texture?: string; width: number; height: number }
  return { src: meta.src, texture: meta.texture ?? meta.src, width: meta.width, height: meta.height, alt, fit }
}

/** Newest first. */
export const projects: Project[] = [
  {
    slug: 'threeprinted',
    name: 'Threeprinted',
    period: { start: '2025', end: 'Present' },
    role: 'Founder & sole developer',
    category: 'web',
    summary: 'Bilingual marketplace where 3D-printer owners open their own store and sell printed products across the US and Canada.',
    description:
      'I turned the idea into a product plan and built the whole platform myself: seller storefronts and onboarding, buyer search, checkout and orders, and an admin area to run the marketplace. Every screen and catalog entry is available in English and French.',
    highlights: [
      'Stripe checkout with itemized fees and seller payouts, tax calculated from the delivery address, and carrier shipping quotes locked to each order.',
      'One typed contract from database schema through REST handlers to React components, so breaking changes fail the build instead of reaching customers.',
      'CI/CD with automated tests and end-to-end checks across buyer, seller and admin flows before every deploy.',
      'Catalog of 23 categories and a materials list with attribute flags (food-contact, UV/outdoor, heat, flexible) so buyers find the right material; LLM and agent features built in.',
    ],
    stack: ['TypeScript', 'Next.js', 'React', 'Node.js', 'REST APIs', 'Stripe', 'CI/CD', 'E2E testing', 'i18n'],
    links: { live: 'https://www.threeprinted.com/' },
    image: img('threeprinted', 'Threeprinted marketplace home page: “Custom 3D prints, made near you.”'),
    featured: true,
    status: 'Live',
    accent: '#f97316',
  },
  {
    slug: 'sun-tag-and-title',
    name: 'Sun Tag & Title',
    period: { start: '2026', end: 'Present' },
    role: 'Full Stack Developer',
    category: 'web',
    summary: 'SEO-optimized website for an authorized vehicle tag-and-title business in Maryland, USA.',
    description:
      'The official website for an authorized tag-and-title business offering registration renewals, title transfers, new tags and notary services. Built with Next.js, TypeScript and Tailwind CSS, rendered on the server so pages load fast and rank well in search.',
    highlights: [
      'Service pages for registration renewals, title transfers, new tags and notary services.',
      'Server-side rendered Next.js pages for fast first loads and crawlable content.',
      'Front end and API routes delivered together in one typed Next.js codebase.',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'SSR', 'SEO'],
    links: { live: 'https://www.suntagandtitle.com/', code: 'https://github.com/hoomanhajrian/suntag-title' },
    image: img('sun-tag-and-title', 'Sun Tag and Title logo', 'contain'),
    featured: true,
    status: 'Live',
    accent: '#facc15',
  },
  {
    slug: 'icbc-practice-test',
    name: 'ICBC Practice Test',
    period: { start: '2026', end: '2026' },
    role: 'Full Stack Developer',
    category: 'web',
    summary: 'Driver knowledge-test practice app with 500+ sample questions, scored results and study materials.',
    description:
      'A Next.js web app that helps drivers prepare for their knowledge test. Users pick a licence class, work through sample questions, get their results and download the official study manuals.',
    highlights: [
      'Practice tests for every licence class (Class 1 to 5) plus the air brake endorsement: 505 questions in total.',
      'Scored results at the end of every practice test.',
      'Study-materials section with the official driver and commercial-vehicle manuals.',
    ],
    stack: ['Next.js', 'React', 'API routes', 'Full stack'],
    links: { live: 'https://www.icbcpracticetest.com/', code: 'https://github.com/hoomanhajrian/ICBC-test' },
    image: img('icbc-practice-test', 'ICBC Practice Test: test selection screen with licence classes and question counts'),
    featured: true,
    status: 'Live',
    accent: '#818cf8',
  },
  {
    slug: 'speedo360',
    name: 'Speedo360',
    period: { start: '2025', end: 'Present' },
    role: 'Creator & developer',
    category: 'mobile',
    summary: 'Cross-platform mobile app for Android and iOS that tracks your driving speed and location.',
    description:
      'A React Native app I built and run, shipping to both Android and iPhone from one codebase. It tracks driving speed and location in real time and supports sign-in with OAuth. The app is currently in beta.',
    highlights: [
      'One React Native codebase shipping to both Android and iOS.',
      'Real-time speed and location tracking.',
      'OAuth sign-in.',
    ],
    stack: ['React Native', 'Android', 'iOS', 'OAuth'],
    links: { live: 'https://speedo360.com/' },
    image: img('speedo360', 'Speedo360 app icon: a glowing speedometer', 'contain'),
    featured: true,
    status: 'Beta',
    accent: '#22d3ee',
  },
  {
    slug: 'gojunk4moving',
    name: 'Gojunk4moving',
    period: { start: '2024', end: '2025' },
    role: 'Full Stack Developer',
    category: 'web',
    summary: 'Server-rendered website for a junk-removal and moving company, with an email service back end.',
    description:
      'A Next.js website with components rendered mostly on the server for fast loads and good search visibility. A mail service on the back end delivers customer enquiries to the business.',
    highlights: [
      'Mostly server components, keeping client JavaScript small.',
      'Back-end email service for customer enquiries.',
    ],
    stack: ['Next.js', 'React', 'SSR', 'Email service'],
    links: { live: 'https://www.gojunk4moving.ca/' },
    image: img('gojunk4moving', 'Gojunk4moving website home page'),
    featured: true,
    status: 'Live',
    accent: '#4ade80',
  },
  {
    slug: 'tariq-louis',
    name: 'Tariq Louis',
    period: { start: '2024', end: '2025' },
    role: 'Full Stack Developer',
    category: 'web',
    summary: 'Bilingual art website with a separate UI for each language and a server-side mail service.',
    description:
      'A server-rendered Next.js website built in two languages, with a dedicated user interface for each one rather than a simple text swap. A mail service on the back end handles visitor messages.',
    highlights: [
      'Two languages, each with its own UI.',
      'Server-side rendering throughout for speed and SEO.',
      'Back-end mail service for visitor enquiries.',
    ],
    stack: ['Next.js', 'React', 'i18n', 'SSR', 'Email service'],
    links: { code: 'https://github.com/hoomanhajrian/tariq' },
    image: img('tariq-louis', 'Tariq Louis art website home page'),
    status: 'Archived',
    accent: '#e879f9',
  },
  {
    slug: 'pacivil',
    name: 'Pacivil',
    period: { start: '2023', end: '2024' },
    role: 'Full Stack Developer',
    category: 'web',
    summary: 'Server-rendered company website built with Next.js and a simple mail service back end.',
    description:
      'A business website built with Next.js: React on the front end, every page rendered on the server, and a mail service on the back end for enquiries.',
    highlights: ['Fully server-side rendered pages.', 'Back-end mail service for enquiries.'],
    stack: ['Next.js', 'React', 'SSR', 'Email service'],
    links: { live: 'https://pacivil.com' },
    image: img('pacivil', 'Pacivil website home page'),
    featured: true,
    status: 'Live',
    accent: '#38bdf8',
  },
  {
    slug: 'littlesellca',
    name: 'Littlesellca',
    period: { start: '2023', end: 'Present' },
    role: 'Full Stack Developer',
    category: 'web',
    summary: 'Platform that connects web customers to a business’s Amazon Marketplace listings and social media.',
    description:
      'A Next.js platform that brings a seller’s products, Amazon Marketplace presence and social channels together in one place, so web visitors can find and buy from the business.',
    highlights: ['Connects the storefront to Amazon Marketplace listings.', 'Links the business’s social media into one experience.'],
    stack: ['Next.js', 'React', 'APIs', 'E-commerce'],
    links: {},
    image: img('littlesellca', 'Littlesellca platform home page'),
    status: 'Archived',
    accent: '#fb7185',
  },
  {
    slug: 'lapsemoon',
    name: 'LapseMoon',
    period: { start: '2022', end: '2023' },
    role: 'Full Stack Developer',
    category: 'web',
    summary: 'Portfolio and resume website for a photographer, built with Next.js and Node.js.',
    description: 'A personal website for a photographer that introduces their work, shows a portfolio and presents their resume.',
    highlights: ['Next.js front end with a Node.js back end.', 'Portfolio gallery and resume in one site.'],
    stack: ['Next.js', 'Node.js', 'React'],
    links: {},
    image: img('lapsemoon', 'LapseMoon logo: a crescent moon with a camera', 'contain'),
    status: 'Archived',
    accent: '#e2e8f0',
  },
  {
    slug: 'hesab-ketab',
    name: 'Hesab Ketab',
    period: { start: '2022', end: '2023' },
    role: 'Full Stack Developer',
    category: 'web',
    summary: 'Accounting and inventory management web app for small stores.',
    description:
      'A web application that small stores use for their accounting and inventory, built with React and TypeScript on the front end and Node.js on the back end.',
    highlights: ['Accounting and inventory management in one app.', 'Typed React (TypeScript) front end with a Node.js API.'],
    stack: ['React', 'TypeScript', 'Node.js', 'REST APIs'],
    links: {},
    image: img('hesab-ketab', 'Hesab Ketab accounting app interface'),
    status: 'Archived',
    accent: '#2dd4bf',
  },
  {
    slug: 'tajhiz-aras',
    name: 'Tajhiz Aras',
    period: { start: '2022', end: '2023' },
    role: 'Full Stack Developer',
    category: 'web',
    summary: 'Farsi-language online store for industrial kitchen equipment, built in React and Redux.',
    description: 'An e-commerce site for industrial kitchen equipment, written entirely in React with Redux for state management. The site is in Farsi.',
    highlights: ['Product catalog and store built in React.', 'Redux for application state.', 'Right-to-left Farsi interface.'],
    stack: ['React', 'Redux', 'E-commerce', 'RTL'],
    links: {},
    image: img('tajhiz-aras', 'Tajhiz Aras online store home page'),
    status: 'Archived',
    accent: '#f59e0b',
  },
  {
    slug: 'card-creator',
    name: 'Card Creator',
    period: { start: '2022', end: '2023' },
    role: 'Full Stack Developer',
    category: 'web',
    summary: 'Design-your-own business card platform with ordering and optional QR code and NFC features.',
    description: 'Users customize their own business card, add a QR code or NFC chip, and place an order, all in the browser.',
    highlights: ['Interactive card customization.', 'Optional QR code and NFC features.', 'Ordering flow built in.'],
    stack: ['React', 'QR codes', 'NFC', 'Firebase'],
    links: {},
    image: img('card-creator', 'Card Creator business card editor'),
    status: 'Archived',
    accent: '#a78bfa',
  },
  {
    slug: 'wedding-planner',
    name: 'Wedding Planner',
    period: { start: '2022', end: '2023' },
    role: 'Full Stack Developer',
    category: 'web',
    summary: 'Event-planning platform for estimating an event’s total cost and booking a consultation.',
    description:
      'A platform that takes the effort out of planning an event: users estimate the total cost of their wedding or event and book an appointment for a consultation.',
    highlights: ['Event cost estimator.', 'Consultation booking.', 'Authentication with Firebase and state in Redux.'],
    stack: ['React', 'Redux', 'Firebase', 'Auth'],
    links: {},
    image: img('wedding-planner', 'Wedding Planner home page'),
    status: 'Archived',
    accent: '#f472b6',
  },
  {
    slug: 'movie-time',
    name: 'Movie Time',
    period: { start: '2022', end: '2023' },
    role: 'Front End Developer',
    category: 'frontend',
    summary: 'React app for browsing movies from a public movie database API.',
    description: 'A React front end that pulls movie data from a public API so users can browse and look up films. Hosted on Firebase.',
    highlights: ['Third-party movie API integration.', 'Deployed on Firebase Hosting.'],
    stack: ['React', 'REST APIs', 'Firebase'],
    links: { code: 'https://github.com/hoomanhajrian/Moive-app' },
    image: img('movie-time', 'Movie Time app showing a grid of movie posters'),
    status: 'Archived',
    accent: '#ef4444',
  },
  {
    slug: 'patch-app',
    name: 'Patch App',
    period: { start: '2021', end: '2022' },
    role: 'Full Stack Developer (team project)',
    category: 'web',
    summary: 'Learning platform that teaches kids how to treat injuries in an emergency.',
    description: 'An online platform for kids to learn basic first aid for injuries. Built as a team with a React front end and a back end on AWS.',
    highlights: ['React front end.', 'Back end hosted on AWS.', 'Built as a team project.'],
    stack: ['React', 'AWS'],
    links: {},
    image: img('patch-app', 'Patch App first-aid learning platform'),
    team: true,
    status: 'Archived',
    accent: '#34d399',
  },
  {
    slug: 'farmer-fresh',
    name: 'Farmer Fresh',
    period: { start: '2021', end: '2022' },
    role: 'Full Stack Developer',
    category: 'mobile',
    summary: 'Android app where farmers share their products and consumers order for pickup or delivery.',
    description: 'A native Android app written in Java with a Firebase back end. Farmers list what they produce, and consumers place orders for pickup or delivery.',
    highlights: ['Native Android app in Java.', 'Firebase back end.', 'Pickup and delivery ordering.'],
    stack: ['Java', 'Android', 'Firebase'],
    links: { code: 'https://github.com/hoomanhajrian/FarmerFresh_android-app' },
    image: img('farmer-fresh', 'Farmer Fresh app screens'),
    status: 'Archived',
    accent: '#84cc16',
  },
  {
    slug: 'go-hike',
    name: 'Go Hike',
    period: { start: '2020', end: '2021' },
    role: 'Full Stack Developer (team project)',
    category: 'mobile',
    summary: 'Cordova mobile app that finds hiking trails near you and maps the route to them.',
    description:
      'A Cordova-based mobile app that shows hiking trails around the user, the directions to each trail, and the trail route itself on a map. Built as a team project.',
    highlights: ['Location-aware trail discovery.', 'Maps API for directions and trail routes.', 'Cross-platform with Cordova.'],
    stack: ['Cordova', 'JavaScript', 'Maps API'],
    links: {},
    image: img('go-hike', 'Go Hike app map screen'),
    team: true,
    status: 'Archived',
    accent: '#10b981',
  },
]

export const categories: { id: 'all' | ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Full stack / Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'frontend', label: 'Front end' },
]

export const featuredProjects = projects.filter((p) => p.featured)

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

export function formatPeriod(p: Project['period']) {
  return p.start === p.end ? p.start : `${p.start} – ${p.end}`
}
