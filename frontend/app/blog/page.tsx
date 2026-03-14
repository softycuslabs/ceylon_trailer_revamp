import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, Tag, ArrowRight } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import { getArticles } from '@/lib/api'
import { formatDate, getImageUrl } from '@/lib/utils'

export const revalidate = 1800

export const metadata: Metadata = {
  title: 'Travel Articles',
  description: 'Read the latest travel guides, tips, and stories about Sri Lanka from the Ceylon Trailer team.',
}

export default async function BlogPage() {
  const articlesData = await getArticles().catch(() => ({ results: [], count: 0 }))
  const articles = articlesData.results

  return (
    <>
      <PageHero
        title="Travel Articles"
        subtitle="Stories, guides, and tips from our Sri Lanka experts"
        image="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1920&q=80"
        breadcrumbs={[{ label: 'Travel Articles' }]}
      />

      <div className="bg-gray-50 min-h-screen py-16">
        <div className="container-custom">
          {articles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No articles published yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <article key={article.id} className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover border border-gray-100">
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={getImageUrl(article.cover_image) || 'https://images.unsplash.com/photo-1586096538339-0a0df57d50dd?w=600&q=80'}
                      alt={article.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    {/* Meta */}
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {article.published_at ? formatDate(article.published_at) : 'Recent'}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {article.author}
                      </span>
                    </div>

                    <h2 className="font-heading font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">
                      {article.excerpt}
                    </p>

                    {/* Tags */}
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="flex items-center gap-1 text-xs bg-cyan-50 text-cyan-600 px-2 py-0.5 rounded-full">
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link
                      href={`/blog/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 hover:text-cyan-700"
                    >
                      Read More <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
