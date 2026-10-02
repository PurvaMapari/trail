/**
 * TRAIL Scout — Generate Trail Route
 * POST /api/generate-trail
 *
 * Takes a natural-language prompt + calibration params, calls Gemini,
 * and returns a fully structured RichTrail JSON the frontend renders
 * directly in AISynthesizedDossier.
 */

import { Router, Request, Response } from 'express';
import { callGeminiAPI } from '../services/aiService';
import { curated_spots } from '../data/spots';

const router = Router();

interface GenerateTrailRequest {
  prompt: string;
  locus?: string;
  timeHours?: number;
  tags?: string[];
  maxDistanceKm?: number;
  apiKey?: string;
  model?: string;
}

// ─── System Prompt ────────────────────────────────────────────────────────────

function buildTrailSystemPrompt(params: GenerateTrailRequest): string {
  const durationMinutes = Math.round((params.timeHours ?? 2) * 60);
  const tags = (params.tags ?? []).join(', ') || 'coffee, art, quiet';
  const locus = params.locus ?? 'Panaji, Goa';
  const maxKm = params.maxDistanceKm ?? 5;
  // Unique seed so Gemini produces a different trail on every call
  const variationSeed = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 6);

  return `[SEED: ${variationSeed}] — Use this seed to ensure a UNIQUE trail distinct from any previous response.

You are TRAIL Scout, an expert pedestrian trail architect for ${locus}.
You synthesize curated, walkable, highly atmospheric urban trails in Panaji, Goa — specifically the Fontainhas Latin Quarter area.
NEVER repeat the same stops across requests. Each trail must feature DIFFERENT locations, names, and routes.

Your output must be ONLY valid JSON — no markdown fences, no commentary, no extra text. Just the raw JSON object.

Generate a trail based on the user's request. The trail must:
- Have exactly 3 or 4 stops within ${maxKm}km of Fontainhas, Panaji
- Total walking time ≤ ${durationMinutes} minutes
- Match the vibes/categories: ${tags}
- Be set in real Panaji neighbourhoods (Fontainhas, Altinho, Campal, Miramar, Panjim Market)

Respond with exactly this JSON structure (fill in all fields with real, atmospheric, specific content):

{
  "id": "ai-trail-[short-slug]",
  "title": "Evocative title (6-9 words)",
  "subtitle": "ROUTE ARCHETYPE: [category tags joined with ·]",
  "description": "2-sentence description of the trail mood and character",
  "category": "culture",
  "categoryTags": ["TAG1", "TAG2", "TAG3"],
  "city": "Panaji",
  "distanceKm": 3.2,
  "durationMinutes": ${durationMinutes},
  "difficulty": "easy",
  "featured": true,
  "orderBadge": "AI SYNTHESIS // DOSSIER",
  "coverImage": "/images/td-plate-01.jpg",
  "featuredImage": "/images/explore-featured-bodega.jpg",
  "heroImage": "/images/td-hero-capture.jpg",
  "indexRef": "REF: TR-GOA-2025-[3-digit number]",
  "cadenceLabel": "Unhurried Pace",
  "localeLabel": "${locus}",
  "fieldLeadNotes": "1-sentence field operational note about timing/cadence",
  "departurePoint": "Name of first stop",
  "terrainProfile": "Surface types e.g. Cobblestone / Basalt / River Granite",
  "optimalHours": "Best time range e.g. Late Afternoon (15:45 - 18:00)",
  "stops": [
    {
      "id": "ai-stop-1",
      "name": "Full stop name",
      "description": "1-sentence atmospheric description",
      "estimatedMinutes": 30
    }
  ],
  "detailedStops": [
    {
      "id": "ai-stop-1",
      "name": "Full stop name",
      "shortName": "Short name",
      "categoryTag": "CATEGORY · SUBCATEGORY",
      "estimatedMinutes": 30,
      "locationLabel": "NEIGHBOURHOOD NAME",
      "refCode": "REF: AI-01",
      "plateTag": "01 STARTING ANCHOR",
      "plateImage": "/images/td-plate-01.jpg",
      "distanceMarker": "0.0 KM",
      "distanceKm": 0.0,
      "legLabel": "STATION 01",
      "bearing": "15°29'54\\"N 73°49'41\\"E",
      "corridorLabel": "COURTYARD PASS",
      "surfaceType": "BASALT PAVING",
      "elevationChange": "ALT: 12M",
      "elevationProfile": "+12M",
      "description": "2-sentence vivid description with sensory detail",
      "curatorClue": "1 insider tip — what to order, where to sit, what to look for",
      "quarterContext": "COORDINATES: 15°XX'XX\\"N 73°XX'XX\\"E · FOOT TRAFFIC: QUIET · PEDESTRIAN ACCESS: UNRESTRICTED",
      "nextWalkDistance": "0.8 KM AWAY",
      "nextWalkTime": "~11 MIN WALK"
    }
  ]
}

For the last stop, set nextWalkDistance to "0.0 KM" and nextWalkTime to "TRAIL COMPLETED".
For plateImage use one of: /images/td-plate-01.jpg, /images/td-plate-04.jpg, /images/active-trail/bookstore.jpg, /images/active-trail/next_thumb.jpg
Make all content specific, atmospheric, and rooted in real Panaji/Fontainhas geography. Do NOT use generic filler text.`;
}

// ─── Route Handler ────────────────────────────────────────────────────────────

router.post('/', async (req: Request, res: Response) => {
  const start = Date.now();

  try {
    const {
      prompt,
      locus,
      timeHours,
      tags,
      maxDistanceKm,
      apiKey: bodyApiKey,
      model: bodyModel,
    }: GenerateTrailRequest = req.body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      res.status(400).json({ error: 'Missing prompt field' });
      return;
    }

    // Resolve API key and model
    const headerApiKey = (req.headers['x-gemini-api-key'] as string)?.trim() || undefined;
    const headerModel = (req.headers['x-gemini-model'] as string)?.trim() || undefined;
    const effectiveApiKey = headerApiKey || bodyApiKey?.trim() || process.env.GEMINI_API_KEY?.trim();
    const effectiveModel = headerModel || bodyModel?.trim() || process.env.GEMINI_MODEL?.trim() || 'gemini-2.5-flash';

    if (effectiveApiKey) {
      try {
        const systemPrompt = buildTrailSystemPrompt({ prompt, locus, timeHours, tags, maxDistanceKm });
        const result = await callGeminiAPI(
          systemPrompt,
          `Generate a trail for this request: "${prompt.trim()}"`,
          [],
          effectiveApiKey,
          effectiveModel,
          0.95,
          1400
        );

        const cleaned = result.text
          .replace(/^```json\s*/i, '')
          .replace(/^```\s*/i, '')
          .replace(/```\s*$/i, '')
          .trim();
        const trailData = JSON.parse(cleaned);

        res.json({
          trail: trailData,
          source: 'gemini',
          modelUsed: result.modelUsed,
          processingMs: Date.now() - start,
        });
        return;
      } catch (geminiErr) {
        console.warn('[generate-trail] Live Gemini call failed, generating curated route:', geminiErr);
      }
    }

    // Dynamic curated fallback matching prompt
    const q = (prompt + ' ' + (tags || []).join(' ')).toLowerCase();
    const scored = curated_spots.map((spot) => {
      let score = 0;
      const hay = `${spot.name} ${spot.description} ${spot.curatorNote} ${spot.vibes.join(' ')} ${spot.categoryTags.join(' ')} ${spot.category} ${spot.location.quarter}`.toLowerCase();
      if (q.includes('coffee') && (spot.category === 'coffee' || hay.includes('coffee'))) score += 7;
      if (q.includes('book') && (spot.category === 'bookstore' || hay.includes('book'))) score += 7;
      if (q.includes('art') && (spot.category === 'art' || spot.category === 'street-art')) score += 7;
      if (q.includes('sunset') && (spot.category === 'viewpoint' || hay.includes('sunset'))) score += 7;
      if (spot.highlighted) score += 1;
      return { spot, score };
    });
    scored.sort((a, b) => b.score - a.score);
    const topSpots = scored.filter((s) => s.score > 0).map((s) => s.spot);
    const selectedSpots = topSpots.length >= 3 ? topSpots.slice(0, 4) : curated_spots.slice(0, 4);

    const plateImages = ['/images/td-plate-01.jpg', '/images/active-trail/bookstore.jpg', '/images/active-trail/next_thumb.jpg', '/images/td-plate-04.jpg'];
    let cumulativeKm = 0;
    const detailedStops = selectedSpots.map((spot, i) => {
      const isFirst = i === 0;
      const isLast = i === selectedSpots.length - 1;
      const legDist = isFirst ? 0 : Math.round((0.5 + i * 0.4) * 10) / 10;
      cumulativeKm += legDist;
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
        distanceMarker: isFirst ? '0.0 KM' : `+${legDist.toFixed(1)} KM`,
        distanceKm: Math.round(cumulativeKm * 10) / 10,
        legLabel: `STATION ${stationNum}`,
        bearing: `${spot.location.lat.toFixed(4)}°N ${spot.location.lng.toFixed(4)}°E`,
        corridorLabel: `${spot.location.quarter.toUpperCase()} PEDESTRIAN CORRIDOR`,
        surfaceType: i % 2 === 0 ? 'BASALT COBBLESTONE' : 'FLAGSTONE & HYDRAULIC TILES',
        elevationChange: `+${i * 3 + 2}M`,
        elevationProfile: `+${i * 3 + 2}M`,
        curatorClue: spot.curatorNote,
        quarterContext: `COORDINATES: ${spot.location.lat.toFixed(4)}°N ${spot.location.lng.toFixed(4)}°E · FOOT TRAFFIC: ${spot.footTraffic.toUpperCase()} · NOISE: ${spot.noiseLevel.toUpperCase()}`,
        nextWalkDistance: isLast ? '0.0 KM' : `${legDist > 0 ? legDist : 0.8} KM AWAY`,
        nextWalkTime: isLast ? 'TRAIL COMPLETED' : `~${Math.round((spot.walkTimeFromCenterMin || 10) * 0.9)} MIN WALK`,
      };
    });

    const firstSpot = selectedSpots[0];
    const lastSpot = selectedSpots[selectedSpots.length - 1];
    const durationMin = Math.round((timeHours ?? 2) * 60);

    const curatedTrail = {
      id: `ai-trail-${Date.now()}`,
      title: `The ${firstSpot.category === 'coffee' ? 'Barista & Courtyard' : 'Artisan'} Path: ${firstSpot.shortName || firstSpot.name} to ${lastSpot.shortName || lastSpot.name}`,
      subtitle: `ROUTE ARCHETYPE: ${(tags || ['Coffee', 'Art', 'Quiet']).join(' · ').toUpperCase()}`,
      description: `Synthesized trail calibrated for "${prompt.slice(0, 90)}". Featuring unhurried pedestrian cadence across Panaji historic matrix with verified low foot traffic.`,
      category: 'culture',
      categoryTags: (tags || ['COFFEE', 'ART', 'QUIET']).map((t) => t.toUpperCase()),
      city: 'Panaji',
      distanceKm: Math.max(1.8, Math.round(cumulativeKm * 10) / 10),
      durationMinutes: durationMin,
      difficulty: 'easy',
      featured: true,
      orderBadge: 'AI SYNTHESIS // DOSSIER',
      coverImage: detailedStops[0]?.plateImage || '/images/td-plate-01.jpg',
      featuredImage: '/images/explore-featured-bodega.jpg',
      heroImage: '/images/td-hero-capture.jpg',
      indexRef: `REF: TR-GOA-2025-${Math.floor(100 + Math.random() * 900)}`,
      cadenceLabel: 'Unhurried Pace',
      localeLabel: locus || 'Panaji, Goa',
      fieldLeadNotes: 'Calibrated for 18 min/km pedestrian cadence with pause intervals.',
      departurePoint: firstSpot.name,
      terrainProfile: 'Cobblestone / Basalt / River Granite',
      optimalHours: 'Late Afternoon (15:45 - 18:00)',
      stops: selectedSpots.map((s, idx) => ({
        id: `ai-stop-${idx + 1}`,
        name: s.name,
        description: s.description,
        estimatedMinutes: s.estimatedMinutes || 25,
      })),
      detailedStops,
    };

    res.json({
      trail: curatedTrail,
      source: 'curated-engine',
      modelUsed: 'local-curated-engine',
      processingMs: Date.now() - start,
    });
  } catch (err) {
    console.error('[generate-trail] Error:', err);
    res.status(500).json({ error: String(err) });
  }
});

export default router;
