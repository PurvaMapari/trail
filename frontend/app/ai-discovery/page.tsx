'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FieldDeskFooter } from '@/components/layout/FieldDeskFooter';
import { TrailCuratorStudio } from '@/components/curator/TrailCuratorStudio';
import { Sparkles, MapPin, Footprints, ShieldCheck } from 'lucide-react';
import { CuratorLocation, CuratorTime, CuratorMood, CuratorTravelStyle } from '@/types/curator';

function AIDiscoveryContent() {
  const searchParams = useSearchParams();
  const promptParam = searchParams.get('prompt') || '';

  // Parse prompt keywords if arriving from explore or hero
  let initialLocation: CuratorLocation = 'Panaji (Fontainhas & Altinho)';
  let initialInterests = ['Art & Culture', 'Coffee & Roasteries', 'Heritage Architecture'];
  let initialMood: CuratorMood = 'Curious';
  let initialTime: CuratorTime = '4 Hours';
  let initialTimeHours = 4;
  let initialStyle: CuratorTravelStyle = 'Walking';

  if (promptParam) {
    const q = promptParam.toLowerCase();
    if (q.includes('fontainhas')) initialLocation = 'Fontainhas Latin Quarter';
    if (q.includes('altinho')) initialLocation = 'Altinho Hilltop & Viewpoints';
    if (q.includes('campal')) initialLocation = 'Campal & Mandovi Waterfront';

    if (q.includes('coffee') || q.includes('cafe')) initialInterests.push('Coffee & Roasteries');
    if (q.includes('book') || q.includes('read')) initialInterests.push('Books & Prints');
    if (q.includes('mural') || q.includes('art')) initialInterests.push('Art & Culture');
    if (q.includes('sunset') || q.includes('view')) initialInterests.push('Viewpoints & Vistas');

    if (q.includes('relaxed') || q.includes('slow')) initialMood = 'Relaxed';
    if (q.includes('quiet') || q.includes('peaceful')) initialMood = 'Contemplative';

    if (q.includes('1 hour') || q.includes('1h')) {
      initialTime = '1 Hour';
      initialTimeHours = 1;
    } else if (q.includes('2 hour') || q.includes('2h')) {
      initialTime = '2 Hours';
      initialTimeHours = 2;
    } else if (q.includes('3 hour') || q.includes('3h')) {
      initialTime = '3 Hours';
      initialTimeHours = 3;
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F2EB] text-[#183D2B] flex flex-col">
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 w-full space-y-8">
        {/* Top Header Badge */}
        <div className="border-b border-[#183D2B]/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#183D2B]/5 border border-[#183D2B]/10 text-xs font-mono text-[#183D2B] mb-2 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#E36A2E]" />
              <span>AI Trail Curator · Panaji Studio</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#183D2B] tracking-tight">
              Personalized Walking Trail Generator
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#183D2B]/75 font-sans max-w-2xl">
              Turn your schedule, mood, and curiosities into a sequenced pedestrian itinerary. Verified against 24+ vetted Panaji locations with authentic dwell times and walking corridors.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-[#183D2B]/70 shrink-0">
            <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-xl border border-[#183D2B]/10">
              <Footprints className="w-3.5 h-3.5 text-[#E36A2E]" />
              <span>Pedestrian Cadence</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-xl border border-[#183D2B]/10">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4E6B48]" />
              <span>100% Foot-Verified</span>
            </span>
          </div>
        </div>

        {/* Trail Curator Studio Component */}
        <TrailCuratorStudio
          initialPreferences={{
            location: initialLocation,
            availableTime: initialTime,
            timeHours: initialTimeHours,
            interests: Array.from(new Set(initialInterests)),
            mood: initialMood,
            travelStyle: initialStyle,
          }}
        />
      </main>

      <FieldDeskFooter />
    </div>
  );
}

export default function AIDiscoveryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F4F2EB] flex items-center justify-center">
          <div className="text-xs font-mono text-[#183D2B]/60 uppercase">Loading AI Trail Curator...</div>
        </div>
      }
    >
      <AIDiscoveryContent />
    </Suspense>
  );
}
