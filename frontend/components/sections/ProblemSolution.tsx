'use client';

import React from 'react';
import { Compass, Footprints, Clock, Sparkles } from 'lucide-react';

export function ProblemSolution() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-[#183D2B]/10">
      {/* Section Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#E36A2E] font-bold mb-2">
          <Footprints className="w-3.5 h-3.5" />
          <span>The Walking Philosophy</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] leading-tight font-bold text-[#183D2B]">
          Modern maps prioritize speed. <br />
          <span className="italic font-normal text-[#4E6B48]">We prioritize discovery.</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#183D2B]/75 font-sans leading-relaxed">
          Standard navigation apps treat walking like driving — rushing you along noisy main roads to shave off two minutes. In the process, you miss the courtyard roasteries, ancient alleyways, and quiet spaces that give a city its character.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {/* The Problem Card */}
        <div className="rounded-3xl border border-red-200/80 bg-white/70 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-red-100/80 text-red-800 text-[10px] font-mono uppercase tracking-wider font-bold">
                Typical Navigation Apps
              </span>
              <span className="text-xs font-mono text-red-600 font-semibold">The A → B Rush</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#183D2B] mb-3">
              Fastest route, zero personality
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-[#183D2B]/75 font-sans">
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold">✕</span>
                <span>Directs you through congested vehicular arteries and featureless transit paths.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold">✕</span>
                <span>Detours to explore hidden bookshops or cafes are penalized as &ldquo;delays.&rdquo;</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold">✕</span>
                <span>Leaves you staring down at a digital blue arrow instead of looking around.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-red-100 text-[11px] font-mono text-red-700/80">
            Result: The shortest path is usually the dullest walk.
          </div>
        </div>

        {/* The Solution Card */}
        <div className="rounded-3xl border border-[#183D2B]/20 bg-[#183D2B] text-white p-6 sm:p-8 shadow-lg flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-[#E36A2E]/20 text-[#E36A2E] text-[10px] font-mono uppercase tracking-wider font-bold border border-[#E36A2E]/30">
                The TRAIL Way
              </span>
              <span className="text-xs font-mono text-white/70 font-semibold">Connected Flow</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-3">
              Curated narrative across living terrain
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-white/80 font-sans">
              <li className="flex items-start gap-2.5">
                <span className="text-[#E36A2E] font-bold">✓</span>
                <span>Links vetted independent roasteries, secret courtyards, and viewpoints into one cohesive walk.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#E36A2E] font-bold">✓</span>
                <span>Timed around sunlight, baker opening hours, and shaded pedestrian corridors.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#E36A2E] font-bold">✓</span>
                <span>Field notes and architectural observations that give every street meaning.</span>
              </li>
            </ul>
          </div>

          <div className="relative z-10 mt-6 pt-4 border-t border-white/10 text-[11px] font-mono text-white/70 flex items-center justify-between">
            <span>Result: Every step becomes a discovery.</span>
            <Sparkles className="w-3.5 h-3.5 text-[#E36A2E]" />
          </div>
        </div>
      </div>
    </section>
  );
}
