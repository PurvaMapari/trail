/**
 * TRAIL Scout — AI Chatbot Types
 * Deliverable 12: Working AI Prototype — Type contracts
 *
 * These types define the API contract between frontend and the standalone backend.
 * Backend implementation: /backend/src/routes/chat.ts
 * Backend endpoint: POST http://localhost:4000/api/chat
 */

import { Spot } from '@/data/spots';

// ─── Request ─────────────────────────────────────────────────────────────────

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export interface ChatRequest {
  /** Natural language message from the user */
  message: string;
  /** Conversation history for multi-turn context */
  history?: ChatMessage[];
  /** Optional location context for proximity filtering */
  locus?: string;
  /** Max walking time in minutes the user is willing to walk */
  maxWalkMinutes?: number;
  /** Client-provided Gemini API key override */
  apiKey?: string;
  /** Client-provided model preference (e.g. gemini-1.5-pro) */
  model?: string;
}

// ─── Response ─────────────────────────────────────────────────────────────────

export interface SpotCard {
  /** Matching spot from the curated dataset */
  spot: Spot;
  /** Why the AI recommended this spot (generated) */
  matchReason: string;
  /** Confidence score 0-1 */
  relevanceScore: number;
  /** Optional action the user can take */
  action?: 'add-to-trail' | 'view-on-map' | 'synthesize-trail';
}

export interface ChatResponse {
  /** Conversational text response from the AI */
  message: string;
  /** Optionally structured spot recommendations */
  spotCards?: SpotCard[];
  /** AI-suggested follow-up prompts */
  suggestedFollowUps?: string[];
  /** Source: 'gemini' | 'fallback' */
  source: 'gemini' | 'fallback';
  /** Model that generated the response */
  modelUsed?: string;
  /** Processing time in ms */
  processingMs?: number;
  /** Error if something went wrong */
  error?: string;
}

// ─── Quick Prompt Seeds ───────────────────────────────────────────────────────

export interface QuickPrompt {
  id: string;
  label: string;
  emoji: string;
  prompt: string;
  category: string;
}

export const QUICK_PROMPTS: QuickPrompt[] = [
  {
    id: 'qp-quiet-coffee',
    label: 'Quiet Coffee',
    emoji: 'coffee',
    prompt: 'I need a quiet cafe with good coffee where I can work or read for an hour.',
    category: 'coffee',
  },
  {
    id: 'qp-hidden-art',
    label: 'Hidden Art',
    emoji: 'art',
    prompt: 'Show me hidden art galleries or street murals that most tourists miss.',
    category: 'art',
  },
  {
    id: 'qp-sunset-spot',
    label: 'Sunset Spot',
    emoji: 'sunset',
    prompt: 'Where is the best place to watch the sunset in Panaji right now?',
    category: 'nature',
  },
  {
    id: 'qp-local-food',
    label: 'Local Food',
    emoji: 'food',
    prompt: 'Find me an authentic local Goan restaurant that is not touristy.',
    category: 'food',
  },
  {
    id: 'qp-bookstore',
    label: 'Bookstore',
    emoji: 'book',
    prompt: 'I want to find a good independent bookstore with character, not just a shop.',
    category: 'bookstore',
  },
  {
    id: 'qp-heritage-walk',
    label: 'Heritage Walk',
    emoji: 'heritage',
    prompt: 'Tell me about heritage lanes and colonial architecture I can explore on foot.',
    category: 'heritage',
  },
];

// ─── AI Architecture Metadata (Deliverable 10) ───────────────────────────────

export const AI_ARCHITECTURE = {
  name: 'TRAIL Scout',
  version: '1.0.0',
  pipeline: [
    { step: 1, name: 'Input Parsing', description: 'Natural language query parsed for intent, location, time, and category signals' },
    { step: 2, name: 'Spot Retrieval', description: 'Semantic keyword + vibe matching against curated_spots dataset (21+ POIs)' },
    { step: 3, name: 'Context Assembly', description: 'Top matching spots serialized into structured context window for LLM' },
    { step: 4, name: 'LLM Generation', description: 'Gemini 1.5 Flash generates conversational response with local curator voice' },
    { step: 5, name: 'Response Parsing', description: 'Structured spot cards extracted and merged with free-text response' },
    { step: 6, name: 'Frontend Handoff', description: 'Typed ChatResponse delivered to TrailChatbot component via /api/chat' },
  ],
  modelPrimary: 'gemini-1.5-flash',
  modelFallback: 'TRAIL semantic keyword engine (zero-dependency offline)',
  systemPromptVersion: 'v1.2',
  maxContextSpots: 5,
  dataSource: 'curated_spots (spots.ts)',
};
