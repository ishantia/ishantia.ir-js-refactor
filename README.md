# Shantia Eslami — Portfolio (`ishantia.ir`)

Personal portfolio of **Shantia Eslami** (Student, Software Developer & AI Intern from Isfahan, Iran).

Built with **React 19**, **TypeScript**, **Vite 6**, **Tailwind CSS v4**, **Framer Motion (`LazyMotion`)**, and **Lucide React**, with build-time **Static Prerendering (SSG)** and **100 / 100 / 100 / 100** Lighthouse scores on both Mobile and Desktop.

## Highlights

- **Zero-Regression SEO & SSG Prerendering**: Full HTML body prerendered at build time (`scripts/prerender.mjs`), verbatim Google Search Console verification, JSON-LD schema, `CNAME`, `robots.txt`, and `sitemap.xml`.
- **100/100 Performance & Accessibility**: Inlined critical CSS, asynchronous Google Fonts, lazy-loaded `domMax` motion features, code-split overlays (`CommandPalette`, `ProjectModal`, `ResumeModal`), and WCAG AA contrast compliance.
- **Bilingual EN / FA (`dir="ltr"` / `dir="rtl"`)**: Seamless English and Persian (`Vazirmatn`) support persisted in `localStorage`.
- **Interactive UX**: Obsidian Dark & Light themes, `⌘K` / `Ctrl+K` Command Palette, Spotlight cards, Magnetic CTAs, 33 real projects with category filters and search, scroll-linked Journey timeline, and printable bilingual CV modal.

## Commands

```bash
npm install
npm run dev      # Local development server
npm run build    # TypeScript check + client/SSR Vite build + SSG prerender
npm run preview  # Preview production dist/
```
