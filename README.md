# Ceylon Trailer — Full Stack Travel Website

> A complete travel agency website for Sri Lankan tourism built with **Next.js 14** + **Django REST Framework**.

---

## Project Structure

```
ceylon_trailer_revamp/
├── backend/                         # Django REST API
│   ├── ceylon_trailer/              # Django project config
│   │   ├── settings/
│   │   │   ├── base.py              # Shared settings
│   │   │   ├── development.py       # Dev (SQLite)
│   │   │   └── production.py        # Prod (PostgreSQL)
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── apps/
│   │   ├── destinations/            # Destination model + API
│   │   ├── trips/                   # Trip model + API
│   │   ├── gallery/                 # Gallery model + API
│   │   ├── blog/                    # TravelArticle model + API
│   │   ├── testimonials/            # Testimonial model + API
│   │   └── inquiries/               # Inquiry model + API
│   ├── requirements.txt
│   ├── manage.py
│   ├── Dockerfile
│   ├── Procfile
│   └── .env.example
│
├── frontend/                        # Next.js 14 App Router
│   ├── app/
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Home page
│   │   ├── destinations/
│   │   │   ├── page.tsx             # Destinations listing
│   │   │   └── [slug]/page.tsx      # Destination detail
│   │   ├── trips/
│   │   │   ├── page.tsx             # Trip packages
│   │   │   └── [slug]/page.tsx      # Trip detail
│   │   ├── blog/
│   │   │   ├── page.tsx             # Blog listing
│   │   │   └── [slug]/page.tsx      # Article detail
│   │   ├── gallery/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── sitemap.ts               # Auto-generated sitemap
│   │   └── robots.ts                # Robots.txt
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── TopDestinations.tsx
│   │   │   ├── EnjoyWithUs.tsx
│   │   │   ├── SriLankaMap.tsx      # Interactive SVG map
│   │   │   ├── PhotoGallery.tsx
│   │   │   ├── WhyChooseUs.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── TrustedBy.tsx
│   │   ├── destinations/
│   │   │   └── DestinationCard.tsx
│   │   ├── trips/
│   │   │   └── TripCard.tsx
│   │   └── shared/
│   │       ├── WhatsAppButton.tsx   # Floating WhatsApp CTA
│   │       ├── InquiryForm.tsx
│   │       ├── PageHero.tsx
│   │       └── Pagination.tsx
│   ├── lib/
│   │   ├── api.ts                   # Axios API client
│   │   ├── types.ts                 # TypeScript interfaces
│   │   └── utils.ts                 # Helper functions
│   ├── Dockerfile
│   └── .env.example
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/destinations/` | List all destinations (filterable) |
| GET | `/api/destinations/{slug}/` | Get destination detail |
| GET | `/api/destinations/featured/` | Get featured destinations |
| GET | `/api/trips/` | List all trips (filterable) |
| GET | `/api/trips/{slug}/` | Get trip detail |
| GET | `/api/trips/featured/` | Get featured trips |
| GET | `/api/gallery/` | List gallery images |
| GET | `/api/blog/` | List published articles |
| GET | `/api/blog/{slug}/` | Get article detail |
| GET | `/api/testimonials/` | List approved testimonials |
| POST | `/api/inquiries/` | Submit inquiry |

**Filter examples:**
- `GET /api/destinations/?province=Central&featured=true`
- `GET /api/trips/?trip_type=wildlife&min_price=100&max_price=500`
- `GET /api/gallery/?category=wildlife&is_featured=true`

---

## Quick Start (Docker — Recommended)

```bash
# 1. Clone & enter project
cd ceylon_trailer_revamp

# 2. Copy env files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# 3. Run all services
docker-compose up --build

# Frontend: http://localhost:3000
# Backend API: http://localhost:8000/api/
# Django Admin: http://localhost:8000/admin/
```

---

## Manual Setup

### Backend (Django)

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env from example
cp .env.example .env
# Edit .env with your settings

# Run migrations
python manage.py migrate

# Create superuser (for admin)
python manage.py createsuperuser

# Start development server
python manage.py runserver
# API available at: http://localhost:8000/api/
# Admin at: http://localhost:8000/admin/
```

### Frontend (Next.js)

```bash
cd frontend

# Install dependencies
npm install

# Create env file
cp .env.example .env.local
# Edit .env.local with your API URL

# Start development server
npm run dev
# Frontend at: http://localhost:3000
```

---

## Environment Variables

### Backend (`backend/.env`)
```env
SECRET_KEY=your-django-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=postgresql://user:password@localhost:5432/ceylon_trailer_db
CORS_ALLOWED_ORIGINS=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_WHATSAPP_NUMBER=94770000000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Django Admin (CMS)

Visit `/admin/` after creating a superuser. You can:

- **Destinations** — Add destinations with province, images, coordinates, featured flag
- **Trips** — Create trips with itinerary, activities, gallery images, pricing
- **Gallery** — Upload and categorize gallery photos
- **Travel Articles** — Write and publish blog articles
- **Testimonials** — Approve/reject customer reviews
- **Inquiries** — View and manage customer inquiries, update status

---

## Deployment

### Frontend → Vercel

1. Push `frontend/` to GitHub
2. Connect to [Vercel](https://vercel.com)
3. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL` → your Railway/DigitalOcean API URL
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` → your WhatsApp number
   - `NEXT_PUBLIC_SITE_URL` → your Vercel domain

### Backend → Railway

1. Push `backend/` to GitHub
2. Connect to [Railway](https://railway.app)
3. Add PostgreSQL plugin
4. Set environment variables:
   - `SECRET_KEY` — generate with `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"`
   - `DATABASE_URL` — auto-set by Railway PostgreSQL plugin
   - `ALLOWED_HOSTS` — your Railway domain
   - `CORS_ALLOWED_ORIGINS` — your Vercel frontend URL
   - `CLOUDINARY_*` — Cloudinary credentials
5. Set start command: `python manage.py migrate && gunicorn ceylon_trailer.wsgi:application`

### WhatsApp Button

The WhatsApp button uses this URL format:
```
https://wa.me/94770000000?text=Hello%20I%20am%20interested%20in%20a%20tour
```

For trip-specific inquiries:
```
https://wa.me/94770000000?text=Hello%20I%20am%20interested%20in%20the%20trip%20{trip_name}
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, TypeScript, TailwindCSS, Framer Motion |
| State | React hooks + URL params |
| HTTP Client | Axios |
| Backend | Django 4.2, Django REST Framework |
| Database | PostgreSQL (prod) / SQLite (dev) |
| Media | Cloudinary |
| Deployment | Vercel (frontend) + Railway (backend) |
| CMS | Django Admin |
