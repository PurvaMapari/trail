'use client';

import React from 'react';
import { Star, MessageSquareQuote, CheckCircle, Users } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  trailTested: string;
}

const betaReviews: Testimonial[] = [
  {
    quote:
      'I have lived in Panaji for six years and walked past Café Bodega dozens of times without knowing the courtyard history behind it. TRAIL made an ordinary Sunday morning feel like a curated expedition.',
    author: 'Maya S.',
    role: 'Panaji Local & Architect',
    trailTested: 'Hidden Cafés of Panaji',
  },
  {
    quote:
      'Most navigation apps get you lost in narrow Latin Quarter stairways or steer you onto noisy roads. The walking cadence and shade notes here are spot on.',
    author: 'Vikram R.',
    role: 'Heritage Walk Lead',
    trailTested: 'Fontainhas Latin Quarter',
  },
  {
    quote:
      'Used TRAIL Scout to find a quiet reading spot with single-origin coffee. It suggested a hidden corner near Altinho that Google Maps never showed me.',
    author: 'Elena K.',
    role: 'Slow Travel Writer',
    trailTested: 'Altinho Hilltop & Vistas',
  },
];

export function SocialProof() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-[#183D2B]/10">
      {/* Top Banner & Pilot Metrics */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#183D2B]/5 border border-[#183D2B]/10 text-xs font-mono text-[#183D2B] mb-3">
          <Users className="w-3.5 h-3.5 text-[#E36A2E]" />
          <span>Panaji Pilot · Beta Community Data</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#183D2B]">
          Tested on Foot by Early Explorers
        </h2>
        <p className="mt-2 text-sm text-[#183D2B]/75 font-sans">
          Real feedback and field data collected from our ongoing Panaji community pilot walks.
        </p>
      </div>

      {/* Platform Pilot Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
        <div className="rounded-2xl border border-[#183D2B]/15 bg-white p-5 text-center shadow-sm">
          <span className="block font-mono text-2xl sm:text-3xl font-bold text-[#183D2B]">24+</span>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#183D2B]/60 mt-1 block">
            Curated Spots
          </span>
          <span className="text-[10px] text-[#4E6B48] font-mono mt-0.5 block">Panaji Historic Core</span>
        </div>

        <div className="rounded-2xl border border-[#183D2B]/15 bg-white p-5 text-center shadow-sm">
          <span className="block font-mono text-2xl sm:text-3xl font-bold text-[#183D2B]">100%</span>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#183D2B]/60 mt-1 block">
            Foot-Verified
          </span>
          <span className="text-[10px] text-[#4E6B48] font-mono mt-0.5 block">Zero Sponsored Spots</span>
        </div>

        <div className="rounded-2xl border border-[#183D2B]/15 bg-white p-5 text-center shadow-sm">
          <span className="block font-mono text-2xl sm:text-3xl font-bold text-[#183D2B]">4</span>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#183D2B]/60 mt-1 block">
            Living Quarters
          </span>
          <span className="text-[10px] text-[#4E6B48] font-mono mt-0.5 block">Latin, Riverside, Hilltop</span>
        </div>

        <div className="rounded-2xl border border-[#183D2B]/15 bg-white p-5 text-center shadow-sm">
          <span className="block font-mono text-2xl sm:text-3xl font-bold text-[#E36A2E]">4.9 / 5</span>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#183D2B]/60 mt-1 block">
            Beta Walker Rating
          </span>
          <span className="text-[10px] text-[#4E6B48] font-mono mt-0.5 block">Pilot Cohort 01</span>
        </div>
      </div>

      {/* Early Tester Reviews Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {betaReviews.map((item, idx) => (
          <div
            key={idx}
            className="rounded-3xl border border-[#183D2B]/15 bg-white/80 p-6 sm:p-7 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1 text-[#E36A2E] mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#E36A2E]" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[#183D2B]/85 font-sans leading-relaxed italic mb-6">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-[#183D2B]/10">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#183D2B]">{item.author}</h4>
                  <p className="text-[11px] text-[#183D2B]/60 font-sans">{item.role}</p>
                </div>
                <span className="text-[9px] font-mono uppercase bg-[#183D2B]/5 px-2 py-1 rounded text-[#183D2B]/70">
                  {item.trailTested}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Community Network Badges */}
      <div className="mt-12 text-center pt-8 border-t border-[#183D2B]/10">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#183D2B]/40 block mb-4">
          COMMUNITY & FIELD ROASTER NETWORK
        </span>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-[#183D2B]/60 uppercase tracking-wider">
          <span>☕ Independent Roasteries</span>
          <span>•</span>
          <span>📖 Heritage Bookstore Archive</span>
          <span>•</span>
          <span>🏺 Goan Pottery & Ceramic Guild</span>
          <span>•</span>
          <span>🚶 Latin Quarter Walkers</span>
        </div>
      </div>
    </section>
  );
}
