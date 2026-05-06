import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, ArrowRight, MessageCircle, CheckCircle2, Star } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import InquiryForm from '@/components/shared/InquiryForm'
import DestinationGallery from '@/components/destinations/DestinationGallery'
import { fetchDestination, fetchAllDestinationSlugs } from '@/lib/destinations-data'
import { getWhatsAppUrl, getImageUrl } from '@/lib/utils'
import { DESTINATION_EXTRAS } from '@/demo'

export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const slugs = await fetchAllDestinationSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const destination = await fetchDestination(params.slug)
    return {
      title: `${destination.name} | Destinations`,
      description: destination.short_description || destination.description.slice(0, 160),
      openGraph: {
        title: `${destination.name} — Ceylon Trailer`,
        description: destination.short_description,
        images: destination.image ? [{ url: getImageUrl(destination.image) }] : [],
      },
    }
  } catch {
    return { title: 'Destination Not Found' }
  }
}

export default async function DestinationDetailPage({ params }: { params: { slug: string } }) {
  let destination
  try {
    destination = await fetchDestination(params.slug)
  } catch {
    notFound()
  }

  const extras = DESTINATION_EXTRAS[params.slug]
  const highlights = extras?.highlights ?? []
  const whatWeOffer = extras?.what_we_offer ?? []

  const waUrl = getWhatsAppUrl(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '94770000000',
    `Hello! I am interested in visiting ${destination.name}.`
  )

  const galleryImages = destination.images && destination.images.length > 0
    ? destination.images
    : []

  return (
    <>
      <PageHero
        title={destination.name}
        subtitle={`${destination.province} Province`}
        image={getImageUrl(destination.image)}
        breadcrumbs={[
          { label: 'Destinations', href: '/destinations' },
          { label: destination.name },
        ]}
      />

      <div className="bg-gray-50 min-h-screen">
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* ── Main content ─────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-10">

              {/* Province + title + short description */}
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 bg-cyan-50 text-cyan-700 text-xs font-semibold px-3 py-1 rounded-full border border-cyan-100">
                    <MapPin className="w-3 h-3" />
                    {destination.province} Province
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-3">
                  {destination.name}
                </h1>
                <p className="text-gray-500 text-base leading-relaxed">{destination.short_description}</p>
              </div>

              {/* Photo gallery */}
              {galleryImages.length > 0 && (
                <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                  <DestinationGallery
                    images={galleryImages}
                    destinationName={destination.name}
                  />
                </div>
              )}

              {/* About */}
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <h2 className="text-xl font-heading font-bold text-gray-900 mb-4">
                  About {destination.name}
                </h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {destination.description}
                </p>
              </div>

              {/* Key highlights */}
              {highlights.length > 0 && (
                <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-heading font-bold text-gray-900 mb-6">
                    Key Highlights
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {highlights.map((h, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-cyan-50 rounded-full flex items-center justify-center mt-0.5">
                          <Star className="w-4 h-4 text-cyan-500 fill-cyan-200" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm mb-1">{h.title}</h3>
                          <p className="text-gray-500 text-sm leading-relaxed">{h.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* What Ceylon Trailer offers */}
              {whatWeOffer.length > 0 && (
                <div className="bg-gradient-to-br from-cyan-600 to-cyan-800 rounded-2xl p-7 text-white">
                  <h2 className="text-xl font-heading font-bold mb-5">What Ceylon Trailer Offers</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {whatWeOffer.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 bg-white/10 rounded-xl p-4">
                        <CheckCircle2 className="w-5 h-5 text-cyan-200 flex-shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-md text-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp Us
                    </a>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
                    >
                      Request Details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}

            </div>

            {/* ── Sidebar ──────────────────────────────────────── */}
            <aside className="space-y-6">

              {/* Plan Your Trip CTA */}
              <div className="bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-2xl p-6 text-white sticky top-24">
                <h3 className="font-heading font-bold text-xl mb-1">Plan Your Trip</h3>
                <p className="text-cyan-100 text-sm mb-5">
                  Interested in visiting {destination.name}? Our experts are ready to help.
                </p>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-3 rounded-xl transition-colors w-full justify-center mb-3 text-sm"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Inquiry
                </a>
                <Link
                  href="/trips"
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-5 py-3 rounded-xl transition-colors w-full justify-center text-sm"
                >
                  Browse Trip Packages
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Location */}
              {destination.map_lat && destination.map_lng && (
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cyan-500" />
                    Location
                  </h3>
                  <a
                    href={`https://maps.google.com/?q=${destination.map_lat},${destination.map_lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 relative">
                      <iframe
                        title={`Map of ${destination.name}`}
                        src={`https://maps.google.com/maps?q=${destination.map_lat},${destination.map_lng}&z=10&output=embed`}
                        className="w-full h-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                    <p className="text-cyan-600 text-xs mt-2 hover:underline text-center">
                      View on Google Maps ↗
                    </p>
                  </a>
                </div>
              )}

              {/* Inquiry form */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-heading font-bold text-lg text-gray-900 mb-1">Send an Inquiry</h3>
                <p className="text-gray-400 text-sm mb-5">We'll get back to you within 24 hours.</p>
                <InquiryForm destinationId={destination.id} />
              </div>

            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
