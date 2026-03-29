# Ceylon Trailer — Website Deployment Guide

> Full-stack deployment: Next.js 14 (Frontend) + Django REST Framework (Backend) + PostgreSQL

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Minimum Requirements](#2-minimum-requirements)
3. [Recommended Server Options](#3-recommended-server-options)
4. [Pre-Deployment Checklist](#4-pre-deployment-checklist)
5. [Option A — Deploy with Vercel + Railway (Recommended)](#5-option-a--deploy-with-vercel--railway-recommended)
6. [Option B — Deploy with a VPS (e.g. DigitalOcean, AWS EC2)](#6-option-b--deploy-with-a-vps-eg-digitalocean-aws-ec2)
7. [Option C — Deploy with Docker on a VPS](#7-option-c--deploy-with-docker-on-a-vps)
8. [Environment Variables Reference](#8-environment-variables-reference)
9. [Post-Deployment Steps](#9-post-deployment-steps)
10. [Domain & SSL Setup](#10-domain--ssl-setup)
11. [Ongoing Maintenance](#11-ongoing-maintenance)

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        USERS (Browser)                      │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS
          ┌────────────────▼────────────────┐
          │     Frontend — Next.js 14        │
          │  (Vercel / Node.js server)       │
          │  Port: 3000                      │
          └────────────────┬────────────────┘
                           │ REST API calls (Axios)
          ┌────────────────▼────────────────┐
          │   Backend — Django + Gunicorn    │
          │  (Railway / VPS)                 │
          │  Port: 8000                      │
          └────┬──────────────────┬──────────┘
               │                  │
   ┌───────────▼──────┐  ┌───────▼──────────┐
   │   PostgreSQL DB  │  │    Cloudinary     │
   │   Port: 5432     │  │  (Image Storage)  │
   └──────────────────┘  └──────────────────┘
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

### External Services (Required)

| Service      | Purpose              | Free Tier |
|--------------|----------------------|-----------|
| Cloudinary   | Image/media storage  | Yes (25GB)|
| Domain name  | Custom URL           | Paid only |
| SSL cert     | HTTPS (Let's Encrypt)| Free      |

---

## 3. Recommended Server Options

### Option A — Vercel + Railway ⭐ (Best for beginners, lowest cost)

| Component  | Platform | Cost           |
|------------|----------|----------------|
| Frontend   | Vercel   | Free (Hobby)   |
| Backend    | Railway  | ~$5/month      |
| Database   | Railway  | ~$5/month      |

**Pros:** Zero server management, auto SSL, auto scaling, GitHub integration
**Cons:** Less control, Railway free tier has usage limits

---

### Option B — DigitalOcean Droplet (VPS)

| Droplet Type  | RAM  | CPU    | Cost/month | Use case         |
|---------------|------|--------|------------|------------------|
| Basic (1 GB)  | 1 GB | 1 vCPU | $6         | Dev/Testing only |
| Basic (2 GB)  | 2 GB | 1 vCPU | $12        | Small production |
| Basic (4 GB)  | 4 GB | 2 vCPU | $24        | Recommended prod |

**Pros:** Full control, predictable cost, easy setup
**Cons:** You manage server updates and security

---

### Option C — AWS / Google Cloud

| Service        | Platform | Cost estimate  |
|----------------|----------|----------------|
| EC2 t3.small   | AWS      | ~$15/month     |
| Cloud Run      | GCP      | Pay per use    |
| App Engine     | GCP      | ~$10-20/month  |

**Pros:** Enterprise-grade reliability, global CDN
**Cons:** Complex setup, higher cost, steep learning curve

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

- [ ] [Cloudinary](https://cloudinary.com) account — for image hosting
- [ ] [Vercel](https://vercel.com) account — for frontend (if using Option A)
- [ ] [Railway](https://railway.app) account — for backend (if using Option A)
- [ ] Domain registrar account (Namecheap, GoDaddy, Google Domains, etc.)

### Gather These Values Before Starting

- Cloudinary Cloud Name, API Key, API Secret
- Django `SECRET_KEY` (generate a new one for production)
- Your domain name (e.g. `ceylontrailer.com`)
- PostgreSQL database credentials

**Generate a new Django SECRET_KEY:**
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

---

## 5. Option A — Deploy with Vercel + Railway (Recommended)

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
ALLOWED_HOSTS=your-railway-domain.up.railway.app,ceylontrailer.com
DATABASE_URL=postgresql://...  (auto-filled by Railway)

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CORS_ALLOWED_ORIGINS=https://ceylontrailer.com,https://your-vercel-app.vercel.app
```

6. Railway will auto-detect the `Procfile` and start Gunicorn
7. After deploy, note your Railway backend URL (e.g. `https://ceylon-trailer.up.railway.app`)

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
NEXT_PUBLIC_API_URL=https://ceylon-trailer.up.railway.app/api
```

6. Click **Deploy**
7. Note your Vercel URL (e.g. `https://ceylon-trailer.vercel.app`)

---

### Step 6 — Update Backend CORS

Go back to Railway → backend service → Variables and update:
```env
CORS_ALLOWED_ORIGINS=https://ceylontrailer.com,https://ceylon-trailer.vercel.app
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
adduser ceylon
usermod -aG sudo ceylon
su - ceylon
```

---

### Step 3 — Set Up PostgreSQL

```bash
sudo -u postgres psql

# In the psql shell:
CREATE DATABASE ceylon_trailer_db;
CREATE USER ceylon_user WITH PASSWORD 'your_strong_password';
ALTER ROLE ceylon_user SET client_encoding TO 'utf8';
ALTER ROLE ceylon_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE ceylon_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE ceylon_trailer_db TO ceylon_user;
\q
```

---

### Step 4 — Deploy the Backend (Django)

```bash
# Clone the repository
cd /home/ceylon
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
ALLOWED_HOSTS=ceylontrailer.com,www.ceylontrailer.com,YOUR_SERVER_IP
DATABASE_URL=postgresql://ceylon_user:your_strong_password@localhost:5432/ceylon_trailer_db
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CORS_ALLOWED_ORIGINS=https://ceylontrailer.com,https://www.ceylontrailer.com
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
User=ceylon
Group=www-data
WorkingDirectory=/home/ceylon/YOUR_REPO/backend
ExecStart=/home/ceylon/YOUR_REPO/backend/venv/bin/gunicorn \
          --workers 3 \
          --bind unix:/home/ceylon/gunicorn.sock \
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
cd /home/ceylon/YOUR_REPO/frontend

# Create .env.local
nano .env.local
```

Add:
```env
NEXT_PUBLIC_API_URL=https://ceylontrailer.com/api
```

```bash
# Install dependencies and build
npm install
npm run build

# Start with PM2
pm2 start npm --name "ceylon-frontend" -- start
pm2 save
pm2 startup   # Follow the command it gives you
```

---

### Step 6 — Configure Nginx as Reverse Proxy

```bash
sudo nano /etc/nginx/sites-available/ceylontrailer
```

Paste:
```nginx
server {
    server_name ceylontrailer.com www.ceylontrailer.com;

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
        proxy_pass http://unix:/home/ceylon/gunicorn.sock;
    }

    # Django Admin
    location /admin/ {
        include proxy_params;
        proxy_pass http://unix:/home/ceylon/gunicorn.sock;
    }

    # Django static files
    location /static/ {
        alias /home/ceylon/YOUR_REPO/backend/staticfiles/;
    }

    listen 80;
}
```

```bash
sudo ln -s /etc/nginx/sites-available/ceylontrailer /etc/nginx/sites-enabled/
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

## 8. Environment Variables Reference

### Backend (`backend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `DJANGO_SETTINGS_MODULE` | Settings file to use | `ceylon_trailer.settings.production` |
| `SECRET_KEY` | Django secret key | `django-insecure-...` (generate new) |
| `DEBUG` | Debug mode | `False` (always False in production) |
| `ALLOWED_HOSTS` | Allowed domain names | `ceylontrailer.com,www.ceylontrailer.com` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `my_cloud` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789` |
| `CLOUDINARY_API_SECRET` | Cloudinary secret | `abc123...` |
| `CORS_ALLOWED_ORIGINS` | Frontend URLs allowed to call API | `https://ceylontrailer.com` |

### Frontend (`frontend/.env.local`)

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `https://ceylontrailer.com/api` |

---

## 9. Post-Deployment Steps

After the site is live, do these immediately:

### Django Admin Setup
1. Visit `https://ceylontrailer.com/admin`
2. Log in with the superuser credentials you created
3. Add your destinations, trips, gallery images, and blog posts

### Verify API is Working
```bash
curl https://ceylontrailer.com/api/destinations/
# Should return JSON data (empty list [] is fine initially)
```

### Verify Frontend is Working
- Visit your domain and check all pages load
- Test the contact/inquiry form
- Verify images load from Cloudinary
- Test the interactive Sri Lanka map

### Security Checks
- [ ] `DEBUG=False` in production
- [ ] `SECRET_KEY` is unique and not shared
- [ ] Database is not publicly accessible
- [ ] Django admin URL is accessible only to you
- [ ] HTTPS is enforced (HTTP redirects to HTTPS)

---

## 10. Domain & SSL Setup

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
sudo certbot --nginx -d ceylontrailer.com -d www.ceylontrailer.com

# Follow the prompts. Certbot will automatically:
# - Get a free SSL certificate
# - Update your Nginx config to use HTTPS
# - Set up auto-renewal

# Verify auto-renewal works
sudo certbot renew --dry-run
```

For **Vercel** (Option A): SSL is automatic — no action needed.

---

## 11. Ongoing Maintenance

### Deploying Code Updates

**Vercel + Railway (Option A):**
```bash
git push origin main
# Vercel and Railway auto-deploy on push
```

**VPS (Option B/C):**
```bash
cd /home/ceylon/YOUR_REPO
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
pm2 restart ceylon-frontend
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
0 2 * * * pg_dump ceylon_trailer_db > /home/ceylon/backups/backup_$(date +\%Y\%m\%d).sql
```

### Monitoring

- Check server health: `htop` or `df -h`
- Check Gunicorn logs: `sudo journalctl -u gunicorn -f`
- Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
- Check Next.js logs: `pm2 logs ceylon-frontend`

---

## Quick Decision Guide

```
Do you want zero server management?
├─ YES → Use Option A (Vercel + Railway) — ~$10/month
└─ NO  → Do you want full control?
         ├─ YES + prefer Docker → Use Option C (Docker on VPS) — ~$12-24/month
         └─ YES + prefer manual → Use Option B (VPS manual) — ~$12-24/month
```

---

*Document generated for Ceylon Trailer Revamp project*
*Stack: Next.js 14 · Django 4.2 · PostgreSQL 15 · Cloudinary · Docker*
