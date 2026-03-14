import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface Breadcrumb {
  label: string
  href?: string
}

interface Props {
  title: string
  subtitle?: string
  image?: string
  breadcrumbs?: Breadcrumb[]
}

export default function PageHero({ title, subtitle, image, breadcrumbs }: Props) {
  return (
    <section className="relative h-64 md:h-80 lg:h-96 flex items-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={image || 'https://images.unsplash.com/photo-1571723141164-d89e3c67f6eb?w=1920&q=80'}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative container-custom pb-10 pt-20 w-full">
        {/* Breadcrumb */}
        {breadcrumbs && (
          <nav className="flex items-center gap-1.5 text-sm text-white/70 mb-3">
            <Link href="/" className="hover:text-white flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white">{title}</h1>
        {subtitle && <p className="text-white/80 mt-2 text-lg">{subtitle}</p>}
      </div>
    </section>
  )
}
