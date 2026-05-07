'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Hotel, Plane, Map, Car, Shield, Compass, Ticket, Bus, ClipboardList, Users, Leaf, Star
} from 'lucide-react'

const services = [
  {
    icon: Hotel,
    title: 'Hotel Reservations',
    description: 'Carefully selected accommodations from budget to luxury, tailored to your preferences.',
  },
  {
    icon: Plane,
    title: 'Flight Booking',
    description: 'Best-price flights from various airlines, optimized for your schedule and budget.',
  },
  {
    icon: Map,
    title: 'Tour Packages',
    description: 'Curated tour experiences covering all the iconic attractions and hidden gems of Sri Lanka.',
  },
  {
    icon: Car,
    title: 'Car Rentals',
    description: 'Reliable vehicles with experienced drivers for comfortable island exploration.',
  },
  {
    icon: Shield,
    title: 'Travel Insurance',
    description: 'Comprehensive insurance coverage to ensure a worry-free travel experience.',
  },
  {
    icon: Compass,
    title: 'Destination Guides',
    description: 'Expert local guides with deep knowledge of history, culture, and hidden spots.',
  },
  {
    icon: Ticket,
    title: 'Event & Ticket Bookings',
    description: 'Access to concerts, sports, cultural events and attractions across Sri Lanka.',
  },
  {
    icon: Bus,
    title: 'Airport Transfers',
    description: 'Smooth, punctual airport-to-hotel transfers ensuring a stress-free arrival.',
  },
  {
    icon: ClipboardList,
    title: 'Custom Itineraries',
    description: 'Personalized travel plans crafted to match your timeline, interests, and budget.',
  },
  {
    icon: Users,
    title: 'Group Travel',
    description: 'Tailored services for groups, families, corporate retreats, and incentive trips.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Travel',
    description: 'Eco-friendly options for responsible travellers who care about the environment.',
  },
  {
    icon: Star,
    title: 'VIP Experiences',
    description: 'Exclusive access to premium experiences, private tours, and luxury accommodations.',
  },
]

export default function WhyChooseUs() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section className="py-20 bg-gray-50" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="section-title">Why Choose Our Services?</h2>
          <p className="section-subtitle">
            Experience unforgettable travel through Sri Lanka with our expert guidance and personalized service.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-white rounded-xl p-6 card-hover shadow-sm border border-gray-100 group"
            >
              <div className="w-12 h-12 bg-cyan-50 group-hover:bg-cyan-500 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300">
                <service.icon className="w-6 h-6 text-cyan-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-semibold text-gray-900 text-base mb-2">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
