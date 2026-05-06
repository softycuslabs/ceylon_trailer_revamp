# Ceylon Trailer — Frontend Beginner's Guide

> **Who is this for?** This document is written for someone who is new to React and Next.js but wants to understand how this project is built, how the code is organised, and where to start learning. No heavy technical jargon — plain English throughout.

---

## 1. What Does This Application Do?

**Ceylon Trailer** is a travel agency website for Sri Lanka. It is the public-facing website that potential tourists visit to:

- Browse travel **destinations** across Sri Lanka (e.g. Central Province, Southern Province)
- Explore curated **trip packages** (adventure, wildlife, beach, honeymoon, etc.)
- View a **photo gallery** of Sri Lanka
- Read **travel articles / blog posts**
- Learn about **camping & glamping** experiences
- **Send an inquiry** (contact form) to book or ask about a trip
- **Chat via WhatsApp** directly with the travel team

Think of it as an online travel brochure that is connected to a backend server which provides all the real data (destinations, trips, photos, etc.).

---

## 2. Tech Stack — All the Tools Used

Here is every library and tool used, explained in plain English:

| Tool / Library | What It Does |
|---|---|
| **Next.js 14** | The main framework. It is built on top of React and handles routing (pages), server-side rendering, and performance optimisation. Think of it as the "engine" of the app. |
| **React 18** | The UI library. You build the interface by writing small, reusable pieces called "components". React updates the screen automatically when data changes. |
| **TypeScript** | A version of JavaScript that forces you to define what type of data a variable holds (e.g. a number, a string, an object). It catches mistakes before the code runs. |
| **Tailwind CSS** | A styling system. Instead of writing a separate CSS file, you apply pre-built style classes directly in your HTML/JSX (e.g. `text-cyan-600`, `flex`, `rounded-xl`). |
| **Framer Motion** | An animation library. It makes elements slide in, fade in, or animate smoothly when they appear on screen. Used heavily in the Hero section and Navbar. |
| **Axios** | A tool for making HTTP requests — i.e. fetching data from the backend API (the server). |
| **Lucide React** | A collection of clean icons (search icon, menu icon, chevron arrows, etc.). |
| **Swiper** | A library for building image/card sliders and carousels. |
| **React Hot Toast** | Shows small pop-up notification messages (e.g. "Thank you! We will contact you shortly." after submitting a form). |
| **React Intersection Observer** | Detects when an element scrolls into the visible area of the screen. Used to trigger animations when you scroll down. |
| **Radix UI** | Accessible, unstyled UI building blocks — accordion (expand/collapse), dialog (pop-up modals), tabs, and select dropdowns. |
| **clsx + tailwind-merge** | Helper utilities to combine CSS class names cleanly and safely, especially when classes are conditional. |
| **Sharp** | An image processing library used by Next.js to automatically resize and optimise images for fast loading. |
| **ESLint** | A code linting tool that checks your code for common mistakes and style issues automatically. |
| **PostCSS + Autoprefixer** | Tools that process your CSS and add browser compatibility prefixes automatically. You rarely touch these directly. |

---

## 3. Folder and File Structure

```
frontend/
├── app/                        ← All the pages of the website live here
│   ├── layout.tsx              ← The master wrapper that wraps EVERY page
│   ├── page.tsx                ← The Home page (what you see at "/")
│   ├── globals.css             ← Global CSS styles applied to the whole site
│   ├── robots.ts               ← Tells search engines what to index
│   ├── sitemap.ts              ← Auto-generates a sitemap for Google
│   ├── about/
│   │   └── page.tsx            ← The About page ("/about")
│   ├── blog/
│   │   ├── page.tsx            ← Blog listing page ("/blog")
│   │   └── [slug]/             ← Individual blog post ("/blog/some-article")
│   ├── destinations/
│   │   ├── page.tsx            ← Destinations listing page ("/destinations")
│   │   ├── DestinationsClient.tsx ← The interactive filtering logic for destinations
│   │   └── [slug]/             ← Individual destination page ("/destinations/sigiriya")
│   ├── trips/
│   │   ├── page.tsx            ← Trips listing page ("/trips")
│   │   ├── TripsClient.tsx     ← The interactive filtering + search logic for trips
│   │   └── [slug]/             ← Individual trip page ("/trips/sigiriya-adventure")
│   ├── gallery/
│   │   ├── page.tsx            ← Gallery page ("/gallery")
│   │   └── GalleryClient.tsx   ← Interactive gallery with category filters
│   ├── camping-glamping/
│   │   └── page.tsx            ← Camping & Glamping page
│   └── contact/
│       └── page.tsx            ← Contact page ("/contact")
│
├── components/                 ← Reusable UI building blocks (not pages)
│   ├── layout/
│   │   ├── Navbar.tsx          ← The navigation bar at the top of every page
│   │   └── Footer.tsx          ← The footer at the bottom of every page
│   ├── home/                   ← Components used ONLY on the Home page
│   │   ├── HeroSection.tsx     ← The big banner at the top of the home page
│   │   ├── AboutSection.tsx    ← "About Us" section on the home page
│   │   ├── TopDestinations.tsx ← Featured destinations on the home page
│   │   ├── EnjoyWithUs.tsx     ← "Enjoy With Us" activities section
│   │   ├── SriLankaMap.tsx     ← Interactive map of Sri Lanka
│   │   ├── PhotoGallery.tsx    ← Featured photos on the home page
│   │   ├── WhyChooseUs.tsx     ← Reasons to choose Ceylon Trailer
│   │   ├── Testimonials.tsx    ← Customer reviews/testimonials
│   │   └── TrustedBy.tsx       ← Logos of partner brands
│   ├── destinations/
│   │   └── DestinationCard.tsx ← A single destination card (image + name + description)
│   ├── trips/
│   │   └── TripCard.tsx        ← A single trip card (image + title + price + type)
│   ├── camping/
│   │   └── CampingGlampingPage.tsx ← Full content for the camping page
│   └── shared/                 ← Components reused across multiple pages
│       ├── InquiryForm.tsx     ← The booking/contact form
│       ├── PageHero.tsx        ← The top banner used on inner pages (not the home page)
│       ├── Pagination.tsx      ← Next/Previous page navigation buttons
│       └── WhatsAppButton.tsx  ← The floating green WhatsApp chat button
│
├── lib/                        ← Utility code (not UI components)
│   ├── api.ts                  ← ALL functions that fetch data from the backend server
│   ├── types.ts                ← TypeScript definitions — describes the shape of all data
│   └── utils.ts                ← Small helper functions + shared constant lists
│
├── public/                     ← Static files served directly to the browser
│   └── images/                 ← All local image files (logo, hero images, etc.)
│
├── next.config.js              ← Next.js configuration (image domains, env vars)
├── tailwind.config.ts          ← Tailwind CSS configuration (custom colours, fonts)
├── tsconfig.json               ← TypeScript configuration
├── .env.local                  ← Secret environment variables (API URL, WhatsApp number)
└── package.json                ← Lists all dependencies and available commands
```

### Key Terms Explained

- **`app/` folder** — In Next.js 14, every folder inside `app/` that has a `page.tsx` file becomes a URL route automatically. No manual route configuration needed.
- **`[slug]/` folders** — Square brackets mean a "dynamic" route. The `slug` is a URL-friendly name (e.g. `sigiriya-rock`). So `/destinations/sigiriya-rock` and `/destinations/ella` both use the same page template.
- **`components/` folder** — These are NOT pages. They are reusable pieces of UI that pages "import and use". Think of them like LEGO bricks — each is independent and reusable.
- **`lib/` folder** — Pure logic, no visual UI. `api.ts` talks to the server, `types.ts` defines what data looks like, `utils.ts` holds small helper tools.

---

## 4. React & Next.js Concepts Used in This Project

### 4.1 Components

A **component** is a JavaScript function that returns some HTML-like code (called JSX). Every visual piece of this website is a component.

**Example** — the `TripCard` component receives a trip's data and displays it as a card:
```
TripCard receives: { title, image, price, duration, trip_type }
TripCard returns:  A styled card with all that information
```

Components are like custom HTML tags. When the trips page needs to show 12 trips, it just calls `<TripCard />` twelve times, once for each trip.

### 4.2 Props (Passing Data into Components)

**Props** are how a parent component passes data down to a child component. They are like function arguments.

In [app/page.tsx](../frontend/app/page.tsx), the home page fetches destinations from the server and passes them to the `TopDestinations` component:
```
<TopDestinations destinations={featuredDestinations} />
```
The `TopDestinations` component receives `destinations` as a prop and loops through the list to display each one.

### 4.3 State (Data That Changes)

**State** is data stored inside a component that can change. When state changes, React automatically re-draws (re-renders) that part of the screen.

**Example from** [components/layout/Navbar.tsx](../frontend/components/layout/Navbar.tsx):
- `scrolled` — becomes `true` when the user scrolls down. The navbar background changes.
- `mobileOpen` — becomes `true` when the user taps the hamburger menu on mobile.

State is created with the `useState` hook:
```js
const [scrolled, setScrolled] = useState(false)
// scrolled = current value (false)
// setScrolled = the function to change it
```

### 4.4 Hooks

**Hooks** are special React functions that give components extra powers. They always start with `use`.

| Hook | Where It's Used | What It Does |
|---|---|---|
| `useState` | Navbar, InquiryForm, TripsClient | Stores data that can change |
| `useEffect` | Navbar, TripsClient | Runs code when something happens (page loads, data changes) |
| `useCallback` | TripsClient | Remembers a function so it doesn't get recreated unnecessarily |
| `usePathname` | Navbar | Reads the current URL path (e.g. `/trips`) |
| `useRouter` | TripsClient | Programmatically navigate to a different URL |
| `useSearchParams` | TripsClient | Reads URL query parameters (e.g. `?province=Central`) |

### 4.5 Server Components vs Client Components

This is a Next.js 14 concept. There are two types of components:

**Server Components (default)** — Run on the server, not in the browser. They can fetch data directly. The home page `page.tsx` is a server component — it fetches destinations, gallery images, and testimonials on the server before sending the HTML to the browser. Fast and great for SEO.

**Client Components (`'use client'` at the top)** — Run in the browser. They can use state, handle user events (clicks, typing), and use hooks. The `Navbar.tsx`, `InquiryForm.tsx`, and `TripsClient.tsx` are client components because they need to respond to user interaction.

**Rule of thumb:** If the component needs to react to clicks, scrolling, or typing → `'use client'`. Otherwise, leave it as a server component.

### 4.6 Routing (How Pages Work)

Next.js uses **file-based routing** — the folder structure IS the URL structure:

| File Path | URL |
|---|---|
| `app/page.tsx` | `/` (home) |
| `app/about/page.tsx` | `/about` |
| `app/trips/page.tsx` | `/trips` |
| `app/trips/[slug]/page.tsx` | `/trips/anything-here` |
| `app/destinations/[slug]/page.tsx` | `/destinations/anything-here` |

No configuration needed. Just create a folder with a `page.tsx` file and Next.js creates the route automatically.

### 4.7 Layout

[app/layout.tsx](../frontend/app/layout.tsx) is the **master layout**. It wraps every single page on the website. It contains:
- The `<Navbar />` — appears at the top of every page
- `{children}` — this is where each page's unique content is inserted
- The `<Footer />` — appears at the bottom of every page
- `<WhatsAppButton />` — the floating WhatsApp button visible everywhere
- `<Toaster />` — the notification pop-up system

Think of it as a picture frame. The frame (Navbar + Footer) stays the same. Only the picture inside (`children`) changes when you navigate between pages.

### 4.8 Data Fetching

The app talks to a separate backend API (a Django/Python server). All API calls are centralised in [lib/api.ts](../frontend/lib/api.ts).

**How it works:**
1. A page component calls a function like `getTrips()` or `getFeaturedDestinations()`
2. That function uses **Axios** to send an HTTP GET request to the backend URL (e.g. `http://api.ceylontrailer.com/api/trips/`)
3. The backend responds with JSON data
4. The page uses that data to render the content

**Two patterns used in this project:**

- **Server-side fetch (home page):** The data is fetched on the server before the page loads. The user sees everything immediately. Used in `app/page.tsx`.
- **Client-side fetch (trips/destinations pages):** The page loads first, then fetches data in the browser. This allows interactive filtering without reloading the whole page. Used in `TripsClient.tsx` and `DestinationsClient.tsx`.

### 4.9 Environment Variables

Sensitive values like the API server URL and WhatsApp phone number are stored in the `.env.local` file and NOT committed to version control. They are accessed in code like this:
```js
const API_URL = process.env.NEXT_PUBLIC_API_URL
```
The `NEXT_PUBLIC_` prefix means the variable is safe to expose to the browser.

---

## 5. How the App Flows — Pages and Components Connected

Here is a visual map of how everything connects:

```
Browser requests "/"
        │
        ▼
app/layout.tsx  ←─── Wraps EVERYTHING
   │  ├── <Navbar />           (components/layout/Navbar.tsx)
   │  ├── <main>{children}</main>
   │  ├── <Footer />           (components/layout/Footer.tsx)
   │  └── <WhatsAppButton />   (components/shared/WhatsAppButton.tsx)
   │
   └── children = app/page.tsx (Home Page)
          │
          ├── Fetches data from backend (via lib/api.ts)
          │      ├── getFeaturedDestinations() → list of destinations
          │      ├── getGalleryImages()        → featured photos
          │      └── getTestimonials()         → customer reviews
          │
          └── Renders these sections in order:
               ├── <HeroSection />          ← Big banner, "Plan Your Dream Trip" button
               ├── <AboutSection />         ← Company introduction
               ├── <TopDestinations />      ← Receives destinations from API
               ├── <EnjoyWithUs />          ← Activities section
               ├── <SriLankaMap />          ← Interactive map
               ├── <PhotoGallery />         ← Receives gallery images from API
               ├── <WhyChooseUs />          ← Static content block
               ├── <Testimonials />         ← Receives testimonials from API
               └── <TrustedBy />            ← Partner logos

Browser requests "/trips"
        │
        ▼
app/trips/page.tsx
   └── Renders <TripsClient />  (app/trips/TripsClient.tsx)
          │
          ├── Reads URL params (?province=Central&trip_type=adventure)
          ├── Fetches matching trips from backend
          └── Renders:
               ├── <PageHero />     ← Top banner for the page
               ├── Sidebar filters  ← Province, Activities, Trip Type
               ├── Search bar
               └── Grid of <TripCard /> components — one per trip

User clicks a Trip Card
        │
        ▼
app/trips/[slug]/page.tsx
   └── Fetches full trip details using the slug from the URL
       └── Renders full trip detail (images, itinerary, highlights, <InquiryForm />)
```

### The Inquiry Form Flow

```
User fills in InquiryForm (name, email, phone, message, dates)
        │
        ▼
handleSubmit() is called
        │
        ▼
createInquiry() in lib/api.ts sends POST request to backend
        │
        ├── Success → react-hot-toast shows "Thank you!" notification
        └── Failure → react-hot-toast shows "Something went wrong" notification
```

---

## 6. Key Files to Focus On First

If you are new to this project, study these files in this order:

| Priority | File | Why Study It |
|---|---|---|
| 1 | [frontend/app/layout.tsx](../frontend/app/layout.tsx) | Understand the master wrapper — how every page is built |
| 2 | [frontend/app/page.tsx](../frontend/app/page.tsx) | The home page — see how server-side data fetching works |
| 3 | [frontend/lib/api.ts](../frontend/lib/api.ts) | Understand how the app talks to the backend |
| 4 | [frontend/lib/types.ts](../frontend/lib/types.ts) | Understand what shape the data takes (Destination, Trip, etc.) |
| 5 | [frontend/components/layout/Navbar.tsx](../frontend/components/layout/Navbar.tsx) | See `useState`, `useEffect`, animations, and routing in action |
| 6 | [frontend/components/shared/InquiryForm.tsx](../frontend/components/shared/InquiryForm.tsx) | See form state management and API POST request |
| 7 | [frontend/app/trips/TripsClient.tsx](../frontend/app/trips/TripsClient.tsx) | See client-side filtering, search, and pagination working together |
| 8 | [frontend/lib/utils.ts](../frontend/lib/utils.ts) | Small helper functions — easy to read, good for beginners |
| 9 | [frontend/components/home/HeroSection.tsx](../frontend/components/home/HeroSection.tsx) | See Framer Motion animations and how a complex section is built |

---

## 7. Beginner Learning Tips

Based on what this project actually uses, here is a learning path tailored specifically to you:

### Step 1 — Learn React Fundamentals First
Before anything else, understand these React concepts:
- **What is a component?** — a function that returns JSX (HTML-like code)
- **What are props?** — data passed from parent to child
- **What is state?** — data that lives inside a component and causes re-renders when it changes
- **What is `useState`?** — the hook for creating state
- **What is `useEffect`?** — the hook for running side effects (like fetching data or listening to scroll events)

Recommended resource: The official React docs at [react.dev](https://react.dev) — their interactive tutorials are excellent.

### Step 2 — Learn Next.js 14 App Router
Once React makes sense, learn these Next.js concepts — all of which are used directly in this project:
- **File-based routing** — how folders become URLs
- **`app/layout.tsx`** — the root layout pattern
- **Server Components vs Client Components** — when to use `'use client'`
- **`page.tsx`** — the entry point for each route
- **Dynamic routes** — what `[slug]` means and how to use `params`
- **`Metadata` export** — how page titles and SEO descriptions are set
- **`revalidate`** — how Next.js decides when to re-fetch data (used on the home page and trips page)

Recommended resource: [nextjs.org/docs](https://nextjs.org/docs) — specifically the "App Router" section.

### Step 3 — Learn Tailwind CSS Basics
This project uses Tailwind for ALL styling. You need to understand:
- Utility classes (e.g. `flex`, `grid`, `p-4`, `text-cyan-600`, `rounded-xl`)
- Responsive prefixes (e.g. `lg:flex` means "apply flex only on large screens")
- Hover states (e.g. `hover:bg-cyan-600`)

You do not need to know regular CSS deeply — Tailwind abstracts most of it.

### Step 4 — Understand TypeScript Basics
This project uses TypeScript. Focus on:
- **Interfaces** — defining the shape of an object (see [lib/types.ts](../frontend/lib/types.ts))
- **Type annotations** — e.g. `function greet(name: string): string`
- **Optional properties** — e.g. `tripId?: number` (the `?` means it may or may not be present)

You do not need to be a TypeScript expert. Just understand how to read and write basic interfaces and type annotations.

### Step 5 — Learn How HTTP & APIs Work
The whole app depends on fetching data from a backend API. Understand:
- What is a GET request? (fetching data)
- What is a POST request? (sending data, e.g. the inquiry form)
- What is JSON? (the format the API responds with)
- What is Axios? (the library this project uses to make those requests)

### Step 6 — Explore Framer Motion (for animations)
This is optional for beginners, but the project uses it extensively. Focus on:
- `motion.div` — an HTML element that can be animated
- `initial` / `animate` — the starting and ending states of an animation
- `transition` — how long and how the animation plays

### Things NOT to Worry About Right Now
- `robots.ts` and `sitemap.ts` — these are SEO tools, not important to learn at the start
- `sharp` — Next.js uses this internally for images, you do not need to touch it
- `postcss.config.js` — automatically configured, no need to edit
- `tsconfig.json` — already set up, no need to modify

---

## 8. Quick Reference — What Does Each Page Do?

| URL | File | What the User Sees |
|---|---|---|
| `/` | `app/page.tsx` | Home page — hero banner, destinations, gallery, testimonials |
| `/about` | `app/about/page.tsx` | Company story and team |
| `/trips` | `app/trips/page.tsx` | Browsable, filterable list of all trip packages |
| `/trips/[slug]` | `app/trips/[slug]/page.tsx` | Full details of one specific trip + inquiry form |
| `/destinations` | `app/destinations/page.tsx` | Browsable, filterable list of all destinations |
| `/destinations/[slug]` | `app/destinations/[slug]/page.tsx` | Full details of one specific destination |
| `/gallery` | `app/gallery/page.tsx` | Photo gallery with category filters |
| `/blog` | `app/blog/page.tsx` | List of travel articles |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Full content of one article |
| `/camping-glamping` | `app/camping-glamping/page.tsx` | Camping & glamping experiences page |
| `/contact` | `app/contact/page.tsx` | Contact form and details |

---

## 9. How to Run the Project Locally

```bash
# Go into the frontend folder
cd frontend

# Install all dependencies
npm install

# Copy the example environment file and fill in your values
cp .env.example .env.local

# Start the development server
npm run dev
```

Then open your browser at `http://localhost:3000`.

**Available commands:**
- `npm run dev` — Start development server (with live reload)
- `npm run build` — Build the app for production
- `npm run start` — Run the production build locally
- `npm run lint` — Check for code errors and style issues

---

*Document generated for the Ceylon Trailer frontend codebase — Next.js 14, React 18, TypeScript, Tailwind CSS.*
