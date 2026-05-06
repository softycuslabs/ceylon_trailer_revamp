import type { Metadata } from 'next'
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import ContactForm from '@/components/shared/ContactForm'
import { getWhatsAppUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Ceylon Trailer for trip planning, inquiries, and personalized travel advice.',
}

const WHATSAPP_NUM = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '94770000000'

export default function ContactPage() {
  const waUrl = getWhatsAppUrl(WHATSAPP_NUM, 'Hello! I would like to plan a trip to Sri Lanka.')

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We'd love to help plan your dream trip"
        image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
        breadcrumbs={[{ label: 'Contact Us' }]}
      />

      <div className="bg-gray-50 min-h-screen py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">Get In Touch</h2>
                <p className="text-gray-600">
                  Our team is ready to help you plan your perfect Sri Lanka adventure. Reach out via any of the channels below.
                </p>
              </div>

              {[
                { icon: Phone, label: 'Phone', value: '+94 77 00 45 48 8', href: 'tel:+94770045488' },
                { icon: Mail, label: 'Email', value: 'info@ceylontrailer.com', href: 'mailto:info@ceylontrailer.com' },
                { icon: MapPin, label: 'Address', value: 'No. 45, Galle Road, Colombo 03, Sri Lanka', href: '#' },
                { icon: Clock, label: 'Working Hours', value: 'Mon–Sat: 9AM–6PM (IST)', href: '#' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="w-10 h-10 bg-cyan-50 group-hover:bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 transition-colors">
                    <item.icon className="w-5 h-5 text-cyan-500 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">{item.label}</div>
                    <div className="text-gray-700 text-sm mt-0.5">{item.value}</div>
                  </div>
                </a>
              ))}

              {/* WhatsApp CTA */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-xl transition-colors shadow-md"
              >
                <MessageCircle className="w-6 h-6" />
                Chat on WhatsApp
              </a>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Send Us a Message</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
