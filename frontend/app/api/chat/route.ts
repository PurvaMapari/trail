import { NextRequest, NextResponse } from 'next/server';
import { curated_spots, Spot } from '@/data/spots';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface SpotCard {
  spot: Spot;
  matchReason: string;
  relevanceScore: number;
  action: 'add-to-trail' | 'view-details';
}

export interface ChatResponse {
  message: string;
  spotCards: SpotCard[];
  suggestedFollowUps: string[];
  source: 'gemini' | 'fallback';
  modelUsed: string;
  processingMs?: number;
  error?: string;
}

function scoreSpot(spot: Spot, query: string): number {
  const q = query.toLowerCase();
  const tokens = q.split(/\s+/).filter((t) => t.length > 2);
  let score = 0;

  const hay = `${spot.name} ${spot.description} ${spot.curatorNote} ${spot.vibes.join(' ')} ${spot.categoryTags.join(' ')} ${spot.category} ${spot.location.quarter}`.toLowerCase();

  for (const token of tokens) {
    if (hay.includes(token)) score += 2;
  }

  const categoryMap: Record<string, string[]> = {
    coffee: ['coffee', 'cafe', 'espresso', 'brew', 'work', 'wifi'],
    bookstore: ['book', 'bookstore', 'library', 'read', 'paperback'],
    art: ['art', 'gallery', 'painting', 'artist', 'exhibition'],
    'street-art': ['mural', 'street art', 'graffiti', 'wall'],
    nature: ['nature', 'park', 'garden', 'green', 'trees'],
    viewpoint: ['sunset', 'view', 'panorama', 'horizon', 'riverside', 'mandovi'],
    heritage: ['heritage', 'colonial', 'historic', 'portuguese', 'old'],
    food: ['food', 'eat', 'restaurant', 'lunch', 'dinner', 'goan', 'bakery'],
    'hidden-gem': ['hidden', 'secret', 'local', 'off-beaten', 'discover'],
    artisan: ['craft', 'pottery', 'artisan', 'studio'],
  };

  for (const [cat, keywords] of Object.entries(categoryMap)) {
    if (spot.category === cat && keywords.some((kw) => q.includes(kw))) {
      score += 5;
    }
  }

  if (spot.highlighted) score += 1;
  return score;
}

function getRelevantSpots(query: string, maxResults = 3): Spot[] {
  const scored = curated_spots
    .map((spot) => ({ spot, score: scoreSpot(spot, query) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return curated_spots.filter((s) => s.highlighted).slice(0, maxResults);
  }
  return scored.slice(0, maxResults).map((s) => s.spot);
}

function buildChatPrompt(spots: Spot[]): string {
  const spotsContext = spots
    .map(
      (s, i) =>
        `[SPOT ${i + 1}]
Name: ${s.name}
Category: ${s.category} (${s.categoryTags.join(', ')})
Description: ${s.description}
Curator Note: ${s.curatorNote}
Quarter: ${s.location.quarter}
Distance: ${s.distanceFromCenterKm} km (~${s.walkTimeFromCenterMin} min walk)
Foot Traffic: ${s.footTraffic} | Noise: ${s.noiseLevel}`
    )
    .join('\n\n');

  return `You are TRAIL Scout — the premier local exploration AI guide for Panaji, Goa.
Warm, observant, cultured, insider-knowledgeable.
Recommend 1 to 2 spots strictly from the curated spots below.
For each spot mentioned, provide a line formatted as:
>> Spot Name
And bold it like **Spot Name** in your sentences. Give 1 practical local tip.

CURATED SPOTS:
${spotsContext}`;
}

export async function POST(req: NextRequest) {
  const start = Date.now();
  try {
    const body = await req.json();
    const message = body.message?.trim();

    if (!message) {
      return NextResponse.json({
        message: 'What kind of places in Panaji are you looking to explore?',
        spotCards: [],
        suggestedFollowUps: ['Quiet coffee shop', 'Street art walk', 'Sunset views'],
        source: 'fallback',
        modelUsed: 'local-curated-engine',
      } satisfies ChatResponse);
    }

    const apiKey =
      body.apiKey?.trim() ||
      req.headers.get('x-gemini-api-key')?.trim() ||
      process.env.GEMINI_API_KEY?.trim() ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY?.trim();

    const model =
      body.model?.trim() ||
      req.headers.get('x-gemini-model')?.trim() ||
      process.env.GEMINI_MODEL?.trim() ||
      'gemini-2.5-flash';

    const relevantSpots = getRelevantSpots(message);
    const systemPrompt = buildChatPrompt(relevantSpots);

    let aiText = '';
    let source: 'gemini' | 'fallback' = 'fallback';
    let modelUsed = 'local-curated-engine';

    if (apiKey) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents: [
              ...(body.history || []).slice(-6).map((h: any) => ({
                role: h.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: h.content }],
              })),
              { role: 'user', parts: [{ text: message }] },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 600,
            },
          }),
        });

        if (res.ok) {
          const json = await res.json();
          const reply = json?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            aiText = reply;
            source = 'gemini';
            modelUsed = model;
          }
        }
      } catch (e) {
        console.warn('[chat API] Gemini call failed, falling back to curated reply:', e);
      }
    }

    if (!aiText) {
      const top = relevantSpots[0] || curated_spots[0];
      const alt = relevantSpots[1] || curated_spots[1];
      aiText = `I recommend heading to **${top.name}** in ${top.location.quarter}.\n\n>> ${top.name}\n${top.description}\n\n*Curator Tip*: ${top.curatorNote}\n\nIf you have extra time, consider walking over to **${alt.name}** nearby.`;
    }

    const spotCards: SpotCard[] = relevantSpots.slice(0, 2).map((spot, idx) => ({
      spot,
      matchReason: spot.curatorNote || `Matches your search for ${spot.category}`,
      relevanceScore: idx === 0 ? 0.95 : 0.82,
      action: 'add-to-trail',
    }));

    const suggestedFollowUps = [
      `Tell me more about ${relevantSpots[0]?.shortName || 'this spot'}`,
      'How walkable is this route?',
      'Suggest a quiet evening place nearby',
    ];

    return NextResponse.json({
      message: aiText,
      spotCards,
      suggestedFollowUps,
      source,
      modelUsed,
      processingMs: Date.now() - start,
    } satisfies ChatResponse);
  } catch (err) {
    console.error('[chat API] Error:', err);
    return NextResponse.json(
      {
        message: 'Could not complete the query. Please retry in a moment.',
        spotCards: [],
        suggestedFollowUps: ['Try another spot'],
        source: 'fallback',
        modelUsed: 'local-curated-engine',
        error: String(err),
      } satisfies ChatResponse,
      { status: 500 }
    );
  }
}
