'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'

const WHATSAPP_NUM = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '94770000000'
const HERO_MSG = 'Hello! I would like to plan a trip to Sri Lanka.'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-start overflow-hidden bg-gradient-to-br from-white via-cyan-50/30 to-blue-50/40 pt-20">

      {/* Decorative background circles */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-cyan-100/40 rounded-full -translate-y-1/4 translate-x-1/4 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/30 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl pointer-events-none" />

      <div className="container-custom relative z-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left — Text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-5"
            >
              <span className="w-6 h-px bg-cyan-500" />
              <span className="text-cyan-600 font-semibold text-sm tracking-wide">+ Join with Us</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-[3.25rem] font-heading font-bold text-gray-900 leading-tight mb-5"
            >
              Creating{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                Unforgettable
              </span>{' '}
              Travel Experiences With Us
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-500 text-base mb-3 font-medium"
            >
              Plan Your Dream Trip Now
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              <Link
                href="/trips"
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-cyan-200 inline-flex items-center gap-2"
              >
                Plan Your Dream Trip
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={getWhatsAppUrl(WHATSAPP_NUM, HERO_MSG)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-green-200 inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.029 18.88a7.857 7.857 0 01-3.977-1.074l-2.795.733.748-2.732A7.877 7.877 0 014.12 12.03C4.12 7.625 7.623 4.12 12.03 4.12s7.91 3.505 7.91 7.91-3.504 7.85-7.911 7.85z" />
                </svg>
                Chat On WhatsApp
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex gap-8 flex-wrap"
            >
              {[
                { value: '50+', label: 'Tours Completed' },
                { value: '50+', label: 'Destinations' },
                { value: '100+', label: 'Happy Travelers' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-cyan-600 font-heading">{stat.value}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Collage image */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end relative"
          >
            <div className="relative w-full max-w-lg">
              {/* Decorative shape — top left */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -left-6 w-20 h-20 z-10 opacity-80"
              >
                <Image src="/images/shape-2-251x244.webp" alt="" width={80} height={80} className="object-contain" />
              </motion.div>

              {/* Decorative shape — bottom right */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -right-4 w-16 h-16 z-10 opacity-70"
              >
                <Image src="/images/shape-3-239x244.webp" alt="" width={64} height={64} className="object-contain" />
              </motion.div>

              {/* Decorative shape — middle right */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute top-1/2 -right-8 w-14 h-14 z-10 opacity-60"
              >
                <Image src="/images/shape-4.webp" alt="" width={56} height={56} className="object-contain" />
              </motion.div>

              <Image
                src="/images/ceylontrailor-header-right-image.webp"
                alt="Sri Lanka Travel"
                width={700}
                height={700}
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
