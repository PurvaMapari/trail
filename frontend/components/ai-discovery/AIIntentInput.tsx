'use client';

import React from 'react';
import { CornerDownLeft, Tag } from 'lucide-react';

interface AIIntentInputProps {
  prompt: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onSelectSeed: (seed: string) => void;
  isLoading: boolean;
}

export function AIIntentInput({
  prompt,
  onChange,
  onSubmit,
  onSelectSeed,
  isLoading,
}: AIIntentInputProps) {
  const seedIntents = [
    'A morning espresso, historic bookshop, and shady alley walk',
    'Contemporary local murals, pottery studio, and river sunset',
    'Quiet courtyard gardens, old colonial architecture, zero crowds',
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="p-4 sm:p-6 rounded-2xl border border-[#183D2B]/15 bg-[#FAF8F3] shadow-xs space-y-4">
      {/* Card Header */}
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-wider pb-1">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#183D2B] uppercase">
            01 {'//'} NATURAL LANGUAGE EXPEDITION INTENT
          </span>
          <span className="hidden sm:inline text-[#183D2B]/30">|</span>
          <span className="hidden sm:inline text-[#183D2B]/60 uppercase">
            PRE-TRAINED PEDESTRIAN TELEMETRY
          </span>
        </div>

        <button
          type="button"
          onClick={() => onSubmit()}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#ECE8DD] hover:bg-[#183D2B] hover:text-[#FAF8F3] text-[#183D2B] font-mono text-[10px] font-bold tracking-wider transition-all disabled:opacity-40 cursor-pointer"
        >
          <CornerDownLeft className="w-3 h-3" />
          <span>[ ⌘ ↵ ] ENTER TO SYNTHESIZE</span>
        </button>
      </div>

      {/* Large Input Area */}
      <div className="relative rounded-xl border border-[#183D2B]/20 bg-white/80 focus-within:border-[#183D2B] focus-within:ring-1 focus-within:ring-[#183D2B] transition-all p-3 sm:p-4">
        <textarea
          rows={3}
          value={prompt}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder="Describe your ideal walk — 'quiet coffee, some street art, and a riverside view by 5pm'"
          className="w-full bg-transparent font-serif italic text-base sm:text-xl lg:text-2xl text-[#183D2B] placeholder:text-[#183D2B]/30 focus:outline-hidden resize-none leading-relaxed disabled:opacity-60"
        />

        {/* Input Footer Telemetry */}
        <div className="flex items-center justify-between pt-2 border-t border-[#183D2B]/10 text-[10px] sm:text-[11px] font-mono">
          <div className="flex items-center gap-1.5 font-semibold">
            {prompt.trim() ? (
              <>
                <span className="w-2 h-2 rounded-full bg-[#E36A2E] animate-pulse" />
                <span className="text-[#E36A2E]">INTENT PARSER ACTIVE · LATENT CADENCE DETECTED</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-[#183D2B]/30" />
                <span className="text-[#183D2B]/40">AWAITING EXPEDITION INTENT...</span>
              </>
            )}
          </div>

          <span className="text-[#183D2B]/50">
            {prompt.length} CHARACTERS
          </span>
        </div>
      </div>

      {/* Seed Intents */}
      <div className="space-y-2 pt-1">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#183D2B]/60 font-bold block">
          SEED INTENTS FOR PANAJI URBAN MATRIX
        </span>

        <div className="flex flex-wrap gap-2">
          {seedIntents.map((seed, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => onSelectSeed(seed)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#183D2B]/15 bg-white/60 hover:bg-[#EBF2EB]/60 hover:border-[#183D2B]/40 text-xs text-[#183D2B]/85 font-sans transition-all cursor-pointer text-left"
            >
              <Tag className="w-3 h-3 text-[#4E6B48] shrink-0" />
              <span>{`“${seed}”`}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
