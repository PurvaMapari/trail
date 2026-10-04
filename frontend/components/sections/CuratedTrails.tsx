'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { mockTrails } from '@/data/trails';
import { TrailCard } from '@/components/trails/TrailCard';

export function CuratedTrails() {
  // Take all 8 verified Panaji trails
  const trails = mockTrails.filter((t) => t.id !== 'demo').slice(0, 8);

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-[#183D2B]/10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#4E6B48] font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E36A2E]" />
            <span>Curated Routes</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] leading-tight font-bold text-[#183D2B]">
            Trails Worth Taking
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#183D2B]/75 font-sans max-w-xl">
            Each trail connects handpicked stops vetted on foot for atmosphere, local character, and scenic beauty.
          </p>
        </div>

        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-bold text-[#183D2B] hover:text-[#E36A2E] transition-colors shrink-0 group"
        >
          <span>Explore All Trails</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* 4 Trails Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trails.map((trail) => (
          <TrailCard key={trail.id} trail={trail} />
        ))}
      </div>
    </section>
  );
}
