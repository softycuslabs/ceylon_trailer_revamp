# Ceylon Trailer — Website Deployment Guide

> Full-stack deployment: Next.js 14 (Frontend) + Django REST Framework (Backend) + PostgreSQL

---

## Global Variables — Change These Before You Start

> Update this table first. Then use these values wherever you see `YOUR_DOMAIN`, `YOUR_SERVER_IP`, `YOUR_REPO` in the commands below.

| Variable | Current Value | Final Value |
|----------|--------------|-------------|
| `YOUR_DOMAIN` | `test.ceylontrailer.com` | `ceylontrailer.com` |
| `YOUR_SERVER_IP` | *(get from Contabo welcome email)* | e.g. `123.456.789.0` |
| `YOUR_REPO` | `ceylon_trailer_revamp` | `ceylon_trailer_revamp` |
| `YOUR_DB_PASSWORD` | *(choose a strong password)* | e.g. `Str0ng!Pass#2024` |

**When client approves and you switch to the live domain:**
1. Update `YOUR_DOMAIN` in this table to `ceylontrailer.com`
2. Update `.env` on the server: change `ALLOWED_HOSTS` and `CORS_ALLOWED_ORIGINS`
3. Update `frontend/.env.local`: change `NEXT_PUBLIC_API_URL`
4. Update Cloudflare DNS: point the new domain to the same server IP
5. Rebuild frontend: `npm run build && pm2 restart ceylon-frontend`
6. Restart backend: `sudo systemctl restart gunicorn`

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Minimum Requirements](#2-minimum-requirements)
3. [Recommended Server Options](#3-recommended-server-options)
4. [Pre-Deployment Checklist](#4-pre-deployment-checklist)
5. [Option A — Deploy with Vercel + Railway](#5-option-a--deploy-with-vercel--railway)
6. [Option B — Deploy with a VPS (e.g. DigitalOcean, AWS EC2)](#6-option-b--deploy-with-a-vps-eg-digitalocean-aws-ec2)
7. [Option C — Deploy with Docker on a VPS](#7-option-c--deploy-with-docker-on-a-vps)
8. [Option D — Contabo VPS + Cloudflare ⭐ Recommended for Low Budget](#8-option-d--contabo-vps--cloudflare--recommended-for-low-budget)
9. [Environment Variables Reference](#9-environment-variables-reference)
10. [Post-Deployment Steps](#10-post-deployment-steps)
11. [Domain & SSL Setup](#11-domain--ssl-setup)
12. [Ongoing Maintenance](#12-ongoing-maintenance)

---

## 1. Architecture Overview

### Option A — Vercel + Railway (Managed Cloud)
```
┌─────────────────────────────────────────────────────────────┐
│                        USERS (Browser)                      │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS
          ┌────────────────▼────────────────┐
          │     Frontend — Next.js 14        │
          │         (Vercel)                 │
          └────────────────┬────────────────┘
                           │ REST API calls (Axios)
          ┌────────────────▼────────────────┐
          │   Backend — Django + Gunicorn    │
          │         (Railway)                │
          └────┬──────────────────┬──────────┘
               │                  │
   ┌───────────▼──────┐  ┌───────▼──────────┐
   │   PostgreSQL DB  │  │    Cloudinary     │
   │    (Railway)     │  │  (Image Storage)  │
   └──────────────────┘  └──────────────────┘
```

### Option D — Contabo VPS + Cloudflare (Recommended for Low Budget)
```
┌─────────────────────────────────────────────────────────────┐
│                        USERS (Browser)                      │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS
          ┌────────────────▼────────────────┐
          │        Cloudflare (Free)         │
          │   CDN · SSL · DDoS Protection    │
          └────────────────┬────────────────┘
                           │ Proxied to origin
          ┌────────────────▼────────────────────────────────┐
          │              Contabo VPS ($3.96/mo)              │
          │                                                  │
          │  ┌──────────┐  ┌─────────────┐  ┌───────────┐  │
          │  │  Nginx   │  │  Next.js 14 │  │  Django + │  │
          │  │ (proxy + │─▶│  Port 3000  │  │  Gunicorn │  │
          │  │  media)  │  └─────────────┘  │  Port 8000│  │
          │  └──────────┘                   └─────┬─────┘  │
          │                                        │        │
          │  ┌─────────────────┐  ┌───────────────▼──────┐ │
          │  │  /media/images  │  │  PostgreSQL DB        │ │
          │  │  (local disk)   │  │  Port 5432            │ │
          │  └─────────────────┘  └──────────────────────┘ │
          └──────────────────────────────────────────────────┘
```

---

## 2. Minimum Requirements

### Frontend (Next.js)

| Resource | Minimum | Recommended |
|----------|---------|-------------|
| Node.js  | 18.x    | 20.x LTS    |
| RAM      | 512 MB  | 1 GB        |
| CPU      | 1 vCPU  | 1–2 vCPU    |
| Disk     | 1 GB    | 5 GB        |

### Backend (Django + Gunicorn)

| Resource | Minimum | Recommended |
|----------|---------|-------------|
| Python   | 3.11.7  | 3.11.7      |
| RAM      | 512 MB  | 1–2 GB      |
| CPU      | 1 vCPU  | 1–2 vCPU    |
| Disk     | 2 GB    | 10 GB       |

### Database (PostgreSQL)

| Resource | Minimum | Recommended |
|----------|---------|-------------|
| Version  | 14      | 15          |
| RAM      | 256 MB  | 1 GB        |
| Disk     | 2 GB    | 20 GB       |

### External Services

| Service      | Purpose              | Required for      | Free Tier |
|--------------|----------------------|-------------------|-----------|
| Cloudinary   | Image/media storage  | Option A, B, C    | Yes (25GB)|
| Cloudflare   | CDN, SSL, DDoS       | Option D          | Yes       |
| Domain name  | Custom URL           | All options       | Paid only |
| SSL cert     | HTTPS (Let's Encrypt)| Option B, C only  | Free      |

> Option D (Contabo + Cloudflare) stores images locally on the server — no Cloudinary needed.

---

## 3. Recommended Server Options

| Option | Setup | Provider | Cost/month | Images | Best For |
|--------|-------|----------|------------|--------|----------|
| **D** ⭐ | Contabo VPS + Cloudflare | Contabo | **~$4** | Local disk | Low budget, full control |
| **A** | Vercel + Railway | Cloud managed | ~$10 | Cloudinary | Zero server management |
| **B** | VPS manual | DigitalOcean/AWS | ~$12–24 | Cloudinary | More control, higher cost |
| **C** | Docker on VPS | Any VPS | ~$12–24 | Cloudinary | Docker-preferred workflow |

---

### Option D — Contabo Cloud VPS 10 + Cloudflare ⭐ Recommended

| Component  | What it does               | Cost           |
|------------|----------------------------|----------------|
| Contabo VPS 10 | Hosts everything (frontend, backend, DB, images) | $3.96/month |
| Cloudflare Free | SSL, CDN, DDoS protection, DNS | $0 |
| Domain name | Your custom URL | ~$10–15/year |
| **Total** | | **~$4/month** |

**Specs:** 4 vCPU · 8 GB RAM · 75 GB NVMe · Unlimited traffic · 200 Mbit/s port

**Pros:** Cheapest option, 8 GB RAM is massive headroom, no external image service needed, Cloudflare compensates for network speed
**Cons:** You manage the server, Contabo network is slower than premium providers (mitigated by Cloudflare caching)

---

### Option A — Vercel + Railway

| Component  | Platform | Cost           |
|------------|----------|----------------|
| Frontend   | Vercel   | Free (Hobby)   |
| Backend    | Railway  | ~$5/month      |
| Database   | Railway  | ~$5/month      |

**Pros:** Zero server management, auto SSL, auto scaling, GitHub integration
**Cons:** Less control, Railway free tier has usage limits, requires Cloudinary for images

---

### Option B — DigitalOcean Droplet (VPS)

| Droplet Type  | RAM  | CPU    | Cost/month | Use case         |
|---------------|------|--------|------------|------------------|
| Basic (2 GB)  | 2 GB | 1 vCPU | $12        | Small production |
| Basic (4 GB)  | 4 GB | 2 vCPU | $24        | Recommended prod |

**Pros:** Better network than Contabo, full control, easy setup
**Cons:** More expensive, requires Cloudinary for images

---

### Option C — AWS / Google Cloud

| Service        | Platform | Cost estimate  |
|----------------|----------|----------------|
| EC2 t3.small   | AWS      | ~$15/month     |
| Cloud Run      | GCP      | Pay per use    |

**Pros:** Enterprise-grade reliability, global CDN
**Cons:** Complex setup, highest cost, steep learning curve

---

## 4. Pre-Deployment Checklist

Before deploying, complete each step locally:

### Code Preparation

- [ ] All features tested locally and working
- [ ] No console errors in browser
- [ ] `npm run build` completes without errors (run inside `frontend/`)
- [ ] Django `python manage.py check --deploy` passes (run inside `backend/`)
- [ ] All secrets removed from code (no hardcoded API keys)
- [ ] `.env` files are in `.gitignore` (never commit secrets)

### Accounts to Create

**Option D (Contabo + Cloudflare):**
- [ ] [Contabo](https://contabo.com) account — purchase Cloud VPS 10
- [ ] [Cloudflare](https://cloudflare.com) account — free plan is enough
- [ ] Domain registrar account — or use Cloudflare Registrar (cheapest, at-cost pricing)

**Option A (Vercel + Railway):**
- [ ] [Cloudinary](https://cloudinary.com) account — for image hosting
- [ ] [Vercel](https://vercel.com) account — for frontend
- [ ] [Railway](https://railway.app) account — for backend
- [ ] Domain registrar account

### Gather These Values Before Starting

- Django `SECRET_KEY` (generate a new one for production — never reuse dev key)
- Your domain name (e.g. `YOUR_DOMAIN`)
- PostgreSQL database credentials (you will create these during setup)
- Cloudinary credentials (Option A/B/C only)

**Generate a new Django SECRET_KEY:**
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

---

## 5. Option A — Deploy with Vercel + Railway

### Step 1 — Push Code to GitHub

1. Create a GitHub repository (public or private)
2. Push your project:
```bash
cd /path/to/ceylon_trailer_revamp
git init   # skip if already a repo
git add .
git commit -m "Initial commit for deployment"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

---

### Step 2 — Set Up Cloudinary

1. Log in to [cloudinary.com](https://cloudinary.com)
2. Go to **Dashboard** → note your:
   - Cloud Name
   - API Key
   - API Secret
3. These will be used in the backend environment variables

---

### Step 3 — Deploy Backend to Railway

1. Go to [railway.app](https://railway.app) → **New Project**
2. Click **Deploy from GitHub repo** → select your repository
3. Set the **Root Directory** to `backend`
4. Add a **PostgreSQL** plugin:
   - Click **+ New** → **Database** → **PostgreSQL**
   - Railway will auto-set `DATABASE_URL`
5. Go to **Variables** tab and add all backend environment variables:

```env
DJANGO_SETTINGS_MODULE=ceylon_trailer.settings.production
SECRET_KEY=your-generated-secret-key
DEBUG=False
ALLOWED_HOSTS=your-railway-domain.up.railway.app,YOUR_DOMAIN
DATABASE_URL=postgresql://...  (auto-filled by Railway)

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CORS_ALLOWED_ORIGINS=https://YOUR_DOMAIN,https://your-vercel-app.vercel.app
```

6. Railway will auto-detect the `Procfile` and start Gunicorn
7. After deploy, note your Railway backend URL (e.g. `https://dmprabath-trailer.up.railway.app`)

---

### Step 4 — Run Django Migrations on Railway

In Railway dashboard → your backend service → **Shell** tab:
```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py collectstatic --noinput
```

---

### Step 5 — Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repository
3. Set **Root Directory** to `frontend`
4. Vercel auto-detects Next.js — no build config needed
5. Add environment variables:

```env
NEXT_PUBLIC_API_URL=https://dmprabath-trailer.up.railway.app/api
```

6. Click **Deploy**
7. Note your Vercel URL (e.g. `https://dmprabath-trailer.vercel.app`)

---

### Step 6 — Update Backend CORS

Go back to Railway → backend service → Variables and update:
```env
CORS_ALLOWED_ORIGINS=https://YOUR_DOMAIN,https://dmprabath-trailer.vercel.app
```

Redeploy the backend.

---

## 6. Option B — Deploy with a VPS (e.g. DigitalOcean, AWS EC2)

### Step 1 — Create a Server

1. Create a Ubuntu 22.04 LTS Droplet (minimum 2 GB RAM recommended)
2. Add your SSH key during creation
3. Connect to server:
```bash
ssh root@YOUR_SERVER_IP
```

---

### Step 2 — Initial Server Setup

```bash
# Update system
apt update && apt upgrade -y

# Install required packages
apt install -y python3.11 python3.11-venv python3-pip \
               nginx postgresql postgresql-contrib \
               nodejs npm git curl

# Install Node 20 (if not latest)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install PM2 for Next.js process management
npm install -g pm2

# Create a non-root user
adduser dmprabath
usermod -aG sudo dmprabath
su - dmprabath
```

---

### Step 3 — Set Up PostgreSQL

```bash
sudo -u postgres psql

# In the psql shell:
CREATE DATABASE ceylon_trailer_db;
CREATE USER dmprabath_user WITH PASSWORD 'your_strong_password';
ALTER ROLE dmprabath_user SET client_encoding TO 'utf8';
ALTER ROLE dmprabath_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE dmprabath_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE ceylon_trailer_db TO dmprabath_user;
\q
```

---

### Step 4 — Deploy the Backend (Django)

```bash
# Clone the repository
cd /home/dmprabath
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO/backend

# Create and activate virtual environment
python3.11 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create production .env file
nano .env
```

Add to `.env`:
```env
DJANGO_SETTINGS_MODULE=ceylon_trailer.settings.production
SECRET_KEY=your-generated-secret-key
DEBUG=False
ALLOWED_HOSTS=YOUR_DOMAIN,www.YOUR_DOMAIN,YOUR_SERVER_IP
DATABASE_URL=postgresql://dmprabath_user:your_strong_password@localhost:5432/ceylon_trailer_db
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CORS_ALLOWED_ORIGINS=https://YOUR_DOMAIN,https://www.YOUR_DOMAIN
```

```bash
# Run migrations and collect static files
python manage.py migrate
python manage.py createsuperuser
python manage.py collectstatic --noinput

# Test Gunicorn works
gunicorn ceylon_trailer.wsgi:application --bind 0.0.0.0:8000

# Create a systemd service for Gunicorn
sudo nano /etc/systemd/system/gunicorn.service
```

Paste into the service file:
```ini
[Unit]
Description=Gunicorn daemon for Ceylon Trailer
After=network.target

[Service]
User=dmprabath
Group=www-data
WorkingDirectory=/home/dmprabath/YOUR_REPO/backend
ExecStart=/home/dmprabath/YOUR_REPO/backend/venv/bin/gunicorn \
          --workers 3 \
          --bind unix:/home/dmprabath/gunicorn.sock \
          ceylon_trailer.wsgi:application
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable gunicorn
sudo systemctl start gunicorn
sudo systemctl status gunicorn   # Should show "active (running)"
```

---

### Step 5 — Deploy the Frontend (Next.js)

```bash
cd /home/dmprabath/YOUR_REPO/frontend

# Create .env.local
nano .env.local
```

Add:
```env
NEXT_PUBLIC_API_URL=https://YOUR_DOMAIN/api
NEXT_PUBLIC_WHATSAPP_NUMBER=94770045488
NEXT_PUBLIC_SITE_URL=https://YOUR_DOMAIN

# Demo mode — set to true until the backend database is seeded with real data.
# Set to false (and rebuild) once destinations are added via the Django admin dashboard.
USE_DEMO_DATA=true

# hCaptcha (replace with real keys from hcaptcha.com)
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=your_hcaptcha_site_key
HCAPTCHA_SECRET=your_hcaptcha_secret_key

# Contact form email notification
NOTIFY_EMAIL=admin@ceylontrailer.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-16-char-app-password
```

> **Important:** `USE_DEMO_DATA=true` is required while the Django backend database has no destinations yet.
> Once you add destinations via the admin dashboard, change this to `false` and run `npm run build && pm2 restart dmprabath-frontend`.

```bash
# Install dependencies and build
npm install
npm run build

# Start with PM2
pm2 start npm --name "dmprabath-frontend" -- start
pm2 save
pm2 startup   # Follow the command it gives you
```

---

### Step 6 — Configure Nginx as Reverse Proxy

```bash
sudo nano /etc/nginx/sites-available/dmprabathtrailer
```

Paste:
```nginx
server {
    server_name YOUR_DOMAIN www.YOUR_DOMAIN;

    # Frontend (Next.js)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API (Django)
    location /api/ {
        include proxy_params;
        proxy_pass http://unix:/home/dmprabath/gunicorn.sock;
    }

    # Django Admin
    location /admin/ {
        include proxy_params;
        proxy_pass http://unix:/home/dmprabath/gunicorn.sock;
    }

    # Django static files
    location /static/ {
        alias /home/dmprabath/YOUR_REPO/backend/staticfiles/;
    }

    listen 80;
}
```

```bash
sudo ln -s /etc/nginx/sites-available/dmprabathtrailer /etc/nginx/sites-enabled/
sudo nginx -t        # Test config — should say "ok"
sudo systemctl restart nginx
```

---

## 7. Option C — Deploy with Docker on a VPS

If you prefer Docker (already configured in the project):

### Step 1 — Install Docker on your VPS

```bash
curl -fsSL https://get.docker.com | bash
apt install -y docker-compose-plugin
```

### Step 2 — Clone and Configure

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

# Create production environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# Edit both files with production values
nano backend/.env
nano frontend/.env.local
```

### Step 3 — Build and Run

```bash
docker compose up -d --build

# Run migrations
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py createsuperuser
docker compose exec backend python manage.py collectstatic --noinput
```

### Step 4 — Set Up Nginx + SSL (same as Option B Step 6 + Step from Section 10)

---

## 8. Option D — Contabo VPS + Cloudflare ⭐ Recommended for Low Budget

Everything (frontend, backend, database, images) runs on **one single server**.
Cloudflare sits in front handling SSL, CDN and DDoS — for free.

**Cost: ~$3.96/month + ~$10/year domain**

---

### Step 1 — Purchase Contabo Cloud VPS 10

1. Go to [contabo.com](https://contabo.com) → **Cloud VPS** → select **Cloud VPS 10**
2. Choose:
   - **Region:** Europe (Germany) — best for global latency with Cloudflare
   - **OS:** Ubuntu 22.04 LTS
   - **Storage:** 75 GB NVMe (faster) over 150 GB SSD
   - **Term:** 12 months (cheapest rate)
3. Complete purchase — you will receive an email with your server IP and root password

---

### Step 2 — Connect to Your Server

```bash
ssh root@YOUR_SERVER_IP
# Enter the root password from the Contabo welcome email
```

Set a new root password immediately:
```bash
passwd
```

---

### Step 3 — Initial Server Setup

```bash
# Update system packages
apt update && apt upgrade -y

# Install all required software in one command
apt install -y python3.11 python3.11-venv python3-pip \
               nginx postgresql postgresql-contrib \
               git curl ufw

# Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install PM2 — keeps Next.js running after server reboot
npm install -g pm2

# Create a non-root user for security
adduser dmprabath
usermod -aG sudo dmprabath
```

---

### Step 4 — Configure Firewall

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
ufw status   # Should show SSH and Nginx allowed
```

---

### Step 5 — Set Up PostgreSQL Database

```bash
sudo -u postgres psql
```

Inside the PostgreSQL shell:
```sql
CREATE DATABASE ceylon_trailer_db;
CREATE USER dmprabath_user WITH PASSWORD 'use_a_strong_password_here';
ALTER ROLE dmprabath_user SET client_encoding TO 'utf8';
ALTER ROLE dmprabath_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE dmprabath_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE ceylon_trailer_db TO dmprabath_user;
\q
```

---

### Step 6 — Deploy the Backend (Django)

```bash
su - dmprabath
cd /home/dmprabath
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO/backend

# Set up Python virtual environment
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Create the production environment file
nano .env
```

Add the following to `.env`:
```env
DJANGO_SETTINGS_MODULE=ceylon_trailer.settings.production
SECRET_KEY=your-generated-secret-key
DEBUG=False
ALLOWED_HOSTS=YOUR_DOMAIN,www.YOUR_DOMAIN,YOUR_SERVER_IP
DATABASE_URL=postgresql://dmprabath_user:use_a_strong_password_here@localhost:5432/ceylon_trailer_db
CORS_ALLOWED_ORIGINS=https://YOUR_DOMAIN,https://www.YOUR_DOMAIN

# No Cloudinary needed — images stored locally
MEDIA_ROOT=/home/dmprabath/YOUR_REPO/backend/media
MEDIA_URL=/media/
```

```bash
# Apply database migrations
python manage.py migrate

# Create your admin account
python manage.py createsuperuser

# Collect static files for Nginx to serve
python manage.py collectstatic --noinput

# Test Gunicorn starts correctly (Ctrl+C to stop after testing)
gunicorn ceylon_trailer.wsgi:application --bind 0.0.0.0:8000
```

Create a systemd service so Gunicorn runs automatically:
```bash
sudo nano /etc/systemd/system/gunicorn.service
```

Paste:
```ini
[Unit]
Description=Gunicorn daemon for Ceylon Trailer
After=network.target

[Service]
User=dmprabath
Group=www-data
WorkingDirectory=/home/dmprabath/YOUR_REPO/backend
ExecStart=/home/dmprabath/YOUR_REPO/backend/venv/bin/gunicorn \
          --workers 3 \
          --bind unix:/home/dmprabath/gunicorn.sock \
          ceylon_trailer.wsgi:application
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable gunicorn
sudo systemctl start gunicorn
sudo systemctl status gunicorn   # Must show: active (running)
```

---

### Step 7 — Deploy the Frontend (Next.js)

```bash
cd /home/dmprabath/YOUR_REPO/frontend

# Create environment file
nano .env.local
```

Add:
```env
NEXT_PUBLIC_API_URL=https://YOUR_DOMAIN/api
NEXT_PUBLIC_WHATSAPP_NUMBER=94770045488
NEXT_PUBLIC_SITE_URL=https://YOUR_DOMAIN

# Set to true until the Django admin database is seeded with real destinations.
# Change to false and rebuild once data is added via the admin dashboard.
USE_DEMO_DATA=true

# hCaptcha (replace with real keys from hcaptcha.com)
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=your_hcaptcha_site_key
HCAPTCHA_SECRET=your_hcaptcha_secret_key

# Contact form email notification
NOTIFY_EMAIL=admin@ceylontrailer.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-16-char-app-password
```

```bash
# Install dependencies and build for production
npm install
npm run build

# Start with PM2 (keeps running after reboot)
pm2 start npm --name "dmprabath-frontend" -- start
pm2 save
pm2 startup   # Copy and run the command it outputs
```

---

### Step 8 — Configure Nginx

Nginx acts as the gateway — routing traffic to Next.js or Django, and serving uploaded images directly from disk.

```bash
sudo nano /etc/nginx/sites-available/dmprabathtrailer
```

Paste:
```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN www.YOUR_DOMAIN;

    # Increase upload limit for image uploads via Django Admin
    client_max_body_size 20M;

    # Frontend — Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API — Django
    location /api/ {
        include proxy_params;
        proxy_pass http://unix:/home/dmprabath/gunicorn.sock;
    }

    # Django Admin panel
    location /admin/ {
        include proxy_params;
        proxy_pass http://unix:/home/dmprabath/gunicorn.sock;
    }

    # Django collected static files (CSS, JS for admin panel)
    location /static/ {
        alias /home/dmprabath/YOUR_REPO/backend/staticfiles/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # User-uploaded media files (destination photos, gallery, etc.)
    # Nginx serves these directly — fast and efficient
    location /media/ {
        alias /home/dmprabath/YOUR_REPO/backend/media/;
        expires 7d;
        add_header Cache-Control "public";
    }
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/dmprabathtrailer /etc/nginx/sites-enabled/
sudo nginx -t                    # Must say: syntax is ok
sudo systemctl restart nginx
```

---

### Step 9 — Set Up Cloudflare (SSL + CDN)

Cloudflare replaces Let's Encrypt — no certbot needed.

1. Go to [cloudflare.com](https://cloudflare.com) → **Add a Site** → enter `YOUR_DOMAIN`
2. Select the **Free plan**
3. Cloudflare will scan your DNS — add/confirm these records:

| Type | Name | Value | Proxy |
|------|------|-------|-------|
| A | @ | YOUR_SERVER_IP | Proxied (orange cloud) |
| A | www | YOUR_SERVER_IP | Proxied (orange cloud) |

4. Cloudflare will give you **2 nameservers** (e.g. `art.ns.cloudflare.com`)
5. Log in to your domain registrar → replace existing nameservers with Cloudflare's two
6. Wait 10–30 minutes for DNS to propagate

**Configure SSL in Cloudflare:**
- Go to **SSL/TLS** → set mode to **Full** (not Full Strict)
- Go to **SSL/TLS** → **Edge Certificates** → enable **Always Use HTTPS**

**Configure Caching for Images:**
- Go to **Caching** → **Cache Rules** → add rule:
  - When: `URI path matches *.jpg OR *.jpeg OR *.png OR *.webp`
  - Cache: **Cache Everything** · Edge TTL: **1 month**

Your site is now live at `https://YOUR_DOMAIN` with:
- Free SSL (auto-renewed by Cloudflare)
- Global CDN (images cached at 300+ edge locations)
- DDoS protection

---

### Step 10 — Create Media Upload Directory

Make sure the media folder exists and has correct permissions:
```bash
mkdir -p /home/dmprabath/YOUR_REPO/backend/media
sudo chown -R dmprabath:www-data /home/dmprabath/YOUR_REPO/backend/media
sudo chmod -R 775 /home/dmprabath/YOUR_REPO/backend/media
```

---

### Step 11 — Verify Everything Works

```bash
# Check all services are running
sudo systemctl status nginx       # active (running)
sudo systemctl status gunicorn    # active (running)
pm2 status                        # dmprabath-frontend: online

# Test API responds
curl http://localhost/api/destinations/
# Should return: [] or destination data

# Check disk usage
df -h
# Verify 75 GB NVMe is available
```

Visit `https://YOUR_DOMAIN` — the site should load with HTTPS.
Visit `https://YOUR_DOMAIN/admin` — Django admin should load.

---

### Contabo + Cloudflare Resource Usage at Launch

```
Available on Contabo VPS 10:
  RAM:     8,000 MB
  Storage: 75,000 MB (75 GB)

Used by your stack:
  OS + system:     ~300 MB RAM   ~2 GB disk
  Nginx:           ~50 MB RAM    ~10 MB disk
  Next.js:         ~300 MB RAM   ~500 MB disk
  Django+Gunicorn: ~200 MB RAM   ~200 MB disk
  PostgreSQL:      ~200 MB RAM   ~500 MB disk
  ─────────────────────────────────────────
  Total used:      ~1,050 MB RAM ~3.2 GB disk

Remaining headroom:
  RAM:     ~6,950 MB free (87% remaining)
  Storage: ~72 GB free (for images and future growth)
```

---

## 9. Environment Variables Reference

### Backend (`backend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `DJANGO_SETTINGS_MODULE` | Settings file to use | `ceylon_trailer.settings.production` |
| `SECRET_KEY` | Django secret key | `django-insecure-...` (generate new) |
| `DEBUG` | Debug mode | `False` (always False in production) |
| `ALLOWED_HOSTS` | Allowed domain names | `YOUR_DOMAIN,www.YOUR_DOMAIN` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `my_cloud` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789` |
| `CLOUDINARY_API_SECRET` | Cloudinary secret | `abc123...` |
| `CORS_ALLOWED_ORIGINS` | Frontend URLs allowed to call API | `https://YOUR_DOMAIN` |

### Frontend (`frontend/.env.local`)

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `https://YOUR_DOMAIN/api` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp contact number | `94770045488` |
| `NEXT_PUBLIC_SITE_URL` | Public site URL | `https://YOUR_DOMAIN` |
| `USE_DEMO_DATA` | Use local demo destinations (server-only) | `true` until DB is seeded, then `false` |
| `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` | hCaptcha public site key | from hcaptcha.com |
| `HCAPTCHA_SECRET` | hCaptcha secret key (server-only) | from hcaptcha.com |
| `NOTIFY_EMAIL` | Email to receive contact form submissions (server-only) | `admin@ceylontrailer.com` |
| `SMTP_HOST` | SMTP server host (server-only) | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port (server-only) | `587` |
| `SMTP_SECURE` | Use TLS (server-only) | `false` for port 587 |
| `SMTP_USER` | SMTP login email (server-only) | `your@gmail.com` |
| `SMTP_PASS` | Gmail App Password (server-only) | 16-char app password |

---

## 10. Post-Deployment Steps

After the site is live, do these immediately:

### Django Admin Setup
1. Visit `https://YOUR_DOMAIN/admin`
2. Log in with the superuser credentials you created
3. Add your destinations, trips, gallery images, and blog posts

### Verify API is Working
```bash
curl https://YOUR_DOMAIN/api/destinations/
# Should return JSON data (empty list [] is fine initially)
```

### Verify Frontend is Working
- Visit your domain and check all pages load
- Test the contact/inquiry form
- Verify images load (from Cloudinary or local /media/ depending on your option)
- Test the interactive Sri Lanka map

### Security Checks
- [ ] `DEBUG=False` in production
- [ ] `SECRET_KEY` is unique and not shared
- [ ] Database is not publicly accessible
- [ ] Django admin URL is accessible only to you
- [ ] HTTPS is enforced (HTTP redirects to HTTPS)

---

## 11. Domain & SSL Setup

### Point Your Domain to the Server

In your domain registrar's DNS settings, add:

| Type | Name | Value |
|------|------|-------|
| A    | @    | YOUR_SERVER_IP |
| A    | www  | YOUR_SERVER_IP |

DNS changes take 10 minutes to 48 hours to propagate.

### Install Free SSL with Let's Encrypt (Option B/C only)

```bash
sudo apt install -y certbot python3-certbot-nginx

# Get certificate (replace with your domain)
sudo certbot --nginx -d YOUR_DOMAIN -d www.YOUR_DOMAIN

# Follow the prompts. Certbot will automatically:
# - Get a free SSL certificate
# - Update your Nginx config to use HTTPS
# - Set up auto-renewal

# Verify auto-renewal works
sudo certbot renew --dry-run
```

For **Vercel** (Option A): SSL is automatic — no action needed.
For **Contabo + Cloudflare** (Option D): SSL is handled by Cloudflare — no certbot needed. See Option D Step 9.

---

## 12. Ongoing Maintenance

### Deploying Code Updates

**Vercel + Railway (Option A):**
```bash
git push origin main
# Vercel and Railway auto-deploy on push
```

**VPS — Option B/C/D (Contabo or any VPS):**
```bash
cd /home/dmprabath/YOUR_REPO
git pull origin main

# Backend update
cd backend
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
sudo systemctl restart gunicorn

# Frontend update
cd ../frontend
npm install
npm run build
pm2 restart dmprabath-frontend
```

### Database Backups

```bash
# Create a backup
pg_dump ceylon_trailer_db > backup_$(date +%Y%m%d).sql

# Restore a backup
psql ceylon_trailer_db < backup_20240101.sql
```

Automate daily backups with a cron job:
```bash
crontab -e
# Add this line (runs every day at 2 AM):
0 2 * * * pg_dump ceylon_trailer_db > /home/dmprabath/backups/backup_$(date +\%Y\%m\%d).sql
```

### Monitoring

- Check server health: `htop` or `df -h`
- Check Gunicorn logs: `sudo journalctl -u gunicorn -f`
- Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
- Check Next.js logs: `pm2 logs dmprabath-frontend`

---

## Quick Decision Guide

```
What is your priority?
│
├─ Lowest cost + full control
│  └─ Option D ⭐ — Contabo VPS 10 + Cloudflare Free (~$4/month)
│     Images stored locally on server. Best value for a new travel website.
│
├─ Zero server management (someone else handles the infrastructure)
│  └─ Option A — Vercel + Railway (~$10/month)
│     Requires Cloudinary for images. Auto-deploy from GitHub.
│
├─ Full control + better network than Contabo
│  └─ Option B — DigitalOcean/Hetzner VPS (~$12-24/month)
│     Requires Cloudinary for images. Faster network than Contabo.
│
└─ Full control + Docker workflow
   └─ Option C — Docker on any VPS (~$12-24/month)
      Docker Compose manages all services together.
```

---

*Document generated for Ceylon Trailer Revamp project*
*Stack: Next.js 14 · Django 4.2 · PostgreSQL 15 · Local Image Storage (Option D) / Cloudinary (Options A-C) · Cloudflare CDN*
