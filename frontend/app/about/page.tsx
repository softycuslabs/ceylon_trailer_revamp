import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, Award, Users, MapPin, Clock, ArrowRight } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Ceylon Trailer — Sri Lanka\'s premier travel agency dedicated to creating unforgettable journeys.',
}

const team = [
  { name: 'Prabhath Kumara', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
  { name: 'Dilini Perera', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80' },
  { name: 'Ruwan Jayasinghe', role: 'Senior Tour Guide', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80' },
]

const values = [
  'Personalized travel experiences tailored to your interests',
  'Expert local guides with deep cultural knowledge',
  'Sustainable and responsible tourism practices',
  'Transparent pricing with no hidden costs',
  'Available 24/7 during your trip',
  'Strong relationships with local communities',
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Ceylon Trailer"
        subtitle="Discover the heart of Ceylon with us"
        image="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=1920&q=80"
        breadcrumbs={[{ label: 'About' }]}
      />

      <div className="bg-white">
        {/* Story section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <div>
                <span className="text-cyan-500 font-semibold text-sm uppercase tracking-widest">Our Story</span>
                <h2 className="text-3xl font-heading font-bold text-gray-900 mt-2 mb-5">
                  A Decade of Crafting Unforgettable Sri Lankan Journeys
                </h2>
                <p className="text-gray-600 leading-relaxed mb-5">
                  Founded with a passion for sharing Sri Lanka's extraordinary beauty with the world, Ceylon Trailer
                  has been creating transformative travel experiences for over a decade. What started as a small local
                  guide service has grown into Sri Lanka's most trusted boutique travel company.
                </p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  We believe that travel is more than visiting places — it's about connecting with cultures,
                  understanding history, and creating memories that last a lifetime. Every itinerary we craft
                  reflects our deep love for our island home and our commitment to sharing it authentically.
                </p>
                <ul className="space-y-3 mb-8">
                  {values.map((value) => (
                    <li key={value} className="flex items-start gap-2.5 text-gray-600 text-sm">
                      <CheckCircle className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                      {value}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn-primary">
                  Get In Touch
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80"
                  alt="Sri Lanka Landscape"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-cyan-600">
          <div className="container-custom">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
              {[
                { icon: Clock, value: '10+', label: 'Years Experience' },
                { icon: Users, value: '1000+', label: 'Happy Travelers' },
                { icon: MapPin, value: '50+', label: 'Destinations' },
                { icon: Award, value: '500+', label: 'Tours Completed' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-7 h-7" />
                  </div>
                  <div className="text-4xl font-heading font-bold">{stat.value}</div>
                  <div className="text-cyan-100 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-14">
              <h2 className="section-title">Meet Our Team</h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Passionate local experts dedicated to making your Sri Lanka experience unforgettable.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {team.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-cyan-100">
                    <Image src={member.image} alt={member.name} fill className="object-cover" />
                  </div>
                  <h3 className="font-heading font-bold text-gray-900">{member.name}</h3>
                  <p className="text-cyan-600 text-sm font-medium">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">Ready to Explore Sri Lanka?</h2>
            <p className="text-gray-500 mb-8 max-w-xl mx-auto">
              Let us craft the perfect journey for you. Get in touch today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/trips" className="btn-primary">Browse Trip Packages</Link>
              <Link href="/contact" className="btn-secondary">Contact Us</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
