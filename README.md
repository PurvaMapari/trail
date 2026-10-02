# TRAIL

> *"Don't just get there. Discover along the way."*

TRAIL is an exploration and discovery platform focused on the journey rather than simply reaching a destination. It helps users discover connected experiences—such as specialty cafés, independent bookstores, street art, cultural spaces, nature spots, and hidden local gems—through curated trails.

---

## Repository Structure

```text
Trail/
├── README.md                  # Project overview and documentation
├── .gitignore                 # Root gitignore
├── .env.local.example         # Root environment template
└── frontend/                  # Next.js frontend application
    ├── app/
    │   ├── layout.tsx         # Root layout with brand tokens, Navbar, and Footer
    │   ├── page.tsx           # Landing page (/)
    │   ├── globals.css        # Tailwind & brand color/typography design tokens
    │   ├── explore/
    │   │   └── page.tsx       # Explore trails route (/explore)
    │   ├── trails/
    │   │   └── [id]/
    │   │       └── page.tsx   # Trail details route (/trails/[id])
    │   ├── active-trail/
    │   │   └── page.tsx       # Active trail experience route (/active-trail)
    │   ├── create-trail/
    │   │   └── page.tsx       # Create trail route (/create-trail)
    │   └── ai-discovery/
    │       └── page.tsx       # AI-powered trail discovery route (/ai-discovery)
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx     # Global top navigation
    │   │   └── Footer.tsx     # Global footer
    │   ├── ui/
    │   │   ├── Button.tsx     # Reusable button with brand variants
    │   │   ├── Input.tsx      # Reusable text input
    │   │   ├── SearchBar.tsx  # Reusable search bar
    │   │   ├── CategoryChip.tsx # Category filter chip
    │   │   └── Modal.tsx      # Accessible modal dialog
    │   ├── trails/
    │   │   ├── TrailCard.tsx  # Trail card preview
    │   │   ├── TrailMeta.tsx  # Distance, duration, stops metadata
    │   │   ├── TrailStop.tsx  # Single stop preview
    │   │   ├── TrailRoute.tsx # Sequenced list of trail stops
    │   │   └── TrailProgress.tsx # Active trail progress bar
    │   └── sections/
    │       ├── Hero.tsx       # Landing hero section
    │       ├── ProblemSection.tsx # The problem with point-to-point maps
    │       ├── SolutionSection.tsx # How TRAIL solves exploration
    │       ├── FeaturesSection.tsx # Core platform capabilities
    │       ├── ProductPreview.tsx # Product experience preview
    │       ├── AIPreview.tsx  # AI discovery spotlight
    │       ├── SocialProof.tsx # Testimonials from wanderers
    │       ├── WaitlistSection.tsx # Early community waitlist form
    │       └── FinalCTA.tsx   # Final call to action
    │
    ├── data/
    │   ├── trails.ts          # Curated mock trails data
    │   ├── categories.ts      # Trail category definitions & icons
    │   └── testimonials.ts    # Community feedback & quotes
    │
    ├── lib/
    │   ├── utils.ts           # Helper utilities (formatters, classnames)
    │   └── api.ts             # Centralized API service layer (mock & remote)
    │
    ├── types/
    │   ├── trail.ts           # Core Trail and Stop TypeScript interfaces
    │   └── ai.ts              # AI discovery request/response types
    │
    ├── public/
    │   ├── images/            # Image assets
    │   ├── icons/             # Custom vector icons
    │   └── logo/              # Brand logos
    │
    ├── .env.local.example
    ├── .gitignore
    ├── package.json
    ├── tsconfig.json
    ├── next.config.ts
    ├── postcss.config.mjs
    └── eslint.config.mjs
```

---

## Routes

| Route | Description |
|---|---|
| `/` | Landing page placeholder |
| `/explore` | Explore curated trails |
| `/trails/[id]` | Trail details & stops breakdown |
| `/active-trail` | Live trail guidance experience |
| `/create-trail` | Trail curation & creation workflow |
| `/ai-discovery` | AI-assisted trail discovery |
| `/wireframes` | Interactive UI/UX Wireframe Blueprints (TRAIL & WealthNest) |

---

## Design System Tokens (Temporary Placeholders)

- **Primary:** `#183D2B` (Deep forest green)
- **Secondary:** `#4E6B48` (Sage green)
- **Accent:** `#E36A2E` (Warm terracotta/orange)
- **Neutral:** `#F3F1E9` (Off-white/parchment)

---

---

## AI Agent: TRAIL Scout (Powered by Google Gemini 1.5 Pro)

TRAIL features an intelligent exploration companion, **TRAIL Scout**, calibrated with deep local knowledge of Panaji, Goa (Fontainhas Latin quarter, Altinho hills, Mandovi riverfront, Campal, and Miramar).

### Capabilities
- **Flagship Reasoning Model**: Uses `gemini-1.5-pro` by default for deep multi-turn contextual reasoning, pedestrian pacing, and sensory ambience matching.
- **Model Switching**: Easily switch between **Gemini 1.5 Pro** (deepest insights), **Gemini 2.0 Flash** (next-gen speed), and **Gemini 1.5 Flash** (lightweight).
- **Multi-Tier Resiliency Waterfall**: If a requested model encounters quota limits or transient issues, it automatically degrades smoothly through alternative Gemini models before gracefully engaging the built-in offline local knowledge base.
- **Zero-Setup Offline Fallback**: Even without an API key or external internet connection, the system functions 100% reliably using the curated Panaji knowledge base.
- **Direct Route Integration**: Users can add recommended spots directly to their active itinerary in one click.

---

## Running on Another Laptop After Git Push

When you push this repository to GitHub and someone else clones it, they can get started in seconds without needing to touch private secrets or break anything.

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd trail
```

### 2. Install dependencies
```bash
# In root directory:
npm run install:all

# Or separately:
cd backend && npm install
cd ../frontend && npm install
```

### 3. Run the development servers
In terminal 1 (Backend - Port 4000):
```bash
npm run dev:backend
```

In terminal 2 (Frontend - Port 3000):
```bash
npm run dev:frontend
```

Open your browser to: **http://localhost:3000**

---

## Configuring the Gemini API Key

You have **two seamless options** for configuring your Google Gemini API key:

### Option A: Directly in the Web UI (Zero Config / Recommended for teammates)
1. Open the website at `http://localhost:3000`.
2. Click the floating **TRAIL Scout** button in the bottom-right corner.
3. Click the **⚙️ Settings** icon in the chat header.
4. Paste your free Gemini API key (get one in 30 seconds at [Google AI Studio](https://aistudio.google.com/app/apikey)).
5. Select your desired model (**Gemini 1.5 Pro** recommended) and click **Save & Apply**.
> *🔒 **Git-safe**: Your key is stored in your browser's local storage and is never committed to Git.*

### Option B: Via `.env` on the backend (For developers/servers)
1. Create `backend/.env` from the template:
   ```bash
   cp backend/.env.example backend/.env
   ```
2. Open `backend/.env` and add:
   ```env
   PORT=4000
   FRONTEND_URL=http://localhost:3000
   GEMINI_MODEL=gemini-1.5-pro
   GEMINI_API_KEY=AIzaSy...your_key_here
   ```
3. Restart the backend server. The backend will automatically log:
   `✦ AI Engine: ✅ Gemini Active (gemini-1.5-pro)`

---

## Production Build Verification

```bash
# Verify backend
npm run build:backend

# Verify frontend
npm run build:frontend
```
