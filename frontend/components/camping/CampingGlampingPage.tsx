'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Flame, Mountain, TreePine, Utensils, Star, Bath, Coffee, Wifi, ArrowRight } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'

const WHATSAPP_NUM = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '94770000000'

// ─── Data ──────────────────────────────────────────────────────────────────

const campingSite = {
  name: 'Knuckles Forest Camp',
  location: 'Knuckles Mountain Range, Kandy',
  description:
    'Nestled within the UNESCO-listed Knuckles Mountain Range, this rustic campsite offers an immersive nature experience surrounded by mist-covered peaks and dense forest. Wake up to birdsong and panoramic mountain views.',
  image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
  facilities: [
    { icon: Flame, label: 'Campfire Pit' },
    { icon: Mountain, label: 'Hiking Trails' },
    { icon: TreePine, label: 'Forest Views' },
    { icon: Utensils, label: 'BBQ Area' },
  ],
  slug: 'knuckles-forest-camp',
}

const glampingSite = {
  name: 'Ella Wilderness Glamping',
  location: 'Ella, Uva Province',
  description:
    'Indulge in the perfect blend of luxury and nature at our exclusive glamping retreat in Ella. Spacious canvas tents with plush beds, private bathrooms, and sweeping views of the Ella Gap await you.',
  image: 'https://images.unsplash.com/photo-1533575770077-052fa2c609fc?w=800&q=80',
  amenities: [
    { icon: Star, label: 'Luxury Tent' },
    { icon: Bath, label: 'Private Bathroom' },
    { icon: Coffee, label: 'Breakfast Included' },
    { icon: Wifi, label: 'WiFi Access' },
  ],
  slug: 'ella-wilderness-glamping',
}

const activities = [
  {
    icon: Flame,
    title: 'Campfire Nights',
    description: 'Gather around the fire under a canopy of stars with stories and warmth.',
    color: 'bg-orange-50',
    iconColor: 'text-orange-500',
  },
  {
    icon: Mountain,
    title: 'Hiking',
    description: 'Explore scenic trails through Sri Lanka\'s most breathtaking landscapes.',
    color: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    icon: TreePine,
    title: 'Nature Walks',
    description: 'Guided walks through forests, spotting endemic wildlife and rare flora.',
    color: 'bg-teal-50',
    iconColor: 'text-teal-600',
  },
  {
    icon: Utensils,
    title: 'BBQ Nights',
    description: 'Enjoy freshly grilled local cuisine prepared over open wood fires.',
    color: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    icon: Star,
    title: 'Stargazing',
    description: 'Away from city lights, the night sky here is truly unforgettable.',
    color: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
  {
    icon: Coffee,
    title: 'Ceylon Tea Experience',
    description: 'Start your morning with a cup of freshly brewed Sri Lankan highland tea.',
    color: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
  },
]

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?w=600&q=80', alt: 'Campfire in the forest' },
  { src: 'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?w=600&q=80', alt: 'Glamping tent interior' },
  { src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80', alt: 'Mountain hiking trail' },
  { src: 'https://images.unsplash.com/photo-1475274047050-1d0c0975de51?w=600&q=80', alt: 'Starry night sky camping' },
  { src: 'https://images.unsplash.com/photo-1571863533956-01c88e79957e?w=600&q=80', alt: 'Nature walk in forest' },
  { src: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&q=80', alt: 'Luxury glamping setup' },
]

// ─── Reusable fade-in hook ──────────────────────────────────────────────────

function useFade() {
  return useInView({ triggerOnce: true, threshold: 0.08 })
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function CampingGlampingPage() {
  const [heroRef, heroInView] = useFade()
  const [aboutRef, aboutInView] = useFade()
  const [campRef, campInView] = useFade()
  const [glampRef, glampInView] = useFade()
  const [actRef, actInView] = useFade()
  const [gallRef, gallInView] = useFade()
  const [ctaRef, ctaInView] = useFade()

  return (
    <main>

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1600&q=85"
          alt="Camping tent in nature Sri Lanka"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto" ref={heroRef}>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block bg-green-500/20 border border-green-400/40 text-green-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-5 tracking-wide"
          >
            Outdoor Experiences · Sri Lanka
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-5"
          >
            Camping & Glamping
            <span className="block text-green-400 mt-1">Experiences in Sri Lanka</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-9"
          >
            Sleep under the stars while enjoying nature and comfort. From rustic campsites to luxury glamping — we have your perfect outdoor escape.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <a
              href="#camping"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-green-900/40 inline-flex items-center gap-2"
            >
              <TreePine className="w-4 h-4" />
              Explore Camping
            </a>
            <a
              href={getWhatsAppUrl(WHATSAPP_NUM, 'Hello! I would like to book a camping or glamping experience in Sri Lanka.')}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/15 hover:bg-white/25 border border-white/40 text-white font-semibold px-8 py-3.5 rounded-full backdrop-blur-sm transition-all duration-200 inline-flex items-center gap-2"
            >
              Book Your Stay
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/60">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-0.5 h-6 bg-white/40 rounded-full"
          />
        </div>
      </section>

      {/* ── 2. ABOUT THE EXPERIENCE ─────────────────────────────────────── */}
      <section className="py-20 bg-stone-50" ref={aboutRef}>
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block text-green-600 font-semibold text-sm tracking-wide uppercase mb-3">
                About the Experience
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-5 leading-tight">
                Where Nature Meets <span className="text-green-600">Comfort</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Sri Lanka's stunning landscapes — from mist-shrouded mountains to tropical forests — make it one of Asia's most spectacular destinations for outdoor escapes. Whether you prefer the raw beauty of camping under the stars or the refined comfort of a luxury glamping retreat, Ceylon Trailer brings you the best of both worlds.
              </p>
              <p className="text-gray-600 leading-relaxed mb-7">
                Our carefully selected outdoor sites are chosen for their scenic beauty, accessibility, and the authentic Sri Lankan experiences they offer. Every stay comes with expert local guidance and personalised service.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '2', label: 'Outdoor Sites' },
                  { value: '100%', label: 'Nature Immersive' },
                  { value: '10+', label: 'Activities' },
                  { value: '5★', label: 'Guest Rated' },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                    <div className="text-2xl font-bold text-green-600 font-heading">{s.value}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="grid grid-cols-2 gap-3"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
                <Image
                  src="https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?w=500&q=80"
                  alt="Campfire night experience"
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] mt-6">
                <Image
                  src="https://images.unsplash.com/photo-1533575770077-052fa2c609fc?w=500&q=80"
                  alt="Glamping tent comfort"
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. CAMPING SITE ─────────────────────────────────────────────── */}
      <section id="camping" className="py-20 bg-white" ref={campRef}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={campInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-green-600 font-semibold text-sm tracking-wide uppercase mb-3">
              Rustic & Adventurous
            </span>
            <h2 className="section-title text-gray-900">Our Camping Site</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Pure nature, no frills — just you, the forest, and the open sky.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={campInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image */}
              <div className="relative h-72 md:h-auto min-h-[300px]">
                <Image
                  src={campingSite.image}
                  alt={campingSite.name}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Camping
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">{campingSite.name}</h3>
                  <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
                    <MapPin className="w-4 h-4 text-green-500 shrink-0" />
                    <span>{campingSite.location}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm mb-6">{campingSite.description}</p>

                  <div className="mb-6">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Facilities</p>
                    <div className="grid grid-cols-2 gap-2">
                      {campingSite.facilities.map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-2 bg-green-50 rounded-lg px-3 py-2">
                          <Icon className="w-4 h-4 text-green-600 shrink-0" />
                          <span className="text-sm text-gray-700 font-medium">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link
                    href={`/camping-glamping/${campingSite.slug}`}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-3 rounded-full transition-all text-center text-sm"
                  >
                    View Details
                  </Link>
                  <a
                    href={getWhatsAppUrl(WHATSAPP_NUM, `Hello! I'm interested in the ${campingSite.name} camping experience.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border-2 border-green-500 text-green-600 hover:bg-green-50 font-semibold px-5 py-3 rounded-full transition-all text-center text-sm"
                  >
                    Enquire Now
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4. GLAMPING SITE ────────────────────────────────────────────── */}
      <section id="glamping" className="py-20 bg-stone-50" ref={glampRef}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={glampInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-cyan-600 font-semibold text-sm tracking-wide uppercase mb-3">
              Luxury in Nature
            </span>
            <h2 className="section-title text-gray-900">Our Glamping Retreat</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Five-star comfort in the heart of the wilderness — no compromises.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={glampInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Content — left on desktop for glamping (reverse layout) */}
              <div className="p-8 flex flex-col justify-between order-2 md:order-1">
                <div>
                  <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">{glampingSite.name}</h3>
                  <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
                    <MapPin className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span>{glampingSite.location}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm mb-6">{glampingSite.description}</p>

                  <div className="mb-6">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Amenities</p>
                    <div className="grid grid-cols-2 gap-2">
                      {glampingSite.amenities.map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-2 bg-cyan-50 rounded-lg px-3 py-2">
                          <Icon className="w-4 h-4 text-cyan-600 shrink-0" />
                          <span className="text-sm text-gray-700 font-medium">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href={getWhatsAppUrl(WHATSAPP_NUM, `Hello! I would like to book the ${glampingSite.name} glamping retreat.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-5 py-3 rounded-full transition-all text-center text-sm"
                  >
                    Book Now
                  </a>
                  <Link
                    href={`/camping-glamping/${glampingSite.slug}`}
                    className="flex-1 border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50 font-semibold px-5 py-3 rounded-full transition-all text-center text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              {/* Image */}
              <div className="relative h-72 md:h-auto min-h-[300px] order-1 md:order-2">
                <Image
                  src={glampingSite.image}
                  alt={glampingSite.name}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Glamping
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 5. ACTIVITIES ───────────────────────────────────────────────── */}
      <section className="py-20 bg-white" ref={actRef}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={actInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-green-600 font-semibold text-sm tracking-wide uppercase mb-3">
              Things To Do
            </span>
            <h2 className="section-title text-gray-900">Outdoor Activities</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Every day brings a new adventure. Here's what awaits you at our outdoor sites.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((act, i) => (
              <motion.div
                key={act.title}
                initial={{ opacity: 0, y: 20 }}
                animate={actInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`${act.color} rounded-2xl p-6 hover:scale-[1.02] hover:shadow-md transition-all duration-300 cursor-default`}
              >
                <div className={`w-12 h-12 ${act.color} rounded-xl flex items-center justify-center mb-4 shadow-sm border border-white`}>
                  <act.icon className={`w-6 h-6 ${act.iconColor}`} />
                </div>
                <h3 className="text-lg font-heading font-semibold text-gray-900 mb-2">{act.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{act.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. PHOTO GALLERY ────────────────────────────────────────────── */}
      <section className="py-20 bg-stone-50" ref={gallRef}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={gallInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-green-600 font-semibold text-sm tracking-wide uppercase mb-3">
              Moments
            </span>
            <h2 className="section-title text-gray-900">Photo Gallery</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              A glimpse of the magic waiting for you in Sri Lanka's wild outdoors.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={gallInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className={`relative overflow-hidden rounded-2xl group cursor-pointer ${i === 0 || i === 5 ? 'aspect-[4/5]' : 'aspect-square'}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. BOOKING CTA ──────────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden" ref={ctaRef}>
        <Image
          src="https://images.unsplash.com/photo-1475274047050-1d0c0975de51?w=1600&q=80"
          alt="Starry night sky camping"
          fill
          className="object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-green-950/60 to-black/70" />

        <div className="relative z-10 container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block bg-green-400/20 border border-green-400/40 text-green-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-5 tracking-wide">
              Start Your Adventure
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-5 leading-tight">
              Ready for Your <span className="text-green-400">Nature Escape?</span>
            </h2>
            <p className="text-white/75 text-lg max-w-xl mx-auto mb-9">
              Limited spots available. Contact us today and we'll plan the perfect outdoor experience tailored just for you.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={getWhatsAppUrl(WHATSAPP_NUM, 'Hello! I would like to book a camping or glamping experience in Sri Lanka.')}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-400 text-white font-semibold px-9 py-4 rounded-full transition-all duration-200 shadow-xl shadow-green-900/40 text-lg inline-flex items-center gap-2"
              >
                Book Your Camping Experience
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                href="/contact"
                className="bg-white/15 hover:bg-white/25 border border-white/40 text-white font-semibold px-9 py-4 rounded-full backdrop-blur-sm transition-all duration-200 text-lg"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
