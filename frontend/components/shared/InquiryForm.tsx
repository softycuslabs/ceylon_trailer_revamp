'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { createInquiry } from '@/lib/api'
import { ACTIVITIES } from '@/lib/utils'

interface Props {
  tripId?: number
  destinationId?: number
  tripTitle?: string
}

export default function InquiryForm({ tripId, destinationId, tripTitle }: Props) {
  const [loading, setLoading] = useState(false)
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
    setLoading(true)
    try {
      await createInquiry({
        ...form,
        number_of_travelers: Number(form.number_of_travelers),
        trip: tripId ?? null,
        destination: destinationId ?? null,
      })
      toast.success('Thank you! We will contact you shortly.')
      setForm({ name: '', email: '', phone: '', country: '', message: '', travel_date: '', number_of_travelers: 1 })
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {tripTitle && (
        <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3 text-sm text-cyan-700">
          Inquiry about: <strong>{tripTitle}</strong>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            type="text" name="name" value={form.name} onChange={handleChange} required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            type="email" name="email" value={form.email} onChange={handleChange} required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
          <input
            type="tel" name="phone" value={form.phone} onChange={handleChange} required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            placeholder="+44 7700 000000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
          <input
            type="text" name="country" value={form.country} onChange={handleChange} required
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
          name="message" value={form.message} onChange={handleChange} required rows={4}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent resize-none"
          placeholder="Tell us about your travel plans, special requirements, or questions..."
        />
      </div>

      <button
        type="submit" disabled={loading}
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
