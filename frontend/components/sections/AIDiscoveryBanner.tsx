'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';

const SUGGESTIONS = [
  'Morning coffee & quiet bookshops',
  'Colonial heritage & street murals',
  'Sunset walk along Mandovi river',
  'Hidden courtyards & bakeries',
];

export function AIDiscoveryBanner() {
  const router = useRouter();
  const [promptText, setPromptText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (promptText.trim()) {
      router.push(`/ai-discovery?prompt=${encodeURIComponent(promptText.trim())}`);
    } else {
      router.push('/ai-discovery');
    }
  };

  const handleSelectSuggestion = (text: string) => {
    setPromptText(text);
    router.push(`/ai-discovery?prompt=${encodeURIComponent(text)}`);
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="rounded-3xl bg-[#112B1E] text-white p-6 sm:p-10 lg:p-14 relative overflow-hidden shadow-xl border border-[#183D2B]">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E36A2E]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4E6B48]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-white/90 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E36A2E]" />
            <span>AI Trail Discovery</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Want a trail tailored to your exact mood?
          </h2>

          <p className="mt-3 text-sm sm:text-base text-white/80 font-sans leading-relaxed max-w-2xl">
            Give TRAIL a neighborhood, a timeframe, or a vibe. Our scout will curate a walking itinerary connecting handpicked spots just for you.
          </p>

          {/* Search/Prompt Form */}
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Compass className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="e.g. 2 hours of quiet reading and strong espresso in Panaji..."
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-white/20 bg-white/10 text-xs sm:text-sm font-sans text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#E36A2E] backdrop-blur-sm transition-all"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#E36A2E] hover:bg-[#E36A2E]/90 text-white text-xs sm:text-sm font-mono uppercase tracking-wider font-bold shadow-md transition-all cursor-pointer shrink-0"
            >
              <span>Generate Route</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Idea Chips */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-mono text-white/70">
            <span className="text-[11px] uppercase tracking-wider text-white/40 mr-1">Try:</span>
            {SUGGESTIONS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleSelectSuggestion(item)}
                className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white/90 text-xs transition-colors cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
