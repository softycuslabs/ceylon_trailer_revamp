import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Heart, ArrowRight } from 'lucide-react'
import type { Destination } from '@/lib/types'
import { getImageUrl, truncateText } from '@/lib/utils'

interface Props {
  destination: Destination
}

export default function DestinationCard({ destination }: Props) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md card-hover border border-gray-100">
      {/* Image */}
      <div className="relative h-56 overflow-hidden group">
        <Image
          src={getImageUrl(destination.image) || 'https://images.unsplash.com/photo-1586096538339-0a0df57d50dd?w=600&q=80'}
          alt={destination.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Province badge */}
        <div className="absolute bottom-3 left-3">
          <span className="badge-province">
            <MapPin className="w-3 h-3" />
            {destination.province}
          </span>
        </div>

        {/* Wishlist */}
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors group/heart">
          <Heart className="w-4 h-4 text-gray-500 group-hover/heart:text-rose-500 transition-colors" />
        </button>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="font-heading font-bold text-lg text-gray-900 mb-1">{destination.name}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          {truncateText(destination.short_description || destination.description, 100)}
        </p>
        <Link
          href={`/destinations/${destination.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 border border-cyan-500 hover:bg-cyan-500 hover:text-white px-4 py-2 rounded-full transition-all duration-200"
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
