'use client';

import React from 'react';
import { Compass, Sparkles, MapPin } from 'lucide-react';

export function AIDiscoveryHeader() {
  return (
    <div className="space-y-4">
      {/* Top Status Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-y-2 py-2 px-3 sm:px-4 bg-[#ECE8DD]/80 border border-[#183D2B]/10 rounded-xl text-xs font-mono text-[#183D2B]/80">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E36A2E] animate-pulse" />
          <span className="font-bold text-[#183D2B] tracking-wide">
            AI TRAIL DISCOVERY · PANAJI, GOA
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[#183D2B]/70 text-[11px]">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#E36A2E]" />
            <span>Fontainhas & Latin Quarter</span>
          </span>
          <span className="hidden sm:inline text-[#183D2B]/30">•</span>
          <span>21 Curated Places</span>
          <span className="hidden sm:inline text-[#183D2B]/30">•</span>
          <span className="text-[#4E6B48] font-semibold">Walkable Routes</span>
        </div>
      </div>

      {/* Kicker + Title */}
      <div className="space-y-2 pt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F3] border border-[#183D2B]/20 text-[11px] font-mono font-bold tracking-wider text-[#183D2B] uppercase shadow-2xs">
          <Compass className="w-3.5 h-3.5 text-[#E36A2E]" />
          <span>AI-POWERED WALKING GUIDE</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#183D2B] tracking-tight">
          Where do you want your trail to take you?
        </h1>

        <p className="text-sm sm:text-base text-[#183D2B]/80 font-sans max-w-2xl leading-relaxed">
          Tell us what you want to experience in Panaji — quiet morning coffee, historic alleys, hidden bookshops, or sunset along the Mandovi. We&apos;ll generate a personalized walking trail.
        </p>
      </div>
    </div>
  );
}

