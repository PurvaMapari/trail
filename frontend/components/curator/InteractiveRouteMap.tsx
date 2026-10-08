'use client';

import React, { useState } from 'react';
import { PersonalizedStop } from '@/types/curator';
import { MapPin, Navigation, Footprints, Info } from 'lucide-react';

interface InteractiveRouteMapProps {
  stops: PersonalizedStop[];
  activeStopIndex: number;
  onSelectStop: (index: number) => void;
  locationLabel: string;
}

export function InteractiveRouteMap({
  stops,
  activeStopIndex,
  onSelectStop,
  locationLabel,
}: InteractiveRouteMapProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Normalize coordinates for the SVG canvas (width: 800, height: 320)
  // Calculate bounding box of coordinates
  const lats = stops.map((s) => s.coordinates.lat);
  const lngs = stops.map((s) => s.coordinates.lng);

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const latSpan = maxLat - minLat || 0.005;
  const lngSpan = maxLng - minLng || 0.005;

  // Map each stop to SVG coordinate points (x: 80 to 720, y: 60 to 260)
  const points = stops.map((s, idx) => {
    // Invert lat because higher lat is further north (top of SVG = lower y)
    const normalizedY = 1 - (s.coordinates.lat - minLat) / latSpan;
    const normalizedX = (s.coordinates.lng - minLng) / lngSpan;

    // Distribute nicely across canvas if coordinates are tightly clustered
    const spreadX = 90 + ((idx * (620 / Math.max(1, stops.length - 1))) || 0);
    const spreadY = 70 + (normalizedY * 160);

    return {
      x: spreadX,
      y: Math.min(250, Math.max(70, spreadY)),
      stop: s,
      index: idx,
    };
  });

  // Build SVG path data connecting the stops with smooth beziers
  let pathD = '';
  if (points.length > 0) {
    pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const midX = (prev.x + curr.x) / 2;
      const midY = (prev.y + curr.y) / 2 + (i % 2 === 0 ? 20 : -20);
      pathD += ` Q ${midX} ${midY}, ${curr.x} ${curr.y}`;
    }
  }

  return (
    <div className="rounded-2xl border border-[#183D2B]/15 bg-[#FAF8F3] overflow-hidden shadow-xs relative">
      {/* Map Header Bar */}
      <div className="px-4 py-3 bg-white/80 border-b border-[#183D2B]/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Navigation className="w-3.5 h-3.5 text-[#E36A2E]" />
          <span className="font-bold text-[#183D2B]">INTERACTIVE WALKING CORRIDOR</span>
          <span className="text-[#183D2B]/40">·</span>
          <span className="text-[#183D2B]/70">{locationLabel}</span>
        </div>

        <div className="flex items-center gap-3 text-[10px] text-[#183D2B]/60">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#183D2B]" />
            <span>Waypoints ({stops.length})</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-0.5 bg-[#E36A2E]" />
            <span>Walking Route</span>
          </span>
        </div>
      </div>

      {/* SVG Map Canvas */}
      <div className="relative w-full h-[260px] sm:h-[300px] select-none bg-[#FAF8F3]">
        {/* Subtle Map Grid Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 800 300">
          <defs>
            <pattern id="curator-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#183D2B" strokeWidth="0.5" strokeOpacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#curator-grid)" />

          {/* Contour Lines */}
          <path d="M 0 100 Q 200 60, 450 140 T 800 120" fill="none" stroke="#183D2B" strokeWidth="1" strokeOpacity="0.15" />
          <path d="M 0 200 Q 300 240, 550 180 T 800 220" fill="none" stroke="#183D2B" strokeWidth="1" strokeOpacity="0.12" />
        </svg>

        {/* Dynamic Route SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 300">
          {/* Walking Corridor Shadow */}
          <path
            d={pathD}
            fill="none"
            stroke="#183D2B"
            strokeWidth="5"
            strokeOpacity="0.1"
            strokeLinecap="round"
          />

          {/* Walking Corridor Path */}
          <path
            d={pathD}
            fill="none"
            stroke="#E36A2E"
            strokeWidth="2.5"
            strokeDasharray="6 4"
            strokeLinecap="round"
          />
        </svg>

        {/* Interactive Pin Nodes */}
        {points.map((pt) => {
          const isSelected = activeStopIndex === pt.index;
          const isHovered = hoveredIndex === pt.index;

          return (
            <div
              key={pt.stop.id}
              style={{
                left: `${(pt.x / 800) * 100}%`,
                top: `${(pt.y / 300) * 100}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-transform duration-200"
              onClick={() => onSelectStop(pt.index)}
              onMouseEnter={() => setHoveredIndex(pt.index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative flex flex-col items-center">
                {/* Pin Circle */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs shadow-md transition-all ${
                    isSelected
                      ? 'bg-[#E36A2E] text-white ring-4 ring-[#E36A2E]/25 scale-110'
                      : 'bg-[#183D2B] text-white hover:bg-[#4E6B48] hover:scale-105'
                  }`}
                >
                  {String(pt.index + 1).padStart(2, '0')}
                </div>

                {/* Place Name Badge */}
                <div
                  className={`mt-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold whitespace-nowrap shadow-sm border transition-all ${
                    isSelected || isHovered
                      ? 'bg-[#183D2B] text-white border-[#183D2B] z-30 scale-105'
                      : 'bg-white/90 text-[#183D2B] border-[#183D2B]/15'
                  }`}
                >
                  <span>{pt.stop.shortName}</span>
                </div>

                {/* Hover / Active Floating Tooltip */}
                {(isHovered || isSelected) && (
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-30 bg-[#183D2B] text-white p-2 rounded-xl text-[10px] font-sans shadow-lg whitespace-nowrap pointer-events-none animate-in fade-in">
                    <span className="font-bold block">{pt.stop.name}</span>
                    <span className="text-white/70 font-mono block">
                      {pt.stop.dwellTimeLabel} · {pt.stop.categoryTag.split('·')[0]}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Bottom Scale & Coordinate Marker */}
        <div className="absolute bottom-2.5 left-3 text-[9px] font-mono text-[#183D2B]/50 bg-white/75 px-2 py-0.5 rounded border border-[#183D2B]/10">
          DATUM: WGS 84 · PANAJI PEDESTRIAN CORRIDOR · SCALE 1:8,000
        </div>
      </div>
    </div>
  );
}
