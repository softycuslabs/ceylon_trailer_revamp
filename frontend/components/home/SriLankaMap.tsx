'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin } from 'lucide-react'

const destinations = [
  { name: "Adams Peak", slug: "adams-peak" },
  { name: "Anuradhapura", slug: "anuradhapura" },
  { name: "Arugam Bay", slug: "arugam-bay" },
  { name: "Angambe Beach", slug: "angambe-beach" },
  { name: "Dambulla Cave Temple", slug: "dambulla" },
  { name: "Galle", slug: "galle" },
  { name: "Hikkaduwa", slug: "hikkaduwa" },
  { name: "Jaffna", slug: "jaffna" },
  { name: "Kandy", slug: "kandy" },
  { name: "Mirissa", slug: "mirissa" },
  { name: "Nuwara Eliya", slug: "nuwara-eliya" },
  { name: "Polonnaruwa", slug: "polonnaruwa" },
  { name: "Sigiriya", slug: "sigiriya" },
  { name: "Trincomalee", slug: "trincomalee" },
  { name: "Wilpattu National Park", slug: "wilpattu" },
  { name: "Yala National Park", slug: "yala" },
]

const half = Math.ceil(destinations.length / 2)
const col1 = destinations.slice(0, half)
const col2 = destinations.slice(half)

export default function SriLankaMap() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="section-title text-cyan-600">Travel Destinations</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Sri Lanka in a glance — click on a destination to explore more.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Map image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-sm">
              <Image
                src="/images/Sri-lankan-Image-380x700-1.png"
                alt="Sri Lanka Map"
                width={380}
                height={700}
                className="object-contain drop-shadow-xl w-full"
              />
            </div>
          </motion.div>

          {/* Destination list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h3 className="text-xl font-heading font-semibold text-gray-900 mb-6">
              Popular Destinations
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1">
              {[...col1, ...col2].map((dest) => (
                <Link
                  key={dest.slug}
                  href={`/destinations/${dest.slug}`}
                  className="flex items-center gap-2.5 py-2 text-sm text-gray-600 hover:text-cyan-600 group transition-colors border-b border-gray-50"
                >
                  <MapPin className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                  <span className="group-hover:underline">{dest.name}</span>
                </Link>
              ))}
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
