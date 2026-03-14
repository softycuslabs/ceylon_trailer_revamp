'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Award, Users, MapPin, Clock } from 'lucide-react'

const stats = [
  { icon: Award, value: '10+', label: 'Years Experience' },
  { icon: Users, value: '1000+', label: 'Happy Travelers' },
  { icon: MapPin, value: '50+', label: 'Destinations' },
  { icon: Clock, value: '500+', label: 'Tours Completed' },
]

export default function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container-custom">
        {/* Top centered text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-cyan-500 text-4xl font-heading font-bold">Ceylon Trailer</h2>
          <p className="text-gray-500 text-xl mt-2 font-heading italic">Discover the heart of Ceylon</p>
          <p className="text-gray-600 mt-4 max-w-3xl mx-auto leading-relaxed">
            Discover Sri Lanka's rich heritage with Ceylon Trailer, your premier tour operator. We offer
            personalized travel packages, guided tours, and multi-cultural experiences, ensuring an unforgettable
            journey through the heart of Ceylon. Explore the most attractive destinations, enjoy luxury
            accommodations, and immerse yourself in authentic Sri Lankan adventures.
          </p>
        </motion.div>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="relative h-96 lg:h-[480px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&q=80"
                alt="Sri Lanka Temple"
                fill
                className="object-cover"
              />
              {/* Floating card */}
              <div className="absolute bottom-6 left-6 bg-white rounded-xl p-4 shadow-xl">
                <div className="text-cyan-500 font-bold text-3xl font-heading">10+</div>
                <div className="text-gray-600 text-sm font-medium">Years of Excellence</div>
              </div>
            </div>
            {/* Secondary image */}
            <div className="absolute -bottom-8 -right-8 w-52 h-52 rounded-2xl overflow-hidden border-4 border-white shadow-xl hidden lg:block">
              <Image
                src="https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80"
                alt="Sri Lanka Landscape"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:pl-6"
          >
            <span className="text-cyan-500 font-semibold text-sm uppercase tracking-widest">About Us</span>
            <h2 className="section-title mt-2">
              Creating Memories Across the Pearl of the Indian Ocean
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              From the ancient rock fortress of Sigiriya to the golden beaches of Mirissa, from the cool hill country
              of Ella to the sacred temples of Kandy — Ceylon Trailer crafts journeys that connect you to Sri
              Lanka's soul.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Our team of local experts ensures every detail of your trip is handled with care, providing authentic
              experiences that go beyond the ordinary tourist trail.
            </p>
            <Link href="/about" className="btn-primary">
              Learn More About Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 pt-12 border-t border-gray-100"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="w-14 h-14 bg-cyan-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-7 h-7 text-cyan-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 font-heading">{stat.value}</div>
              <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
