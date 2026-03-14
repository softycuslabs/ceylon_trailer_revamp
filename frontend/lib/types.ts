// Province types
export type Province =
  | 'Northern'
  | 'North Central'
  | 'North Western'
  | 'Central'
  | 'Eastern'
  | 'Sabaragamuwa'
  | 'Western'
  | 'Southern'
  | 'Uva'

// Activity types
export type ActivityType =
  | 'archaeological'
  | 'waterfalls'
  | 'hiking'
  | 'leisure'
  | 'beach'
  | 'boating'
  | 'kayaking'
  | 'cycling'
  | 'wildlife'
  | 'cultural'

// Trip types
export type TripType =
  | 'adventure'
  | 'cultural'
  | 'wildlife'
  | 'beach'
  | 'pilgrimage'
  | 'honeymoon'
  | 'family'
  | 'group'

// Gallery categories
export type GalleryCategory =
  | 'destinations'
  | 'wildlife'
  | 'culture'
  | 'landscape'
  | 'people'
  | 'food'
  | 'accommodation'

// Destination models
export interface DestinationImage {
  id: number
  image: string
  caption: string
  order: number
}

export interface Destination {
  id: number
  name: string
  slug: string
  description: string
  short_description: string
  province: Province
  image: string | null
  images?: DestinationImage[]
  map_lat: string | null
  map_lng: string | null
  featured: boolean
  created_at: string
  updated_at: string
}

// Trip models
export interface TripImage {
  id: number
  image: string
  caption: string
  order: number
}

export interface TripItineraryDay {
  id: number
  day_number: number
  title: string
  description: string
  activities: string[]
}

export interface TripListItem {
  id: number
  title: string
  slug: string
  destination_name: string
  destination_province: Province
  destination_slug: string
  duration_days: number
  price: string | null
  short_description: string
  cover_image: string | null
  trip_type: TripType
  activities: string[]
  featured: boolean
}

export interface Trip extends TripListItem {
  destination: Destination
  description: string
  images: TripImage[]
  highlights: string[]
  itinerary: TripItineraryDay[]
  created_at: string
  updated_at: string
}

// Gallery model
export interface GalleryImage {
  id: number
  title: string
  image: string
  category: GalleryCategory
  destination_name: string | null
  destination_slug: string | null
  caption: string
  order: number
  is_featured: boolean
  created_at: string
}

// Blog model
export interface TravelArticle {
  id: number
  title: string
  slug: string
  author: string
  cover_image: string | null
  content?: string
  excerpt: string
  destination_name?: string | null
  destination_slug?: string | null
  tags: string[]
  published_at: string
  created_at: string
  updated_at?: string
}

// Testimonial model
export interface Testimonial {
  id: number
  name: string
  country: string
  avatar: string | null
  rating: number
  comment: string
  trip_title: string | null
  created_at: string
}

// Inquiry model
export interface InquiryPayload {
  name: string
  email: string
  phone: string
  country: string
  message: string
  trip?: number | null
  destination?: number | null
  travel_date?: string | null
  number_of_travelers?: number
}

// API response
export interface ApiResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

// Filter params
export interface DestinationFilters {
  province?: Province
  featured?: boolean
  search?: string
  ordering?: string
  page?: number
}

export interface TripFilters {
  trip_type?: TripType
  featured?: boolean
  destination_slug?: string
  province?: Province
  min_price?: number
  max_price?: number
  search?: string
  ordering?: string
  page?: number
}
