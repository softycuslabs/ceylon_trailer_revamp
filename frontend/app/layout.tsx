import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/shared/WhatsAppButton'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    template: '%s | Ceylon Trailer',
    default: 'Ceylon Trailer — Discover the Heart of Ceylon',
  },
  description:
    'Ceylon Trailer is your premier Sri Lankan travel partner. Explore unforgettable destinations, cultural tours, wildlife safaris, and adventure experiences across Sri Lanka.',
  keywords: ['Sri Lanka travel', 'Ceylon tours', 'Sri Lanka destinations', 'travel packages', 'Ceylon Trailer'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Ceylon Trailer',
    title: 'Ceylon Trailer — Discover the Heart of Ceylon',
    description: 'Experience the magic of Sri Lanka with personalized travel packages and expert guides.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ceylon Trailer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ceylon Trailer',
    description: 'Discover the Heart of Ceylon',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: '8px',
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  )
}
