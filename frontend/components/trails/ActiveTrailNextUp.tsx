'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Clock, Award } from 'lucide-react';
import { DetailedStop } from '@/data/trails';

interface ActiveTrailNextUpProps {
  nextStop?: DetailedStop;
  onAdvance: () => void;
  isLastStop: boolean;
}

export function ActiveTrailNextUp({
  nextStop,
  onAdvance,
  isLastStop,
}: ActiveTrailNextUpProps) {
  if (isLastStop || !nextStop) {
    return (
      <div className="p-4 sm:p-5 rounded-2xl border border-[#183D2B]/15 bg-[#EBF2EB]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#183D2B] text-[#FAF8F3] flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#4E6B48] font-bold block">
              FINAL EXPEDITION STATION REACHED
            </span>
            <h4 className="text-base font-serif font-bold text-[#183D2B]">
              Ready to complete your trail journey
            </h4>
          </div>
        </div>
        <button
          onClick={onAdvance}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#183D2B] hover:bg-[#183D2B]/90 text-[#FAF8F3] text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-sm"
        >
          COMPLETE & SUBMIT LOG 🏆
        </button>
      </div>
    );
  }

  const nextStopNum = nextStop.legLabel || '03';

  return (
    <div className="space-y-2">
      {/* Section Header */}
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-wider">
        <span className="font-bold text-[#183D2B]/60 uppercase">
          NEXT UP ON THIS TRAIL
        </span>
        <span className="text-[#183D2B]/70 font-semibold px-2 py-0.5 rounded bg-[#ECE8DD]">
          {nextStop.nextWalkDistance || '0.8 KM AWAY'} · {nextStop.nextWalkTime || '~11 MIN WALK'}
        </span>
      </div>

      {/* Card Preview */}
      <div className="p-4 rounded-2xl border border-[#183D2B]/15 bg-[#FAF8F3] hover:border-[#183D2B]/30 transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Thumbnail Photo */}
        <div className="relative w-full sm:w-28 h-28 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-[#183D2B]/15 bg-[#ECE8DD]">
          <Image
            src={nextStop.plateImage || '/images/active-trail/next_thumb.jpg'}
            alt={nextStop.name}
            fill
            sizes="(max-width: 640px) 100vw, 120px"
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-[#ECE8DD] text-[10px] font-mono font-bold text-[#183D2B] uppercase">
              {nextStopNum} — {nextStop.categoryTag || 'ART'}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#183D2B]/60">
              <Clock className="w-3 h-3" />
              {nextStop.estimatedMinutes || 15} MIN EXPLORATION
            </span>
          </div>

          <h4 className="text-base sm:text-lg font-serif font-bold text-[#183D2B] tracking-tight">
            {nextStop.name}
          </h4>

          <p className="text-xs text-[#183D2B]/75 line-clamp-2 mt-0.5 font-sans leading-relaxed">
            {nextStop.description}
          </p>

          <button
            onClick={onAdvance}
            className="mt-2 inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#183D2B] hover:text-[#E36A2E] tracking-wider uppercase transition-colors cursor-pointer"
          >
            <span>VIEW STOP DETAILS</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
