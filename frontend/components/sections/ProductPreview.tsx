import React from 'react';
import Link from 'next/link';
import { Sun, WifiOff, Compass, ArrowRight, Zap } from 'lucide-react';

export function ProductPreview() {
  return (
    <section id="hardware" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#183D2B]/10 scroll-mt-20">
      {/* Top Tag */}
      <div className="flex flex-wrap items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#183D2B]/60 mb-6 gap-2">
        <span>05 // HARDWARE & AMBIENT INTERFACE</span>
        <span>FIELD UNIT SPECIFICATION</span>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Technical Narrative & Features */}
        <div className="lg:col-span-6 space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] leading-tight font-bold text-[#183D2B]">
            Designed for harsh direct glare and zero cellular reception.
          </h2>

          <p className="text-xs sm:text-sm lg:text-base text-[#183D2B]/80 leading-relaxed font-sans">
            The open trail doesn&apos;t care about 5G towers or low battery warnings. TRAIL is
            engineered from the ground up for high-contrast sunlight readability and complete offline
            autonomy.
          </p>

          <div className="space-y-5 pt-2">
            {/* Feature 1 */}
            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#183D2B]/10 flex items-center justify-center shrink-0 text-[#183D2B]">
                <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h4 className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#183D2B]">
                  HIGH-CONTRAST MONOCHROME MODES
                </h4>
                <p className="text-xs text-[#183D2B]/75 leading-relaxed mt-0.5">
                  High-contrast cartography optimized for direct midday sun without squinting or draining brightness.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#183D2B]/10 flex items-center justify-center shrink-0 text-[#183D2B]">
                <WifiOff className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h4 className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#183D2B]">
                  OFFLINE-NATIVE FIELD CACHE
                </h4>
                <p className="text-xs text-[#183D2B]/75 leading-relaxed mt-0.5">
                  Full vector topo sheets, audio notes, and waypoint clues downloaded in a single 4MB lightweight archive.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#183D2B]/10 flex items-center justify-center shrink-0 text-[#E36A2E]">
                <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h4 className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#183D2B]">
                  COMPASS-FIRST DIRECTIONAL COMPONENT
                </h4>
                <p className="text-xs text-[#183D2B]/75 leading-relaxed mt-0.5">
                  Never stare at a rotating blue bubble. A clean magnetic needle shows your relationship to the next landmark.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/active-trail"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#183D2B] text-[#F4F2EB] text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#4E6B48] transition-colors"
            >
              <Zap className="w-3.5 h-3.5 text-[#E36A2E]" />
              <span>Launch Active Trail Experience</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: Phone Mockup Frame */}
        <div className="lg:col-span-6 flex justify-center w-full">
          <div className="w-full max-w-[340px] sm:max-w-sm rounded-[36px] bg-[#112B1E] p-3.5 sm:p-4 shadow-2xl border-4 border-[#183D2B]/60">
            {/* Phone Screen Canvas */}
            <div className="rounded-[28px] bg-[#FAF8F3] p-4 sm:p-5 border border-[#183D2B]/20 text-[#183D2B] font-mono">
              {/* Screen Top Status Bar */}
              <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-[#183D2B]/60 border-b border-[#183D2B]/10 pb-2 mb-3 sm:mb-4">
                <span>FIELD INSTRUMENT // ACTIVE</span>
                <span className="flex items-center gap-1 font-bold text-[#E36A2E]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E36A2E]" />
                  OFFLINE CACHE
                </span>
              </div>

              {/* Waypoint Title Header */}
              <div className="mb-3 sm:mb-4">
                <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#183D2B]/50 block">
                  WAYPOINT 03 // 04
                </span>
                <h4 className="font-serif text-base sm:text-lg font-bold text-[#183D2B]">
                  Point Bonita Workshop
                </h4>
                <span className="text-[9px] sm:text-[10px] text-[#183D2B]/60">
                  ELEV: 120M &bull; 37.7749° N
                </span>
              </div>

              {/* Compass Dial Simulation Frame */}
              <div className="h-40 sm:h-44 rounded-2xl bg-white border border-[#183D2B]/15 flex flex-col items-center justify-center p-3 relative overflow-hidden my-3 sm:my-4 shadow-inner">
                {/* Crosshairs */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                  <div className="w-full h-[1px] bg-[#183D2B]" />
                  <div className="h-full w-[1px] bg-[#183D2B] absolute" />
                </div>

                {/* Dial Circle */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-[#183D2B]/20 flex items-center justify-center relative">
                  {/* Needle */}
                  <div className="absolute w-1 h-16 sm:h-20 bg-gradient-to-t from-[#4E6B48] via-[#183D2B] to-[#E36A2E] transform rotate-45 rounded-full shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-white border-2 border-[#183D2B] z-10" />
                </div>

                <div className="mt-2 text-center">
                  <span className="text-[11px] sm:text-xs font-bold text-[#183D2B]">BEARING: 042° NE</span>
                  <span className="block text-[9px] sm:text-[10px] text-[#E36A2E] font-semibold">240M TO WAYPOINT 03</span>
                </div>
              </div>

              {/* Progress Bar in Device */}
              <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[#183D2B]/10">
                <div className="flex justify-between text-[8px] sm:text-[9px] text-[#183D2B]/60 mb-1.5 uppercase">
                  <span>TRAVERSE PROGRESS</span>
                  <span className="font-bold text-[#183D2B]">75% COMPLETED</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#183D2B]/10 overflow-hidden">
                  <div className="w-3/4 h-full bg-[#183D2B]" />
                </div>
              </div>

              {/* Screen Footer */}
              <div className="mt-3 sm:mt-4 text-center text-[7px] sm:text-[8px] text-[#183D2B]/40 uppercase tracking-widest">
                FIELD INSTRUMENT OS // REVISION 4.1
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
