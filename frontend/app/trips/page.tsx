import type { Metadata } from 'next'
import { Suspense } from 'react'
import TripsClient from './TripsClient'

export const revalidate = 1800

export const metadata: Metadata = {
  title: 'Trip Packages',
  description: 'Browse all Sri Lanka trip packages — adventure, cultural, wildlife, beach and more.',
}

export default function TripsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <TripsClient />
    </Suspense>
  )
}
