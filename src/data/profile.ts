/**
 * Single source of truth for personal/career content.
 * Used by the 2D site, the 3D hallway overlays, metadata/JSON-LD and scripts/generate-resume.tsx.
 *
 * Privacy rule: no phone number and no location (city/province/country) anywhere in this file.
 */

export type Experience = {
  company: string
  role: string
  start: string // "Oct 2025"
  end: string // "Present" | "Oct 2019"
  summary?: string
  bullets: string[]
  stack?: string[]
}

export type Education = {
  school: string
  credential: string
  start: string
  end: string
}

export type Certification = {
  name: string
  issuer: string
  note?: string
}

export const profile = {
  name: 'Hooman Hajarian',
  firstName: 'Hooman',
  headline: 'Full Stack Developer',
  tagline: 'React · Next.js · TypeScript · Node.js',
  valueProp:
    'I design, build and ship production web and mobile products end to end, from typed APIs and payments to fast, search-friendly front ends.',
  summary:
    'Full Stack Developer who builds and ships production web and mobile products with Next.js, React, TypeScript and Node.js. I am the founder and sole developer of Threeprinted, a bilingual 3D-printing marketplace with Stripe payouts, tax and shipping integrations, CI/CD and end-to-end tests. Since 2022 I have delivered client websites and apps as a freelancer: gathering requirements, integrating third-party APIs, and tuning performance and SEO. I bring a background in C# and SQL enterprise development and a Google Data Analytics certificate.',
  about: [
    'I like owning a product from the first conversation to the production deploy. At Threeprinted I turned an idea into a roadmap, designed the buyer, seller and admin experiences, and built the whole platform in TypeScript and Next.js on Node services.',
    'As a freelancer I work directly with clients: I clarify what they need, build server-rendered Next.js sites and React apps, wire in third-party services, and keep things fast and easy to find in search.',
    'Before moving into modern web stacks I built enterprise applications in C# and SQL, which is where I picked up habits I still rely on: careful data modelling, code review, and validation before anything ships.',
  ],
  openToWork: true,
  availability: 'Open to full-time Full Stack, Front End and React/Next.js roles',
  email: 'hajarianhooman@gmail.com',
  links: {
    site: 'https://hoomanhajarian.com',
    linkedin: 'https://www.linkedin.com/in/hooman-hajarian',
    github: 'https://github.com/hoomanhajrian',
    resume: '/resume.pdf',
  },
  photo: { src: '/img/me.webp', width: 420, height: 540, alt: 'Portrait of Hooman Hajarian' },
  stats: [
    { value: '4+', label: 'years shipping React & Node.js' },
    { value: '17', label: 'projects built' },
    { value: '2', label: 'products I built and run' },
  ],
  languages: ['English', 'Persian'],
} as const

export const skillGroups: { title: string; skills: string[] }[] = [
  {
    title: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'SQL', 'Java', 'C#', 'Python', 'HTML', 'CSS / SASS'],
  },
  {
    title: 'Front end',
    skills: ['React', 'Next.js', 'React Native', 'Redux', 'Tailwind CSS', 'SASS', 'Responsive design', 'Figma'],
  },
  {
    title: 'Back end',
    skills: ['Node.js', 'Express', 'REST APIs', 'Spring Boot', 'Stripe', 'Server-side rendering', 'LLM / AI agent features'],
  },
  {
    title: 'Data',
    skills: ['PostgreSQL', 'SQL Server', 'Firebase', 'Data modelling', 'Data validation', 'Data analysis'],
  },
  {
    title: 'Cloud & DevOps',
    skills: ['AWS (EC2, S3, Lambda, RDS)', 'Google Cloud', 'Vercel', 'Docker', 'Kubernetes', 'CI/CD', 'Git & GitHub'],
  },
  {
    title: 'Practices',
    skills: ['Agile / Scrum', 'Kanban', 'Automated & end-to-end testing', 'Code review', 'Technical SEO', 'Requirements gathering'],
  },
]

/** Keyword list used for metadata and JSON-LD `knowsAbout`. */
export const keywords = [
  'Full Stack Developer',
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Express',
  'REST APIs',
  'PostgreSQL',
  'SQL',
  'AWS',
  'Docker',
  'Kubernetes',
  'React Native',
  'Stripe',
  'Tailwind CSS',
  'CI/CD',
]

export const experience: Experience[] = [
  {
    company: 'Threeprinted',
    role: 'Founder & Full Stack Developer',
    start: 'Oct 2025',
    end: 'Present',
    summary:
      'Founder and sole developer of threeprinted.com, a bilingual (English/French) marketplace where people with 3D printers open their own store and sell printed products to buyers across the US and Canada.',
    bullets: [
      'Turned the business idea into a product plan, roadmap and priorities, and run the platform end to end.',
      'Built the full platform in TypeScript and Next.js on Node services, with a React front end and REST APIs.',
      'Integrated Stripe checkout with itemized fees and seller payouts, tax based on the delivery address, and carrier shipping quotes locked to each order.',
      'Enforced one typed contract from schema through API handlers to components, so breaking changes fail the build instead of reaching customers.',
      'Set up CI/CD, automated tests and end-to-end checks across buyer, seller and admin flows before every deploy.',
      'Designed the seller, buyer and admin experiences and a catalog of 23 categories plus materials tagged with attributes (food-contact, UV/outdoor, heat, flexible), all available in English and French.',
      'Added LLM and agent features to the platform.',
    ],
    stack: ['TypeScript', 'Next.js', 'React', 'Node.js', 'REST APIs', 'Stripe', 'CI/CD'],
  },
  {
    company: 'Freelance',
    role: 'Full Stack Developer',
    start: 'Apr 2022',
    end: 'Present',
    bullets: [
      'Build and maintain client websites and web apps with Next.js, TypeScript/React and SASS, mostly server-rendered for speed and search visibility.',
      'Gather and refine requirements directly with clients and deliver on agreed deadlines using Agile practices (sprint planning, stand-ups, retrospectives).',
      'Integrate third-party APIs and services, resolve complex technical issues, find bottlenecks and optimize code for performance.',
      'Built cloud-native applications with Docker and Kubernetes on AWS, and administered PostgreSQL databases for query performance, security and data integrity.',
      'Implemented automated tests and data-validation checks that let releases ship reliably.',
      'Built and run speedo360.com, a React Native app for Android and iOS (currently in beta).',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'SASS', 'AWS', 'Docker', 'PostgreSQL'],
  },
  {
    company: 'TELUS',
    role: 'Product Care Specialist',
    start: 'Feb 2022',
    end: 'Present',
    bullets: [
      'Diagnose and repair smartphones using dedicated diagnostic software; Wise-certified technician performing Apple and Samsung authorized repairs.',
      'Troubleshoot complex hardware and software issues while keeping customers informed, with customer satisfaction as the priority.',
      'Keep accurate repair documentation in line with compliance requirements.',
    ],
  },
  {
    company: 'Gohar Shafa',
    role: 'Software Engineer',
    start: '2017',
    end: '2019',
    bullets: [
      'Built enterprise applications full stack in C# and SQL, including the data-mapping logic behind large-scale record systems.',
      'Translated business requirements into technical specifications and delivered front-end interfaces integrated with back-end services.',
      'Raised code quality by establishing code review and data-validation practices that the team adopted as its standard.',
    ],
    stack: ['C#', 'SQL', 'Visual Studio'],
  },
]

export const earlierExperience = [
  { company: 'Gohar Shafa Co.', role: 'Developer & Marketer', start: 'Mar 2019', end: 'Oct 2021', note: 'Product marketing, competitive and pricing analysis for medical devices.' },
  { company: 'Cell Clinic Ltd.', role: 'Cellphone Technician', start: 'Sep 2021', end: 'Jan 2022', note: 'Diagnosed and repaired phones; quoted repairs directly to customers.' },
]

export const education: Education[] = [
  {
    school: 'Langara College',
    credential: 'Post-Degree Diploma, Web & Mobile Development and Design',
    start: 'Jan 2020',
    end: 'Jan 2022',
  },
  {
    school: 'Islamic Azad University',
    credential: "Bachelor's degree, Computer Software Engineering",
    start: '2017',
    end: '2019',
  },
  {
    school: 'Islamic Azad University',
    credential: "Associate's degree, Computer Hardware Engineering",
    start: '2012',
    end: '2015',
  },
]

export const certifications: Certification[] = [
  { name: 'Google Data Analytics Professional Certificate', issuer: 'Google / Coursera', note: 'Data cleaning, SQL, visualization and analysis.' },
  { name: 'React.js', issuer: 'Udemy', note: 'Component-driven web development.' },
  {
    name: 'Leadership & management courses',
    issuer: 'LinkedIn Learning',
    note: 'Motivating teams, accountability, leading different personalities, managing organizational change.',
  },
]
