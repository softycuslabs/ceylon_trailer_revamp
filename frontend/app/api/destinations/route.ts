import { NextRequest, NextResponse } from 'next/server'
import { listDestinations, fetchFeaturedDestinations } from '@/lib/destinations-data'
import type { DestinationFilters } from '@/lib/types'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const featured = searchParams.get('featured')

  // /api/destinations?featured=true → returns featured array
  if (featured === 'true') {
    const results = await fetchFeaturedDestinations()
    return NextResponse.json(results)
  }

  // /api/destinations?province=Central&search=kandy&page=1
  const filters: DestinationFilters = {
    province: (searchParams.get('province') as DestinationFilters['province']) || undefined,
    search: searchParams.get('search') || undefined,
    page: Number(searchParams.get('page') || 1),
  }

  const data = await listDestinations(filters)
  return NextResponse.json(data)
}
