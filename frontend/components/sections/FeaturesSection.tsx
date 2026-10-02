'use client';

import React from 'react';
import { MapPin, Sun, Compass, Bot, CheckCircle2 } from 'lucide-react';

interface FeatureItem {
  icon: React.ReactNode;
  tag: string;
  title: string;
  benefit: string;
  detail: string;
}

const features: FeatureItem[] = [
  {
    icon: <MapPin className="w-5 h-5 text-[#E36A2E]" />,
    tag: 'HAND-CURATED WAYPOINTS',
    title: 'Verified on Foot by Locals',
    benefit: 'Never get misled by sponsored algorithm results or generic tourist traps.',
    detail: 'Every single cafe, printmaker, and panoramic lookout is walked and vetted for atmosphere, quality, and character.',
  },
  {
    icon: <Sun className="w-5 h-5 text-[#4E6B48]" />,
    tag: 'CADENCE & FLOW',
    title: 'Timed for Natural Light & Atmosphere',
    benefit: 'Arrive at the right place at the right moment.',
    detail: 'Routes are sequenced around golden-hour views, roaster brewing cycles, and shaded afternoon corridors.',
  },
  {
    icon: <Compass className="w-5 h-5 text-[#183D2B]" />,
    tag: 'TACTILE FIELD DOSSIERS',
    title: 'Rich Architectural & Historical Clues',
    benefit: 'Walk with deep appreciation for what lies behind every facade.',
    detail: 'Discover secret doorways, hand-painted ceramic tiles, and colonial courtyard trivia impossible to find on GPS apps.',
  },
  {
    icon: <Bot className="w-5 h-5 text-[#E36A2E]" />,
    tag: 'TRAIL SCOUT AI',
    title: 'Real-Time Spontaneous Customization',
    benefit: 'Get a tailored walking route created instantly for your exact mood and time.',
    detail: 'Powered by Gemini AI, TRAIL Scout listens to your schedule and vibes, stitching together a custom itinerary in seconds.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-[#183D2B]/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#4E6B48] font-bold mb-2">
            <span>Core Capabilities</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] leading-tight font-bold text-[#183D2B]">
            Built for Walkers, Not Commuters
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#183D2B]/75 font-sans max-w-xl">
            Everything you need to step away from crowded avenues and explore at a human pace.
          </p>
        </div>
        <span className="text-xs font-mono text-[#183D2B]/60">4 Built-in Foundations</span>
      </div>

      {/* 4 Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="rounded-3xl border border-[#183D2B]/15 bg-white p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#183D2B]/5 flex items-center justify-center mb-5">
                {f.icon}
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#183D2B]/50 font-bold block mb-1.5">
                {f.tag}
              </span>
              <h3 className="font-serif text-xl font-bold text-[#183D2B] mb-2 leading-tight">
                {f.title}
              </h3>
              <p className="text-xs font-sans text-[#183D2B]/85 font-medium leading-relaxed mb-3">
                {f.benefit}
              </p>
              <p className="text-xs font-sans text-[#183D2B]/65 leading-relaxed">
                {f.detail}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#183D2B]/10 flex items-center gap-1.5 text-[11px] font-mono text-[#4E6B48]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#E36A2E]" />
              <span>Tested in Panaji Pilot</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
