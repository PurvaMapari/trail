'use client';

import React from 'react';
import { Compass } from 'lucide-react';

export function AIDiscoveryHeader() {
  return (
    <div className="space-y-4">
      {/* Top Telemetry Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-y-2 py-2 px-3 sm:px-4 bg-[#ECE8DD]/80 border border-[#183D2B]/10 rounded-lg text-[10px] sm:text-[11px] font-mono text-[#183D2B]/80 tracking-wider">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E36A2E] animate-pulse" />
          <span className="font-bold">
            TRAIL SYNTHESIS PROTOCOL {'//'} INTENT-DRIVEN TRAVERSE ENGINE · V3.2
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[#183D2B]/70">
          <span>INPUT: NL-DSL ANCHORING</span>
          <span className="hidden sm:inline text-[#183D2B]/30">|</span>
          <span>LOCUS: PANAJI QUADRANT (15°29&apos;N 73°49&apos;E)</span>
          <span className="hidden lg:inline text-[#183D2B]/30">|</span>
          <span className="hidden lg:inline">DATUM: WGS 84</span>
        </div>
      </div>

      {/* Kicker + Title */}
      <div className="space-y-2 pt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FAF8F3] border border-[#183D2B]/20 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-[#183D2B] uppercase shadow-2xs">
          <Compass className="w-3.5 h-3.5 text-[#4E6B48]" />
          <span>PEDESTRIAN HEURISTICS & CADENCE MAPPING</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#183D2B] tracking-tight">
          Where do you want your trail to take you?
        </h1>

        <p className="text-sm sm:text-base text-[#183D2B]/80 font-sans max-w-2xl leading-relaxed">
          Tell TRAIL what you are in the mood to discover. The engine maps pedestrian footpaths, opening cadences, and quiet passageways into a coherent journey.
        </p>
      </div>
    </div>
  );
}
