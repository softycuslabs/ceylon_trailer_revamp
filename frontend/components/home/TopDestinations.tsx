'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import type { Destination } from '@/lib/types'
import { getImageUrl } from '@/lib/utils'

// Fallback destinations if API returns empty
const FALLBACK_DESTINATIONS = [
  {
    id: 1, name: 'Jaffna', slug: 'jaffna', province: 'Northern', short_description: 'Culture Beyond Borders',
    image: 'https://images.unsplash.com/photo-1621244368414-82e5c2b93c78?w=600&q=80',
  },
  {
    id: 2, name: 'Ella', slug: 'ella', province: 'Uva', short_description: 'Misty Mountain Escape',
    image: 'https://images.unsplash.com/photo-1571723141164-d89e3c67f6eb?w=600&q=80',
  },
  {
    id: 3, name: 'Anuradhapura', slug: 'anuradhapura', province: 'North Central', short_description: 'Ancient Kingdom',
    image: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=600&q=80',
  },
  {
    id: 4, name: 'Sigiriya', slug: 'sigiriya', province: 'Central', short_description: 'Rock Fortress Wonder',
    image: 'https://images.unsplash.com/photo-1586096538339-0a0df57d50dd?w=600&q=80',
  },
]

interface Props {
  destinations: Destination[]
}

export default function TopDestinations({ destinations }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const items = destinations.length > 0 ? destinations : (FALLBACK_DESTINATIONS as unknown as Destination[])

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' })
    }
  }

  return (
    <section className="py-20 bg-gray-50" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Top Destinations</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Explore Sri Lanka's most breathtaking destinations, each with its own unique charm and culture.
          </p>
        </motion.div>

        {/* Cards scroll container */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {items.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="min-w-[300px] md:min-w-[340px] snap-start"
              >
                <Link href={`/destinations/${dest.slug}`} className="block group">
                  <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={getImageUrl(dest.image) || `https://images.unsplash.com/photo-1586096538339-0a0df57d50dd?w=600&q=80`}
                      alt={dest.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    {/* Province badge */}
                    <div className="absolute top-4 left-4">
                      <span className="badge-province">
                        <MapPin className="w-3 h-3" />
                        {dest.province}
                      </span>
                    </div>
                    {/* Bottom content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-white font-heading font-bold text-xl">{dest.name}</h3>
                      <p className="text-gray-300 text-sm mt-1">{dest.short_description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all shadow-sm"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all shadow-sm"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/destinations" className="btn-primary">
            View All Destinations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
