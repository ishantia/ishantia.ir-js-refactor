# Shantia Eslami - Portfolio (`ishantia.ir`)

Modern, ultra-performant personal portfolio for **Shantia Eslami** (Student, Software Developer & AI Intern from Iran).

Built from the ground up with **React 18**, **Vite**, and custom modern CSS, optimized for a **sub-millisecond feel** and **99–100 PageSpeed Insights score** on both mobile and desktop.

---

## ✨ Features

- **⚡ Blazing Performance (99-100 PageSpeed Score)**
  - Zero external render-blocking stylesheets or font downloads.
  - Native inline SVG icon architecture (`<Icon />`) completely eliminating heavy third-party FontAwesome stylesheets and webfont files.
  - Asynchronous, non-blocking Google Fonts loading with system font fallbacks for instant 0ms first contentful paint.
  - Responsive WebP images (`160px`, `320px`, `480px`) with `fetchpriority="high"` and high-priority preloads.
  - Code-split architecture with `React.lazy` and `Suspense` for the Resume page.
  - Zero Layout Shift (`CLS = 0.000`) and optimized background particles using `requestIdleCallback`.

- **🎨 2026 Developer Aesthetic**
  - Ultra-deep dark mode with neon accents (electric cyan, blue, violet) and high-contrast light mode.
  - Interactive 3D avatar visual with dual orbiting particle rings and floating tech badges (Python, Java, Android, APIs).
  - macOS-style interactive terminal emulator (`ishantia@dev:~`).
  - Modern Bento Grid layout in the About section highlighting AI voice pipelines (SnowaTech), Android kernel work, and hardware experiments.

- **🔍 Interactive Project Showcase (33 Projects)**
  - Real-time instant search by title, description, or tags.
  - Instant category filtering: **All**, **Python & Bots**, **Android & Hardware**, and **Web & Tools**.
  - Distinct badges for live websites vs. open-source GitHub repositories.

- **📄 Bilingual CV / Resume Page (`/resume`)**
  - Instant toggle between **English (LTR)** and **Persian (RTL)**.
  - Dedicated print stylesheet (`@media print`) for clean, single-page PDF generation without navigation or background distractions.

---

## 🛠 Tech Stack

- **Framework**: React 18, React Router v7
- **Bundler & Tooling**: Vite 5
- **Icons**: Custom zero-dependency inline SVG system
- **Styling**: Pure CSS with CSS Variables, Bento Grid, and Glassmorphism

---

## 🚀 Getting Started

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 👤 Author

**Shantia Eslami**
- Website: [ishantia.ir](https://ishantia.ir)
- GitHub: [@ishantia](https://github.com/ishantia)
- Telegram: [@ishantia](https://t.me/ishantia)
