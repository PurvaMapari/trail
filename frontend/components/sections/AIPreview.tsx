'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Compass, ArrowRight } from 'lucide-react';

export function AIPreview() {
  const router = useRouter();
  const [city, setCity] = useState('San Francisco, Bay Area');
  const [cadence, setCadence] = useState('Saturday Morning // 2-3 Hours');
  const [theme, setTheme] = useState('Literary Cafes & Secret Gardens');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/ai-discovery');
  };

  return (
    <section id="calibrate" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#183D2B]/10 scroll-mt-20">
      {/* Top Tag */}
      <div className="flex flex-wrap items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#183D2B]/60 mb-6 gap-2">
        <span>06 // DISCOVERY ENGINE</span>
        <span>ALGORITHMIC COMPASS // REVISION 2.6</span>
      </div>

      <div className="mb-8 sm:mb-10">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] leading-tight font-bold text-[#183D2B]">
          Calibrate Your Traverse
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#183D2B]/70 font-sans leading-relaxed">
          Set your parameters and let our algorithmic compass plot your route.
        </p>
      </div>

      {/* Calibration Form Card */}
      <form onSubmit={handleSubmit} className="rounded-2xl border border-[#183D2B]/20 bg-white/80 p-5 sm:p-8 shadow-sm">
        <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
          {/* Field 1: Geography */}
          <div>
            <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#183D2B]/60 mb-2">
              1. SELECT GEOGRAPHY / CITY
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#183D2B]/20 bg-[#FAF8F3] text-xs font-mono text-[#183D2B] focus:outline-none focus:ring-2 focus:ring-[#183D2B] transition-all"
            />
          </div>

          {/* Field 2: Ambient Cadence */}
          <div>
            <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#183D2B]/60 mb-2">
              2. AMBIENT CADENCE / TIME
            </label>
            <input
              type="text"
              value={cadence}
              onChange={(e) => setCadence(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#183D2B]/20 bg-[#FAF8F3] text-xs font-mono text-[#183D2B] focus:outline-none focus:ring-2 focus:ring-[#183D2B] transition-all"
            />
          </div>

          {/* Field 3: Sensory Focus */}
          <div>
            <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#183D2B]/60 mb-2">
              3. SENSORY FOCUS / THEME
            </label>
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#183D2B]/20 bg-[#FAF8F3] text-xs font-mono text-[#183D2B] focus:outline-none focus:ring-2 focus:ring-[#183D2B] transition-all"
            />
          </div>
        </div>

        {/* Bottom Strip: Verification count & Action */}
        <div className="mt-6 sm:mt-8 pt-6 border-t border-[#183D2B]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#183D2B]/70">
            <Compass className="w-4 h-4 text-[#E36A2E] shrink-0" />
            <span>42 Verified Trails Available Across 8 Micro-regions</span>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#183D2B] hover:bg-[#4E6B48] text-[#F4F2EB] text-xs font-mono uppercase tracking-wider font-semibold transition-colors shadow-sm cursor-pointer"
          >
            <span>Generate Traverse</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E36A2E]" />
          </button>
        </div>
      </form>
    </section>
  );
}
