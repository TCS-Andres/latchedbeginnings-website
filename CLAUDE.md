@AGENTS.md

# Latched Beginnings: Project Config

Single source of truth for building in this repo. Keep every page and component consistent with what follows.

## What this is

The marketing website for **Latched Beginnings**, the Austin, TX dental + lactation practice of **Dr. Kacie Culotta, DMD** (infant tongue-tie / lip-tie / buccal-tie releases with the LightScalpel CO2 laser, plus lactation counseling and provider coaching). Rebuilt from a compromised WordPress/Elementor site into a fast, secure, statically rendered Next.js app.

Primary goal: drive **consultation bookings**. Secondary: lead-magnet capture and provider referrals.

## Stack

- Next.js 16 (App Router, Server Components, Turbopack) + React 19
- Tailwind CSS v4 (CSS-first `@theme` in `src/app/globals.css`)
- TypeScript, `@/*` -> `src/*`
- `lucide-react` icons (NO brand icons: use `@/components/brand/SocialIcons`)
- `@tailwindcss/typography` for blog prose
- Deploy: Vercel (static)

## Brand system

- **Fonts:** Gelasio (serif display, all headings) + Montserrat (sans, body/UI). Loaded via `next/font` in `layout.tsx`.
- **Palette (Tailwind tokens):** `coral #e8967a`, `coral-soft #e8918b`, `coral-deep #d2745a` (hover/CTA), `blush #fdf0ec` (page tint), `blush-200`, `blush-300`, `cream #fffaf7`, `charcoal #2d2d2d` (text), `ink #1f1f1f` (headings), `stone #6f6a67` (muted), `gold #c9a86a` (accent).
- **Eyebrow label:** coral italic serif, class `eyebrow`.
- **Shapes:** pill buttons (`rounded-full`), soft cards (`rounded-[1.75rem]`), arch-top images (`shape="arch"` on `Photo`).
- **Motion:** subtle scroll fade-up via `Reveal` (respects reduced-motion).
- Tagline: "Healthy Beginnings That Last a Lifetime". Phone (512) 814-7480.

## Writing rules (hard)

- **ZERO em dashes** anywhere in copy or code comments shown to users. Use commas, periods, colons, or restructure. Avoid en dashes as separators too.
- Voice: warm, nurturing, empathetic, evidence-based but heart-led. Never fear-based, never guarantees outcomes, never high-pressure, never negative about other providers.
- In JSX text, escape apostrophes as `&apos;` and ampersands as `&amp;`.

## Component kit (compose from these; do not reinvent)

- Layout: `Section` (tone/spacing), `Container` (size), `PageHero` (interior hero + breadcrumb + cta), `Header`, `Footer`, `CtaBanner` (global, in layout).
- UI: `Button`, `Reveal`, `SectionHeading`, `Photo`, `Faq`.
- Brand: `Logo`, `HeartMark`, `SocialIcons` (`InstagramIcon`, `FacebookIcon`).
- SEO: `JsonLd` exports `LocalBusinessJsonLd`, `BreadcrumbJsonLd`, `ArticleJsonLd`, `FaqJsonLd`.

## Content & data

- Site-wide data (nav, contact, CTAs, socials, credentials): `src/lib/site.ts`. **Items marked TODO need client confirmation before launch** (email, ZIP, geo, hours, booking URL, Facebook).
- Services: `src/lib/content/services.ts` (drives `/services` + `/services/[slug]`).
- Testimonials: `src/lib/content/testimonials.ts` (**PLACEHOLDER, replace with real Google reviews**).
- Blog: `src/content/blog.json` (35 posts migrated from WordPress). Regenerate with `node scripts/migrate-blog.mjs`. Loader: `src/lib/blog.ts`.

## Images

`Photo` shows a branded placeholder until a real file exists at its `src` path, then uses it automatically. Real photography goes under `public/images/photos/`, blog covers under `public/images/blog/<slug>.jpg`, team under `public/images/team/`. See `IMAGE-MANIFEST.md` for the full slot list. Real assets present: logo set (`public/images/brand/`), Dr. Kacie's photo (`public/images/dr-kacie-culotta.png`). **Do not AI-generate Dr. Kacie's likeness; use her real photo.**

## Conventions

- Pages are static Server Components. Add `'use client'` only for interactivity (already done in `Header`, `Reveal`, `Faq`).
- Dynamic route params are async: `const { slug } = await props.params`.
- Every page: export `metadata` with `title` (the " | Latched Beginnings" suffix is appended automatically), `description`, `alternates.canonical`. Add `BreadcrumbJsonLd`; add `FaqJsonLd` where there is an FAQ.
- Run `npm run build` to verify before shipping.

## AI chat agent (Mabel)

A floating, bilingual (EN/ES) support widget mounted globally in `layout.tsx`. HIPAA-aware by design: it never collects or repeats health info, gives no medical advice, redirects emergencies to 911, and hands off collecting only name, phone, and best time.

- **Config & copy:** `src/lib/agent/config.ts` (persona, model, knobs, all UI strings). **Knowledge base:** `src/lib/agent/masterBrain.ts` (customer-safe only, internal strategy scrubbed). **System prompt:** `src/lib/agent/systemPrompt.ts`. **Render helpers:** `src/lib/agent/format.ts` (`[NEXT]` split, `[ESCALATE]` parse, dash scrub).
- **Routes:** `src/app/api/chat/route.ts` (streaming, Vercel AI SDK v6 + direct `@ai-sdk/anthropic`, model `claude-sonnet-4-6`, prompt-cached system message). `src/app/api/escalate/route.ts` (handoff; emails via Resend if configured, else logs).
- **Widget:** `src/components/global/ChatAgent.tsx` (`useChat`, ~2.6s typing delay, typing dots, bubble animations, callback form).
- **Env:** set `ANTHROPIC_API_KEY` in `.env.local`. Optional `RESEND_API_KEY` + `ESCALATION_FROM` + `ESCALATION_EMAIL` for email handoff. See `.env.example`.
- **Pre-launch TODO:** sign Anthropic BAA; wire the escalation email transport; confirm the `info@` destination; run the injection/sensitive-info/emergency test probes.
