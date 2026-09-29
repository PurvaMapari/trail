'use client';

import React from 'react';
import { Compass } from 'lucide-react';

export function CreateTrailHeader() {
  return (
    <div className="space-y-4">
      {/* Top Protocol Telemetry Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-y-2 py-2 px-3 sm:px-4 bg-[#ECE8DD]/80 border border-[#183D2B]/10 rounded-lg text-[10px] sm:text-[11px] font-mono text-[#183D2B]/80 tracking-wider">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E36A2E] animate-pulse" />
          <span className="font-bold">
            TRAIL PROTOCOL {'//'} ROUTE DRAFTING LEDGER · SPEC 05
          </span>
        </div>

        <div className="flex items-center gap-3 text-[#183D2B]/70">
          <span>PROJECTION: TRANSVERSE MERCATOR</span>
          <span className="hidden sm:inline text-[#183D2B]/30">|</span>
          <span className="hidden sm:inline">SECTOR: PANAJI QUADRANT - DRAFT V2.4</span>
        </div>
      </div>

      {/* Main Title & Cartographic Planner Tag */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pt-1">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#183D2B] tracking-tight">
            CREATE YOUR TRAIL
          </h1>
          <p className="mt-1 text-sm sm:text-base text-[#183D2B]/80 font-sans">
            Choose what you want to discover, and build an intentional route around it.
          </p>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto shrink-0 px-3 py-1.5 rounded-lg bg-[#FAF8F3] border border-[#183D2B]/20 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-[#183D2B] uppercase shadow-2xs">
          <Compass className="w-3.5 h-3.5 text-[#4E6B48]" />
          <span>CARTOGRAPHIC PLANNER · LIVE WAYPOINT DRAFTING</span>
        </div>
      </div>
    </div>
  );
}
