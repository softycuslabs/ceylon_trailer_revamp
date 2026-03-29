import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'

const quickLinks = [
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Services', href: '/trips' },
  { label: 'Contact Us', href: '/contact' },
]

const destinations = [
  { label: 'Kandy', href: '/destinations/kandy' },
  { label: 'Ella', href: '/destinations/ella' },
  { label: 'Sigiriya', href: '/destinations/sigiriya' },
  { label: 'Galle', href: '/destinations/galle' },
  { label: 'Yala', href: '/destinations/yala' },
]

export default function Footer() {
  return (
    <footer className="relative text-blue-100 overflow-hidden">

      {/* Background image — Sigiriya */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/ceylon-trailer-Sigiriya-footer image.png"
          alt="Sigiriya Sri Lanka"
          fill
          className="object-cover object-center"
        />
        {/* Dark navy overlay so text is readable */}
        <div className="absolute inset-0 bg-[#0a1628]/90" />
      </div>

      {/* Main footer content */}
      <div className="relative z-10">
        <div className="container-custom py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center mb-4">
                <Image
                  src="/images/ceylon-trailor-logo-150x-150.png"
                  alt="Ceylon Trails"
                  width={130}
                  height={130}
                  className="object-contain"
                />
              </Link>
              <p className="text-sm text-blue-200 leading-relaxed mb-6">
                Discover the heart of Ceylon. Your premier Sri Lankan travel partner for unforgettable journeys and
                authentic experiences.
              </p>
              <div className="flex gap-3">
                {[
                  {
                    label: 'Facebook', href: '#',
                    svg: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
                  },
                  {
                    label: 'Instagram', href: '#',
                    svg: <><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></>,
                  },
                  {
                    label: 'X (Twitter)', href: '#',
                    svg: <path d="M4 4l16 16M4 20L20 4" />,
                  },
                  {
                    label: 'YouTube', href: '#',
                    svg: <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" /></>,
                  },
                ].map(({ label, href, svg }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 bg-blue-900/50 hover:bg-cyan-500 rounded-full flex items-center justify-center transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      {svg}
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-5 font-heading">Contact Us</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <a href="tel:+94770045488" className="text-blue-200 hover:text-white transition-colors">
                    +94 77 00 45 48 8
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <a href="mailto:info@ceylontrailer.com" className="text-blue-200 hover:text-white transition-colors">
                    info@ceylontrailer.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <span className="text-blue-200">No. 45, Galle Road, Colombo 03, Sri Lanka</span>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-5 font-heading">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-blue-200 hover:text-cyan-400 transition-colors group"
                    >
                      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full group-hover:scale-125 transition-transform" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Top Destinations */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-5 font-heading">Top Destinations</h3>
              <ul className="space-y-2 text-sm">
                {destinations.map((d) => (
                  <li key={d.href}>
                    <Link
                      href={d.href}
                      className="flex items-center gap-2 text-blue-200 hover:text-cyan-400 transition-colors group"
                    >
                      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full group-hover:scale-125 transition-transform" />
                      {d.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-blue-900/60">
          <div className="container-custom py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-blue-300">
            <span>© {new Date().getFullYear()} Ceylon Trailer. All Rights Reserved.</span>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
