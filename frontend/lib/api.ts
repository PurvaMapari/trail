import { Trail } from '@/types/trail';
import { AIDiscoveryRequest, AIDiscoveryResponse } from '@/types/ai';
import { mockTrails, RichTrail, DetailedStop, saveCustomTrail } from '@/data/trails';
import { curated_spots, Spot } from '@/data/spots';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Fetch all available trails (mock or remote API)
 */
export async function getTrails(): Promise<Trail[]> {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/trails`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback to mock data on error
    }
  }
  return mockTrails;
}

/**
 * Fetch a specific trail by ID
 */
export async function getTrailById(id: string): Promise<Trail | null> {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/trails/${id}`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback to mock data on error
    }
  }
  const trail = mockTrails.find((t) => t.id === id);
  return trail || null;
}

/**
 * Request AI-powered trail discovery suggestions
 */
export async function discoverTrailsWithAI(
  request: AIDiscoveryRequest
): Promise<AIDiscoveryResponse> {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/ai-discovery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback to mock AI response
    }
  }

  // Fallback placeholder mock response
  return {
    query: request.prompt,
    suggestions: [
      {
        title: 'Hidden Literary Cafés & Vintage Bookshops',
        theme: 'Books & Brews',
        summary: 'A curated journey weaving through vintage paperbacks and artisanal pour-overs.',
        estimatedStops: 4,
        highlightCategory: 'bookstores',
        tags: ['quiet', 'artisan', 'historic'],
      },
      {
        title: 'Secret Courtyards & Ceramic Studios',
        theme: 'Artisan Makers',
        summary: 'Discover tucked-away craft workshops, pottery corners, and courtyard greenery.',
        estimatedStops: 5,
        highlightCategory: 'culture',
        tags: ['creative', 'local-makers', 'walkable'],
      },
    ],
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Submit a new trail creation
 */
export async function createTrail(trail: Partial<Trail>): Promise<{ success: boolean; trailId: string }> {
  if (API_BASE_URL) {
    const res = await fetch(`${API_BASE_URL}/trails`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trail),
    });
    if (res.ok) return await res.json();
  }

  return {
    success: true,
    trailId: `trail-${Date.now()}`,
  };
}


export interface AIGenerateParams {
  prompt?: string;
  locus?: string;
  timeHours?: number;
  tags?: string[];
  maxDistanceKm?: number;
}

// ─── Hardcoded fallback trail (used when backend/Gemini is unavailable) ───────

const FALLBACK_TRAIL: RichTrail = {
  id: 'ai-quiet-hours-panaji',
  title: 'The Quiet Hours: Coffee, Canvas & River Light',
  subtitle: 'ROUTE ARCHETYPE: Coffee · Art · Hidden Street · Sunset Terminus',
  description:
    'Synthesized for unhurried contemplative pace across Panaji vintage quarter. Featuring four calibrated anchors selected for low foot traffic and acoustic quiet.',
  category: 'culture',
  categoryTags: ['COFFEE', 'ART', 'HIDDEN STREET', 'SUNSET TERMINUS'],
  city: 'Panaji',
  distanceKm: 3.2,
  durationMinutes: 120,
  difficulty: 'easy',
  featured: true,
  orderBadge: 'AI SYNTHESIS // DOSSIER',
  coverImage: '/images/td-plate-01.jpg',
  featuredImage: '/images/explore-featured-bodega.jpg',
  heroImage: '/images/td-hero-capture.jpg',
  indexRef: 'REF: TR-GOA-2025-084',
  cadenceLabel: 'Unhurried Pace',
  localeLabel: 'Panaji Urban Matrix',
  fieldLeadNotes: 'Calibrated for 18 min/km pedestrian cadence with 3 pause intervals.',
  departurePoint: 'Café Bodega / Sunlit Atrium',
  terrainProfile: 'Cobblestone / Basalt / River Granite',
  optimalHours: 'Late Afternoon (15:45 - 18:00)',
  stops: [
    { id: 'ai-stop-1', name: 'Café Bodega / Sunlit Atrium', description: 'Hand-poured Goan blends in an open 19th-century Portuguese colonial atrium.', estimatedMinutes: 35 },
    { id: 'ai-stop-2', name: 'Gitanjali Gallery & Print Studio', description: 'Intimate studio space exhibiting contemporary Goan printmakers and botanical watercolours.', estimatedMinutes: 30 },
    { id: 'ai-stop-3', name: 'Rua 31 de Janeiro Shaded Arcade', description: 'Quiet cobblestone corridor framed by ochre facades and carved wooden balconies.', estimatedMinutes: 20 },
    { id: 'ai-stop-4', name: 'Mandovi Riverside Stone Embankment', description: 'Low granite seawall looking west over tidal delta sandbars under dusk light.', estimatedMinutes: 35 },
  ],
  detailedStops: [
    {
      id: 'ai-stop-1', name: 'Café Bodega / Sunlit Atrium', shortName: 'Café Bodega',
      categoryTag: 'COFFEE · COURTYARD', estimatedMinutes: 35, locationLabel: 'FONTAINHAS COURTYARD',
      refCode: 'REF: AI-01', plateTag: '01 STARTING ANCHOR', plateImage: '/images/td-plate-01.jpg',
      distanceMarker: '0.0 KM', distanceKm: 0.0, legLabel: 'STATION 01',
      bearing: "15°29'54\"N 73°49'41\"E", corridorLabel: 'COURTYARD PASS', surfaceType: 'BASALT PAVING',
      elevationChange: 'ALT: 12M', elevationProfile: '+12M',
      description: 'Hand-poured Goan blends in an open 19th-century Portuguese colonial atrium. Sunlight through terracotta tiles and unhurried courtyard tables.',
      curatorClue: 'Ask for the daily pour-over roast sourced from Chikmagalur smallholders; seated patio offers natural acoustic isolation.',
      quarterContext: "COORDINATES: 15°29'54\"N 73°49'41\"E · FOOT TRAFFIC: QUIET (<10 P/H) · PEDESTRIAN ACCESS: UNRESTRICTED",
      nextWalkDistance: '0.8 KM AWAY', nextWalkTime: '~11 MIN WALK',
    },
    {
      id: 'ai-stop-2', name: 'Gitanjali Gallery & Print Studio', shortName: 'Gitanjali Gallery',
      categoryTag: 'ART · REGIONAL ARCHIVE', estimatedMinutes: 30, locationLabel: 'HERITAGE STREET',
      refCode: 'REF: AI-02', plateTag: '02 CULTURAL WAYPOINT', plateImage: '/images/active-trail/bookstore.jpg',
      distanceMarker: '+0.9 KM', distanceKm: 0.9, legLabel: 'STATION 02',
      bearing: "15°29'58\"N 73°50'03\"E", corridorLabel: 'GALLERY LANE', surfaceType: 'WOOD FLOORING / FLAGSTONE',
      elevationChange: '+0.9 KM', elevationProfile: '+8M',
      description: 'Intimate studio space exhibiting contemporary Goan printmakers and botanical watercolours away from tourist thoroughfares.',
      curatorClue: 'The rear gallery holds rare lithographs of the Mandovi estuary and hand-pulled woodblock prints.',
      quarterContext: "COORDINATES: 15°29'58\"N 73°50'03\"E · FOOT TRAFFIC: MINIMAL · GALLERY ACCESS: FREE ENTRY",
      nextWalkDistance: '0.8 KM AWAY', nextWalkTime: '~10 MIN WALK',
    },
    {
      id: 'ai-stop-3', name: 'Rua 31 de Janeiro Shaded Arcade', shortName: 'Rua 31 Arcade',
      categoryTag: 'HIDDEN STREET · ARCHITECTURE', estimatedMinutes: 20, locationLabel: 'RUA 31 DE JANEIRO',
      refCode: 'REF: AI-03', plateTag: '03 PASSAGEWAY', plateImage: '/images/active-trail/next_thumb.jpg',
      distanceMarker: '+0.8 KM', distanceKm: 1.7, legLabel: 'STATION 03',
      bearing: "15°29'50\"N 73°50'11\"E", corridorLabel: 'RUA 31 DE JANEIRO', surfaceType: 'WORN BASALT PAVING',
      elevationChange: '+0.8 KM', elevationProfile: '+6M',
      description: 'Quiet cobblestone corridor framed by ochre facades, carved wooden balconies, and drooping magenta bougainvillea canopy.',
      curatorClue: 'Pedestrian-only passage; ideal for slow photographic study and acoustic quiet without vehicular interruption.',
      quarterContext: "COORDINATES: 15°29'50\"N 73°50'11\"E · FOOT TRAFFIC: SCATTERED LOCALS · SURFACE: WORN BASALT PAVING",
      nextWalkDistance: '1.5 KM AWAY', nextWalkTime: '~18 MIN WALK',
    },
    {
      id: 'ai-stop-4', name: 'Mandovi Riverside Stone Embankment', shortName: 'Mandovi Embankment',
      categoryTag: 'SUNSET · SHORE PERCH', estimatedMinutes: 35, locationLabel: 'MANDOVI WATERFRONT',
      refCode: 'REF: AI-04', plateTag: '04 TERMINUS', plateImage: '/images/td-plate-04.jpg',
      distanceMarker: '+1.5 KM', distanceKm: 3.2, legLabel: 'STATION 04',
      bearing: "15°30'02\"N 73°49'50\"E", corridorLabel: 'RIVERSIDE SEAWALL', surfaceType: 'POLISHED RIVER GRANITE',
      elevationChange: '+1.5 KM', elevationProfile: '+2M',
      description: 'Low granite seawall looking west over tidal delta sandbars as traditional wooden passenger ferry boats cross under dusk light.',
      curatorClue: 'Arrive calibrated for golden hour light (17:45); sit on the lower stone terrace facing Betim jetty for best horizon angle.',
      quarterContext: "COORDINATES: 15°30'02\"N 73°49'50\"E · LIGHTING: PEAK AMBER (17:30-18:15) · SURFACE: POLISHED RIVER GRANITE",
      nextWalkDistance: '0.0 KM', nextWalkTime: 'TRAIL COMPLETED',
    },
  ],
};

/**
 * Creates an intelligent curated trail dynamically matching user prompt and tags.
 */
export function createCuratedTrail(params?: AIGenerateParams): RichTrail {
  const prompt = params?.prompt?.trim() || 'A morning espresso, historic bookshop, and shady alley walk';
  const tags = params?.tags && params.tags.length > 0 ? params.tags : ['Coffee', 'Art', 'Quiet'];
  const duration = Math.round((params?.timeHours ?? 2) * 60);
  const q = (prompt + ' ' + tags.join(' ')).toLowerCase();
  const tokens = q.split(/\s+/).filter((t) => t.length > 2);

  // Score spots from curated dataset
  const scored = curated_spots.map((spot) => {
    let score = 0;
    const hay = `${spot.name} ${spot.description} ${spot.curatorNote} ${spot.vibes.join(' ')} ${spot.categoryTags.join(' ')} ${spot.category} ${spot.location.quarter}`.toLowerCase();
    for (const token of tokens) {
      if (hay.includes(token)) score += 3;
    }
    if (q.includes('coffee') || q.includes('cafe')) {
      if (spot.category === 'coffee' || hay.includes('coffee') || hay.includes('cafe')) score += 7;
    }
    if (q.includes('book') || q.includes('read')) {
      if (spot.category === 'bookstore' || hay.includes('book')) score += 7;
    }
    if (q.includes('art') || q.includes('mural') || q.includes('gallery')) {
      if (spot.category === 'art' || spot.category === 'street-art' || hay.includes('art')) score += 7;
    }
    if (q.includes('sunset') || q.includes('river') || q.includes('view')) {
      if (spot.category === 'viewpoint' || hay.includes('river') || hay.includes('sunset')) score += 7;
    }
    if (spot.highlighted) score += 1;
    return { spot, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const topSpots = scored.filter((s) => s.score > 0).map((s) => s.spot);
  const selectedSpots = topSpots.length >= 3 ? topSpots.slice(0, 4) : curated_spots.slice(0, 4);

  const plateImages = [
    '/images/td-plate-01.jpg',
    '/images/active-trail/bookstore.jpg',
    '/images/active-trail/next_thumb.jpg',
    '/images/td-plate-04.jpg',
  ];

  let cumulativeKm = 0;
  const detailedStops: DetailedStop[] = selectedSpots.map((spot, i) => {
    const isFirst = i === 0;
    const isLast = i === selectedSpots.length - 1;
    const legDistance = isFirst ? 0 : Math.round((0.5 + i * 0.4) * 10) / 10;
    cumulativeKm += legDistance;
    const stationNum = String(i + 1).padStart(2, '0');

    return {
      id: `ai-stop-${spot.id}-${i + 1}`,
      name: spot.name,
      shortName: spot.shortName || spot.name.split('/')[0].trim(),
      description: spot.description,
      categoryTag: `${spot.category.toUpperCase()} · ${spot.location.quarter.toUpperCase()}`,
      estimatedMinutes: spot.estimatedMinutes || 25,
      locationLabel: spot.location.quarter.toUpperCase(),
      refCode: `REF: PNJ-${stationNum}`,
      plateTag: isFirst ? '01 STARTING ANCHOR' : isLast ? `${stationNum} TERMINUS WAYPOINT` : `${stationNum} INTERMEDIATE STATION`,
      plateImage: plateImages[i % plateImages.length],
      distanceMarker: isFirst ? '0.0 KM' : `+${legDistance.toFixed(1)} KM`,
      distanceKm: Math.round(cumulativeKm * 10) / 10,
      legLabel: `STATION ${stationNum}`,
      bearing: `${spot.location.lat.toFixed(4)}°N ${spot.location.lng.toFixed(4)}°E`,
      corridorLabel: `${spot.location.quarter.toUpperCase()} PEDESTRIAN CORRIDOR`,
      surfaceType: i % 2 === 0 ? 'BASALT COBBLESTONE' : 'FLAGSTONE & HYDRAULIC TILES',
      elevationChange: `+${i * 3 + 2}M`,
      elevationProfile: `+${i * 3 + 2}M`,
      curatorClue: spot.curatorNote,
      quarterContext: `COORDINATES: ${spot.location.lat.toFixed(4)}°N ${spot.location.lng.toFixed(4)}°E · FOOT TRAFFIC: ${spot.footTraffic.toUpperCase()} · NOISE: ${spot.noiseLevel.toUpperCase()}`,
      nextWalkDistance: isLast ? '0.0 KM' : `${legDistance > 0 ? legDistance : 0.8} KM AWAY`,
      nextWalkTime: isLast ? 'TRAIL COMPLETED' : `~${Math.round((spot.walkTimeFromCenterMin || 10) * 0.9)} MIN WALK`,
    };
  });

  const firstSpot = selectedSpots[0];
  const lastSpot = selectedSpots[selectedSpots.length - 1];
  const title = `The ${firstSpot.category === 'coffee' ? 'Barista & Courtyard' : 'Artisan'} Path: ${firstSpot.shortName || firstSpot.name} to ${lastSpot.shortName || lastSpot.name}`;

  return {
    ...FALLBACK_TRAIL,
    id: `ai-trail-${Date.now()}`,
    title,
    subtitle: `ROUTE ARCHETYPE: ${tags.join(' · ').toUpperCase()}`,
    description: `Synthesized trail calibrated for "${prompt.slice(0, 90)}". Featuring unhurried pedestrian cadence across Panaji historic matrix with verified low foot traffic.`,
    categoryTags: tags.map((t) => t.toUpperCase()),
    durationMinutes: duration,
    distanceKm: Math.max(1.8, Math.round(cumulativeKm * 10) / 10),
    localeLabel: params?.locus ?? 'Panaji, Goa',
    departurePoint: firstSpot.name,
    stops: selectedSpots.map((s, idx) => ({
      id: `ai-stop-${idx + 1}`,
      name: s.name,
      description: s.description,
      estimatedMinutes: s.estimatedMinutes || 25,
    })),
    detailedStops,
  };
}

/**
 * Generate a RichTrail using Gemini via /api/generate-trail endpoint.
 * Falls back to curated trail synthesis if AI/backend is offline.
 */
export async function generateTrail(params?: AIGenerateParams): Promise<RichTrail> {
  const prompt = params?.prompt?.trim() || 'A morning espresso, historic bookshop, and shady alley walk';

  const payload = {
    prompt,
    locus: params?.locus ?? 'Panaji, Goa',
    timeHours: params?.timeHours ?? 2,
    tags: params?.tags ?? ['Coffee', 'Art', 'Quiet'],
    maxDistanceKm: params?.maxDistanceKm ?? 5,
  };

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
  const endpoints: string[] = [];
  if (backendUrl && backendUrl !== 'http://localhost:3000' && !backendUrl.endsWith(':3000')) {
    endpoints.push(`${backendUrl}/api/generate-trail`);
  }
  endpoints.push('/api/generate-trail');

  for (const endpoint of endpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data?.trail && data.trail.detailedStops?.length > 0) {
          const trail = data.trail as RichTrail;
          const merged: RichTrail = {
            ...FALLBACK_TRAIL,
            ...trail,
            durationMinutes: trail.durationMinutes ?? Math.round((params?.timeHours ?? 2) * 60),
          };
          saveCustomTrail(merged);
          return merged;
        }
      }
    } catch (err) {
      console.warn(`[generateTrail] Attempt on ${endpoint} failed:`, err);
    }
  }

  // Graceful fallback: synthesize curated trail from knowledge dataset
  console.info('[generateTrail] Using curated knowledge synthesis for trail discovery.');
  const curated = createCuratedTrail({ ...params, prompt });
  saveCustomTrail(curated);
  return curated;
}

