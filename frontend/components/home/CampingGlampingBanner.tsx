'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { TreePine, Star, ArrowRight, MapPin, Flame, Mountain, Bath, Coffee } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'

const WHATSAPP_NUM = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '94770000000'

const EXPERIENCES = [
  {
    type: 'Camping',
    name: 'Knuckles Forest Camp',
    location: 'Knuckles Mountain Range, Kandy',
    tagline: 'Raw nature, open skies',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=900&q=85',
    badge: { label: 'Rustic & Wild', color: 'bg-cyan-500' },
    icon: TreePine,
    features: [
      { icon: Flame,    text: 'Campfire nights' },
      { icon: Mountain, text: 'Mountain hiking' },
    ],
  },
  {
    type: 'Glamping',
    name: 'Ella Wilderness Glamping',
    location: 'Ella, Uva Province',
    tagline: 'Luxury meets the wild',
    image: 'https://images.unsplash.com/photo-1533575770077-052fa2c609fc?w=900&q=85',
    badge: { label: 'Luxury Nature', color: 'bg-blue-500' },
    icon: Star,
    features: [
      { icon: Bath,   text: 'Private bathroom' },
      { icon: Coffee, text: 'Breakfast included' },
    ],
  },
]

export default function CampingGlampingBanner() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    /* Site-matching deep blue background — same gradient as the preloader */
    <section
      ref={ref}
      className="relative overflow-hidden py-12 md:py-16"
      style={{ background: 'linear-gradient(155deg, #062535 0%, #083d52 40%, #0a5068 70%, #0d3d50 100%)' }}
    >
      {/* Subtle noise-texture overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 pointer-events-none" />

      {/* Decorative glowing orbs — mirrors the hero section treatment */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/8 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/8 rounded-full translate-y-1/3 -translate-x-1/4 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 container-custom">

        {/* ── HEADER ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-cyan-400/70" />
            <span className="text-cyan-400 font-semibold text-xs tracking-[0.2em] uppercase">
              Outdoor Experiences · Sri Lanka
            </span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-cyan-400/70" />
          </div>

          {/* Headline */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white leading-tight mb-3">
            Camping &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Glamping
            </span>
            <span className="block mt-1">in Sri Lanka</span>
          </h2>

          <p className="text-white/55 text-sm md:text-base max-w-xl mx-auto">
            Sleep under the stars — from rustic mountain campsites to
            luxury canvas retreats deep in the wilderness.
          </p>
        </motion.div>

        {/* ── EXPERIENCE CARDS ────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7 max-w-5xl mx-auto">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={exp.type}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.15 }}
            >
              <Link
                href="/camping-glamping"
                className="group relative block rounded-3xl overflow-hidden h-[260px] md:h-[300px] shadow-2xl shadow-black/40 ring-1 ring-white/10 hover:ring-cyan-400/50 transition-all duration-400"
              >
                {/* Card image */}
                <Image
                  src={exp.image}
                  alt={exp.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Base dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#062535]/95 via-[#062535]/40 to-transparent" />

                {/* Hover overlay — subtle cyan tint */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                {/* ── TOP: type badge ── */}
                <div className="absolute top-5 left-5 flex items-center gap-2">
                  <span className={`${exp.badge.color} text-white text-[11px] font-bold px-3 py-1 rounded-full tracking-wide`}>
                    {exp.type}
                  </span>
                  <span className="bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 text-[10px] font-medium px-2.5 py-1 rounded-full">
                    {exp.badge.label}
                  </span>
                </div>

                {/* ── BOTTOM: card content ── */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {/* Tagline */}
                  <p className="text-cyan-300/80 text-[10px] font-semibold uppercase tracking-[0.15em] mb-1">
                    {exp.tagline}
                  </p>

                  {/* Name */}
                  <h3 className="text-white font-heading font-bold text-base md:text-lg leading-tight mb-1 group-hover:text-cyan-100 transition-colors duration-300">
                    {exp.name}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center gap-1.5 text-white/50 text-xs mb-3">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span>{exp.location}</span>
                  </div>

                  {/* Features row */}
                  <div className="flex gap-2 mb-3">
                    {exp.features.map(({ icon: Icon, text }) => (
                      <div
                        key={text}
                        className="flex items-center gap-1 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-1 text-white/70 text-[11px]"
                      >
                        <Icon className="w-3 h-3 text-cyan-400 shrink-0" />
                        {text}
                      </div>
                    ))}
                  </div>

                  {/* CTA row */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 bg-cyan-500 group-hover:bg-cyan-400 text-white font-semibold text-xs px-4 py-2 rounded-full transition-colors duration-300">
                      Explore
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>

                    <div className="w-8 h-8 rounded-full bg-white/8 border border-white/10 flex items-center justify-center group-hover:border-cyan-400/40 transition-colors duration-300">
                      <exp.icon className="w-4 h-4 text-white/50 group-hover:text-cyan-400 transition-colors duration-300" />
                    </div>
                  </div>
                </div>

              </Link>
            </motion.div>
          ))}
        </div>

        {/* ── BOTTOM CTA ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
        >
          <Link
            href="/camping-glamping"
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-cyan-900/40 text-sm"
          >
            View All Experiences
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={getWhatsAppUrl(WHATSAPP_NUM, 'Hello! I would like to book a camping or glamping experience in Sri Lanka.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/8 hover:bg-white/15 border border-white/15 hover:border-white/30 text-white font-semibold px-8 py-3.5 rounded-full backdrop-blur-sm transition-all duration-200 text-sm"
          >
            Book on WhatsApp
          </a>
        </motion.div>

      </div>
    </section>
  )
}
