'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Mountain, Waves, TreePine, Landmark } from 'lucide-react'
import { useState, useRef } from 'react'

// ─── Types & icon map ──────────────────────────────────────────────────────

type IconKey = 'Mountain' | 'Waves' | 'TreePine' | 'Landmark' | 'MapPin'
const ICONS = { Mountain, Waves, TreePine, Landmark, MapPin }

type Destination = {
  name: string
  slug: string
  x: number        // % from left of map image
  y: number        // % from top of map image
  description: string
  icon: IconKey
}

// ─── Pin positions are calibrated to the Sri-lankan-Image-380x700-1.png ───

const destinations: Destination[] = [
  {
    name: 'Jaffna',
    slug: 'jaffna',
    x: 18, y: 10,
    description: 'Vibrant northern city with rich Tamil culture, ancient temples and unique cuisine.',
    icon: 'MapPin',
  },
  {
    name: 'Wilpattu National Park',
    slug: 'wilpattu',
    x: 18, y: 38,
    description: "Sri Lanka's largest national park, home to leopards and sloth bears in pristine wilderness.",
    icon: 'TreePine',
  },
  {
    name: 'Anuradhapura',
    slug: 'anuradhapura',
    x: 35, y: 42,
    description: 'Ancient capital with UNESCO-listed Buddhist monuments and the sacred Sri Maha Bodhi tree.',
    icon: 'Landmark',
  },
  {
    name: 'Trincomalee',
    slug: 'trincomalee',
    x: 68, y: 36,
    description: 'Natural deep-water harbour with crystal-clear beaches, coral reefs and hot springs.',
    icon: 'Waves',
  },
  {
    name: 'Polonnaruwa',
    slug: 'polonnaruwa',
    x: 57, y: 48,
    description: 'Medieval royal city with remarkable well-preserved ancient ruins and rock sculptures.',
    icon: 'Landmark',
  },
  {
    name: 'Dambulla Cave Temple',
    slug: 'dambulla',
    x: 44, y: 53,
    description: 'UNESCO World Heritage cave complex with 153 Buddha statues carved directly into rock.',
    icon: 'Landmark',
  },
  {
    name: 'Sigiriya',
    slug: 'sigiriya',
    x: 48, y: 51,
    description: 'Iconic 5th-century rock fortress rising 200m above the surrounding jungle floor.',
    icon: 'Landmark',
  },
  {
    name: 'Kandy',
    slug: 'kandy',
    x: 39, y: 65,
    description: 'Cultural capital home to the sacred Temple of the Tooth Relic of the Buddha.',
    icon: 'Landmark',
  },
  {
    name: 'Ambuluwawa',
    slug: 'ambuluwawa',
    x: 55, y: 67,
    description: 'Multi-religious tower complex with breathtaking panoramic views of central Sri Lanka.',
    icon: 'Mountain',
  },
  {
    name: 'Adams Peak',
    slug: 'adams-peak',
    x: 40, y: 77,
    description: 'Sacred pilgrimage mountain with spectacular sunrise views from the 2,243m summit.',
    icon: 'Mountain',
  },
  {
    name: 'Nuwara Eliya',
    slug: 'nuwara-eliya',
    x: 47, y: 78,
    description: "Sri Lanka's 'Little England' — a cool highland retreat surrounded by lush tea estates.",
    icon: 'Mountain',
  },
  {
    name: 'Ella',
    slug: 'ella',
    x: 75, y: 77,
    description: 'Charming highland village famous for the Nine Arch Bridge and misty mountain walks.',
    icon: 'Mountain',
  },
  {
    name: 'Arugam Bay',
    slug: 'arugam-bay',
    x: 93, y: 75,
    description: 'World-class surf destination on the east coast with golden beaches and laid-back vibes.',
    icon: 'Waves',
  },
  {
    name: 'Sinharaja',
    slug: 'sinharaja',
    x: 36, y: 85,
    description: 'UNESCO World Heritage rainforest reserve — the last viable lowland rainforest in Sri Lanka.',
    icon: 'TreePine',
  },
  {
    name: 'Hikkaduwa',
    slug: 'hikkaduwa',
    x: 21, y: 89,
    description: 'Vibrant beach town with colorful coral reefs, sea turtles and a lively surf culture.',
    icon: 'Waves',
  },
  {
    name: 'Galle',
    slug: 'galle',
    x: 25, y: 92,
    description: 'Atmospheric Dutch colonial fort city — a UNESCO World Heritage blend of East and West.',
    icon: 'Landmark',
  },
  {
    name: 'Mirissa',
    slug: 'mirissa',
    x: 30, y: 94,
    description: 'Pristine crescent-shaped beach and the best spot in Asia for blue whale watching.',
    icon: 'Waves',
  },
  {
    name: 'Yala National Park',
    slug: 'yala',
    x: 80, y: 83,
    description: "World-famous wildlife reserve with the highest leopard density on the planet.",
    icon: 'TreePine',
  },
]

// ─── Icon color map ────────────────────────────────────────────────────────

const ICON_COLORS: Record<IconKey, string> = {
  Landmark: 'text-amber-600',
  Mountain: 'text-emerald-600',
  Waves:    'text-blue-500',
  TreePine: 'text-green-600',
  MapPin:   'text-cyan-600',
}

const ICON_BG: Record<IconKey, string> = {
  Landmark: 'bg-amber-50',
  Mountain: 'bg-emerald-50',
  Waves:    'bg-blue-50',
  TreePine: 'bg-green-50',
  MapPin:   'bg-cyan-50',
}

const PIN_COLORS: Record<IconKey, string> = {
  Landmark: 'bg-amber-500',
  Mountain: 'bg-emerald-500',
  Waves:    'bg-blue-500',
  TreePine: 'bg-green-600',
  MapPin:   'bg-cyan-500',
}

// ─── Single pin + popup ────────────────────────────────────────────────────

function DestPin({
  dest,
  active,
  onEnter,
  onLeave,
}: {
  dest: Destination
  active: boolean
  onEnter: () => void
  onLeave: () => void
}) {
  const Icon = ICONS[dest.icon]

  // Smart popup placement so it never goes off the map edges
  const above   = dest.y > 32          // show popup above when pin is in lower portion
  const nearLeft  = dest.x < 32        // align popup to left edge of pin
  const nearRight = dest.x > 68        // align popup to right edge of pin

  const popupPos = [
    above ? 'bottom-full mb-2.5' : 'top-full mt-2.5',
    nearLeft  ? 'left-0'
      : nearRight ? 'right-0'
      : 'left-1/2 -translate-x-1/2',
  ].join(' ')

  const arrowPos = [
    above
      ? 'bottom-[-5px] border-r border-b border-gray-100'
      : 'top-[-5px] border-l border-t border-gray-100',
    nearLeft  ? 'left-4'
      : nearRight ? 'right-4'
      : 'left-1/2 -translate-x-1/2',
  ].join(' ')

  return (
    <div
      className="absolute z-10"
      style={{ left: `${dest.x}%`, top: `${dest.y}%`, transform: 'translate(-50%, -50%)' }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Pulse ring when active */}
      {active && (
        <motion.div
          className={`absolute inset-0 rounded-full ${PIN_COLORS[dest.icon]}`}
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.7, repeat: Infinity }}
        />
      )}

      {/* Pin dot */}
      <div
        className={`
          relative w-3 h-3 rounded-full border-2 border-white shadow-lg cursor-pointer
          transition-transform duration-150
          ${active ? 'scale-[1.8]' : 'scale-100 hover:scale-150'}
          ${active ? PIN_COLORS[dest.icon] : 'bg-gray-700'}
        `}
      />

      {/* Popup — pointer-events enabled so the link is clickable.
          onMouseEnter/Leave keeps it open while the cursor is inside. */}
      <AnimatePresence>
        {active && (
          <motion.div
            className={`absolute z-50 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3.5 ${popupPos}`}
            initial={{ opacity: 0, scale: 0.88, y: above ? 6 : -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
          >
            {/* Arrow tip */}
            <div className={`absolute w-2.5 h-2.5 bg-white rotate-45 ${arrowPos}`} />

            {/* Icon + name */}
            <div className="flex items-center gap-2 mb-1.5">
              <div className={`w-7 h-7 ${ICON_BG[dest.icon]} rounded-lg flex items-center justify-center shrink-0`}>
                <Icon className={`w-4 h-4 ${ICON_COLORS[dest.icon]}`} />
              </div>
              <span className="font-semibold text-gray-900 text-sm leading-tight">{dest.name}</span>
            </div>

            {/* Description */}
            <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">{dest.description}</p>

            {/* CTA */}
            <Link
              href={`/destinations/${dest.slug}`}
              className="mt-2 inline-block text-cyan-600 text-xs font-semibold hover:underline"
            >
              View Details →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main section ──────────────────────────────────────────────────────────

export default function SriLankaMap() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleEnter = (slug: string) => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
    setActiveSlug(slug)
  }

  const handleLeave = () => {
    hideTimer.current = setTimeout(() => setActiveSlug(null), 300)
  }

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container-custom">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="section-title text-cyan-600">Travel Destinations</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Sri Lanka in a glance — hover over a pin or a destination name to explore.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Interactive Map ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            {/*
              overflow: visible is intentional — popups extend outside the
              image boundary and must not be clipped.
            */}
            <div
              className="relative w-full max-w-[340px]"
              style={{ aspectRatio: '380 / 700' }}
            >
              <Image
                src="/images/Sri-lankan-Image-380x700-1.png"
                alt="Sri Lanka interactive destination map"
                fill
                className="object-contain drop-shadow-xl select-none"
              />

              {destinations.map((dest) => (
                <DestPin
                  key={dest.slug}
                  dest={dest}
                  active={activeSlug === dest.slug}
                  onEnter={() => handleEnter(dest.slug)}
                  onLeave={handleLeave}
                />
              ))}
            </div>
          </motion.div>

          {/* ── Destination List ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h3 className="text-xl font-heading font-semibold text-gray-900 mb-6">
              Popular Destinations
            </h3>

            <div className="grid grid-cols-2 gap-x-6 gap-y-0.5">
              {destinations.map((dest) => {
                const Icon = ICONS[dest.icon]
                const isActive = activeSlug === dest.slug
                return (
                  <Link
                    key={dest.slug}
                    href={`/destinations/${dest.slug}`}
                    className={`
                      flex items-center gap-2 py-2 text-sm border-b border-gray-50
                      transition-all duration-150 group rounded
                      ${isActive ? 'text-cyan-600 font-semibold' : 'text-gray-600 hover:text-cyan-600'}
                    `}
                    onMouseEnter={() => handleEnter(dest.slug)}
                    onMouseLeave={handleLeave}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                        isActive ? ICON_COLORS[dest.icon] : 'text-cyan-400 group-hover:text-cyan-500'
                      }`}
                    />
                    <span className="group-hover:underline underline-offset-2">{dest.name}</span>
                  </Link>
                )
              })}
            </div>

            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 mt-8 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-md"
            >
              Explore All Destinations →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
