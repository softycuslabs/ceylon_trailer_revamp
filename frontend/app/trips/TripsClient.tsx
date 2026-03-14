'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import TripCard from '@/components/trips/TripCard'
import Pagination from '@/components/shared/Pagination'
import { getTrips } from '@/lib/api'
import type { TripListItem } from '@/lib/types'
import { PROVINCES, ACTIVITIES, TRIP_TYPES } from '@/lib/utils'

const PAGE_SIZE = 12

export default function TripsClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [trips, setTrips] = useState<TripListItem[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [openSections, setOpenSections] = useState({ destination: true, activities: true, tripTypes: true })

  const province = searchParams.get('province') || ''
  const tripType = searchParams.get('trip_type') || ''
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
    router.push(`/trips?${params.toString()}`)
  }

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getTrips({ province: province as any, trip_type: tripType as any, search, page })
      setTrips(data.results)
      setTotalCount(data.count)
    } catch {
      setTrips([])
    } finally {
      setLoading(false)
    }
  }, [province, tripType, search, page])

  useEffect(() => { fetchData() }, [fetchData])

  const toggle = (section: keyof typeof openSections) =>
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))

  return (
    <>
      <PageHero
        title="Trip Packages"
        image="https://images.unsplash.com/photo-1571723141164-d89e3c67f6eb?w=1920&q=80"
        breadcrumbs={[{ label: 'Trip Packages' }]}
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

                {/* Province */}
                <div className="mb-4">
                  <button onClick={() => toggle('destination')} className="w-full flex items-center justify-between py-2 text-sm font-semibold text-gray-800">
                    Destination {openSections.destination ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openSections.destination && (
                    <div className="mt-2 space-y-1.5">
                      {PROVINCES.slice(0, 5).map((p) => (
                        <label key={p} className="flex items-center gap-2.5 cursor-pointer">
                          <input type="radio" name="province" value={p} checked={province === p} onChange={() => updateParams({ province: p })} className="accent-cyan-500" />
                          <span className="text-sm text-gray-600">{p}</span>
                        </label>
                      ))}
                      {province && <button onClick={() => updateParams({ province: '' })} className="text-xs text-cyan-500 hover:underline">Clear</button>}
                    </div>
                  )}
                </div>

                <hr className="my-3 border-gray-100" />

                {/* Activities */}
                <div className="mb-4">
                  <button onClick={() => toggle('activities')} className="w-full flex items-center justify-between py-2 text-sm font-semibold text-gray-800">
                    Activities {openSections.activities ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openSections.activities && (
                    <div className="mt-2 space-y-1.5">
                      {ACTIVITIES.slice(0, 4).map((a) => (
                        <label key={a.value} className="flex items-center gap-2.5 cursor-pointer">
                          <input type="checkbox" className="accent-cyan-500" />
                          <span className="text-sm text-gray-600">{a.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <hr className="my-3 border-gray-100" />

                {/* Trip Types */}
                <div>
                  <button onClick={() => toggle('tripTypes')} className="w-full flex items-center justify-between py-2 text-sm font-semibold text-gray-800">
                    Trip Types {openSections.tripTypes ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openSections.tripTypes && (
                    <div className="mt-2 space-y-1.5">
                      {TRIP_TYPES.map((t) => (
                        <label key={t.value} className="flex items-center gap-2.5 cursor-pointer">
                          <input type="radio" name="trip_type" value={t.value} checked={tripType === t.value} onChange={() => updateParams({ trip_type: t.value })} className="accent-cyan-500" />
                          <span className="text-sm text-gray-600">{t.label}</span>
                        </label>
                      ))}
                      {tripType && <button onClick={() => updateParams({ trip_type: '' })} className="text-xs text-cyan-500 hover:underline">Clear</button>}
                    </div>
                  )}
                </div>
              </div>
            </aside>

            {/* Main */}
            <main className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text" defaultValue={search}
                    onKeyDown={(e) => { if (e.key === 'Enter') updateParams({ search: (e.target as HTMLInputElement).value }) }}
                    placeholder="Search trips..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white"
                  />
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                      <div className="h-56 bg-gray-200" />
                      <div className="p-5 space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-3 bg-gray-200 rounded w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : trips.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl">
                  <p className="text-gray-500 text-lg">No trips found. Try different filters.</p>
                </div>
              ) : (
                <>
                  <div className="text-sm text-gray-500 mb-4">{totalCount} trips found</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {trips.map((trip) => <TripCard key={trip.id} trip={trip} />)}
                  </div>
                  <Pagination
                    currentPage={page} totalPages={totalPages}
                    onPageChange={(p) => {
                      const params = new URLSearchParams(searchParams.toString())
                      params.set('page', String(p))
                      router.push(`/trips?${params.toString()}`)
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
