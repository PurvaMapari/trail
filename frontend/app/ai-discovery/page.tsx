'use client';

import React, { useState } from 'react';
import { FieldDeskFooter } from '@/components/layout/FieldDeskFooter';
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

export default function AIDiscoveryPage() {
  // Input State initialized to match the Figma reference
  const [prompt, setPrompt] = useState('');

  // Calibration State
  const [calibration, setCalibration] = useState<AICalibrationState>({
    locus: 'Panaji, Goa',
    locusSub: 'Fontainhas / Latin Quarter Core',
    timeHours: 2.0,
    tags: ['Coffee', 'Art', 'Quiet'],
    maxDistanceKm: 5.0,
  });

  // UI Flow States: 'idle' | 'loading' | 'success' | 'error'
  const [uiState, setUiState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [synthesizedTrail, setSynthesizedTrail] = useState<RichTrail | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Note: auto-synthesis on load removed — user triggers generation via "Synthesize" button
  // to avoid consuming Gemini API quota on every page visit.


  const handleSynthesize = async (overridePrompt?: string) => {
    const activePrompt = overridePrompt ?? prompt;
    if (!activePrompt.trim()) {
      setErrorMessage('Please enter an expedition prompt or select a seed intent.');
      return;
    }

    setUiState('loading');
    setErrorMessage(null);

    try {
      const trail = await generateTrail({
        prompt: activePrompt,
        locus: calibration.locus,
        timeHours: calibration.timeHours,
        tags: calibration.tags,
        maxDistanceKm: calibration.maxDistanceKm,
      });

      setSynthesizedTrail(trail);
      setUiState('success');

      // Scroll smoothly to dossier result
      setTimeout(() => {
        const el = document.getElementById('dossier-result');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 520, behavior: 'smooth' });
        }
      }, 100);
    } catch (err) {
      console.error('[AI Discovery] generateTrail unexpected error:', err);
      const fallback = createCuratedTrail({
        prompt: activePrompt,
        tags: calibration.tags,
        timeHours: calibration.timeHours,
      });
      setSynthesizedTrail(fallback);
      setUiState('success');
    }
  };

  const handleSelectSeed = (seed: string) => {
    setPrompt(seed);
    setErrorMessage(null);

    // Build updated calibration based on seed keywords
    let updatedCalibration = calibration;
    if (seed.includes('espresso')) {
      updatedCalibration = { ...calibration, tags: ['Coffee', 'Books', 'Historic Alleys'], timeHours: 2.0 };
    } else if (seed.includes('murals')) {
      updatedCalibration = { ...calibration, tags: ['Murals', 'Pottery', 'River Sunset'], timeHours: 2.5 };
    } else if (seed.includes('courtyard')) {
      updatedCalibration = { ...calibration, tags: ['Courtyards', 'Colonial Heritage', 'Zero Crowds'], timeHours: 2.0 };
    }
    setCalibration(updatedCalibration);

    handleSynthesize(seed);
  };

  const handleReset = () => {
    setPrompt('');
    setCalibration({
      locus: 'Panaji, Goa',
      locusSub: 'Fontainhas / Latin Quarter Core',
      timeHours: 2.0,
      tags: ['Coffee', 'Art', 'Quiet'],
      maxDistanceKm: 5.0,
    });
    setSynthesizedTrail(null);
    setUiState('idle');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#F4F2EB] text-[#183D2B] flex flex-col">

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-16 space-y-6 w-full">
        {/* Header Ribbon & Heading */}
        <AIDiscoveryHeader />

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Card 01: Natural Language Intent */}
        <AIIntentInput
          prompt={prompt}
          onChange={(val) => {
            setPrompt(val);
            setErrorMessage(null);
          }}
          onSubmit={() => handleSynthesize()}
          onSelectSeed={handleSelectSeed}
          isLoading={uiState === 'loading'}
        />

        {/* Card 02: Reconnaissance Parameters & Calibration */}
        <AICalibrationCard
          calibration={calibration}
          onChange={(updates) => setCalibration((prev) => ({ ...prev, ...updates }))}
          onReset={handleReset}
          onSynthesize={() => handleSynthesize()}
          isLoading={uiState === 'loading'}
        />

        {/* Loading State Spinner */}
        {uiState === 'loading' && (
          <div className="p-12 rounded-2xl border border-[#183D2B]/15 bg-[#FAF8F3] text-center space-y-4 shadow-sm animate-pulse">
            <div className="w-12 h-12 rounded-full border-3 border-[#183D2B] border-t-transparent animate-spin mx-auto text-[#183D2B]" />
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#4E6B48] font-bold block">
                SYNTHESIZING HEURISTIC TRAVERSE...
              </span>
              <p className="text-sm font-serif italic text-[#183D2B]/80">
                Scanning Panaji Urban Matrix for [{calibration.tags.join(', ')}] with unhurried cadence...
              </p>
            </div>
          </div>
        )}

        {/* Synthesized Trail Result Dossier */}
        {uiState === 'success' && synthesizedTrail && (
          <div id="dossier-result" className="scroll-mt-6">
            <AISynthesizedDossier
              trail={synthesizedTrail}
              onRegenerate={() => handleSynthesize()}
              isRegenerating={false}
            />
          </div>
        )}
      </main>

      {/* Field Desk Footer */}
      <FieldDeskFooter />
    </div>
  );
}
