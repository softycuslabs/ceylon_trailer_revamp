# Contact Form — Email Notification & Security Setup Guide

This document covers how to configure the contact form email notifications, hCaptcha bot protection, and explains the security architecture. Follow this guide whenever you deploy to a new server or need to update credentials.

---

## How It Works (Overview)

```
Visitor fills form
       │
       ▼
hCaptcha widget (browser)  ←── Blocks bots visually
       │
       ▼
POST /api/contact  (Next.js server — never touches the browser)
       │
       ├── Honeypot check   → bot detected? silently discard
       ├── Rate limit check → >5 per IP per 10 min? reject
       ├── hCaptcha verify  → invalid token? reject
       ├── Input sanitize   → strips HTML, enforces length
       │
       ├── Send email  ──→  NOTIFY_EMAIL (your inbox)
       └── Save to backend  → Django /api/inquiries/
```

---

## Configuration File

All secrets live in one file only:

```
frontend/.env.local
```

This file is **never committed to git** (it is in `.gitignore`). It only exists on your local machine and on the production server. Hackers cannot find these values by inspecting the website's source code or JavaScript bundles because Next.js never sends server-only variables to the browser.

> **Rule:** Variables that start with `NEXT_PUBLIC_` are visible in the browser.
> Variables **without** that prefix are server-only and completely hidden from the public.

---

## All Variables to Configure

Open `frontend/.env.local` and fill in each value below.

### Section 1 — hCaptcha (Bot Protection)

```env
# Safe to expose — embedded in the browser-side widget
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=your_hcaptcha_site_key

# SECRET — server only, never share this
HCAPTCHA_SECRET=your_hcaptcha_secret_key
```

**How to get these keys:**
1. Go to [https://www.hcaptcha.com](https://www.hcaptcha.com) and create a free account
2. Click **"Add Site"** and enter your domain (e.g. `ceylontrailer.com`)
3. Copy the **Site Key** → paste as `NEXT_PUBLIC_HCAPTCHA_SITE_KEY`
4. Go to **Settings → Secret Key** → paste as `HCAPTCHA_SECRET`

> The free hCaptcha tier is sufficient for most small-to-medium websites.

---

### Section 2 — Notification Email

```env
# The email address where contact form submissions will be delivered
NOTIFY_EMAIL=admin@ceylontrailer.com
```

Change this to whatever email address you want to receive inquiries. This value is **server-only** — it is never visible in the browser, browser console, or page source.

---

### Section 3 — SMTP (Email Sending Credentials)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=xxxx-xxxx-xxxx-xxxx
```

#### Using Gmail (Recommended)

Do **not** use your normal Gmail password here. Gmail requires an **App Password** for programmatic email sending.

**Steps to create a Gmail App Password:**
1. Make sure **2-Step Verification** is enabled on your Google account
   - Go to [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. Go to [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Click **"Create a new app password"**
4. Name it `Ceylon Trailer Website` (or anything you like)
5. Copy the 16-character password (format: `xxxx xxxx xxxx xxxx`)
6. Remove the spaces and paste it as `SMTP_PASS`

**Example for Gmail:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=ceylontrailer@gmail.com
SMTP_PASS=abcdabcdabcdabcd
```

#### Using Other Email Providers

| Provider | SMTP_HOST | SMTP_PORT | SMTP_SECURE |
|---|---|---|---|
| Gmail | smtp.gmail.com | 587 | false |
| Outlook / Hotmail | smtp-mail.outlook.com | 587 | false |
| Yahoo | smtp.mail.yahoo.com | 465 | true |
| Custom cPanel host | mail.yourdomain.com | 465 | true |

---

## Complete .env.local Example

```env
# ── Existing variables ─────────────────────────────────────────────────────────
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_WHATSAPP_NUMBER=94770000000
NEXT_PUBLIC_SITE_URL=https://ceylontrailer.com

# ── hCaptcha ───────────────────────────────────────────────────────────────────
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=10000000-ffff-ffff-ffff-000000000001
HCAPTCHA_SECRET=0x0000000000000000000000000000000000000000

# ── Email notification ─────────────────────────────────────────────────────────
NOTIFY_EMAIL=admin@ceylontrailer.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=ceylontrailer@gmail.com
SMTP_PASS=abcdabcdabcdabcd
```

> The `HCAPTCHA_SECRET` and `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` values shown above are hCaptcha's **official test keys**. They work in local development. Replace them with your real keys before going live.

---

## Key Files Reference

| File | Purpose |
|---|---|
| [frontend/.env.local](../frontend/.env.local) | Where all secret values are stored (never committed) |
| [frontend/.env.example](../frontend/.env.example) | Template showing which variables are needed (committed, no real values) |
| [frontend/app/api/contact/route.ts](../frontend/app/api/contact/route.ts) | Server-side handler: rate limit, captcha verify, email send |
| [frontend/components/shared/ContactForm.tsx](../frontend/components/shared/ContactForm.tsx) | The contact form UI with hCaptcha widget and honeypot |
| [frontend/app/contact/page.tsx](../frontend/app/contact/page.tsx) | The Contact Us page that uses ContactForm |

---

## Security Features Summary

### 1. hCaptcha (Primary Bot Block)
- A challenge widget the visitor must solve before submitting
- The token is verified **on the server** by calling the hCaptcha API with your secret key
- Bots that skip the widget get rejected — they cannot fake a valid token without your secret

### 2. Honeypot Field
- A hidden form field (`_hp`) that is invisible to real users (CSS `display: none`)
- Automated bots that crawl and fill forms will fill this field
- If it contains any value, the submission is silently discarded

### 3. Rate Limiting
- Each IP address is limited to **5 submissions per 10 minutes**
- Excess requests receive an HTTP 429 response
- Resets automatically after the time window expires

### 4. Input Sanitization
- All fields have character length limits enforced on both the form and the server
- HTML tags are stripped from all input on the server before sending the email (prevents XSS via email)
- Email format is validated with a regular expression

### 5. Server-only Secrets
- `NOTIFY_EMAIL`, `SMTP_PASS`, `HCAPTCHA_SECRET` have no `NEXT_PUBLIC_` prefix
- Next.js guarantees these values are **never bundled into client-side JavaScript**
- Even if someone downloads every JS file from your website, these values do not exist in them

---

## Checklist Before Going Live

- [ ] Replace `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` with your real hCaptcha site key
- [ ] Replace `HCAPTCHA_SECRET` with your real hCaptcha secret key
- [ ] Set `NOTIFY_EMAIL` to the email address that should receive inquiries
- [ ] Set `SMTP_USER` to your sending Gmail address
- [ ] Set `SMTP_PASS` to the 16-character Gmail App Password
- [ ] Add the production domain to your hCaptcha site settings at hcaptcha.com
- [ ] Set `NEXT_PUBLIC_SITE_URL` to your production URL (e.g. `https://ceylontrailer.com`)
- [ ] Confirm `.env.local` is listed in `.gitignore` (it is by default in Next.js projects)

---

## Testing Locally

The default test keys in `.env.local` allow the hCaptcha widget to work in development without a real account:

- **Test Site Key:** `10000000-ffff-ffff-ffff-000000000001`
- **Test Secret:** `0x0000000000000000000000000000000000000000`

With these keys, the CAPTCHA widget will appear and let you submit the form normally. Replace them with real keys when deploying.

To test the email sending locally, fill in real SMTP credentials and run:

```bash
cd frontend
npm run dev
```

Then go to [http://localhost:3000/contact](http://localhost:3000/contact), fill the form, complete the CAPTCHA, and submit. Check your `NOTIFY_EMAIL` inbox.
