'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Clock,
  Bookmark,
  RotateCcw,
  Check,
} from 'lucide-react';
import { RichTrail } from '@/data/trails';

interface AISynthesizedDossierProps {
  trail: RichTrail;
  onRegenerate: () => void;
  isRegenerating: boolean;
}

export function AISynthesizedDossier({
  trail,
  onRegenerate,
  isRegenerating,
}: AISynthesizedDossierProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const stops = trail.detailedStops || [];
  const durationHours = (trail.durationMinutes / 60).toFixed(1);

  const handleSave = () => {
    setIsSaved(!isSaved);
    setToastMessage(
      !isSaved
        ? 'Dossier saved to your offline expedition logbook.'
        : 'Dossier removed from saved trails.'
    );
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6 pt-4 animate-fade-in">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-xl bg-[#183D2B] text-[#FAF8F3] text-xs font-mono tracking-wider shadow-xl flex items-center gap-2 border border-[#FAF8F3]/20 animate-fade-in">
          <Check className="w-4 h-4 text-[#E36A2E]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Result Card Wrapper */}
      <div className="p-5 sm:p-7 rounded-2xl border border-[#183D2B]/15 bg-[#FAF8F3] shadow-xs space-y-6">
        {/* Top Status Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#183D2B]/10 text-[10px] sm:text-[11px] font-mono tracking-wider">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#EBF2EB] border border-[#183D2B]/20 text-[#183D2B] font-bold uppercase">
              SYNTHESIZED TRAVERSE DOSSIER
            </span>
            <span className="text-[#183D2B]/70">
              {trail.indexRef || 'REF: TR-GOA-2025-084'}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[#183D2B]/70">
            <span>LATENCY: 420MS</span>
            <span>·</span>
            <span className="text-[#4E6B48] font-bold">
              CARTOGRAPHIC CADENCE: OPTIMIZED
            </span>
          </div>
        </div>

        {/* Title & Archetype Header */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#183D2B] tracking-tight">
              {trail.title}
            </h2>
            <div className="text-xs sm:text-sm font-mono text-[#4E6B48] font-semibold mt-1 uppercase tracking-wider">
              {trail.subtitle || 'ROUTE ARCHETYPE: Coffee · Art · Hidden Street · Sunset Terminus'}
            </div>
          </div>

          {/* 4-Metric Grid */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 p-3 rounded-xl bg-white/70 border border-[#183D2B]/15 font-mono text-center shrink-0">
            <div>
              <span className="block text-[9px] text-[#183D2B]/60 uppercase">WAYPOINTS</span>
              <span className="text-base sm:text-lg font-bold text-[#183D2B]">
                {String(stops.length).padStart(2, '0')}
              </span>
            </div>
            <div>
              <span className="block text-[9px] text-[#183D2B]/60 uppercase">DISTANCE</span>
              <span className="text-base sm:text-lg font-bold text-[#183D2B]">
                {trail.distanceKm.toFixed(1)} <span className="text-[10px] font-normal">KM</span>
              </span>
            </div>
            <div>
              <span className="block text-[9px] text-[#183D2B]/60 uppercase">TIME DURATION</span>
              <span className="text-base sm:text-lg font-bold text-[#183D2B]">
                {durationHours} <span className="text-[10px] font-normal">HRS</span>
              </span>
            </div>
            <div>
              <span className="block text-[9px] text-[#183D2B]/60 uppercase">CADENCE</span>
              <span className="text-xs sm:text-sm font-bold text-[#E36A2E] uppercase">
                UNHURRIED
              </span>
            </div>
          </div>
        </div>

        {/* Traverse Topology Diagram */}
        <div className="p-4 sm:p-5 rounded-xl border border-[#183D2B]/15 bg-white/60 space-y-3">
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-wider">
            <span className="font-bold text-[#183D2B] uppercase">
              TRAVERSE TOPOLOGY DIAGRAM
            </span>
            <span className="text-[#183D2B]/70">
              ESTIMATED FOOT TRAVEL: 48 MIN · PAUSE DURATION: 72 MIN
            </span>
          </div>

          {/* Stepper Timeline */}
          <div className="pt-3 pb-2 overflow-x-auto no-scrollbar">
            <div className="relative min-w-[500px] flex items-center justify-between px-4">
              {/* Connecting Line */}
              <div className="absolute top-[14px] left-[30px] right-[30px] h-[2px] bg-[#183D2B]/20 -z-0" />

              {stops.map((stop, idx) => {
                const isLast = idx === stops.length - 1;
                const distanceLabel = stop.distanceMarker || `${(idx * 0.8).toFixed(1)} KM`;

                return (
                  <div key={stop.id || idx} className="relative z-10 flex flex-col items-center text-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-[10px] font-bold ${
                        isLast
                          ? 'bg-[#E36A2E] text-[#FAF8F3]'
                          : 'bg-[#183D2B] text-[#FAF8F3]'
                      }`}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <span className="text-xs font-semibold text-[#183D2B] mt-2 max-w-[100px] truncate">
                      {stop.shortName || stop.name}
                    </span>
                    <span className="text-[9px] font-mono text-[#183D2B]/50 mt-0.5">
                      {distanceLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Waypoint Log (Chronological Anchors) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-wider pt-2 border-t border-[#183D2B]/10">
            <span className="font-bold text-[#183D2B] uppercase">
              WAYPOINT LOG [CHRONOLOGICAL EXPEDITION ANCHORS]
            </span>
            <span className="text-[#183D2B]/60 uppercase">
              {stops.length} CHECKPOINTS CONSTRAINED
            </span>
          </div>

          <div className="space-y-3">
            {stops.map((stop, idx) => {
              const nodeNum = String(idx + 1).padStart(2, '0');

              return (
                <div
                  key={stop.id || idx}
                  className="p-4 sm:p-5 rounded-xl border border-[#183D2B]/15 bg-white/70 hover:border-[#183D2B]/30 transition-all flex flex-col md:flex-row items-start justify-between gap-4"
                >
                  {/* Left Station Content */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono tracking-wider">
                      <span className="px-2 py-0.5 rounded bg-[#183D2B] text-[#FAF8F3] font-bold uppercase">
                        {stop.plateTag || `${nodeNum} WAYPOINT`}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#ECE8DD] text-[#183D2B] font-semibold uppercase">
                        {stop.categoryTag || 'CULTURE'}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[#183D2B]/70">
                        <Clock className="w-3 h-3 text-[#4E6B48]" />
                        CALIBRATED TIME: ~{stop.estimatedMinutes || 25} MIN
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="text-base sm:text-lg font-serif font-bold text-[#183D2B]">
                        {stop.name}
                      </h4>
                      <span className="text-xs font-mono text-[#183D2B]/60">
                        {stop.elevationChange || `ALT: ${idx * 4 + 8}M`}
                      </span>
                    </div>

                    <p className="text-xs text-[#183D2B]/80 font-sans leading-relaxed">
                      {stop.description}
                    </p>

                    {/* Discovery Note Box */}
                    {stop.curatorClue && (
                      <div className="p-3 rounded-lg bg-[#F4F6F0] border border-[#4E6B48]/20 text-xs font-sans text-[#183D2B]/90">
                        <span className="font-mono text-[10px] font-bold text-[#183D2B] uppercase block mb-0.5">
                          DISCOVERY NOTE:
                        </span>
                        <span>{stop.curatorClue}</span>
                      </div>
                    )}
                  </div>

                  {/* Right Telemetry Column */}
                  <div className="w-full md:w-56 p-3 rounded-lg bg-[#ECE8DD]/50 border border-[#183D2B]/10 font-mono text-[10px] space-y-1.5 shrink-0">
                    <div className="text-[#183D2B]/80">
                      <span className="text-[#183D2B]/50 block text-[9px]">COORDINATES</span>
                      <span className="font-bold">{stop.bearing || "15°29'54\"N 73°49'41\"E"}</span>
                    </div>

                    <div className="text-[#183D2B]/80">
                      <span className="text-[#183D2B]/50 block text-[9px]">FOOT TRAFFIC</span>
                      <span className="font-semibold">
                        {idx === 0
                          ? 'QUIET (<10 P/H)'
                          : idx === 1
                          ? 'MINIMAL'
                          : idx === 2
                          ? 'SCATTERED LOCALS'
                          : 'DUSK SHORE (17:30)'}
                      </span>
                    </div>

                    <div className="text-[#183D2B]/80">
                      <span className="text-[#183D2B]/50 block text-[9px]">SURFACE</span>
                      <span className="font-semibold">
                        {stop.surfaceType || 'HERITAGE COBBLESTONE'}
                      </span>
                    </div>

                    <div className="pt-1">
                      <button
                        type="button"
                        className="w-full py-1 rounded bg-white/70 border border-[#183D2B]/20 hover:bg-[#183D2B] hover:text-[#FAF8F3] text-[9px] font-bold tracking-wider uppercase transition-colors"
                      >
                        EXPEDITION MAP PIN
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="pt-4 border-t border-[#183D2B]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href={`/active-trail?trail=${trail.id}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#183D2B] hover:bg-[#183D2B]/90 text-[#FAF8F3] text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-sm"
            >
              <span>START THIS TRAIL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href={`/trails/${trail.id}`}
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border border-[#183D2B]/20 bg-white/70 hover:bg-white text-[#183D2B] text-xs font-mono font-bold tracking-wider uppercase transition-all"
            >
              <span>VIEW COMPLETE TRAIL DETAILS</span>
            </Link>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <button
              type="button"
              onClick={onRegenerate}
              disabled={isRegenerating}
              className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-xl border border-[#183D2B]/20 text-[#183D2B] hover:bg-[#183D2B]/5 text-xs font-mono font-semibold tracking-wider uppercase transition-all cursor-pointer"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
              <span>REGENERATE ANOTHER TRAIL</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              className={`inline-flex items-center gap-1.5 px-3.5 py-3 rounded-xl border text-xs font-mono font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                isSaved
                  ? 'border-[#E36A2E] bg-[#E36A2E]/10 text-[#E36A2E]'
                  : 'border-[#183D2B]/20 text-[#183D2B] hover:bg-[#183D2B]/5'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{isSaved ? 'SAVED ✓' : 'SAVE TO MY TRAILS'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
