import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface StepItem {
  step: string;
  stage: string;
  title: string;
  desc: string;
  footer: string;
  href: string;
  isHighlighted?: boolean;
}

const steps: StepItem[] = [
  {
    step: '01',
    stage: 'STAGE // DISPATCH',
    title: 'Select Ambient Cadence',
    desc: 'Choose your geographic radius, temporal budget, and preferred sensory themes: roasters, independent print, botanical pathways, or architectural salvage.',
    footer: 'STEP 1 // INPUT PARAMETERS',
    href: '/ai-discovery',
  },
  {
    step: '02',
    stage: 'STAGE // SYNTHESIS',
    title: 'Receive Verified Dossier',
    desc: 'Download an offline-ready dossier: precise vector topographic lines, historical field notes, roaster brewing hours, and sensory cues for navigating without a screen.',
    footer: 'STEP 2 // OFFLINE DOSSIER',
    href: '/trails/demo',
  },
  {
    step: '03',
    stage: 'STAGE // WALK',
    title: 'Navigate by Living Landmarks',
    desc: 'Walk with tactile confidence. Use ambient heading guidance and physical waypoints rather than staring down at a digital blue turn vector.',
    footer: 'STEP 3 // FIELD DEPLOYMENT',
    href: '/active-trail',
    isHighlighted: true,
  },
  {
    step: '04',
    stage: 'STAGE // LEDGER',
    title: 'Inscribe in the Waypoint Ledger',
    desc: 'Record personal field observations, note seasonal changes, and submit subtle micro-discoveries to our living community cartographic registry.',
    footer: 'STEP 4 // REGISTRY ARCHIVE',
    href: '/create-trail',
  },
];

export function SolutionSection() {
  return (
    <section id="protocol" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#183D2B]/10 scroll-mt-20">
      {/* Top Tag */}
      <div className="flex flex-wrap items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#183D2B]/60 mb-6 gap-2">
        <span>03 // THE FOUR-STEP PROTOCOL</span>
        <span>FIELD GUIDE REF NO. 88</span>
      </div>

      <div className="mb-10 sm:mb-12">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] leading-tight font-bold text-[#183D2B]">
          From Topo Sheet to Trail Step.
        </h2>
        <p className="mt-3 max-w-2xl text-xs sm:text-sm text-[#183D2B]/70 font-sans leading-relaxed">
          A calm, reliable four-step cadence designed to disconnect you from algorithmic noise
          and re-engage your senses with the physical geography of your city.
        </p>
      </div>

      {/* 4 Protocol Step Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {steps.map((item) => (
          <Link
            key={item.step}
            href={item.href}
            className={`group rounded-2xl border bg-white/70 p-5 sm:p-6 flex flex-col justify-between shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 ${
              item.isHighlighted
                ? 'border-[#E36A2E]/50 ring-1 ring-[#E36A2E]/20'
                : 'border-[#183D2B]/20'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <span
                  className={`w-7 h-7 rounded flex items-center justify-center text-xs font-mono font-bold transition-transform group-hover:scale-105 ${
                    item.isHighlighted
                      ? 'bg-[#E36A2E] text-white'
                      : 'bg-[#183D2B] text-white'
                  }`}
                >
                  {item.step}
                </span>
                <span className="text-[10px] font-mono text-[#183D2B]/50 tracking-wider">
                  {item.stage}
                </span>
              </div>

              <h3 className="font-serif text-lg font-bold text-[#183D2B] mb-2 group-hover:text-[#E36A2E] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[#183D2B]/75 leading-relaxed font-sans">
                {item.desc}
              </p>
            </div>

            <div
              className={`mt-6 pt-4 border-t text-[10px] font-mono uppercase tracking-wider flex items-center justify-between ${
                item.isHighlighted
                  ? 'border-[#E36A2E]/20 text-[#E36A2E] font-bold'
                  : 'border-[#183D2B]/10 text-[#183D2B]/50 group-hover:text-[#183D2B]'
              }`}
            >
              <span>{item.footer}</span>
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
