# Deliverable 10: TRAIL Scout — AI & Data Strategy
*AI/data pipeline, architecture, model strategy, privacy and ethics*
**Member 4 — AI, Data & Finance Specialist**
**Date**: October 2026

---

## Section 1: Executive Summary
TRAIL Scout is the AI intelligence layer of the TRAIL platform. It transforms a pedestrian explorer's natural-language intent — *"find me quiet coffee spots near Fontainhas"* or *"plan a 2-hour heritage walk with a bookstore"* — into a structured, atmospheric, multi-stop trail dossier.

The AI solves the core business problem directly: traditional navigation apps route you to a destination; TRAIL Scout synthesises a living, curated journey between experiences.

---

## Section 2: The 8-Stage AI Data Pipeline
1. **Stage 1: Data Source**: OpenStreetMap Overpass API (geo-coordinates, place types), Goa Tourism Heritage Survey 2024 (cultural context), TRAIL Field Curation (curator clues, vibe tags, opening hours), Community Submissions.
2. **Stage 2: Data Collection**: OSM Overpass QL queries by bounding box (Panaji lat/lng range), manual field reconnaissance (Member 4 + team), cross-referencing Google Maps Place API for hours verification, community submissions (anonymised).
3. **Stage 3: Data Cleaning**: Normalising categories into 12 `SpotCategory` values; removing duplicate/closed venues; standardising coordinates to 4 decimal places (~11m precision); standardising opening hours (`HH:MM - HH:MM`); privacy audit: zero PII.
4. **Stage 4: Data Storage**:
   - Primary: TypeScript module `backend/src/data/spots.ts` exporting `curated_spots: Spot[]` (21+ spots with 20+ typed fields).
   - Mirror: `frontend/data/spots.ts` for client-side offline fallback.
5. **Stage 5: AI / LLM Selection**:
   - Tier 1: Google Gemini 1.5 Pro (high reasoning + local nuance)
   - Tier 2: Google Gemini 1.5 Flash (speed-optimised)
   - Tier 3: Google Gemini 2.0 Flash (next-gen, if configured)
   - Tier 4: Local Fallback (deterministic keyword + vibe scoring engine, zero-dependency, 100% offline)
6. **Stage 6: User Query Interfaces**:
   - Mode A — Conversational Chat (`POST /api/chat` via `TrailChatbot.tsx`)
   - Mode B — Trail Synthesis (`POST /api/generate-trail` via AI Discovery page)
7. **Stage 7: AI Processing Architecture**:
   - `extractConversationContext()`: Intent parsing & memory
   - `getRelevantSpotsWithContext()`: Semantic spot retrieval (top 5–8)
   - `scoreSpotRelevance()`: Relevance scoring engine
   - `buildSystemPromptWithContext()`: LLM prompt assembly
   - `callGeminiAPI()`: LLM API call
   - `generateIntelligentFallback()`: Offline fallback engine
   - `parseSpotCards()` + `generateContextualFollowUps()`: Post-processing
8. **Stage 8: Output**:
   - Chat Mode: `ChatResponse { message, spotCards[], suggestedFollowUps[] }`
   - Trail Mode: `RichTrail JSON { title, stops[], detailedStops[], metadata }` rendered in `AISynthesizedDossier`.

---

## Section 3: Data Schema & API Summary
```typescript
interface Spot {
  id: string;
  name: string;
  shortName?: string;
  category: SpotCategory;
  categoryTags: string[];
  description: string;
  curatorNote: string;
  location: { lat: number; lng: number; address: string; quarter: string; city: string; };
  vibes: string[];
  footTraffic: 'quiet' | 'moderate' | 'busy';
  bestTime: BestTime[];
  openingHours?: string;
  estimatedMinutes: number;
  walkTimeFromCenterMin: number;
  distanceFromCenterKm: number;
  indoorOutdoor: 'indoor' | 'outdoor' | 'both';
  noiseLevel: 'silent' | 'quiet' | 'moderate' | 'lively';
  highlighted?: boolean;
  source: string;
}
```

---

## Section 4: Privacy, Ethics & Compliance
- **Zero Financial / Identity PII**: No bank accounts, Aadhaar, PAN, passwords, or personal health records.
- **Venue-Level Data**: All data represents public commercial venues.
- **Data Minimisation**: No user queries stored server-side; completely stateless API.
