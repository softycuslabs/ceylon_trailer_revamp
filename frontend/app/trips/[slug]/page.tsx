import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { MapPin, Clock, DollarSign, CheckCircle, MessageCircle, ArrowRight, Star } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import InquiryForm from '@/components/shared/InquiryForm'
import { getTrip, getAllTripSlugs } from '@/lib/api'
import { getWhatsAppUrl, formatPrice, getImageUrl } from '@/lib/utils'
import Script from 'next/script'

export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const slugs = await getAllTripSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const trip = await getTrip(params.slug)
    return {
      title: trip.title,
      description: trip.short_description || trip.description.slice(0, 160),
      openGraph: {
        title: `${trip.title} — Ceylon Trailer`,
        description: trip.short_description,
        images: trip.cover_image ? [{ url: getImageUrl(trip.cover_image) }] : [],
      },
    }
  } catch {
    return { title: 'Trip Not Found' }
  }
}

export default async function TripDetailPage({ params }: { params: { slug: string } }) {
  let trip
  try {
    trip = await getTrip(params.slug)
  } catch {
    notFound()
  }

  const waUrl = getWhatsAppUrl(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '94770000000',
    `Hello! I am interested in the trip ${trip.title}`
  )

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: trip.title,
    description: trip.short_description || trip.description,
    touristType: trip.trip_type,
    itinerary: trip.itinerary?.map((day) => ({
      '@type': 'TouristAttraction',
      name: day.title,
      description: day.description,
    })),
  }

  return (
    <>
      <Script id="trip-structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>

      <PageHero
        title={trip.title}
        image={getImageUrl(trip.cover_image)}
        breadcrumbs={[
          { label: 'Trips', href: '/trips' },
          { label: trip.title }
        ]}
      />

      <div className="bg-white">
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Meta bar */}
              <div className="flex flex-wrap gap-4 items-center py-4 border-y border-gray-100">
                {trip.destination && (
                  <span className="flex items-center gap-1.5 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 text-cyan-500" />
                    {trip.destination.name}, {trip.destination.province}
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-gray-600 text-sm">
                  <Clock className="w-4 h-4 text-cyan-500" />
                  {trip.duration_days} {trip.duration_days === 1 ? 'Day' : 'Days'}
                </span>
                {trip.price && (
                  <span className="flex items-center gap-1.5 text-cyan-600 font-semibold">
                    <DollarSign className="w-4 h-4" />
                    From {formatPrice(trip.price)} per person
                  </span>
                )}
                <span className="badge-province capitalize">{trip.trip_type}</span>
              </div>

              {/* Description */}
              <section>
                <h2 className="text-xl font-heading font-bold text-gray-900 mb-4">About This Trip</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{trip.description}</p>
              </section>

              {/* Highlights */}
              {trip.highlights && trip.highlights.length > 0 && (
                <section>
                  <h2 className="text-xl font-heading font-bold text-gray-900 mb-4">Trip Highlights</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {trip.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-gray-600 text-sm">
                        <CheckCircle className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Activities */}
              {trip.activities && trip.activities.length > 0 && (
                <section>
                  <h2 className="text-xl font-heading font-bold text-gray-900 mb-4">Activities</h2>
                  <div className="flex flex-wrap gap-2">
                    {trip.activities.map((activity, i) => (
                      <span key={i} className="bg-cyan-50 text-cyan-700 text-sm font-medium px-3 py-1 rounded-full border border-cyan-200 capitalize">
                        {activity}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Itinerary */}
              {trip.itinerary && trip.itinerary.length > 0 && (
                <section>
                  <h2 className="text-xl font-heading font-bold text-gray-900 mb-5">Day-by-Day Itinerary</h2>
                  <div className="space-y-4">
                    {trip.itinerary.map((day) => (
                      <div key={day.id} className="border border-gray-100 rounded-xl overflow-hidden">
                        <div className="bg-cyan-50 px-5 py-3 flex items-center gap-3">
                          <span className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {day.day_number}
                          </span>
                          <h3 className="font-semibold text-gray-900">{day.title}</h3>
                        </div>
                        <div className="px-5 py-4">
                          <p className="text-gray-600 text-sm leading-relaxed">{day.description}</p>
                          {day.activities && day.activities.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {day.activities.map((a, i) => (
                                <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{a}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Photo gallery */}
              {trip.images && trip.images.length > 0 && (
                <section>
                  <h2 className="text-xl font-heading font-bold text-gray-900 mb-5">Photo Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {trip.images.map((img) => (
                      <div key={img.id} className="relative h-48 rounded-xl overflow-hidden">
                        <Image src={getImageUrl(img.image)} alt={img.caption || trip.title} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              {/* Booking card */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-500 to-cyan-700 p-5 text-white">
                  <div className="text-sm text-cyan-100 mb-1">Starting from</div>
                  <div className="text-3xl font-heading font-bold">
                    {trip.price ? formatPrice(trip.price) : 'Contact Us'}
                  </div>
                  <div className="text-cyan-100 text-sm">per person</div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-sm py-2 border-b border-gray-100">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-medium text-gray-900">{trip.duration_days} {trip.duration_days === 1 ? 'Day' : 'Days'}</span>
                  </div>
                  {trip.destination && (
                    <div className="flex items-center justify-between text-sm py-2 border-b border-gray-100">
                      <span className="text-gray-500">Location</span>
                      <span className="font-medium text-gray-900">{trip.destination.name}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm py-2 border-b border-gray-100">
                    <span className="text-gray-500">Type</span>
                    <span className="font-medium text-gray-900 capitalize">{trip.trip_type}</span>
                  </div>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3.5 rounded-xl transition-colors mt-4"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Inquiry
                  </a>
                </div>
              </div>

              {/* Inquiry form */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-heading font-bold text-lg text-gray-900 mb-5">Request Details</h3>
                <InquiryForm tripId={trip.id} tripTitle={trip.title} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
