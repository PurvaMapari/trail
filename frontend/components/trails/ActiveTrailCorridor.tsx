'use client';

import React from 'react';

import { DetailedStop } from '@/data/trails';

interface ActiveTrailCorridorProps {
  currentStop: DetailedStop;
  currentStopIndex: number;
  totalStops: number;
}

export function ActiveTrailCorridor({
  currentStop,
  currentStopIndex,
  totalStops,
}: ActiveTrailCorridorProps) {
  const currentNum = String(currentStopIndex + 1).padStart(2, '0');
  const terminusNum = String(totalStops).padStart(2, '0');
  const progressRatio = totalStops > 1 ? currentStopIndex / (totalStops - 1) : 0;

  return (
    <div className="space-y-4">
      {/* Card 1: Cartographic Corridor */}
      <div className="p-4 sm:p-5 rounded-2xl border border-[#183D2B]/15 bg-[#FAF8F3] shadow-xs">
        {/* Card Header */}
        <div className="flex items-baseline justify-between pb-3 border-b border-[#183D2B]/10">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#4E6B48] font-bold">
              CARTOGRAPHIC TOPOGRAPHY
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#183D2B] mt-0.5">
              Traversal Corridor
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#183D2B]/70 tracking-wider">
            WGS84 // ELEV {currentStop.elevationProfile || '+6M'}
          </span>
        </div>

        {/* Sub-strip Corridor Name & Compass */}
        <div className="flex items-center justify-between py-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#183D2B]/80 font-semibold border-b border-[#183D2B]/5">
          <span>{currentStop.corridorLabel || 'RUA 31 DE JANEIRO CORRIDOR'}</span>
          <div className="flex items-center gap-1.5">
            <span>{terminusNum} TERMINUS</span>
            <span className="w-5 h-5 rounded-full bg-[#183D2B] text-[#FAF8F3] flex items-center justify-center text-[10px] font-bold">
              N
            </span>
          </div>
        </div>

        {/* Corridor SVG Map Canvas */}
        <div className="relative mt-3 rounded-xl overflow-hidden border border-[#183D2B]/10 bg-[#FAF8F3] h-[220px]">
          {/* Topographic Contour Background */}
          <svg
            className="absolute inset-0 w-full h-full opacity-35"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 220"
            preserveAspectRatio="none"
          >
            {/* Topo Curves */}
            <path
              d="M-20,40 C80,30 160,80 260,50 C340,25 380,60 420,50"
              fill="none"
              stroke="#183D2B"
              strokeWidth="0.8"
              strokeDasharray="2,3"
            />
            <path
              d="M-20,80 C90,75 140,120 240,90 C320,65 370,110 420,95"
              fill="none"
              stroke="#183D2B"
              strokeWidth="0.8"
            />
            <path
              d="M-20,130 C70,120 150,160 250,140 C330,120 370,150 420,135"
              fill="none"
              stroke="#183D2B"
              strokeWidth="0.8"
              strokeDasharray="3,2"
            />
            <path
              d="M-20,175 C80,170 170,195 270,180 C340,165 380,185 420,180"
              fill="none"
              stroke="#183D2B"
              strokeWidth="0.8"
            />
          </svg>

          {/* Cartographic Traversal Route */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 400 220"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Completed Path (from Station 01 up to Active Stop) */}
            <path
              d="M 120 180 L 130 130 L 175 100"
              fill="none"
              stroke="#183D2B"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Upcoming Path (Dashed towards 03 and Terminus) */}
            <path
              d="M 175 100 L 210 60 L 290 40"
              fill="none"
              stroke="#183D2B"
              strokeWidth="2.5"
              strokeDasharray="5,4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.45"
            />

            {/* Station 01 Point */}
            <circle cx="120" cy="180" r="5" fill="#183D2B" />
            <text x="105" y="200" fill="#183D2B" fontSize="9" fontFamily="monospace" fontWeight="bold">
              01 CAFÉ
            </text>

            {/* Station 02 Active Point (Bullseye) */}
            <circle cx="175" cy="100" r="11" fill="none" stroke="#E36A2E" strokeWidth="2.5" />
            <circle cx="175" cy="100" r="4.5" fill="#E36A2E" />

            {/* Floating 'YOU ARE HERE' Pill */}
            <g transform="translate(195, 86)">
              <rect x="0" y="0" width="140" height="24" rx="4" fill="#183D2B" />
              <text x="8" y="16" fill="#FAF8F3" fontSize="9" fontFamily="monospace" fontWeight="bold">
                STATION {currentNum}: YOU ARE HERE
              </text>
            </g>

            {/* Station 03 Point */}
            <circle cx="210" cy="60" r="4" fill="#FAF8F3" stroke="#183D2B" strokeWidth="1.5" />

            {/* Station 04 Terminus */}
            <circle cx="290" cy="40" r="4" fill="#FAF8F3" stroke="#183D2B" strokeWidth="1.5" />
            <text x="300" y="44" fill="#183D2B" fontSize="9" fontFamily="monospace" opacity="0.6">
              04 TERMINUS
            </text>
          </svg>

          {/* Bottom Gradient Surface Info Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-[#FAF8F3]/95 border-t border-[#183D2B]/10 px-3 py-2 flex items-center justify-between text-[10px] font-mono tracking-wider">
            <div>
              <span className="text-[#183D2B]/50 block text-[9px]">CORRIDOR ELEVATION</span>
              <span className="font-bold text-[#183D2B]">
                {currentStop.elevationChange || '+2M → +6M GRADIENT'}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[#183D2B]/50 block text-[9px]">SECTOR SURFACE</span>
              <span className="font-bold text-[#183D2B]">
                {currentStop.surfaceType || 'HERITAGE COBBLESTONE'}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Elevation Profile Area Chart */}
        <div className="mt-4 pt-4 border-t border-[#183D2B]/10">
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#183D2B]/70 font-semibold mb-2">
            <span>ELEVATION PROFILE (3.2 KM TRAVERSE)</span>
            <span className="text-[#183D2B] font-bold">PEAK: +14M</span>
          </div>

          <div className="relative rounded-lg overflow-hidden bg-[#EBF2EB]/40 border border-[#183D2B]/10 p-2">
            <svg
              className="w-full h-16"
              viewBox="0 0 320 64"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="elevationGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4E6B48" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#4E6B48" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Area Under Curve */}
              <path
                d="M 0 54 Q 60 50, 100 44 T 180 30 T 260 22 L 320 12 L 320 64 L 0 64 Z"
                fill="url(#elevationGrad)"
              />

              {/* Curve Stroke */}
              <path
                d="M 0 54 Q 60 50, 100 44 T 180 30 T 260 22 L 320 12"
                fill="none"
                stroke="#183D2B"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Active Marker Dot based on progress */}
              <circle
                cx={Math.max(10, Math.min(310, progressRatio * 320))}
                cy={54 - progressRatio * 42}
                r="4.5"
                fill="#E36A2E"
                stroke="#FAF8F3"
                strokeWidth="2"
              />
            </svg>

            {/* X-axis Station Elevation Markers */}
            <div className="flex items-center justify-between text-[9px] font-mono text-[#183D2B]/60 mt-1 px-1">
              <span>0.0 KM (CAFE)</span>
              <span className="font-bold text-[#E36A2E]">
                {currentStop.distanceMarker || '0.8 KM'} (NOW)
              </span>
              <span>1.6 KM (ART)</span>
              <span>3.2 KM (SUMMIT)</span>
            </div>
          </div>
        </div>

        {/* Card 3: Quarter Context */}
        <div className="mt-4 p-3.5 rounded-xl bg-[#FAF8F3] border border-[#183D2B]/15">
          <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#183D2B] font-bold block mb-1">
            QUARTER CONTEXT
          </span>
          <p className="text-xs text-[#183D2B]/80 leading-relaxed font-sans">
            {currentStop.quarterContext ||
              'Fontainhas was developed in the late 18th century as the residential quarter of Portuguese officials. Buildings maintain strict historic colour coding refreshed annually after monsoons.'}
          </p>
        </div>
      </div>
    </div>
  );
}
