'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import DestinationCard from '@/components/destinations/DestinationCard'
import Pagination from '@/components/shared/Pagination'
import type { Destination } from '@/lib/types'
import { PROVINCES, ACTIVITIES, TRIP_TYPES } from '@/lib/utils'

const PAGE_SIZE = 12

export default function DestinationsClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [openSections, setOpenSections] = useState({ destination: true, activities: true, tripTypes: false })

  const province = searchParams.get('province') || ''
  const search = searchParams.get('search') || ''
  const page = Number(searchParams.get('page') || 1)

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value)
      else params.delete(key)
    })
    params.delete('page')
    router.push(`/destinations?${params.toString()}`)
  }

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (province) params.set('province', province)
      if (search) params.set('search', search)
      params.set('page', String(page))

      const res = await fetch(`/api/destinations?${params.toString()}`)
      const data = await res.json()
      setDestinations(data.results)
      setTotalCount(data.count)
    } catch {
      setDestinations([])
    } finally {
      setLoading(false)
    }
  }, [province, search, page])

  useEffect(() => { fetchData() }, [fetchData])

  const toggle = (section: keyof typeof openSections) =>
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))

  return (
    <>
      <PageHero
        title="Trip Search Result"
        image="https://images.unsplash.com/photo-1571723141164-d89e3c67f6eb?w=1920&q=80"
        breadcrumbs={[{ label: 'Trip Search Result' }]}
      />

      <div className="bg-gray-50 min-h-screen">
        <div className="container-custom py-12">
          <div className="flex gap-8">
            {/* Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h2 className="font-heading font-bold text-lg text-gray-900 mb-6 flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-cyan-500" />
                  Criteria
                </h2>

                {/* Province filter */}
                <div className="mb-4">
                  <button
                    onClick={() => toggle('destination')}
                    className="w-full flex items-center justify-between py-2 text-sm font-semibold text-gray-800 hover:text-cyan-600"
                  >
                    Destination
                    {openSections.destination ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openSections.destination && (
                    <div className="mt-2 space-y-1.5">
                      {PROVINCES.slice(0, 5).map((p) => (
                        <label key={p} className="flex items-center gap-2.5 cursor-pointer group">
                          <input
                            type="radio"
                            name="province"
                            value={p}
                            checked={province === p}
                            onChange={() => updateParams({ province: p })}
                            className="accent-cyan-500"
                          />
                          <span className="text-sm text-gray-600 group-hover:text-cyan-600">{p}</span>
                        </label>
                      ))}
                      {province && (
                        <button
                          onClick={() => updateParams({ province: '' })}
                          className="text-xs text-cyan-500 hover:underline mt-1"
                        >
                          Clear filter
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <hr className="my-3 border-gray-100" />

                {/* Activities */}
                <div className="mb-4">
                  <button
                    onClick={() => toggle('activities')}
                    className="w-full flex items-center justify-between py-2 text-sm font-semibold text-gray-800 hover:text-cyan-600"
                  >
                    Activities
                    {openSections.activities ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openSections.activities && (
                    <div className="mt-2 space-y-1.5">
                      {ACTIVITIES.slice(0, 4).map((a) => (
                        <label key={a.value} className="flex items-center gap-2.5 cursor-pointer group">
                          <input type="checkbox" className="accent-cyan-500" />
                          <span className="text-sm text-gray-600 group-hover:text-cyan-600">{a.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <hr className="my-3 border-gray-100" />

                {/* Trip Types */}
                <div>
                  <button
                    onClick={() => toggle('tripTypes')}
                    className="w-full flex items-center justify-between py-2 text-sm font-semibold text-gray-800 hover:text-cyan-600"
                  >
                    Trip Types
                    {openSections.tripTypes ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openSections.tripTypes && (
                    <div className="mt-2 space-y-1.5">
                      {TRIP_TYPES.slice(0, 4).map((t) => (
                        <label key={t.value} className="flex items-center gap-2.5 cursor-pointer group">
                          <input type="checkbox" className="accent-cyan-500" />
                          <span className="text-sm text-gray-600 group-hover:text-cyan-600">{t.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 min-w-0">
              {/* Search bar */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    defaultValue={search}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') updateParams({ search: (e.target as HTMLInputElement).value })
                    }}
                    placeholder="Search destinations..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white"
                  />
                </div>
                <select className="text-sm border border-gray-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400">
                  <option>Sort: Recently Added</option>
                  <option>A–Z</option>
                  <option>Z–A</option>
                </select>
              </div>

              {/* Results */}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                      <div className="h-56 bg-gray-200" />
                      <div className="p-5 space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-3 bg-gray-200 rounded w-full" />
                        <div className="h-3 bg-gray-200 rounded w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : destinations.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl">
                  <p className="text-gray-500 text-lg">No destinations found. Try different filters.</p>
                </div>
              ) : (
                <>
                  <div className="text-sm text-gray-500 mb-4">{totalCount} destinations found</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {destinations.map((dest) => (
                      <DestinationCard key={dest.id} destination={dest} />
                    ))}
                  </div>
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={(p) => {
                      const params = new URLSearchParams(searchParams.toString())
                      params.set('page', String(p))
                      router.push(`/destinations?${params.toString()}`)
                    }}
                  />
                </>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  )
}
