import { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import AboutSection from '@/components/home/AboutSection'
import TopDestinations from '@/components/home/TopDestinations'
import EnjoyWithUs from '@/components/home/EnjoyWithUs'
import SriLankaMap from '@/components/home/SriLankaMap'
import PhotoGallery from '@/components/home/PhotoGallery'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import TrustedBy from '@/components/home/TrustedBy'
import Testimonials from '@/components/home/Testimonials'
import { fetchFeaturedDestinations } from '@/lib/destinations-data'
import { getGalleryImages, getTestimonials } from '@/lib/api'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Ceylon Trailer — Creating Unforgettable Travel Experiences',
  description:
    'Discover Sri Lanka\'s rich heritage with Ceylon Trailer. Personalized travel packages, guided tours, and cultural experiences across the heart of Ceylon.',
}

export default async function HomePage() {
  const [destinations, galleryData, testimonialsData] = await Promise.allSettled([
    fetchFeaturedDestinations(),
    getGalleryImages({ is_featured: true }),
    getTestimonials(),
  ])

  const featuredDestinations = destinations.status === 'fulfilled' ? destinations.value : []
  const galleryImages = galleryData.status === 'fulfilled' ? galleryData.value.results : []
  const testimonials = testimonialsData.status === 'fulfilled' ? testimonialsData.value.results : []

  return (
    <>
      <HeroSection />
      <AboutSection />
      <TopDestinations destinations={featuredDestinations} />
      <EnjoyWithUs />
      <SriLankaMap />
      <PhotoGallery images={galleryImages} />
      <WhyChooseUs />
      <Testimonials testimonials={testimonials} />
      <TrustedBy />
    </>
  )
}
