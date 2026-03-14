'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import type { Testimonial } from '@/lib/types'

const FALLBACK: Testimonial[] = [
  { id: 1, name: 'Sarah Mitchell', country: 'United Kingdom', avatar: null, rating: 5, comment: 'Our Sri Lanka trip with Ceylon Trailer was absolutely magical. The team organized everything perfectly, from the ancient temples of Anuradhapura to the stunning beaches of Mirissa.', trip_title: 'Island Discovery', created_at: '' },
  { id: 2, name: 'Hans Mueller', country: 'Germany', avatar: null, rating: 5, comment: 'Exceptional service! The guides were incredibly knowledgeable and passionate about sharing their country\'s culture. Sigiriya at sunrise is something I will never forget.', trip_title: 'Heritage Trail', created_at: '' },
  { id: 3, name: 'Yuki Tanaka', country: 'Japan', avatar: null, rating: 5, comment: 'Ceylon Trailer made our honeymoon absolutely perfect. Every detail was thoughtfully arranged, and the accommodation recommendations were spot on. Highly recommend!', trip_title: 'Honeymoon Package', created_at: '' },
]

interface Props { testimonials: Testimonial[] }

export default function Testimonials({ testimonials }: Props) {
  const items = testimonials.length > 0 ? testimonials : FALLBACK
  const [current, setCurrent] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const prev = () => setCurrent((c) => (c === 0 ? items.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === items.length - 1 ? 0 : c + 1))
  const t = items[current]

  return (
    <section className="py-20 bg-cyan-600" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-3">
            What Our Travelers Say
          </h2>
          <p className="text-cyan-100">Real experiences from real adventurers</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl p-8 md:p-10 text-center shadow-xl"
          >
            <Quote className="w-10 h-10 text-cyan-200 mx-auto mb-6" />

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8 italic">"{t.comment}"</p>

            {/* Avatar */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 font-bold text-xl overflow-hidden">
                {t.avatar ? (
                  <Image src={t.avatar} alt={t.name} width={56} height={56} className="object-cover" />
                ) : (
                  t.name.charAt(0)
                )}
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">{t.name}</div>
                <div className="text-gray-500 text-sm">{t.country}</div>
                {t.trip_title && (
                  <div className="text-cyan-500 text-xs font-medium mt-0.5">{t.trip_title}</div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button onClick={prev} className="w-10 h-10 bg-white/20 hover:bg-white rounded-full flex items-center justify-center text-white hover:text-cyan-600 transition-all" aria-label="Previous">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-white w-6' : 'bg-white/40'}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 bg-white/20 hover:bg-white rounded-full flex items-center justify-center text-white hover:text-cyan-600 transition-all" aria-label="Next">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
