# Kitforge — site

Landing + SEO content site for **Kitforge: Figma Design System Generator**
(static Next.js, static export). Genuinely-useful guides on building accessible
design systems in Figma that rank in search and funnel to the Gumroad product.

## Deploy (one-time)
1. Import this repo in Vercel (Framework preset: Next.js — defaults work).
2. After the first deploy, set `site.url` in `lib/site.ts` to the real domain,
   and add a Google Search Console verification token to `app/layout.tsx`.

## Local
`npm install && npm run build` → static output in `out/`.
