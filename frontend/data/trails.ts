import { Trail } from '@/types/trail';

export interface DetailedStop {
  id: string;
  name: string;
  shortName?: string;
  description: string;
  categoryTag?: string;
  estimatedMinutes?: number;
  locationLabel?: string;
  refCode?: string;
  plateTag?: string;
  plateImage?: string;
  fieldNote?: string;
  curatorClue?: string;
  recommendedItem?: string;
  bearing?: string;
  distanceMarker?: string;
  distanceKm?: number;
  legLabel?: string;
  corridorLabel?: string;
  surfaceType?: string;
  elevationChange?: string;
  elevationProfile?: string;
  quarterContext?: string;
  nextWalkDistance?: string;
  nextWalkTime?: string;
}

export interface RichTrail extends Trail {
  indexRef?: string;
  cadenceLabel?: string;
  localeLabel?: string;
  fieldLeadNotes?: string;
  heroImage?: string;
  departurePoint?: string;
  terrainProfile?: string;
  optimalHours?: string;
  detailedStops?: DetailedStop[];
}

export const mockTrails: RichTrail[] = [
  {
    id: 'hidden-cafes-panaji',
    title: 'Hidden Cafés of Panaji',
    subtitle: 'A slow route through independent cafés, a quiet bookstore and a small piece of street art.',
    description:
      'A slow route through independent cafés, a quiet bookstore and a small piece of street art winding through historic Portuguese quarters.',
    category: 'food',
    categoryTags: ['FOOD', 'CULTURE'],
    city: 'Panaji',
    distanceKm: 3.2,
    durationMinutes: 120,
    difficulty: 'easy',
    featured: true,
    orderBadge: '01 — TRAIL',
    coverImage: '/images/explore-card-1.jpg',
    featuredImage: '/images/explore-featured-bodega.jpg',
    heroImage: '/images/td-hero-capture.jpg',
    indexRef: 'INDEX REF // GOA-PNJ-01',
    cadenceLabel: 'Slow Pace',
    localeLabel: 'Panaji, Goa',
    fieldLeadNotes: 'Recommended start at early morning light to catch courtyard bakeries before midday humidity.',
    departurePoint: 'Fontainhas Gate',
    terrainProfile: 'Cobblestone / Flat',
    optimalHours: '08:30 AM or 16:30 PM',
    detailedStops: [
      {
        id: 'stop-1',
        name: 'Hidden Café',
        shortName: 'Hidden Café',
        categoryTag: 'COFFEE · ROASTERY',
        estimatedMinutes: 30,
        locationLabel: 'FONTAINHAS COURTYARD',
        refCode: 'REF: FNT-CF-01',
        plateTag: 'PLATE // 01-A',
        plateImage: '/images/td-plate-01.jpg',
        distanceMarker: '0.0 KM',
        distanceKm: 0.0,
        legLabel: 'STATION 01',
        bearing: '042° NE',
        corridorLabel: 'ALTO BOCA DE VACA',
        surfaceType: 'PORTUGUESE BASALT',
        elevationChange: '+0M → +2M GRADIENT',
        elevationProfile: '+2M',
        description:
          'Start slowly with a locally loved café tucked away from the busiest streets. Hand-poured Goan blends, quiet courtyard seating, and morning sunlight filtering through terracotta tiles.',
        curatorClue:
          'Look for the unmarked doorway behind the yellow bougainvillea wall. Step through the wooden vestibule into the rear flagstone patio.',
        quarterContext:
          'The early morning light enters through terracotta tiles, warming the aged stone masonry before the tropical heat builds.',
        nextWalkDistance: '0.8 KM AWAY',
        nextWalkTime: '~10 MIN WALK',
      },
      {
        id: 'stop-2',
        name: 'Independent Bookstore',
        shortName: 'Ind. Bookstore',
        categoryTag: 'BOOKS · CULTURE',
        estimatedMinutes: 25,
        locationLabel: 'RUA 31 DE JANEIRO, ALTO FONTAINHAS',
        refCode: 'REF: FNT-BK-02',
        plateTag: 'PLATE // 02-B',
        plateImage: '/images/active-trail/bookstore.jpg',
        distanceMarker: '0.8 KM',
        distanceKm: 0.8,
        legLabel: 'STATION 02',
        bearing: '310° NW',
        corridorLabel: 'RUA 31 DE JANEIRO CORRIDOR',
        surfaceType: 'HERITAGE COBBLESTONE',
        elevationChange: '+2M → +6M GRADIENT',
        elevationProfile: '+6M',
        description:
          'A small independent bookstore worth wandering through before continuing. Shelves are stocked with local Goan histories, poetry, and vintage prints.',
        curatorClue:
          'Look for the unmarked cedar drawer behind the regional poetry section. The owner has preserved original hand-drawn nautical charts of the Mandovi estuary from 1954.',
        quarterContext:
          'Fontainhas was developed in the late 18th century as the residential quarter of Portuguese officials. Buildings maintain strict historic colour coding refreshed annually after monsoons.',
        nextWalkDistance: '0.8 KM AWAY',
        nextWalkTime: '~11 MIN WALK',
      },
      {
        id: 'stop-3',
        name: 'Street Art Corner',
        shortName: 'Street Art Corner',
        categoryTag: 'ART',
        estimatedMinutes: 15,
        locationLabel: 'CHAPEL LANE INTERSECTION',
        refCode: 'REF: FNT-ART-03',
        plateTag: 'PLATE // 03-C',
        plateImage: '/images/active-trail/next_thumb.jpg',
        distanceMarker: '1.6 KM',
        distanceKm: 1.6,
        legLabel: 'STATION 03',
        bearing: '280° W',
        corridorLabel: 'CHAPEL PASSAGEWAY',
        surfaceType: 'LATERITE FLAGSTONE',
        elevationChange: '+6M → +10M GRADIENT',
        elevationProfile: '+10M',
        description:
          'Tucked inside an alleyway off the main thoroughfare, celebrating coastal maritime folklore and indigenous botanical pigments.',
        curatorClue:
          'Updated seasonally by local artists from the Goa College of Art. Natural lime plasters and indigenous ochre dyes give the texture its distinct velvet finish.',
        quarterContext:
          'Narrow lanes here acted as natural wind corridors, channeling evening sea breezes up from the river into residential courtyards.',
        nextWalkDistance: '1.6 KM AWAY',
        nextWalkTime: '~18 MIN WALK',
      },
      {
        id: 'stop-4',
        name: 'Sunset Viewpoint',
        shortName: 'Sunset Viewpoint',
        categoryTag: 'NATURE · VIEW',
        estimatedMinutes: 40,
        locationLabel: 'MANDOVI WATERFRONT PROMENADE',
        refCode: 'REF: FNT-TRM-04',
        plateTag: 'PLATE // 04-D',
        plateImage: '/images/td-plate-04.jpg',
        distanceMarker: '3.2 KM',
        distanceKm: 3.2,
        legLabel: 'STATION 04',
        bearing: '265° W',
        corridorLabel: 'MANDOVI EMBANKMENT',
        surfaceType: 'GRANITE PROMENADE',
        elevationChange: '+10M → +14M GRADIENT',
        elevationProfile: '+14M',
        description:
          'Finish the trail somewhere quieter, with time to slow down and take in the evening. A stone-paved riverside promenade looking west across the Mandovi estuary as fishing vessels return.',
        curatorClue:
          'Benches under the century-old rain trees offer continuous sea breezes and a clear horizon view toward the Arabian Sea mouth.',
        quarterContext:
          'At dusk, the bells of the Church of Our Lady of the Immaculate Conception echo across the estuary water as wooden fishing trawlers navigate the bar.',
        nextWalkDistance: '0.0 KM',
        nextWalkTime: 'TRAIL COMPLETED',
      }],
    stops: [
      { id: 'stop-1', name: 'Fontainhas Bakery', description: 'Traditional wood-fired ovens producing authentic Goan poi.', estimatedMinutes: 30 },
      { id: 'stop-2', name: 'Heritage Bookstore', description: 'Rare books on regional architecture and quiet alcoves.', estimatedMinutes: 25 },
      { id: 'stop-3', name: 'Chapel Mural', description: 'St. Sebastian whitewashed walls with azulejos tile art.', estimatedMinutes: 15 },
      { id: 'stop-4', name: 'Sunset Viewpoint', description: 'Stone-paved riverside promenade looking west across Mandovi.', estimatedMinutes: 40 },
    ],
  },
  {
    id: 'old-streets-and-stories',
    title: 'Old Streets & Stories',
    subtitle: 'Traverse centuries of colonial architecture, quiet courtyards, and forgotten public squares.',
    description:
      'Traverse centuries of colonial architecture, quiet courtyards, and forgotten public squares with historic stories etched in every stone.',
    category: 'culture',
    categoryTags: ['CULTURE', 'HISTORY'],
    city: 'Panaji',
    distanceKm: 2.8,
    durationMinutes: 90,
    difficulty: 'easy',
    featured: false,
    orderBadge: '02 — TRAIL',
    coverImage: '/images/explore-card-2.jpg',
    heroImage: '/images/explore-card-2.jpg',
    indexRef: 'INDEX REF // GOA-PNJ-02',
    cadenceLabel: 'Steady Walk',
    localeLabel: 'Panaji, Goa',
    fieldLeadNotes: 'Best explored in the mid-morning when archival libraries open and courtyards are quiet.',
    departurePoint: 'Church Square',
    terrainProfile: 'Paved / Arched Steps',
    optimalHours: '10:00 AM or 15:30 PM',
    stops: [
      { id: 'stop-1', name: 'Central Library Archives', description: 'Historic archival library with grand arches.' },
      { id: 'stop-2', name: 'Largo da Igreja', description: 'Pristine whitewashed church steps with sprawling views.' },
      { id: 'stop-3', name: 'Mahalaxmi Temple Steps', description: 'Ancient stone temple precinct and shaded gardens.' },
      { id: 'stop-4', name: 'Old Secretariat Veranda', description: 'Colonial river-facing ramparts.' },
      { id: 'stop-5', name: 'Customs Quarter Alley', description: 'Narrow shaded cobblestone walkways to docks.' },
    ],
  },
  {
    id: 'art-after-dark',
    title: 'Art After Dark',
    subtitle: 'Explore clandestine galleries, glowing street murals, and intimate creative spaces after sunset.',
    description:
      'Explore clandestine galleries, glowing street murals, and intimate creative spaces illuminated by warm amber streetlights.',
    category: 'art',
    categoryTags: ['ART', 'NIGHT'],
    city: 'Panaji',
    distanceKm: 4.1,
    durationMinutes: 120,
    difficulty: 'moderate',
    featured: false,
    orderBadge: '03 — TRAIL',
    coverImage: '/images/explore-card-3.jpg',
    heroImage: '/images/explore-card-3.jpg',
    indexRef: 'INDEX REF // GOA-PNJ-03',
    cadenceLabel: 'Evening Drift',
    localeLabel: 'Panaji, Goa',
    fieldLeadNotes: 'Late afternoon through twilight is ideal to watch gallery doors open and lamps illuminate.',
    departurePoint: 'Gitanjali Courtyard',
    terrainProfile: 'Alleys / Level',
    optimalHours: '17:30 PM to 21:00 PM',
    stops: [
      { id: 'stop-1', name: 'Tiger Mural Alley', description: 'Striking open-air mural project lit by evening lamps.' },
      { id: 'stop-2', name: 'Underground Print Studio', description: 'Screenprint artists and independent zine presses.' },
      { id: 'stop-3', name: 'Gallery Gitanjali Garden', description: 'Nighttime open-air readings in restored heritage home.' },
      { id: 'stop-4', name: 'Rooftop Vinyl Den', description: 'Lo-fi beats, warm chai, and vinyl collectors.' },
    ],
  },
  {
    id: 'coastal-slow-walk',
    title: 'Coastal Slow Walk',
    subtitle: 'A gentle breezy route alongside the riverfront, stopping at seaside juice bars and shaded benches.',
    description:
      'A gentle breezy route alongside the riverfront, stopping at seaside juice bars, historic piers, and shaded mahogany benches.',
    category: 'nature',
    categoryTags: ['NATURE', 'FOOD'],
    city: 'Panaji',
    distanceKm: 3.6,
    durationMinutes: 120,
    difficulty: 'easy',
    featured: false,
    orderBadge: '04 — TRAIL',
    coverImage: '/images/explore-card-4.jpg',
    heroImage: '/images/explore-card-4.jpg',
    indexRef: 'INDEX REF // GOA-PNJ-04',
    cadenceLabel: 'Breezy Meander',
    localeLabel: 'Panaji, Goa',
    fieldLeadNotes: 'Catch the late afternoon tide when traditional fishing skiffs return to port.',
    departurePoint: 'Kala Academy Pier',
    terrainProfile: 'Waterfront / Brick Path',
    optimalHours: '16:00 PM to 18:30 PM',
    stops: [
      { id: 'stop-1', name: 'Mandovi Promenade', description: 'Wide palm-lined brick walkway with fishermen launching skiffs.' },
      { id: 'stop-2', name: 'Seaside Tender Coconut Point', description: 'Fresh local fruit and coconut stands under banyan trees.' },
      { id: 'stop-3', name: 'Miramar Sunset Overlook', description: 'Where the river flows into the Arabian Sea.' },
    ],
  },
];

export function getActiveTrailStops(trail: RichTrail): DetailedStop[] {
  if (trail.detailedStops && trail.detailedStops.length > 0) {
    return trail.detailedStops;
  }
  const totalStops = trail.stops?.length || 4;
  const stepDist = trail.distanceKm ? (trail.distanceKm / totalStops).toFixed(1) : '0.8';
  return (trail.stops || []).map((s, idx) => {
    const dist = (idx * Number(stepDist)).toFixed(1);
    const elev = '+' + (idx * 4) + 'M';
    return {
      id: s.id,
      name: s.name,
      shortName: s.name,
      categoryTag: idx === 0 ? 'START' : idx === totalStops - 1 ? 'TERMINUS' : 'WAYPOINT',
      estimatedMinutes: s.estimatedMinutes || 20,
      locationLabel: s.location?.address || (trail.city || 'Panaji') + ' Historic Quarter',
      refCode: 'REF: ' + trail.id.slice(0, 3).toUpperCase() + '-0' + (idx + 1),
      plateTag: 'PLATE // 0' + (idx + 1),
      plateImage: idx === 0 ? trail.coverImage : idx === 1 ? '/images/active-trail/bookstore.jpg' : idx === 2 ? '/images/active-trail/next_thumb.jpg' : trail.heroImage || '/images/td-plate-04.jpg',
      distanceMarker: dist + ' KM',
      distanceKm: Number(dist),
      legLabel: 'STATION 0' + (idx + 1),
      bearing: ((idx * 70 + 40) % 360) + '°',
      corridorLabel: s.name + ' Corridor',
      surfaceType: 'Heritage Pavement',
      elevationChange: elev + ' → +' + ((idx + 1) * 4) + 'M GRADIENT',
      elevationProfile: elev,
      description: s.description,
      curatorClue: 'Notice the local architectural details and quiet courtyards near ' + s.name + '.',
      quarterContext: 'An essential sector in the curated discovery traverse of ' + trail.title + '.',
      nextWalkDistance: idx < totalStops - 1 ? stepDist + ' KM AWAY' : '0.0 KM',
      nextWalkTime: idx < totalStops - 1 ? '~' + Math.round(Number(stepDist) * 12) + ' MIN WALK' : 'TRAIL COMPLETED',
    };
  });
}

export function saveCustomTrail(trail: RichTrail) {
  if (typeof window !== 'undefined') {
    try {
      window.sessionStorage.setItem('trail_' + trail.id, JSON.stringify(trail));
      window.sessionStorage.setItem('last_custom_trail', JSON.stringify(trail));
    } catch (e) {
      console.error(e);
    }
  }
  const existing = mockTrails.findIndex((t) => t.id === trail.id);
  if (existing >= 0) {
    mockTrails[existing] = trail;
  } else {
    mockTrails.unshift(trail);
  }
}
