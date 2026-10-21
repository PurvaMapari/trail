# Deliverable 11: Dataset and Sources

## 1. Dataset Overview
The TRAIL Panaji dataset comprises **24+ hand-vetted, foot-verified cultural, gastronomic, and architectural points of interest** across four historical quarters of Panaji, Goa:
1. **Fontainhas (Latin Quarter)**
2. **Altinho (Hilltop & Viewpoints)**
3. **Campal (Heritage Waterfront & Promenade)**
4. **Miramar (Coastal & River Estuary)**

---

## 2. Primary Public & Survey Sources
1. **OpenStreetMap Overpass API**:
   - Geodetic datum: WGS 84
   - Bounding Box: Lat `15.4800° N` to `15.5100° N`, Lng `73.8100° E` to `73.8400° E`.
   - Used for raw geometry, pedestrian pathways, steps, and road classifications.
2. **Goa Tourism Heritage Survey (2024)**:
   - Cultural significance ratings for Grade I and Grade II heritage structures.
   - Historical background on Portuguese colonial architecture, azulejo tiles, and chapel lanes.
3. **TRAIL Team On-Foot Field Reconnaissance (October 2026)**:
   - Physical verification of venue operating status.
   - Realistic pedestrian transit cadence measurement (~3.2 km/h average, accounting for laterite steps and narrow alleys).
   - Dwell times (e.g., 30–45 mins for coffee roasteries, 15–20 mins for viewpoints and street art murals).
4. **Google Maps Place API**:
   - Used exclusively for cross-referencing business hours, seasonal holiday closures, and address verification.

---

## 3. Sample Dataset Catalog

| ID | Spot Name | Quarter | Category | Best Time | Dwell |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `spot-cafe-bodega` | Café Bodega / Sunlit Atrium | Altinho | Coffee / Courtyard | Morning, Afternoon | 45 min |
| `spot-singbals` | Singbal's Book House | Church Square | Books / History | Morning, Evening | 25 min |
| `spot-rua-31` | Rua 31 de Janeiro Arcade | Fontainhas | Heritage / Murals | Golden Hour | 30 min |
| `spot-gitanjali` | Gitanjali Gallery | Fontainhas | Art / Print Studio | Afternoon | 35 min |
| `spot-kala-academy`| Kala Academy Art Precinct | Campal | Architecture / View | Sunset | 50 min |
| `spot-altinho-view` | Altinho Hill Viewpoint | Altinho | Nature / Vista | Sunrise / Sunset | 20 min |
| `spot-marcou-artes` | Marcou Art Center | Fontainhas | Artisan Ceramic | Afternoon | 25 min |
| `spot-confeitaria` | Confeitaria 31 de Janeiro | Fontainhas | Traditional Bakery | Early Morning | 20 min |

---

## 4. Licensing & Ethics
- All geographic coordinate data conforms to the Open Database License (ODbL).
- Zero personally identifiable information (PII) is gathered or retained.
- Pure venue-level public information with original editorial curator commentary.
