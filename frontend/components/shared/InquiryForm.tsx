'use client'

import { useState, useRef } from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import toast from 'react-hot-toast'

interface Props {
  tripId?: number
  destinationId?: number
  tripTitle?: string
}

export default function InquiryForm({ tripId, destinationId, tripTitle }: Props) {
  const [loading, setLoading] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const captchaRef = useRef<HCaptcha>(null)

  const [form, setForm] = useState({
    name: '', email: '', phone: '', country: '',
    message: '', travel_date: '', number_of_travelers: 1,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!captchaToken) {
      toast.error('Please complete the CAPTCHA verification.')
      return
    }

    setLoading(true)
    try {
      // Route through the Next.js API handler — this verifies hCaptcha, applies
      // rate limiting, sanitizes input, sends the email, and forwards to Django.
      const res = await fetch('/forms/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          number_of_travelers: Number(form.number_of_travelers),
          captchaToken,
          _hp: '',
          ...(tripId        != null && { trip: tripId }),
          ...(destinationId != null && { destination: destinationId }),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Something went wrong. Please try again.')
        captchaRef.current?.resetCaptcha()
        setCaptchaToken(null)
        return
      }

      toast.success('Thank you! We will contact you shortly.')
      setForm({ name: '', email: '', phone: '', country: '', message: '', travel_date: '', number_of_travelers: 1 })
      captchaRef.current?.resetCaptcha()
      setCaptchaToken(null)
    } catch {
      toast.error('Network error. Please check your connection and try again.')
      captchaRef.current?.resetCaptcha()
      setCaptchaToken(null)
    } finally {
      setLoading(false)
    }
  }

  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ''

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot — hidden from real users, bots fill this automatically */}
      <input
        type="text"
        name="_hp"
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: 'none' }}
        readOnly
        value=""
      />

      {tripTitle && (
        <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3 text-sm text-cyan-700">
          Inquiry about: <strong>{tripTitle}</strong>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            type="text" name="name" value={form.name} onChange={handleChange} required maxLength={100}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            type="email" name="email" value={form.email} onChange={handleChange} required maxLength={254}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
          <input
            type="tel" name="phone" value={form.phone} onChange={handleChange} required maxLength={20}
            pattern="[+\d\s\-().]{7,20}" title="Enter a valid phone number"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            placeholder="+44 7700 000000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
          <input
            type="text" name="country" value={form.country} onChange={handleChange} required maxLength={60}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            placeholder="United Kingdom"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
          <input
            type="date" name="travel_date" value={form.travel_date} onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Travelers</label>
          <input
            type="number" name="number_of_travelers" value={form.number_of_travelers} onChange={handleChange}
            min={1} max={50}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
        <textarea
          name="message" value={form.message} onChange={handleChange} required
          minLength={10} maxLength={2000} rows={4}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent resize-none"
          placeholder="Tell us about your travel plans, special requirements, or questions..."
        />
      </div>

      {/* hCaptcha widget */}
      <div>
        <HCaptcha
          ref={captchaRef}
          sitekey={siteKey}
          onVerify={(token) => setCaptchaToken(token)}
          onExpire={() => setCaptchaToken(null)}
        />
      </div>

      <button
        type="submit"
        disabled={loading || !captchaToken}
        className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </>
        ) : (
          'Send Inquiry'
        )}
      </button>
    </form>
  )
}
