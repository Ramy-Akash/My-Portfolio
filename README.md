# Aura — Premium Portfolio Template

A high-end, config-driven portfolio template built with **React (Vite) + Tailwind CSS + Framer Motion**.
No backend, no database — every word and image on the site comes from **one file**.

## Quick start

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
```

## Personalizing for a client (the only file you touch)

Open **`src/siteConfig.js`**. It contains every piece of content on the site. Shared media and URLs live under `shared`, while visible copy lives under `en` and `ar`:

| Section | Config keys |
|---|---|
| Brand & theme | `siteName`, `theme.light`, `theme.dark` |
| Language data | `en` / `ar` — all visible copy, labels, metadata, and accessibility text |
| Shared data | `shared` — images, email, project URLs, and media-independent values |

The selected language and theme are managed by React context and persist in `localStorage`. Arabic automatically sets the document direction to RTL.

**Hiding a section:** set its array to `[]` (e.g. `testimonials: []`) — the section disappears cleanly.

**Changing the theme:** edit `theme.light` or `theme.dark` (any hex colors). Buttons, links, highlights and surfaces update everywhere automatically.

## Replacing images (seconds, not minutes)

Every image is a plain string in `siteConfig.js` — components never import images.

1. Drop the client's images into **`public/assets/`**
2. Point the config at them:

```js
profilePic: "/assets/profile-janedoe.jpg",
// ...or use any hosted URL — both work identically:
aboutImage: "https://images.unsplash.com/photo-...",
```

All images render inside fixed-aspect `object-cover` containers, so **any image of any
dimensions looks correct instantly** — no cropping or resizing needed beforehand.
If an image path is wrong or missing, a neutral placeholder renders instead of a broken image.

### Icons

`services[].icon` accepts: `compass`, `pen`, `layers`, `spark`, `grid`, `chat`.
`socialLinks[].icon` accepts: `linkedin`, `behance`, `dribbble`, `instagram`, `twitter`, `github`, `globe`.

## Deployment (zero configuration)

- **Vercel:** import the repo → framework preset "Vite" is auto-detected → Deploy.
- **Netlify:** build command `npm run build`, publish directory `dist`.
- **Any static host:** upload the contents of `dist/` after `npm run build`.

## Project structure

```
src/
  siteConfig.js        ← THE single source of truth (edit this)
  App.jsx              ← applies theme + meta from config, composes sections
  components/
    Header.jsx         ← sticky nav + mobile menu
    Hero.jsx           ← headline, portrait, CTAs, stats
    About.jsx
    Services.jsx       ← dark expertise grid
    PortfolioGrid.jsx  ← hover overlays, tags, staggered layout
    Testimonials.jsx
    Contact.jsx        ← footer, socials, email CTA
    SmartImage.jsx     ← aspect-safe images + fallback placeholder
    Icon.jsx           ← inline SVG icon set (no icon library)
    Reveal.jsx         ← shared scroll-entry animation
public/
  assets/              ← drop client images here
```
