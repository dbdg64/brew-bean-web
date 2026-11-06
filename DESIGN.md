# Brew & Bean - Design Notes

Source of truth for how the site looks and moves. Product/content truth lives in `PRODUCT.md`;
the original brand brief is `info-about-brand.md`. Everything here is read from the actual code.

## Color

| Token | Value | Use |
|---|---|---|
| `--brown` | `#5C3D2E` | Primary, hero background, footer accents, tray total |
| `--cream` | `#FFF8E7` | Page background, text on dark, hero info |
| `--orange` | `#E67E22` | Accent, CTAs, active states, section eyebrows |
| `--dark` | `#2B211A` | Body text, toast/mobile-bar backgrounds |
| `--light-brown` | `#8A6D5C` | Muted text, scrollbars |
| WhatsApp green | `#128C4B` (depth `#0a5b33`) | Order buttons only |
| Steam highlight | `#F5C99B` | Steam/vapour strokes on dark surfaces |

Selection is orange on dark (`::selection`).

## Typography

- Poppins via Google Fonts, fallback `Arial, sans-serif`.
- Body `1rem / 1.65`; hero `h1 3rem / 1.15`; sections centered with a muted subtitle.
- Small caps labels (eyebrow, tray "Your order") use `0.72-0.85rem`, letter-spacing `1px`.

## Layout

- Container ~`1100px` at `90%` width; breakpoints at `900px` (tablet) and `600px` (phone).
- Phone: hero info stacks, menu/contact rows keep 44px tap targets, sticky Call/WhatsApp bar
  sits above the safe-area inset (`viewport-fit=cover` + `env(safe-area-inset-*)`).
- `html, body` use `overflow-x: clip` so nothing scrolls sideways.

## Motion

- One easing for everything: `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`.
- Scroll reveals via IntersectionObserver: fade + `translateY(28px)`, 0.7s.
- Coffee family (same lucide coffee SVG in hero, menu, footer): `iconLevitate 2.8s`,
  steam ticks run `steamBloop` with staggered delays, footer hover uses `iconLevitateHigh`.
- Nav icons lift/tilt on hover, squish on press. Toast auto-hides after 2.6s.
- `prefers-reduced-motion: reduce` disables every decorative animation and smooth scrolling;
  states stay visible (steam at 0.8 opacity).

## 3D buttons (house style)

- Hard edge shadow: `box-shadow: 0 var(--depth) 0 var(--depth-color)` with `--depth: 4px`
  (2px for the small tray X buttons) and a per-color `--depth-color`.
- Hover: lift `-2px` and stretch the edge. Press: sink the full depth, flatten to
  `0 0 0`, add a small inset shadow.
- Top bevel (`inset 0 1px 0 rgba(255,255,255,.28)`) everywhere except solid fills
  (primary, WhatsApp, nav WhatsApp, back-to-top, mobile WhatsApp) where a 1px white line
  reads as a stray border - those get a plain edge instead.

## Components

- Sticky header with scroll shadow, active-section highlight, mobile hamburger.
- Hero: Unsplash photo (`srcset` 600/1200/2000w + matching preload) under a brown overlay,
  blurred glass info panel, day-time mood via `body[data-time]` with an open-now countdown.
- Order tray: fixed cart circle with count badge, expands into a card ("Your order" label,
  scrolling item list with per-item X, clear-all + total + WhatsApp prefill in the footer).
  Items live in memory only; refresh clears them.
- Toast: brown card, orange check icon for actions, coffee-cup icon for WhatsApp opens.
- Back-to-top circle, mobile sticky Call/WhatsApp bar, footer coffee cup linking to WhatsApp.

## Icons & assets

- No emoji. Outline SVG only (lucide geometry, `stroke-width` 2, round caps/joins);
  menu card icons come from the lucide CDN and are replaced by inline SVG where animated.
- One external image (Unsplash hero); everything else is CSS/SVG.

## Accessibility

- Skip link, `<main>` landmark, `role="img"` on decorative star rows, `aria-live` toast,
  `aria-expanded` on tray/menu toggles, orange `:focus-visible` outlines.
- Controls are `user-select: none` with transparent tap highlight; body text stays selectable.

## Content policy

Contacts, prices, hours and testimonials are demo placeholders
(`wa.me/123456789`, `+1 234 56789`, 123 Market Road) and must be replaced before real use.
