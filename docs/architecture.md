# Architecture

## Overview

This is a pure HTML / CSS / JavaScript prototype. No build step, no framework — files are served as-is from the project root.

## Directory structure

```
tolochkaa/
├── index.html              # Entry point — full single-page layout
├── CLAUDE.md               # AI assistant instructions
│
├── css/
│   ├── tokens.css          # All design tokens (colors, spacing, type, radii, etc.)
│   └── style.css           # Global reset + base styles; references tokens.css
│
├── js/
│   ├── main.js             # JS entry point; HiDPI canvas helpers
│   ├── includes.js         # Fetch-based HTML fragment loader; dispatches toloka:ready
│   └── transition.js       # Screen transitions; listens for toloka:ready (not DOMContentLoaded)
│
├── components/             # HTML fragments + CSS files per UI component
│   ├── header.html         # Shared site-header fragment (loaded by includes.js)
│   ├── footer.html         # Shared site-footer fragment (loaded by includes.js)
│   ├── header.css          # Sticky site header + nav button
│   ├── hero.css            # 2×2 mosaic hero, headline, primary CTA
│   ├── about.css           # About section: text + 4-item stats grid
│   ├── partners.css        # Partners strip (green bg, logo row)
│   ├── events.css          # Upcoming events: toolbar, card, pagination
│   ├── reviews.css         # Reviews: card, avatar, rating, gallery, pagination
│   ├── advantages.css      # Infinite marquee rows (6 tracks, alternating direction)
│   ├── cta.css             # CTA banner: green bg, hobby tags, promo image cluster
│   ├── faq.css             # FAQ accordion: native <details>/<summary>, no JS
│   ├── footer.css          # Site footer: purple bg, nav links, social icons, legal
│   ├── map-screen.css      # Map screen overlay: slide transition + event detail layout
│   ├── tag-popup.css       # Tag tooltip popup: member hashtag chips on hover/focus (Figma 1471:13840)
│   ├── about-screen.css    # About screen overlay: Про нас content
│   ├── toloka-screen.css   # Toloka screen overlay: calendar + events + map section + footer (Figma 1256:15801)
│   └── map-full-screen.css # Map full screen overlay: full map + filter toolbar + event card (Figma 1256:15438)
│
├── assets/
│   ├── images/
│   │   ├── hero/           # hero-bg.png, hero-main.png, hero-secondary.png, hero-screenshot.png
│   │   ├── partners/       # logo-ecowave.svg, logo-zelenyi.svg, logo-domivka.svg, logo-dobrobud.svg
│   │   ├── events/         # event-card.png
│   │   ├── map/            # map-content-5ef8bd.png, event-photo-b6a466.png, avatars
│   │   ├── map-full/       # map-full-bg-350d31.png, map-card-container.png
│   │   ├── reviews/        # bg-reviews.png, avatar.png, review-photo.png
│   │   ├── advantages/     # adv-319.png, adv-84.png, adv-95.png
│   │   ├── cta/            # cta-mockup.png, cta-doodle-1.png, cta-doodle-2.png, cta-doodle-3.png
│   │   ├── faq/            # faq-image.png
│   │   └── icons/          # icon-*.svg (calendar, person, star, map-pin, caret-down,
│   │                       #            filter, map, rating, arrow,
│   │                       #            telegram, instagram, whatsapp)
│   └── fonts/              # Local web fonts (unused — served via Google Fonts CDN)
│
└── docs/
    ├── architecture.md     # This file — project structure and decisions
    └── changelog.md        # All changes, newest first
```

## Design system

All visual values (colors, spacing, radii, shadows, z-index, transitions, etc.) are defined as CSS custom properties in `css/tokens.css`. **Never write a raw hex color, pixel value, or magic number outside `tokens.css` — always reference a token via `var(--...)`.**

Font families (Unbounded + Manrope) are loaded from Google Fonts via `<link>` in `index.html` with `preconnect` hints for performance.

## Component conventions

- Each component lives in its own file under `components/` (one component = one `.css` or `.html` file).
- CSS components are linked explicitly from `index.html` `<head>` in section order.
- HTML fragments (`header.html`, `footer.html`) are injected by `js/includes.js` via `fetch()` into `[data-include]` placeholders; requires an HTTP server (not `file://`).
- `js/includes.js` dispatches the custom event `toloka:ready` once all fragment fetches settle; `transition.js` listens for this event instead of `DOMContentLoaded`.
- No JavaScript is required for any visual component — the FAQ accordion uses native `<details>`/`<summary>`.

## Features

| Feature | Status | File(s) |
|---------|--------|---------|
| Design tokens | ✅ Done | `css/tokens.css` |
| Global reset & base | ✅ Done | `css/style.css` |
| Site header / nav | ✅ Done | `components/header.css` |
| Hero section | ✅ Done | `components/hero.css` |
| About section | ✅ Done | `components/about.css` |
| Partners section | ✅ Done | `components/partners.css` |
| Upcoming events | ✅ Done | `components/events.css` |
| Reviews section | ✅ Done | `components/reviews.css` |
| Advantages marquee | ✅ Done | `components/advantages.css` |
| CTA banner | ✅ Done | `components/cta.css` |
| FAQ accordion | ✅ Done | `components/faq.css` |
| Site footer | ✅ Done | `components/footer.css` |
| Map screen overlay + slide transition | ✅ Done | `components/map-screen.css`, `js/transition.js` |
| About screen overlay (Про нас) | ✅ Done | `components/about-screen.css`, `js/transition.js` |
| Toloka screen overlay (Толоки 375) | ✅ Done | `components/toloka-screen.css`, `js/transition.js` |
| Map full screen overlay (Мапа толок 375) — opened from toloka map btn | ✅ Done | `components/map-full-screen.css`, `js/transition.js` |
| Maps screen overlay (Мапа толок 375) — opened from nav dropdown        | ✅ Done | `components/maps-screen.css`, `js/transition.js` |
| Profile screen overlay (Кабінет) — opened from nav dropdown "Профіль" | ✅ Done | `components/profile-screen.css`, `js/transition.js` |
| Toloka Week screen overlay (Толоки 375 Тиждень) — opened from hero "Толочити" button | ✅ Done | `components/toloka-week-screen.css`, `js/transition.js` |
| Shared header/footer HTML fragments | ✅ Done | `components/header.html`, `components/footer.html`, `js/includes.js` |

## Decisions log

| Date | Decision | Reason |
|------|----------|--------|
| 2026-05-24 | Pure HTML/CSS/JS, no framework | Minimal setup, maximum portability for a prototype |
| 2026-05-24 | 4-point spacing scale via CSS tokens | Consistency without a CSS framework |
| 2026-05-24 | Mobile-first, 375px viewport | Figma design is mobile-only; `--viewport-mobile: 375px` constrains all sections |
| 2026-05-24 | Google Fonts CDN (Unbounded + Manrope) | Avoid hosting font files; preconnect hints minimise latency |
| 2026-05-24 | CSS marquee via duplicated content + translateX(-50%) | Pure-CSS infinite scroll; no JS, no library |
| 2026-05-24 | Native `<details>`/`<summary>` for FAQ | Zero JS, accessible by default, supports keyboard & screen readers |
| 2026-05-24 | Instance node IDs for Figma SVG downloads | Component definition node IDs return 0 images; instance IDs (format `I{frame}:{comp};{node}:{id}`) work correctly |
| 2026-05-28 | `transform` on overlay creates new containing block | Both `#screen-map` and `#screen-about` use `transform: translateX()` which makes them the containing block for any `position: fixed` children — use `position: absolute` for inset overlays inside these screens |
| 2026-05-28 | Toloka screen slide-in via `@keyframes` on `--open` class | Using `@keyframes toloka-slide-in` (translateX 100%→0) on `.toloka-screen--open` avoids display:none/block timing conflicts; closing is instant (class removed). `hideContainerIfEmpty` updated to check all 3 screens. |
| 2026-05-30 | Map full screen opened from toloka map button | Same screen-to-screen pattern as about→toloka: close source screen, open target screen, container stays active throughout; no flicker. `hideContainerIfEmpty` extended to check all 4 screens. |
| 2026-05-30 | `fetch()`-based HTML includes for header/footer | Header and footer are shared across all screens; injecting them via `includes.js` avoids duplicated markup and guarantees a single source of truth. Requires HTTP server; `toloka:ready` event replaces `DOMContentLoaded` in `transition.js`. |
| 2026-05-30 | `[data-close-screen]` attribute replaces per-screen IDs on close buttons | Headers are now a shared fragment so unique IDs (`btn-map-full-close`, `btn-about-close`, etc.) cannot exist inside the fragment. Each screen's JS now uses `screen.querySelector('[data-close-screen]')` to find its own close button. |
