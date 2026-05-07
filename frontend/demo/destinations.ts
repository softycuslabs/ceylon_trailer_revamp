/**
 * DEMO DATA — Ceylon Trailer Destinations
 *
 * This file is temporary. It will be removed once the backend API is live
 * and the admin dashboard is seeded with this data.
 *
 * Data source: CeylonTrailer_Destinations_Guide.docx (18 destinations)
 * Image source: Place real images in /public/images/locations/<slug>.jpg
 *               Until then, Unsplash placeholders are used.
 *
 * TO ADD YOUR OWN IMAGES:
 *   1. Drop a .jpg/.webp file into frontend/public/images/locations/
 *   2. Name it exactly as the slug (e.g. sigiriya.jpg)
 *   3. Update the `image` field below to `/images/locations/<slug>.jpg`
 */

import type { Destination } from '@/lib/types'
import { DESTINATION_EXTRAS } from './destination-extras'

export const DEMO_DESTINATIONS: Destination[] = [
  {
    id: 1,
    name: 'Kandy – The Cultural Capital',
    slug: 'kandy',
    province: 'Central',
    short_description:
      'The cultural capital of Sri Lanka — home to the sacred Temple of the Tooth Relic, lush Botanical Gardens, and the legendary Esala Perahera festival.',
    description:
      'Kandy, known as the cultural capital of Sri Lanka, is a fascinating destination rich in history, spirituality, and natural beauty. At the heart of Kandy lies the sacred Temple of the Tooth Relic, one of the most important Buddhist sites in the world. Visitors come to admire its stunning architecture and experience the peaceful atmosphere during daily rituals. The Royal Botanical Gardens offer a beautiful natural setting ideal for nature lovers, while Kandy Lake provides a serene spot for a relaxing lakeside walk. The annual Esala Perahera festival features traditional dancers, drummers, and decorated elephants parading through the city streets — a truly unique cultural experience.',
    image: '/images/destinations/kandy.jpg',
    images: [],
    map_lat: '7.2906',
    map_lng: '80.6337',
    featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'Trincomalee – Coastal Heritage & Natural Beauty',
    slug: 'trincomalee',
    province: 'Eastern',
    short_description:
      'A stunning coastal city where ancient heritage meets pristine beaches, whale watching, and world-class snorkeling at Pigeon Island.',
    description:
      'Discover Trincomalee, a stunning coastal city on Sri Lanka\'s northeast, where ancient heritage meets breathtaking natural beauty. Known for its pristine beaches, vibrant temples, soothing hot springs, and world-class whale watching, Trincomalee is one of the island\'s oldest and most captivating port cities. Relax on the golden sands of Nilaveli and Uppuveli beaches, glide above vibrant coral reefs at Pigeon Island alongside colorful fish, turtles, and even blacktip reef sharks. Visit the iconic Koneswaram Temple, Fort Frederick, and the ancient Kanniya Hot Water Springs. Best whale watching season: February–April and August–September.',
    image: '/images/destinations/trincomalee.jpg',
    images: [],
    map_lat: '8.5874',
    map_lng: '81.2152',
    featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 3,
    name: 'Dambulla Cave Temple – Rock of Faith',
    slug: 'dambulla',
    province: 'Central',
    short_description:
      'Sri Lanka\'s largest cave temple complex — a UNESCO World Heritage Site with over 150 Buddha statues and 2,100 sq. meters of ancient murals.',
    description:
      'Experience the awe of the Dambulla Cave Temple, Sri Lanka\'s largest and best-preserved cave temple complex. Perched atop a massive rock, this UNESCO World Heritage Site has been a revered pilgrimage destination for over 2,000 years, celebrated for its spiritual significance and breathtaking artistry. Five main caves are filled with over 150 Buddha statues and vibrant murals dating back to the 1st century BCE — among the finest examples of Buddhist art in South Asia. Cave walls and ceilings are adorned with intricate frescoes covering more than 2,100 square meters, depicting scenes from the Buddha\'s life and Sri Lankan history.',
    image: '/images/destinations/dambulla.jpg',
    images: [],
    map_lat: '7.8567',
    map_lng: '80.6497',
    featured: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 4,
    name: 'Yala – Safari Adventure',
    slug: 'yala',
    province: 'Southern',
    short_description:
      'Home to one of the highest leopard densities in the world — a thrilling safari destination with elephants, sloth bears, and diverse birdlife.',
    description:
      'Embark on a thrilling safari adventure in Yala, where leopards, elephants, and nature\'s wonders roam free. Yala National Park is one of Sri Lanka\'s most iconic wildlife destinations, offering unforgettable encounters with diverse fauna in a stunning natural landscape. Yala has one of the highest densities of leopards in the world, offering excellent chances of sighting these elusive big cats. Spot elephants, sloth bears, crocodiles, and a rich variety of bird species across diverse habitats including lagoons, open plains, forests, and beaches.',
    image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=80',
    images: [],
    map_lat: '6.3728',
    map_lng: '81.5162',
    featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 5,
    name: "Adam's Peak – A Sacred Summit",
    slug: 'adams-peak',
    province: 'Sabaragamuwa',
    short_description:
      'A sacred mountain revered by four religions — climbed at night to witness a breathtaking sunrise above the clouds and the famous Peak Shadow.',
    description:
      "Adam's Peak, also known as Sri Pada, is one of Sri Lanka's most sacred mountains, revered by Buddhists, Hindus, Muslims, and Christians alike. This legendary peak draws thousands of pilgrims and adventure seekers every year who climb its steep steps to witness a breathtaking sunrise above the clouds. The summit features a footprint-shaped rock formation revered by multiple religions — believed to be left by the Buddha, Shiva, Adam, or St. Thomas depending on tradition. Climbers are rewarded with panoramic views of misty valleys and lush forests at dawn, including the famous 'Adam's Peak Shadow' phenomenon. Many pilgrims and travelers start their trek after midnight to reach the summit in time for the awe-inspiring sunrise.",
    image: '/images/destinations/adams-peak.jpg',
    images: [],
    map_lat: '6.8096',
    map_lng: '80.4994',
    featured: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 6,
    name: 'Ambuluwawa – Tower in the Sky',
    slug: 'ambuluwawa',
    province: 'Central',
    short_description:
      'Sri Lanka\'s first multi-religious sanctuary with a unique 48-meter spiral tower offering 360° views of five mountain ranges.',
    description:
      'Explore Ambuluwawa, Sri Lanka\'s first multi-religious sanctuary, perched atop Ambuluwawa Mountain near Gampola. Famous for its unique spiral tower and panoramic 360° views, this site offers visitors a rare combination of spiritual harmony, natural beauty, and cultural richness. The ~48-meter spiral tower houses places of worship for Buddhism, Hinduism, Islam, and Christianity — a unique symbol of peaceful coexistence. On clear days, visitors can see the Knuckles Mountain Range, Sri Pada (Adam\'s Peak), Bible Rock, and Piduruthalagala Mountain. The wider Ambuluwawa Biodiversity Complex is home to over 200 plant species and rich wildlife.',
    image: '/images/destinations/ambuluwawa.jpg',
    images: [],
    map_lat: '7.1667',
    map_lng: '80.5833',
    featured: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 7,
    name: 'Mirissa – Ocean Adventures Await',
    slug: 'mirissa',
    province: 'Southern',
    short_description:
      'A tropical beach paradise on the south coast — world-renowned for blue whale watching, surfing, Coconut Tree Hill, and stunning sunset views.',
    description:
      'Mirissa is a tropical paradise on Sri Lanka\'s south coast, famous for its whale watching, surfing, and stunning beach sunsets. This vibrant beach town offers a perfect blend of relaxation and adventure, attracting travelers who want to experience both natural beauty and lively local culture. Renowned as one of the best places in the world to spot blue whales, sperm whales, and dolphins — best season: November to April. Gentle warm waters are ideal for both beginner and experienced surfers, with private surfing lessons and dolphin-watching trips available. Coconut Tree Hill and Parrot Rock are iconic spots offering breathtaking views, especially at sunrise and sunset.',
    image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80',
    images: [],
    map_lat: '5.9483',
    map_lng: '80.4574',
    featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 8,
    name: 'Galle – Colonial Charm & Coastal Beauty',
    slug: 'galle',
    province: 'Southern',
    short_description:
      'A UNESCO World Heritage coastal city — the iconic Galle Fort blends Dutch colonial architecture with boutique shops, galleries, and Indian Ocean views.',
    description:
      'Galle is a captivating coastal city in Sri Lanka, best known for its historic Galle Fort — a UNESCO World Heritage Site showcasing a unique blend of European colonial architecture and South Asian traditions. Originally built by the Portuguese in 1588 and extensively fortified by the Dutch in the 17th century. Cobbled streets are lined with preserved Dutch colonial buildings, art galleries, boutique shops, and cafes overlooking the Indian Ocean. Landmark architecture includes the Dutch Reformed Church, iconic lighthouse, clock tower, and coral-and-granite ramparts offering stunning sea views. The city reflects a unique fusion of European military design with tropical adaptation.',
    image: '/images/destinations/galle.jpg',
    images: [],
    map_lat: '6.0535',
    map_lng: '80.2210',
    featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 9,
    name: 'Sinharaja – Rainforest Wilderness',
    slug: 'sinharaja',
    province: 'Southern',
    short_description:
      'Sri Lanka\'s last remaining tropical rainforest — a UNESCO Biosphere Reserve rich in endemic species, eco lodges, and dramatic nature photography.',
    description:
      'Sinharaja Forest Reserve is a pristine UNESCO Biosphere Reserve and one of Sri Lanka\'s last remaining tropical rainforests. Famous for its rich endemic flora and fauna, Sinharaja is a sanctuary for nature lovers and eco explorers seeking to immerse themselves in biodiversity and untouched wilderness. Guided treks reveal endemic bird species like the Sri Lanka Blue Magpie and Green-billed Coucal amid dense, lush forest trails. Eco-friendly accommodations and camping sites surrounded by the lush greenery offer an authentic rainforest experience. Sinharaja\'s dramatic landscapes, wildlife, and vibrant plant life provide ideal settings for nature photography.',
    image: '/images/destinations/sinharaja.jpg',
    images: [],
    map_lat: '6.3833',
    map_lng: '80.5000',
    featured: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 10,
    name: 'Polonnaruwa – Lost City of Kings',
    slug: 'polonnaruwa',
    province: 'North Central',
    short_description:
      'Sri Lanka\'s magnificent medieval capital — explore the Gal Vihara rock-cut Buddhas, royal palace ruins, and advanced ancient irrigation systems.',
    description:
      'Discover the ancient city of Polonnaruwa, Sri Lanka\'s magnificent medieval capital that flourished between the 11th and 13th centuries. Often called the "Lost City of Kings," Polonnaruwa showcases grand ruins of royal palaces, massive Buddha statues, and well-preserved temples. The Gal Vihara features massive rock-cut Buddha statues representing one of the finest examples of ancient Sinhalese stone-carving artistry. The impressive audience hall, Lotus Bath, and other remnants of King Parakramabahu I\'s golden era (1153–1186 CE) are remarkably preserved. Advanced irrigation systems across the city testify to the engineering genius of medieval Sri Lankan civilization.',
    image: '/images/destinations/polonnaruwa.jpg',
    images: [],
    map_lat: '7.9397',
    map_lng: '81.0188',
    featured: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 11,
    name: 'Nuwara Eliya – Little England',
    slug: 'nuwara-eliya',
    province: 'Central',
    short_description:
      'A scenic hill town at 1,868m — famous for Ceylon tea estates, Tudor colonial architecture, Horton Plains\' World\'s End cliffs, and Gregory Lake.',
    description:
      'Nuwara Eliya, often called "Little England," is a scenic hill town nestled in Sri Lanka\'s central highlands at about 1,868 meters above sea level, famed for its cool climate, colonial charm, and sprawling tea plantations. Founded and developed by British colonialists in the early 19th century with Tudor-style architecture, manicured gardens, and a golf course. Home to some of the finest Ceylon tea in the world — guided tea plantation visits and tasting tours are a highlight for every visitor. Queen\'s Cottage, Hill Club, and other colonial-era landmarks preserve the town\'s charming British nostalgia. Nearby Horton Plains National Park is famous for World\'s End cliffs and rare wildlife, and Gregory Lake for scenic walks and boating.',
    image: '/images/destinations/nuwara-eliya.jpg',
    images: [],
    map_lat: '6.9497',
    map_lng: '80.7891',
    featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 12,
    name: 'Sigiriya – Lion Rock Fortress',
    slug: 'sigiriya',
    province: 'Central',
    short_description:
      'An iconic UNESCO 5th-century rock fortress rising 200m — famous for its ancient frescoes, giant Lion Gate, and royal water gardens.',
    description:
      'Sigiriya, also known as Lion Rock, is a majestic UNESCO World Heritage Site and one of Sri Lanka\'s most iconic landmarks. Built in the 5th century CE by King Kashyapa I, this ancient rock fortress sits atop a massive granite monolith rising about 200 meters above the surrounding plains. Stunning paintings of celestial maidens on the sheltered rock face are extraordinary examples of ancient Sri Lankan artistic skill. The famous Lion Gate entrance is flanked by giant stone lion\'s paws — the feature that gives the rock its legendary name. Terraced gardens, moats, and sophisticated water-retaining systems demonstrate advanced 5th-century engineering.',
    image: '/images/destinations/sigiriya.jpg',
    images: [],
    map_lat: '7.9570',
    map_lng: '80.7603',
    featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 13,
    name: 'Wilpattu National Park – Land of Lakes & Leopards',
    slug: 'wilpattu',
    province: 'North Central',
    short_description:
      'Sri Lanka\'s largest national park at 131,000 ha — the "Land of Lakes" with top leopard sightings, elephants, sloth bears, and a Ramsar Wetland.',
    description:
      'Wilpattu National Park, spanning over 131,000 hectares, is Sri Lanka\'s largest and one of its oldest protected wilderness areas. Renowned as the "Land of Lakes," Wilpattu is famous for its unique cluster of natural, rainwater-filled basins called "villus," which attract diverse wildlife throughout the year. Some of the best leopard sightings in Sri Lanka occur here, thanks to the park\'s relatively low tourism and natural habitat. Rich wildlife includes Sri Lankan elephants, sloth bears, spotted and sambar deer, crocodiles, and over 200 bird species including endemic varieties. Located near ancient Anuradhapura, the park contains archaeological ruins and is recognized as a Ramsar Wetland of international importance.',
    image: '/images/destinations/wilpattu.jpg',
    images: [],
    map_lat: '8.4014',
    map_lng: '80.0982',
    featured: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 14,
    name: 'Hikkaduwa – Beachside Bliss',
    slug: 'hikkaduwa',
    province: 'Southern',
    short_description:
      'A lively coastal town with Sri Lanka\'s first marine national park — snorkel with sea turtles, surf world-class waves, and explore vibrant coral reefs.',
    description:
      'Hikkaduwa is a lively coastal town on Sri Lanka\'s southwest shore, known for its beautiful beaches, vibrant nightlife, and exciting ocean activities. It is a top destination for travelers seeking snorkeling with sea turtles, diving among colorful coral reefs, and surfing world-class waves. Sri Lanka\'s first marine national park features over 60 species of hard coral and around 170 species of reef fish — sea turtles are commonly spotted. Rated the second-best surfing spot in Sri Lanka, with waves ranging from 4 to 11 feet; best season: November to March. Lively beach parties, the Turtle Hatchery, Seenigama Viharaya temple, and the Tsunami Photo Museum add depth to a beach visit.',
    image: '/images/destinations/hikkaduwa.jpg',
    images: [],
    map_lat: '6.1395',
    map_lng: '80.1066',
    featured: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 15,
    name: 'Arugam Bay – Surf & Serenity',
    slug: 'arugam-bay',
    province: 'Eastern',
    short_description:
      'A world-famous surfing paradise on the east coast — legendary point breaks, golden beaches, lagoon safaris, and a laid-back tropical vibe.',
    description:
      'Arugam Bay, located on Sri Lanka\'s east coast, is a world-famous surfing paradise known for its laid-back vibes, golden beaches, and stunning sunrises. This vibrant beach town attracts surfers, yogis, and beach lovers seeking both adventure and tranquility in a tropical setting. Main Point offers a long right-hand point break with 4–10 ft waves and rides up to 500 meters — perfect for intermediate and advanced surfers. Baby Point is ideal for beginners, Pottuvil Point for the longest rides, plus Lighthouse and Whiskey Point for quieter breaks. Lagoon safaris and whale watching tours provide a diverse coastal experience for non-surfers too.',
    image: '/images/destinations/arugam-bay.jpg',
    images: [],
    map_lat: '6.8395',
    map_lng: '81.8360',
    featured: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 16,
    name: 'Anuradhapura – Ancient Kingdom',
    slug: 'anuradhapura',
    province: 'North Central',
    short_description:
      'Sri Lanka\'s ancient capital from the 5th century BCE — a UNESCO site spanning 40 sq. km with sacred stupas, royal ruins, and millennia-old dagobas.',
    description:
      'Step into the heart of Sri Lanka\'s heritage with Anuradhapura, an ancient city that served as the capital from the 5th century BCE to the 11th century CE. As one of the island\'s most important archaeological and religious centers, it features sacred stupas, royal gardens, and millennia-old ruins. The Ruwanwelisaya Stupa is one of the largest ancient Buddhist monuments in the world, dating from the 3rd century BCE and a major pilgrimage site to this day. Sophisticated road networks, irrigation systems, and architectural marvels testify to an advanced ancient civilization. The UNESCO World Heritage ruins span over 40 square kilometers.',
    image: '/images/destinations/anuradhapura.jpg',
    images: [],
    map_lat: '8.3114',
    map_lng: '80.4037',
    featured: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 17,
    name: 'Ella – Misty Mountain Escape',
    slug: 'ella',
    province: 'Uva',
    short_description:
      'A charming highland town surrounded by tea fields — hike to Little Adam\'s Peak, photograph the Nine Arches Bridge, and ride the world\'s most scenic train.',
    description:
      'Ella is a charming hill town nestled in Sri Lanka\'s central highlands, surrounded by lush tea plantations, stunning waterfalls, and scenic hiking trails. This tranquil mountain escape blends natural beauty with a relaxed vibe, making it a favorite among nature lovers and adventure seekers. Easy-to-moderate hikes to Little Adam\'s Peak and Ella Rock offer sweeping views of valleys and panoramic highland vistas. The Nine Arches Bridge is a stunning colonial-era engineering masterpiece set amid vibrant green terraced tea fields — one of Sri Lanka\'s most photographed landmarks. Ella is a highlight on one of the world\'s most picturesque train journeys — the Kandy to Ella route through terraced tea fields and misty hills.',
    image: '/images/destinations/ella.jpg',
    images: [],
    map_lat: '6.8667',
    map_lng: '81.0466',
    featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 18,
    name: 'Jaffna – Culture Beyond Borders',
    slug: 'jaffna',
    province: 'Northern',
    short_description:
      'The cultural heartland of Sri Lankan Tamils — vibrant Hindu temples, colonial forts, tranquil islands with wild horses, and distinctive northern cuisine.',
    description:
      'Discover Jaffna, the cultural heartland of Sri Lankan Tamils, where a rich Tamil heritage thrives alongside remarkable historical and religious landmarks. Known for its unique Tamil culture, vibrant Hindu temples, pristine islands, and distinctive northern Sri Lankan cuisine. The Nallur Kandaswamy Kovil is one of the most important Hindu temples in Sri Lanka, hosting grand festivals including Tamil New Year and Thaipongal celebrations. The colonial-era Jaffna Fort and tranquil islands — including Delft with its wild horses and Portuguese ruins — add history and adventure. Distinctive spicy curries, seafood delicacies, and unique local flavors are cherished across the entire island.',
    image: '/images/destinations/jaffna.jpg',
    images: [],
    map_lat: '9.6615',
    map_lng: '80.0255',
    featured: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
]

/** Returns all 18 destinations */
export function getAllDemoDestinations(): Destination[] {
  return DEMO_DESTINATIONS
}

/** Returns featured destinations only (where featured === true) */
export function getFeaturedDemoDestinations(): Destination[] {
  return DEMO_DESTINATIONS.filter((d) => d.featured)
}

/** Returns a single destination by slug, with gallery images and extras merged in */
export function getDemoDestinationBySlug(slug: string): Destination | undefined {
  const dest = DEMO_DESTINATIONS.find((d) => d.slug === slug)
  if (!dest) return undefined
  const extras = DESTINATION_EXTRAS[slug]
  if (!extras) return dest
  return { ...dest, images: extras.images }
}

/** Returns all slugs — used by generateStaticParams */
export function getAllDemoDestinationSlugs(): string[] {
  return DEMO_DESTINATIONS.map((d) => d.slug)
}

/**
 * Simulates a paginated API response — mirrors the real ApiResponse<Destination> shape.
 * pageSize default matches the app's PAGE_SIZE constant (12).
 */
export function getDemoDestinationsPaginated(
  page = 1,
  pageSize = 12,
  filters: { province?: string; search?: string } = {}
) {
  let results = DEMO_DESTINATIONS

  if (filters.province) {
    results = results.filter((d) => d.province === filters.province)
  }
  if (filters.search) {
    const q = filters.search.toLowerCase()
    results = results.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.short_description.toLowerCase().includes(q) ||
        d.province.toLowerCase().includes(q)
    )
  }

  const start = (page - 1) * pageSize
  const paginated = results.slice(start, start + pageSize)

  return {
    count: results.length,
    next: page * pageSize < results.length ? `?page=${page + 1}` : null,
    previous: page > 1 ? `?page=${page - 1}` : null,
    results: paginated,
  }
}
