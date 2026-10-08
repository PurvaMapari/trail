'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import { AIDiscoveryHeader } from '@/components/ai-discovery/AIDiscoveryHeader';
import { AIIntentInput } from '@/components/ai-discovery/AIIntentInput';
import {
  AICalibrationCard,
  AICalibrationState
} from '@/components/ai-discovery/AICalibrationCard';
import { AISynthesizedDossier } from '@/components/ai-discovery/AISynthesizedDossier';
import { generateTrail, createCuratedTrail } from '@/lib/api';
import { RichTrail } from '@/data/trails';
import { AlertCircle } from 'lucide-react';

function AIDiscoveryContent() {
  const searchParams = useSearchParams();
  // Input State initialized to match the Figma reference
  const [prompt, setPrompt] = useState('');

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

  useEffect(() => {
    const qPrompt = searchParams.get('prompt');
    if (qPrompt && !prompt) {
      setPrompt(qPrompt);
      const lower = qPrompt.toLowerCase();
      if (lower.includes('coffee') || lower.includes('espresso')) {
        setCalibration((prev) => ({ ...prev, tags: ['Coffee', 'Books', 'Quiet'] }));
      } else if (lower.includes('art') || lower.includes('mural')) {
        setCalibration((prev) => ({ ...prev, tags: ['Art', 'Murals', 'Architecture'] }));
      } else if (lower.includes('sunset') || lower.includes('river')) {
        setCalibration((prev) => ({ ...prev, tags: ['Viewpoints', 'Sunset', 'River Walk'] }));
      }
    }
  }, [searchParams]);

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
    </div>
  );
}

export default function AIDiscoveryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F4F2EB] flex items-center justify-center p-8">
          <div className="flex items-center gap-3 text-xs font-mono text-[#183D2B]/70">
            <div className="w-4 h-4 rounded-full border-2 border-[#183D2B] border-t-transparent animate-spin" />
            <span>CALIBRATING SENSORS &amp; TELEMETRY...</span>
          </div>
        </div>
      }
    >
      <AIDiscoveryContent />
    </Suspense>
  );
}
