'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ZoomIn } from 'lucide-react'
import type { GalleryImage } from '@/lib/types'
import { getImageUrl } from '@/lib/utils'

const CATEGORIES = ['all', 'destinations', 'wildlife', 'culture', 'landscape', 'people', 'food']

const FALLBACK_IMAGES: Partial<GalleryImage>[] = [
  { id: 1, title: 'Sigiriya Rock Fortress', image: 'https://images.unsplash.com/photo-1586096538339-0a0df57d50dd?w=800&q=80', category: 'destinations' },
  { id: 2, title: 'Kandy Temple', image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&q=80', category: 'culture' },
  { id: 3, title: 'Yala Leopard', image: 'https://images.unsplash.com/photo-1535083252457-6080e8e96492?w=800&q=80', category: 'wildlife' },
  { id: 4, title: 'Tea Fields Ella', image: 'https://images.unsplash.com/photo-1571723141164-d89e3c67f6eb?w=800&q=80', category: 'landscape' },
  { id: 5, title: 'Galle Fort', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80', category: 'destinations' },
  { id: 6, title: 'Local Food', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80', category: 'food' },
  { id: 7, title: 'Elephant Minneriya', image: 'https://images.unsplash.com/photo-1569706971306-71f255e3a5e0?w=800&q=80', category: 'wildlife' },
  { id: 8, title: 'Nine Arch Bridge', image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80', category: 'landscape' },
  { id: 9, title: 'Mirissa Beach', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', category: 'destinations' },
]

interface Props { initialImages: GalleryImage[] }

export default function GalleryClient({ initialImages }: Props) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null)

  const images: GalleryImage[] = initialImages.length > 0 ? initialImages : (FALLBACK_IMAGES as GalleryImage[])
  const filtered = activeCategory === 'all' ? images : images.filter((img) => img.category === activeCategory)

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom">
        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-cyan-50 hover:text-cyan-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {filtered.map((img) => (
            <div
              key={img.id}
              className="relative break-inside-avoid overflow-hidden rounded-xl cursor-pointer group"
              onClick={() => setLightbox(img)}
            >
              <div className="relative">
                <Image
                  src={getImageUrl(img.image)}
                  alt={img.title}
                  width={400}
                  height={300}
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white/70 hover:text-white" aria-label="Close">
            <X className="w-8 h-8" />
          </button>
          <div className="relative max-w-5xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={getImageUrl(lightbox.image)}
              alt={lightbox.title}
              width={1200}
              height={800}
              className="object-contain max-h-[85vh] mx-auto rounded-xl"
            />
            {lightbox.caption && (
              <p className="text-white/70 text-center mt-3 text-sm">{lightbox.caption}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
