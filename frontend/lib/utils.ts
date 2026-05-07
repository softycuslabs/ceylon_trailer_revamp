import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: string | number | null): string {
  if (!price) return 'Contact for price'
  const num = typeof price === 'string' ? parseFloat(price) : price
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num)
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function getWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function getImageUrl(path: string | null | undefined): string {
  if (!path) return '/images/placeholder.jpg'
  if (path.startsWith('http')) return path
  if (path.startsWith('/')) return path  // local public/ file
  return `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}/${path}`
}

export const PROVINCES = [
  'Northern',
  'North Central',
  'North Western',
  'Central',
  'Eastern',
  'Sabaragamuwa',
  'Western',
  'Southern',
  'Uva',
] as const

export const ACTIVITIES = [
  { value: 'archaeological', label: 'Archaeological' },
  { value: 'waterfalls', label: 'Waterfalls' },
  { value: 'hiking', label: 'Hiking' },
  { value: 'leisure', label: 'Leisure Time' },
  { value: 'beach', label: 'Beach Events' },
  { value: 'boating', label: 'Boating' },
  { value: 'kayaking', label: 'Kayaking' },
  { value: 'cycling', label: 'Cycling' },
  { value: 'wildlife', label: 'Wildlife Safari' },
  { value: 'cultural', label: 'Cultural' },
] as const

export const TRIP_TYPES = [
  { value: 'adventure', label: 'Adventure' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'wildlife', label: 'Wildlife' },
  { value: 'beach', label: 'Beach' },
  { value: 'pilgrimage', label: 'Pilgrimage' },
  { value: 'honeymoon', label: 'Honeymoon' },
  { value: 'family', label: 'Family' },
  { value: 'group', label: 'Group' },
] as const
