# TRAIL — Low-Fidelity Wireframes & Screen Planning Blueprint

**Project:** TRAIL — Cartographic Pedestrian Exploration & Discovery Platform  
**Author:** Person 1 — UI/UX & Product Design  
**Date:** October 2026  
**Document Version:** 1.0  
**Scope:** Low-Fidelity Layout Schematics, Component Hierarchy, Grid Allocations & User Interaction Notes across all 10 Core Screens.

---

## Screen Directory & Information Architecture

1. **Screen 01:** Landing Page (`/`) — Marketing narrative & discovery teaser
2. **Screen 02:** Explore Catalog (`/explore`) — Search, multi-filtering & trail cards grid
3. **Screen 03:** Trail Dossier (`/trails/[id]`) — Station breakdown, elevation & field notes
4. **Screen 04:** Active Trail Guidance (`/active-trail`) — Station progression, SVG corridor map & field logger
5. **Screen 05:** AI Discovery Engine (`/ai-discovery`) — Heuristic intent input, calibration matrix & synthesized dossier
6. **Screen 06:** Trail Creator (`/create-trail`) — Waypoint sequence builder & geodetic parameters
7. **Screen 07:** User Login & Authentication (`/login`) — Explorer identity sign-in/sign-up *(Previously Missing)*
8. **Screen 08:** User Onboarding Flow (`/onboarding`) — Sensory preferences & pacing setup *(Previously Missing)*
9. **Screen 09:** Explorer Dashboard (`/dashboard`) — Saved traverses, collected stamps & logbook *(Previously Missing)*
10. **Screen 10:** User Profile & Cartographic Settings (`/profile`) — Geodetic units & field preferences *(Previously Missing)*

---

## 1. Landing Page (`/`)

### Layout Schematic & Grid Allocation
```text
+-------------------------------------------------------------------------------+
| [LOGO] TRAIL               Explore   Create Trail   AI Discovery  [START A TRAIL] | (Global Nav)
+-------------------------------------------------------------------------------+
|                                                                               |
| [Pill: EDITION 2026 // FIELD CARTOGRAPHY]                                      |
|                                                                               |
| The world isn't meant to be bypassed at 60 mph.     [TRAIL OVERVIEW NARRATIVE]|
| Walk the connected narrative.                       01 Coffee . 02 Books      |
|                                                     03 Viewpoint . 04 Craft   |
|                                                                               |
| +---------------------------------------------------------------------------+ |
| | [BAR: TRAVERSE NO. 042 // COASTAL RIDGE TO OLD TOWN]  [ACTIVE RECON]      | |
| |---------------------------------------------------------------------------| |
| |                                                                           | |
| |     (01) Oak & Ember                               (03) Point Bonita      | |
| |        \----~----~----+                             /                     | |
| |                        \---- (02) Driftwood Books -/                      | |
| |                                                                           | |
| | [WAYPOINT NOTE: Driftwood Antiquarian // Rare maps & pour-over]           | |
| |---------------------------------------------------------------------------| |
| | DIST: 12.4 KM  |  TIME: 3H 45M  |  ELEV: +240M/-310M  |  [VIEW FULL TRAIL]| |
| +---------------------------------------------------------------------------+ |
|                                                                               |
| [01 PROBLEM: The Blind Spot of Navigation - Efficiency vs. Serendipity]        |
| [02 FEATURES: Topo Surveying | Living Landmarks | Ambient Direction]          |
| [03 PROTOCOL: 4-Step User Journey (Dispatch -> Synthesis -> Walk -> Ledger)]  |
| [04 PRODUCT PREVIEW: High-Contrast Glare Mode | Offline 4MB Cache]           |
| [05 AI SPOTLIGHT: Calibrate Traverse Preview]                                 |
| [06 SOCIAL PROOF: Field Explorer Quotes & Testimonials]                       |
| [07 FINAL CTA: Step into the Living Landscape]                               |
|                                                                               |
+-------------------------------------------------------------------------------+
| [FOOTER: Multi-column sitemap, Geodetic datum, Colophon & Legal]              |
+-------------------------------------------------------------------------------+
```

### UX Intent & Interaction Notes
- **Hero Canvas:** Interactive SVG surface where clicking station nodes updates the floating waypoint field note without navigating away.
- **Topographic Contour Background:** Low-opacity radial contour lines establish the authentic cartographic aesthetic immediately.

---

## 2. Explore Catalog (`/explore`)

### Layout Schematic & Grid Allocation
```text
+-------------------------------------------------------------------------------+
| [LOGO] TRAIL               Explore   Create Trail   AI Discovery  [START A TRAIL] |
+-------------------------------------------------------------------------------+
| PANAJI . 24 TRAILS NEARBY                         [GPS LOCKED: 15°29'N 73°49'E]|
| FIND YOUR NEXT TRAIL.                                                         |
| Follow a path. Discover something unexpected.                                 |
|                                                                               |
| +---------------------------------------------------------------------------+ |
| | [SEARCH: "What do you want to discover?"] [CMD+K] [LOC: PANAJI] [RESET]   | |
| | CATEGORIES: [ALL] [FOOD] [ART] [CULTURE] [NATURE] [HIDDEN GEMS]           | |
| | DURATION: Any Time | 30 Min | 1 Hour | 2 Hours | 3+ Hours                 | |
| | RADIUS: Nearby | 2 KM | 5 KM | 10 KM                                      | |
| +---------------------------------------------------------------------------+ |
|                                                                               |
| +---------------------------------------------------------------------------+ |
| | FEATURED TRAIL BANNER                                                     | |
| | [FOOD & CULTURE]  HIDDEN CAFES & COURTYARDS OF FONTAINHAS                 | |
| | "A sensory walking traverse through pastel colonial alleyways..."         | |
| | 04 STOPS  |  3.2 KM  |  2.5 HOURS  |  EASY TERRAIN                        | |
| | [IMAGE: Portuguese Courtyard Tile]                   [VIEW THIS TRAIL ->] | |
| +---------------------------------------------------------------------------+ |
|                                                                               |
| ACTIVE CATALOG (24 TRAVERSES)                                                 |
| +--------------------+ +--------------------+ +--------------------+         |
| | [TRAIL IMAGE]      | | [TRAIL IMAGE]      | | [TRAIL IMAGE]      |         |
| | #01 . ART & WALLS  | | #02 . BOOKSTORES   | | #03 . FORTS & SEA  |         |
| | Title of Trail     | | Title of Trail     | | Title of Trail     |         |
| | Description teaser | | Description teaser | | Description teaser |         |
| | 4 STOPS . 3.2 KM   | | 3 STOPS . 1.8 KM   | | 5 STOPS . 4.6 KM   |         |
| | [VIEW TRAIL]       | | [VIEW TRAIL]       | | [VIEW TRAIL]       |         |
| +--------------------+ +--------------------+ +--------------------+         |
|                                                                               |
+-------------------------------------------------------------------------------+
| [FOOTER]                                                                      |
+-------------------------------------------------------------------------------+
```

### UX Intent & Interaction Notes
- **Instant Client-Side Filtering:** Search query and category chips update the grid reactively with zero full-page reload.
- **Empty State Fallback:** When filters yield 0 results, displays a compass illustration with a "Reset All Filters" quick-action button.

---

## 3. Trail Details Dossier (`/trails/[id]`)

### Layout Schematic & Grid Allocation
```text
+-------------------------------------------------------------------------------+
| [<- BACK TO EXPLORE] / PANAJI . URBAN TRAVERSE #01        [SECTOR VERIFIED]   |
+-------------------------------------------------------------------------------+
|                                                                               |
| [TRAVERSE DOSSIER] [FOOD & CULTURE] [INDEX: GOA-PNJ-01]                       |
| Hidden Cafes & Secret Courtyards of Fontainhas                               |
| "A morning stroll connecting hand-poured roasters and colonial bakeries."     |
|                                                                               |
| [METRICS: 04 STOPS | 3.2 KM | 2.5 HOURS | +14M ELEV | EASY PEDESTRIAN]        |
|                                                                               |
| +-----------------------------------------+ +-------------------------------+ |
| | [MAIN TRAIL PHOTO / MAP VISUALIZER]     | | ACTION PANEL                  | |
| | High-contrast plate capture showing     | | [ START TRAIL ]               | |
| | initial waypoint entrance & terrain.    | | [ SAVE TO LOGBOOK ]           | |
| |                                         | | [ SHARE ] [ DOWNLOAD OFFLINE] | |
| |                                         | | Weather: 28°C Clear . Dry     | |
| +-----------------------------------------+ +-------------------------------+ |
|                                                                               |
| +---------------------------------------------------------------------------+ |
| | ITINERARY & STATIONS SEQUENCE                                             | |
| | [STATION 01] [STATION 02] [STATION 03] [STATION 04] (Tabs)                | |
| |                                                                           | |
| | Station 01: Cafe Bodega (0.0 KM . Start Point)                            | |
| | Description: Open-air colonial atrium serving single-origin roast.        | |
| | Field Clue: Look for the blue azulejo fountain in the inner courtyard.    | |
| | Estimated Time: 30 Mins | Surface: Portuguese Basalt Stone                | |
| +---------------------------------------------------------------------------+ |
|                                                                               |
| [MORE TRAILS TO EXPLORE: 3-column recommendation cards]                       |
|                                                                               |
+-------------------------------------------------------------------------------+
| [FOOTER]                                                                      |
+-------------------------------------------------------------------------------+
```

---

## 4. Active Trail Live Guidance (`/active-trail`)

### Layout Schematic & Grid Allocation
```text
+-------------------------------------------------------------------------------+
| [<- EXIT]  * ACTIVE TRAIL . STATION 02 OF 04 . IN PROGRESS    [TIME: 23:40]   |
+-------------------------------------------------------------------------------+
|                                                                               |
| [PROGRESSION LEDGER TIMELINE]                                                 |
| (01 Cafe Bodega [v]) ===== (02 Singbal's [*]) ----- (03 Fresco) ----- (04)   |
| Completed: 0.4 KM | Remaining: 2.8 KM | Elevation Gain: +8M                   |
|                                                                               |
| +-----------------------------------------+ +-------------------------------+ |
| | CARTOGRAPHIC TOPOGRAPHY // CORRIDOR     | | CURRENT STATION DOSSIER       | |
| | [SVG VECTOR MAP]                        | | STATION 02 // WAYPOINT        | |
| | Showing real-time heading bearing 310°  | | Singbal's Book House          | |
| | Contour lines + Street alleyway paths   | | "Heritage books & cartography"| |
| | Elevation profile indicator (+12M)      | |                               | |
| |                                         | | [IMAGE: Bookstore interior]   | |
| | [CURRENT: Altinho Stairway Pass]        | | Field Note: Check top shelf   | |
| +-----------------------------------------+ +-------------------------------+ |
|                                                                               |
| +-----------------------------------------+ +-------------------------------+ |
| | NEXT UP IN SEQUENCE                     | | ACTIVE CONTROLS PANEL         | |
| | Station 03: Rua 31 de Janeiro Fresco    | | [ PAUSE / RESUME TIMER ]      | |
| | Distance: 0.8 KM (~11 min walk)         | | [ STAMP WAYPOINT AS VISITED ] | |
| | Corridor: Heritage Basalt Stones        | | [ + LOG FIELD NOTE & PHOTO ]  | |
| |                                         | | [ FINISH EXPEDITION ]         | |
| +-----------------------------------------+ +-------------------------------+ |
|                                                                               |
+-------------------------------------------------------------------------------+
| [FIELD DESK FOOTER: Telemetry, Datum WGS 84, Coordinates]                     |
+-------------------------------------------------------------------------------+
```

---

## 5. AI Discovery Engine (`/ai-discovery`)

### Layout Schematic & Grid Allocation
```text
+-------------------------------------------------------------------------------+
| [LOGO] TRAIL               Explore   Create Trail   AI Discovery  [START A TRAIL] |
+-------------------------------------------------------------------------------+
| 06 // HEURISTIC DISCOVERY ENGINE                       [ALGORITHM: GEMINI 1.5]|
| SYNTHESIZE AN AMBIENT TRAIL.                                                  |
| Describe what kind of day you want to walk.                                   |
|                                                                               |
| +---------------------------------------------------------------------------+ |
| | CARD 01: NATURAL LANGUAGE EXPEDITION INTENT          [CMD+ENTER SYNTHESIZE] |
| | [Textarea: "I have 2 hours, want good coffee, some art and somewhere quiet"]|
| | SEED PROMPTS:                                                             | |
| | [*] Morning espresso, historic bookshop, and shady alley walk             | |
| | [*] Contemporary local murals, pottery studio, and river sunset           | |
| | [*] Quiet courtyard gardens, old colonial architecture, zero crowds       | |
| +---------------------------------------------------------------------------+ |
|                                                                               |
| +---------------------------------------------------------------------------+ |
| | CARD 02: RECONNAISSANCE PARAMETERS & CALIBRATION                          | |
| | LOCUS: [Panaji, Goa]           TIME BUDGET: [ --O-------- ] 2.0 Hours     | |
| | THEMES: [x] Coffee  [x] Art  [x] Books  [ ] Nature  [x] Quiet             | |
| | MAX DISTANCE: [ -----O---- ] 5.0 KM      PACE: Pedestrian Stroll          | |
| |                                          [SYNTHESIZE EXPEDITION DOSSIER]  | |
| +---------------------------------------------------------------------------+ |
|                                                                               |
| +---------------------------------------------------------------------------+ |
| | CARD 03: SYNTHESIZED TRAVERSE DOSSIER (RESULT)       [LATENCY: 420MS]     | |
| | Title: Panaji Heritage Atelier & Espresso Traverse                         | |
| | Archetype: Coffee . Art . Hidden Street . Sunset Terminus                 | |
| | 4 STOPS | 3.5 KM | 2.1 HOURS | ELEV: +18M                                 | |
| | Waypoints:                                                                | |
| |   1. Café Bodega (Pour-over & open courtyard)                             | |
| |   2. Singbal's Book House (Historic Goan folklore books)                  | |
| |   3. Gallery Gitanjali (Indigenous Goan contemporary art)                 | |
| |   4. Mandovi Riverfront Promenade (River breeze terminus)                | |
| | [ BEGIN ACTIVE TRAIL -> ]  [ SAVE TO MY TRAILS ]  [ RE-GENERATE ]         | |
| +---------------------------------------------------------------------------+ |
|                                                                               |
+-------------------------------------------------------------------------------+
| [FIELD DESK FOOTER]                                                           |
+-------------------------------------------------------------------------------+
```

---

## 6. Trail Creator (`/create-trail`)

### Layout Schematic & Grid Allocation
```text
+-------------------------------------------------------------------------------+
| [LOGO] TRAIL               Explore   Create Trail   AI Discovery  [START A TRAIL] |
+-------------------------------------------------------------------------------+
| 04 // TRAIL CREATION & CURATION PROTOCOL                 [FIELD REGISTER V2.6]|
| INSCRIBE A NEW TRAIL IN THE REGISTRY.                                         |
|                                                                               |
| +-----------------------------------------+ +-------------------------------+ |
| | FORM SPECIFICATIONS                     | | WAYPOINT SEQUENCE BUILDER     | |
| | Starting Point: [Panaji Latin Quarter]  | | Total Stops: 3 Waypoints      | |
| | Geodetic: 15°29'56"N . 73°49'40"E       | | Distance: 3.5 KM | Time: 2h   | |
| |                                         | |                               | |
| | Selected Interests:                     | | [wp-01] Cafe Bodega           | |
| | [x] Coffee  [x] Books  [x] Culture      | |   0.4 km . 30 min . Coffee    | |
| |                                         | | [wp-02] Singbal's Books       | |
| | Max Distance Slider: [ ---O--- ] 3.5 KM | |   1.2 km . 25 min . Books     | |
| | Est. Duration: 2.0 Hours                | | [wp-03] Fresco Corridor       | |
| | Trail Title: [                          ] | |   2.0 km . 20 min . Art       | |
| | Curatorial Subtitle: [                  ] | |                               | |
| | Detailed Description: [                 ] | | [ + ADD ANOTHER WAYPOINT ]    | |
| +-----------------------------------------+ +-------------------------------+ |
|                                                                               |
| +---------------------------------------------------------------------------+ |
| | ACTION BAR: [RESET DRAFT]   [PREVIEW TRAVERSE]   [PUBLISH TO DIRECTORY]   | |
| +---------------------------------------------------------------------------+ |
|                                                                               |
+-------------------------------------------------------------------------------+
| [FIELD DESK FOOTER]                                                           |
+-------------------------------------------------------------------------------+
```

---

## 7. User Login & Authentication (`/login`) *(Missing Screen Blueprint)*

### Layout Schematic & Grid Allocation
```text
+-------------------------------------------------------------------------------+
| [LOGO] TRAIL                                                    [BACK TO HOME]|
+-------------------------------------------------------------------------------+
|                                                                               |
|                          +---------------------------+                        |
|                          | TRAIL CARTOGRAPHIC LOGIN  |                        |
|                          | Index 00 // Identity Auth |                        |
|                          |                           |                        |
|                          | Email Address:            |                        |
|                          | [ explorer@trail.co     ] |                        |
|                          |                           |                        |
|                          | Password:                 |                        |
|                          | [ ********************  ] |                        |
|                          | [Forgot Password?]        |                        |
|                          |                           |                        |
|                          | [ SIGN IN TO LOGBOOK ]    |                        |
|                          |                           |                        |
|                          | -------- OR --------      |                        |
|                          | [ G Continue with Google ]|                        |
|                          |                           |                        |
|                          | New wanderer?             |                        |
|                          | [Create an Account]       |                        |
|                          +---------------------------+                        |
|                                                                               |
+-------------------------------------------------------------------------------+
| [FIELD DESK FOOTER]                                                           |
+-------------------------------------------------------------------------------+
```

---

## 8. First-Time User Onboarding (`/onboarding`) *(Missing Screen Blueprint)*

### Layout Schematic & Grid Allocation
```text
+-------------------------------------------------------------------------------+
| [LOGO] TRAIL                                                  Step 1 of 3 [v] |
+-------------------------------------------------------------------------------+
|                                                                               |
|              [STEP 1: SELECT YOUR PREFERRED EXPEDITION THEMES]                |
|              Pick the sensory landmarks that make you want to walk.           |
|                                                                               |
|    +-------------------+  +-------------------+  +-------------------+        |
|    | [COFFEE ROASTERS] |  | [ANTIQUE BOOKS]   |  | [SECRET GARDENS]  |        |
|    | Artisanal beans & |  | Second-hand shops |  | Courtyards & quiet|        |
|    | historic atriums  |  | & regional maps   |  | botanical nooks   |        |
|    +-------------------+  +-------------------+  +-------------------+        |
|                                                                               |
|    +-------------------+  +-------------------+  +-------------------+        |
|    | [STREET MURALS]   |  | [SCENIC VISTAS]   |  | [LOCAL ARTISANS]  |        |
|    | Azulejos tiles &  |  | Headlands, ridges |  | Pottery, ceramics |        |
|    | urban street art  |  | & river breezes   |  | & woodcrafts      |        |
|    +-------------------+  +-------------------+  +-------------------+        |
|                                                                               |
|              [STEP 2: DEFINE YOUR WALKING CADENCE (SLIDER)]                   |
|              Unhurried Stroll (2-3 km/h) <====O====> Brisk Hike (5 km/h)      |
|                                                                               |
|              [STEP 3: PRIMARY GEOGRAPHY: [ Panaji / Goa v ] ]                 |
|                                                                               |
|                     [ CONTINUE TO MY DASHBOARD -> ]                           |
|                                                                               |
+-------------------------------------------------------------------------------+
| [FIELD DESK FOOTER]                                                           |
+-------------------------------------------------------------------------------+
```

---

## 9. Explorer Dashboard (`/dashboard`) *(Missing Screen Blueprint)*

### Layout Schematic & Grid Allocation
```text
+-------------------------------------------------------------------------------+
| [LOGO] TRAIL       Explore   Create   AI Discovery   [Dashboard]   [USER AVATAR]|
+-------------------------------------------------------------------------------+
| EXPLORER LOGBOOK // ID: PANAJI-WANDERER-084                    [ACTIVE CADENCE]|
| Welcome back, Purva.                                                          |
|                                                                               |
| [STAT 1: 8 TRAILS WALKED]  [STAT 2: 32 STOPS VISITED]  [STAT 3: 28.4 KM LOGGED]
|                                                                               |
| +-----------------------------------------+ +-------------------------------+ |
| | SAVED TRAILS IN YOUR PACK (3)           | | RECENT WAYPOINT STAMPS        | |
| | +-------------------------------------+ | | [*] Cafe Bodega - Stamped Oct 1| |
| | | Hidden Cafes of Fontainhas          | | | [*] Singbal's - Stamped Oct 1 | |
| | | 4 Stops . 3.2 KM . [RESUME TRAIL]   | | | [*] Gallery Gitanjali - Sep 28| |
| | +-------------------------------------+ | | [*] Miramar Point - Sep 26    | |
| | +-------------------------------------+ | |                               | |
| | | Altinho Architectural Ridge Walk    | | | [VIEW MY FIELD PASSPORT]      | |
| | | 5 Stops . 4.1 KM . [START TRAIL]    | | |                               | |
| | +-------------------------------------+ | | RECENT FIELD NOTES (2)        | |
| |                                         | | "The second floor teak room   | |
| | [EXPLORE MORE TRAILS TO SAVE ->]        | | at Singbal's has rare 1910    | |
| |                                         | | maritime coastal surveys."    | |
| +-----------------------------------------+ +-------------------------------+ |
|                                                                               |
+-------------------------------------------------------------------------------+
| [FOOTER]                                                                      |
+-------------------------------------------------------------------------------+
```

---

## 10. User Profile & Settings (`/profile`) *(Missing Screen Blueprint)*

### Layout Schematic & Grid Allocation
```text
+-------------------------------------------------------------------------------+
| [LOGO] TRAIL       Explore   Create   AI Discovery   [Dashboard]   [USER AVATAR]|
+-------------------------------------------------------------------------------+
| CARTOGRAPHIC PROFILE & TELEMETRY SETTINGS                                     |
| Manage your explorer credentials, telemetry datum, and AI preferences.       |
|                                                                               |
| +---------------------------------------------------------------------------+ |
| | SECTION 01: EXPLORER PROFILE                                              | |
| | Name: [Purva Mapari             ]  Email: [purva@trail.co               ] | |
| | Home Base: [Panaji, Goa         ]  Bio:   [Cartographer & Coffee Seeker ] | |
| +---------------------------------------------------------------------------+ |
|                                                                               |
| +---------------------------------------------------------------------------+ |
| | SECTION 02: TELEMETRY & DISPLAY PREFERENCES                               | |
| | Distance Units:    (o) Kilometers (Metric)      ( ) Miles (Imperial)      | |
| | Elevation Units:   (o) Meters (+M)              ( ) Feet (+FT)            | |
| | Color Profile:     (o) High-Contrast Glare Mode ( ) Standard Parchment    | |
| | Geodetic Datum:    WGS 84 (Standard GPS)                                  | |
| +---------------------------------------------------------------------------+ |
|                                                                               |
| +---------------------------------------------------------------------------+ |
| | SECTION 03: AI SCOUT ENGINE CREDENTIALS                                   | |
| | Model Provider: Google Gemini 1.5 Pro (Configured)                        | |
| | API Key:        [ AIzaSy******************************** ]  [TEST KEY]    | |
| | Offline Fallback Engine: Active (534 Curated Panaji Spots)                | |
| +---------------------------------------------------------------------------+ |
|                                                                               |
| ACTION: [SAVE CHANGES]    [EXPORT MY EXPEDITION LOGBOOK]   [SIGN OUT]        |
|                                                                               |
+-------------------------------------------------------------------------------+
| [FIELD DESK FOOTER]                                                           |
+-------------------------------------------------------------------------------+
```

---

*Authored by Person 1 (UI/UX & Product Design) — Screen Planning Archive.*
