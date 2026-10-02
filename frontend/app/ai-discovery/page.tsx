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
import { generateTrail } from '@/lib/api';
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
        window.scrollTo({ top: 580, behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error('[AI Discovery] generateTrail failed:', err);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Trail synthesis failed. Please check your network and retry.'
      );
      setUiState('error');
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

    // Auto-synthesize immediately with the seed — don't wait for button click
    setUiState('loading');
    generateTrail({
      prompt: seed,
      locus: updatedCalibration.locus,
      timeHours: updatedCalibration.timeHours,
      tags: updatedCalibration.tags,
      maxDistanceKm: updatedCalibration.maxDistanceKm,
    }).then((trail) => {
      setSynthesizedTrail(trail);
      setUiState('success');
      setTimeout(() => window.scrollTo({ top: 580, behavior: 'smooth' }), 100);
    }).catch((err) => {
      setErrorMessage(err instanceof Error ? err.message : 'Unable to synthesize route. Please retry.');
      setUiState('error');
    });
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
          onSubmit={handleSynthesize}
          onSelectSeed={handleSelectSeed}
          isLoading={uiState === 'loading'}
        />

        {/* Card 02: Reconnaissance Parameters & Calibration */}
        <AICalibrationCard
          calibration={calibration}
          onChange={(updates) => setCalibration((prev) => ({ ...prev, ...updates }))}
          onReset={handleReset}
          onSynthesize={handleSynthesize}
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
          <>
            {synthesizedTrail.id === 'ai-quiet-hours-panaji' && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-amber-300/60 bg-amber-50/80 text-amber-800 text-xs font-mono">
                <span className="text-amber-500 text-base">⚠</span>
                <span>
                  <strong>DEMO MODE</strong> — Gemini API key not configured or invalid.
                  This is a hardcoded sample trail.{' '}
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-amber-900"
                  >
                    Get a free API key →
                  </a>
                  {' '}then paste it in <code className="bg-amber-100 px-1 rounded">backend/.env</code> and restart the backend.
                </span>
              </div>
            )}
            <AISynthesizedDossier
              trail={synthesizedTrail}
              onRegenerate={handleSynthesize}
              isRegenerating={false}
            />
          </>
        )}
      </main>

      {/* Field Desk Footer */}
      <FieldDeskFooter />
    </div>
  );
}
