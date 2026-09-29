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

---

## Design System Tokens (Temporary Placeholders)

- **Primary:** `#183D2B` (Deep forest green)
- **Secondary:** `#4E6B48` (Sage green)
- **Accent:** `#E36A2E` (Warm terracotta/orange)
- **Neutral:** `#F3F1E9` (Off-white/parchment)

---

## Getting Started

1. **Navigate to the frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Verify production build:**
   ```bash
   npm run build
   ```
