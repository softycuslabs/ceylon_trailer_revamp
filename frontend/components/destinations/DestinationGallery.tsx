'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ZoomIn, LayoutGrid } from 'lucide-react'
import type { DestinationImage } from '@/lib/types'

interface Props {
  images: DestinationImage[]
  destinationName: string
}

export default function DestinationGallery({ images, destinationName }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const prev = useCallback(() => setActiveIndex((i) => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setActiveIndex((i) => (i + 1) % images.length), [images.length])

  if (!images || images.length === 0) return null

  const active = images[activeIndex]

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-heading font-bold text-gray-900 flex items-center gap-2">
          <LayoutGrid className="w-5 h-5 text-cyan-500" />
          Photo Gallery
        </h2>
        <span className="text-sm text-gray-400">{images.length} photos</span>
      </div>

      {/* Main image */}
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-[16/9] group">
        <Image
          key={active.id}
          src={active.image}
          alt={active.caption || destinationName}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 66vw"
          priority
        />

        {/* Gradient overlay for caption */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent h-24 pointer-events-none" />

        {/* Caption */}
        {active.caption && (
          <p className="absolute bottom-3 left-4 text-white text-sm font-medium drop-shadow">
            {active.caption}
          </p>
        )}

        {/* Counter badge */}
        <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
          {activeIndex + 1} / {images.length}
        </div>

        {/* Zoom / fullscreen button */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          aria-label="View fullscreen"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {/* Prev / Next arrows (only if > 1 image) */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-thin">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(i)}
              className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-all duration-200 ${
                i === activeIndex
                  ? 'ring-2 ring-cyan-500 ring-offset-1 opacity-100'
                  : 'opacity-60 hover:opacity-90'
              }`}
              aria-label={img.caption || `Photo ${i + 1}`}
            >
              <Image
                src={img.image}
                alt={img.caption || `Photo ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {activeIndex + 1} / {images.length}
          </div>

          {/* Prev */}
          {images.length > 1 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); prev() }}
              aria-label="Previous"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
          )}

          {/* Main lightbox image */}
          <div
            className="relative w-full max-w-5xl max-h-[85vh] mx-12"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex].image}
              alt={images[activeIndex].caption || destinationName}
              width={1200}
              height={800}
              className="object-contain w-full h-full max-h-[80vh] rounded-xl"
            />
            {images[activeIndex].caption && (
              <p className="text-center text-white/70 text-sm mt-3">{images[activeIndex].caption}</p>
            )}
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); next() }}
              aria-label="Next"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          )}

          {/* Lightbox thumbnail strip */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setActiveIndex(i) }}
                  className={`w-2 h-2 rounded-full transition-all ${i === activeIndex ? 'bg-white w-5' : 'bg-white/40 hover:bg-white/70'}`}
                  aria-label={`Go to photo ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
