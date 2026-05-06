import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Simple in-memory rate limiter: 5 submissions per IP per 10 minutes
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const WINDOW_MS = 10 * 60 * 1000 // 10 minutes
  const MAX_REQUESTS = 5

  const entry = rateLimitStore.get(ip)
  if (!entry || now >= entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }
  if (entry.count >= MAX_REQUESTS) return false
  entry.count++
  return true
}

function sanitize(value: unknown): string {
  if (typeof value !== 'string') return ''
  // Strip HTML tags and trim whitespace
  return value.replace(/<[^>]*>/g, '').trim().slice(0, 2000)
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: NextRequest) {
  // 1. Rate limiting
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait 10 minutes before trying again.' },
      { status: 429 }
    )
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  // 2. Honeypot check — bots fill this hidden field, humans never see it
  if (body._hp && String(body._hp).length > 0) {
    // Silently succeed so bots don't know they were caught
    return NextResponse.json({ message: 'Message sent successfully.' })
  }

  // 3. hCaptcha server-side verification
  const captchaToken = sanitize(body.captchaToken)
  const hcaptchaSecret = process.env.HCAPTCHA_SECRET

  if (!hcaptchaSecret) {
    console.error('[contact] HCAPTCHA_SECRET is not configured.')
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 })
  }

  if (!captchaToken) {
    return NextResponse.json({ error: 'CAPTCHA verification is required.' }, { status: 400 })
  }

  const captchaVerify = await fetch('https://hcaptcha.com/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${encodeURIComponent(hcaptchaSecret)}&response=${encodeURIComponent(captchaToken)}`,
  })
  const captchaResult = await captchaVerify.json()

  if (!captchaResult.success) {
    return NextResponse.json(
      { error: 'CAPTCHA verification failed. Please try again.' },
      { status: 400 }
    )
  }

  // 4. Sanitize and validate all fields
  const name = sanitize(body.name)
  const email = sanitize(body.email)
  const phone = sanitize(body.phone)
  const country = sanitize(body.country)
  const message = sanitize(body.message)
  const travelDate = sanitize(body.travel_date)
  const travelers = Number(body.number_of_travelers) || 1

  if (!name || !email || !phone || !country || !message) {
    return NextResponse.json({ error: 'All required fields must be filled.' }, { status: 400 })
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }
  if (message.length < 10) {
    return NextResponse.json({ error: 'Message is too short.' }, { status: 400 })
  }

  // 5. Send email notification (server-side only — NOTIFY_EMAIL never exposed to browser)
  const notifyEmail = process.env.NOTIFY_EMAIL
  const smtpHost = process.env.SMTP_HOST
  const smtpPort = Number(process.env.SMTP_PORT || '587')
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const smtpSecure = process.env.SMTP_SECURE === 'true'

  if (!notifyEmail || !smtpHost || !smtpUser || !smtpPass) {
    console.error('[contact] Email environment variables are not fully configured.')
    return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 })
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: { user: smtpUser, pass: smtpPass },
  })

  const emailHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <div style="background:#0891b2;padding:24px 32px;">
        <h1 style="color:#fff;margin:0;font-size:20px;">New Contact Inquiry</h1>
        <p style="color:#cffafe;margin:4px 0 0;font-size:13px;">Ceylon Trailer Website</p>
      </div>
      <div style="padding:32px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;width:140px;">Name</td><td style="padding:8px 0;font-weight:600;color:#111827;">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Email</td><td style="padding:8px 0;color:#111827;"><a href="mailto:${email}" style="color:#0891b2;">${email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Phone</td><td style="padding:8px 0;color:#111827;">${phone}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Country</td><td style="padding:8px 0;color:#111827;">${country}</td></tr>
          ${travelDate ? `<tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Travel Date</td><td style="padding:8px 0;color:#111827;">${travelDate}</td></tr>` : ''}
          <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Travelers</td><td style="padding:8px 0;color:#111827;">${travelers}</td></tr>
        </table>
        <div style="margin-top:24px;padding:16px;background:#f9fafb;border-radius:8px;border-left:4px solid #0891b2;">
          <p style="margin:0 0 6px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.05em;">Message</p>
          <p style="margin:0;color:#111827;line-height:1.6;">${message.replace(/\n/g, '<br>')}</p>
        </div>
      </div>
      <div style="padding:16px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;font-size:11px;color:#9ca3af;">
        This email was sent from the Ceylon Trailer contact form. IP: ${ip}
      </div>
    </div>
  `

  try {
    await transporter.sendMail({
      from: `"Ceylon Trailer Website" <${smtpUser}>`,
      to: notifyEmail,
      replyTo: email,
      subject: `New Inquiry from ${name} (${country})`,
      html: emailHtml,
    })
  } catch (err) {
    console.error('[contact] Failed to send email:', err)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or contact us via WhatsApp.' },
      { status: 500 }
    )
  }

  // 6. Also forward inquiry to the Django backend (non-blocking — don't fail if backend is down)
  try {
    const apiUrl = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL
    if (apiUrl) {
      await fetch(`${apiUrl}/inquiries/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, country, message, travel_date: travelDate || null, number_of_travelers: travelers }),
      })
    }
  } catch (err) {
    console.warn('[contact] Backend save failed (non-critical):', err)
  }

  return NextResponse.json({ message: 'Message sent successfully.' })
}
