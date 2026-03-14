import type { Metadata } from 'next'
import { Suspense } from 'react'
import DestinationsClient from './DestinationsClient'

export const revalidate = 1800

export const metadata: Metadata = {
  title: 'Destinations',
  description: 'Explore all Sri Lankan destinations — filter by province, activity, and trip type to find your perfect journey.',
}

export default function DestinationsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <DestinationsClient />
    </Suspense>
  )
}
