/**
 * Unified data access layer for destinations.
 *
 * This module is the ONLY place pages/components should call to get destination data.
 * It checks USE_DEMO_DATA and routes to either demo data or the real API.
 *
 * SWITCHING MODES:
 *   Demo mode:  set USE_DEMO_DATA=true  in .env.local
 *   Live mode:  set USE_DEMO_DATA=false (or remove the variable)
 *
 * MIGRATION PATH:
 *   When the backend is fully seeded, delete demo/ and remove the demo branches here.
 */

import type { ApiResponse, Destination, DestinationFilters } from './types'
import {
  getDestinations,
  getDestination,
  getFeaturedDestinations,
  getAllDestinationSlugs,
} from './api'
import {
  getAllDemoDestinations,
  getFeaturedDemoDestinations,
  getDemoDestinationBySlug,
  getAllDemoDestinationSlugs,
  getDemoDestinationsPaginated,
} from '@/demo'

const USE_DEMO = process.env.NEXT_PUBLIC_USE_DEMO_DATA === 'true'

/** List destinations — with optional province / search / page filters */
export async function listDestinations(
  params?: DestinationFilters
): Promise<ApiResponse<Destination>> {
  if (USE_DEMO) {
    return getDemoDestinationsPaginated(params?.page ?? 1, 12, {
      province: params?.province,
      search: params?.search,
    })
  }
  return getDestinations(params)
}

/** Single destination by slug */
export async function fetchDestination(slug: string): Promise<Destination> {
  if (USE_DEMO) {
    const dest = getDemoDestinationBySlug(slug)
    if (!dest) throw new Error(`Demo destination not found: ${slug}`)
    return dest
  }
  return getDestination(slug)
}

/** Featured destinations for the home page carousel */
export async function fetchFeaturedDestinations(): Promise<Destination[]> {
  if (USE_DEMO) {
    return getFeaturedDemoDestinations()
  }
  return getFeaturedDestinations()
}

/** All slugs — used by generateStaticParams in the [slug] detail page */
export async function fetchAllDestinationSlugs(): Promise<string[]> {
  if (USE_DEMO) {
    return getAllDemoDestinationSlugs()
  }
  return getAllDestinationSlugs()
}

/** All destinations (no pagination) — useful for sitemaps and admin views */
export function getAllDestinations(): Destination[] {
  if (USE_DEMO) {
    return getAllDemoDestinations()
  }
  throw new Error('getAllDestinations() is only available in demo mode. Use listDestinations() instead.')
}
