'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, Zap, Map, Info } from 'lucide-react';

interface StopData {
  id: string;
  num: string;
  name: string;
  time: string;
  category: string;
  x: number;
  y: number;
  note: string;
}

const stops: StopData[] = [
  {
    id: 's1',
    num: '01',
    name: 'OAK & EMBER ROASTERS',
    time: '8:15 AM',
    category: '☕',
    x: 14,
    y: 26,
    note: 'Single-origin washed beans roasted in small batches inside a restored 1912 dry-goods brick warehouse.',
  },
  {
    id: 's2',
    num: '02',
    name: 'DRIFTWOOD ANTIQUARIAN',
    time: '9:30 AM',
    category: '📖',
    x: 38,
    y: 45,
    note: 'Hand-bound maritime charts and 19th-century regional maps stacked in cedar boxes. Filter single-origin served in handmade stoneware mugs.',
  },
  {
    id: 's3',
    num: '03',
    name: 'POINT BONITA LOOKOUT',
    time: '11:15 AM',
    category: '🔭',
    x: 65,
    y: 62,
    note: 'Panoramic view over fog-carved headlands, sea birds, and historic suspension footbridge.',
  },
  {
    id: 's4',
    num: '04',
    name: 'SUNKEN ALLEY CERAMICS',
    time: '1:00 PM',
    category: '🏺',
    x: 88,
    y: 72,
    note: 'Wood-fired kiln pottery studio tucked at the end of a stone staircase behind overgrown fig trees.',
  },
];

export function Hero() {
  const [activeStop, setActiveStop] = useState<StopData>(stops[1]);

  return (
    <section className="pt-6 sm:pt-10 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Top Protocol Pill */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E7E3D7]/60 border border-[#183D2B]/15 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#183D2B]/80 mb-6 sm:mb-8 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
        <span className="w-2 h-2 rounded-full bg-[#E36A2E] shrink-0 animate-pulse" />
        <span className="truncate">Traverse Edition 01 {'//'} Field-tested Cartography {'//'} Edition: 2026</span>
      </div>

      {/* Hero Headline & Right Side Summary */}
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-8 sm:mb-10">
        <div className="lg:col-span-7">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[58px] leading-[1.1] font-bold text-[#183D2B] tracking-tight">
            The world isn&apos;t meant to be bypassed at 60 mph.
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-[#4E6B48] mt-2 sm:mt-3 font-normal">
            Walk the connected narrative.
          </p>
        </div>

        <div className="lg:col-span-5 lg:pl-6 pt-1 sm:pt-2 flex flex-col justify-between">
          <p className="text-xs sm:text-sm lg:text-base text-[#183D2B]/80 leading-relaxed font-sans">
            A curated cartographic network connecting independent roasteries, tucked-away
            second-hand bookshops, wild viewpoints, and forgotten architectural alleyways across
            living terrain.
          </p>

          <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2 text-[10px] sm:text-xs font-mono tracking-wider text-[#183D2B]/60 uppercase border-t border-[#183D2B]/10 pt-3 sm:pt-4">
            <Link href="/explore" className="text-[#E36A2E] hover:underline font-semibold">01 {'//'} COFFEE</Link>
            <span>&bull;</span>
            <Link href="/explore" className="text-[#183D2B] hover:underline font-semibold">02 {'//'} BOOKS</Link>
            <span>&bull;</span>
            <Link href="/explore" className="text-[#4E6B48] hover:underline font-semibold">03 {'//'} VIEWPOINTS</Link>
            <span>&bull;</span>
            <Link href="/explore" className="text-[#183D2B]/80 hover:underline font-semibold">04 {'//'} CRAFT</Link>
          </div>
        </div>
      </div>

      {/* Main Interactive Traverse Canvas Box */}
      <div className="rounded-2xl border border-[#183D2B]/20 bg-white/70 shadow-sm overflow-hidden backdrop-blur-sm">
        {/* Box Top Header Bar */}
        <div className="px-4 sm:px-5 py-2.5 sm:py-3 border-b border-[#183D2B]/15 bg-[#F4F2EB]/90 flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs font-mono tracking-wider text-[#183D2B]">
          <div className="flex items-center gap-1.5 sm:gap-2 truncate">
            <span className="font-bold">TRAVERSE NO. 042</span>
            <span className="text-[#183D2B]/40">{'//'}</span>
            <span className="text-[#183D2B]/80 truncate">COASTAL RIDGE TO OLD TOWN</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#183D2B]/10 text-[9px] sm:text-[10px] font-semibold text-[#183D2B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4E6B48]" />
              ACTIVE RECON
            </span>
            <span className="text-[10px] text-[#183D2B]/50 font-mono hidden sm:inline">SCALE 1:25,000</span>
          </div>
        </div>

        {/* Topographic Map Interactive Surface */}
        <div className="relative w-full h-[320px] sm:h-[420px] md:h-[460px] bg-[#FAF8F3] overflow-hidden select-none">
          {/* Subtle Topographic Elevation Contour Vectors */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-45"
            viewBox="0 0 1000 500"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#183D2B" strokeWidth="0.5" strokeOpacity="0.06" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Contour Lines */}
            <path d="M -50 180 C 150 140, 320 220, 520 180 C 720 140, 850 210, 1050 160" fill="none" stroke="#183D2B" strokeWidth="1" strokeOpacity="0.15" />
            <path d="M -50 240 C 180 200, 360 280, 580 230 C 780 180, 920 270, 1050 220" fill="none" stroke="#183D2B" strokeWidth="1.2" strokeOpacity="0.2" />
            <path d="M -50 300 C 200 260, 420 340, 640 290 C 820 240, 950 330, 1050 280" fill="none" stroke="#183D2B" strokeWidth="1" strokeOpacity="0.16" />
            <path d="M -50 360 C 240 320, 480 390, 700 350 C 860 310, 980 390, 1050 340" fill="none" stroke="#183D2B" strokeWidth="1" strokeOpacity="0.12" />
            <path d="M -50 120 C 120 90, 280 160, 480 120 C 680 80, 800 150, 1050 100" fill="none" stroke="#183D2B" strokeWidth="0.8" strokeOpacity="0.1" />

            {/* Elevation Contour Marker Texts */}
            <text x="320" y="210" fill="#183D2B" fillOpacity="0.3" fontSize="9" fontFamily="monospace">+120M RIDGE CONTOUR</text>
            <text x="680" y="170" fill="#183D2B" fillOpacity="0.3" fontSize="9" fontFamily="monospace">+80M VALLEY FLOOR</text>
            <text x="220" y="350" fill="#183D2B" fillOpacity="0.3" fontSize="9" fontFamily="monospace">+40M SEA BENCH</text>
            <text x="780" y="320" fill="#183D2B" fillOpacity="0.3" fontSize="9" fontFamily="monospace">PACIFIC HEADLAND SLOPE</text>

            {/* Main Dark Green Traverse Route Line */}
            <path
              d="M 140 130 Q 240 170, 380 225 T 650 310 T 880 360"
              fill="none"
              stroke="#183D2B"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Compass Rose */}
          <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex flex-col items-center justify-center p-2 sm:p-3 rounded-full bg-white/85 border border-[#183D2B]/15 shadow-sm backdrop-blur-sm pointer-events-none z-10">
            <span className="text-[9px] sm:text-[10px] font-mono font-bold text-[#183D2B]">N</span>
            <Compass className="w-6 h-6 sm:w-8 sm:h-8 text-[#183D2B]/70 mt-0.5" />
            <span className="text-[7px] sm:text-[8px] font-mono text-[#E36A2E] font-semibold mt-0.5">342°</span>
          </div>

          {/* Interactive Stop Nodes */}
          {stops.map((stop) => {
            const isSelected = activeStop.id === stop.id;
            return (
              <div
                key={stop.id}
                style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
                onClick={() => setActiveStop(stop)}
              >
                <div className="relative flex items-center justify-center">
                  <div
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#E36A2E] text-white ring-4 ring-[#E36A2E]/25 shadow-md scale-110'
                        : 'bg-white border-2 border-[#183D2B] text-[#183D2B] hover:border-[#E36A2E] hover:scale-105 shadow-sm'
                    }`}
                  >
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold">{stop.num}</span>
                  </div>

                  {/* Pulsing indicator for active stop */}
                  {isSelected && (
                    <span className="absolute -inset-1 rounded-full bg-[#E36A2E]/20 animate-ping" />
                  )}

                  {/* Label badge above node (hidden on very small mobile if unselected to reduce clutter) */}
                  <div
                    className={`absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 border border-[#183D2B]/20 rounded px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] font-mono font-bold text-[#183D2B] shadow-sm flex items-center gap-1 ${
                      isSelected ? 'block z-30' : 'hidden md:flex'
                    }`}
                  >
                    <span>{stop.category}</span>
                    <span className="truncate max-w-[120px]">{stop.name}</span>
                    <span className="text-[#183D2B]/50 font-normal hidden sm:inline">[{stop.time}]</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Floating Waypoint Note Card (Bottom Left of Canvas) */}
          <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-md bg-white/95 border border-[#183D2B]/20 rounded-xl p-3 sm:p-3.5 shadow-md backdrop-blur-md z-30 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-[#183D2B]/10 pb-1.5 mb-1.5 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#183D2B]">
              <div className="flex items-center gap-1.5 font-bold text-[#E36A2E]">
                <Info className="w-3.5 h-3.5" />
                <span>WAYPOINT {activeStop.num} {'//'} FIELD NOTE</span>
              </div>
              <span className="text-[#183D2B]/60 font-semibold">{activeStop.time}</span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#183D2B]/90 font-sans leading-relaxed line-clamp-3 sm:line-clamp-none">
              <strong className="font-semibold text-[#183D2B]">{activeStop.name}:</strong>{' '}
              {activeStop.note}
            </p>
          </div>
        </div>

        {/* Bottom Metadata & Action Bar */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#183D2B]/15 grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4 items-center">
          <div className="border-r border-[#183D2B]/10 pr-2 sm:pr-4">
            <span className="block text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#183D2B]/50">
              Total Distance
            </span>
            <span className="text-base sm:text-lg font-bold font-mono text-[#183D2B]">12.4 KM</span>
            <span className="block text-[9px] sm:text-[10px] text-[#183D2B]/60">Horizontal Traverse</span>
          </div>

          <div className="border-r border-[#183D2B]/10 pr-2 sm:pr-4 lg:border-r">
            <span className="block text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#183D2B]/50">
              Est. Duration
            </span>
            <span className="text-base sm:text-lg font-bold font-mono text-[#183D2B]">3H 45M</span>
            <span className="block text-[9px] sm:text-[10px] text-[#183D2B]/60">Pedestrian Pace</span>
          </div>

          <div className="border-r border-[#183D2B]/10 pr-2 sm:pr-4 hidden sm:block">
            <span className="block text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#183D2B]/50">
              Elevation Profile
            </span>
            <span className="text-base sm:text-lg font-bold font-mono text-[#183D2B]">+240M / -310M</span>
            <span className="block text-[9px] sm:text-[10px] text-[#183D2B]/60">Topographic Variance</span>
          </div>

          <div className="border-r border-[#183D2B]/10 pr-2 sm:pr-4 hidden sm:block">
            <span className="block text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#183D2B]/50">
              Waypoints
            </span>
            <span className="text-base sm:text-lg font-bold font-mono text-[#183D2B]">4 STOPS</span>
            <span className="block text-[9px] sm:text-[10px] text-[#183D2B]/60">Curated Sequence</span>
          </div>

          {/* Action CTAs */}
          <div className="col-span-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-2.5">
            <Link
              href="/active-trail"
              className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#183D2B] text-[#F4F2EB] text-[11px] sm:text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#4E6B48] transition-colors shadow-sm text-center"
            >
              <Zap className="w-3.5 h-3.5 text-[#E36A2E]" />
              <span>Load Traverse</span>
            </Link>

            <Link
              href="/explore"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full border border-[#183D2B]/20 bg-[#F4F2EB]/60 text-[#183D2B] text-[11px] sm:text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#F4F2EB] transition-colors text-center"
            >
              <Map className="w-3.5 h-3.5 text-[#4E6B48]" />
              <span>All Routes</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4-Column Philosophy / Feature Ticker Below Card */}
      <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-[#183D2B]/10">
        <div className="p-3 sm:p-0 rounded-xl bg-white/40 sm:bg-transparent">
          <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#E36A2E] uppercase tracking-wider block mb-1">
            01 {'//'} CURATED DISCOVERY
          </span>
          <p className="text-xs text-[#183D2B]/75 leading-relaxed">
            &ldquo;Every waypoint is vetted on foot by local cartographers and residents.&rdquo;
          </p>
        </div>

        <div className="p-3 sm:p-0 rounded-xl bg-white/40 sm:bg-transparent">
          <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#183D2B] uppercase tracking-wider block mb-1">
            02 {'//'} TIME-AWARE FLOW
          </span>
          <p className="text-xs text-[#183D2B]/75 leading-relaxed">
            &ldquo;Sequenced around natural sunlight, roaster brewing hours, and golden hour views.&rdquo;
          </p>
        </div>

        <div className="p-3 sm:p-0 rounded-xl bg-white/40 sm:bg-transparent">
          <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#4E6B48] uppercase tracking-wider block mb-1">
            03 {'//'} LIVING FIELD NOTES
          </span>
          <p className="text-xs text-[#183D2B]/75 leading-relaxed">
            &ldquo;Micro-observations, secret doorways, and tactile notes impossible to find on maps.&rdquo;
          </p>
        </div>

        <div className="p-3 sm:p-0 rounded-xl bg-white/40 sm:bg-transparent">
          <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#183D2B]/80 uppercase tracking-wider block mb-1">
            04 {'//'} UNCONNECTED SERENDIPITY
          </span>
          <p className="text-xs text-[#183D2B]/75 leading-relaxed">
            &ldquo;Built to wander, not to navigate point-to-point in straight lines.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
