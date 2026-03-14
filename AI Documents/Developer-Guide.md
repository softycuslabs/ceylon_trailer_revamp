# Ceylon Trailer — Developer Guide
### For Python Developers Learning Next.js

> This guide is written assuming you know Python well.
> Where possible, I'll explain Next.js/JavaScript concepts by comparing them to Python equivalents.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Folder Structure Explained](#2-folder-structure-explained)
3. [Running the Project Locally](#3-running-the-project-locally)
4. [Frontend — Next.js Basics for Python Developers](#4-frontend--nextjs-basics-for-python-developers)
5. [How to Edit Common Things](#5-how-to-edit-common-things)
6. [Backend — Django (You Already Know This)](#6-backend--django-you-already-know-this)
7. [Adding New Pages](#7-adding-new-pages)
8. [Working with Images](#8-working-with-images)
9. [Styling with TailwindCSS](#9-styling-with-tailwindcss)
10. [Connecting Frontend to Backend (API)](#10-connecting-frontend-to-backend-api)
11. [Environment Variables](#11-environment-variables)
12. [Deployment](#12-deployment)
13. [Quick Reference — Python vs JavaScript](#13-quick-reference--python-vs-javascript)
14. [Common Errors and Fixes](#14-common-errors-and-fixes)

---

## 1. Project Overview

Ceylon Trailer is a **full-stack travel agency website** for Sri Lankan tourism.

| Part | Technology | What it does |
|------|------------|--------------|
| **Frontend** | Next.js 14 + TypeScript + TailwindCSS | The website users see |
| **Backend** | Django 4.2 + Django REST Framework | API + Admin (CMS) |
| **Database** | SQLite (development) / PostgreSQL (production) | Stores all data |
| **Media** | Cloudinary (production) | Stores uploaded images |
| **Deployment** | Vercel (frontend) + Railway (backend) | Hosting |

**How they communicate:**
```
Browser → Next.js (localhost:3000)
             ↓  HTTP requests
           Django API (localhost:8000/api/)
             ↓
           Database
```

---

## 2. Folder Structure Explained

```
ceylon_trailer_revamp/
│
├── backend/               ← Django project (Python — you know this!)
│   ├── apps/
│   │   ├── destinations/  ← Destination model, views, serializers
│   │   ├── trips/         ← Trip packages
│   │   ├── blog/          ← Travel articles
│   │   ├── gallery/       ← Photo gallery
│   │   ├── testimonials/  ← Customer reviews
│   │   └── inquiries/     ← Contact form submissions
│   ├── ceylon_trailer/
│   │   └── settings/
│   │       ├── base.py         ← Shared settings
│   │       ├── development.py  ← Dev settings (SQLite, DEBUG=True)
│   │       └── production.py   ← Prod settings (PostgreSQL)
│   └── manage.py
│
├── frontend/              ← Next.js project (JavaScript/TypeScript)
│   ├── app/               ← Pages live here (App Router)
│   │   ├── page.tsx       ← Home page  (= views.py in Django)
│   │   ├── layout.tsx     ← Shared layout wrapping all pages
│   │   ├── globals.css    ← Global CSS styles
│   │   ├── about/
│   │   │   └── page.tsx   ← /about page
│   │   ├── destinations/
│   │   │   ├── page.tsx         ← /destinations listing
│   │   │   └── [slug]/page.tsx  ← /destinations/kandy (dynamic page)
│   │   ├── trips/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   └── blog/
│   │       ├── page.tsx
│   │       └── [slug]/page.tsx
│   │
│   ├── components/        ← Reusable UI pieces (like Django template includes)
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── home/          ← Sections on the homepage
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── TopDestinations.tsx
│   │   │   ├── SriLankaMap.tsx
│   │   │   ├── PhotoGallery.tsx
│   │   │   ├── WhyChooseUs.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── TrustedBy.tsx
│   │   └── shared/        ← Used across multiple pages
│   │       ├── WhatsAppButton.tsx
│   │       ├── InquiryForm.tsx
│   │       └── PageHero.tsx
│   │
│   ├── lib/
│   │   ├── api.ts         ← All API calls to Django backend
│   │   ├── types.ts       ← TypeScript type definitions (like Python dataclasses)
│   │   └── utils.ts       ← Helper functions
│   │
│   └── public/
│       └── images/        ← Static images (logo, hero photos, etc.)
│
└── AI Documents/          ← This guide lives here
```

---

## 3. Running the Project Locally

### Start the Backend (Django)

```bash
# Go to backend folder
cd backend

# Activate virtual environment
source venv/bin/activate       # macOS/Linux
# venv\Scripts\activate        # Windows

# Run migrations (first time only)
python manage.py migrate

# Create admin user (first time only)
python manage.py createsuperuser

# Start server
python manage.py runserver
# → API available at: http://localhost:8000/api/
# → Admin at: http://localhost:8000/admin/
```

### Start the Frontend (Next.js)

Open a **new terminal tab**, then:

```bash
# Go to frontend folder
cd frontend

# Install packages (first time only)
npm install

# Start development server
npm run dev
# → Website at: http://localhost:3000
```

### Stop the Servers

Press `Ctrl + C` in the terminal to stop either server.

---

## 4. Frontend — Next.js Basics for Python Developers

### Think of it like this:

| Django concept | Next.js equivalent |
|----------------|-------------------|
| `views.py` | `app/page.tsx` files |
| `urls.py` | Folder structure in `app/` |
| Django templates (`.html`) | Components (`.tsx` files) |
| `{% include %}` | `<ComponentName />` |
| `models.py` | `lib/types.ts` (type definitions) |
| `serializers.py` | Also handled in `lib/types.ts` |
| `pip install` | `npm install` |
| `requirements.txt` | `package.json` |
| `python manage.py runserver` | `npm run dev` |

### File extensions explained:

- `.tsx` = TypeScript + JSX (HTML-like syntax inside JavaScript)
- `.ts` = TypeScript (just JavaScript with types — like Python type hints)
- `.css` = Same as in Django templates

### What is TypeScript?

TypeScript is JavaScript + type annotations. Very similar to Python type hints:

```python
# Python
def greet(name: str) -> str:
    return f"Hello {name}"
```

```typescript
// TypeScript
function greet(name: string): string {
    return `Hello ${name}`
}
```

### What does a component look like?

A component is like a Python function that returns HTML:

```python
# Python (Django template tag concept)
def hero_section(title: str, subtitle: str) -> str:
    return f'<section><h1>{title}</h1><p>{subtitle}</p></section>'
```

```tsx
// Next.js component
export default function HeroSection() {
  return (
    <section>
      <h1>Creating Unforgettable Travel Experiences</h1>
      <p>Plan Your Dream Trip Now</p>
    </section>
  )
}
```

### How routing works (No urls.py needed!)

Next.js uses **folder names** as URL routes automatically:

| Folder | URL |
|--------|-----|
| `app/page.tsx` | `/` (home) |
| `app/about/page.tsx` | `/about` |
| `app/destinations/page.tsx` | `/destinations` |
| `app/destinations/[slug]/page.tsx` | `/destinations/kandy`, `/destinations/galle`, etc. |

The `[slug]` in square brackets means it's a **dynamic route** — like `<slug:slug>` in Django urls.py.

---

## 5. How to Edit Common Things

### Change the Navigation Links

File: `frontend/components/layout/Navbar.tsx`

Look for this section near the top of the file:

```tsx
const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Travel Article', href: '/blog', children: [...] },
  { label: 'Destinations', href: '/destinations', children: [...] },
  { label: 'About', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
]
```

- To **add a link**: copy one of the `{ label: '...', href: '...' }` lines and add it to the list.
- To **remove a link**: delete its line.
- To **rename a link**: change the `label` value.

### Change the Footer Links

File: `frontend/components/layout/Footer.tsx`

```tsx
const quickLinks = [
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Services', href: '/trips' },
  { label: 'Contact Us', href: '/contact' },
]
```

Same pattern — edit the labels and hrefs.

### Change Contact Information in Footer

File: `frontend/components/layout/Footer.tsx`

Find this section:
```tsx
<a href="tel:+94770045488">+94 77 00 45 48 8</a>
<a href="mailto:info@ceylontrailer.com">info@ceylontrailer.com</a>
<span>No. 45, Galle Road, Colombo 03, Sri Lanka</span>
```

Just change the text and href values.

### Change Hero Section Text

File: `frontend/components/home/HeroSection.tsx`

```tsx
<h1>
  Creating{' '}
  <span>Unforgettable</span>{' '}
  Travel Experiences With Us
</h1>

<p>Plan Your Dream Trip Now</p>
```

Edit the text directly.

### Change the Stats (500+ Tours, etc.)

File: `frontend/components/home/HeroSection.tsx`

```tsx
{ value: '500+', label: 'Tours Completed' },
{ value: '50+', label: 'Destinations' },
{ value: '1000+', label: 'Happy Travelers' },
```

Change `value` and `label` as needed.

### Change Social Media Links

File: `frontend/components/layout/Footer.tsx`

```tsx
{ Icon: Facebook, href: '#', label: 'Facebook' },
{ Icon: Instagram, href: '#', label: 'Instagram' },
{ Icon: Twitter, href: '#', label: 'Twitter' },
{ Icon: Youtube, href: '#', label: 'YouTube' },
```

Replace `'#'` with real URLs like `'https://facebook.com/ceylontrailer'`.

### Change the WhatsApp Number

File: `frontend/.env.local`

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=94770000000
```

Replace with your number (include country code, no `+` sign).

---

## 6. Backend — Django (You Already Know This)

The backend is standard Django REST Framework. Here's a quick recap of what's where:

### Admin Panel

Go to `http://localhost:8000/admin/` after running the backend.

You can manage:
- **Destinations** — Add/edit travel destinations
- **Trips** — Create tour packages with pricing and itineraries
- **Gallery** — Upload photos
- **Blog** — Write travel articles
- **Testimonials** — Approve/reject customer reviews
- **Inquiries** — View contact form submissions

### Adding a New Destination via Admin

1. Go to `http://localhost:8000/admin/`
2. Click **Destinations → Add Destination**
3. Fill in: Name, Description, Province, Image, Featured (yes/no)
4. Click Save
5. The frontend will automatically show it (data is fetched from the API)

### API Endpoints Quick Reference

```
GET  /api/destinations/          → List all destinations
GET  /api/destinations/kandy/    → Get one destination by slug
GET  /api/destinations/featured/ → Get featured destinations only
GET  /api/trips/                 → List all trips
GET  /api/trips/featured/        → Get featured trips
GET  /api/gallery/               → List gallery images
GET  /api/blog/                  → List blog articles
GET  /api/testimonials/          → List testimonials
POST /api/inquiries/             → Submit a contact form
```

You can test these in your browser or with a tool like Postman / curl:
```bash
curl http://localhost:8000/api/destinations/
```

---

## 7. Adding New Pages

### Example: Add a `/team` page

**Step 1** — Create the folder and file:
```
frontend/app/team/page.tsx
```

**Step 2** — Write the page component:
```tsx
// frontend/app/team/page.tsx

export default function TeamPage() {
  return (
    <div className="container-custom py-20">
      <h1 className="section-title">Our Team</h1>
      <p className="text-gray-600">Meet the people behind Ceylon Trailer.</p>
    </div>
  )
}
```

That's it! The page is now live at `http://localhost:3000/team`.

**Step 3** — Add it to the navigation in `Navbar.tsx`:
```tsx
{ label: 'Team', href: '/team' },
```

---

## 8. Working with Images

### Where to put images

All static images go inside:
```
frontend/public/images/
```

Once you put an image there, you reference it starting with `/images/...` (not the full path).

### How to use an image in a component

```tsx
import Image from 'next/image'

// Usage:
<Image
  src="/images/your-photo.jpg"   // file in public/images/
  alt="Description of image"
  width={800}                    // actual width in pixels
  height={600}                   // actual height in pixels
  className="object-cover"       // CSS classes
/>
```

**Important rules for `next/image`:**
- Always provide `width` and `height` (or use `fill` for full-container images)
- Always provide `alt` text (for accessibility and SEO)
- Use `priority` on the first visible image (like hero/logo)

### Current images in the project

| File | Used in |
|------|---------|
| `ceylon-trailor-logo-150x-150.png` | Navbar and Footer logo |
| `ceylontrailor-header-right-image.webp` | Hero section (right side) |
| `Sri-lankan-Image-380x700-1.png` | Map section |
| `ceylon-trailer-Sigiriya-footer image.png` | Footer background |

---

## 9. Styling with TailwindCSS

TailwindCSS is a utility-first CSS framework. Instead of writing CSS files, you add small class names directly in the HTML.

### How it works

```tsx
// Instead of writing CSS like:
// .button { background: cyan; color: white; padding: 12px 24px; border-radius: 999px; }

// You write:
<button className="bg-cyan-500 text-white px-6 py-3 rounded-full">
  Book Now
</button>
```

### Common classes used in this project

| Class | What it does |
|-------|-------------|
| `text-gray-800` | Dark gray text |
| `text-cyan-600` | Cyan/teal colored text |
| `bg-white` | White background |
| `bg-cyan-500` | Cyan background |
| `px-6` | Horizontal padding |
| `py-3` | Vertical padding |
| `mt-4`, `mb-4` | Top/bottom margin |
| `rounded-full` | Fully rounded corners |
| `flex`, `grid` | Layout |
| `hidden lg:flex` | Hidden on mobile, visible on large screens |
| `font-semibold` | Semi-bold text |
| `font-heading` | Uses Playfair Display font |
| `font-body` | Uses Inter font |

### Custom classes in this project

These are defined in `globals.css`:

| Class | Use it for |
|-------|-----------|
| `container-custom` | Page wrapper with max-width and padding |
| `section-title` | Big section headings |
| `section-subtitle` | Subtitle text under headings |
| `btn-primary` | Cyan button |
| `btn-whatsapp` | Green WhatsApp button |
| `card-hover` | Card hover animation |

Example:
```tsx
<h2 className="section-title">Our Destinations</h2>
<p className="section-subtitle">Explore the beauty of Sri Lanka</p>
```

---

## 10. Connecting Frontend to Backend (API)

All API calls are centralised in one file: `frontend/lib/api.ts`

### How to fetch data in a page

```tsx
// frontend/app/destinations/page.tsx

import { getDestinations } from '@/lib/api'

export default async function DestinationsPage() {
  // This is like: response = requests.get(API_URL + '/destinations/')
  const destinations = await getDestinations()

  return (
    <div>
      {destinations.results.map((dest) => (
        <div key={dest.slug}>
          <h2>{dest.name}</h2>
        </div>
      ))}
    </div>
  )
}
```

### Available API functions (from `lib/api.ts`)

```typescript
getDestinations(filters?)      // GET /api/destinations/
getDestination(slug)           // GET /api/destinations/{slug}/
getFeaturedDestinations()      // GET /api/destinations/featured/

getTrips(filters?)             // GET /api/trips/
getTrip(slug)                  // GET /api/trips/{slug}/
getFeaturedTrips()             // GET /api/trips/featured/

getGalleryImages(filters?)     // GET /api/gallery/
getArticles(filters?)          // GET /api/blog/
getArticle(slug)               // GET /api/blog/{slug}/
getTestimonials()              // GET /api/testimonials/

createInquiry(payload)         // POST /api/inquiries/
```

---

## 11. Environment Variables

### Frontend environment variables

File: `frontend/.env.local` (you create this from `.env.example`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_WHATSAPP_NUMBER=94770000000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Rule:** Any variable starting with `NEXT_PUBLIC_` is accessible in the browser. Others are server-only.

This is like Django's `.env` file — never commit it to Git.

### Backend environment variables

File: `backend/.env`

```env
SECRET_KEY=your-django-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=postgresql://user:password@localhost:5432/ceylon_db
CORS_ALLOWED_ORIGINS=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

---

## 12. Deployment

### Frontend → Vercel (free)

1. Push the `frontend/` folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Set these environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL` → your Railway backend URL (e.g. `https://ceylon-api.up.railway.app/api`)
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` → your WhatsApp number
   - `NEXT_PUBLIC_SITE_URL` → your Vercel domain

4. Click Deploy — done!

### Backend → Railway (free tier available)

1. Push the `backend/` folder to GitHub
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Add a **PostgreSQL** database plugin
4. Set environment variables:
   - `SECRET_KEY`
   - `ALLOWED_HOSTS` → your Railway domain
   - `CORS_ALLOWED_ORIGINS` → your Vercel URL
   - `CLOUDINARY_*` → from your Cloudinary account
5. Set start command:
   ```
   python manage.py migrate && gunicorn ceylon_trailer.wsgi:application
   ```

---

## 13. Quick Reference — Python vs JavaScript

| Task | Python | JavaScript/TypeScript |
|------|--------|----------------------|
| Print to console | `print("hello")` | `console.log("hello")` |
| Variable | `name = "Ceylon"` | `const name = "Ceylon"` |
| String interpolation | `f"Hello {name}"` | `` `Hello ${name}` `` |
| List | `items = [1, 2, 3]` | `const items = [1, 2, 3]` |
| Dictionary | `d = {"key": "val"}` | `const d = { key: "val" }` |
| Function | `def greet(name):` | `function greet(name) {` |
| Arrow function | N/A | `const greet = (name) => ...` |
| List comprehension | `[x*2 for x in items]` | `items.map(x => x * 2)` |
| Filter | `[x for x in items if x > 2]` | `items.filter(x => x > 2)` |
| Async/await | `async def fetch(): await ...` | `async function fetch() { await ... }` |
| Import | `from module import func` | `import { func } from 'module'` |
| None | `None` | `null` or `undefined` |
| Type hint | `name: str` | `name: string` |
| If/else | `if x > 0:` | `if (x > 0) {` |
| For loop | `for item in items:` | `for (const item of items) {` |
| Install package | `pip install pkg` | `npm install pkg` |
| Package list | `requirements.txt` | `package.json` |

### Useful JavaScript patterns you'll see in the code

```typescript
// 1. Optional chaining (like Python's getattr with default)
// Python: getattr(obj, 'name', None)
const name = obj?.name   // returns undefined if obj is null

// 2. Nullish coalescing (like Python's "or" for None)
// Python: value = x or "default"
const value = x ?? "default"   // uses "default" only if x is null/undefined

// 3. Destructuring (like Python tuple unpacking)
// Python: a, b = [1, 2]
const [a, b] = [1, 2]
const { name, price } = trip    // unpack object properties

// 4. Spread operator (like Python's *args/**kwargs)
// Python: new_list = [*old_list, new_item]
const newList = [...oldList, newItem]

// 5. Template literals (like Python f-strings)
// Python: f"/destinations/{slug}"
const url = `/destinations/${slug}`
```

---

## 14. Common Errors and Fixes

### "Module not found" error

```
Module not found: Can't resolve 'some-package'
```

**Fix:** Install the missing package:
```bash
cd frontend
npm install some-package
```

### "Cannot read properties of undefined"

This is like Python's `AttributeError: 'NoneType' object has no attribute 'x'`.

**Fix:** Use optional chaining:
```tsx
// Unsafe:
<p>{trip.destination.name}</p>

// Safe:
<p>{trip.destination?.name}</p>
```

### Port already in use

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Fix:** Kill the process using the port:
```bash
lsof -ti:3000 | xargs kill -9
```

### Next.js image not showing

If an image from an external URL is blocked, you need to add it to `next.config.js`. For local images in `public/`, this is not needed.

### Django CORS error in browser

```
Access to XMLHttpRequest blocked by CORS policy
```

**Fix:** In `backend/.env`, make sure:
```env
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

Or in `development.py`, the setting `CORS_ALLOW_ALL_ORIGINS = True` handles this automatically during development.

### Fonts not loading / text looks wrong

The fonts are loaded using `next/font/google` in `layout.tsx`. If they look wrong:
1. Check your internet connection (fonts are downloaded from Google on first build)
2. Stop the server (`Ctrl+C`) and restart with `npm run dev`

---

## Need Help?

- **Next.js docs**: https://nextjs.org/docs
- **TailwindCSS docs**: https://tailwindcss.com/docs
- **Django REST Framework docs**: https://www.django-rest-framework.org
- **Framer Motion docs** (animations): https://www.framer.com/motion/

---

*Last updated: March 2026*
*Project: Ceylon Trailer — ceylon_trailer_revamp*
