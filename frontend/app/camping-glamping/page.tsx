import type { Metadata } from 'next'
import CampingGlampingPage from '@/components/camping/CampingGlampingPage'

export const metadata: Metadata = {
  title: 'Camping & Glamping in Sri Lanka | Ceylon Trailer',
  description:
    'Experience luxury glamping and nature camping in Sri Lanka. Discover beautiful outdoor stays, campfire nights, and unforgettable adventures with Ceylon Trailer.',
  keywords: [
    'camping Sri Lanka',
    'glamping Sri Lanka',
    'outdoor stays Ceylon',
    'nature camping',
    'luxury glamping',
    'Ceylon Trailer camping',
  ],
  openGraph: {
    title: 'Camping & Glamping in Sri Lanka | Ceylon Trailer',
    description:
      'Sleep under the stars in Sri Lanka. Luxury glamping tents and nature camping experiences with campfire nights, hiking, and unforgettable adventures.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Camping and Glamping in Sri Lanka',
      },
    ],
  },
}

export default function Page() {
  return <CampingGlampingPage />
}
