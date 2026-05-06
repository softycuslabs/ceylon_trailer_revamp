# Destinations — Demo Data Architecture & Migration Guide

This document explains how destination data is organised, how the demo mode works, how to render destinations on the website, and the full step-by-step migration path from demo data to a live database.

---

## 1. Folder Structure

```
frontend/
├── demo/                          ← All temporary demo data lives here
│   ├── index.ts                   ← Single import point for demo data
│   ├── destinations.ts            ← All 18 destinations (fully typed)
│   └── images/
│       └── README.md              ← Instructions for adding real photos
│
├── lib/
│   ├── destinations-data.ts       ← Unified data access layer (USE THIS in pages)
│   ├── api.ts                     ← Real API functions (calls Django backend)
│   └── types.ts                   ← Destination TypeScript interface
│
└── public/
    └── images/
        └── locations/             ← Where real destination images go
            └── jaffna.jpg         ← ✅ Already exists
```

**Golden rule:** Pages and components should only ever import from `lib/destinations-data.ts` — never directly from `demo/` or `lib/api.ts`. This single-file swap is what makes migration effortless.

---

## 2. The 18 Destinations (Data Summary)

All destinations are stored in [frontend/demo/destinations.ts](../frontend/demo/destinations.ts) and match the `Destination` TypeScript interface exactly.

| # | Name | Province | Slug | Featured |
|---|---|---|---|---|
| 1 | Kandy – The Cultural Capital | Central | `kandy` | ✅ |
| 2 | Trincomalee – Coastal Heritage & Natural Beauty | Eastern | `trincomalee` | ✅ |
| 3 | Dambulla Cave Temple – Rock of Faith | Central | `dambulla` | ✗ |
| 4 | Yala – Safari Adventure | Southern | `yala` | ✅ |
| 5 | Adam's Peak – A Sacred Summit | Sabaragamuwa | `adams-peak` | ✗ |
| 6 | Ambuluwawa – Tower in the Sky | Central | `ambuluwawa` | ✗ |
| 7 | Mirissa – Ocean Adventures Await | Southern | `mirissa` | ✅ |
| 8 | Galle – Colonial Charm & Coastal Beauty | Southern | `galle` | ✅ |
| 9 | Sinharaja – Rainforest Wilderness | Southern | `sinharaja` | ✗ |
| 10 | Polonnaruwa – Lost City of Kings | North Central | `polonnaruwa` | ✗ |
| 11 | Nuwara Eliya – Little England | Central | `nuwara-eliya` | ✅ |
| 12 | Sigiriya – Lion Rock Fortress | Central | `sigiriya` | ✅ |
| 13 | Wilpattu National Park | North Central | `wilpattu` | ✗ |
| 14 | Hikkaduwa – Beachside Bliss | Southern | `hikkaduwa` | ✗ |
| 15 | Arugam Bay – Surf & Serenity | Eastern | `arugam-bay` | ✗ |
| 16 | Anuradhapura – Ancient Kingdom | North Central | `anuradhapura` | ✗ |
| 17 | Ella – Misty Mountain Escape | Uva | `ella` | ✅ |
| 18 | Jaffna – Culture Beyond Borders | Northern | `jaffna` | ✗ |

**Featured destinations** (8 total) appear in the home page carousel.

---

## 3. How to Switch Between Demo and Live Mode

Open [frontend/.env.local](../frontend/.env.local) and change one line:

```env
# Use local demo data (no backend needed)
USE_DEMO_DATA=true

# Use live backend API
USE_DEMO_DATA=false
```

That's it. No code changes needed. Restart the dev server after changing this value.

---

## 4. How to Use Destination Data in Pages

Always import from `lib/destinations-data.ts`. Never import directly from `demo/` or `lib/api.ts`.

### Home page — featured destinations carousel

```typescript
// app/page.tsx (server component)
import { fetchFeaturedDestinations } from '@/lib/destinations-data'

export default async function HomePage() {
  const destinations = await fetchFeaturedDestinations()
  return <TopDestinations destinations={destinations} />
}
```

### Destinations listing page

```typescript
// app/destinations/DestinationsClient.tsx (client component)
import { listDestinations } from '@/lib/destinations-data'

const data = await listDestinations({ province: 'Central', search: 'kandy', page: 1 })
// Returns: { count, next, previous, results: Destination[] }
```

### Single destination detail page

```typescript
// app/destinations/[slug]/page.tsx (server component)
import { fetchDestination, fetchAllDestinationSlugs } from '@/lib/destinations-data'

// Pre-render all destination pages at build time
export async function generateStaticParams() {
  const slugs = await fetchAllDestinationSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Fetch this specific destination
export default async function DestinationPage({ params }: { params: { slug: string } }) {
  const destination = await fetchDestination(params.slug)
  // ...render page
}
```

### Sitemap

```typescript
// app/sitemap.ts
import { getAllDestinations } from '@/lib/destinations-data'

export default function sitemap() {
  const destinations = getAllDestinations() // works in demo mode only
  return destinations.map((d) => ({
    url: `https://ceylontrailer.com/destinations/${d.slug}`,
    lastModified: d.updated_at,
  }))
}
```

---

## 5. How Destination Cards Are Rendered

The existing `DestinationCard` component already renders all data correctly. No changes needed:

```
Destination data  →  <DestinationCard destination={dest} />
                              │
                    ┌─────────┴─────────┐
                    │  Card renders:    │
                    │  - Cover image    │
                    │  - Province badge │
                    │  - Name           │
                    │  - Short desc.    │
                    │  - "View Details" │
                    │    → /destinations│
                    │      /{slug}      │
                    └───────────────────┘
```

**Rendering a grid of all destinations:**

```tsx
import { getAllDemoDestinations } from '@/demo'
import DestinationCard from '@/components/destinations/DestinationCard'

// Simple static display (no pagination needed for demo/testing)
export default function AllDestinationsDemo() {
  const destinations = getAllDemoDestinations()
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {destinations.map((dest) => (
        <DestinationCard key={dest.id} destination={dest} />
      ))}
    </div>
  )
}
```

**Rendering with province filtering (matches DestinationsClient pattern):**

```tsx
import { getDemoDestinationsPaginated } from '@/demo'

const { results, count } = getDemoDestinationsPaginated(1, 12, { province: 'Central' })
// Returns up to 12 Central Province destinations
```

---

## 6. Adding Real Destination Images

### Step 1 — Prepare your images
- Format: `.jpg` or `.webp`
- Size: minimum 800×600 px, recommended 1200×800 px landscape
- Name: must match the slug exactly (e.g. `sigiriya.jpg`)

### Step 2 — Copy to the public folder
```
frontend/public/images/locations/sigiriya.jpg
frontend/public/images/locations/kandy.jpg
... etc
```

### Step 3 — Update destinations.ts
In [frontend/demo/destinations.ts](../frontend/demo/destinations.ts), change the `image` field:
```typescript
// Before (Unsplash placeholder)
image: 'https://images.unsplash.com/photo-1546975490-e8b92a360b24?w=800&q=80',

// After (your local image)
image: '/images/locations/sigiriya.jpg',
```

> Jaffna already uses a local image (`/images/locations/jaffna.jpg`) — use it as a reference.

---

## 7. Migration Strategy — Demo → Database

When the backend dashboard is ready, follow these steps in order. Do **not** skip steps.

---

### Phase 1 — Seed the Database

1. Log in to the Django admin dashboard
2. Create all 18 destinations using the data from `demo/destinations.ts` as your reference
3. Upload real photos for each destination through the dashboard
4. Mark the 8 featured destinations as `featured = true`
5. Verify the API endpoints return correct data:
   ```
   GET /api/destinations/          → list of all destinations
   GET /api/destinations/featured/ → 8 featured destinations
   GET /api/destinations/sigiriya/ → single destination by slug
   ```

---

### Phase 2 — Test Live Mode Side-by-Side

1. In `.env.local`, change to `USE_DEMO_DATA=false`
2. Make sure the backend is running at `NEXT_PUBLIC_API_URL`
3. Start the dev server and verify:
   - Home page carousel shows featured destinations
   - `/destinations` page lists all destinations with filters working
   - `/destinations/sigiriya` (and other slugs) loads correctly
   - Images load from the backend (Cloudinary or backend server)
4. If anything is broken, switch back to `USE_DEMO_DATA=true` while you fix it

---

### Phase 3 — Update Pages to Use Live Layer

The pages currently call `listDestinations`, `fetchDestination`, etc. from `lib/destinations-data.ts`. As long as `USE_DEMO_DATA=false` and the API works, no page code needs to change.

However, if you want to simplify — remove the demo abstraction and call `lib/api.ts` directly:

```typescript
// Replace this (in each page):
import { fetchFeaturedDestinations } from '@/lib/destinations-data'

// With this:
import { getFeaturedDestinations } from '@/lib/api'
```

Only do this **after** confirming live mode works perfectly.

---

### Phase 4 — Remove the Demo Folder

Once live mode is stable and you've updated all imports:

```bash
# Remove all demo data
rm -rf frontend/demo/

# Remove the abstraction layer (now unused)
rm frontend/lib/destinations-data.ts

# Remove the demo env variable from both files
# Edit .env.local and .env.example — delete the USE_DEMO_DATA line
```

**Before deleting, confirm:**
- [ ] All 18 destinations are live in the database
- [ ] All pages have been updated to import from `lib/api.ts` directly
- [ ] `USE_DEMO_DATA` variable removed from `.env.local` and `.env.example`
- [ ] Build passes: `npm run build`
- [ ] No TypeScript errors: `npx tsc --noEmit`

---

## 8. Key Files Quick Reference

| File | Purpose | Edit when... |
|---|---|---|
| [frontend/demo/destinations.ts](../frontend/demo/destinations.ts) | All 18 destination records | Adding/editing destination content or images |
| [frontend/demo/index.ts](../frontend/demo/index.ts) | Barrel export from demo/ | Adding new demo data files |
| [frontend/lib/destinations-data.ts](../frontend/lib/destinations-data.ts) | Unified data access layer | Adding new data functions |
| [frontend/lib/api.ts](../frontend/lib/api.ts) | Real API functions | Adding new backend API calls |
| [frontend/lib/types.ts](../frontend/lib/types.ts) | TypeScript interfaces | Backend adds/removes fields |
| [frontend/.env.local](../frontend/.env.local) | Mode switch + secrets | Toggling demo/live mode |
| [frontend/public/images/locations/](../frontend/public/images/locations/) | Real local photos | Adding/replacing destination images |
| [frontend/demo/images/README.md](../frontend/demo/images/README.md) | Image naming reference | — |

---

## 9. Data Shape Reference

For reference, this is the full `Destination` TypeScript interface that all demo data conforms to:

```typescript
interface Destination {
  id: number               // Unique numeric ID
  name: string             // Full display name (e.g. "Sigiriya – Lion Rock Fortress")
  slug: string             // URL-safe identifier (e.g. "sigiriya")
  description: string      // Full long description shown on the detail page
  short_description: string // 1–2 sentence summary shown on cards
  province: Province       // One of 9 Sri Lankan provinces
  image: string | null     // Main cover image URL or local path
  images?: DestinationImage[] // Additional gallery images
  map_lat: string | null   // GPS latitude (for Google Maps link)
  map_lng: string | null   // GPS longitude (for Google Maps link)
  featured: boolean        // If true, appears in home page carousel
  created_at: string       // ISO timestamp
  updated_at: string       // ISO timestamp
}
```
