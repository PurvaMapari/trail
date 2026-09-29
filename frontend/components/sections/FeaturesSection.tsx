import React from 'react';
import { Mountain, GitBranch, BarChart3 } from 'lucide-react';

export function FeaturesSection() {
  return (
    <section id="cartography" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#183D2B]/10 scroll-mt-20">
      {/* Top Tag & Header */}
      <div className="text-xs font-mono uppercase tracking-wider text-[#183D2B]/60 mb-6">
        02 // THE CARTOGRAPHIC CRAFT
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] leading-tight font-bold text-[#183D2B]">
          Cartography with a Soul
        </h2>
        <p className="max-w-md text-xs sm:text-sm text-[#183D2B]/70 font-sans leading-relaxed">
          Hand-calibrated walking routes combining the spatial discipline of maritime navigation
          with the literary curiosity of a natural history expedition.
        </p>
      </div>

      {/* 3 Feature Cards */}
      <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
        {/* Card 1: Micro-Topographic Surveying */}
        <div className="rounded-2xl border border-[#183D2B]/20 bg-white/70 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#183D2B]/60 mb-5">
              <span className="font-bold">FEATURE 01</span>
              <Mountain className="w-4 h-4 text-[#4E6B48]" />
            </div>

            {/* Visual Graphic: Elevation curve */}
            <div className="h-28 rounded-xl bg-[#FAF8F3] border border-[#183D2B]/10 p-4 mb-6 flex flex-col justify-between relative overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
                <path
                  d="M 10 50 Q 60 10, 110 35 T 190 20"
                  fill="none"
                  stroke="#183D2B"
                  strokeWidth="2.5"
                />
                <circle cx="110" cy="35" r="4" fill="#E36A2E" />
              </svg>
              <div className="absolute top-2 right-3 text-[9px] font-mono text-[#183D2B]/60 bg-white/80 px-1.5 py-0.5 rounded border border-[#183D2B]/10">
                +140M SUMMIT VIEW
              </div>
              <div className="text-[9px] font-mono text-[#183D2B]/50 flex justify-between">
                <span>0 KM (SEA LEVEL)</span>
                <span>4.8 KM PEAK</span>
              </div>
            </div>

            <h3 className="font-serif text-xl font-bold text-[#183D2B] mb-2">
              Micro-Topographic Surveying
            </h3>
            <p className="text-xs text-[#183D2B]/75 leading-relaxed font-sans">
              Every traverse captures real elevation changes, hidden staircases, cobblestone
              alleyways, shaded park passages, and panoramic breathers.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#183D2B]/10 text-[10px] font-mono text-[#183D2B]/50 uppercase tracking-wider">
            TECHNICAL INDEX: HYPSOMETRIC ELEVATION PROFILE
          </div>
        </div>

        {/* Card 2: Living Waypoint Nodes */}
        <div className="rounded-2xl border border-[#183D2B]/20 bg-white/70 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#183D2B]/60 mb-5">
              <span className="font-bold">FEATURE 02</span>
              <GitBranch className="w-4 h-4 text-[#E36A2E]" />
            </div>

            {/* Visual Graphic: Connected Nodes */}
            <div className="h-28 rounded-xl bg-[#FAF8F3] border border-[#183D2B]/10 p-4 mb-6 flex items-center justify-around relative">
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-[#183D2B] text-white flex items-center justify-center text-[10px] font-mono font-bold shadow-sm">
                  01
                </div>
                <span className="text-[8px] font-mono text-[#183D2B]/60 mt-1 uppercase">NODE A: ROAST</span>
              </div>

              <div className="flex-1 mx-2 border-t-2 border-dashed border-[#183D2B]/30 relative flex items-center justify-center">
                <span className="text-[8px] font-mono text-[#E36A2E] bg-white px-1">450M STROLL</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-[#E36A2E] text-white flex items-center justify-center text-[10px] font-mono font-bold shadow-sm">
                  02
                </div>
                <span className="text-[8px] font-mono text-[#183D2B]/60 mt-1 uppercase">NODE B: PRINT</span>
              </div>
            </div>

            <h3 className="font-serif text-xl font-bold text-[#183D2B] mb-2">
              Living Waypoint Nodes
            </h3>
            <p className="text-xs text-[#183D2B]/75 leading-relaxed font-sans">
              Waypoints are not isolated pins. They are chapters in a contiguous story: a morning
              espresso bar, a printmaker&apos;s cellar, an old maritime lookout.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#183D2B]/10 text-[10px] font-mono text-[#183D2B]/50 uppercase tracking-wider">
            TECHNICAL INDEX: NARRATIVE NODE TOPOLOGY
          </div>
        </div>

        {/* Card 3: Cadence & Pacing Profiles */}
        <div className="rounded-2xl border border-[#183D2B]/20 bg-white/70 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#183D2B]/60 mb-5">
              <span className="font-bold">FEATURE 03</span>
              <BarChart3 className="w-4 h-4 text-[#4E6B48]" />
            </div>

            {/* Visual Graphic: Pacing Bars */}
            <div className="h-28 rounded-xl bg-[#FAF8F3] border border-[#183D2B]/10 p-4 mb-6 flex items-end justify-center gap-3">
              <div className="flex flex-col items-center gap-1">
                <div className="w-5 bg-[#4E6B48]/30 rounded-t h-12" />
                <span className="text-[8px] font-mono text-[#183D2B]/50">PACE</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-5 bg-[#183D2B] rounded-t h-16" />
                <span className="text-[8px] font-mono text-[#183D2B]/50">DWELL</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-5 bg-[#4E6B48]/60 rounded-t h-8" />
                <span className="text-[8px] font-mono text-[#183D2B]/50">GLIDE</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-5 bg-[#4E6B48] rounded-t h-14" />
                <span className="text-[8px] font-mono text-[#183D2B]/50">CLIMB</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-5 bg-[#E36A2E] rounded-t h-10" />
                <span className="text-[8px] font-mono text-[#E36A2E] font-bold">GOLDEN</span>
              </div>
            </div>

            <h3 className="font-serif text-xl font-bold text-[#183D2B] mb-2">
              Cadence & Pacing Profiles
            </h3>
            <p className="text-xs text-[#183D2B]/75 leading-relaxed font-sans">
              Whether you have a 45-minute stroll before work or a whole Sunday to wander, each
              traverse calibrates walking speed, dwell times, and golden hour windows.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#183D2B]/10 text-[10px] font-mono text-[#183D2B]/50 uppercase tracking-wider">
            TECHNICAL INDEX: PEDESTRIAN CADENCE MODELLING
          </div>
        </div>
      </div>
    </section>
  );
}
