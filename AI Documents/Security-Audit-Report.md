# Ceylon Trailer — Full Security Audit Report

**Date:** 2026-05-09  
**Auditor:** Senior Full-Stack Security Engineer (Claude Code)  
**Scope:** React/Next.js Frontend, Django REST Framework Backend, Contact Form, hCaptcha, WhatsApp Integration, Email Handling, Dependencies, Infrastructure  
**Standard:** OWASP Top 10 (2021), NIST Secure Software Development Framework  
**Release Plan:** Frontend-only first release (Django backend comes later)

---

## Executive Summary

The Ceylon Trailer website is a Next.js 14 frontend with a Django 4.2 REST API backend. The frontend-first release uses demo data (no live backend). The site handles customer contact inquiries via a Next.js API route that verifies hCaptcha, rate-limits, sanitizes input, and sends email via SMTP — all without touching the Django backend.

**Original Score: 4.5 / 10 → Updated Score after code fixes: 6.5 / 10**

Three issues were **already fixed in code** during this audit session (marked ✅ FIXED). Two require **manual steps from you** (npm update, production env vars). The rest are backend-related and can wait until the Django release.

---

## FRONTEND LAUNCH GUIDE

> Follow this section top-to-bottom before you deploy. It covers everything you need to go live safely.

---

### STEP 1 — Update Critical Dependencies (15 minutes)

This is the most important step. Next.js 14.1.0 and Axios 1.6.5 have critical public vulnerabilities (SSRF, auth bypass). You must update before launch.

Open your terminal in the `frontend/` folder and run:

```bash
cd frontend

# Update to the latest safe versions
npm install next@latest axios@latest

# Fix all remaining auto-fixable vulnerabilities
npm audit fix

# Verify — should show 0 critical, 0 high
npm audit
```

> If `npm audit fix` alone does not clear all issues, run `npm audit` and check what remains. Anything listed as `critical` or `high` that affects your code must be updated manually.

---

### STEP 2 — Get Real hCaptcha Keys (10 minutes)

Your `.env.local` currently has **hCaptcha test keys** which always pass — they provide zero spam protection in production.

**Get your real keys:**

1. Go to [hcaptcha.com](https://www.hcaptcha.com) and sign up for a free account
2. Create a new site for your domain (e.g., `ceylontrailer.com`)
3. Copy your **Site Key** (public) and **Secret Key** (private)

**Set them in your production environment** (Vercel / your host):

| Variable Name | Value | Where it goes |
|---|---|---|
| `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` | Your hCaptcha site key | Vercel → Environment Variables |
| `HCAPTCHA_SECRET` | Your hCaptcha secret key | Vercel → Environment Variables (mark as Secret) |

> **Never put the real secret key in `.env.local` or commit it to Git.** Your `.gitignore` already excludes `.env.local` — this is correct.

---

### STEP 3 — Set All Production Environment Variables

In your hosting platform (Vercel, Netlify, etc.) set these environment variables for the **Production** environment:

```
# ── Site URL (your real domain) ──────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=https://ceylontrailer.com

# ── Demo mode: true = show demo data (no backend needed) ─────────────────────
NEXT_PUBLIC_USE_DEMO_DATA=true

# ── WhatsApp number (no spaces, with country code) ───────────────────────────
NEXT_PUBLIC_WHATSAPP_NUMBER=94770045488

# ── hCaptcha (replace with your real keys from Step 2) ───────────────────────
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=your_real_hcaptcha_site_key
HCAPTCHA_SECRET=your_real_hcaptcha_secret_key

# ── Email (who receives contact form submissions) ─────────────────────────────
NOTIFY_EMAIL=info@ceylontrailer.com

# ── Zoho Mail SMTP ────────────────────────────────────────────────────────────
SMTP_HOST=smtp.zoho.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yourdomain.com   # your full Zoho email address
SMTP_PASS=your-zoho-app-password      # App Password from Zoho (see Step 4)

# ── Backend API (not used yet — leave blank or set to your future backend URL) ─
# NEXT_PUBLIC_API_URL=https://api.ceylontrailer.com/api
# INTERNAL_API_URL=https://api.ceylontrailer.com/api
```

> **Important:** `NEXT_PUBLIC_USE_DEMO_DATA=true` means the site shows the demo destinations/trips data. When you launch the Django backend later, set this to `false` and add the API URL variables.

---

### STEP 4 — Zoho Mail App Password Setup (5 minutes)

The contact form sends emails via Zoho Mail SMTP. Zoho requires an **App Password** (not your regular Zoho login password) when Two-Factor Authentication is enabled.

**Create a Zoho App Password:**

1. Log in to [accounts.zoho.com](https://accounts.zoho.com)
2. Go to **Security** → **Two-Factor Authentication** → **App-Specific Passwords**
3. Click **Generate New Password** → name it `Ceylon Trailer`
4. Copy the generated password and set it as `SMTP_PASS` in your production environment

**Zoho SMTP settings to use:**

| Variable | Value |
|---|---|
| `SMTP_HOST` | `smtp.zoho.com` |
| `SMTP_PORT` | `587` |
| `SMTP_SECURE` | `false` (uses STARTTLS on port 587) |
| `SMTP_USER` | Your full Zoho email (e.g., `info@ceylontrailer.com`) |
| `SMTP_PASS` | The App Password generated above |

> **Note:** If your Zoho account is on a custom domain (e.g., `info@ceylontrailer.com`), use that address as `SMTP_USER` — not a `@zohomail.com` address.  
> If Two-Factor Authentication is **not** enabled on your Zoho account, you can use your regular Zoho password as `SMTP_PASS` — but enabling 2FA is strongly recommended.

**Test it locally before deploying:**
```bash
# Put real Zoho SMTP values in frontend/.env.local, then run:
cd frontend && npm run dev
# Submit the contact form and confirm you receive the email at NOTIFY_EMAIL
```

---

### STEP 5 — Verify Security Headers Are Active

After deploying, check your security headers at [securityheaders.com](https://securityheaders.com).

You should get **grade A or B**. The headers added in this audit session are:

| Header | Value |
|---|---|
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=()` |
| `Content-Security-Policy` | See `next.config.js` |

---

### STEP 6 — Test the Contact Form End-to-End

Before announcing the site publicly, test these scenarios:

- [ ] Submit the contact form without completing hCaptcha → should show "Please complete the CAPTCHA"
- [ ] Submit with all fields filled + hCaptcha → should show success toast + you receive the email
- [ ] Submit the form twice in quick succession → third attempt should be blocked (rate limit)
- [ ] Open a trip or destination page → InquiryForm should appear with hCaptcha widget
- [ ] Submit InquiryForm on a trip page → you should receive an email notification

---

### STEP 7 — Pre-Launch Final Checklist

```
Dependencies
[ ] npm install next@latest axios@latest && npm audit fix
[ ] npm audit shows 0 critical, 0 high (affecting your code)

Environment Variables (in your hosting platform)
[ ] NEXT_PUBLIC_SITE_URL = your real domain (https://...)
[ ] NEXT_PUBLIC_USE_DEMO_DATA = true
[ ] NEXT_PUBLIC_HCAPTCHA_SITE_KEY = real hCaptcha site key (not the test key)
[ ] HCAPTCHA_SECRET = real hCaptcha secret key (marked Secret in host)
[ ] NOTIFY_EMAIL = your email address
[ ] SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS = real SMTP credentials

Functionality
[ ] Contact form submits and you receive the email
[ ] InquiryForm on trip pages submits and you receive the email
[ ] hCaptcha widget appears on both forms
[ ] WhatsApp button opens correct chat
[ ] All demo destinations/trips/gallery load correctly
[ ] No browser console errors on any page

Security
[ ] securityheaders.com → grade A or B on your live domain
[ ] hcaptcha.com dashboard shows real traffic (not test key traffic)
[ ] HTTPS is active (Vercel/Netlify provide this automatically)
```

---

### WHEN DJANGO BACKEND IS READY (Phase 2)

When you deploy the Django backend later, do these additional steps:

```
[ ] Set NEXT_PUBLIC_USE_DEMO_DATA=false in Vercel
[ ] Set NEXT_PUBLIC_API_URL=https://api.ceylontrailer.com/api
[ ] Set INTERNAL_API_URL=https://api.ceylontrailer.com/api (server-to-server)
[ ] Set a strong, unique SECRET_KEY (generate with Django's get_random_secret_key())
[ ] Set DJANGO_SETTINGS_MODULE=ceylon_trailer.settings.production
[ ] Set ALLOWED_HOSTS=api.ceylontrailer.com
[ ] Set CORS_ALLOWED_ORIGINS=https://ceylontrailer.com
[ ] Run python manage.py check --deploy — fix every warning
[ ] Fix Gunicorn: add --workers 3 --timeout 30 --max-requests 1000
[ ] Change admin URL from /admin/ to something non-obvious (see V13 below)
[ ] Install django-axes for admin brute-force protection (see V13 below)
[ ] Add DRF throttling (see V5 fix below)
[ ] Replace ModelViewSet with CreateAPIView for inquiries (see V4 fix below)
```

---

## What Was Fixed In This Session (Code Changes Applied)

| Fix | File Changed | Vulnerability Resolved |
|---|---|---|
| Added full security headers block | `frontend/next.config.js` | V9 — Missing security headers |
| Fixed `sanitize()` to strip `\r\n\t` | `frontend/app/forms/contact/route.ts` | V6 — Email header injection |
| Added hCaptcha + honeypot to InquiryForm | `frontend/components/shared/InquiryForm.tsx` | V3 — InquiryForm had no CAPTCHA |
| Routed InquiryForm through `/forms/contact` | `frontend/components/shared/InquiryForm.tsx` | V3, V5 — now gets rate limiting too |
| Added phone `pattern` validation to InquiryForm | `frontend/components/shared/InquiryForm.tsx` | V15 — No phone format validation |
| InquiryForm now passes trip/destination IDs to backend | `frontend/app/forms/contact/route.ts` | Correctness fix for Phase 2 |

---

## Vulnerability Summary Table (Updated)

| # | Vulnerability | Severity | Status | Notes |
|---|---|---|---|---|
| V1 | Next.js 14.1.0 — 8 CVEs (SSRF, Auth Bypass) | **CRITICAL** | ⚠️ MANUAL STEP REQUIRED | Run `npm install next@latest` — Step 1 above |
| V2 | Axios 1.6.5 — 15 CVEs (SSRF, Prototype Pollution) | **CRITICAL** | ⚠️ MANUAL STEP REQUIRED | Run `npm install axios@latest` — Step 1 above |
| V3 | InquiryForm had no CAPTCHA or rate limiting | **HIGH** | ✅ FIXED | Now uses hCaptcha + routes through `/forms/contact` |
| V4 | Django inquiry API exposes all PII (unauthenticated GET) | **HIGH** | ⏳ PHASE 2 | No Django in first release — fix before backend launch |
| V5 | No server-side rate limiting on Django inquiry endpoint | **HIGH** | ⏳ PHASE 2 | No Django in first release — fix before backend launch |
| V6 | Email header injection via unsanitized `\n` in sanitize() | **HIGH** | ✅ FIXED | `sanitize()` now strips `\r\n\t` |
| V7 | hCaptcha test keys in `.env.local` | **HIGH** | ⚠️ MANUAL STEP REQUIRED | Replace with real keys — Step 2 above |
| V8 | Django insecure fallback SECRET_KEY | **HIGH** | ⏳ PHASE 2 | No Django in first release — fix before backend launch |
| V9 | No security headers in Next.js | **HIGH** | ✅ FIXED | Security headers added to `next.config.js` |
| V10 | Gunicorn single worker — DoS risk | **HIGH** | ⏳ PHASE 2 | No Django in first release — fix in Procfile before backend launch |
| V11 | In-memory rate limiter not scalable | **MEDIUM** | ⏳ PHASE 2 | Acceptable for launch; upgrade to Redis when traffic grows |
| V12 | CORS_ALLOW_CREDENTIALS=True with AllowAny | **MEDIUM** | ⏳ PHASE 2 | No Django in first release |
| V13 | Django admin at default `/admin/` URL | **MEDIUM** | ⏳ PHASE 2 | No Django in first release |
| V14 | `dangerouslySetInnerHTML` in Preloader | **LOW** | ℹ️ INFORMATIONAL | Content is hardcoded — no real risk |
| V15 | Phone field had no regex validation | **LOW** | ✅ FIXED | `pattern` attribute added to InquiryForm |
| V16 | NEXT_PUBLIC_USE_DEMO_DATA visible to browser | **LOW** | ✅ ACCEPTABLE | Flag reveals demo mode only — not sensitive |

---

## Detailed Findings

---

### V1 — CRITICAL: Next.js 14.1.0 Has 8+ Public CVEs

**Severity:** Critical | **Status:** Manual step required (Step 1)  
**OWASP:** A06 — Vulnerable and Outdated Components

**Vulnerability:**  
Next.js 14.1.0 is affected by at least 8 confirmed public CVEs:

| CVE / Advisory | Impact |
|---|---|
| GHSA-fr5h-rqp8-mj6g | Server-Side Request Forgery in Server Actions |
| GHSA-7gfc-8cq8-jh5f | Authorization bypass vulnerability |
| GHSA-gp8f-8m3g-qvj9 | Cache Poisoning |
| GHSA-g77x-44xx-532m | DoS via image optimization |
| GHSA-7m27-7ghc-44w9 | DoS via Server Actions |
| GHSA-3h52-269p-cp9r | Information exposure in dev server |
| GHSA-g5qg-72qw-gw5v | Cache key confusion for Image Optimization |
| GHSA-4342-x723-ch2f | SSRF via Middleware Redirect |

**Fix:**
```bash
cd frontend && npm install next@latest
```

---

### V2 — CRITICAL: Axios 1.6.5 Has 15 Public CVEs

**Severity:** Critical | **Status:** Manual step required (Step 1)  
**OWASP:** A06 — Vulnerable and Outdated Components

**Vulnerability:**  
Axios 1.6.5 is affected by 15 CVEs including SSRF, prototype pollution, and header injection.

**Fix:**
```bash
cd frontend && npm install axios@latest
```

---

### V3 — HIGH: InquiryForm Had No CAPTCHA ✅ FIXED

**Severity:** High | **Status:** Fixed in code  
**OWASP:** A07 — Identification and Authentication Failures

**What was wrong:**  
`InquiryForm.tsx` (used on trip and destination detail pages) submitted directly to the Django backend via `createInquiry()` with no hCaptcha, no honeypot, and no rate limiting. A bot could flood the inbox.

**What was fixed:**  
`InquiryForm.tsx` now:
- Imports and renders `HCaptcha` (same widget as `ContactForm`)
- Has a honeypot `_hp` field
- Submits to `/forms/contact` (the Next.js API route) instead of directly to Django
- The submit button is disabled until hCaptcha is completed
- Gets phone `pattern` validation

All the existing protections in `/forms/contact` (rate limiting, sanitization, captcha verification, email sending) now also protect inquiries from trip/destination pages.

---

### V4 — HIGH: Django Inquiry API Exposes All PII ⏳ PHASE 2

**Severity:** High | **Status:** Deferred — no Django in first release  
**OWASP:** A01 — Broken Access Control

**What is wrong:**  
`InquiryViewSet` uses `ModelViewSet` with `DEFAULT_PERMISSION_CLASSES = [AllowAny]`. Any future GET request to `/api/inquiries/` (if method restriction were ever removed) would expose all customer PII.

**Fix to apply before Django backend launch:**

```python
# backend/ceylon_trailer/settings/base.py — change permission defaults
REST_FRAMEWORK = {
    # ...
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '20/hour',
    },
}
```

```python
# backend/apps/inquiries/views.py — replace ModelViewSet with write-only CreateAPIView
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.throttling import AnonRateThrottle
from rest_framework.response import Response
from .models import Inquiry
from .serializers import InquirySerializer

class InquiryThrottle(AnonRateThrottle):
    rate = '10/hour'

class InquiryCreateView(generics.CreateAPIView):
    serializer_class = InquirySerializer
    permission_classes = [AllowAny]
    throttle_classes = [InquiryThrottle]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {'message': 'Thank you! Your inquiry has been received.'},
            status=status.HTTP_201_CREATED
        )
```

```python
# backend/apps/inquiries/urls.py — switch from router to path
from django.urls import path
from .views import InquiryCreateView

urlpatterns = [
    path('', InquiryCreateView.as_view(), name='inquiry-create'),
]
```

---

### V5 — HIGH: No Rate Limiting on Django Endpoint ⏳ PHASE 2

**Severity:** High | **Status:** Deferred — no Django in first release  
**OWASP:** A05 — Security Misconfiguration

**Fix:** Applied as part of V4 fix above (`InquiryThrottle` class, `DEFAULT_THROTTLE_RATES`).

---

### V6 — HIGH: Email Header Injection ✅ FIXED

**Severity:** High | **Status:** Fixed in code  
**OWASP:** A03 — Injection

**What was wrong:**  
`sanitize()` in `route.ts` stripped HTML tags but not newline characters (`\n`, `\r`). An attacker submitting `name = "John\nBcc: attacker@evil.com"` could inject extra email headers.

**What was fixed:**
```typescript
// frontend/app/forms/contact/route.ts
function sanitize(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value
    .replace(/<[^>]*>/g, '')    // strip HTML tags
    .replace(/[\r\n\t]/g, ' ')  // strip control chars — prevents email header injection
    .trim()
    .slice(0, 2000)
}
```

---

### V7 — HIGH: hCaptcha Test Keys in `.env.local`

**Severity:** High | **Status:** Manual step required (Step 2)  
**OWASP:** A07 — Identification and Authentication Failures

**What is wrong:**  
`.env.local` contains hCaptcha's official test keys which always return success — no real verification occurs. If accidentally deployed to production, CAPTCHA provides zero protection.

```
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=10000000-ffff-ffff-ffff-000000000001  # test key
HCAPTCHA_SECRET=0x0000000000000000000000000000000000000000           # always passes
```

**Fix:** Replace with real keys from your hCaptcha dashboard. See Step 2 of the Launch Guide.

---

### V8 — HIGH: Django Insecure Fallback SECRET_KEY ⏳ PHASE 2

**Severity:** High | **Status:** Deferred — no Django in first release  
**OWASP:** A02 — Cryptographic Failures

**Fix to apply before Django backend launch:**
```python
# backend/ceylon_trailer/settings/base.py — line 9
# Replace:
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-change-this-in-production')

# With:
SECRET_KEY = os.environ['SECRET_KEY']  # Raises KeyError immediately if missing
```

Generate a strong secret key:
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

---

### V9 — HIGH: No Security Headers in Next.js ✅ FIXED

**Severity:** High | **Status:** Fixed in code  
**OWASP:** A05 — Security Misconfiguration

**What was wrong:**  
`next.config.js` had no `headers()` function. The site was missing X-Frame-Options, CSP, HSTS, and other browser security headers.

**What was fixed:**  
The following headers are now returned on every page response:

| Header | Protection |
|---|---|
| `X-Frame-Options: DENY` | Clickjacking |
| `X-Content-Type-Options: nosniff` | MIME type sniffing |
| `Referrer-Policy: strict-origin-when-cross-origin` | URL leakage to third parties |
| `Strict-Transport-Security` (2 years + preload) | HTTP downgrade attacks |
| `Permissions-Policy` | Disables camera, mic, geolocation, payment |
| `Content-Security-Policy` | XSS, injected scripts |

> **Note:** The CSP currently uses `'unsafe-inline'` for scripts because Next.js hydration requires it. Once you upgrade to Next.js 15+ you can implement nonce-based CSP for stronger protection.

---

### V10 — HIGH: Gunicorn Single Worker ⏳ PHASE 2

**Severity:** High | **Status:** Deferred — no Django in first release  
**OWASP:** A05 — Security Misconfiguration

**Fix to apply before Django backend launch:**
```
# backend/Procfile
web: gunicorn ceylon_trailer.wsgi:application --workers 3 --timeout 30 --max-requests 1000 --max-requests-jitter 100 --log-file -
```

---

### V11 — MEDIUM: In-Memory Rate Limiter ⏳ PHASE 2

**Severity:** Medium | **Status:** Acceptable for first launch  
**OWASP:** A05 — Security Misconfiguration

The current in-memory rate limiter in `route.ts` works fine for a single-instance deployment (e.g., one Vercel serverless region). It resets on restart and doesn't scale across multiple instances.

**Acceptable for now.** Upgrade to Redis-based rate limiting (e.g., Upstash) when traffic grows or when you move to multi-region deployment.

---

### V12 — MEDIUM: CORS_ALLOW_CREDENTIALS=True ⏳ PHASE 2

**Severity:** Medium | **Status:** Deferred — no Django in first release  

**Fix to apply before Django backend launch:**
```python
# backend/ceylon_trailer/settings/base.py
CORS_ALLOW_CREDENTIALS = False  # The JSON API does not need browser cookies
```

---

### V13 — MEDIUM: Django Admin at Default `/admin/` URL ⏳ PHASE 2

**Severity:** Medium | **Status:** Deferred — no Django in first release

**Fix to apply before Django backend launch:**
```python
# backend/ceylon_trailer/urls.py
import os
ADMIN_URL = os.environ.get('DJANGO_ADMIN_URL', 'ct-management/')

urlpatterns = [
    path(ADMIN_URL, admin.site.urls),
    # ...
]
```

Also install `django-axes` for admin brute-force protection:
```bash
pip install django-axes==6.4.0
```
```python
# settings/base.py
INSTALLED_APPS += ['axes']
MIDDLEWARE += ['axes.middleware.AxesMiddleware']
AUTHENTICATION_BACKENDS = [
    'axes.backends.AxesStandaloneBackend',
    'django.contrib.auth.backends.ModelBackend',
]
AXES_FAILURE_LIMIT = 5
AXES_COOLOFF_TIME = 1  # hours
```

---

### V14 — LOW: `dangerouslySetInnerHTML` in Preloader ℹ️ INFORMATIONAL

**Severity:** Low | **Status:** No action needed  
**OWASP:** A03 — Injection

`Preloader.tsx` uses `dangerouslySetInnerHTML` to inject a hardcoded CSS string. The `STYLES` constant contains no user input. There is no XSS risk from this specific usage. No change required.

---

### V15 — LOW: Phone Field Had No Regex Validation ✅ FIXED

**Severity:** Low | **Status:** Fixed in code

`InquiryForm.tsx` now includes `pattern="[+\d\s\-().]{7,20}"` on the phone input. The existing `ContactForm.tsx` already has `maxLength={20}` but no pattern — add the same attribute there for consistency:

```tsx
// frontend/components/shared/ContactForm.tsx — phone input (line ~131)
pattern="[+\d\s\-().]{7,20}"
title="Enter a valid phone number"
```

---

### V16 — LOW: `NEXT_PUBLIC_USE_DEMO_DATA` Visible in Browser

**Severity:** Low | **Status:** Acceptable  

This flag tells the browser the site is in demo mode. It is not sensitive. For Phase 2, move the flag server-side and pass it as a prop from Server Components to avoid exposing it in the browser bundle. Not a launch blocker.

---

## Production Hardening Checklist (Master)

### Frontend Launch (Phase 1) — DO BEFORE GOING LIVE

```
Dependencies
[ ] npm install next@latest axios@latest
[ ] npm audit fix
[ ] npm audit — confirm 0 critical, 0 high

Hosting / Environment Variables
[ ] NEXT_PUBLIC_SITE_URL = https://ceylontrailer.com
[ ] NEXT_PUBLIC_USE_DEMO_DATA = true
[ ] NEXT_PUBLIC_WHATSAPP_NUMBER = real number
[ ] NEXT_PUBLIC_HCAPTCHA_SITE_KEY = real hCaptcha site key
[ ] HCAPTCHA_SECRET = real hCaptcha secret key (mark as Secret)
[ ] NOTIFY_EMAIL = your email
[ ] SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS = real SMTP values

Testing
[ ] Contact form submits → you receive the email
[ ] InquiryForm on trip/destination pages submits → you receive the email
[ ] hCaptcha widget appears and must be completed to submit
[ ] WhatsApp button opens correct chat
[ ] No console errors on any page
[ ] HTTPS is active on your domain

Security Verification
[ ] securityheaders.com shows grade A or B on your live domain
[ ] hcaptcha.com dashboard shows real verification events (not test key)
```

### Django Backend Launch (Phase 2) — DO BEFORE BACKEND GOES LIVE

```
Django Settings
[ ] SECRET_KEY = strong unique key (generated, not default)
[ ] DEBUG = False
[ ] ALLOWED_HOSTS = your API domain only
[ ] DJANGO_SETTINGS_MODULE = ceylon_trailer.settings.production
[ ] CORS_ALLOWED_ORIGINS = https://ceylontrailer.com only
[ ] CORS_ALLOW_CREDENTIALS = False
[ ] python manage.py check --deploy — fix every warning

Code Fixes (see detail sections above)
[ ] Replace InquiryViewSet (ModelViewSet) with InquiryCreateView (CreateAPIView)
[ ] Remove AllowAny as global default; use IsAuthenticatedOrReadOnly
[ ] Add DRF AnonRateThrottle (10/hour for inquiry endpoint)
[ ] Remove insecure fallback SECRET_KEY from base.py
[ ] Change admin URL via DJANGO_ADMIN_URL env var
[ ] Install django-axes for admin brute-force protection

Infrastructure
[ ] Gunicorn: add --workers 3 --timeout 30 --max-requests 1000
[ ] PostgreSQL SSL: ssl_require=True (already in production.py ✅)
[ ] Confirm backend is not publicly exposed without CORS protection

Environment Variables for Next.js (update in Vercel)
[ ] NEXT_PUBLIC_USE_DEMO_DATA = false
[ ] NEXT_PUBLIC_API_URL = https://api.ceylontrailer.com/api
[ ] INTERNAL_API_URL = https://api.ceylontrailer.com/api
```

---

## Updated Security Score

| Category | Phase 1 Score | Phase 2 Score (target) | Notes |
|---|---|---|---|
| Authentication & Access Control | 3/10 | 7/10 | API auth needed for Phase 2 |
| Input Validation & Sanitization | 8/10 | 8/10 | Fixed: \n stripped, phone pattern added |
| CAPTCHA / Spam Prevention | 8/10 | 8/10 | Fixed: InquiryForm now protected |
| Dependency Security | 2/10 → 9/10 | 9/10 | Must run npm update (Step 1) |
| Security Headers | 8/10 | 8/10 | Fixed: headers added to next.config.js |
| Rate Limiting | 6/10 | 8/10 | OK for single instance; upgrade to Redis later |
| Secret Management | 5/10 → 8/10 | 8/10 | Real hCaptcha keys required (Step 2) |
| Infrastructure Hardening | 5/10 | 7/10 | Gunicorn + admin URL fix for Phase 2 |
| HTTPS / Transport Security | 8/10 | 9/10 | HSTS header now added |
| XSS / Injection Protection | 8/10 | 8/10 | Fixed: header injection patched |

**Phase 1 Score (after code fixes + manual steps): 7.5 / 10**  
**Phase 2 Score (after Django hardening): 8.5 / 10**

---

*Report generated by Claude Code (claude-sonnet-4-6) — 2026-05-09*  
*Code fixes applied in this session: next.config.js, route.ts, InquiryForm.tsx*
