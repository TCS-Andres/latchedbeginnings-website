# Latched Beginnings

Marketing website for **Latched Beginnings**, the Austin, TX dental + lactation
practice of Dr. Kacie Culotta, DDS. Rebuilt as a fast, secure, statically
rendered site (Next.js 16 + Tailwind v4 + TypeScript), deployable to Vercel.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also type-checks)
npm run start    # serve the production build
```

## Project map

```
src/
  app/                     routes (Server Components, static)
    page.tsx               homepage
    services/[slug]/       data-driven service pages
    blog/[slug]/           35 migrated articles
    about, contact, resources, providers, ... interior pages
    sitemap.ts, robots.ts, not-found.tsx
  components/              ui/ layout/ home/ blog/ brand/ seo/
  lib/site.ts              site-wide data (nav, contact, CTAs)  <-- edit me
  lib/content/             services + testimonials data
  content/blog.json        migrated blog content
scripts/migrate-blog.mjs   regenerate blog.json from the WP export
```

See `CLAUDE.md` for the design system, component kit, and writing rules.
See `IMAGE-MANIFEST.md` for every photo slot and where real images go.

## Before launch (client to confirm / provide)

Tracked in code as `TODO`. Most live in `src/lib/site.ts`.

1. **Booking URL** (`site.bookingUrl`): real ClientSecure scheduling link. Currently points to `/contact`.
2. **Contact email**, **office hours**, **ZIP / map coordinates** (`site.*`).
3. **Real testimonials**: replace placeholders in `src/lib/content/testimonials.ts` with genuine Google reviews (the old site only had demo content).
4. **Photography**: drop files per `IMAGE-MANIFEST.md` (logo + Dr. Kacie's photo already in place).
5. **Lead magnets**: add `oral-tie-symptoms-checklist.pdf` and `patient-referral-form.pdf` to `public/downloads/`; embed the real pacifier webinar video.
6. **Legal pages** (privacy, terms, HIPAA): generated from standard templates and must be reviewed by an attorney / compliance professional.
7. **Facebook URL** and confirm the Instagram handle.

## Deploy (Vercel)

Static output, zero server config. Connect the repo to Vercel (framework
auto-detected as Next.js) or run `vercel`. Point the `latchedbeginnings.com`
domain at the deployment and confirm `site.url` matches.
