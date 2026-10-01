/**
 * TRAIL Scout — Shared Types
 *
 * These types MUST exactly mirror the frontend's:
 *   frontend/types/chat.ts       (ChatMessage, ChatRequest, ChatResponse, SpotCard)
 *   frontend/data/spots.ts       (Spot, SpotCategory, FootTraffic, BestTime)
 *
 * The backend serialises Spot objects directly into JSON responses that the
 * frontend deserialises — any mismatch in field names or types will cause
 * runtime rendering failures in TrailChatbot.tsx.
 */

// ─── Spot Types (mirror of frontend/data/spots.ts) ────────────────────────────

export type SpotCategory =
  | 'coffee'
  | 'bookstore'
  | 'art'
  | 'street-art'
  | 'nature'
  | 'viewpoint'
  | 'heritage'
  | 'food'
  | 'culture'
  | 'hidden-gem'
  | 'artisan'
  | 'music';

export type FootTraffic = 'quiet' | 'moderate' | 'busy';
export type BestTime = 'morning' | 'afternoon' | 'evening' | 'night' | 'anytime';

export interface Spot {
  id: string;
  name: string;
  shortName?: string;
  category: SpotCategory;
  categoryTags: string[];
  description: string;
  curatorNote: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    quarter: string;
    city: string;
  };
  vibes: string[];
  footTraffic: FootTraffic;
  bestTime: BestTime[];
  openingHours?: string;
  estimatedMinutes: number;
  walkTimeFromCenterMin: number;
  distanceFromCenterKm: number;
  indoorOutdoor: 'indoor' | 'outdoor' | 'both';
  noiseLevel: 'silent' | 'quiet' | 'moderate' | 'lively';
  wifiAvailable?: boolean;
  petFriendly?: boolean;
  highlighted?: boolean;
  source: string;
}

// ─── Chat Types (mirror of frontend/types/chat.ts) ────────────────────────────

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

/**
 * Body sent by TrailChatbot.tsx → POST /api/chat
 * Fields: message (required), history (optional array of prior turns)
 */
export interface ChatRequest {
  message: string;
  history?: ChatMessage[];
  locus?: string;
  maxWalkMinutes?: number;
  apiKey?: string;
  model?: string;
}

/**
 * SpotCard rendered by SpotCardUI in TrailChatbot.tsx
 * All fields used directly in JSX — do NOT rename.
 */
export interface SpotCard {
  spot: Spot;
  matchReason: string;
  relevanceScore: number;
  action?: 'add-to-trail' | 'view-on-map' | 'synthesize-trail';
}

/**
 * Full JSON response consumed by TrailChatbot.tsx
 * Keys map directly to: data.message, data.spotCards, data.suggestedFollowUps, data.source
 */
export interface ChatResponse {
  message: string;
  spotCards?: SpotCard[];
  suggestedFollowUps?: string[];
  source: 'gemini' | 'fallback';
  modelUsed?: string;
  processingMs?: number;
  error?: string;
}
