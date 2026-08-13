# Build prompt — Wild Nomad landing site

Fill in the bracketed values, attach the files listed in `README.md`, then paste everything below the line into your AI tool.

---

## Fill these in first

```
[DOMAIN]         = e.g. wildnomad.pk (ignore for now)
[CONTACT_EMAIL]  = e.g. hello@wildnomad.pk (ignore)
[LAUNCH_WINDOW]  = e.g. "Spring 2026" or a specific date
[INSTAGRAM]      = @thewildnomad.pk
```

---

# PROMPT — copy everything below this line

You are a senior product designer and front-end engineer building the marketing website for a mobile app that is about to launch. I want work at the standard of Linear, Raycast, Arc or Komoot — restrained, confident, fast, and heavy on craft. Not a template.

Read this entire brief before writing any code.

---



## 1. The product

**Wild Nomad** is a road-trip companion app for Pakistan, built for motorcycle riders, car travellers and adventure seekers. It is currently in pre-launch; the Android app is not yet on the Play Store.

The core idea: Google Maps knows Pakistan's cities. It does not know that the last reliable fuel before Khunjerab is at Sost, that the mechanic in Jutial stocks chains for Chinese 150s, or that Babusar Pass is under snow. Wild Nomad is that knowledge, pinned to a map by the riders who found it.

**In-app tagline:** `Ride Pakistan`

**Positioning:** Pakistan's rider-verified map and trip planner.

### What the app does


| Feature             | Detail                                                                                                                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rider-verified map  | 93 stops across 17 regions in 21 categories — fuel, mechanics, dhabas, hotels, hospitals, checkpoints, viewpoints, campsites and more. Community submitted, admin approved            |
| Trip planning       | Vehicle-aware routing with alternates, distance, ETA, fuel cost estimate, corridor stops along the way, and multi-day splitting                                                       |
| Live road alerts    | Riders report landslides, closures, floods, snow, construction, checkpoints and traffic. Alerts expire on a confirmation system and notify you if one appears near your planned route |
| Offline regions     | 7 downloadable packs covering stops, alerts, routes and emergency numbers                                                                                                             |
| Ride tracking       | Background GPS recording — distance, speed, elevation, moving time — with crash recovery                                                                                              |
| Weather & road risk | Hourly and 7-day forecasts with a mountain road-risk score from snow, rain, wind and UV                                                                                               |
| Safety              | SOS over SMS and WhatsApp, emergency contacts, live location sharing by link, Pakistan emergency numbers built in                                                                     |
| Community           | Rider groups, realtime group chat, live location in chat, feed, follows                                                                                                               |
| Trip expenses       | Shared expense tracking with automatic debt settlement between riders                                                                                                                 |
| Mountain passes     | Seasonal open/closed status for Babusar, Khunjerab, Lowari, Shandur, Burzil and Deosai                                                                                                |
| Garage              | Per-vehicle service log                                                                                                                                                               |




### Brand voice

Rider-to-rider. Practical, specific, understated, first-hand. Short sentences. Concrete details over adjectives.

**Never write:** "revolutionary", "seamless", "world-class", "game-changing", "unlock", "empower", "your journey starts here", "the ultimate travel companion". No exclamation marks in body copy. No generic startup language of any kind.

**Do write** like someone who has ridden the Karakoram Highway and is telling you what he found.

---



## 2. Primary goal

The app is **not downloadable yet**. The site's job is to collect email addresses for early access, not to send people to a store page that doesn't exist.

Implement this as a single config flag in `lib/config.ts`:

```ts
export const LAUNCH_STATE: 'prelaunch' | 'live' = 'prelaunch';
export const PLAY_STORE_URL = ''; // filled at launch
```

Every CTA on the page reads this flag:

- `prelaunch` → button says **"Get early access"**, opens/scrolls to the email capture
- `live` → button says **"Download on Google Play"**, links to `PLAY_STORE_URL`

Build both paths now. Flipping one constant must flip the entire site.

---



## 3. Tech stack

Use exactly this:

- **Next.js 15** with App Router and TypeScript, strict mode
- **Tailwind CSS v4**
- **Framer Motion** for animation
- **MapLibre GL JS** for the interactive map
- **lucide-react** for icons
- **Supabase JS** for the waitlist
- `next/font/google` for fonts, `next/image` for images
- Deploy target: **Vercel**

No UI kit, no component library, no Bootstrap. Hand-build the components.

---



## 4. Design system — use these exact values

These are taken directly from the app's theme files. Do not substitute, approximate or "improve" them. Define them as CSS custom properties in `globals.css` and map them into the Tailwind theme.

### Colour

```css
--color-primary:        #D9642C;  /* burnt orange — the brand */
--color-primary-dark:   #B84A1E;
--color-primary-soft:   rgba(217, 100, 44, 0.16);

--color-bg:             #121212;
--color-bg-elevated:    #171717;
--color-surface:        #1E1E1E;
--color-surface-alt:    #262626;
--color-surface-pressed:#2E2E2E;

--color-text:           #F2EFEA;
--color-text-secondary: #A8A29B;
--color-text-muted:     #6F6A64;

--color-border:         rgba(242, 239, 234, 0.08);
--color-border-strong:  rgba(242, 239, 234, 0.16);

--color-success:        #4CAF50;
--color-warning:        #E8A33D;
--color-danger:         #E63946;
--color-water:          #3E92CC;

--color-overlay:        rgba(0, 0, 0, 0.55);
```

Category accent colours used on the map: stay `#9A7BB8`, checkpoint `#4A7FD4`, nature `#3D9E88`, landmark `#B8924A`, snow `#7EB0D4`.

**Dark theme only.** No light mode, no theme toggle.

Use `#D9642C` with restraint — primary CTAs, active states, key accents, one or two highlighted words in headings. On a near-black page a single warm accent is powerful; spread it everywhere and it becomes noise.

### Typography

Load via `next/font/google`:


| Role                 | Font               | Weights       |
| -------------------- | ------------------ | ------------- |
| Headings             | **Sora**           | 600, 700, 800 |
| Body                 | **Inter**          | 400, 500, 600 |
| Stats, numbers, data | **JetBrains Mono** | 500, 700      |


Scale (desktop; scale down fluidly on mobile with `clamp()`):


| Use                 | Font               | Size                      | Line height | Tracking          |
| ------------------- | ------------------ | ------------------------- | ----------- | ----------------- |
| Hero H1             | Sora 800           | clamp(2.75rem, 6vw, 5rem) | 1.05        | -0.03em           |
| Section H2          | Sora 700           | clamp(2rem, 4vw, 3.25rem) | 1.1         | -0.02em           |
| H3                  | Sora 600           | 1.375rem                  | 1.35        | -0.01em           |
| Lead paragraph      | Inter 400          | 1.25rem                   | 1.6         | —                 |
| Body                | Inter 400          | 1rem                      | 1.65        | —                 |
| Small               | Inter 500          | 0.875rem                  | 1.5         | —                 |
| Eyebrow / label     | Inter 600          | 0.75rem                   | 1.4         | 0.12em, uppercase |
| Big stat            | JetBrains Mono 700 | clamp(2.5rem, 5vw, 4rem)  | 1           | -0.04em           |
| Data / mono caption | JetBrains Mono 500 | 0.8125rem                 | 1.5         | —                 |


Body copy maxes out at **65–70 characters** per line. Never full width.

### Spacing, radius, elevation

Spacing scale (px): `4, 8, 12, 16, 20, 24, 32, 48, 64, 96, 128`

Section vertical padding: `128px` desktop, `80px` tablet, `64px` mobile.

Radius: small `8px`, medium `12px` (buttons), large `16px` (cards), extra `22px` (feature tiles), pill `999px`.

Cards are `--color-surface` with a `1px --color-border` outline. Prefer borders and subtle inner glows over heavy drop shadows — on a near-black background, shadows read as dirt. Where you do need lift: `0 12px 32px rgba(0,0,0,0.4)`.

### Motion

Mirror the app's timings: fast `140ms`, base `240ms`, slow `420ms`. Easing `cubic-bezier(0.22, 1, 0.36, 1)`.

**Principles:**

- Scroll reveals: fade `0 → 1` plus `translateY(24px → 0)` over 500ms, triggered once at 15% visibility, with 60–80ms stagger between siblings
- Parallax on hero background only — subtle, no more than 15% travel
- Hover on interactive cards: border brightens to `--color-border-strong`, `translateY(-2px)`, 140ms
- Buttons: `scale(0.98)` on press
- Never bounce, never spring past the target, never animate anything longer than 600ms
- Wrap every animation in a `prefers-reduced-motion: reduce` check that disables transforms and keeps content visible

---



## 5. Page structure

Twelve sections in this order. Build each as its own component in `components/sections/`.

---



### Section 1 — Navigation

Fixed. Transparent over the hero; at `scrollY > 40` it gains `rgba(18,18,18,0.8)`, `backdrop-blur-xl` and a bottom border, transitioning over 240ms.

Left: logo mark (32px) + `WILD NOMAD` in Sora 700, letter-spaced.
Centre (desktop ≥1024px): `Map` · `Features` · `Routes` · `FAQ` — smooth-scroll anchors, muted text, primary on hover.
Right: primary CTA button.

Mobile: hamburger opening a full-screen overlay, links staggered in, CTA at the bottom.

---



### Section 2 — Hero

Full viewport height, minimum 700px.

**Background:** `assets/images/hero-hunza.jpg`, full-bleed, slow parallax on scroll, plus a very slow 20-second `scale(1 → 1.06)` ken-burns loop. Over it: a vertical gradient `#121212` at 0% opacity at the top through `rgba(18,18,18,0.75)` mid to `#121212` at the bottom, so the section melts into the next. Add a faint animated grain or noise overlay at 3% opacity for texture.

If a video file is supplied instead, use it: muted, looping, `playsInline`, with the still as the poster.

**Layout:** two columns on desktop (60/40), stacked on mobile with the phone below.

**Left column:**

Eyebrow, in primary orange with a small pulsing dot:

```
PRE-LAUNCH · [LAUNCH_WINDOW]
```

H1 — animate word by word on load, 40ms stagger, fade + 12px rise:

```
Ride Pakistan like you've been here before.
```

Set "Pakistan" in the primary orange.

Lead paragraph:

```
Rider-verified stops, route planning built for mountain roads, and live
alerts from whoever's ahead of you. Wild Nomad is the map Pakistan's
roads never had.
```

Inline email capture — a single pill-shaped container holding an email input and a primary button reading `Get early access`. Below it, in small muted text:

```
No spam. One email when it launches.
```

Trust row underneath, mono, muted, separated by dots:

```
93 stops · 21 categories · Works offline · Free
```

**Right column:** a phone mockup — a hand-built CSS device frame, dark bezel, ~10px radius on the screen, subtle border highlight — containing screenshot 1 (map screen). Float it with a very slow 6-second vertical drift of ±8px. Behind it, a large soft radial glow in `--color-primary` at about 12% opacity. Tilt the phone slightly: `rotateY(-8deg) rotateX(2deg)` with `perspective(1200px)`.

**Bottom centre:** an animated scroll indicator — a thin vertical line with a travelling highlight.

---



### Section 3 — Stats bar

A slim full-width band directly under the hero, `--color-bg-elevated`, bordered top and bottom.

Four stats, evenly spaced, 2×2 on mobile. Numbers in JetBrains Mono 700 in primary orange, counting from 0 to target over 1.2 seconds when scrolled into view (once only). Labels beneath in uppercase Inter 600 micro, muted.

```
93   Verified stops
21   Categories
7    Offline regions
6    Mountain passes
```

---



### Section 4 — The problem

Eyebrow: `THE PROBLEM`

H2:

```
You've had this ride.
```

Lead:

```
Every rider in Pakistan has. Somewhere past Mansehra, the questions
start and nobody in the group has an answer.
```

A 3×2 grid of cards (2×3 on tablet, single column on mobile). Each card: `--color-surface`, 22px radius, bordered, 32px padding, a lucide icon at 24px in a muted tone, and the line in Sora 600 at 1.25rem. On hover the icon shifts to primary orange and the border brightens.

```
Fuel      — "Last fuel for 80 km." Said by nobody, in time.
Wrench    — Nearest mechanic? Nearest hospital?
Coffee    — Which dhaba is actually on the route?
Mountain  — Landslide. Nobody told us.
SignalLow — Signal gone after Babusar.
MessagesSquare — The plan is buried in three WhatsApp groups.
```

Stagger the reveal 80ms apart. Close the section with a single centred line in muted text:

```
So we built the map that answers them.
```

---



### Section 5 — The live map ⭐ THE CENTREPIECE

Give this section the most effort. It is the product demo and the reason the site exists.

Full-bleed, `85vh`, minimum 640px.

**Above the map**, centred, with generous space:

Eyebrow: `LIVE DATA`

H2:

```
This isn't a screenshot. Pan it.
```

Lead:

```
Every stop below is real, pinned by riders and already in the app.
Filter it, zoom it, open one.
```

**The map itself:**

- MapLibre GL JS with the free CARTO **dark matter** raster tile style — no API key needed
- Initial view centred on northern Pakistan, roughly `[74.5, 35.5]` at zoom 6.2
- Load all 93 POIs from the attached `src/data/seed/pois.ts`. Convert that file into `data/pois.json` at build time or by hand — keep `id`, `name`, `category`, `lat`, `lng`, `region`, `description`, `verified` and any rating field
- Render markers as custom HTML elements: a 28px circle in the category colour from `src/data/categories.ts`, a `2px` dark border, the category emoji centred, and a soft coloured glow. Scale to 1.15 on hover
- Cluster below zoom 8 — clusters as larger orange circles with the count in JetBrains Mono
- **Filter chips** floating over the top-left of the map: horizontally scrollable pills, one per category with its emoji and label, plus an `All` chip. Active chip fills with the category colour. Filtering animates markers out with a fade and scale rather than snapping
- **Clicking a pin** opens a detail card — bottom sheet on mobile, floating panel bottom-left on desktop. Style it exactly like the app's POI sheet: category chip in its colour, name in Sora 700, region, description, a verified badge where applicable, and the coordinates in mono. Close button top-right, animate in over 240ms
- A **legend/counter** floating bottom-right in mono: `93 stops shown` — updating live as filters change
- Disable map rotation. Keep scroll-zoom **off by default** so the page still scrolls; enable it after the user clicks once on the map, and show a hint overlay reading `Click to interact` until they do. This is important — a map that hijacks the scroll wheel is the fastest way to lose a visitor
- Lazy-load the whole map with `next/dynamic` and `ssr: false`, behind an `IntersectionObserver`, with a skeleton in `--color-surface` while it loads

**Below the map**, a caption in muted mono:

```
93 stops · 17 regions · Community submitted, admin verified
```

---



### Section 6 — Features (bento grid)

Eyebrow: `WHAT'S INSIDE`

H2:

```
Everything between the ignition and the pass.
```

An asymmetric bento grid — a 6-column CSS grid on desktop, 2 on tablet, 1 on mobile. Tiles are `--color-surface`, 22px radius, bordered, with the content top-aligned and a visual filling the lower portion. On hover: border brightens, tile lifts 2px, and the tile's own animation plays.


| Tile          | Span           | Title                              | Copy                                                                                                                                      | Visual                                                              |
| ------------- | -------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Map           | 4 cols, 2 rows | Stops the big maps don't have      | Fuel, mechanics, dhabas, hospitals, checkpoints, campsites, hidden viewpoints. Twenty-one categories, pinned by riders who stopped there. | Screenshot 1 in a partial phone frame, bleeding off the bottom edge |
| Planner       | 2 cols, 2 rows | Plan it before you turn the key    | Distance, ETA, fuel cost and every stop along the corridor. Split long routes into days.                                                  | Screenshot 3                                                        |
| Alerts        | 2 cols         | Know what the road is doing        | Landslides, closures, snow and checkpoints, reported by riders ahead of you and confirmed by the ones behind.                             | Animated: three alert chips stacking in with a soft pulse           |
| Offline       | 2 cols         | No signal, no problem              | Download a region before you leave. Stops, routes, alerts and emergency numbers stay with you past the last tower.                        | Animated download progress ring                                     |
| Ride tracking | 2 cols         | Every kilometre on the record      | Distance, speed, elevation and moving time, recorded in the background.                                                                   | Screenshot 4                                                        |
| Safety        | 3 cols         | Help, in two taps                  | SOS over SMS and WhatsApp, emergency contacts, live location by link, and Pakistan's emergency numbers built in.                          | Large emergency numbers in mono: 1122 · 15 · 130 · 115              |
| Community     | 3 cols         | Ride with people who know the road | Groups, realtime chat, live location while you ride, and shared trip expenses that settle themselves.                                     | Screenshot 9                                                        |


---



### Section 7 — Route showcase

Background: `assets/images/hero-pass.jpg` at 15% opacity behind a dark overlay.

Eyebrow: `ONE ROUTE, MAPPED`

H2:

```
Islamabad → Hunza. Every stop that matters.
```

Lead:

```
Five legs, 560 kilometres, and the stops you'll actually need. All of
it is already in the app.
```

A horizontal timeline on desktop (vertical on mobile) with five nodes. Draw the connecting line progressively as the user scrolls, using an SVG path with an animated `stroke-dashoffset` in primary orange. Each node is a card with the leg number in mono, distance, and its stops as emoji + name rows.

Pull the exact stops from the attached `docs/posts/post4/README.md`:

```
LEG 1 · Islamabad → Mansehra · 120 km
  ⛽ Total Fuel Station, Mansehra
  🔧 Mansehra Tyre & Tube

LEG 2 · Mansehra → Naran · 240 km
  ☕ Kaghan Town — trout and paratha
  🏥 THQ Hospital, Balakot
  ⛽ Shell Naran — last proper pump before Babusar
  🛏️ Naran Bazaar

LEG 3 · Naran → Chilas via Babusar · 330 km
  ☕ Babusar Top chai stall — 4,173 m
  ⛽ PSO Chilas — cash preferred
  🛏️ Chilas Bazaar
  ⚠️ Babusar is summer-only

LEG 4 · Chilas → Gilgit · 460 km
  ⛽ Attock Petroleum, Gilgit
  🔧 Jutial Bike Mechanic
  🏥 DHQ Gilgit — trauma care and oxygen

LEG 5 · Gilgit → Karimabad · 560 km
  🛏️ Hard Rock Hunza
  ☕ Café de Hunza
  ⛽ Sost — last reliable fuel before Khunjerab
```

Style the Babusar warning line in `--color-warning` with an alert icon.

---



### Section 8 — Built for Pakistan

Background: `assets/images/hero-deosai.jpg`, heavily darkened.

Eyebrow: `NOT A GLOBAL APP WITH A FLAG ON IT`

H2:

```
A foreign map doesn't know these roads.
```

Four cards:

```
Emergency numbers that work here
  Rescue 1122, Police 15, Motorway Police 130, Edhi 115 — offline, in the app.

Fuel prices in rupees
  Current Pakistan rates, so the cost estimate on your route is a real number.

Passes that close
  Babusar, Khunjerab, Lowari, Shandur, Burzil and Deosai — seasonal status
  before you commit to the ride.

Built for a weak signal
  Seven downloadable regions. The mountains take your bars long before
  they take your ride.
```

Below, a slow horizontal marquee of all 21 category chips (emoji + label, each in its own colour), scrolling right to left, paused on hover, duplicated for a seamless loop, with a gradient fade at both edges.

---



### Section 9 — How it works

Three numbered steps, horizontal on desktop. Large mono numerals in primary orange at 20% opacity behind each.

```
01  Plan
    Pick your start and destination. Get the route, the fuel cost, the
    stops along the way, and the weather waiting for you.

02  Ride
    Track it live. Get alerted if the road ahead changes. Share your
    location so someone knows where you are.

03  Add
    Found a stop that isn't on the map? Pin it. Once it's verified,
    every rider behind you gets it.
```

---



### Section 10 — Founding riders / early access

The main conversion block. Background: `assets/images/hero-ride.jpg`, darkened, with a stronger primary-orange radial glow than elsewhere on the page.

Eyebrow: `EARLY ACCESS`

H2:

```
20 riders get it before the Play Store does.
```

Lead:

```
It works. It's also going to break in ways I can't predict from a desk
in Islamabad. So a handful of riders get it first.
```

Two columns:

**You get**

```
→ The app before anyone can download it
→ A direct line to the person building it
→ Your name on every stop you pin
→ A founding rider shoutout
```

**I need back**

```
→ One real ride with it
→ What broke, what confused you, what's missing
→ Ten minutes of honesty
```

Below, the email form — larger than the hero version, with a name field and an optional city field. Button: `Claim a spot`.

Under the form, in muted text:

```
Android first. iOS is coming — leave your email and you'll hear when.
```

Handle the `live` state too: when `LAUNCH_STATE === 'live'`, this section becomes a download block with a Google Play badge.

---



### Section 11 — FAQ

Accordion, single column, max-width 800px, centred. Chevron rotates 180°, panel height animates over 240ms. Only one open at a time.

```
Is it free?
  Yes. Everything described on this page is free. If paid features ever
  arrive, the map and the planner stay free.

When does it launch?
  [LAUNCH_WINDOW] on Android. Leave your email and you'll get it the day
  it's live — or earlier if you take an early access spot.

Will there be an iOS version?
  Android first, because that's what most riders in Pakistan carry. iOS
  follows. Leave your email either way.

Does it work without signal?
  Download a region before you leave and your stops, routes, alerts and
  emergency numbers all work offline. Map tiles still need a connection,
  so download while you have one.

Where does the data come from?
  Riders. Every stop is submitted by someone who was there and reviewed
  before it goes live. The map starts with 93 verified stops and grows
  with every ride.

Which parts of Pakistan are covered?
  The northern corridors are strongest — Hunza, Gilgit, Skardu, Kaghan,
  Naran, Chitral, Swat, AJK and Galiyat — plus Islamabad, Punjab and the
  Makran coast. Coverage follows wherever riders go.

Can I add a stop myself?
  Yes, that's the point. Pin it in the app, add a photo and a note, and
  once it's verified it's on the map with your name on it.

How do you handle my location data?
  Location is used to show nearby stops, record a ride you start, and
  share your position only when you choose to. It is never sold. See the
  privacy policy.
```

---



### Section 12 — Footer

`--color-bg-elevated`, top border.

Left: logo mark, wordmark, and the tagline `Ride Pakistan` in uppercase micro letter-spaced.
Middle: anchor links.
Right: Instagram link ([INSTAGRAM]) and `[CONTACT_EMAIL]`.
Bottom bar: `© 2026 Wild Nomad` · `Privacy Policy` · `Terms`.

Behind the footer, a subtle mountain-ridge SVG silhouette in `--color-surface`.

---



## 6. Waitlist implementation

Create an API route at `app/api/waitlist/route.ts`:

- `POST` accepting `{ email, name?, city?, source }` where `source` is `hero` or `founding`
- Validate the email with a proper regex; reject anything malformed with a 400
- Basic in-memory rate limit by IP — 5 requests per minute
- Insert into a Supabase table `waitlist` with columns: `id uuid default gen_random_uuid()`, `email text unique not null`, `name text`, `city text`, `source text`, `created_at timestamptz default now()`
- On a duplicate email, return success rather than an error — never tell a visitor they already signed up, just thank them
- Use `SUPABASE_SERVICE_ROLE_KEY` **server-side only**. It must never appear in a client component or in `NEXT_PUBLIC_`*

Also output the SQL migration for the table, including RLS policies that allow anonymous `INSERT` but **deny anonymous** `SELECT` — the email list must not be readable from the browser.

Form UX: inline validation, a disabled button with a spinner while submitting, and a success state that replaces the form with a checkmark and `You're on the list. Check your inbox before launch.` Animate the swap. Errors appear inline in `--color-danger`, never as an alert dialog.

---



## 7. Also build

`app/privacy/page.tsx` — a real privacy policy, styled to match, covering: what's collected (email, location, ride data, submitted stops, account info), why, that location is only shared when the user chooses, third parties (Supabase, Open-Meteo, map tile providers), retention, user rights, and a contact address. Google Play requires this URL for any app requesting location, so it needs to be genuine, not filler.

`app/terms/page.tsx` — brief terms of service in the same style.

**SEO and metadata:**

- Full Next.js `metadata` export: title, description, keywords, canonical
- OpenGraph and Twitter card tags with a generated OG image via `next/og` — dark background, logo, headline, `93 verified stops across Pakistan`
- `robots.txt` and `sitemap.xml`
- JSON-LD `SoftwareApplication` structured data
- Favicon and apple-touch-icon from the app icon
- `theme-color` set to `#121212`

**Quality bar:**

- Semantic HTML — `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, correct heading order
- Every image has meaningful alt text
- Keyboard navigable throughout, visible focus rings in primary orange, accordion and mobile menu wired with correct ARIA
- Contrast at WCAG AA minimum
- All images through `next/image` with explicit dimensions; hero eager, everything else lazy
- Target Lighthouse 95+ on performance and 100 on accessibility
- No layout shift — reserve space for the map and all images
- Mobile-first, tested at 375, 768, 1024, 1440 and 1920

---



## 8. File structure

```
app/
  layout.tsx
  page.tsx
  globals.css
  privacy/page.tsx
  terms/page.tsx
  api/waitlist/route.ts
  opengraph-image.tsx
components/
  ui/            Button, Input, Card, Badge, Accordion, Marquee, PhoneFrame,
                 AnimatedCounter, SectionHeading, Reveal
  sections/      Nav, Hero, Stats, Problem, LiveMap, Features, RouteShowcase,
                 BuiltForPakistan, HowItWorks, FoundingRiders, FAQ, Footer
  map/           MapView, MapMarker, CategoryFilter, PoiCard
lib/
  config.ts      LAUNCH_STATE, PLAY_STORE_URL, links
  supabase.ts
  utils.ts
data/
  pois.json      converted from src/data/seed/pois.ts
  categories.ts  the 21 categories with colours and emoji
  faq.ts
  features.ts
public/
  images/        hero and region photography
  screenshots/   app screenshots
  logo.png
```

---



## 9. Build in phases — do not attempt this in one response

Stop after each phase and wait for me.

1. **Foundation** — Next.js scaffold, Tailwind theme with every token above, fonts, `lib/config.ts`, the `ui/` primitives, Nav and Footer
2. **Hero + Stats** — including the phone frame, parallax, and the email form UI
3. **The live map** — the full interactive section. Take your time here; this is the most important part of the site
4. **Features + Problem** — the bento grid and the pain-point cards
5. **Route showcase + Built for Pakistan + How it works**
6. **Founding riders + FAQ** — plus the working waitlist API and the SQL migration
7. **Privacy, terms, SEO, OG image, accessibility pass, performance pass**

---



## 10. Hard rules

- **Do not invent statistics, testimonials, download counts, ratings, press logos or partner badges.** Nothing on this page may claim something that isn't true. Where I haven't supplied a real number, leave a clearly marked `TODO` rather than filling it in
- **Do not use stock-photo placeholders of foreign landscapes.** Use the supplied Pakistan photography, or a solid `--color-surface` block with a `TODO` note
- **Do not add a light mode**
- **Do not use emoji as decoration** in headings or body copy. Emoji appear only where they carry meaning — category markers and stop lists
- **Do not centre long paragraphs.** Centre headings and short leads only
- **Do not use gradient text**, glassmorphism everywhere, or rainbow accents. One accent colour, used sparingly
- **Do not make the map hijack scroll**
- **Do not exceed 70 characters** per line of body copy
- Every string of user-facing copy above is written deliberately — **use it verbatim** unless it doesn't fit the layout, in which case tell me rather than rewriting it in generic marketing language

Start with phase 1. Show me the theme configuration first so I can confirm the colours and type render correctly before you build on top of them.