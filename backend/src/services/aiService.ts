/**
 * TRAIL Scout — AI Service
 * Gemini 1.5 Flash integration + intelligent fallback engine
 *
 * Phases 6, 7, 8 — AI implementation, Backend/API, Prompt/Logic
 */

import { Spot, SpotCategory, ChatMessage, ChatResponse, SpotCard } from '../types/chat';
import { curated_spots, getSpotsWithinRadius } from '../data/spots';

// ─── Spot Relevance Scoring ────────────────────────────────────────────────

// ─── Spot Relevance Scoring ────────────────────────────────────────────────

export function scoreSpotRelevance(spot: Spot, query: string, historyText = ''): number {
  const q = query.toLowerCase();
  const tokens = q.split(/\s+/).filter((t) => t.length > 2);
  let score = 0;

  const hay =
    `${spot.name} ${spot.shortName || ''} ${spot.description} ${spot.curatorNote} ${spot.vibes.join(' ')} ${spot.categoryTags.join(' ')} ${spot.category} ${spot.location.quarter} ${spot.location.address}`.toLowerCase();

  // Negative keyword detection (e.g., "not bodega", "avoid noisy", "other than cafe")
  const negativeTriggers = ['not ', 'no ', 'except ', 'other than ', 'different from ', 'avoid ', "don't want "];
  for (const trigger of negativeTriggers) {
    if (q.includes(trigger)) {
      const negativeContext = q.split(trigger)[1]?.slice(0, 30) || '';
      if (
        negativeContext.includes(spot.name.toLowerCase()) ||
        (spot.shortName && negativeContext.includes(spot.shortName.toLowerCase())) ||
        negativeContext.includes(spot.category)
      ) {
        return -10; // Heavily penalize excluded spots/categories
      }
    }
  }

  // Token matches
  for (const token of tokens) {
    if (hay.includes(token)) score += 2.5;
  }

  // Location/Quarter specific boosts
  const quarters = ['fontainhas', 'campal', 'altinho', 'miramar', 'sao tome', 'mala'];
  for (const quarter of quarters) {
    if (q.includes(quarter) && hay.includes(quarter)) {
      score += 4;
    }
  }

  // Category keyword boosts
  const categoryMap: Record<string, string[]> = {
    coffee: ['coffee', 'cafe', 'espresso', 'brew', 'kaapi', 'pourover', 'roastery', 'cappuccino', 'flat white'],
    bookstore: ['book', 'bookstore', 'library', 'read', 'literary', 'literature', 'paperback', 'reading', 'novels'],
    art: ['art', 'gallery', 'painting', 'print', 'artist', 'exhibition', 'creative', 'sculpture'],
    'street-art': ['mural', 'street art', 'graffiti', 'wall art', 'urban art', 'azulejo'],
    nature: ['nature', 'park', 'garden', 'green', 'outdoor', 'trees', 'shade', 'plants', 'breeze'],
    viewpoint: ['sunset', 'view', 'panorama', 'overlook', 'vista', 'horizon', 'riverside', 'mandovi', 'waterfront'],
    heritage: ['heritage', 'colonial', 'historic', 'portuguese', 'architecture', 'old quarter', 'balcao', 'latin quarter'],
    food: ['food', 'eat', 'restaurant', 'lunch', 'dinner', 'goan', 'cuisine', 'hungry', 'thali', 'pastry', 'bakery', 'poee'],
    'hidden-gem': ['hidden', 'secret', 'local', 'off-beaten', 'unknown', 'tucked away', 'discover', 'clandestine'],
    artisan: ['craft', 'pottery', 'workshop', 'artisan', 'handmade', 'studio', 'ceramic'],
    music: ['music', 'vinyl', 'bar', 'evening', 'night', 'live music', 'underground', 'cocktail', 'tavern'],
  };

  for (const [cat, keywords] of Object.entries(categoryMap)) {
    if (spot.category === cat) {
      if (keywords.some((kw) => q.includes(kw))) score += 4;
    }
  }

  // Time of day signals
  if ((q.includes('morning') || q.includes('breakfast') || q.includes('early')) && spot.bestTime.includes('morning')) score += 3;
  if ((q.includes('evening') || q.includes('sunset') || q.includes('dusk') || q.includes('golden hour')) && spot.bestTime.includes('evening')) score += 3;
  if ((q.includes('night') || q.includes('after dark') || q.includes('late')) && spot.bestTime.includes('night')) score += 3;
  if ((q.includes('afternoon') || q.includes('midday')) && spot.bestTime.includes('afternoon')) score += 2;

  // Atmosphere signals
  if ((q.includes('quiet') || q.includes('peaceful') || q.includes('alone') || q.includes('work') || q.includes('study') || q.includes('cozy')) && spot.footTraffic === 'quiet') score += 3.5;
  if ((q.includes('lively') || q.includes('vibrant') || q.includes('crowd') || q.includes('people')) && spot.footTraffic === 'busy') score += 2;

  // Distance signals
  if ((q.includes('nearby') || q.includes('close') || q.includes('short walk') || q.includes('quick')) && spot.walkTimeFromCenterMin <= 10) score += 2.5;

  // Highlighted curated spot bonus
  if (spot.highlighted) score += 1;

  // Add random tie-breaking jitter (0 to 1.8) so repeated single-word searches don't always yield the exact same order
  score += Math.random() * 1.8;

  return score;
}

// ─── Spot Retrieval ────────────────────────────────────────────────────────

// ─── Intent & Conversation Context Types ────────────────────────────────────

export type ChatIntent =
  | 'GREETING'
  | 'CITY_OVERVIEW'
  | 'DURATION_SET'
  | 'SPOT_DETAILS'
  | 'ROUTE_WALKABILITY'
  | 'RECOMMEND_SPOTS'
  | 'BUILD_TRAIL'
  | 'UPDATE_PREFERENCES'
  | 'PLATFORM_INQUIRY';

export interface ConversationContext {
  durationMinutes: number;
  durationExplicitlySet: boolean;
  locus: string;
  categories: SpotCategory[];
  vibes: string[];
  exclusions: string[];
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night';
  intent: ChatIntent;
  activeSpot?: Spot;
  activeRouteSpots: Spot[];
  mentionedSpotIds: Set<string>;
  rawQuery: string;
}

// ─── Intent Detection ──────────────────────────────────────────────────────

export function detectIntent(message: string): ChatIntent {
  const q = message.trim().toLowerCase();

  // 1. Simple Greetings
  if (
    /^(hello|hi|hey|good\s*morning|good\s*afternoon|good\s*evening|greetings|howdy|namaste)[\s!.]*$/i.test(q) ||
    /^(hello|hi|hey|greetings)\s+(there|scout|bot|ai)[\s!.]*$/i.test(q)
  ) {
    return 'GREETING';
  }

  // 2. City / Destination Overview
  if (
    /(tell me about|what is|give me an overview of|explore|know about)\s+(panaji|panjim|the city|goa|capital)\b/i.test(q) &&
    !/(cafe|bodega|tato|church|secretariat|food|bar|spot|walk)/i.test(q)
  ) {
    return 'CITY_OVERVIEW';
  }

  // 3. Walkability inquiry on current route
  if (
    /(how walkable|is (this|the) route|walkability|can i walk (this|here)|is it easy to walk)/i.test(q)
  ) {
    return 'ROUTE_WALKABILITY';
  }

  // 4. Spot Details (tell me more about [spot])
  if (
    /(tell me more about|what about|more (info|details) (on|about)|can you describe)\s+(.+)/i.test(q) ||
    /(tell me more about this (spot|place|cafe))/i.test(q)
  ) {
    return 'SPOT_DETAILS';
  }

  // 5. Build Trail / Sequential Itinerary / Plan
  if (
    /\b(plan|itinerary)\b/i.test(q) ||
    /(build me a|create a|make a|plan a|suggest a|generate a|map a|give me a).*?(trail|route|itinerary|walk|plan|trip|day)/i.test(q) ||
    /(\d+)[-\s]*(?:hour|min).*?(trail|route|itinerary|walk|plan|trip)/i.test(q)
  ) {
    return 'BUILD_TRAIL';
  }

  // 6. Update Preferences / Duration / Exclusions
  if (
    /(actually make it|make it|extend to|change to)\s+(\d+)[-\s]*(hours?|minutes?|hrs?|mins?)/i.test(q) ||
    /(don't want|avoid|no|not)\s+(touristy|tourist|crowded|busy|commercial)/i.test(q)
  ) {
    return 'UPDATE_PREFERENCES';
  }

  // 7. Duration Set (e.g. "I have 1 hour", "1 hours travel time?", "got 30 mins")
  if (
    /(i have|i've got|available time|travel time|time budget|got)\s+(\d+)[-\s]*(hours?|minutes?|hrs?|mins?)/i.test(q) ||
    /^\s*(\d+)[-\s]*(?:hours?|hrs?)\s*(?:travel time|\?|available)?\s*$/i.test(q)
  ) {
    return 'DURATION_SET';
  }

  // 8. Platform inquiry
  if (
    /(what is trail|how does (trail|this site|this app|the app) work|how to create a trail)/i.test(q)
  ) {
    return 'PLATFORM_INQUIRY';
  }

  // Default: Recommend spots / discovery query
  return 'RECOMMEND_SPOTS';
}

// ─── Context Extraction Engine ─────────────────────────────────────────────

export function extractConversationContext(
  history: ChatMessage[] = [],
  currentMessage: string
): ConversationContext {
  let durationMinutes = 60;
  let durationExplicitlySet = false;
  let locus = 'Panaji';
  const categories: SpotCategory[] = [];
  const vibes: string[] = [];
  const exclusions: string[] = [];
  let timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night' | undefined = undefined;
  const mentionedSpotIds = new Set<string>();
  let activeSpot: Spot | undefined = undefined;
  let activeRouteSpots: Spot[] = [];

  const allTurns = [...history, { role: 'user' as const, content: currentMessage }];
  const userTurns = allTurns.filter((t) => t.role === 'user');
  const userText = userTurns.map((t) => t.content).join(' ');
  const userTextLower = userText.toLowerCase();
  const currentMsgLower = currentMessage.toLowerCase();

  // Scan for mentioned spots across all turns to avoid repetition
  for (const s of curated_spots) {
    const sName = s.name.toLowerCase();
    const sShort = s.shortName?.toLowerCase();
    const sBase = s.name.split('/')[0].trim().toLowerCase();
    if (
      userTextLower.includes(sName) ||
      (sShort && userTextLower.includes(sShort)) ||
      userTextLower.includes(sBase)
    ) {
      mentionedSpotIds.add(s.id);
    }
  }

  // Find activeRouteSpots and activeSpot from the most recent assistant turn
  const lastAssistantTurn = [...history].reverse().find((h) => h.role === 'assistant');
  if (lastAssistantTurn) {
    const lastText = lastAssistantTurn.content;
    const foundSpots = curated_spots.filter((s) => {
      const sBase = s.name.split('/')[0].trim();
      return (
        lastText.includes(`>> ${s.name}`) ||
        (s.shortName && lastText.includes(`>> ${s.shortName}`)) ||
        lastText.includes(`**${s.name}**`) ||
        (s.shortName && lastText.includes(`**${s.shortName}**`)) ||
        lastText.includes(`**${sBase}**`)
      );
    });
    if (foundSpots.length > 0) {
      activeRouteSpots = foundSpots;
      activeSpot = foundSpots[0];
    }
  }

  // Check if current message specifically names a spot (e.g. "tell me more about Cafe Bodega")
  for (const s of curated_spots) {
    const sName = s.name.toLowerCase();
    const sShort = s.shortName?.toLowerCase();
    const sBase = s.name.split('/')[0].trim().toLowerCase();
    if (
      currentMsgLower.includes(sName) ||
      (sShort && currentMsgLower.includes(sShort)) ||
      currentMsgLower.includes(sBase)
    ) {
      activeSpot = s;
      break;
    }
  }

  // Extract / update duration across USER turns only
  for (const turn of userTurns) {
    const tLower = turn.content.toLowerCase();
    const hourMatch = tLower.match(/(\d+(?:\.\d+)?)[-\s]*(?:hours?|hrs?)/i);
    if (hourMatch) {
      durationMinutes = Math.round(parseFloat(hourMatch[1]) * 60);
      durationExplicitlySet = true;
    }
    const minMatch = tLower.match(/(\d+)[-\s]*(?:minutes?|mins?)/i);
    if (minMatch) {
      durationMinutes = parseInt(minMatch[1], 10);
      durationExplicitlySet = true;
    }
  }

  // Extract exclusions across USER turns only
  if (
    /(don't want|avoid|no|not)\s+(touristy|tourist|crowded|busy|commercial)/i.test(userTextLower)
  ) {
    exclusions.push('touristy');
  }

  // Extract categories across USER turns
  if (/cafes?|coffee|espresso|brew|kaapi/i.test(userTextLower)) categories.push('coffee');
  if (/architectur\w+|heritage|colonial|old streets?|history|monuments?/i.test(userTextLower)) categories.push('heritage');
  if (/bookstore|books?|reading|library/i.test(userTextLower)) categories.push('bookstore');
  if (/art|gallery|galleries|murals?|painting/i.test(userTextLower)) categories.push('art');
  if (/nature|parks?|gardens?/i.test(userTextLower)) categories.push('nature');
  if (/sunset|viewpoints?|vista|horizon/i.test(userTextLower)) categories.push('viewpoint');

  // Extract vibes across USER turns
  if (/quiet|peaceful|calm|slow|unhurried|alone/i.test(userTextLower)) vibes.push('quiet');
  if (/lively|vibrant|social/i.test(userTextLower)) vibes.push('lively');

  // Extract time of day (user current message takes precedence, then past user turns)
  if (/evening|sunset|dusk|night|after dark|tonight/i.test(currentMsgLower)) {
    timeOfDay = 'evening';
  } else if (/morning|breakfast|early/i.test(currentMsgLower)) {
    timeOfDay = 'morning';
  } else if (/evening|sunset|dusk|night|after dark|tonight/i.test(userTextLower)) {
    timeOfDay = 'evening';
  }

  // Extract locus across USER turns or active spot
  if (/fontainhas|latin quarter/i.test(userTextLower)) locus = 'Fontainhas';
  else if (/campal/i.test(userTextLower)) locus = 'Campal';
  else if (/altinho/i.test(userTextLower)) locus = 'Altinho';
  else if (/miramar/i.test(userTextLower)) locus = 'Miramar';
  else if (activeSpot) locus = activeSpot.location.quarter;

  const intent = detectIntent(currentMessage);

  return {
    durationMinutes,
    durationExplicitlySet,
    locus,
    categories: Array.from(new Set(categories)),
    vibes: Array.from(new Set(vibes)),
    exclusions: Array.from(new Set(exclusions)),
    timeOfDay,
    intent,
    activeSpot,
    activeRouteSpots,
    mentionedSpotIds,
    rawQuery: currentMessage,
  };
}

// ─── Context-Aware Spot Retrieval ──────────────────────────────────────────

export function getRelevantSpotsWithContext(
  context: ConversationContext,
  maxResults = 5
): Spot[] {
  // If the intent is conversational without spot recommendations, return empty
  if (
    context.intent === 'GREETING' ||
    context.intent === 'CITY_OVERVIEW' ||
    context.intent === 'DURATION_SET'
  ) {
    return [];
  }

  // If specific spot details are requested, return ONLY that spot
  if (context.intent === 'SPOT_DETAILS' && context.activeSpot) {
    return [context.activeSpot];
  }

  // If asking about route walkability, preserve the active route spots
  if (context.intent === 'ROUTE_WALKABILITY' && context.activeRouteSpots.length > 0) {
    return context.activeRouteSpots;
  }

  let pool = [...curated_spots];

  // If building a trail or updating duration
  if (context.intent === 'BUILD_TRAIL' || context.intent === 'UPDATE_PREFERENCES') {
    const isTouristyExcluded = context.exclusions.includes('touristy');

    // 1. Morning Coffee / Local Refreshment Anchor
    const coffeeSpot = isTouristyExcluded
      ? pool.find((s) => s.id === 'spot-caffe-tato') || pool.find((s) => s.category === 'coffee' && s.footTraffic === 'quiet')
      : pool.find((s) => s.id === 'spot-cafe-bodega') || pool.find((s) => s.category === 'coffee');

    // 2. Heritage Architecture Corridor
    const arcadeSpot = pool.find((s) => s.id === 'spot-rua-31') || pool.find((s) => s.category === 'heritage');

    // 3. Art Studio / Printmaking Gallery
    const gallerySpot = pool.find((s) => s.id === 'spot-gitanjali-gallery') || pool.find((s) => s.category === 'art');

    // 4. Historic Riverfront Landmark / Bookstore
    const palaceSpot = isTouristyExcluded
      ? pool.find((s) => s.id === 'spot-mandovi-books') || pool.find((s) => s.category === 'bookstore')
      : pool.find((s) => s.id === 'spot-old-secretariat') || pool.find((s) => s.category === 'heritage');

    // 5. Panoramic Hillside Overlook / Sanctuary
    const overlookSpot = pool.find((s) => s.id === 'spot-altinho-overlook') || pool.find((s) => s.category === 'viewpoint');

    // 6. Riverfront Sunset Promenade
    const promenadeSpot = pool.find((s) => s.id === 'spot-mandovi-promenade') || pool.find((s) => s.category === 'nature');

    // 7. Evening Listening Bar / Mural Lane
    const eveningSpot = pool.find((s) => s.id === 'spot-tiger-mural') || pool.find((s) => s.id === 'spot-vinyl-den');

    const result: Spot[] = [];
    if (coffeeSpot) result.push(coffeeSpot);
    if (arcadeSpot) result.push(arcadeSpot);
    if (palaceSpot && !result.some((s) => s.id === palaceSpot.id)) result.push(palaceSpot);
    if (gallerySpot && !result.some((s) => s.id === gallerySpot.id)) result.push(gallerySpot);
    if (overlookSpot && !result.some((s) => s.id === overlookSpot.id)) result.push(overlookSpot);
    if (promenadeSpot && !result.some((s) => s.id === promenadeSpot.id)) result.push(promenadeSpot);
    if (eveningSpot && !result.some((s) => s.id === eveningSpot.id)) result.push(eveningSpot);

    // Stop count dynamically calibrated to cover the entire requested time window
    let stopCount = 3;
    if (context.durationMinutes >= 300) stopCount = 7;      // 5-hour complete day
    else if (context.durationMinutes >= 240) stopCount = 6; // 4-hour walk
    else if (context.durationMinutes >= 180) stopCount = 5; // 3-hour half-day
    else if (context.durationMinutes >= 120) stopCount = 4; // 2-hour walk
    else if (context.durationMinutes <= 60) stopCount = 3;  // 1-hour walk

    return result.slice(0, stopCount);
  }

  // General recommendation ranking
  const scored = pool
    .map((spot) => {
      let score = 0;

      // Category match
      if (context.categories.length > 0 && context.categories.includes(spot.category)) {
        score += 8;
      }

      // Immediate category boost
      if (/cafes?|coffee|espresso/i.test(context.rawQuery) && spot.category === 'coffee') {
        score += 15;
      }
      if (/architectur\w+|heritage|colonial/i.test(context.rawQuery) && spot.category === 'heritage') {
        score += 15;
      }
      if (/books?|reading/i.test(context.rawQuery) && spot.category === 'bookstore') {
        score += 15;
      }
      if (/art|gallery/i.test(context.rawQuery) && spot.category === 'art') {
        score += 15;
      }

      // Vibe match
      if (context.vibes.includes('quiet')) {
        if (spot.footTraffic === 'quiet') score += 6;
        if (spot.noiseLevel === 'quiet' || spot.noiseLevel === 'silent') score += 5;
      }

      // Time of day match
      if (context.timeOfDay && spot.bestTime.includes(context.timeOfDay)) {
        score += 8;
      }

      // Proximity to active spot or locus
      if (context.activeSpot && spot.location.quarter === context.activeSpot.location.quarter) {
        score += 4;
      }

      // Exclusions
      if (context.exclusions.includes('touristy')) {
        if (spot.footTraffic === 'busy') score -= 20;
        if (spot.categoryTags.includes('ICONIC')) score -= 15;
        if (spot.vibes.includes('local') || spot.vibes.includes('intimate')) score += 8;
      }

      // Query token matches
      const tokens = context.rawQuery.toLowerCase().split(/\s+/).filter((t) => t.length > 2);
      const hay = `${spot.name} ${spot.description} ${spot.curatorNote} ${spot.vibes.join(' ')} ${spot.categoryTags.join(' ')}`.toLowerCase();
      for (const t of tokens) {
        if (hay.includes(t)) score += 2;
      }

      // Deprioritize already mentioned spots unless asking for details
      if (context.mentionedSpotIds.has(spot.id) && context.intent !== 'SPOT_DETAILS') {
        score -= 8;
      }

      // Add tie-breaking jitter
      score += Math.random() * 1.5;

      return { spot, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    const fallback = pool.filter((s) => s.highlighted);
    return fallback.slice(0, maxResults);
  }

  return scored.slice(0, maxResults).map((item) => item.spot);
}

// Backwards-compatible getRelevantSpots
export function getRelevantSpots(
  query: string,
  history: ChatMessage[] = [],
  _maxWalkMinutes?: number,
  maxResults = 5
): Spot[] {
  const context = extractConversationContext(history, query);
  return getRelevantSpotsWithContext(context, maxResults);
}

// ─── Context-Aware System Prompt ───────────────────────────────────────────

export function buildSystemPromptWithContext(
  context: ConversationContext,
  relevantSpots: Spot[]
): string {
  const spotsContext = relevantSpots
    .map(
      (s, i) =>
        `[SPOT ${i + 1}]
Name: ${s.name} (Short: ${s.shortName || s.name})
Category: ${s.category} (${s.categoryTags.join(', ')})
Description: ${s.description}
Curator Note: ${s.curatorNote}
Quarter: ${s.location.quarter} | Address: ${s.location.address}
Distance: ${s.distanceFromCenterKm} km (~${s.walkTimeFromCenterMin} min walk)
Foot Traffic: ${s.footTraffic} | Noise: ${s.noiseLevel}
Best Time: ${s.bestTime.join(', ')} | Hours: ${s.openingHours || 'Flexible'}
Vibes: ${s.vibes.join(', ')}`
    )
    .join('\n\n');

  return `You are TRAIL Scout, a context-aware local discovery guide for Panaji, Goa.
Your job is to understand what the user is actually asking and answer that question directly. Do NOT automatically recommend a place for every message.

CORE RULE:
Understand → Retrieve → Verify → Personalize → Answer.

### 1. INTENT FIRST
Before responding, identify the user's intent:
- Current Intent: ${context.intent}
Never force a recommendation when the user is asking a general, factual, or orientation question.

### 2. ANSWER THE ACTUAL QUESTION
- If the user says "hello":
  → Greet them naturally and explain what TRAIL Scout can help with. Do NOT recommend a random place. Do NOT output ">> Spot Name".
- If the user asks "tell me about Panjim":
  → Explain Panjim first (its quarters, rhythms, and landscapes). Do NOT immediately recommend a random place.
- If the user asks "tell me more about this place":
  → Discuss that specific place only (${context.activeSpot?.name || 'the chosen spot'}). Do NOT recommend other places.
- If the user asks "how walkable is this route?":
  → Answer about the CURRENT route/terrain. Do NOT recommend a new place.
- If the user asks "1 hour travel time?" or "I have 1 hour":
  → Interpret it using the previous conversation and current route/context. Do NOT start a completely new recommendation.

### 3. MAINTAIN CONTEXT
Remember and preserve all relevant conversation state:
- Current Duration/Budget: ${context.durationMinutes} minutes (Explicit: ${context.durationExplicitlySet ? 'YES' : 'Default'})
- Location / Quarter: ${context.locus}
- Active Spot in Focus: ${context.activeSpot?.name || 'None'}
- Current Route: ${context.activeRouteSpots.map((s) => s.name).join(' → ') || 'None'}
- Accumulated Categories: [${context.categories.join(', ') || 'None yet'}]
- Mood / Vibes: [${context.vibes.join(', ') || 'None yet'}]
- Time of Day: ${context.timeOfDay || 'unspecified'}
- Active Exclusions: [${context.exclusions.join(', ') || 'None'}]
RULE: When the user changes one preference (e.g. "actually make it 2 hours"), update ONLY that preference and PRESERVE all others (e.g. keep quiet, cafés, heritage).

### 4. DO NOT INVENT INFORMATION
Never fabricate businesses, places, addresses, opening hours, prices, distances, walking times, historical facts, events, hidden entrances, reviews, or directions.
Only provide specific factual information when it comes from available TRAIL data or the SPOT CATALOG below. If information cannot be verified, clearly say that it is an estimate or unavailable.

### 5. RECOMMENDATIONS & MULTI-STOP TRAIL ITINERARIES
- For multi-stop/trail requests, generate the COMPLETE itinerary first, then generate the UI cards. Never let the UI card limit determine how much itinerary information the assistant provides.
- COMPLETE ANSWERS: When the user asks for a trail within a specific time (e.g. 1 hour, 2 hours, 3 hours, 5 hours), always provide a complete itinerary:
  * Total available time budget
  * All recommended stops in clear chronological sequence
  * Time spent at each stop (stay/activity time)
  * Travel/walking time between stops
  * Total estimated walking/travel time
  * Total activity/stay time
  * Approximate total duration
  * Why each stop fits the user's request
  * Clear start and end point
  Do not stop after showing only the first recommendation/card. Ensure the response covers the ENTIRE requested time window.
- TIME VALIDATION: Before responding to a duration-based request, calculate:
  Stop time + walking time + other travel time = total duration.
  Do not claim a trail fits within 3/5 hours unless the estimated timings actually fit.
  If there is unused time, either add another relevant stop from the catalog or explicitly explain the remaining free time.
- Only recommend places when the user is ACTUALLY asking for a recommendation or a trail.
- Mention each recommended place clearly by name in your narrative so that its interactive UI recommendation card activates automatically.

### 6. ROUTES AND TRAVEL TIME
For route questions, use the current route/context. Explain approximate distance, estimated walking time, number of stops, and walkability naturally. Never present an unverified travel time as an exact fact.

### 7. FOLLOW-UP QUESTIONS
Treat follow-up questions as continuation of the current conversation. Do not reset the conversation after every message.

### 8. RESPONSE FORMAT RULES (PLANNING VS. CONVERSATIONAL)

A. WHENEVER TOLD TO PLAN (CRITICAL RULE):
Whenever the user asks you to plan (e.g., "plan a trail", "plan my day", "make a plan", "plan 2 hours in Fontainhas", or any duration-based itinerary request):
Format your response as a clear, structured WALKING PLAN.

For each stop in the plan, clearly state:
• **Stop [N]: [Spot Name]**
• **When to visit:** [Ideal time of day or schedule window, e.g., Morning (9:00 AM – 9:45 AM), Golden Hour (5:15 PM), or Early Evening]
• **Time duration (How much time it will take):** [Recommended stay duration, e.g., 45 minutes]
• **Walking time to next stop:** [Travel/walking minutes and distance, e.g., 8-minute walk (~400m) through the Latin Quarter]
• **Highlights & What to do / other things:** [Specific sights, pour-over coffee to order, curator notes, architectural details, and why it fits]

At the end of the plan, include a **Plan Summary**:
• **Total Duration:** [e.g., 3 hours (180 minutes)]
• **Total Stay/Activity Time:** [e.g., ~145 minutes]
• **Total Walking Time:** [e.g., ~35 minutes (~2.0 km total)]
• **Route Sequence:** [Stop 1 → Stop 2 → Stop 3]
• **Local Tips & Terrain:** [Footwear recommendation, shade considerations, best starting point]

B. FOR GENERAL CONVERSATIONS (WHEN NOT TOLD TO PLAN):
If the user is asking a general question, greeting you ("hello"), asking about Panaji's history, asking about a single place ("tell me about Cafe Bodega"), or asking about route walkability:
Keep the response warm, personal, and conversational like a knowledgeable local guide. Do NOT force a multi-stop itinerary or artificial plan structure when the user hasn't asked for one.

C. NO TECHNICAL ARTIFACTS:
- Do NOT output raw JSON blocks, data fences, or internal code structures in your chat reply.
- The UI automatically renders interactive cards for the places you mention.

### 9. HIDE MODEL INFORMATION (CRITICAL)
Never display or mention the AI model name, model ID, provider name, API name, internal system information, or technical implementation details in your user-facing responses.
The user should only see TRAIL Scout as the assistant.
Remove/hide any labels such as "gemini-3.1-flash-lite", "gemini-3.5-flash", "Google", "Gemini", or any provider identifier. Model information must remain backend-only.

### 10. IMPORTANT PRIORITY & STYLE CHECK
Before sending every response:
1. Did I answer the user's ACTUAL question?
2. If told to plan: Is there a clear, structured plan with when to visit, how much time it takes at each stop, walking times between stops, highlights, and a total plan summary?
3. If not told to plan: Does it feel like a natural conversation with a human guide?

### VERIFIED SPOT CATALOG:
${spotsContext || 'No spot recommendations needed for this turn.'}`;
}

export function buildSystemPrompt(relevantSpots: Spot[]): string {
  const dummyContext: ConversationContext = {
    durationMinutes: 60,
    durationExplicitlySet: false,
    locus: 'Panaji',
    categories: [],
    vibes: [],
    exclusions: [],
    intent: 'RECOMMEND_SPOTS',
    activeRouteSpots: [],
    mentionedSpotIds: new Set(),
    rawQuery: '',
  };
  return buildSystemPromptWithContext(dummyContext, relevantSpots);
}

// ─── Response Sanitizer (Enforce Conversational Guide Format) ───────────────

export function cleanChatResponse(text: string): string {
  if (!text) return '';
  let cleaned = text;

  // Strip code fences
  cleaned = cleaned.replace(/```(?:json|markdown)?[\s\S]*?```/gi, '');

  // Strip raw JSON objects like { "recommendations": [...] } or trailing JSON
  cleaned = cleaned.replace(/\{[\s\r\n]*"recommendations"[\s\S]*?\}/gi, '');
  cleaned = cleaned.replace(/\{[\s\r\n]*"[a-zA-Z0-9_-]+"[\s\S]*?\}[\s\r\n]*$/g, '');

  // Strip bracketed spot tags (e.g. [Cafe Bodega])
  cleaned = cleaned.replace(/^\[[^\]\n]+\]\s*$/gm, '');

  // Clean multiple newlines
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  return cleaned.trim();
}

// ─── Spot Card Parsing ──────────────────────────────────────────────────────

export function parseSpotCards(aiText: string, relevantSpots: Spot[]): SpotCard[] {
  const cards: SpotCard[] = [];
  const lowerText = aiText.toLowerCase();
  const normalizedText = lowerText.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  for (const spot of relevantSpots) {
    const fullName = spot.name.toLowerCase();
    const shortName = spot.shortName ? spot.shortName.toLowerCase() : '';
    const baseName = spot.name.split('/')[0].split('(')[0].trim().toLowerCase();

    const normFull = fullName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const normShort = shortName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const normBase = baseName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const isMatch =
      normalizedText.includes(normFull) ||
      (normShort && normalizedText.includes(normShort)) ||
      (normBase.length > 3 && normalizedText.includes(normBase)) ||
      aiText.includes(`>> ${spot.name}`) ||
      (spot.shortName && aiText.includes(`>> ${spot.shortName}`));

    if (isMatch) {
      cards.push({
        spot,
        matchReason: spot.curatorNote || `Recommended based on your discovery query.`,
        relevanceScore: Math.min(Math.max(scoreSpotRelevance(spot, aiText) / 10, 0.7), 1.0),
        action: 'add-to-trail',
      });
    }
  }

  // Only auto-attach if the response actually recommended a spot (has >> anchor or station sequence) and is not greeting/overview
  if (cards.length === 0 && relevantSpots.length > 0) {
    const isGreetingOrOverview = /^(hello|welcome to trail|panaji \(panjim\) is best experienced|one hour \(60 minutes\) is an ideal)/i.test(aiText);
    const hasSpotAnchor = aiText.includes('>> ') || /station \d+/i.test(aiText);

    if (!isGreetingOrOverview && hasSpotAnchor) {
      for (const sp of relevantSpots.slice(0, 3)) {
        cards.push({
          spot: sp,
          matchReason: sp.curatorNote || 'Curated trail stop matching your preferences.',
          relevanceScore: 0.9,
          action: 'add-to-trail',
        });
      }
    }
  }

  return cards.slice(0, 8);
}

// ─── Contextual Follow-Up Suggestions ──────────────────────────────────────

export function generateContextualFollowUps(
  context: ConversationContext,
  spots: Spot[]
): string[] {
  if (context.intent === 'GREETING') {
    return [
      'I have 1 hour',
      'Tell me about Panjim',
      'I want quiet places with cafés',
    ];
  }

  if (context.intent === 'CITY_OVERVIEW') {
    return [
      'I have 1 hour',
      'I want quiet places with cafés',
      'Build me a 1-hour trail in Panjim with cafés and old architecture',
    ];
  }

  if (context.intent === 'DURATION_SET') {
    return [
      'I want quiet places with cafés',
      'Build me a 1-hour trail in Panjim with cafés and old architecture',
      'Suggest a quiet evening place nearby',
    ];
  }

  if (context.intent === 'SPOT_DETAILS') {
    return [
      'How walkable is this route?',
      'Suggest a quiet evening place nearby',
      'Build me a 1-hour trail in Panjim with cafés and old architecture',
    ];
  }

  if (context.intent === 'ROUTE_WALKABILITY') {
    return [
      'Suggest a quiet evening place nearby',
      'Actually make it 2 hours',
      "I don't want touristy places",
    ];
  }

  if (context.intent === 'BUILD_TRAIL') {
    return [
      'How walkable is this route?',
      'Actually make it 2 hours',
      "I don't want touristy places",
    ];
  }

  if (context.intent === 'UPDATE_PREFERENCES') {
    return [
      'How walkable is this route?',
      'Suggest a quiet evening place nearby',
      'Tell me more about this spot',
    ];
  }

  // Default follow-ups
  const followUps: string[] = [];
  if (spots.length > 0) {
    followUps.push(`Tell me more about ${spots[0].shortName || spots[0].name}`);
  }
  followUps.push('How walkable is this route?');
  followUps.push('Suggest a quiet evening place nearby');

  return followUps.slice(0, 3);
}

export function generateFollowUps(spots: Spot[], query: string): string[] {
  const context = extractConversationContext([], query);
  return generateContextualFollowUps(context, spots);
}

// ─── Intelligent Fallback Engine (Covers all 10 Test Cases) ────────────────

export function generateIntelligentFallback(
  context: ConversationContext,
  spots: Spot[]
): string {
  // 1. Greeting
  if (context.intent === 'GREETING') {
    return `Hello! I'm TRAIL Scout, your local walking companion for Panaji. I know the quiet courtyard cafés, 18th-century colonial alleys, independent bookstores, and sunset viewpoints that most people walk right past.\n\nWhat kind of wander are you in the mood for today, or do you have a specific time in mind?`;
  }

  // 2. City Overview
  if (context.intent === 'CITY_OVERVIEW') {
    return `Panaji is best experienced on foot at an unhurried, contemplative pace. Unlike northern coastal party strips, the capital is defined by living architectural heritage, maritime breezes, and intimate neighborhoods.\n\nIn Fontainhas and São Tomé, you will find ochre and indigo Portuguese facades, hand-painted azulejo tiles, terracotta archways, and quiet courtyard roasteries. Up on the Altinho heights, there are winding residential stairways, colonial hillside villas, and leafy viewpoints looking out over the Mandovi. Down along the riverfront promenade and Campal, shaded avenues stretch along the water past Charles Correa architecture at Kala Academy and twilight ferry lookouts.\n\nWhat atmosphere are you drawn to exploring? We could look at quiet cafés, colonial architecture, independent art, or map out a slow walking route.`;
  }

  // 3. Duration Set
  if (context.intent === 'DURATION_SET') {
    const hours = (context.durationMinutes / 60).toFixed(1).replace(/\.0$/, '');
    const hourLabel = context.durationMinutes >= 60 ? `${hours} hour${hours === '1' ? '' : 's'}` : `${context.durationMinutes} minutes`;
    return `For ${hourLabel}, Panaji gives us an ideal window for an unhurried, multi-stop walk where you can actually settle into each place rather than rushing between them.\n\nWhat would you like to anchor your time with? We can put together a complete sequential route pairing quiet coffee courtyards with colonial architecture corridors and riverfront viewpoints. Just let me know what sounds good to you.`;
  }

  // 4. Spot Details
  if (context.intent === 'SPOT_DETAILS') {
    const target = context.activeSpot || spots[0] || curated_spots[0];
    return `${target.name} is situated in ${target.location.quarter} on ${target.location.address}. It features ${target.description.toLowerCase()}\n\nAs a local tip, ${target.curatorNote.toLowerCase()} The atmosphere is typically ${target.footTraffic} with a ${target.noiseLevel} noise level, and it is especially pleasant in the ${target.bestTime.join(' and ')}.`;
  }

  // 5. Route Walkability
  if (context.intent === 'ROUTE_WALKABILITY') {
    return `The route through Fontainhas and Altinho is exceptionally pedestrian-friendly. The entire traverse is approximately 0.8 kilometers, which takes around 10 to 12 minutes of easy walking.\n\nYou will be walking along basalt cobblestones and paved residential heritage corridors. If your route takes you up to Altinho, the ascent via the stairway or hillside ramp is gentle and well-shaded under bougainvillea canopies. Because the streets are narrow, vehicular traffic is minimal and slow. Flat, comfortable walking shoes are best for the historic flagstones.`;
  }

  // 6. Build Trail (Structured Walking Plan Format)
  if (context.intent === 'BUILD_TRAIL') {
    const isTouristyExcluded = context.exclusions.includes('touristy');
    const cafe = isTouristyExcluded
      ? curated_spots.find((s) => s.id === 'spot-caffe-tato')!
      : curated_spots.find((s) => s.id === 'spot-cafe-bodega')!;
    const arcade = curated_spots.find((s) => s.id === 'spot-rua-31')!;
    const gallery = curated_spots.find((s) => s.id === 'spot-gitanjali-gallery')!;
    const landmark = isTouristyExcluded
      ? curated_spots.find((s) => s.id === 'spot-mandovi-books')!
      : curated_spots.find((s) => s.id === 'spot-old-secretariat')!;
    const overlook = curated_spots.find((s) => s.id === 'spot-altinho-overlook')!;
    const promenade = curated_spots.find((s) => s.id === 'spot-mandovi-promenade')!;
    const vinylOrMural = curated_spots.find((s) => s.id === 'spot-vinyl-den') || curated_spots.find((s) => s.id === 'spot-tiger-mural')!;

    // 5-Hour / 300-Minute Comprehensive Walking Plan
    if (context.durationMinutes >= 300) {
      return `Here is your curated 5-hour walking plan through Panaji, designed for an immersive, relaxed pace:\n\n` +
        `**Stop 1: ${cafe.name}**\n` +
        `• **When to visit:** Morning (8:30 AM – 9:15 AM)\n` +
        `• **Time to spend:** 45 minutes\n` +
        `• **Highlights & What to do:** Settle into the quiet courtyard with pour-over coffee and enjoy the morning light.\n` +
        `• **Walking to next stop:** 8-minute walk (~400m) into the heart of the Latin Quarter.\n\n` +
        `**Stop 2: ${arcade.name}**\n` +
        `• **When to visit:** Mid-morning (9:25 AM – 9:55 AM)\n` +
        `• **Time to spend:** 30 minutes\n` +
        `• **Highlights & What to do:** Stroll along the cobblestone heritage corridor with 18th-century wooden balcões and indigo tiles.\n` +
        `• **Walking to next stop:** 6-minute walk (~300m) toward the art studio.\n\n` +
        `**Stop 3: ${gallery.name}**\n` +
        `• **When to visit:** Morning (10:00 AM – 10:45 AM)\n` +
        `• **Time to spend:** 45 minutes\n` +
        `• **Highlights & What to do:** Explore contemporary Goan printmaking, linocuts, and the archival print studio.\n` +
        `• **Walking to next stop:** 10-minute walk (~550m) toward the riverfront.\n\n` +
        `**Stop 4: ${landmark.name}**\n` +
        `• **When to visit:** Late morning (10:55 AM – 11:35 AM)\n` +
        `• **Time to spend:** 40 minutes\n` +
        `• **Highlights & What to do:** Examine the 16th-century fortress laterite base and waterfront architecture.\n` +
        `• **Walking to next stop:** 8-minute walk (~450m) along the river.\n\n` +
        `**Stop 5: ${promenade.name}**\n` +
        `• **When to visit:** Midday (11:45 AM – 12:30 PM)\n` +
        `• **Time to spend:** 45 minutes\n` +
        `• **Highlights & What to do:** Walk under shaded rain trees, catch river breezes, and enjoy freshly baked poee.\n` +
        `• **Walking to next stop:** 14-minute shaded climb (~700m) to Altinho hill.\n\n` +
        `**Stop 6: ${overlook.name}**\n` +
        `• **When to visit:** Afternoon (12:45 PM – 1:20 PM)\n` +
        `• **Time to spend:** 35 minutes\n` +
        `• **Highlights & What to do:** Panoramic views across terracotta rooftops, church spires, and the Mandovi River.\n` +
        `• **Walking to next stop:** 10-minute walk back down into Fontainhas.\n\n` +
        `**Stop 7: ${vinylOrMural.name}**\n` +
        `• **When to visit:** Early afternoon (1:30 PM – 2:00 PM)\n` +
        `• **Time to spend:** 30 minutes\n` +
        `• **Highlights & What to do:** Relax with vintage vinyl tracks or admire the vibrant maritime folklore artwork.\n\n` +
        `**Plan Summary:**\n` +
        `• **Total Duration:** 5 hours (300 minutes)\n` +
        `• **Activity & Stop Time:** 270 minutes (4.5 hours)\n` +
        `• **Total Walking Time:** ~66 minutes (~3.5 km)\n` +
        `• **Route Sequence:** Cafe → Heritage Street → Art Gallery → Riverfront → Promenade → Overlook → Lounge\n` +
        `• **Local Tips:** Wear flat shoes for the cobblestones and stay hydrated under the tropical sun.`;
    }

    // 4-Hour / 240-Minute Structured Plan
    if (context.durationMinutes >= 240) {
      return `Here is your curated 4-hour walking plan through Panaji:\n\n` +
        `**Stop 1: ${cafe.name}**\n` +
        `• **When to visit:** Morning (9:00 AM – 9:45 AM)\n` +
        `• **Time to spend:** 45 minutes\n` +
        `• **Highlights & What to do:** Enjoy Chikmagalur pour-over coffee in the serene restored atrium courtyard.\n` +
        `• **Walking to next stop:** 8-minute walk (~400m) into Fontainhas.\n\n` +
        `**Stop 2: ${arcade.name}**\n` +
        `• **When to visit:** Mid-morning (9:55 AM – 10:30 AM)\n` +
        `• **Time to spend:** 35 minutes\n` +
        `• **Highlights & What to do:** Walk through narrow Latin Quarter corridors with wooden jalousies and family crests.\n` +
        `• **Walking to next stop:** 6-minute stroll (~300m) to the gallery.\n\n` +
        `**Stop 3: ${gallery.name}**\n` +
        `• **When to visit:** Late morning (10:35 AM – 11:20 AM)\n` +
        `• **Time to spend:** 45 minutes\n` +
        `• **Highlights & What to do:** Browse original lithographs, Goan artist prints, and the quiet exhibition space.\n` +
        `• **Walking to next stop:** 10-minute walk (~550m) toward the Mandovi.\n\n` +
        `**Stop 4: ${landmark.name}**\n` +
        `• **When to visit:** Midday (11:30 AM – 12:10 PM)\n` +
        `• **Time to spend:** 40 minutes\n` +
        `• **Highlights & What to do:** Explore Goa's oldest government palace and coastal stone ramparts.\n` +
        `• **Walking to next stop:** 12-minute walk (~600m) up the Altinho slope.\n\n` +
        `**Stop 5: ${overlook.name}**\n` +
        `• **When to visit:** Afternoon (12:25 PM – 1:00 PM)\n` +
        `• **Time to spend:** 35 minutes\n` +
        `• **Highlights & What to do:** Unwind with scenic panoramic views across the terracotta rooftops and river mouth.\n\n` +
        `**Plan Summary:**\n` +
        `• **Total Duration:** 4 hours (240 minutes)\n` +
        `• **Activity & Stop Time:** 200 minutes\n` +
        `• **Total Walking Time:** ~40 minutes (~2.8 km)\n` +
        `• **Route Sequence:** Cafe → Heritage Alleys → Gallery → Palace → Viewpoint\n` +
        `• **Local Tips:** Best started mid-morning to take advantage of courtyard coffee and afternoon breeze.`;
    }

    // 3-Hour / 180-Minute Structured Plan
    if (context.durationMinutes >= 180) {
      return `Here is your curated 3-hour walking plan through Panaji:\n\n` +
        `**Stop 1: ${cafe.name}**\n` +
        `• **When to visit:** Morning (9:30 AM – 10:15 AM)\n` +
        `• **Time to spend:** 45 minutes\n` +
        `• **Highlights & What to do:** Start with artisanal pour-over coffee and fresh breakfast in the sunlit courtyard patio.\n` +
        `• **Walking to next stop:** 8-minute walk (~400m) through the Latin Quarter.\n\n` +
        `**Stop 2: ${arcade.name}**\n` +
        `• **When to visit:** Mid-morning (10:25 AM – 11:00 AM)\n` +
        `• **Time to spend:** 35 minutes\n` +
        `• **Highlights & What to do:** Admire preserved 18th-century Portuguese facades, hand-painted tiles, and quiet lanes.\n` +
        `• **Walking to next stop:** 6-minute walk (~300m) to the print studio.\n\n` +
        `**Stop 3: ${gallery.name}**\n` +
        `• **When to visit:** Late morning (11:05 AM – 11:45 AM)\n` +
        `• **Time to spend:** 40 minutes\n` +
        `• **Highlights & What to do:** View contemporary prints and historic maps in a restored heritage home.\n` +
        `• **Walking to next stop:** 10-minute walk (~550m) to the waterfront.\n\n` +
        `**Stop 4: ${landmark.name}**\n` +
        `• **When to visit:** Noon (11:55 AM – 12:30 PM)\n` +
        `• **Time to spend:** 35 minutes\n` +
        `• **Highlights & What to do:** Take in the 500-year-old laterite fortress base and watch the river ferries pass by.\n\n` +
        `**Plan Summary:**\n` +
        `• **Total Duration:** 3 hours (180 minutes)\n` +
        `• **Activity & Stop Time:** 155 minutes\n` +
        `• **Total Walking Time:** ~25 minutes (~1.8 km)\n` +
        `• **Route Sequence:** Cafe → Heritage Arcade → Art Gallery → Historic Palace\n` +
        `• **Local Tips:** Flat, shaded walking corridors make this an easy stroll for any fitness level.`;
    }

    // 2-Hour / 120-Minute Structured Plan
    if (context.durationMinutes >= 120) {
      return `Here is your curated 2-hour walking plan through Fontainhas:\n\n` +
        `**Stop 1: ${cafe.name}**\n` +
        `• **When to visit:** Morning or Late Afternoon (e.g., 9:30 AM or 4:00 PM)\n` +
        `• **Time to spend:** 40 minutes\n` +
        `• **Highlights & What to do:** Relax with a specialty brew and quiet courtyard reading.\n` +
        `• **Walking to next stop:** 8-minute walk (~400m) into the cobblestone quarter.\n\n` +
        `**Stop 2: ${arcade.name}**\n` +
        `• **When to visit:** Mid-session\n` +
        `• **Time to spend:** 30 minutes\n` +
        `• **Highlights & What to do:** Stroll past vibrant yellow and blue facades and carved wooden balconies.\n` +
        `• **Walking to next stop:** 7-minute walk (~350m) to the gallery.\n\n` +
        `**Stop 3: ${gallery.name}**\n` +
        `• **When to visit:** Final hour\n` +
        `• **Time to spend:** 35 minutes\n` +
        `• **Highlights & What to do:** Browse local printmaking and lithographs in a serene colonial setting.\n\n` +
        `**Plan Summary:**\n` +
        `• **Total Duration:** 2 hours (120 minutes)\n` +
        `• **Activity & Stop Time:** 105 minutes\n` +
        `• **Total Walking Time:** ~15 minutes (~1.1 km)\n` +
        `• **Route Sequence:** Courtyard Cafe → Colonial Arcade → Print Studio\n` +
        `• **Local Tips:** Compact, highly walkable route with minimal vehicle traffic.`;
    }

    // 1-Hour / 60-Minute Focused Walking Plan (Default)
    return `Here is your focused 1-hour walking plan through Fontainhas:\n\n` +
      `**Stop 1: ${cafe.name}**\n` +
      `• **When to visit:** Starting point\n` +
      `• **Time to spend:** 25 minutes\n` +
      `• **Highlights & What to do:** Quick pour-over coffee in the serene courtyard.\n` +
      `• **Walking to next stop:** 8-minute walk (~400m).\n\n` +
      `**Stop 2: ${arcade.name}**\n` +
      `• **When to visit:** Mid-walk\n` +
      `• **Time to spend:** 15 minutes\n` +
      `• **Highlights & What to do:** Quick architectural stroll through the most iconic heritage lane.\n` +
      `• **Walking to next stop:** 7-minute walk (~350m) to the riverfront.\n\n` +
      `**Stop 3: ${landmark.name}**\n` +
      `• **When to visit:** Finish point\n` +
      `• **Time to spend:** 10 minutes\n` +
      `• **Highlights & What to do:** Admire the riverfront laterite ramparts by the water.\n\n` +
      `**Plan Summary:**\n` +
      `• **Total Duration:** 1 hour (60 minutes)\n` +
      `• **Activity & Stop Time:** 50 minutes\n` +
      `• **Total Walking Time:** ~15 minutes (~0.9 km)\n` +
      `• **Route Sequence:** Coffee Atrium → Heritage Lane → Riverfront Landmark`;
  }

  // 7. Update Preferences
  if (context.intent === 'UPDATE_PREFERENCES') {
    if (context.exclusions.includes('touristy')) {
      const tato = curated_spots.find((s) => s.id === 'spot-caffe-tato')!;
      const arcade = curated_spots.find((s) => s.id === 'spot-rua-31')!;
      const books = curated_spots.find((s) => s.id === 'spot-mandovi-books')!;

      return `Understood, let's keep things strictly off the tourist radar and focus on genuine neighborhood spots.\n\n` +
        `For your walk, I recommend starting at ${tato.name}, a cherished neighborhood haunt where local families have gathered for authentic Goan filter kaapi since 1974. From there, slip into ${arcade.name}, which is the quietest pedestrian back-lane in Fontainhas without tour buses. Wrap up with ${books.name}, a quiet secondhand literary haven tucked away near the riverbank with rare Portuguese travel memoirs.\n\n` +
        `Every stop on this route is peaceful, unhurried, and completely free of tourist commercialism.`;
    }

    if (context.durationMinutes >= 120) {
      const bodega = curated_spots.find((s) => s.id === 'spot-cafe-bodega')!;
      const arcade = curated_spots.find((s) => s.id === 'spot-rua-31')!;
      const gallery = curated_spots.find((s) => s.id === 'spot-gitanjali-gallery')!;
      const palace = curated_spots.find((s) => s.id === 'spot-old-secretariat')!;

      return `Updating your plan to 2 hours gives us room to expand without rushing, keeping our quiet café and colonial architecture focus intact.\n\n` +
        `Start at ${bodega.name} for about 35 minutes of unhurried pour-over coffee in the heritage courtyard. Then take a 10-minute walk through the ${arcade.name} to admire the wooden balconies and quiet cobblestones for 25 minutes. Head over to ${gallery.name} for about 30 minutes to see Goan printmaking and lithographs, and finish with a 10-minute walk down to the ${palace.name} to spend 20 minutes by the river ramparts.\n\n` +
        `That fills your 2 hours with about 110 minutes across the locations and 20 minutes of flat walking over 1.6 kilometers.`;
    }
  }

  // 8. General Recommendations
  if (spots.length === 0) {
    return `I couldn't find an exact match in my Panaji dataset for that. Try asking about quiet specialty coffee in Fontainhas, colonial heritage lanes, sunset lookouts along the Mandovi, or independent art printshops.`;
  }

  const top = spots[0];
  const second = spots[1];

  if (context.timeOfDay === 'evening') {
    let resp = `For a quiet evening refuge in Panaji, slip over to ${top.name} in ${top.location.quarter}. ${top.description.split('.')[0]}. As a local tip, ${top.curatorNote.toLowerCase()}`;
    if (second) {
      resp += `\n\nIf you prefer twilight along the water, wander over to ${second.name} nearby.`;
    }
    return resp;
  }

  let response = `For quiet places matching your mood, slip over to ${top.name} in ${top.location.quarter}. ${top.description.split('.')[0]}. As a local tip, ${top.curatorNote.toLowerCase()}`;
  if (second) {
    response += `\n\nAnother wonderful spot just a short stroll away is ${second.name} in ${second.location.quarter}.`;
  }
  return response;
}

export function generateFallbackResponse(query: string, spots: Spot[]): string {
  const context = extractConversationContext([], query);
  return generateIntelligentFallback(context, spots);
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
  preferredModel?: string,
  temperature = 0.7,
  maxOutputTokens = 1800
): Promise<GeminiCallResult> {
  const apiKey = (customApiKey || process.env.GEMINI_API_KEY || '').trim();
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  // Model waterfall — priority ordered by active quotas confirmed via models endpoint
  const requestedModel = preferredModel?.trim() || process.env.GEMINI_MODEL?.trim() || 'gemini-3.5-flash';
  const candidateModels = Array.from(
    new Set([
      requestedModel,
      'gemini-3.5-flash',
      'gemini-3.6-flash',
      'gemini-3.1-flash-lite',
      'gemini-flash-latest',
      'gemini-2.5-flash',
    ])
  );

  const contents = history.map((turn) => ({
    role: turn.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: turn.content }],
  }));

  contents.push({ role: 'user', parts: [{ text: userMessage }] });

  let lastError: Error | null = null;

  for (const model of candidateModels) {
    try {
      // Use v1beta where current Gemini models reside
      let apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      let response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents,
          generationConfig: {
            temperature,
            maxOutputTokens,
            topP: 0.95,
          },
        }),
      });

      // If v1beta returns 404, fallback to v1
      if (response.status === 404) {
        apiUrl = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`;
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents,
            generationConfig: {
              temperature,
              maxOutputTokens,
              topP: 0.95,
            },
          }),
        });
      }

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
