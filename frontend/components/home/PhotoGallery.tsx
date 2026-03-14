'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { GalleryImage } from '@/lib/types'
import { getImageUrl } from '@/lib/utils'

const FALLBACK_IMAGES = [
  { id: 1, title: 'Nine Arch Bridge', image: 'https://images.unsplash.com/photo-1571723141164-d89e3c67f6eb?w=800&q=80' },
  { id: 2, title: 'Sigiriya Rock', image: 'https://images.unsplash.com/photo-1586096538339-0a0df57d50dd?w=800&q=80' },
  { id: 3, title: 'Temple of the Tooth', image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&q=80' },
  { id: 4, title: 'Galle Fort', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80' },
  { id: 5, title: 'Tea Plantations', image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80' },
]

interface Props {
  images: GalleryImage[]
}

export default function PhotoGallery({ images }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const items = images.length > 0 ? images : (FALLBACK_IMAGES as unknown as GalleryImage[])

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -600 : 600, behavior: 'smooth' })
    }
  }

  return (
    <section className="py-0 bg-ceylon-dark overflow-hidden" ref={ref}>
      <div className="relative">
        {/* Header overlay */}
        <div className="absolute top-0 left-0 z-10 p-8 text-white">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-heading font-bold">Famous Photo Gallery</h2>
            <p className="text-gray-400 text-sm mt-1">Slide to Explore</p>
          </motion.div>
        </div>

        {/* Navigation buttons */}
        <div className="absolute top-6 right-8 z-10 flex gap-3">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 bg-white/20 hover:bg-cyan-500 rounded-full flex items-center justify-center text-white transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 bg-white/20 hover:bg-cyan-500 rounded-full flex items-center justify-center text-white transition-all"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable gallery */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative flex-shrink-0 w-[500px] h-[350px] md:h-[420px]"
            >
              <Image
                src={getImageUrl(img.image)}
                alt={img.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-semibold">{img.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
