/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // localhost kept for local development — remove this in a dedicated production config
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
      },
    ],
  },

  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevent this site being embedded in iframes (clickjacking)
          { key: 'X-Frame-Options',          value: 'DENY' },
          // Stop browsers guessing MIME types
          { key: 'X-Content-Type-Options',   value: 'nosniff' },
          // Don't send full URL as Referer to third parties
          { key: 'Referrer-Policy',          value: 'strict-origin-when-cross-origin' },
          // Force HTTPS for 2 years, including subdomains
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          // Disable browser features the site does not use
          { key: 'Permissions-Policy',       value: 'camera=(), microphone=(), geolocation=(), payment=()' },
          // Content Security Policy
          // 'unsafe-inline' for scripts is required by Next.js hydration and Framer Motion.
          // Tighten this with nonces once upgraded to Next.js 15+.
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.hcaptcha.com https://newassets.hcaptcha.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://res.cloudinary.com https://images.unsplash.com",
              "connect-src 'self' https://hcaptcha.com https://newassets.hcaptcha.com",
              "frame-src https://newassets.hcaptcha.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
