# Raynald Gitau — Software Engineering Portfolio

A high-performance personal portfolio engineered with vanilla HTML5, CSS3, and modern JavaScript (no frameworks or heavy runtime dependencies). Built to WCAG 2.2 AA accessibility standards and optimized for both quick recruiter evaluation (30–60 second skim) and client technical validation.

## Core Features
- **HCI-Grounded Layout**: F/Z visual scanning hierarchy, Fitts's Law-optimized CTAs, and Hick's Law navigation.
- **Accessible Glassmorphism**: Calibrated dark slate surfaces with verified 4.5:1+ text contrast ratios and WCAG AA compliance.
- **Proof of Engineering**: Project case studies detailing real-world problems, architecture roles, tech stacks, and measurable outcomes.
- **Ergonomics & Motion**: Full support for `prefers-reduced-motion` and keyboard focus outlines via `:focus-visible`.

## Key Files
- [`index.html`](index.html): Main portfolio page containing semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- [`styles.css`](styles.css): CSS variables design tokens (8pt spacing, fluid typography scale, accessible color contrast, glassmorphism).
- [`script.js`](script.js): Accessible mobile navigation with ARIA sync, scroll observers, and interactive widgets.
- `project-*.html`: In-depth engineering case studies.
- `assets/`: Optimized profile photography and downloadable PDF resume.

## How to Run
No build steps or package managers required. Open `index.html` directly in any modern browser, or serve locally with any static HTTP server:

```bash
# Python 3
python -m http.server 8000

# or Node.js npx
npx serve .
```
Navigate to `http://localhost:8000`.
