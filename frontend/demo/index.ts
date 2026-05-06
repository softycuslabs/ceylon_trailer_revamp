/**
 * Demo data barrel export.
 *
 * Import from here, not from individual files, so future refactors only
 * need to update this one file.
 *
 * Example:
 *   import { getAllDemoDestinations, getFeaturedDemoDestinations } from '@/demo'
 */
export {
  DEMO_DESTINATIONS,
  getAllDemoDestinations,
  getFeaturedDemoDestinations,
  getDemoDestinationBySlug,
  getAllDemoDestinationSlugs,
  getDemoDestinationsPaginated,
} from './destinations'

export { DESTINATION_EXTRAS } from './destination-extras'
export type { DestinationExtras } from './destination-extras'
