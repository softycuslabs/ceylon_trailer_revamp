'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const partners = [
  { name: 'Lineup', color: '#00b894' },
  { name: 'ZeitGeister', color: '#6c5ce7' },
  { name: 'BoomTown', color: '#e17055' },
  { name: 'PressGuide', color: '#0984e3' },
  { name: 'TravelCo', color: '#00cec9' },
  { name: 'SriLanka Tourism', color: '#fdcb6e' },
]

export default function TrustedBy() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-16 bg-white border-t border-gray-100" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl font-heading font-bold text-gray-800">Trusted By Local Businesses</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-8 lg:gap-14"
        >
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group cursor-pointer"
            >
              <div
                className="text-2xl font-bold font-heading grayscale group-hover:grayscale-0 transition-all duration-300 opacity-50 group-hover:opacity-100"
                style={{ color: partner.color }}
              >
                {partner.name}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
