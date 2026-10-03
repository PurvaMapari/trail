'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

interface CreateTrailActionsProps {
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export function CreateTrailActions({
  onSubmit,
  isSubmitting = false,
}: CreateTrailActionsProps) {
  return (
    <div className="p-4 sm:p-5 rounded-2xl border border-[#183D2B]/15 bg-[#FAF8F3] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Left description */}
      <div className="space-y-1 max-w-xl">
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono font-bold text-[#183D2B] tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#E36A2E]" />
          <span>TRAIL SYNTHESIS PROTOCOL</span>
        </div>
        <p className="text-xs text-[#183D2B]/75 font-sans leading-relaxed">
          TRAIL AI will synthesize optimal pedestrian footpaths, verified opening hours, and hidden passageways for your selected parameters into a singular journey dossier.
        </p>
      </div>

      {/* Right buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
        {/* Let TRAIL Suggest -> navigates to existing /ai-discovery route */}
        <Link
          href="/ai-discovery"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-[#183D2B]/20 bg-[#ECE8DD]/50 hover:bg-[#ECE8DD] text-[#183D2B] text-xs font-mono font-bold tracking-wider uppercase transition-all text-center"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#4E6B48]" />
          <span>LET AI SUGGEST</span>
        </Link>

        {/* Primary Action Button */}
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#183D2B] hover:bg-[#183D2B]/90 disabled:opacity-50 text-[#FAF8F3] text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-sm cursor-pointer text-center"
        >
          {isSubmitting ? (
            <>
              <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              <span>SYNTHESIZING TRAIL...</span>
            </>
          ) : (
            <>
              <span>CREATE TRAIL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
