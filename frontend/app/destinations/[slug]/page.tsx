import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, ArrowRight, MessageCircle } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import TripCard from '@/components/trips/TripCard'
import InquiryForm from '@/components/shared/InquiryForm'
import { getDestination, getAllDestinationSlugs, getTrips } from '@/lib/api'
import { getWhatsAppUrl, getImageUrl } from '@/lib/utils'

export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const slugs = await getAllDestinationSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const destination = await getDestination(params.slug)
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
    destination = await getDestination(params.slug)
  } catch {
    notFound()
  }

  const tripsData = await getTrips({ destination_slug: params.slug }).catch(() => ({ results: [] }))
  const trips = tripsData.results.slice(0, 6)

  const waUrl = getWhatsAppUrl(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '94770000000',
    `Hello! I am interested in visiting ${destination.name}.`
  )

  return (
    <>
      <PageHero
        title={destination.name}
        subtitle={`${destination.province} Province`}
        image={getImageUrl(destination.image)}
        breadcrumbs={[{ label: 'Destinations', href: '/destinations' }, { label: destination.name }]}
      />

      <div className="bg-white">
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <span className="badge-province">
                    <MapPin className="w-3 h-3" />
                    {destination.province} Province
                  </span>
                </div>
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                  About {destination.name}
                </h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{destination.description}</p>
              </section>

              {/* Gallery */}
              {destination.images && destination.images.length > 0 && (
                <section>
                  <h2 className="text-xl font-heading font-bold text-gray-900 mb-5">Photo Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {destination.images.map((img) => (
                      <div key={img.id} className="relative h-48 rounded-xl overflow-hidden">
                        <Image
                          src={getImageUrl(img.image)}
                          alt={img.caption || destination.name}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Available trips */}
              {trips.length > 0 && (
                <section>
                  <h2 className="text-xl font-heading font-bold text-gray-900 mb-5">
                    Available Trips in {destination.name}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {trips.map((trip) => (
                      <TripCard key={trip.id} trip={trip} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* CTA card */}
              <div className="bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-2xl p-6 text-white">
                <h3 className="font-heading font-bold text-xl mb-2">Plan Your Trip</h3>
                <p className="text-cyan-100 text-sm mb-5">
                  Interested in visiting {destination.name}? Get in touch with our experts.
                </p>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-3 rounded-xl transition-colors w-full justify-center mb-3">
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Inquiry
                </a>
                <Link href="/contact" className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-5 py-3 rounded-xl transition-colors w-full justify-center">
                  Request Details
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Map coordinates */}
              {(destination.map_lat && destination.map_lng) && (
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-3">Location</h3>
                  <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
                    <a
                      href={`https://maps.google.com/?q=${destination.map_lat},${destination.map_lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-600 text-sm hover:underline flex items-center gap-1"
                    >
                      <MapPin className="w-4 h-4" />
                      View on Google Maps
                    </a>
                  </div>
                </div>
              )}

              {/* Inquiry form */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-heading font-bold text-lg text-gray-900 mb-5">Send Inquiry</h3>
                <InquiryForm destinationId={destination.id} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
