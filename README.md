# Commonwealth Bar — Park Slope, Brooklyn

Official website for **Commonwealth Bar**, a neighborhood bar at the corner of 5th Ave & 12th St in Park Slope, Brooklyn. Open daily until 4 AM.

---

## 🚀 Overview

Commonwealth Bar is a Park Slope institution — known for its legendary jukebox (curated by Ray), spacious backyard patio, Kentucky bourbon program, 20+ draft beers, and free popcorn. This site serves as the bar's official online presence, covering the menu, hours, jukebox, and contact info.

Live site: [commonwealth-bar.vercel.app](https://commonwealth-bar.vercel.app)

---

## 🛠 Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Hosted on Vercel**

---

## 📂 Project Structure

```
src/
├── app/
│   ├── page.tsx              → Homepage
│   ├── layout.tsx            → Root layout + metadata
│   ├── globals.css           → Design system (colors, fonts, tokens)
│   └── pages/
│       ├── booze/            → Drinks menu
│       ├── food/             → Food menu
│       ├── contact/          → Hours & contact
│       └── jukebox/          → Jukebox artist list + search
├── lib/
│   └── components/
│       ├── Navbar.tsx        → Site navigation
│       ├── Footer.tsx        → Site footer
│       └── pageStyles.ts     → Shared inline CSS string for page components
public/
└── (favicon, static assets)
```

---

## 🎨 Design System

The site uses a warm, red-dominant color system defined in `globals.css` via CSS custom properties. Key tokens:

| Token | Value | Use |
|---|---|---|
| `--bg-base` | `#120604` | Page background |
| `--copper-hot` | `#e8781e` | Primary accent / italic highlights |
| `--brick-full` | `#b83012` | Buttons, active states |
| `--cream-pure` | `#fae8c8` | Primary text |
| `--font-display` | Cormorant Garamond | Headings, quotes |
| `--font-body` | DM Sans | Body, UI, labels |

---

## 🧑‍💻 Development

Install dependencies:

```bash
pnpm install
```

Run locally:

```bash
pnpm run dev
```

Build:

```bash
pnpm run build
```

---

## 📄 Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, about, features, happy hour, menu highlights, reviews, contact |
| `/pages/booze` | Full drinks menu — beers on tap, bourbon, spirits |
| `/pages/food` | Food menu — Dub Pies, beer cheese, snacks |
| `/pages/contact` | Hours, address, phone, email, map |
| `/pages/jukebox` | Full artist list with search + genre filtering |

---

## ✏️ Customization Checklist

- [ ] Replace business name in `Navbar.tsx` + `Footer.tsx`
- [ ] Update metadata in `src/app/layout.tsx`
- [ ] Replace homepage content in `src/app/page.tsx`
- [ ] Update drinks/food/contact pages in `src/app/pages/*`
- [ ] Replace favicon + assets in `public/`
- [ ] Update `remotePatterns` in `next.config.ts` with correct image hostname
- [ ] Update SEO metadata (title, description, OG image)
- [ ] Update footer credit link (`@VoltaNYC`) if needed

---

## ⚙️ Config Notes

**`next.config.ts`** — External images from `commonwealthbar.com` are whitelisted under `images.remotePatterns`. If the image domain changes, update `hostname` and `pathname` there — empty strings will cause a build failure.

---

## 📬 Contact

- **Address:** 497 5th Avenue, Park Slope, Brooklyn NY 11215
- **Phone:** (718) 768-0009
- **Email:** commonwealthliveson@gmail.com
- **Twitter:** [@commonwealthbar](https://twitter.com/commonwealthbar)

---

*Made by [@VoltaNYC](https://nyc.voltanpo.org)*
