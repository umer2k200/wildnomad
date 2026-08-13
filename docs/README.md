# Wild Nomad — Landing Website Plan

Everything you need to get an AI to build the site: the strategy, the section-by-section structure, the assets you have to attach, and the gaps you need to fill first.

The copy-paste prompt lives in `PROMPT.md` in this folder.

---

## 1. What this site is actually for

Be honest about the stage you're at: **the app isn't downloadable yet.** So a "Download on Google Play" landing page is the wrong build. If the primary button doesn't work, everything above it is wasted.

The site has one job right now and a different job in six weeks:

| Phase | Primary CTA | Success metric |
|-------|-------------|----------------|
| **Now → launch** | `Get early access` — email capture | Emails collected (and they feed your Play closed test) |
| **Launch onward** | `Download on Google Play` | Installs |

Build it so **one variable flips the whole page** between those two states. That's a five-minute change later instead of a rebuild, and it's in the prompt.

Secondary jobs the site does from day one:

- **Legitimacy.** A real domain in your Instagram bio makes you a product instead of a guy with an app idea. This matters for press, for sponsors, and for the riders deciding whether to trust you with their email.
- **Play Store requirement.** Google Play requires a public **privacy policy URL** for any app requesting location. You need a hosted page regardless — you may as well hang a proper site off it.
- **Something to send.** Right now if someone asks "what are you building?" you send a Reel. A link is better.

---

## 2. The one idea that makes this site different

Almost every app landing page is: nice photo, phone mockup, three feature cards, download button. Forgettable, and an AI will default to exactly that if you let it.

**Your unfair advantage is that your product is a map, and a map runs in a browser.**

So the centrepiece of the site is a **live, interactive map with your actual 93 stops on it** — pan it, zoom it, filter by category, click a pin and see the real detail card. Not a screenshot. Not a video. The actual thing.

That single section does more selling than any amount of copy, because:

- It **is** the product demo — the visitor uses your app before installing anything
- It proves the data is real, which is the only thing anyone will doubt
- It's the thing people screenshot and share
- It costs you nothing extra — MapLibre GL JS is free, CARTO tiles are free, and the app already renders exactly this way

Everything else on the page is support for that section. If you only get one thing right, get that right.

---

## 3. Page structure

Twelve sections, in this order. The reasoning matters more than the list — don't let an AI reshuffle it.

### 1 — Navigation

Sticky, transparent over the hero, then solid dark with a blur once you scroll. Logo left, anchor links centre, `Get early access` button right. Hamburger on mobile.

### 2 — Hero

Full viewport. Slow-panning Hunza/KKH photograph behind a dark gradient, headline, one-line subhead, email capture inline, and a phone mockup floating right showing the map screen.

The email field goes **in the hero**, not just at the bottom. Most visitors never reach the bottom of a landing page.

### 3 — Stats bar

`93 stops` · `21 categories` · `7 offline regions` · `6 mountain passes` — counting up as they scroll into view, set in JetBrains Mono to match the app's stat styling.

Numbers make it concrete. "Lots of stops" is a claim; 93 is a fact.

### 4 — The problem

The six pain points from your Instagram posts, as a grid of cards. Reusing them is deliberate — someone who saw the Reel and lands here gets the same message twice, which is how messages stick.

### 5 — The live map ⭐

The centrepiece. Full-bleed, roughly 80% viewport height, real POI data, working category filters, clickable pins. Described in detail in the prompt.

### 6 — Features (bento grid)

Asymmetric grid, not three identical cards. The map and planner get large tiles; alerts, offline, safety, ride tracking, groups and expenses get smaller ones. Each tile has a small live animation rather than a static icon.

### 7 — Route showcase

Islamabad → Hunza with the real stops, straight out of `docs/posts/post4/README.md`. Horizontal timeline on desktop, vertical on mobile. This is the "these people actually ride" proof.

### 8 — Built for Pakistan

The section a foreign competitor can't copy. Pakistani emergency numbers (1122, 15, 130, 115), live fuel prices, seasonal pass status, Urdu-friendly, works on a weak signal.

### 9 — How it works

Three steps: Plan → Ride → Contribute. Short. Some people need the loop spelled out.

### 10 — Founding riders / early access

The main conversion block. Same offer as Instagram post 5 — the app before the Play Store, a direct line to you, your name on the stops you add.

### 11 — FAQ

Accordion. Is it free? When does it launch? iOS? Does it work offline? Where does the data come from? Which cities? How do I add a stop?

FAQs do real work — they kill the objections that stop someone typing their email.

### 12 — Footer

Logo, Instagram, email, privacy policy, terms. **The privacy policy link is not optional** — Play Store requires it.

---

## 4. Design direction

Dark, cinematic, high-contrast, generous whitespace. Think Linear or Raycast's structural discipline, wrapped around Komoot's outdoor photography.

The theme is not up for interpretation — it's lifted exactly from `src/theme/palette.ts` and `src/theme/tokens.ts` so the site and the app feel like one product:

| Role | Value |
|------|-------|
| Primary / accent | `#D9642C` |
| Background | `#121212` |
| Elevated background | `#171717` |
| Card surface | `#1E1E1E` |
| Alt surface | `#262626` |
| Text primary | `#F2EFEA` |
| Text secondary | `#A8A29B` |
| Text muted | `#6F6A64` |
| Border | `rgba(242,239,234,0.08)` |
| Success | `#4CAF50` · Warning `#E8A33D` · Danger `#E63946` · Water `#3E92CC` |

| Type | Font |
|------|------|
| Headings | **Sora** 600/700/800 |
| Body | **Inter** 400/500/600 |
| Stats & numbers | **JetBrains Mono** 500/700 |

Dark only. No light mode toggle on the site — the app defaults to dark and a single confident theme looks more considered than a half-tuned pair.

### Motion

Animation should feel like the app: quick and purposeful, never bouncy or decorative. The app's own timing tokens are `fast 140ms`, `base 240ms`, `slow 420ms` — the site uses the same.

Scroll-triggered fades with a small upward drift, parallax on the hero, counting stats, a slow marquee of category chips, animated route-drawing on the showcase, and a subtle pulse on live-alert map pins. Everything respects `prefers-reduced-motion`.

---

## 5. Tech stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Next.js 15, App Router, TypeScript** | Still React. Gives you SEO metadata, image optimisation, and an API route for the email form without a backend |
| Styling | **Tailwind CSS v4** | Fastest thing for an AI to produce consistent output in |
| Animation | **Framer Motion** | Scroll reveals and the map interactions |
| Map | **MapLibre GL JS** + free CARTO dark tiles | Exactly what the app uses, so it looks identical |
| Waitlist | **Supabase** | You already have it. One `waitlist` table |
| Icons | **lucide-react** | Same icon set as the app |
| Hosting | **Vercel** | Free, and Next.js deploys with zero config |

Total cost: **zero**, apart from a domain (~$10–12/year).

### A note on the waitlist

Point the form at Supabase rather than a Google Form. You get the emails in a database you control, you can query them, and it's the same project the app already uses. Keep the Google Form as the link you paste in DMs; the website form is the better path.

Row Level Security matters here: allow anonymous `INSERT` on the waitlist table, and **do not** allow anonymous `SELECT`, or anyone can read your entire email list from the browser. The prompt spells this out.

---

## 6. What to attach to the prompt

### Files from this repo — attach these directly

| File | Why the AI needs it |
|------|---------------------|
| `assets/logo2/logo.png` | The logo mark. Primary brand asset |
| `assets/icon.png` | App icon, for the download badge and favicon |
| `src/theme/palette.ts` | Colour source of truth |
| `src/theme/tokens.ts` | Spacing, radius, type scale, motion timings |
| `src/data/categories.ts` | All 21 categories with exact labels, colours and emoji — drives the map filters |
| `src/data/seed/pois.ts` | **The 93 real stops.** This is what makes the live map work |
| `src/data/offlineRegions.ts` | The 7 offline packs |
| `src/data/seed/passes.ts` | The 6 mountain passes |
| `docs/MARKETING.md` | Brand voice, tone rules, what to avoid |
| `docs/posts/post4/README.md` | The Islamabad → Hunza stop list for the route section |

### Photography — you already have it

| File | Use |
|------|-----|
| `assets/images/hero-hunza.jpg` | Hero background — the strongest of the four |
| `assets/images/hero-pass.jpg` | Route showcase background |
| `assets/images/hero-ride.jpg` | Founding riders section |
| `assets/images/hero-deosai.jpg` | Built for Pakistan section |
| `assets/images/region-*.jpg` | Region cards (kaghan, skardu, makran, galiyat) |

### App screenshots — you don't have these, and they're the biggest gap

There are no device screenshots anywhere in the repo. The site needs them in the phone mockups and the bento tiles, and they're also required for your Play Store listing, so this work isn't wasted either way.

**Capture these ten, from a real Android device:**

1. Map screen, zoomed to Hunza, plenty of pins visible
2. POI detail sheet — pick one with a photo, a rating and a verified badge
3. Plan tab showing a completed Islamabad → Hunza result with distance, ETA and fuel cost
4. Active ride dashboard mid-ride, with real numbers on it
5. Alerts list, or an alert pin open on the map
6. Weather screen with the road-risk score
7. Home dashboard
8. Offline regions screen with at least one pack downloaded
9. Community feed or a group chat
10. Safety / SOS screen

**Before you shoot:**

- Dark theme on. The site is dark, and light screenshots inside dark mockups look broken
- Full battery, full signal, no notification icons in the status bar — set the clock to something clean if you can
- Real data only. Empty states and `test test` placeholders will undo everything the rest of the page is doing
- 1080 × 2400, PNG
- Save them to `assets/screenshots/` named `01-map.png` … `10-safety.png`

If you can only manage three before you start building, do **map, plan result, and active ride** — the prompt uses those three in the hero and the two large bento tiles, and the rest can be dropped in later.

### Optional, but each one lifts the page

- **A 10–20 second riding clip** for the hero background instead of a still. Video converts better than photography, and you already have the footage. Export at 1080×1920 or 1920×1080, under 3 MB, muted, looping
- **A screen recording of the map being panned** — great for the features section
- **A photo of you on the bike** for the founding riders section. A face next to a personal ask converts significantly better than a landscape

### Things to decide before you prompt

1. **Domain.** `wildnomad.pk` if you can get it, otherwise `wildnomad.app` or `ridewildnomad.com`. `.pk` is a strong local signal
2. **Contact email.** `hello@wildnomad.pk` or similar. Needed for the footer and the privacy policy
3. **Launch date.** Even approximate — a countdown is a strong hero element, but only if the date is real
4. **Whether to show the map first or the hero first.** The prompt does hero first, which is safer

---

## 7. How to use the prompt

`PROMPT.md` is written to be pasted in one go. It's long on purpose: the difference between a generic landing page and a good one is entirely in the specification, and anything you leave out gets invented.

1. Open a fresh chat in Cursor, or v0, Bolt, Lovable — anything that scaffolds React
2. Attach the files from section 6
3. Paste the whole of `PROMPT.md`
4. Fill in the four `[BRACKETED]` values at the top: domain, contact email, launch window, Supabase details
5. Let it build the scaffold and the theme first, then go section by section

**Don't ask for the whole site in one response.** The prompt is split into build phases for this reason — quality drops sharply when a model tries to emit two thousand lines at once. Get the hero right, then move on.

### Order of work if you're short on time

1. Scaffold, theme, fonts, nav, hero, footer — a usable page
2. The live map section — the thing that actually sells
3. Features, stats, problem grid
4. Route showcase, Built for Pakistan, FAQ
5. Waitlist wiring, privacy policy, SEO, deploy

You could stop after step 2 and still have something worth putting in your Instagram bio.

---

## Related

- `PROMPT.md` — the copy-paste build prompt
- `docs/MARKETING.md` — strategy and brand voice
- `docs/posts/post5/README.md` — the early access offer the site's CTA mirrors
- `docs/PUBLISHING.md` — Play Store release steps
