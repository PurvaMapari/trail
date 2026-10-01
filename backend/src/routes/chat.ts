/**
 * TRAIL Scout — Chat Route
 * POST /api/chat
 *
 * Phase 7: Backend/API — lightweight Express endpoint for AI interaction
 */

import { Router, Request, Response } from 'express';
import { ChatRequest, ChatResponse } from '../types/chat';
import {
  getRelevantSpots,
  buildSystemPrompt,
  callGeminiAPI,
  generateFallbackResponse,
  parseSpotCards,
  generateFollowUps,
} from '../services/aiService';

const router = Router();

/**
 * POST /api/chat
 * Body: ChatRequest
 * Headers (optional):
 *   x-gemini-api-key: custom client API key
 *   x-gemini-model: requested model (e.g. gemini-1.5-pro)
 * Returns: ChatResponse
 */
router.post('/', async (req: Request, res: Response) => {
  const start = Date.now();

  try {
    const { message, history = [], maxWalkMinutes, apiKey: bodyApiKey, model: bodyModel }: ChatRequest = req.body;

    // Validate input
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      res.status(400).json({
        message: 'Please ask me something! I know all the hidden spots in Panaji.',
        source: 'fallback',
        modelUsed: 'local-curated-engine',
        error: 'Empty or missing message field',
      } satisfies ChatResponse);
      return;
    }

    // Resolve API key and Model with client overrides
    const headerApiKey = (req.headers['x-gemini-api-key'] as string)?.trim() || undefined;
    const headerModel = (req.headers['x-gemini-model'] as string)?.trim() || undefined;

    const effectiveApiKey = headerApiKey || bodyApiKey?.trim() || process.env.GEMINI_API_KEY?.trim();
    const effectiveModel = headerModel || bodyModel?.trim() || process.env.GEMINI_MODEL?.trim() || 'gemini-1.5-pro';

    // Step 1: Retrieve relevant spots
    const relevantSpots = getRelevantSpots(message, maxWalkMinutes, 5);

    // Step 2: Build system prompt
    const systemPrompt = buildSystemPrompt(relevantSpots);

    let aiText: string;
    let source: 'gemini' | 'fallback' = 'fallback';
    let modelUsed = 'local-curated-engine';

    // Step 3: Call Gemini if key available, else use smart fallback
    if (effectiveApiKey) {
      try {
        const result = await callGeminiAPI(systemPrompt, message, history.slice(-8), effectiveApiKey, effectiveModel);
        aiText = result.text;
        source = 'gemini';
        modelUsed = result.modelUsed;
      } catch (err) {
        console.warn('[TRAIL Scout] Gemini call failed, using fallback engine:', (err as Error).message);
        aiText = generateFallbackResponse(message, relevantSpots);
      }
    } else {
      // Offline / zero-dependency local intelligence mode
      aiText = generateFallbackResponse(message, relevantSpots);
    }

    // Step 4: Parse spot cards + follow-ups
    const spotCards = parseSpotCards(aiText, relevantSpots);
    const suggestedFollowUps = generateFollowUps(relevantSpots, message);

    res.json({
      message: aiText,
      spotCards,
      suggestedFollowUps,
      source,
      modelUsed,
      processingMs: Date.now() - start,
    } satisfies ChatResponse);

  } catch (err) {
    console.error('[TRAIL Scout] Unhandled error:', err);
    res.status(500).json({
      message: "Something went wrong on my end. Try again — I'm usually more reliable than Goa's monsoon.",
      source: 'fallback',
      modelUsed: 'local-curated-engine',
      error: String(err),
      processingMs: Date.now() - start,
    } satisfies ChatResponse);
  }
});

export default router;
