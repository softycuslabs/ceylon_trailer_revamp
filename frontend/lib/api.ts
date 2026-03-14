import axios from 'axios'
import type {
  ApiResponse,
  Destination,
  DestinationFilters,
  GalleryImage,
  InquiryPayload,
  TravelArticle,
  Testimonial,
  Trip,
  TripFilters,
  TripListItem,
} from './types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// — Destinations —
export async function getDestinations(params?: DestinationFilters): Promise<ApiResponse<Destination>> {
  const { data } = await apiClient.get<ApiResponse<Destination>>('/destinations/', { params })
  return data
}

export async function getDestination(slug: string): Promise<Destination> {
  const { data } = await apiClient.get<Destination>(`/destinations/${slug}/`)
  return data
}

export async function getFeaturedDestinations(): Promise<Destination[]> {
  const { data } = await apiClient.get<Destination[]>('/destinations/featured/')
  return data
}

export async function getAllDestinationSlugs(): Promise<string[]> {
  const { data } = await apiClient.get<ApiResponse<Destination>>('/destinations/', {
    params: { page_size: 100 },
  })
  return data.results.map((d) => d.slug)
}

// — Trips —
export async function getTrips(params?: TripFilters): Promise<ApiResponse<TripListItem>> {
  const { data } = await apiClient.get<ApiResponse<TripListItem>>('/trips/', { params })
  return data
}

export async function getTrip(slug: string): Promise<Trip> {
  const { data } = await apiClient.get<Trip>(`/trips/${slug}/`)
  return data
}

export async function getFeaturedTrips(): Promise<TripListItem[]> {
  const { data } = await apiClient.get<TripListItem[]>('/trips/featured/')
  return data
}

export async function getAllTripSlugs(): Promise<string[]> {
  const { data } = await apiClient.get<ApiResponse<TripListItem>>('/trips/', {
    params: { page_size: 100 },
  })
  return data.results.map((t) => t.slug)
}

// — Gallery —
export async function getGalleryImages(params?: {
  category?: string
  is_featured?: boolean
  destination?: number
}): Promise<ApiResponse<GalleryImage>> {
  const { data } = await apiClient.get<ApiResponse<GalleryImage>>('/gallery/', { params })
  return data
}

// — Blog —
export async function getArticles(params?: {
  search?: string
  page?: number
}): Promise<ApiResponse<TravelArticle>> {
  const { data } = await apiClient.get<ApiResponse<TravelArticle>>('/blog/', { params })
  return data
}

export async function getArticle(slug: string): Promise<TravelArticle> {
  const { data } = await apiClient.get<TravelArticle>(`/blog/${slug}/`)
  return data
}

export async function getAllArticleSlugs(): Promise<string[]> {
  const { data } = await apiClient.get<ApiResponse<TravelArticle>>('/blog/', {
    params: { page_size: 100 },
  })
  return data.results.map((a) => a.slug)
}

// — Testimonials —
export async function getTestimonials(): Promise<ApiResponse<Testimonial>> {
  const { data } = await apiClient.get<ApiResponse<Testimonial>>('/testimonials/')
  return data
}

// — Inquiries —
export async function createInquiry(payload: InquiryPayload): Promise<{ message: string }> {
  const { data } = await apiClient.post<{ message: string }>('/inquiries/', payload)
  return data
}
