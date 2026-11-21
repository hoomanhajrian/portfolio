# Hooman Hajarian — Portfolio

Personal portfolio at **[hoomanhajarian.com](https://hoomanhajarian.com)**.

- **Desktop & tablet:** a walkable 3D hallway (React Three Fiber) where each project hangs on the wall as an interactive frame, plus a toggle to a classic 2D site.
- **Phones:** 2D only, with scroll-driven animations. Phones never download three.js.
- **Contact form:** a Next.js Server Action sends email through [Resend](https://resend.com) with a React Email template.
- **Resume:** `public/resume.pdf` is generated from the same data as the site.

## Stack

Next.js 16 (App Router, TypeScript) · React 19 · Tailwind CSS 4 · Motion · three.js / @react-three/fiber / drei / postprocessing · Resend + React Email · Zod · @react-pdf/renderer

## Getting started

```bash
yarn install
cp .env.example .env.local   # fill in the Resend values (see below)
yarn dev                      # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `yarn dev` / `yarn build` / `yarn start` | Develop, build and serve the site |
| `yarn lint` / `yarn typecheck` | ESLint and TypeScript checks |
| `yarn images` | Re-encodes `assets/images/*` into `public/img/projects/*.webp` (+ 1024px 3D textures) and updates `src/data/images.generated.json` |
| `yarn resume` | Regenerates `public/resume.pdf` from `src/data/profile.ts` and `src/data/projects.ts` |
| `yarn check-links` | Checks every project's live/source link |
| `yarn email:dev` | Previews the contact email template at http://localhost:3001 |

## Editing content

All content lives in `src/data/`:

- `profile.ts`: name, headline, summary, skills, experience, education and certifications. The site, JSON-LD metadata and resume all read from it. **Never add a phone number or location here.**
- `projects.ts`: project data used by the 2D grid, the 3D hallway frames and `/projects/[slug]`.
- `analytics.ts`: the Data & Analytics section.

To add a project screenshot:

1. Put the image in `assets/images/<slug>.(jpg|png)`.
2. Run `yarn images`.
3. Add the entry to `projects.ts`.
4. Run `yarn resume` if the resume should change.

## Environment variables

| Name | Example | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | `re_…` | Create at resend.com → API Keys |
| `CONTACT_TO_EMAIL` | `you@example.com` | Inbox that receives contact-form messages |
| `CONTACT_FROM_EMAIL` | `Portfolio <contact@hoomanhajarian.com>` | Domain must be verified in Resend |
| `NEXT_PUBLIC_SITE_URL` | `https://www.hoomanhajarian.com` | Canonical URLs, sitemap and Open Graph (this is the default; it must match the primary domain in Vercel) |

| `CONTACT_FORM_SECRET` | any long random string | Optional. Signs contact-form tokens (derived from `RESEND_API_KEY` if unset) |
| `KV_REST_API_URL` / `KV_REST_API_TOKEN` | set by the Upstash integration | Optional, recommended. Shared rate limits across all server instances (`UPSTASH_REDIS_REST_URL` / `_TOKEN` also work) |

Without the Resend variables the form still validates input, but shows a friendly "temporarily unavailable" message instead of sending.

### Contact form protection

- **Same-origin only:** Next.js rejects cross-origin Server Action calls; requests without an `Origin` header are rejected too. The request body is capped at 64 KB.
- **Bot traps:** a hidden honeypot field, plus a signed form token. The token is issued on first interaction, accepted only 2.5 s to 2 h after issue, and sends one email at most. Bots get a fake "sent" response so they don't adapt.
- **Input rules** (`src/lib/contact-schema.ts`):
  - name 2–80 letters, email ≤ 254, company ≤ 100, message 20–3,000 characters;
  - Unicode normalized; control and invisible characters removed;
  - no line breaks in single-line fields, at most 3 links, no HTML.
- **Rate limits** (`src/lib/contact/rate-limit.ts`):
  - 15 attempts per 10 minutes per IP;
  - 3 emails per 10 minutes and 10 per day per IP;
  - 3 per day per sender address;
  - 40 per day for the whole site.

  IPs and addresses are hashed before they are used as keys.

## Deploying (Vercel)

1. `vercel.json` pins the framework (Next.js), install and build commands and the output directory (`.next`), so it overrides any old Create React App settings left in **Project → Settings → Build & Deployment**.
2. **Project → Settings → Environment Variables:** add the variables above for Production and Preview.
3. **Resend → Domains:** add `hoomanhajarian.com` and create the DNS records it lists (in Vercel DNS or at your registrar). Wait until the domain shows as verified.
4. Push the branch to get a Preview deployment, test the contact form there, then merge to `master`.

## Project structure

```
src/
  app/          routes, metadata (sitemap, robots, manifest, OG image), Server Action for contact
  components/
    sections/   2D page sections (Hero, About, Skills, Experience, Projects, Data, Contact)
    hallway/    3D hallway: scene, camera rig, controls, HUD and side panels
    motion/     scroll/reveal animation helpers
    project/    project details + dialog shared by 2D and 3D
    contact/    contact form
  data/         content (profile, projects, analytics)
  emails/       React Email templates
  lib/          site config, JSON-LD, view-mode/theme preferences, contact schema
scripts/        image optimizer, resume generator, link checker
assets/         source images (not served directly)
```

### How the 2D/3D switch works

An inline script in `<head>` runs before first paint and sets `data-view` and `data-theme` on `<html>`:

- 3D is allowed only when the screen's short side is at least 600 px and WebGL2 is available.
- A saved choice wins. Without one, 3D is the default unless the visitor prefers reduced motion.

The 2D page is always server-rendered, so search engines get the full content. CSS hides it while the 3D view is active. The hallway bundle is loaded with `next/dynamic` only when 3D mode is on.
