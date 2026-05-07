'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronLeft, ChevronRight, X, Camera, LayoutGrid } from 'lucide-react'
import type { GalleryImage } from '@/lib/types'
import { getImageUrl } from '@/lib/utils'

const FALLBACK_IMAGES = [
  { id: 1, title: 'Ceylon Trailer – Sri Lanka',   image: '/images/gallery/ceylon-trailor-slide01.jpg' },
  { id: 2, title: 'Ceylon Trailer – Sri Lanka',   image: '/images/gallery/ceylon-trailor-slide02.jpg' },
  { id: 3, title: 'Ceylon Trailer – Sri Lanka',   image: '/images/gallery/ceylon-trailor-slide03.jpg' },
  { id: 4, title: 'Ceylon Trailer – Sri Lanka',   image: '/images/gallery/ceylon-trailor-slide04.jpg' },
]

interface Props { images: GalleryImage[] }

const INTERVAL = 5000

export default function PhotoGallery({ images }: Props) {
  const items = images.length > 0 ? images : (FALLBACK_IMAGES as unknown as GalleryImage[])
  const [current, setCurrent]       = useState(0)
  const [isPlaying, setIsPlaying]   = useState(true)
  const [progress, setProgress]     = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [lightbox, setLightbox]     = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const progressRef = useRef<NodeJS.Timeout | null>(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const next = useCallback(() => { setCurrent(i => (i + 1) % items.length); setProgress(0) }, [items.length])
  const prev = useCallback(() => { setCurrent(i => (i - 1 + items.length) % items.length); setProgress(0) }, [items.length])

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (progressRef.current) clearInterval(progressRef.current)
    setProgress(0)
    if (!isPlaying || lightbox) return
    const tick = 50
    progressRef.current = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + (tick / INTERVAL) * 100))
    }, tick)
    intervalRef.current = setInterval(next, INTERVAL)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (progressRef.current) clearInterval(progressRef.current)
    }
  }, [isPlaying, next, current, lightbox])

  const goTo = (i: number) => { setCurrent(i); setProgress(0); setIsPlaying(false) }
  const onTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX)
  const onTouchEnd   = (e: React.TouchEvent) => {
    const diff = touchStart - e.changedTouches[0].clientX
    if (diff > 50)       { next(); setIsPlaying(false) }
    else if (diff < -50) { prev(); setIsPlaying(false) }
  }

  const active = items[current]

  return (
    <section className="py-16 bg-gray-50" ref={ref}>
      <div className="container-custom">

        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-6 max-w-4xl mx-auto"
        >
          <div>
            <h2 className="text-2xl font-heading font-bold text-gray-900 flex items-center gap-2">
              <Camera className="w-6 h-6 text-cyan-500" />
              Photo Gallery
            </h2>
            <p className="text-gray-500 text-sm mt-0.5">Discover Sri Lanka through our lens</p>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 border border-cyan-400 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 px-4 py-2 rounded-full transition-all"
          >
            <LayoutGrid className="w-4 h-4" />
            View All Photos
          </Link>
        </motion.div>

        {/* Gallery card */}
        <div className="w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative w-full rounded-2xl overflow-hidden aspect-[16/9] shadow-2xl"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Clickable image area */}
            <div
              className="absolute inset-0 cursor-pointer"
              onClick={() => { setLightbox(true); setIsPlaying(false) }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={getImageUrl(active.image)}
                    alt={active.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 896px"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dark control bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm px-6 py-4 flex items-center gap-4 z-10">
              <div className="flex-shrink-0 min-w-[160px]">
                <p className="text-white font-bold text-base leading-tight">Famous Photo Gallery</p>
                <p className="text-gray-400 text-xs mt-0.5">Click Photo To Enlarge</p>
              </div>
              <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-none"
                  style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #6366f1, #06b6d4)' }}
                />
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-white/70 text-sm font-medium tabular-nums">
                  {String(current + 1).padStart(2, '0')} / {items.length}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); setIsPlaying(false) }}
                  className="w-9 h-9 bg-white/20 hover:bg-cyan-500 text-white rounded-full flex items-center justify-center transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); setIsPlaying(false) }}
                  className="w-9 h-9 bg-white/20 hover:bg-cyan-500 text-white rounded-full flex items-center justify-center transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-1.5 mt-4">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? 'w-8 bg-cyan-500' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => { setLightbox(false); setIsPlaying(true) }}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            onClick={() => { setLightbox(false); setIsPlaying(true) }}
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {current + 1} / {items.length}
          </div>

          {/* Prev */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Previous"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          {/* Image */}
          <div className="relative max-w-5xl w-full mx-12" onClick={(e) => e.stopPropagation()}>
            <Image
              src={getImageUrl(active.image)}
              alt={active.title}
              width={1200}
              height={800}
              className="object-contain w-full max-h-[80vh] rounded-xl mx-auto"
            />
            <p className="text-center text-white/70 text-sm mt-3">{active.title}</p>
          </div>

          {/* Next */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Next"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Dot strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); goTo(i) }}
                className={`h-1.5 rounded-full transition-all ${i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/30'}`}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>

          {/* View all link */}
          <Link
            href="/gallery"
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-4 right-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <LayoutGrid className="w-4 h-4" />
            View Full Gallery
          </Link>
        </div>
      )}
    </section>
  )
}
