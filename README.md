# Raynald Gitau — Software Engineering Portfolio

Personal portfolio built with plain HTML5, CSS3, and vanilla JavaScript (zero frameworks or runtime dependencies), styled with a Material 3 Expressive design system.

## Core Architecture
- **Material 3 Expressive Tokens**: Single seed (`#6C3CE9`) tonal palette (`--md-sys-color-*`), shape scale (`--md-sys-shape-corner-*`), and Light/Dark scheme toggle persisted in `localStorage`.
- **Expressive Shape & Motion**: Cookie-masked portrait, organic SVG blobs, wavy dividers, varied-shape M3 chips, press/hover shape morphing, GPU-only scroll parallax, and full `prefers-reduced-motion` support.
- **Typography & Speed**: `Bricolage Grotesque` display + `Plus Jakarta Sans` body + `JetBrains Mono` code via Google Fonts `preconnect` + `display=swap`, inline SVGs (no icon-font CDN), and `48px` minimum touch targets.

## Key Files
- `index.html`: Main portfolio (Hero, Bento Projects, Skills Explorer, Experience/Education, Contact Hub).
- `styles.css`: Complete M3 Expressive token system, Light/Dark schemes, tonal surfaces, and responsive breakpoints.
- `script.js`: Theme toggle, accessible nav drawer, `IntersectionObserver` scroll reveals, decorative parallax, skill switcher, and clipboard copy.
- `project-*.html` & `hire-me.html`: Case study deep-dives and project intake form.
- `assets/`: Profile image (`profilePic.jpeg`), favicons, and resume PDF.

## How to Run
Open `index.html` directly or serve locally:

```bash
python -m http.server 8000
```

Visit `http://localhost:8000`.
