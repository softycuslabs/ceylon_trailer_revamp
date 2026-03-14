import type { Metadata } from 'next'
import GalleryClient from './GalleryClient'
import PageHero from '@/components/shared/PageHero'
import { getGalleryImages } from '@/lib/api'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Browse stunning photos of Sri Lanka — destinations, wildlife, culture, and landscapes.',
}

export default async function GalleryPage() {
  const galleryData = await getGalleryImages().catch(() => ({ results: [] }))

  return (
    <>
      <PageHero
        title="Photo Gallery"
        subtitle="Stunning views of Sri Lanka through our lens"
        image="https://images.unsplash.com/photo-1548013146-72479768bada?w=1920&q=80"
        breadcrumbs={[{ label: 'Gallery' }]}
      />
      <GalleryClient initialImages={galleryData.results} />
    </>
  )
}
