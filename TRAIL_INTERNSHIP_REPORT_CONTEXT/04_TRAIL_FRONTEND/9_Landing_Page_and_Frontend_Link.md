# 9 Landing Page & Frontend Architecture

## 1. Live Application Access & Endpoints
- **Local Application URL**: `http://localhost:3000`
- **AI Discovery Studio**: `http://localhost:3000/ai-discovery`
- **Explore Trails Catalog**: `http://localhost:3000/explore`
- **Custom Trail Builder**: `http://localhost:3000/create-trail`
- **Trail Details Dossier**: `http://localhost:3000/trails/[id]` (e.g., `/trails/hidden-cafes-panaji`)
- **Active Trail HUD**: `http://localhost:3000/active-trail`
- **TRAIL Scout Floating Assistant**: Persistent across all routes via RootLayout
- **Backend Health Check**: `http://localhost:4000/health`
- **Backend Spots API**: `http://localhost:4000/api/spots`

---

## 2. Frontend Technology Stack
- **Framework**: Next.js 16.3.7 (Turbopack, App Router)
- **Styling**: Vanilla Tailwind CSS + Custom Design Tokens (Warm Sand `#F4F2EB`, Deep Forest `#183D2B`, Terracotta `#E36A2E`)
- **Typography**: Google Fonts via `next/font`:
  - `Newsreader` (Editorial Serif variable)
  - `Plus Jakarta Sans` (Contemporary Sans variable)
  - `JetBrains Mono` (Geodetic / Telemetry Monospace variable)
- **Icons**: `lucide-react`
- **State & Caching**: Client-side localStorage for API Key BYOK, sessionStorage for custom trail handoffs, and React Server Components for deterministic initial hydration.

---

## 3. Key UI Pages & Screen Artifacts
1. **Landing.png**: Hero section with search bar, quick filter tags, 4 built-in capabilities, and featured walk interactive switcher.
2. **Explore.png**: Filterable catalog of curated trails and individual vetted spots with category pills and search.
3. **AIDiscovery.png**: The AI Trail Curator Studio with region selector, time budget, themes, mood, and movement cadence.
4. **TrailDetails.png**: The comprehensive field dossier including telemetry, "The Connected Route", alternating photo plates, and "Trail at a Glance" ledger.
5. **ActiveTrail.png**: Live navigation HUD with sequential stop progression, curator discovery clues, elevation corridor, and completion ledger modal.
6. **CreateTrail.png**: Manual cartographic route builder with waypoint sequencing and radial distance estimation.
7. **code.js**: Single-page Figma board generator plugin for TRAIL brand identity and design system.
