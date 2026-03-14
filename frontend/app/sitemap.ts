import { MetadataRoute } from 'next'
import { getAllDestinationSlugs, getAllTripSlugs, getAllArticleSlugs } from '@/lib/api'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ceylontrailer.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/destinations`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/trips`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/gallery`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ]

  try {
    const [destinationSlugs, tripSlugs, articleSlugs] = await Promise.allSettled([
      getAllDestinationSlugs(),
      getAllTripSlugs(),
      getAllArticleSlugs(),
    ])

    const destinationPages: MetadataRoute.Sitemap =
      destinationSlugs.status === 'fulfilled'
        ? destinationSlugs.value.map((slug) => ({
            url: `${SITE_URL}/destinations/${slug}`,
            lastModified: now,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
          }))
        : []

    const tripPages: MetadataRoute.Sitemap =
      tripSlugs.status === 'fulfilled'
        ? tripSlugs.value.map((slug) => ({
            url: `${SITE_URL}/trips/${slug}`,
            lastModified: now,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
          }))
        : []

    const articlePages: MetadataRoute.Sitemap =
      articleSlugs.status === 'fulfilled'
        ? articleSlugs.value.map((slug) => ({
            url: `${SITE_URL}/blog/${slug}`,
            lastModified: now,
            changeFrequency: 'monthly' as const,
            priority: 0.6,
          }))
        : []

    return [...staticPages, ...destinationPages, ...tripPages, ...articlePages]
  } catch {
    return staticPages
  }
}
