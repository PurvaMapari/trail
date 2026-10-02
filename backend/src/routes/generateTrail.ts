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
    const effectiveModel = headerModel || bodyModel?.trim() || process.env.GEMINI_MODEL?.trim() || 'gemini-1.5-pro';

    if (!effectiveApiKey) {
      res.status(503).json({
        error: 'No Gemini API key configured. Set GEMINI_API_KEY in backend/.env or pass it in the request.',
        source: 'no-key',
      });
      return;
    }

    const systemPrompt = buildTrailSystemPrompt({ prompt, locus, timeHours, tags, maxDistanceKm });

    // Call Gemini — ask it to return raw JSON
    const result = await callGeminiAPI(
      systemPrompt,
      `Generate a trail for this request: "${prompt.trim()}"`,
      [],
      effectiveApiKey,
      effectiveModel,
      0.95,  // high temperature for creative, unique trail variety
      1400   // enough tokens for full JSON with 4 detailed stops
    );

    // Parse the JSON from Gemini's response
    let trailData: Record<string, unknown>;
    try {
      // Strip any accidental markdown fences Gemini might add
      const cleaned = result.text
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/```\s*$/i, '')
        .trim();
      trailData = JSON.parse(cleaned);
    } catch {
      console.error('[generate-trail] Gemini returned non-JSON:', result.text.slice(0, 300));
      res.status(502).json({
        error: 'Gemini returned an unstructured response. Try again.',
        raw: result.text.slice(0, 500),
      });
      return;
    }

    res.json({
      trail: trailData,
      source: 'gemini',
      modelUsed: result.modelUsed,
      processingMs: Date.now() - start,
    });

  } catch (err) {
    console.error('[generate-trail] Error:', err);
    res.status(500).json({
      error: String(err),
      source: 'error',
      processingMs: Date.now() - start,
    });
  }
});

export default router;
