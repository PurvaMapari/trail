'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Layers,
  Compass,
  FileText,
  Sliders,
  Sparkles,
  MapPin,
  Clock,
  ArrowRight,
  Shield,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Lock,
  ArrowLeft,
  Maximize2
} from 'lucide-react';

export default function WireframesPage() {
  const [selectedScreenIndex, setSelectedScreenIndex] = useState(0);

  const trailScreens = [
    {
      id: 'landing',
      name: '01. Landing Page',
      route: '/',
      description: 'Marketing hero, interactive traverse map preview, problem/solution metrics, and protocol overview.',
      type: 'Core Public',
      blueprint: (
        <div className="space-y-4">
          <div className="border border-dashed border-gray-400 p-3 rounded-lg bg-gray-50 flex items-center justify-between text-xs font-mono text-gray-600">
            <span>[NAVBAR: LOGO + EXPLORE + CREATE + AI DISCOVERY + START A TRAIL]</span>
            <span>DESKTOP STICKY</span>
          </div>

          <div className="border border-dashed border-gray-400 p-4 rounded-lg bg-gray-50 space-y-2">
            <span className="inline-block px-2 py-0.5 rounded bg-gray-200 text-[10px] font-mono">[PILL: TRAVERSE EDITION 01]</span>
            <div className="h-6 w-3/4 bg-gray-300 rounded" />
            <div className="h-4 w-1/2 bg-gray-200 rounded" />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-3">
              <div className="md:col-span-8 h-48 border border-dashed border-gray-400 rounded-lg bg-white flex flex-col items-center justify-center text-xs font-mono text-gray-500">
                <Compass className="w-8 h-8 text-gray-400 mb-1" />
                <span>[INTERACTIVE TOPO MAP CANVAS: 4 STATIONS + CONTOURS]</span>
                <span className="text-[10px] text-gray-400">Scale 1:25,000 · Bearing 342°</span>
              </div>
              <div className="md:col-span-4 h-48 border border-dashed border-gray-400 rounded-lg bg-white p-3 flex flex-col justify-between text-xs font-mono text-gray-500">
                <span>[WAYPOINT FIELD NOTE BOX]</span>
                <p className="text-[11px] text-gray-400">"Oak & Ember Roasters: Restored 1912 dry-goods warehouse..."</p>
                <div className="pt-2 border-t border-gray-200 text-[10px]">12.4 KM · 3H 45M · +240M</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="border border-dashed border-gray-400 p-3 rounded-lg bg-gray-50 text-center text-xs font-mono text-gray-600">
              [01. PROBLEM METRICS]
            </div>
            <div className="border border-dashed border-gray-400 p-3 rounded-lg bg-gray-50 text-center text-xs font-mono text-gray-600">
              [02. FEATURES & SOUL]
            </div>
            <div className="border border-dashed border-gray-400 p-3 rounded-lg bg-gray-50 text-center text-xs font-mono text-gray-600">
              [03. 4-STEP PROTOCOL]
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'explore',
      name: '02. Explore Catalog',
      route: '/explore',
      description: 'Search input with quick key (⌘K), multi-category chips, duration/radius filters, featured card & catalog grid.',
      type: 'Core Discovery',
      blueprint: (
        <div className="space-y-4">
          <div className="border border-dashed border-gray-400 p-4 rounded-lg bg-gray-50 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-gray-600">
              <span className="font-bold">PANAJI · 24 TRAILS NEARBY</span>
              <span>GPS LOCKED: 15°29&apos;N 73°49&apos;E</span>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 h-10 border border-gray-300 rounded-lg bg-white px-3 flex items-center justify-between text-xs font-mono text-gray-400">
                <span>What do you want to discover?</span>
                <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">⌘ K</span>
              </div>
              <div className="w-24 h-10 border border-gray-300 rounded-lg bg-white flex items-center justify-center text-xs font-mono text-gray-600">
                PANAJI
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] font-mono">
              <span className="bg-gray-800 text-white px-2.5 py-1 rounded">ALL</span>
              <span className="bg-white border border-gray-300 px-2.5 py-1 rounded text-gray-600">FOOD</span>
              <span className="bg-white border border-gray-300 px-2.5 py-1 rounded text-gray-600">ART</span>
              <span className="bg-white border border-gray-300 px-2.5 py-1 rounded text-gray-600">CULTURE</span>
              <span className="bg-white border border-gray-300 px-2.5 py-1 rounded text-gray-600">NATURE</span>
              <span className="bg-white border border-gray-300 px-2.5 py-1 rounded text-gray-600">HIDDEN GEMS</span>
            </div>
          </div>

          <div className="border border-dashed border-gray-400 p-4 rounded-lg bg-white grid grid-cols-1 md:grid-cols-12 gap-3 text-xs font-mono text-gray-600">
            <div className="md:col-span-7 space-y-2">
              <span className="px-2 py-0.5 rounded bg-gray-200 text-[10px]">FEATURED TRAIL</span>
              <h4 className="font-bold text-sm">HIDDEN CAFES &amp; SECRET COURTYARDS</h4>
              <p className="text-[11px] text-gray-500">04 STOPS · 3.2 KM · 2.5 HOURS</p>
            </div>
            <div className="md:col-span-5 h-24 bg-gray-100 border border-gray-200 rounded flex items-center justify-center text-gray-400">
              [COVER PHOTO PLACEHOLDER]
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="border border-dashed border-gray-400 p-3 rounded-lg bg-white space-y-2 text-xs font-mono">
                <div className="h-20 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-[10px]">[IMAGE]</div>
                <div className="h-3 w-3/4 bg-gray-300 rounded" />
                <div className="h-2.5 w-1/2 bg-gray-200 rounded" />
                <div className="h-6 border border-gray-300 rounded text-center leading-6 text-[10px] text-gray-600">[VIEW TRAIL]</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'dossier',
      name: '03. Trail Dossier',
      route: '/trails/[id]',
      description: 'Comprehensive trail details: 5-column metrics matrix, interactive station sequence, photo plates & action bar.',
      type: 'Core Evaluation',
      blueprint: (
        <div className="space-y-4">
          <div className="border border-dashed border-gray-400 p-2.5 rounded bg-gray-50 flex items-center justify-between text-xs font-mono text-gray-600">
            <span>&larr; BACK TO EXPLORE / PANAJI · TRAVERSE #01</span>
            <span className="px-2 py-0.5 bg-gray-200 rounded text-[10px]">SECTOR VERIFIED</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-8 border border-dashed border-gray-400 p-4 rounded-lg bg-white space-y-3">
              <span className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-[10px] font-mono">TRAVERSE DOSSIER // INDEX: GOA-PNJ-01</span>
              <div className="h-6 w-3/4 bg-gray-300 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
              <div className="grid grid-cols-5 gap-2 border-y border-gray-200 py-2 text-center text-[10px] font-mono">
                <div>STOPS<br /><b>04</b></div>
                <div>DIST<br /><b>3.2 KM</b></div>
                <div>TIME<br /><b>2.5 H</b></div>
                <div>ELEV<br /><b>+14M</b></div>
                <div>DIFFICULTY<br /><b>EASY</b></div>
              </div>
              <div className="h-40 bg-gray-100 border border-gray-200 rounded flex items-center justify-center text-xs font-mono text-gray-400">
                [HIGH RESOLUTION PLATE CAPTURE]
              </div>
            </div>

            <div className="md:col-span-4 border border-dashed border-gray-400 p-4 rounded-lg bg-gray-50 flex flex-col justify-between space-y-3 text-xs font-mono">
              <div>
                <span className="font-bold block mb-2">FIELD ACTIONS</span>
                <div className="h-9 bg-gray-800 text-white rounded flex items-center justify-center font-bold text-xs">[START TRAIL]</div>
                <div className="h-8 border border-gray-300 bg-white rounded flex items-center justify-center text-xs mt-2 text-gray-600">[SAVE TO LOGBOOK]</div>
                <div className="h-8 border border-gray-300 bg-white rounded flex items-center justify-center text-xs mt-2 text-gray-600">[OFFLINE PACK]</div>
              </div>
              <div className="p-2 border border-gray-300 rounded bg-white text-[10px] text-gray-500">
                WEATHER: 28°C CLEAR<br />TERRAIN: BASALT COBBLE
              </div>
            </div>
          </div>

          <div className="border border-dashed border-gray-400 p-3 rounded-lg bg-white space-y-2 text-xs font-mono">
            <span className="font-bold">STATION ITINERARY BREAKDOWN</span>
            <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
              <div className="p-1.5 bg-gray-800 text-white rounded">STATION 01</div>
              <div className="p-1.5 border border-gray-300 rounded text-gray-600">STATION 02</div>
              <div className="p-1.5 border border-gray-300 rounded text-gray-600">STATION 03</div>
              <div className="p-1.5 border border-gray-300 rounded text-gray-600">STATION 04</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'active',
      name: '04. Active Trail Guidance',
      route: '/active-trail',
      description: 'Live field guidance: horizontal progression ledger, real-time SVG vector corridor map, next station card & stamping.',
      type: 'Core Execution',
      blueprint: (
        <div className="space-y-4">
          <div className="border border-dashed border-gray-400 p-2.5 rounded bg-gray-800 text-white flex items-center justify-between text-xs font-mono">
            <span>&larr; EXIT · STATION 02 OF 04 · IN PROGRESS</span>
            <span>ELAPSED: 23:40</span>
          </div>

          <div className="border border-dashed border-gray-400 p-3 rounded-lg bg-white text-xs font-mono space-y-2">
            <div className="flex justify-between text-[10px] text-gray-500">
              <span>TRAIL PROGRESSION LEDGER</span>
              <span>COMPLETED: 0.4 KM · REMAINING: 2.8 KM</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <div className="w-6 h-6 rounded-full bg-gray-800 text-white text-[10px] flex items-center justify-center font-bold">✓</div>
              <div className="flex-1 h-0.5 bg-gray-800" />
              <div className="w-6 h-6 rounded-full bg-gray-800 text-white text-[10px] flex items-center justify-center font-bold ring-2 ring-gray-400">02</div>
              <div className="flex-1 h-0.5 bg-gray-300" />
              <div className="w-6 h-6 rounded-full border border-gray-300 text-[10px] flex items-center justify-center text-gray-400">03</div>
              <div className="flex-1 h-0.5 bg-gray-300" />
              <div className="w-6 h-6 rounded-full border border-gray-300 text-[10px] flex items-center justify-center text-gray-400">04</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-7 h-44 border border-dashed border-gray-400 rounded-lg bg-gray-50 p-3 flex flex-col justify-between text-xs font-mono">
              <div className="flex justify-between text-[10px] text-gray-600">
                <span>CARTOGRAPHIC TOPOGRAPHY // CORRIDOR</span>
                <span>BEARING 310° NW</span>
              </div>
              <div className="flex-1 flex items-center justify-center text-gray-400 text-xs">
                [SVG DYNAMIC CORRIDOR VECTOR CANVAS]
              </div>
              <span className="text-[10px] text-gray-500">SURFACE: HERITAGE COBBLESTONE · GRADIENT +12M</span>
            </div>

            <div className="md:col-span-5 border border-dashed border-gray-400 rounded-lg bg-white p-3 space-y-2 text-xs font-mono flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-gray-400">STATION 02 // CURRENT WAYPOINT</span>
                <h5 className="font-bold text-sm">Singbal&apos;s Book House</h5>
                <p className="text-[10px] text-gray-500 mt-1">&quot;Ask for rare maritime charts stored in high mezzanine.&quot;</p>
              </div>
              <div className="space-y-1.5 pt-2 border-t border-gray-200">
                <div className="h-7 bg-gray-800 text-white rounded text-[10px] flex items-center justify-center font-bold">[STAMP WAYPOINT VISITED]</div>
                <div className="h-7 border border-gray-300 rounded text-[10px] flex items-center justify-center text-gray-600">[LOG FIELD NOTE]</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'ai-discovery',
      name: '05. AI Discovery Engine',
      route: '/ai-discovery',
      description: 'Heuristic natural language prompt input, parameter calibration card, and synthesized dossier output.',
      type: 'Core Intelligence',
      blueprint: (
        <div className="space-y-4">
          <div className="border border-dashed border-gray-400 p-3 rounded-lg bg-white space-y-2 text-xs font-mono">
            <span className="text-[10px] font-bold text-gray-500">01 // NATURAL LANGUAGE EXPEDITION INTENT</span>
            <div className="h-14 border border-gray-300 rounded p-2 text-gray-500 text-[11px]">
              &quot;I have 2 hours, want good coffee, some art and somewhere quiet.&quot;
            </div>
            <div className="flex gap-1.5 text-[9px]">
              <span className="px-2 py-0.5 bg-gray-100 border border-gray-200 rounded">☕ Morning espresso &amp; bookshop</span>
              <span className="px-2 py-0.5 bg-gray-100 border border-gray-200 rounded">🎨 Local murals &amp; river sunset</span>
            </div>
          </div>

          <div className="border border-dashed border-gray-400 p-3 rounded-lg bg-gray-50 space-y-2 text-xs font-mono">
            <span className="text-[10px] font-bold text-gray-500">02 // CALIBRATION &amp; PARAMETERS</span>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div>LOCUS: <b>Panaji, Goa</b></div>
              <div>TIME BUDGET: <b>2.0 Hours</b></div>
              <div>RADIUS: <b>5.0 KM</b></div>
              <div>THEMES: <b>Coffee, Art, Quiet</b></div>
            </div>
            <div className="h-7 bg-gray-800 text-white rounded text-center leading-7 font-bold text-[10px]">
              [SYNTHESIZE EXPEDITION DOSSIER]
            </div>
          </div>

          <div className="border border-dashed border-gray-400 p-3 rounded-lg bg-white space-y-2 text-xs font-mono">
            <div className="flex justify-between text-[10px]">
              <span className="font-bold">SYNTHESIZED TRAVERSE DOSSIER</span>
              <span className="text-gray-400">LATENCY: 420MS</span>
            </div>
            <h5 className="font-bold">Panaji Heritage Atelier &amp; Espresso Traverse</h5>
            <p className="text-[10px] text-gray-500">4 STOPS · 3.5 KM · 2.1 HOURS · +18M ELEVATION</p>
            <div className="h-7 bg-gray-800 text-white rounded text-center leading-7 text-[10px] font-bold">
              [BEGIN ACTIVE TRAIL &rarr;]
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'create-trail',
      name: '06. Trail Creator',
      route: '/create-trail',
      description: 'Two-column builder: form parameters on left, drag-and-drop waypoint sequence on right with add waypoint modal.',
      type: 'Core Authoring',
      blueprint: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs font-mono">
            <div className="md:col-span-5 border border-dashed border-gray-400 p-3 rounded-lg bg-white space-y-2">
              <span className="font-bold text-[10px]">FORM SPECIFICATIONS</span>
              <div className="h-6 border border-gray-200 rounded px-2 text-[10px] text-gray-500 flex items-center">Start: Panaji Fountain</div>
              <div className="h-6 border border-gray-200 rounded px-2 text-[10px] text-gray-500 flex items-center">Coordinates: 15°29&apos;N 73°49&apos;E</div>
              <div className="h-6 border border-gray-200 rounded px-2 text-[10px] text-gray-500 flex items-center">Title: My Custom Route</div>
              <div className="h-10 border border-gray-200 rounded px-2 text-[10px] text-gray-500 flex items-center">Description...</div>
            </div>

            <div className="md:col-span-7 border border-dashed border-gray-400 p-3 rounded-lg bg-gray-50 space-y-2">
              <div className="flex justify-between font-bold text-[10px]">
                <span>WAYPOINT SEQUENCE (3 STOPS)</span>
                <span>3.5 KM · 2.0 H</span>
              </div>
              <div className="p-2 border border-gray-200 rounded bg-white text-[10px]">1. Café Bodega (0.4 km · 30 min)</div>
              <div className="p-2 border border-gray-200 rounded bg-white text-[10px]">2. Singbal&apos;s Book House (1.2 km · 25 min)</div>
              <div className="p-2 border border-gray-200 rounded bg-white text-[10px]">3. Fresco Corridor (2.0 km · 20 min)</div>
              <div className="h-6 border border-dashed border-gray-300 rounded text-center leading-6 text-[10px] text-gray-500">
                + ADD WAYPOINT MODAL
              </div>
            </div>
          </div>

          <div className="border border-dashed border-gray-400 p-2.5 rounded-lg bg-white flex justify-end gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 border border-gray-300 rounded text-gray-600">[PREVIEW]</span>
            <span className="px-3 py-1.5 bg-gray-800 text-white rounded font-bold">[PUBLISH TO DIRECTORY]</span>
          </div>
        </div>
      ),
    },
    {
      id: 'login',
      name: '07. User Login & Auth',
      route: '/login',
      description: 'Centered authentication card with email/password, social OAuth triggers, and return-to-trail redirect.',
      type: 'New / Extended',
      blueprint: (
        <div className="max-w-md mx-auto border border-dashed border-gray-400 p-6 rounded-xl bg-white space-y-4 text-xs font-mono text-center">
          <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-300 mx-auto flex items-center justify-center">
            <Lock className="w-5 h-5 text-gray-500" />
          </div>
          <div>
            <h4 className="font-bold text-sm">EXPLORER IDENTIFICATION</h4>
            <span className="text-[10px] text-gray-400">Sign in to sync your passport stamps &amp; custom trails</span>
          </div>
          <div className="space-y-2 text-left">
            <div>
              <span className="text-[10px] text-gray-500">EMAIL ADDRESS</span>
              <div className="h-8 border border-gray-300 rounded px-2 flex items-center text-gray-400 text-xs">explorer@trail.co</div>
            </div>
            <div>
              <span className="text-[10px] text-gray-500">PASSWORD</span>
              <div className="h-8 border border-gray-300 rounded px-2 flex items-center text-gray-400 text-xs">••••••••••••</div>
            </div>
          </div>
          <div className="h-8 bg-gray-800 text-white rounded flex items-center justify-center font-bold text-xs">[SIGN IN TO LOGBOOK]</div>
          <div className="h-8 border border-gray-300 rounded flex items-center justify-center text-gray-600 text-xs">[CONTINUE WITH GOOGLE]</div>
        </div>
      ),
    },
    {
      id: 'onboarding',
      name: '08. User Onboarding Flow',
      route: '/onboarding',
      description: '3-step preference setup: sensory landmark themes selector, walking cadence speed slider, and home geography locus.',
      type: 'New / Extended',
      blueprint: (
        <div className="border border-dashed border-gray-400 p-5 rounded-xl bg-white space-y-4 text-xs font-mono">
          <div className="flex justify-between items-center pb-2 border-b border-gray-200">
            <span className="font-bold">STEP 1 OF 3: SELECT AMBIENT INTERESTS</span>
            <span className="text-[10px] text-gray-400">60 SECONDS</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
            <div className="p-3 border border-gray-800 bg-gray-800 text-white rounded">☕ COFFEE ROASTS</div>
            <div className="p-3 border border-gray-300 rounded text-gray-600">📖 RARE BOOKS</div>
            <div className="p-3 border border-gray-800 bg-gray-800 text-white rounded">🌿 SECRET GARDENS</div>
            <div className="p-3 border border-gray-300 rounded text-gray-600">🎨 STREET ART</div>
            <div className="p-3 border border-gray-800 bg-gray-800 text-white rounded">🔭 VIEWPOINTS</div>
            <div className="p-3 border border-gray-300 rounded text-gray-600">🏺 ARTISAN CRAFT</div>
          </div>
          <div className="p-3 bg-gray-50 border border-gray-200 rounded space-y-1">
            <span className="text-[10px] font-bold">STEP 2: WALKING CADENCE SLIDER</span>
            <div className="h-2 bg-gray-200 rounded-full relative">
              <div className="w-4 h-4 bg-gray-800 rounded-full absolute -top-1 left-1/3" />
            </div>
            <div className="flex justify-between text-[9px] text-gray-400">
              <span>UNHURRIED STROLL (2.5 KM/H)</span>
              <span>BRISK HIKE (5 KM/H)</span>
            </div>
          </div>
          <div className="h-8 bg-gray-800 text-white rounded flex items-center justify-center font-bold text-xs">[COMPLETE PROFILE &amp; ENTER APP &rarr;]</div>
        </div>
      ),
    },
    {
      id: 'dashboard',
      name: '09. Explorer Dashboard',
      route: '/dashboard',
      description: 'Personalized user hub: stats metrics (trails, stamps, km), saved trails list, recent stamps, and logged field notes.',
      type: 'New / Extended',
      blueprint: (
        <div className="space-y-4 text-xs font-mono">
          <div className="border border-dashed border-gray-400 p-3 rounded-lg bg-gray-50 flex justify-between items-center">
            <div>
              <h4 className="font-bold">EXPLORER LOGBOOK // PURVA MAPARI</h4>
              <span className="text-[10px] text-gray-500">ID: PANAJI-WANDERER-084</span>
            </div>
            <div className="flex gap-2 text-center text-[10px]">
              <div className="px-2 py-1 bg-white border border-gray-300 rounded"><b>8</b> TRAILS</div>
              <div className="px-2 py-1 bg-white border border-gray-300 rounded"><b>32</b> STAMPS</div>
              <div className="px-2 py-1 bg-white border border-gray-300 rounded"><b>28.4</b> KM</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-7 border border-dashed border-gray-400 p-3 rounded-lg bg-white space-y-2">
              <span className="font-bold text-[10px]">SAVED TRAILS IN YOUR PACK (3)</span>
              <div className="p-2 border border-gray-200 rounded flex justify-between items-center">
                <span>Hidden Cafes of Fontainhas</span>
                <span className="px-2 py-0.5 bg-gray-800 text-white rounded text-[9px]">[RESUME]</span>
              </div>
              <div className="p-2 border border-gray-200 rounded flex justify-between items-center">
                <span>Altinho Architectural Ridge</span>
                <span className="px-2 py-0.5 border border-gray-300 rounded text-[9px]">[START]</span>
              </div>
            </div>

            <div className="md:col-span-5 border border-dashed border-gray-400 p-3 rounded-lg bg-white space-y-2">
              <span className="font-bold text-[10px]">RECENT PASSPORT STAMPS</span>
              <div className="text-[10px] space-y-1 text-gray-600">
                <div>✓ Café Bodega (Oct 1)</div>
                <div>✓ Singbal&apos;s Books (Oct 1)</div>
                <div>✓ Gallery Gitanjali (Sep 28)</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'profile',
      name: '10. Profile & Settings',
      route: '/profile',
      description: 'Account settings: metric/imperial telemetry units, high-contrast glare mode toggle, and Gemini API key management.',
      type: 'New / Extended',
      blueprint: (
        <div className="max-w-xl mx-auto border border-dashed border-gray-400 p-5 rounded-xl bg-white space-y-4 text-xs font-mono">
          <div className="pb-2 border-b border-gray-200">
            <h4 className="font-bold">CARTOGRAPHIC PROFILE &amp; SETTINGS</h4>
            <span className="text-[10px] text-gray-400">Explorer credentials and geodetic telemetry</span>
          </div>
          <div className="space-y-3">
            <div>
              <span className="text-[10px] text-gray-500">DISPLAY NAME</span>
              <div className="h-7 border border-gray-300 rounded px-2 flex items-center">Purva Mapari</div>
            </div>
            <div>
              <span className="text-[10px] text-gray-500">TELEMETRY UNITS</span>
              <div className="flex gap-2 pt-1">
                <span className="px-2 py-1 bg-gray-800 text-white rounded text-[10px]">METRIC (KM / M)</span>
                <span className="px-2 py-1 border border-gray-300 rounded text-[10px] text-gray-600">IMPERIAL (MI / FT)</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] text-gray-500">GEMINI API KEY</span>
              <div className="h-7 border border-gray-300 rounded px-2 flex items-center text-gray-400">AIzaSy••••••••••••••••••••••••••••••••</div>
            </div>
          </div>
          <div className="h-8 bg-gray-800 text-white rounded flex items-center justify-center font-bold text-xs">[SAVE PREFERENCES]</div>
        </div>
      ),
    },
  ];

  /*
  const wealthnestScreensToRemove = [
    {
      id: 'wn-onboarding',
      name: 'W-01. Value-First Onboarding',
      route: '/onboarding',
      description: 'Interactive financial goal setting, monthly surplus deployment slider, and scenario risk calibration before KYC.',
      type: 'Onboarding & Goals',
      blueprint: (
        <div className="space-y-4 text-xs font-mono">
          <div className="border border-dashed border-gray-400 p-3 rounded-lg bg-gray-50 flex justify-between items-center">
            <span className="font-bold text-gray-800">WealthNest // STEP 2 OF 3</span>
            <span className="text-[10px] text-gray-500">AUTO-SAVED · 256-BIT ENCRYPTED</span>
          </div>

          <div className="border border-dashed border-gray-400 p-4 rounded-lg bg-white space-y-3">
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="w-2/3 h-full bg-emerald-800 rounded-full" />
            </div>
            <h4 className="font-bold text-sm text-gray-800">DEFINE YOUR FINANCIAL FREEDOM PROFILE</h4>
            <span className="text-[10px] text-gray-500 block">We calibrate your asset allocation and tax shield before asking for KYC.</span>

            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-bold text-gray-600">1. PRIMARY OBJECTIVE</span>
              <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                <div className="p-2 border border-emerald-800 bg-emerald-800 text-white rounded text-center">WEALTH COMPOUNDING</div>
                <div className="p-2 border border-gray-300 rounded text-center text-gray-600">EARLY RETIREMENT</div>
                <div className="p-2 border border-gray-300 rounded text-center text-gray-600">TAX OPTIMIZATION</div>
              </div>
            </div>

            <div className="space-y-1 pt-1">
              <span className="text-[10px] font-bold text-gray-600">2. MONTHLY SURPLUS DEPLOYMENT: ₹50,000</span>
              <div className="h-2 bg-gray-200 rounded-full relative">
                <div className="w-4 h-4 bg-emerald-800 rounded-full absolute -top-1 left-1/2" />
              </div>
              <div className="flex justify-between text-[9px] text-gray-400">
                <span>₹5,000/mo</span>
                <span>₹5,00,000/mo</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded space-y-1">
              <span className="text-[10px] font-bold text-emerald-900">SIMULATED 10-YEAR PROJECTION PREVIEW</span>
              <div className="flex justify-between text-[11px] text-emerald-800 font-bold">
                <span>Invested: ₹60,00,000</span>
                <span>Projected (@12%): ₹1,16,16,954</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="px-3 py-1.5 border border-gray-300 rounded text-gray-600">&larr; BACK</span>
            <span className="px-4 py-1.5 bg-emerald-800 text-white rounded font-bold">LOCK TARGET &amp; CONTINUE &rarr;</span>
          </div>
        </div>
      ),
    },
    {
      id: 'wn-investments',
      name: 'W-02. Investments & Net Worth',
      route: '/investments',
      description: 'Total net worth hero anchor, interactive asset allocation donut, P&L benchmarks, and holdings directory.',
      type: 'Wealth Engine',
      blueprint: (
        <div className="space-y-4 text-xs font-mono">
          <div className="border border-dashed border-gray-400 p-4 rounded-lg bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <div>
              <span className="text-[10px] text-gray-400 font-bold">TOTAL PORTFOLIO NET WORTH</span>
              <h3 className="text-xl font-bold text-gray-800">₹ 48,25,400.00</h3>
              <span className="text-[10px] text-emerald-700 font-bold">+ ₹ 34,200.00 (+0.71%) TODAY · XIRR: 15.4%</span>
            </div>
            <div className="p-2 border border-amber-300 bg-amber-50 rounded text-[10px] text-amber-900">
              <b>REBALANCE ALERT:</b> Equity +6.2% over target<br />
              <span className="underline cursor-pointer font-bold">[1-CLICK EXECUTE REBALANCE]</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-6 border border-dashed border-gray-400 p-3 rounded-lg bg-gray-50 space-y-2 text-center">
              <span className="text-[10px] font-bold text-gray-600 block text-left">ASSET ALLOCATION MATRIX</span>
              <div className="h-28 flex items-center justify-center text-gray-400">
                [INTERACTIVE DONUT: 64% Eq / 24% Debt / 12% Gold]
              </div>
              <div className="flex justify-center gap-2 text-[9px]">
                <span className="text-emerald-700 font-bold">● Equity ₹30.8L</span>
                <span className="text-blue-700 font-bold">● Debt ₹11.5L</span>
                <span className="text-amber-700 font-bold">● Gold ₹5.2L</span>
              </div>
            </div>

            <div className="md:col-span-6 border border-dashed border-gray-400 p-3 rounded-lg bg-white space-y-2">
              <span className="text-[10px] font-bold text-gray-600">MARKET BENCHMARK COMPARISON</span>
              <div className="space-y-1.5 text-[10px]">
                <div className="flex justify-between p-1 bg-gray-50 rounded">
                  <span>NIFTY 50</span>
                  <span className="text-emerald-700 font-bold">+18.2% (1Y)</span>
                </div>
                <div className="flex justify-between p-1 bg-emerald-50 rounded font-bold">
                  <span>YOUR PORTFOLIO</span>
                  <span className="text-emerald-700">+22.4% (1Y)</span>
                </div>
                <div className="flex justify-between p-1 bg-gray-50 rounded">
                  <span>S&amp;P BSE SENSEX</span>
                  <span className="text-emerald-700 font-bold">+16.9% (1Y)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-dashed border-gray-400 p-3 rounded-lg bg-white space-y-1.5 text-[10px]">
            <div className="flex justify-between font-bold text-gray-600">
              <span>HOLDINGS DIRECTORY</span>
              <span>+ START NEW SIP / LUMPSUM</span>
            </div>
            <div className="p-1.5 border border-gray-200 rounded flex justify-between">
              <span>Parag Parikh Flexi Cap (MF)</span>
              <span>₹11,42,000 (+42.7%)</span>
            </div>
            <div className="p-1.5 border border-gray-200 rounded flex justify-between">
              <span>Sovereign Gold Bonds 2029</span>
              <span>₹5,20,000 (+48.5%)</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'wn-insurance',
      name: 'W-03. Insurance Protection Hub',
      route: '/insurance',
      description: 'Family protection score, coverage gap visualizer, active policy cards, and emergency cashless admission assistant.',
      type: 'Protection & Shield',
      blueprint: (
        <div className="space-y-4 text-xs font-mono">
          <div className="border border-dashed border-gray-400 p-3 rounded-lg bg-white flex justify-between items-center">
            <div>
              <span className="text-[10px] text-gray-400 font-bold">FAMILY PROTECTION SCORE</span>
              <h4 className="text-lg font-bold text-gray-800">82 / 100 · ADEQUATE</h4>
              <span className="text-[10px] text-amber-700">Gap detected: ₹10L Super Top-up Recommended</span>
            </div>
            <div className="flex gap-2 text-center text-[10px]">
              <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-emerald-900">
                LIFE: <b>₹2.0 Cr</b><br />(15x Income)
              </div>
              <div className="p-2 bg-blue-50 border border-blue-200 rounded text-blue-900">
                HEALTH: <b>₹25.0 L</b><br />(Floater)
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="border border-dashed border-gray-400 p-3 rounded-lg bg-white space-y-2 text-[10px]">
              <div className="flex justify-between font-bold">
                <span>HDFC LIFE CLICK 2 PROTECT</span>
                <span className="text-emerald-700">ACTIVE</span>
              </div>
              <div>Sum Insured: <b>₹ 2,00,00,000</b></div>
              <div>Covered: Self (Age 32) · Annual: ₹18,400</div>
              <div className="text-gray-400">Next Renewal: 14 Nov 2026 (43 days left)</div>
              <div className="flex gap-1 pt-1">
                <span className="p-1 border border-gray-300 rounded text-[9px] flex-1 text-center">[VIEW POLICY]</span>
                <span className="p-1 bg-gray-800 text-white rounded text-[9px] flex-1 text-center">[SUBMIT CLAIM]</span>
              </div>
            </div>

            <div className="border border-dashed border-gray-400 p-3 rounded-lg bg-white space-y-2 text-[10px]">
              <div className="flex justify-between font-bold">
                <span>CARE HEALTH OPTIMA RESTORE</span>
                <span className="text-emerald-700">ACTIVE</span>
              </div>
              <div>Sum Insured: <b>₹ 25,00,000</b></div>
              <div>Covered: Self + Spouse + 1 Child · Annual: ₹26,500</div>
              <div className="text-gray-400">Next Renewal: 02 Jan 2027</div>
              <div className="flex gap-1 pt-1">
                <span className="p-1 border border-gray-300 rounded text-[9px] flex-1 text-center">[CASHLESS HOSPITALS]</span>
                <span className="p-1 bg-gray-800 text-white rounded text-[9px] flex-1 text-center">[SUBMIT CLAIM]</span>
              </div>
            </div>
          </div>

          <div className="border border-dashed border-gray-400 p-3 rounded-lg bg-red-50 text-red-950 flex justify-between items-center text-[10px]">
            <div>
              <span className="font-bold block">EMERGENCY CASHLESS HOSPITAL ADMISSION</span>
              <span>Instant pre-authorization assist for network hospitals</span>
            </div>
            <span className="px-3 py-1.5 bg-red-700 text-white rounded font-bold cursor-pointer">[INITIATE 30-MIN ASSIST]</span>
          </div>
        </div>
      ),
    },
    {
      id: 'wn-tax',
      name: 'W-04. Income Tax Optimizer',
      route: '/tax',
      description: 'Old vs. New tax regime comparison calculator, Section 80C/80D deduction fill bars, and advance tax calendar.',
      type: 'Tax Shield',
      blueprint: (
        <div className="space-y-4 text-xs font-mono">
          <div className="border border-dashed border-gray-400 p-3 rounded-lg bg-emerald-50 text-emerald-950 flex justify-between items-center">
            <div>
              <span className="font-bold text-[10px]">RECOMMENDED FILING REGIME</span>
              <h4 className="text-base font-bold">NEW TAX REGIME SAVES YOU ₹ 24,800</h4>
            </div>
            <span className="px-3 py-1 bg-emerald-800 text-white rounded text-[10px] font-bold">[SELECT NEW REGIME]</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-7 border border-dashed border-gray-400 p-3 rounded-lg bg-white space-y-1.5 text-[10px]">
              <span className="font-bold text-gray-700">SIDE-BY-SIDE REGIME COMPARISON</span>
              <div className="grid grid-cols-3 font-bold border-b border-gray-200 pb-1">
                <span>Metric</span>
                <span>Old Regime</span>
                <span className="text-emerald-700">New Regime</span>
              </div>
              <div className="grid grid-cols-3">
                <span>Gross Income</span>
                <span>₹24,00,000</span>
                <span>₹24,00,000</span>
              </div>
              <div className="grid grid-cols-3">
                <span>Deductions</span>
                <span>₹ 3,75,000</span>
                <span>₹   75,000</span>
              </div>
              <div className="grid grid-cols-3 font-bold pt-1 border-t border-gray-200">
                <span>Net Tax Payable</span>
                <span>₹ 4,34,200</span>
                <span className="text-emerald-700">₹ 4,09,400</span>
              </div>
            </div>

            <div className="md:col-span-5 border border-dashed border-gray-400 p-3 rounded-lg bg-gray-50 space-y-2 text-[10px]">
              <span className="font-bold text-gray-700">DEDUCTION TRACKER</span>
              <div>
                <div className="flex justify-between">
                  <span>Sec 80C (PPF/ELSS)</span>
                  <span className="text-emerald-700 font-bold">₹1.50L / ₹1.50L (MAX)</span>
                </div>
                <div className="h-1.5 bg-emerald-700 rounded-full w-full" />
              </div>
              <div>
                <div className="flex justify-between">
                  <span>Sec 80D (Health)</span>
                  <span className="text-amber-700 font-bold">₹18.4K / ₹25.0K</span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full w-full">
                  <div className="w-3/4 h-full bg-amber-600 rounded-full" />
                </div>
                <span className="text-[9px] text-gray-400">Save ₹6,600 more tax</span>
              </div>
            </div>
          </div>

          <div className="border border-dashed border-gray-400 p-2.5 rounded-lg bg-white text-[10px] flex justify-between items-center">
            <span>ADVANCE TAX: Q1 Paid ✓ · Q2 Paid ✓ · Q3 Due Dec 15 (Est: ₹62,000)</span>
            <span className="px-2 py-0.5 border border-gray-300 rounded font-bold">[DOWNLOAD FORM 16 / ITR READY REPORT]</span>
          </div>
        </div>
      ),
    },
    {
      id: 'wn-inheritance',
      name: 'W-05. Inheritance & Estate Vault',
      route: '/inheritance',
      description: 'Nominee percentage allocation with 100% validator slider, digital will generator, and emergency handover protocol.',
      type: 'Estate Handover',
      blueprint: (
        <div className="space-y-4 text-xs font-mono">
          <div className="border border-dashed border-gray-400 p-3 rounded-lg bg-white flex justify-between items-center">
            <div>
              <span className="text-[10px] text-gray-400 font-bold">FAMILY ESTATE &amp; DIGITAL VAULT</span>
              <h4 className="text-base font-bold text-gray-800">VAULT INTEGRITY: 100% BALANCED</h4>
              <span className="text-[10px] text-emerald-700">All registered assets have legally bound nominees designated</span>
            </div>
            <span className="px-3 py-1 bg-gray-800 text-white rounded text-[10px] font-bold">[ATTESTED WILL PREVIEW (PDF)]</span>
          </div>

          <div className="border border-dashed border-gray-400 p-3 rounded-lg bg-gray-50 space-y-3 text-[10px]">
            <div className="flex justify-between font-bold text-gray-700">
              <span>BENEFICIARY ALLOCATION MATRIX (TOTAL: 100%)</span>
              <span className="text-emerald-700">AUTO-BALANCE EQUALLY</span>
            </div>

            <div className="p-2 border border-gray-200 rounded bg-white space-y-1">
              <div className="flex justify-between font-bold">
                <span>1. Ananya Mapari (Spouse) - Primary</span>
                <span>60% (₹ 28,95,240)</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="w-3/5 h-full bg-emerald-800 rounded-full" />
              </div>
              <span className="text-[9px] text-gray-400">Assigned: Demat Stocks, Term Insurance, Primary Flat</span>
            </div>

            <div className="p-2 border border-gray-200 rounded bg-white space-y-1">
              <div className="flex justify-between font-bold">
                <span>2. Kabir Mapari (Son, Minor)</span>
                <span>40% (₹ 19,30,160)</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="w-2/5 h-full bg-emerald-800 rounded-full" />
              </div>
              <span className="text-[9px] text-gray-400">Assigned: Sovereign Gold Bonds, Mutual Funds SIP</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-[10px]">
            <div className="p-2.5 border border-dashed border-gray-400 rounded-lg bg-white">
              <span className="font-bold block">EMERGENCY ACCESS TRIGGER</span>
              <span>180 Days Inactivity &rarr; 2-Tier Witness Decryption</span>
            </div>
            <div className="p-2.5 border border-dashed border-gray-400 rounded-lg bg-white">
              <span className="font-bold block">DIGITAL WILL STATUS</span>
              <span>Draft Verified · 3 Witnesses Signed · Fee Paid</span>
            </div>
          </div>
        </div>
      ),
    },
  ];
  */

  const currentScreens = trailScreens;
  const activeScreen = currentScreens[selectedScreenIndex] || currentScreens[0];

  return (
    <div className="min-h-screen bg-[#F4F2EB] text-[#183D2B] pb-24">
      {/* Top Header */}
      <section className="pt-8 sm:pt-12 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#183D2B]/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7E3D7] text-[10px] font-mono uppercase tracking-wider text-[#183D2B]/80 font-bold mb-2">
              <Layers className="w-3 h-3 text-[#E36A2E]" />
              <span>UI/UX DESIGN ARCHITECTURE · LOW-FIDELITY WIREFRAMES</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#183D2B] tracking-tight uppercase">
              Screen Planning Blueprint.
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#183D2B]/75 font-sans">
              Structural schematics, interaction blueprints, and layout allocations across product ecosystems.
            </p>
          </div>

          <div className="flex items-center px-4 py-2 rounded-xl bg-white border border-[#183D2B]/15 shadow-sm text-xs font-mono font-bold text-[#183D2B]">
            TRAIL System (10 Verified Screens)
          </div>
        </div>

        {/* Documentation Links Ribbon */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-mono text-[#183D2B]/80">
          <span className="font-bold text-[#E36A2E]">DOCUMENTS ARCHIVE:</span>
          <span className="px-2.5 py-1 rounded bg-white border border-[#183D2B]/15 text-[11px]">
            docs/wireframes/TRAIL_WIREFRAMES.md
          </span>
        </div>
      </section>

      {/* Main Wireframe Explorer Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Left Screen Selector Column */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#183D2B]/60 font-bold block mb-2">
              SELECT SCREEN BLUEPRINT ({currentScreens.length} SCREENS)
            </span>
            {currentScreens.map((screen, index) => {
              const isSelected = selectedScreenIndex === index;
              return (
                <button
                  key={screen.id}
                  onClick={() => setSelectedScreenIndex(index)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-[#183D2B] shadow-sm ring-2 ring-[#183D2B]/10'
                      : 'bg-white/60 border-[#183D2B]/15 hover:bg-white hover:border-[#183D2B]/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono font-bold mb-1">
                    <span className={isSelected ? 'text-[#183D2B]' : 'text-[#183D2B]/80'}>
                      {screen.name}
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded uppercase ${
                        screen.type.includes('New')
                          ? 'bg-[#E36A2E]/10 text-[#E36A2E] font-bold'
                          : 'bg-[#183D2B]/5 text-[#183D2B]/70'
                      }`}
                    >
                      {screen.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#183D2B]/65 font-sans line-clamp-2">
                    {screen.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Blueprint Presentation Canvas */}
          <div className="lg:col-span-8 rounded-2xl border border-[#183D2B]/20 bg-white p-5 sm:p-7 shadow-sm space-y-5">
            {/* Header of Active Screen */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#183D2B]/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E36A2E] font-bold">
                  LOW-FIDELITY WIREFRAME · TRAIL
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#183D2B]">
                  {activeScreen.name}
                </h2>
                <div className="text-xs font-mono text-[#183D2B]/60 mt-0.5">
                  TARGET ROUTE: <code className="bg-[#FAF8F3] px-2 py-0.5 rounded border border-[#183D2B]/15 text-[#183D2B] font-bold">{activeScreen.route}</code>
                </div>
              </div>

              {activeScreen.route.startsWith('/') && (
                <Link
                  href={activeScreen.route}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#183D2B]/10 hover:bg-[#183D2B] hover:text-white text-xs font-mono text-[#183D2B] font-bold transition-all shrink-0"
                >
                  <span>VISIT LIVE PAGE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>

            {/* Screen Intent Summary */}
            <p className="text-xs sm:text-sm text-[#183D2B]/80 font-sans leading-relaxed">
              {activeScreen.description}
            </p>

            {/* Blueprint Wireframe Render Container */}
            <div className="rounded-xl border-2 border-dashed border-gray-400/80 bg-gray-100/60 p-4 sm:p-6 shadow-inner">
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-3 flex items-center justify-between">
                <span>STRUCTURAL WIREFRAME SCHEMATIC</span>
                <span>DESKTOP / TABLET GRID (12-COL)</span>
              </div>
              {activeScreen.blueprint}
            </div>

            {/* Structural Notes Footer */}
            <div className="pt-3 border-t border-[#183D2B]/10 grid grid-cols-2 gap-3 text-[10px] font-mono text-[#183D2B]/70">
              <div>
                <b>INFORMATION HIERARCHY:</b> Level 1 H1 (28-32px), Level 2 Cards (16-18px), Level 3 Telemetry Labels (10-11px).
              </div>
              <div>
                <b>ACCESSIBILITY TARGETS:</b> All primary buttons $\ge$ 44px hit-box; minimum 4.5:1 text contrast ratio on parchment backgrounds.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
