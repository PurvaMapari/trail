import { NextRequest, NextResponse } from 'next/server';
import { curated_spots, Spot } from '@/data/spots';
import { RichTrail, DetailedStop } from '@/data/trails';

interface GenerateRequest {
  prompt: string;
  locus?: string;
  timeHours?: number;
  tags?: string[];
  maxDistanceKm?: number;
  apiKey?: string;
  model?: string;
}

// ─── Curated Dynamic Trail Synthesizer ───────────────────────────────────────
// Generates unique, authentic trails tailored to any user prompt even without Gemini
function synthesizeFromCurated(
  userPrompt: string,
  locus: string = 'Panaji, Goa',
  timeHours: number = 2,
  userTags: string[] = ['Coffee', 'Art', 'Quiet'],
  maxKm: number = 5
): RichTrail {
  const q = (userPrompt + ' ' + userTags.join(' ')).toLowerCase();
  const tokens = q.split(/\s+/).filter((t) => t.length > 2);

  // Score spots according to intent
  const scored = curated_spots.map((spot) => {
    let score = 0;
    const hay = `${spot.name} ${spot.description} ${spot.curatorNote} ${spot.vibes.join(' ')} ${spot.categoryTags.join(' ')} ${spot.category} ${spot.location.quarter}`.toLowerCase();

    for (const token of tokens) {
      if (hay.includes(token)) score += 3;
    }

    // Specific mood boosts
    if (q.includes('coffee') || q.includes('cafe')) {
      if (spot.category === 'coffee' || hay.includes('coffee') || hay.includes('cafe')) score += 5;
    }
    if (q.includes('book') || q.includes('read') || q.includes('paperback')) {
      if (spot.category === 'bookstore' || hay.includes('book')) score += 6;
    }
    if (q.includes('art') || q.includes('mural') || q.includes('gallery')) {
      if (spot.category === 'art' || spot.category === 'street-art' || hay.includes('art') || hay.includes('mural')) score += 6;
    }
    if (q.includes('quiet') || q.includes('peaceful') || q.includes('crowd')) {
      if (spot.footTraffic === 'quiet') score += 4;
      if (spot.noiseLevel === 'silent' || spot.noiseLevel === 'quiet') score += 3;
    }
    if (q.includes('sunset') || q.includes('river') || q.includes('water') || q.includes('view')) {
      if (spot.category === 'viewpoint' || hay.includes('river') || hay.includes('mandovi') || hay.includes('sunset')) score += 6;
    }
    if (q.includes('heritage') || q.includes('colonial') || q.includes('history') || q.includes('alley')) {
      if (spot.category === 'heritage' || hay.includes('fontainhas') || hay.includes('balcony')) score += 5;
    }
    if (q.includes('food') || q.includes('eat') || q.includes('bakery') || q.includes('snack')) {
      if (spot.category === 'food' || hay.includes('bakery') || hay.includes('pastry')) score += 5;
    }

    return { spot, score };
  });

  scored.sort((a, b) => b.score - a.score);

  // Pick 3-4 diverse spots
  const selectedSpots: Spot[] = [];
  const usedCategories = new Set<string>();

  for (const item of scored) {
    if (selectedSpots.length >= 4) break;
    // Prefer diverse categories across the trail
    if (!usedCategories.has(item.spot.category) || selectedSpots.length < 2) {
      selectedSpots.push(item.spot);
      usedCategories.add(item.spot.category);
    }
  }

  // If still less than 3, backfill from remaining
  for (const item of scored) {
    if (selectedSpots.length >= 4) break;
    if (!selectedSpots.some((s) => s.id === item.spot.id)) {
      selectedSpots.push(item.spot);
    }
  }

  const plateImages = [
    '/images/td-plate-01.jpg',
    '/images/active-trail/bookstore.jpg',
    '/images/active-trail/next_thumb.jpg',
    '/images/td-plate-04.jpg',
  ];

  let cumulativeDistance = 0;
  const detailedStops: DetailedStop[] = selectedSpots.map((spot, i) => {
    const isFirst = i === 0;
    const isLast = i === selectedSpots.length - 1;
    const legDistance = isFirst ? 0 : Math.round((0.5 + (i * 0.4)) * 10) / 10;
    cumulativeDistance += legDistance;

    const stationNum = String(i + 1).padStart(2, '0');
    const latStr = `${spot.location.lat.toFixed(4)}°N`;
    const lngStr = `${spot.location.lng.toFixed(4)}°E`;

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
      distanceKm: Math.round(cumulativeDistance * 10) / 10,
      legLabel: `STATION ${stationNum}`,
      bearing: `${latStr} ${lngStr}`,
      corridorLabel: `${spot.location.quarter.toUpperCase()} PEDESTRIAN CORRIDOR`,
      surfaceType: i % 2 === 0 ? 'BASALT COBBLESTONE' : 'FLAGSTONE & HYDRAULIC TILES',
      elevationChange: `+${(i * 3) + 2}M`,
      elevationProfile: `+${(i * 3) + 2}M`,
      curatorClue: spot.curatorNote,
      quarterContext: `COORDINATES: ${latStr} ${lngStr} · FOOT TRAFFIC: ${spot.footTraffic.toUpperCase()} · NOISE: ${spot.noiseLevel.toUpperCase()}`,
      nextWalkDistance: isLast ? '0.0 KM' : `${legDistance > 0 ? legDistance : 0.8} KM AWAY`,
      nextWalkTime: isLast ? 'TRAIL COMPLETED' : `~${Math.round((spot.walkTimeFromCenterMin || 10) * 0.9)} MIN WALK`,
    };
  });

  const durationMin = Math.round(timeHours * 60);
  const totalKm = Math.min(maxKm, Math.max(1.8, Math.round(cumulativeDistance * 10) / 10));

  // Determine Title based on stops and tags
  const firstSpot = selectedSpots[0];
  const lastSpot = selectedSpots[selectedSpots.length - 1];
  const titleKeywords = userTags.slice(0, 3).join(', ');
  const title = `The ${firstSpot?.category === 'coffee' ? 'Barista & Canvas' : 'Artisan'} Path: ${firstSpot?.shortName || firstSpot?.name || 'Panaji'} to ${lastSpot?.shortName || lastSpot?.name || 'Riverfront'}`;

  return {
    id: `ai-trail-${Date.now()}`,
    title,
    subtitle: `ROUTE ARCHETYPE: ${userTags.join(' · ').toUpperCase()}`,
    description: `A custom-calibrated pedestrian itinerary across ${locus}. Shaped around your intent: "${userPrompt.slice(0, 80)}" with low acoustic disruption and curated discovery stops.`,
    category: 'culture',
    categoryTags: userTags.map((t) => t.toUpperCase()),
    city: 'Panaji',
    distanceKm: totalKm,
    durationMinutes: durationMin,
    difficulty: totalKm > 4 ? 'moderate' : 'easy',
    featured: true,
    orderBadge: 'AI SYNTHESIS // DOSSIER',
    coverImage: detailedStops[0]?.plateImage || '/images/td-plate-01.jpg',
    featuredImage: '/images/explore-featured-bodega.jpg',
    heroImage: '/images/td-hero-capture.jpg',
    indexRef: `REF: TR-GOA-2025-${Math.floor(100 + Math.random() * 900)}`,
    cadenceLabel: totalKm <= 2.5 ? 'Contemplative Cadence' : 'Brisk Urban Drift',
    localeLabel: locus,
    fieldLeadNotes: `Calibrated for ${Math.round(durationMin / totalKm)} min/km cadence with ${selectedSpots.length} observational stations.`,
    departurePoint: firstSpot?.name || 'Fontainhas Heritage Gate',
    terrainProfile: 'Cobblestone / Basalt Paving / River Granite',
    optimalHours: 'Late Afternoon (15:30 - 18:30)',
    stops: selectedSpots.map((s, idx) => ({
      id: `ai-stop-brief-${idx + 1}`,
      name: s.name,
      description: s.description,
      estimatedMinutes: s.estimatedMinutes || 25,
    })),
    detailedStops,
  };
}

// ─── Gemini LLM Trail Synthesis ──────────────────────────────────────────────
async function callGeminiForTrail(
  prompt: string,
  locus: string,
  timeHours: number,
  tags: string[],
  maxDistanceKm: number,
  apiKey: string,
  preferredModel?: string
): Promise<RichTrail> {
  const models = [
    preferredModel?.trim() || 'gemini-2.5-flash',
    'gemini-2.5-flash',
    'gemini-2.5-pro',
    'gemini-flash-latest',
  ];

  const durationMinutes = Math.round(timeHours * 60);
  const tagList = tags.join(', ') || 'coffee, art, quiet';
  const variationSeed = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 6);

  const systemPrompt = `[SEED: ${variationSeed}]
You are TRAIL Scout, an expert pedestrian trail architect for ${locus}.
You synthesize curated, walkable, atmospheric urban trails in Panaji, Goa (Fontainhas Latin Quarter, Altinho, Campal, Mandovi Riverfront).
Output MUST be strictly valid JSON — no markdown fences, no explanatory text.

Structure:
{
  "id": "ai-trail-${variationSeed}",
  "title": "Evocative title (6-9 words)",
  "subtitle": "ROUTE ARCHETYPE: ${tags.join(' · ').toUpperCase()}",
  "description": "2-sentence atmospheric description",
  "category": "culture",
  "categoryTags": ["${tags.slice(0, 3).join('", "')}"],
  "city": "Panaji",
  "distanceKm": 3.2,
  "durationMinutes": ${durationMinutes},
  "difficulty": "easy",
  "featured": true,
  "orderBadge": "AI SYNTHESIS // DOSSIER",
  "coverImage": "/images/td-plate-01.jpg",
  "featuredImage": "/images/explore-featured-bodega.jpg",
  "heroImage": "/images/td-hero-capture.jpg",
  "indexRef": "REF: TR-GOA-2025-${Math.floor(100 + Math.random() * 900)}",
  "cadenceLabel": "Unhurried Pace",
  "localeLabel": "${locus}",
  "fieldLeadNotes": "Calibrated pedestrian pace with 4 interval stops.",
  "departurePoint": "First stop name",
  "terrainProfile": "Cobblestone / Basalt / River Granite",
  "optimalHours": "Late Afternoon (15:45 - 18:00)",
  "stops": [
    { "id": "stop-1", "name": "Stop Name", "description": "1-sentence summary", "estimatedMinutes": 30 }
  ],
  "detailedStops": [
    {
      "id": "stop-1",
      "name": "Full stop name",
      "shortName": "Short name",
      "categoryTag": "CATEGORY",
      "estimatedMinutes": 30,
      "locationLabel": "FONTAINHAS",
      "refCode": "REF: AI-01",
      "plateTag": "01 STARTING ANCHOR",
      "plateImage": "/images/td-plate-01.jpg",
      "distanceMarker": "0.0 KM",
      "distanceKm": 0.0,
      "legLabel": "STATION 01",
      "bearing": "15°29'54\\"N 73°49'41\\"E",
      "corridorLabel": "HERITAGE PASS",
      "surfaceType": "BASALT PAVING",
      "elevationChange": "ALT: 12M",
      "elevationProfile": "+12M",
      "description": "Sensory rich 2-sentence description",
      "curatorClue": "Insider tip or local secret",
      "quarterContext": "COORDINATES: 15°29'54\\"N 73°49'41\\"E · FOOT TRAFFIC: QUIET",
      "nextWalkDistance": "0.8 KM AWAY",
      "nextWalkTime": "~10 MIN WALK"
    }
  ]
}
Include exactly 3 or 4 stops within ${maxDistanceKm}km matching vibes: ${tagList}.
For the last stop set nextWalkDistance to "0.0 KM" and nextWalkTime to "TRAIL COMPLETED".`;

  let lastError: Error | null = null;

  for (const model of Array.from(new Set(models))) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: [
            {
              role: 'user',
              parts: [{ text: `Synthesize a unique trail for this request: "${prompt}"` }],
            },
          ],
          generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 1800,
            topP: 0.95,
          },
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        const errText = await res.text().catch(() => '');
        throw new Error(`Gemini ${model} HTTP ${res.status}: ${errText}`);
      }

      const json = await res.json();
      const rawText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error('Empty response from Gemini');

      const cleaned = rawText
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/```\s*$/i, '')
        .trim();

      const parsed = JSON.parse(cleaned) as RichTrail;
      if (!parsed.detailedStops || parsed.detailedStops.length === 0) {
        throw new Error('Gemini response missing detailedStops');
      }

      return parsed;
    } catch (err) {
      lastError = err as Error;
      console.warn(`[API generate-trail] ${model} attempt failed:`, (err as Error).message);
    }
  }

  throw lastError || new Error('All Gemini models failed');
}

// ─── API Route Handler ───────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body: GenerateRequest = await req.json();
    const prompt = body.prompt?.trim();

    if (!prompt) {
      return NextResponse.json({ error: 'Missing prompt parameter' }, { status: 400 });
    }

    const locus = body.locus?.trim() || 'Panaji, Goa';
    const timeHours = body.timeHours ?? 2.0;
    const tags = body.tags && body.tags.length > 0 ? body.tags : ['Coffee', 'Art', 'Quiet'];
    const maxDistanceKm = body.maxDistanceKm ?? 5.0;

    const apiKey =
      body.apiKey?.trim() ||
      req.headers.get('x-gemini-api-key')?.trim() ||
      process.env.GEMINI_API_KEY?.trim() ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY?.trim();

    const preferredModel =
      body.model?.trim() ||
      req.headers.get('x-gemini-model')?.trim() ||
      process.env.GEMINI_MODEL?.trim() ||
      'gemini-2.5-flash';

    // 1. If API key exists, attempt live Gemini synthesis
    if (apiKey) {
      try {
        const geminiTrail = await callGeminiForTrail(
          prompt,
          locus,
          timeHours,
          tags,
          maxDistanceKm,
          apiKey,
          preferredModel
        );

        return NextResponse.json({
          trail: geminiTrail,
          source: 'gemini',
          modelUsed: preferredModel,
        });
      } catch (geminiErr) {
        console.warn('[generate-trail] Live Gemini failed, falling back to dynamic curated engine:', geminiErr);
        // Fall through to dynamic curated engine
      }
    }

    // 2. Intelligent Dynamic Curated Engine (tailors trail to prompt & filters)
    const curatedTrail = synthesizeFromCurated(prompt, locus, timeHours, tags, maxDistanceKm);

    return NextResponse.json({
      trail: curatedTrail,
      source: 'curated-ai-engine',
      modelUsed: 'TRAIL Knowledge Engine (Curated)',
    });
  } catch (err) {
    console.error('[generate-trail] Unexpected route error:', err);
    return NextResponse.json(
      { error: 'Internal synthesis error', details: String(err) },
      { status: 500 }
    );
  }
}
