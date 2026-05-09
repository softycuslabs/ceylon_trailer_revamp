/**
 * Extra data per destination: gallery images, key highlights, and what we offer.
 * Keyed by slug. Merged into the destination object by getDemoDestinationBySlug().
 *
 * Replace Unsplash images with real photos once available.
 */

import type { DestinationImage } from '@/lib/types'

export interface DestinationExtras {
  images: DestinationImage[]
  highlights: { title: string; description: string }[]
  what_we_offer: string[]
}

export const DESTINATION_EXTRAS: Record<string, DestinationExtras> = {
  kandy: {
    images: [
      { id: 101, image: '/images/destinations/kandy.jpg', caption: 'Temple of the Tooth Relic', order: 1 },
      { id: 102, image: '/images/destinations/kandy-2.jpg', caption: 'Kandy Lake at dusk', order: 2 },
      { id: 103, image: '/images/destinations/kandy-3.jpg', caption: 'Royal Botanical Gardens', order: 3 },
      { id: 104, image: '/images/destinations/kandy-4.jpg', caption: 'Esala Perahera festival', order: 4 },
    ],
    highlights: [
      { title: 'Temple of the Tooth Relic', description: 'One of the most revered Buddhist sites in the world, renowned for its stunning architecture and peaceful ritual atmosphere.' },
      { title: 'Royal Botanical Gardens', description: 'A beautiful 147-acre natural setting ideal for nature lovers, featuring over 4,000 species of plants.' },
      { title: 'Kandy Lake', description: 'A serene man-made lake in the heart of the city, perfect for a relaxing lakeside walk at sunrise or sunset.' },
      { title: 'Esala Perahera Festival', description: 'Annual festival featuring traditional dancers, drummers, and decorated elephants parading through the city streets.' },
    ],
    what_we_offer: ['City Tours & Temple Visits', 'Hotel Bookings & Day Excursions', 'Train Transfers & Local Experiences'],
  },

  trincomalee: {
    images: [
      { id: 201, image: '/images/destinations/trincomalee.jpg', caption: 'Nilaveli Beach', order: 1 },
    ],
    highlights: [
      { title: 'Beaches & Resorts', description: 'Relax on the golden sands of Nilaveli and Uppuveli beaches, famous for their crystal-clear waters and tranquil atmosphere.' },
      { title: 'Pigeon Island Snorkeling', description: 'Glide above vibrant coral reefs alongside colorful fish, turtles, and even blacktip reef sharks. Guided tours for all skill levels.' },
      { title: 'Cultural & City Tours', description: 'Visit the iconic Koneswaram Temple, Fort Frederick, and the ancient Kanniya Hot Water Springs.' },
      { title: 'Whale Watching', description: 'Spot blue whales, sperm whales, and dolphins on guided boat tours. Best season: February–April and August–September.' },
    ],
    what_we_offer: ['Beach Resorts & Local Stays', 'Snorkeling at Pigeon Island', 'Cultural & City Tours'],
  },

  dambulla: {
    images: [
      { id: 301, image: '/images/destinations/dambulla.jpg', caption: 'Cave temple exterior', order: 1 },
    ],
    highlights: [
      { title: 'Ancient Buddhist Heritage', description: 'Five main caves filled with over 150 Buddha statues and vibrant murals dating back to the 1st century BCE.' },
      { title: 'Stunning Murals', description: 'Cave walls and ceilings adorned with intricate frescoes covering more than 2,100 square meters.' },
      { title: 'Sacred Atmosphere', description: 'A living temple where visitors can witness the devotion of pilgrims and monks in a serene, spiritual setting.' },
    ],
    what_we_offer: ['Cultural Tour Packages', 'Hotel & Cabana Options Nearby', 'Combo Tours with Sigiriya'],
  },

  yala: {
    images: [
      { id: 401, image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=1200&q=80', caption: 'Sri Lankan leopard', order: 1 },
    ],
    highlights: [
      { title: 'Leopard Sightings', description: 'Yala has one of the highest densities of leopards in the world, offering excellent chances of sighting these elusive big cats.' },
      { title: 'Wildlife Diversity', description: 'Spot elephants, sloth bears, crocodiles, and a rich variety of bird species across diverse habitats.' },
      { title: 'Scenic Safari Terrain', description: 'Explore lagoons, open plains, forests, and beaches — a breathtaking natural environment throughout.' },
    ],
    what_we_offer: ['Guided Jeep Safari Tours', 'Luxury & Eco Camp Stays', 'Birdwatching & Nature Experiences'],
  },

  'adams-peak': {
    images: [
      { id: 501, image: '/images/destinations/adams-peak.jpg', caption: 'Adam\'s Peak summit at sunrise', order: 1 },
    ],
    highlights: [
      { title: 'Sacred Footprint', description: 'The summit features a footprint-shaped rock formation revered by Buddhists, Hindus, Muslims, and Christians alike.' },
      { title: 'Spectacular Sunrise', description: 'Panoramic views of misty valleys and lush forests at dawn, including the famous "Adam\'s Peak Shadow" phenomenon.' },
      { title: 'Night Climb Tradition', description: 'Many pilgrims and travelers start their trek after midnight to reach the summit in time for the awe-inspiring sunrise.' },
    ],
    what_we_offer: ['Guided Treks to Summit', 'Transport & Lodge Facilities', 'Night Climbs for Sunrise Viewing'],
  },

  ambuluwawa: {
    images: [
      { id: 601, image: '/images/destinations/ambuluwawa.jpg', caption: 'Ambuluwawa spiral tower', order: 1 },
    ],
    highlights: [
      { title: 'Multi-Religious Harmony', description: 'The ~48-meter spiral tower houses places of worship for Buddhism, Hinduism, Islam, and Christianity.' },
      { title: 'Panoramic Views', description: 'On clear days, visitors can see the Knuckles Mountain Range, Sri Pada, Bible Rock, and Piduruthalagala Mountain.' },
      { title: 'Biodiversity Complex', description: 'Home to over 200 plant species and rich wildlife within the larger Ambuluwawa Biodiversity Complex.' },
    ],
    what_we_offer: ['Private Day Tours', 'Transport & Meals', 'Photo Stops & Local Experience'],
  },

  mirissa: {
    images: [
      { id: 701, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80', caption: 'Mirissa beach at sunset', order: 1 },
    ],
    highlights: [
      { title: 'Whale Watching Tours', description: 'One of the best places in the world to spot blue whales, sperm whales, and dolphins. Best season: November to April.' },
      { title: 'Surfing & Dolphin Trips', description: 'Gentle warm waters ideal for beginners and experienced surfers. Private lessons and dolphin-watching trips available.' },
      { title: 'Coconut Tree Hill & Parrot Rock', description: 'Iconic spots offering breathtaking views, especially at sunrise and sunset.' },
    ],
    what_we_offer: ['Whale Watching Tours', 'Beachfront Hotels & Cabanas', 'Private Surfing & Dolphin Trips'],
  },

  galle: {
    images: [
      { id: 801, image: '/images/destinations/galle.jpg', caption: 'Galle Fort ramparts', order: 1 },
    ],
    highlights: [
      { title: 'Galle Fort', description: 'Cobbled streets lined with preserved Dutch colonial buildings, art galleries, boutique shops, and cafes overlooking the Indian Ocean.' },
      { title: 'Landmark Architecture', description: 'The Dutch Reformed Church, iconic lighthouse, clock tower, and coral-and-granite ramparts offering stunning sea views.' },
      { title: 'Cultural Heritage', description: 'A unique fusion of European military design with tropical adaptation, reflecting the city\'s multi-ethnic heritage.' },
    ],
    what_we_offer: ['Galle Fort Guided Walks', 'Boutique Hotels & Villas', 'Beach Visits & Cultural Tours'],
  },

  sinharaja: {
    images: [
      { id: 901, image: '/images/destinations/sinharaja.jpg', caption: 'Sinharaja rainforest canopy', order: 1 },
    ],
    highlights: [
      { title: 'Rainforest Trekking & Bird Watching', description: 'Guided treks reveal endemic bird species like the Sri Lanka Blue Magpie amid dense, lush forest trails.' },
      { title: 'Eco Lodges & Camping', description: 'Eco-friendly accommodations and camping sites surrounded by the lush greenery for an authentic rainforest experience.' },
      { title: 'Nature Photography', description: 'Sinharaja\'s dramatic landscapes, wildlife, and vibrant plant life provide ideal settings for photography.' },
    ],
    what_we_offer: ['Rainforest Trekking Tours', 'Eco Lodge Accommodations', 'Nature Photography Tours'],
  },

  polonnaruwa: {
    images: [
      { id: 1001, image: '/images/destinations/polonnaruwa.jpg', caption: 'Gal Vihara rock Buddha', order: 1 },
      { id: 1001, image: '/images/destinations/polonnaruwa-2.jpg', caption: 'Gal Vihara rock Buddha', order: 2 },
      { id: 1001, image: '/images/destinations/polonnaruwa-3.jpg', caption: 'Gal Vihara rock Buddha', order: 3 },
    ],
    highlights: [
      { title: 'Gal Vihara', description: 'Massive rock-cut Buddha statues representing one of the finest examples of ancient Sinhalese stone-carving artistry.' },
      { title: 'Royal Palace Ruins', description: 'The impressive audience hall, Lotus Bath, and remnants of King Parakramabahu I\'s golden era (1153–1186 CE).' },
      { title: 'Advanced Irrigation Systems', description: 'A testament to the engineering genius of medieval Sri Lankan civilization.' },
    ],
    what_we_offer: ['Guided Bicycle & Walking Tours', 'Heritage Hotels & Lodges', 'Combined Cultural Triangle Packages'],
  },

  'nuwara-eliya': {
    images: [
      { id: 1101, image: '/images/destinations/nuwara-eliya.jpg', caption: 'Tea plantation hills', order: 1 },
    ],
    highlights: [
      { title: 'Ceylon Tea Estates', description: 'Home to some of the finest Ceylon tea in the world. Guided tea plantation visits and tasting tours are a highlight.' },
      { title: 'Colonial Heritage', description: "Queen's Cottage, Hill Club, and other colonial-era landmarks preserve the town's charming British nostalgia." },
      { title: "Horton Plains & Gregory Lake", description: 'Horton Plains National Park is famous for World\'s End cliffs and rare wildlife; Gregory Lake for scenic walks and boating.' },
    ],
    what_we_offer: ['Tea Estate Tours & Tastings', 'Luxury Bungalows & Hotels', 'Horton Plains & Gregory Lake Tours'],
  },

  sigiriya: {
    images: [
      { id: 1201, image: '/images/destinations/sigiriya.jpg', caption: 'Sigiriya Lion Rock fortress', order: 1 },
      { id: 1202, image: '/images/destinations/sigiriya-2.jpg', caption: 'Ancient frescoes on the rock face', order: 2 },
      { id: 1203, image: '/images/destinations/sigiriya-3.jpg', caption: 'Royal water gardens', order: 3 },
    ],
    highlights: [
      { title: 'Ancient Frescoes', description: 'Stunning paintings of celestial maidens on the sheltered rock face — extraordinary examples of ancient Sri Lankan artistic skill.' },
      { title: 'Lion Gate', description: 'The famous entrance flanked by giant stone lion\'s paws — the feature that gives the rock its legendary name.' },
      { title: 'Royal Gardens & Hydraulics', description: 'Terraced gardens, moats, and sophisticated water-retaining systems demonstrating advanced 5th-century engineering.' },
    ],
    what_we_offer: ['Guided Rock Fortress Climbs', 'Nearby Hotel & Cabana Stays', 'Cultural Combo Tours'],
  },

  wilpattu: {
    images: [
      { id: 1301, image: '/images/destinations/wilpattu.jpg', caption: 'Leopard at Wilpattu', order: 1 },
    ],
    highlights: [
      { title: 'Sri Lankan Leopards', description: 'Some of the best leopard sightings in Sri Lanka, thanks to the park\'s relatively low tourism and natural habitat.' },
      { title: 'Rich Wildlife', description: 'Sri Lankan elephants, sloth bears, spotted and sambar deer, crocodiles, and over 200 bird species.' },
      { title: 'Cultural Significance', description: 'Located near ancient Anuradhapura, the park contains archaeological ruins and is a Ramsar Wetland.' },
    ],
    what_we_offer: ['Guided Jeep Safaris', 'Camping & Day-Nighting Tours', 'Nearby Hotel & Eco Lodge Options'],
  },

  hikkaduwa: {
    images: [
      { id: 1401, image: '/images/destinations/hikkaduwa.jpg', caption: 'Hikkaduwa coral reef', order: 1 },
    ],
    highlights: [
      { title: 'Coral Reef & Marine Park', description: 'Sri Lanka\'s first marine national park features over 60 species of hard coral and around 170 species of reef fish.' },
      { title: 'Surfing', description: 'Rated the second-best surfing spot in Sri Lanka, with waves ranging from 4 to 11 feet. Best season: November to March.' },
      { title: 'Nightlife & Attractions', description: 'Lively beach parties, the Turtle Hatchery, Seenigama Viharaya temple, and the Tsunami Photo Museum.' },
    ],
    what_we_offer: ['Beachfront Hotels & Villas', 'Snorkeling & Diving Tours', 'Surfboard Rentals & Lessons'],
  },

  'arugam-bay': {
    images: [
      { id: 1501, image: '/images/destinations/arugam-bay.jpg', caption: 'Arugam Bay surf break', order: 1 },
    ],
    highlights: [
      { title: 'Main Point', description: 'A long right-hand point break offering 4–10 ft waves and rides up to 500 meters — perfect for intermediate and advanced surfers.' },
      { title: 'Multiple Surf Spots', description: 'Baby Point for beginners, Pottuvil Point for the longest rides, plus Lighthouse and Whiskey Point for quieter breaks.' },
      { title: 'Beyond Surfing', description: 'Lagoon safaris and whale watching tours provide a diverse coastal experience for non-surfers too.' },
    ],
    what_we_offer: ['Surfing Lessons & Rentals', 'Beachfront Cabana Stays', 'Whale Watching & Lagoon Safaris'],
  },

  anuradhapura: {
    images: [
      { id: 1601, image: '/images/destinations/anuradhapura.jpg', caption: 'Ruwanwelisaya Stupa', order: 1 },
    ],
    highlights: [
      { title: 'Ruwanwelisaya Stupa', description: 'One of the largest ancient Buddhist monuments in the world, dating from the 3rd century BCE.' },
      { title: 'Ancient Urban Planning', description: 'Sophisticated road networks, irrigation systems, and architectural marvels of an advanced ancient civilization.' },
      { title: 'UNESCO World Heritage Site', description: 'The ruins span over 40 square kilometers, preserved as a site of global cultural importance.' },
    ],
    what_we_offer: ['Guided Heritage Tours', 'Hotel & Transport Packages', 'Cultural Insight Experiences'],
  },

  ella: {
    images: [
      { id: 1701, image: '/images/destinations/ella.jpg', caption: 'Nine Arches Bridge', order: 1 },
      { id: 1702, image: '/images/destinations/ella-2.jpg', caption: 'Tea fields at Ella', order: 2 },
    ],
    highlights: [
      { title: "Little Adam's Peak & Ella Rock", description: 'Easy-to-moderate hikes with sweeping views of valleys and panoramic highland vistas.' },
      { title: 'Nine Arches Bridge', description: 'A stunning colonial-era engineering masterpiece set amid vibrant green terraced tea fields — one of Sri Lanka\'s most photographed landmarks.' },
      { title: 'Scenic Train Ride', description: 'Ella is a highlight on one of the world\'s most picturesque train journeys — the Kandy to Ella route through terraced tea fields.' },
    ],
    what_we_offer: ['Nature Trails & Hikes', 'Cabana & Eco Lodge Stays', 'Scenic Train Rides & Local Cuisine'],
  },

  jaffna: {
    images: [
      { id: 1801, image: '/images/locations/jaffna.jpg', caption: 'Jaffna cultural landmark', order: 1 },
    ],
    highlights: [
      { title: 'Nallur Kandaswamy Kovil', description: 'One of the most important Hindu temples in Sri Lanka, hosting grand festivals including Tamil New Year and Thaipongal celebrations.' },
      { title: 'Jaffna Fort & Islands', description: 'The colonial-era fort and tranquil islands — including Delft with its wild horses and Portuguese ruins.' },
      { title: 'Northern Cuisine', description: 'Distinctive spicy curries, seafood delicacies, and unique local flavors cherished across the entire island.' },
    ],
    what_we_offer: ['Cultural & Religious Tours', 'Hotel & Transport Arrangements', 'Island Hopping & Local Food Trails'],
  },
}
