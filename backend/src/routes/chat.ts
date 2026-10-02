/**
 * TRAIL Scout — Chat Route
 * POST /api/chat
 *
 * Phase 7: Backend/API — lightweight Express endpoint for AI interaction
 */

import { Router, Request, Response } from 'express';
import { ChatRequest, ChatResponse } from '../types/chat';
import {
  extractConversationContext,
  getRelevantSpotsWithContext,
  buildSystemPromptWithContext,
  callGeminiAPI,
  generateIntelligentFallback,
  parseSpotCards,
  generateContextualFollowUps,
  cleanChatResponse,
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
    const { message, history = [], apiKey: bodyApiKey, model: bodyModel }: ChatRequest = req.body;

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
    const effectiveModel = headerModel || bodyModel?.trim() || process.env.GEMINI_MODEL?.trim() || 'gemini-3.6-flash';

    // Step 1: Extract conversation memory and intent across turns
    const context = extractConversationContext(history, message);

    // Step 2: Retrieve spots conditioned on context and intent (scaled for full-duration itineraries)
    const maxResults = context.durationMinutes >= 180 ? 8 : (context.durationMinutes >= 120 ? 6 : 5);
    const relevantSpots = getRelevantSpotsWithContext(context, maxResults);

    // Step 3: Build contextual system prompt
    const systemPrompt = buildSystemPromptWithContext(context, relevantSpots);

    let aiText: string;
    let source: 'gemini' | 'fallback' = 'fallback';
    let modelUsed = 'local-curated-engine';

    // Step 4: Call Gemini if key available, else use intelligent fallback
    if (effectiveApiKey) {
      try {
        const result = await callGeminiAPI(systemPrompt, message, history.slice(-8), effectiveApiKey, effectiveModel);
        aiText = result.text;
        source = 'gemini';
        modelUsed = result.modelUsed;
      } catch (err) {
        console.warn('[TRAIL Scout] Gemini call failed, using intelligent fallback:', (err as Error).message);
        aiText = generateIntelligentFallback(context, relevantSpots);
      }
    } else {
      // Offline / zero-dependency local intelligence mode
      aiText = generateIntelligentFallback(context, relevantSpots);
    }

    // Step 5: Parse spot cards + follow-ups
    const spotCards = parseSpotCards(aiText, relevantSpots);
    const suggestedFollowUps = generateContextualFollowUps(context, spotCards.map((c) => c.spot));
    const cleanedMessage = cleanChatResponse(aiText);

    res.json({
      message: cleanedMessage,
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
