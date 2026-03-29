'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const categories = [
  {
    label: 'Archaeological Places',
    image: '/images/category-images/archeological-place.webp',
    href: '/destinations?activity=archaeological',
  },
  {
    label: 'Waterfalls Tracking',
    image: '/images/category-images/waterfall-tracking-srilanka.webp',
    href: '/destinations?activity=waterfalls',
  },
  {
    label: 'Hiking',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80',
    href: '/destinations?activity=hiking',
  },
  {
    label: 'Leisure Time',
    image: '/images/category-images/lesure-time.png',
    href: '/destinations?activity=leisure',
  },
  {
    label: 'Beach Events',
    image: '/images/category-images/beach-evwnt.webp',
    href: '/destinations?activity=beach',
  },
]

export default function EnjoyWithUs() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-20 bg-amber-50/60" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="section-title text-cyan-600">Enjoy With Us</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Choose your favourite Sri Lankan experience — from ancient ruins to pristine beaches.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={cat.href} className="flex flex-col items-center group">
                <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden shadow-lg ring-4 ring-white group-hover:ring-cyan-400 transition-all duration-300 group-hover:scale-105">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <span className="mt-3 text-sm font-semibold text-gray-700 group-hover:text-cyan-600 transition-colors text-center max-w-[120px] leading-tight">
                  {cat.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
