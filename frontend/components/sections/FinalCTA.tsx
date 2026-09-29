'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';

export function FinalCTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="rounded-3xl bg-[#112B1E] text-[#F4F2EB] p-6 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl border border-[#183D2B]">
        {/* Subtle Topographic SVG curves background */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
          viewBox="0 0 1000 400"
          preserveAspectRatio="none"
        >
          <path d="M -50 100 C 200 60, 450 180, 700 120 C 900 80, 980 150, 1050 100" fill="none" stroke="#FAF8F3" strokeWidth="1" />
          <path d="M -50 180 C 250 120, 500 240, 750 180 C 950 140, 1000 220, 1050 160" fill="none" stroke="#FAF8F3" strokeWidth="1.2" />
          <path d="M -50 260 C 220 200, 480 320, 780 260 C 920 220, 1010 300, 1050 240" fill="none" stroke="#FAF8F3" strokeWidth="1" />
          <path d="M -50 340 C 260 280, 520 380, 820 320 C 940 280, 1020 360, 1050 320" fill="none" stroke="#FAF8F3" strokeWidth="0.8" />
        </svg>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#FAF8F3]/80 mb-5 sm:mb-6 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E36A2E] shrink-0" />
            <span className="truncate">TRAVERSE PROTOCOL {'//'} PUBLIC ACCESS OPEN</span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-[56px] leading-[1.1] font-bold text-white tracking-tight">
            Step onto the line.
          </h2>
          <p className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-[#FAF8F3]/90 mt-2 font-normal">
            Begin your traverse.
          </p>

          {/* Description */}
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-[#FAF8F3]/75 max-w-xl mx-auto leading-relaxed font-sans">
            Register for early field access to curatorial dossiers, compass-calibrated cartography,
            and offline traverses. No ads, no algorithmic tracking, just pure exploration.
          </p>

          {/* Form */}
          <div className="mt-6 sm:mt-8 max-w-lg mx-auto">
            {submitted ? (
              <div className="p-4 rounded-xl bg-white/10 border border-white/20 text-xs font-mono text-white flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-[#E36A2E]" />
                <span>Explorer dispatch registered. Check your field inbox.</span>
              </div>
            ) : (
              <div className="space-y-3">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    required
                    placeholder="Enter your explorer email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-full bg-white text-[#183D2B] placeholder:text-[#183D2B]/40 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#E36A2E]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full bg-[#E36A2E] hover:bg-[#E36A2E]/90 text-white text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-md shrink-0 cursor-pointer"
                  >
                    GET FIELD ACCESS
                  </button>
                </form>

                <div className="pt-2">
                  <Link
                    href="/explore"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#FAF8F3]/70 hover:text-white transition-colors"
                  >
                    <span>Or browse public trails now</span>
                    <ArrowRight className="w-3 h-3 text-[#E36A2E]" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Links & Sub-meta */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#FAF8F3]/50">
            <span>28 MICRO-REGIONS LIVE</span>
            <span>&bull;</span>
            <span>ZERO SCREEN-TRACKING ADS</span>
            <span>&bull;</span>
            <span>100% OFFLINE READY</span>
          </div>
        </div>
      </div>
    </section>
  );
}
