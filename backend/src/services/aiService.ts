/**
 * TRAIL Scout — AI Service
 * Gemini 1.5 Flash integration + intelligent fallback engine
 *
 * Phases 6, 7, 8 — AI implementation, Backend/API, Prompt/Logic
 */

import { Spot, ChatMessage, ChatResponse, SpotCard } from '../types/chat';
import { curated_spots, getSpotsWithinRadius } from '../data/spots';

// ─── Spot Relevance Scoring ────────────────────────────────────────────────

export function scoreSpotRelevance(spot: Spot, query: string): number {
  const q = query.toLowerCase();
  const tokens = q.split(/\s+/).filter((t) => t.length > 2);
  let score = 0;

  const hay =
    `${spot.name} ${spot.description} ${spot.curatorNote} ${spot.vibes.join(' ')} ${spot.categoryTags.join(' ')} ${spot.category}`.toLowerCase();

  for (const token of tokens) {
    if (hay.includes(token)) score += 2;
  }

  // Category keyword boosts
  const categoryMap: Record<string, string[]> = {
    coffee: ['coffee', 'cafe', 'espresso', 'brew', 'kaapi', 'work', 'read', 'wifi'],
    bookstore: ['book', 'bookstore', 'library', 'read', 'literary', 'literature', 'paperback'],
    art: ['art', 'gallery', 'painting', 'print', 'artist', 'exhibition', 'creative'],
    'street-art': ['mural', 'street art', 'graffiti', 'wall', 'urban'],
    nature: ['nature', 'park', 'garden', 'green', 'outdoor', 'trees', 'shade'],
    viewpoint: ['sunset', 'view', 'panorama', 'overlook', 'vista', 'horizon', 'riverside'],
    heritage: ['heritage', 'colonial', 'historic', 'portuguese', 'architecture', 'old'],
    food: ['food', 'eat', 'restaurant', 'lunch', 'dinner', 'goan', 'cuisine', 'hungry'],
    'hidden-gem': ['hidden', 'secret', 'local', 'off-beaten', 'unknown', 'discover'],
    artisan: ['craft', 'pottery', 'workshop', 'artisan', 'handmade', 'studio'],
    music: ['music', 'vinyl', 'bar', 'evening', 'night', 'live music', 'underground'],
  };

  for (const [cat, keywords] of Object.entries(categoryMap)) {
    if (spot.category === cat) {
      if (keywords.some((kw) => q.includes(kw))) score += 5;
    }
  }

  // Time of day signals
  if (q.includes('morning') && spot.bestTime.includes('morning')) score += 3;
  if ((q.includes('evening') || q.includes('sunset') || q.includes('dusk')) && spot.bestTime.includes('evening')) score += 3;
  if ((q.includes('night') || q.includes('after dark')) && spot.bestTime.includes('night')) score += 3;

  // Quiet/tranquil signals
  if ((q.includes('quiet') || q.includes('peaceful') || q.includes('alone')) && spot.footTraffic === 'quiet') score += 3;

  // Nearby signals
  if ((q.includes('nearby') || q.includes('close') || q.includes('short walk')) && spot.walkTimeFromCenterMin <= 10) score += 2;

  // Highlighted boost
  if (spot.highlighted) score += 1;

  return score;
}

// ─── Spot Retrieval ────────────────────────────────────────────────────────

export function getRelevantSpots(query: string, maxWalkMinutes?: number, maxResults = 5): Spot[] {
  let pool = curated_spots;

  if (maxWalkMinutes && maxWalkMinutes > 0) {
    const filtered = getSpotsWithinRadius(maxWalkMinutes);
    if (filtered.length >= 2) pool = filtered;
  }

  const scored = pool
    .map((spot) => ({ spot, score: scoreSpotRelevance(spot, query) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return pool.filter((s) => s.highlighted).slice(0, maxResults);
  }

  return scored.slice(0, maxResults).map((item) => item.spot);
}

// ─── System Prompt ─────────────────────────────────────────────────────────

export function buildSystemPrompt(relevantSpots: Spot[]): string {
  const spotsContext = relevantSpots
    .map(
      (s, i) =>
        `[SPOT ${i + 1}]
Name: ${s.name} (Short: ${s.shortName || s.name})
Category: ${s.category} (${s.categoryTags.join(', ')})
Description: ${s.description}
Curator Note: ${s.curatorNote}
Location: ${s.location.address}, ${s.location.quarter}
Distance: ${s.distanceFromCenterKm} km (~${s.walkTimeFromCenterMin} min walk)
Foot Traffic: ${s.footTraffic} | Noise: ${s.noiseLevel}
Best Time: ${s.bestTime.join(', ')}
Hours: ${s.openingHours || 'Flexible'}
Vibes: ${s.vibes.join(', ')}`
    )
    .join('\n\n');

  return `You are TRAIL Scout — the premier local exploration AI guide for Panaji, Goa.
You have the voice of an observant, cultured, unhurried local wanderer. You know every colonial archway in Fontainhas, every quiet courtyard café, independent bookstore, riverfront viewpoint, and hidden Goan tavern.

Persona & Voice Guidelines:
- Warm, evocative, insider-knowledgeable, and authentic.
- Never sound like a generic corporate travel brochure or robot.
- Give concrete, grounded recommendations with vivid sensory details (the smell of roasting Monsoon Malabar beans, shaded balconies, afternoon sea breezes).
- Explain *why* a spot matches their mood (e.g. foot traffic, noise level, walk time, best time of day).

Instructions:
1. Carefully address the user's specific mood, time budget, and preferences.
2. Recommend 1 to 3 spots strictly from the TRAIL CURATED KNOWLEDGE BASE below.
3. For each recommended spot, provide a dedicated line:
   >> Spot Name
   And refer to it in your text using bold markdown like **Spot Name**.
4. Offer one practical local tip (e.g., best time to go, quietest seating, what to look out for).
5. Keep conversational responses concise, punchy, and engaging (under 180 words total).

TRAIL CURATED SPOT KNOWLEDGE BASE:
${spotsContext}`;
}

// ─── Spot Card Parsing ──────────────────────────────────────────────────────

export function parseSpotCards(aiText: string, relevantSpots: Spot[]): SpotCard[] {
  const cards: SpotCard[] = [];
  const lowerText = aiText.toLowerCase();

  for (const spot of relevantSpots) {
    const fullNameMatch = lowerText.includes(spot.name.toLowerCase());
    const shortNameMatch = spot.shortName ? lowerText.includes(spot.shortName.toLowerCase()) : false;
    const tagMatch = aiText.includes(`>> ${spot.name}`) || (spot.shortName && aiText.includes(`>> ${spot.shortName}`));

    if (fullNameMatch || shortNameMatch || tagMatch) {
      cards.push({
        spot,
        matchReason: spot.curatorNote || `Recommended based on your discovery query.`,
        relevanceScore: Math.min(Math.max(scoreSpotRelevance(spot, aiText) / 10, 0.7), 1.0),
        action: 'add-to-trail',
      });
    }
  }

  // If no spot matched by name in the text, guarantee top 1 or 2 relevant spots
  if (cards.length === 0 && relevantSpots.length > 0) {
    cards.push({
      spot: relevantSpots[0],
      matchReason: relevantSpots[0].curatorNote || 'Top curated local match.',
      relevanceScore: 0.9,
      action: 'add-to-trail',
    });
    if (relevantSpots.length > 1) {
      cards.push({
        spot: relevantSpots[1],
        matchReason: relevantSpots[1].curatorNote || 'Alternative local recommendation.',
        relevanceScore: 0.75,
        action: 'add-to-trail',
      });
    }
  }

  return cards.slice(0, 3);
}

// ─── Follow-Up Suggestions ─────────────────────────────────────────────────

export function generateFollowUps(spots: Spot[], query: string): string[] {
  const q = query.toLowerCase();
  const followUps: string[] = [];

  if (!q.includes('sunset') && spots.some((s) => s.category === 'viewpoint')) followUps.push('Where can I watch the sunset nearby?');
  if (!q.includes('coffee') && spots.some((s) => s.category === 'coffee')) followUps.push('Any quiet cafes where I can work?');
  if (!q.includes('hidden') && spots.some((s) => s.category === 'hidden-gem')) followUps.push('Show me hidden spots most tourists miss.');
  if (!q.includes('art') && spots.some((s) => s.category === 'art' || s.category === 'street-art')) followUps.push('What art or galleries are worth visiting?');
  if (!q.includes('food') && spots.some((s) => s.category === 'food')) followUps.push('Where should I eat authentic local food?');

  return followUps.slice(0, 3);
}

// ─── Fallback Engine ────────────────────────────────────────────────────────

export function generateFallbackResponse(query: string, spots: Spot[]): string {
  if (spots.length === 0) {
    return "I couldn't find an exact match in my Panaji dataset for that. Try asking about specialty coffee, quiet art galleries, heritage lanes in Fontainhas, sunset viewpoints, or local Goan taverns.";
  }
  const top = spots[0];
  const second = spots[1];
  let response = `I know just the place: **${top.name}** in ${top.location.quarter}.\n\n>> ${top.name}\n${top.description.split('.')[0]}. ${top.curatorNote}`;
  if (second) {
    response += `\n\nIf you prefer an alternative, walk over to **${second.shortName || second.name}** — ${second.description.split('.')[0].toLowerCase()}.`;
  }
  return response;
}

// ─── Gemini API Call (Multi-Model Resilient Waterfall) ──────────────────────

export interface GeminiCallResult {
  text: string;
  modelUsed: string;
}

export async function callGeminiAPI(
  systemPrompt: string,
  userMessage: string,
  history: ChatMessage[],
  customApiKey?: string,
  preferredModel?: string
): Promise<GeminiCallResult> {
  const apiKey = (customApiKey || process.env.GEMINI_API_KEY || '').trim();
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  // Model hierarchy: preferred model -> gemini-1.5-pro -> gemini-2.0-flash -> gemini-1.5-flash
  const requestedModel = preferredModel?.trim() || process.env.GEMINI_MODEL?.trim() || 'gemini-1.5-pro';
  const candidateModels = Array.from(
    new Set([requestedModel, 'gemini-1.5-pro', 'gemini-2.0-flash', 'gemini-1.5-flash'])
  );

  const contents = history.map((turn) => ({
    role: turn.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: turn.content }],
  }));

  contents.push({ role: 'user', parts: [{ text: userMessage }] });

  let lastError: Error | null = null;

  for (const model of candidateModels) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 600,
              topP: 0.95,
            },
          }),
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Model ${model} returned ${response.status}: ${errText}`);
      }

      const data = (await response.json()) as {
        candidates?: { content?: { parts?: { text?: string }[] } }[];
      };
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text || text.trim().length === 0) {
        throw new Error(`Empty response from ${model}`);
      }

      return { text, modelUsed: model };
    } catch (err) {
      lastError = err as Error;
      console.warn(`[TRAIL Scout] ${model} attempt failed:`, (err as Error).message);
      // Continue to next candidate model in waterfall
    }
  }

  throw lastError || new Error('All Gemini models failed');
}
