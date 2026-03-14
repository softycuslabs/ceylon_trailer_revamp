import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, User, Tag, ArrowLeft, MapPin } from 'lucide-react'
import { getArticle, getAllArticleSlugs, getArticles } from '@/lib/api'
import { formatDate, getImageUrl } from '@/lib/utils'

export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const slugs = await getAllArticleSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const article = await getArticle(params.slug)
    return {
      title: article.title,
      description: article.excerpt,
      openGraph: {
        title: article.title,
        description: article.excerpt,
        images: article.cover_image ? [{ url: getImageUrl(article.cover_image) }] : [],
        type: 'article',
        publishedTime: article.published_at,
        authors: [article.author],
      },
    }
  } catch {
    return { title: 'Article Not Found' }
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  let article
  try {
    article = await getArticle(params.slug)
  } catch {
    notFound()
  }

  const relatedData = await getArticles({ page: 1 }).catch(() => ({ results: [] }))
  const related = relatedData.results.filter((a) => a.slug !== params.slug).slice(0, 3)

  return (
    <div className="bg-white min-h-screen">
      {/* Article hero */}
      {article.cover_image && (
        <div className="relative h-72 md:h-96 lg:h-[500px] pt-20">
          <Image src={getImageUrl(article.cover_image)} alt={article.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>
      )}

      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-cyan-600 text-sm font-medium hover:text-cyan-700 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-cyan-500" />{article.published_at ? formatDate(article.published_at) : ''}</span>
            <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-cyan-500" />{article.author}</span>
            {article.destination_name && (
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-cyan-500" />{article.destination_name}</span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">{article.title}</h1>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 bg-cyan-50 text-cyan-600 text-sm px-3 py-1 rounded-full">
                  <Tag className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            {article.content?.split('\n').map((para, i) => para ? <p key={i}>{para}</p> : <br key={i} />)}
          </div>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="max-w-5xl mx-auto mt-16 pt-12 border-t border-gray-100">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((a) => (
                <Link key={a.id} href={`/blog/${a.slug}`} className="group card-hover bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                  <div className="relative h-40 overflow-hidden">
                    <Image src={getImageUrl(a.cover_image) || 'https://images.unsplash.com/photo-1586096538339-0a0df57d50dd?w=400&q=80'} alt={a.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-cyan-600 transition-colors">{a.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{a.published_at ? formatDate(a.published_at) : ''}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
