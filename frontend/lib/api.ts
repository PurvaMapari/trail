import { Trail } from '@/types/trail';
import { AIDiscoveryRequest, AIDiscoveryResponse } from '@/types/ai';
import { mockTrails, RichTrail, saveCustomTrail } from '@/data/trails';

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

/**
 * Generate a complete RichTrail using simulated AI synthesis matching the Figma design
 */
export async function generateTrail(params?: AIGenerateParams): Promise<RichTrail> {
  // Simulate network latency (420ms as indicated in Figma design)
  await new Promise((resolve) => setTimeout(resolve, 420));

  const id = 'ai-quiet-hours-panaji';

  const trail: RichTrail = {
    id,
    title: 'The Quiet Hours: Coffee, Canvas & River Light',
    subtitle: 'ROUTE ARCHETYPE: Coffee · Art · Hidden Street · Sunset Terminus',
    description:
      'Synthesized for unhurried contemplative pace across Panaji vintage quarter. Featuring four calibrated anchors selected for low foot traffic and acoustic quiet.',
    category: 'culture',
    categoryTags: ['COFFEE', 'ART', 'HIDDEN STREET', 'SUNSET TERMINUS'],
    city: 'Panaji',
    distanceKm: 3.2,
    durationMinutes: params?.timeHours ? Math.round(params.timeHours * 60) : 120,
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
      {
        id: 'ai-stop-1',
        name: 'Café Bodega / Sunlit Atrium',
        description: 'Hand-poured Goan blends in an open 19th-century Portuguese colonial atrium.',
        estimatedMinutes: 35,
      },
      {
        id: 'ai-stop-2',
        name: 'Gitanjali Gallery & Print Studio',
        description: 'Intimate studio space exhibiting contemporary Goan printmakers and botanical watercolours.',
        estimatedMinutes: 30,
      },
      {
        id: 'ai-stop-3',
        name: 'Rua 31 de Janeiro Shaded Arcade',
        description: 'Quiet cobblestone corridor framed by ochre facades and carved wooden balconies.',
        estimatedMinutes: 20,
      },
      {
        id: 'ai-stop-4',
        name: 'Mandovi Riverside Stone Embankment',
        description: 'Low granite seawall looking west over tidal delta sandbars under dusk light.',
        estimatedMinutes: 35,
      },
    ],
    detailedStops: [
      {
        id: 'ai-stop-1',
        name: 'Café Bodega / Sunlit Atrium',
        shortName: 'Café Bodega',
        categoryTag: 'COFFEE · COURTYARD',
        estimatedMinutes: 35,
        locationLabel: 'FONTAINHAS COURTYARD',
        refCode: 'REF: AI-01',
        plateTag: '01 STARTING ANCHOR',
        plateImage: '/images/td-plate-01.jpg',
        distanceMarker: '0.0 KM',
        distanceKm: 0.0,
        legLabel: 'STATION 01',
        bearing: '15°29\'54"N 73°49\'41"E',
        corridorLabel: 'COURTYARD PASS',
        surfaceType: 'BASALT PAVING',
        elevationChange: 'ALT: 12M',
        elevationProfile: '+12M',
        description:
          'Hand-poured Goan blends in an open 19th-century Portuguese colonial atrium. Sunlight through terracotta tiles and unhurried courtyard tables with gentle morning shade.',
        curatorClue:
          'Ask for the daily pour-over roast sourced from Chikmagalur smallholders; seated patio offers natural acoustic isolation from the street.',
        quarterContext: 'COORDINATES: 15°29\'54"N 73°49\'41"E · FOOT TRAFFIC: QUIET (<10 P/H) · PEDESTRIAN ACCESS: UNRESTRICTED',
        nextWalkDistance: '0.8 KM AWAY',
        nextWalkTime: '~11 MIN WALK',
      },
      {
        id: 'ai-stop-2',
        name: 'Gitanjali Gallery & Print Studio',
        shortName: 'Gitanjali Gallery',
        categoryTag: 'ART · REGIONAL ARCHIVE',
        estimatedMinutes: 30,
        locationLabel: 'HERITAGE STREET',
        refCode: 'REF: AI-02',
        plateTag: '02 CULTURAL WAYPOINT',
        plateImage: '/images/active-trail/bookstore.jpg',
        distanceMarker: '+0.9 KM',
        distanceKm: 0.9,
        legLabel: 'STATION 02',
        bearing: '15°29\'58"N 73°50\'03"E',
        corridorLabel: 'GALLERY LANE',
        surfaceType: 'WOOD FLOORING / FLAGSTONE',
        elevationChange: '+0.9 KM',
        elevationProfile: '+8M',
        description:
          'Intimate studio space exhibiting contemporary Goan printmakers and botanical watercolours away from tourist thoroughfares. Wooden floors, high ceilings, and quiet archive stacks.',
        curatorClue:
          'The rear gallery holds rare lithographs of the Mandovi estuary and hand-pulled woodblock prints by Panjim artist collectives.',
        quarterContext: 'COORDINATES: 15°29\'58"N 73°50\'03"E · FOOT TRAFFIC: MINIMAL · GALLERY ACCESS: FREE ENTRY',
        nextWalkDistance: '0.8 KM AWAY',
        nextWalkTime: '~10 MIN WALK',
      },
      {
        id: 'ai-stop-3',
        name: 'Rua 31 de Janeiro Shaded Arcade',
        shortName: 'Rua 31 Arcade',
        categoryTag: 'HIDDEN STREET · ARCHITECTURE',
        estimatedMinutes: 20,
        locationLabel: 'RUA 31 DE JANEIRO',
        refCode: 'REF: AI-03',
        plateTag: '03 PASSAGEWAY',
        plateImage: '/images/active-trail/next_thumb.jpg',
        distanceMarker: '+0.8 KM',
        distanceKm: 1.7,
        legLabel: 'STATION 03',
        bearing: '15°29\'50"N 73°50\'11"E',
        corridorLabel: 'RUA 31 DE JANEIRO',
        surfaceType: 'WORN BASALT PAVING',
        elevationChange: '+0.8 KM',
        elevationProfile: '+6M',
        description:
          'Quiet cobblestone corridor framed by ochre facades, carved wooden balconies, and drooping magenta bougainvillea canopy. Filtered maritime breeze corridors.',
        curatorClue:
          'Pedestrian-only passage; ideal for slow photographic study and acoustic quiet without vehicular interruption.',
        quarterContext: 'COORDINATES: 15°29\'50"N 73°50\'11"E · FOOT TRAFFIC: SCATTERED LOCALS · SURFACE: WORN BASALT PAVING',
        nextWalkDistance: '1.5 KM AWAY',
        nextWalkTime: '~18 MIN WALK',
      },
      {
        id: 'ai-stop-4',
        name: 'Mandovi Riverside Stone Embankment',
        shortName: 'Mandovi Embankment',
        categoryTag: 'SUNSET · SHORE PERCH',
        estimatedMinutes: 35,
        locationLabel: 'MANDOVI WATERFRONT',
        refCode: 'REF: AI-04',
        plateTag: '04 TERMINUS',
        plateImage: '/images/td-plate-04.jpg',
        distanceMarker: '+1.5 KM',
        distanceKm: 3.2,
        legLabel: 'STATION 04',
        bearing: '15°30\'02"N 73°49\'50"E',
        corridorLabel: 'RIVERSIDE SEAWALL',
        surfaceType: 'POLISHED RIVER GRANITE',
        elevationChange: '+1.5 KM',
        elevationProfile: '+2M',
        description:
          'Low granite seawall looking west over tidal delta sandbars as traditional wooden passenger ferry boats cross under dusk light. High open sky view.',
        curatorClue:
          'Arrive calibrated for golden hour light (17:45); sit on the lower stone terrace facing Betim jetty for best horizon angle.',
        quarterContext: 'COORDINATES: 15°30\'02"N 73°49\'50"E · LIGHTING: PEAK AMBER (17:30-18:15) · SURFACE: POLISHED RIVER GRANITE',
        nextWalkDistance: '0.0 KM',
        nextWalkTime: 'TRAIL COMPLETED',
      },
    ],
  };

  // Register in custom trail store
  saveCustomTrail(trail);

  return trail;
}
