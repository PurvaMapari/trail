'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  ArrowRight,
  ArrowLeft,
  Pause,
  Play,
  Map,
  Search,
  Plus,
  Stamp,
  Clock,
  Check,
} from 'lucide-react';
import { mockTrails, RichTrail, DetailedStop } from '@/data/trails';
import { ActiveTrailHeader } from '@/components/trails/ActiveTrailHeader';
import { ActiveTrailLedger } from '@/components/trails/ActiveTrailLedger';
import { ActiveTrailCorridor } from '@/components/trails/ActiveTrailCorridor';
import { ActiveTrailNextUp } from '@/components/trails/ActiveTrailNextUp';
import {
  FieldNoteModal,
  TrailCompletionModal,
  TrailOverviewModal
} from '@/components/trails/ActiveTrailModals';


function getTrailStops(trail: RichTrail): DetailedStop[] {
  if (trail.detailedStops && trail.detailedStops.length > 0) {
    return trail.detailedStops;
  }
  const totalStops = trail.stops?.length || 4;
  const stepDist = trail.distanceKm ? (trail.distanceKm / totalStops).toFixed(1) : '0.8';
  return (trail.stops || []).map((s, idx) => {
    const dist = (idx * Number(stepDist)).toFixed(1);
    const elev = '+' + (idx * 4) + 'M';
    return {
      id: s.id,
      name: s.name,
      shortName: s.name,
      categoryTag: idx === 0 ? 'START' : idx === totalStops - 1 ? 'TERMINUS' : 'WAYPOINT',
      estimatedMinutes: s.estimatedMinutes || 20,
      locationLabel: s.location?.address || (trail.city || 'Panaji') + ' Historic Quarter',
      refCode: 'REF: ' + trail.id.slice(0, 3).toUpperCase() + '-0' + (idx + 1),
      plateTag: 'PLATE // 0' + (idx + 1),
      plateImage: idx === 0 ? trail.coverImage : idx === 1 ? '/images/active-trail/bookstore.jpg' : idx === 2 ? '/images/active-trail/next_thumb.jpg' : trail.heroImage || '/images/td-plate-04.jpg',
      distanceMarker: dist + ' KM',
      distanceKm: Number(dist),
      legLabel: 'STATION 0' + (idx + 1),
      bearing: ((idx * 70 + 40) % 360) + '°',
      corridorLabel: s.name + ' Corridor',
      surfaceType: 'Heritage Pavement',
      elevationChange: elev + ' → +' + ((idx + 1) * 4) + 'M GRADIENT',
      elevationProfile: elev,
      description: s.description,
      curatorClue: 'Notice the local architectural details and quiet courtyards near ' + s.name + '.',
      quarterContext: 'An essential sector in the curated discovery traverse of ' + trail.title + '.',
      nextWalkDistance: idx < totalStops - 1 ? stepDist + ' KM AWAY' : '0.0 KM',
      nextWalkTime: idx < totalStops - 1 ? '~' + Math.round(Number(stepDist) * 12) + ' MIN WALK' : 'TRAIL COMPLETED',
    };
  });
}

function ActiveTrailContent() {
  const searchParams = useSearchParams();
  const trailId = searchParams.get('trail') || 'hidden-cafes-panaji';

  // Find trail from mock data or custom session storage via lazy initial state
  const [trail] = useState<RichTrail>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored =
          window.sessionStorage.getItem('trail_' + trailId) ||
          (trailId.startsWith('custom') ? window.sessionStorage.getItem('last_custom_trail') : null);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.title) {
            return parsed;
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
    return mockTrails.find((t) => t.id === trailId) || mockTrails[0];
  });

  // Get active stops
  const stops: DetailedStop[] = getTrailStops(trail);

  // State
  // Default to station index 1 (Station 02: Independent Bookstore) to match Figma reference
  const [currentStopIndex, setCurrentStopIndex] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(1420); // ~23 mins into trail
  const [stampedStops, setStampedStops] = useState<Record<number, boolean>>({ 0: true, 1: true });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals
  const [isNoteModalOpen, setIsNoteModalOpen] = useState<boolean>(false);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState<boolean>(false);
  const [isOverviewModalOpen, setIsOverviewModalOpen] = useState<boolean>(false);

  // Field Notes State
  const [fieldNotes, setFieldNotes] = useState<
    Array<{ stopIndex: number; text: string; tag: string; timestamp: string }>
  >([
    {
      stopIndex: 0,
      text: 'Morning light in courtyard filtered through terracotta tiles. Wood-fired poee served piping hot.',
      tag: 'Atmosphere',
      timestamp: '08:42 AM',
    },
  ]);

  // Timer effect
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Toast auto-dismiss
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const currentStop = stops[currentStopIndex] || stops[0];
  const nextStop = stops[currentStopIndex + 1];
  const isLastStop = currentStopIndex === stops.length - 1;

  // Metric computations
  const totalStops = stops.length;
  const currentDist = currentStop.distanceKm || currentStopIndex * 0.8;
  const remainingDist = Math.max(0, trail.distanceKm - currentDist);
  const remainingMinutes = Math.max(
    15,
    Math.round(((totalStops - currentStopIndex) / totalStops) * trail.durationMinutes)
  );

  const handleNextStop = () => {
    if (isLastStop) {
      setIsCompletionModalOpen(true);
    } else {
      setCurrentStopIndex((prev) => prev + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
      setToastMessage(`Arrived at Station 0${currentStopIndex + 2}: ${stops[currentStopIndex + 1]?.name}`);
    }
  };

  const handlePreviousStop = () => {
    if (currentStopIndex > 0) {
      setCurrentStopIndex((prev) => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleStampLog = () => {
    setStampedStops((prev) => ({ ...prev, [currentStopIndex]: true }));
    setToastMessage(`Station 0${currentStopIndex + 1} stamped into Field Expedition Ledger!`);
  };

  const handleSaveFieldNote = (note: { text: string; tag: string; timestamp: string }) => {
    setFieldNotes((prev) => [...prev, { stopIndex: currentStopIndex, ...note }]);
    setToastMessage('Field note appended to expedition record.');
  };

  const currentNotes = fieldNotes.filter((n) => n.stopIndex === currentStopIndex);

  // Format timer
  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#F4F2EB] text-[#183D2B] pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-xl bg-[#183D2B] text-[#FAF8F3] text-xs font-mono tracking-wider shadow-xl flex items-center gap-2 border border-[#FAF8F3]/20 animate-fade-in">
          <Check className="w-4 h-4 text-[#E36A2E]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 space-y-6">
        {/* Section 1: Active Trail Header & 4 Metrics */}
        <ActiveTrailHeader
          trail={trail}
          currentStop={currentStop}
          currentStopIndex={currentStopIndex}
          totalStops={totalStops}
          remainingDistanceKm={remainingDist}
          estimatedRemainingMinutes={remainingMinutes}
        />

        {/* Section 2: Trail Progression Ledger */}
        <ActiveTrailLedger
          stops={stops}
          currentStopIndex={currentStopIndex}
          onSelectStop={(idx) => {
            setCurrentStopIndex(idx);
            setToastMessage(`Viewing Station 0${idx + 1}: ${stops[idx]?.name}`);
          }}
          totalElevation="+14M"
        />

        {/* Sticky/Floating Tactical HUD Control Bar */}
        <div className="sticky top-3 z-30 py-2.5 px-4 sm:px-6 rounded-2xl bg-[#FAF8F3]/95 backdrop-blur-md border border-[#183D2B]/15 shadow-md flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleNextStop}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-[#183D2B] hover:bg-[#183D2B]/90 text-[#FAF8F3] text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-xs cursor-pointer"
            >
              <span>{isLastStop ? 'COMPLETE TRAIL →' : 'CONTINUE TO NEXT STOP'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[#183D2B]/20 bg-[#ECE8DD]/60 hover:bg-[#ECE8DD] text-[#183D2B] text-xs font-mono font-semibold tracking-wider uppercase transition-all cursor-pointer"
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-[#E36A2E]" />
                  <span>RESUME ({formatTimer(elapsedSeconds)})</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#183D2B]" />
                  <span>PAUSE TRAIL</span>
                </>
              )}
            </button>

            {currentStopIndex > 0 && (
              <button
                onClick={handlePreviousStop}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-2.5 rounded-xl text-xs font-mono text-[#183D2B]/70 hover:text-[#183D2B] hover:bg-[#183D2B]/5 transition-all cursor-pointer"
                title="Previous Stop"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>PREV</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono">
            <button
              onClick={() => setIsOverviewModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-[#183D2B] hover:text-[#E36A2E] font-bold tracking-wider uppercase transition-colors cursor-pointer"
            >
              <Map className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">VIEW FULL TRAIL OVERVIEW</span>
              <span className="xs:hidden">OVERVIEW</span>
            </button>

            <span className="text-[#183D2B]/30">·</span>

            <Link
              href={`/trails/${trail.id}`}
              className="text-[#183D2B]/60 hover:text-[#183D2B] uppercase tracking-wider transition-colors"
            >
              END TRAIL
            </Link>
          </div>
        </div>

        {/* Section 3: Two-Column Discovery Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (7 cols): Current Station Dossier */}
          <div className="lg:col-span-7 space-y-4">
            {/* Station Header Metadata */}
            <div className="p-5 sm:p-6 rounded-2xl border border-[#183D2B]/15 bg-[#FAF8F3] space-y-4 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono tracking-wider">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-[#FAF8F3] border border-[#E36A2E] text-[#E36A2E] font-bold uppercase">
                    CURRENT STATION {String(currentStopIndex + 1).padStart(2, '0')} {'//'} {String(totalStops).padStart(2, '0')}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-[#ECE8DD] text-[#183D2B]/80 font-semibold uppercase">
                    {currentStop.categoryTag || 'BOOKS · CULTURE'}
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 text-[#183D2B]/70 font-mono">
                  <Clock className="w-3 h-3 text-[#4E6B48]" />
                  APPROX. {currentStop.estimatedMinutes || 25} MIN EXPLORATION
                </span>
              </div>

              {/* Station Title & Narrative */}
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#183D2B] tracking-tight">
                  {currentStop.name}
                </h2>
                <p className="mt-2 text-sm text-[#183D2B]/80 leading-relaxed font-sans">
                  {currentStop.description}
                </p>
              </div>

              {/* Main Station Photographic Plate */}
              <div className="relative w-full h-[280px] sm:h-[340px] rounded-xl overflow-hidden border border-[#183D2B]/15 bg-[#ECE8DD] shadow-inner group">
                <Image
                  src={currentStop.plateImage || '/images/active-trail/bookstore.jpg'}
                  alt={currentStop.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 650px"
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-102"
                />

                {/* Archival Overlay Badges */}
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-[#183D2B]/85 backdrop-blur-xs text-[10px] font-mono uppercase tracking-wider text-[#FAF8F3]">
                  {currentStop.locationLabel || 'RUA 31 DE JANEIRO, ALTO FONTAINHAS'}
                </div>

                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-[#183D2B]/85 backdrop-blur-xs text-[10px] font-mono tracking-widest text-[#FAF8F3]">
                  {currentStop.refCode || 'REF: FNT-BK-02'}
                </div>
              </div>

              {/* Field Curator Discovery Clue Callout */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#F4F6F0] border border-[#4E6B48]/20 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#183D2B] text-[#FAF8F3] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Search className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#183D2B] font-bold block">
                    FIELD CURATOR DISCOVERY CLUE
                  </span>
                  <p className="text-xs sm:text-sm text-[#183D2B]/90 italic font-serif leading-relaxed">
                    {`“${currentStop.curatorClue || 'Look for the unmarked cedar drawer behind the regional poetry section. The owner has preserved original hand-drawn nautical charts of the Mandovi estuary from 1954.'}”`}
                  </p>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleNextStop}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#183D2B] hover:bg-[#183D2B]/90 text-[#FAF8F3] text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-sm cursor-pointer"
                >
                  <span>{isLastStop ? 'FINISH EXPEDITION →' : 'CONTINUE TO NEXT STOP'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setIsNoteModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border border-[#183D2B]/20 bg-[#ECE8DD]/40 hover:bg-[#ECE8DD] text-[#183D2B] text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#4E6B48]" />
                  <span>ADD FIELD NOTE</span>
                </button>

                <button
                  onClick={handleStampLog}
                  className={`inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    stampedStops[currentStopIndex]
                      ? 'border-[#E36A2E] bg-[#E36A2E]/10 text-[#E36A2E]'
                      : 'border-[#183D2B]/20 bg-[#ECE8DD]/40 hover:bg-[#ECE8DD] text-[#183D2B]'
                  }`}
                >
                  <Stamp className="w-3.5 h-3.5" />
                  <span>{stampedStops[currentStopIndex] ? 'STAMPED ✓' : 'STAMP LOG'}</span>
                </button>
              </div>

              {/* Recorded Field Notes for this Stop */}
              {currentNotes.length > 0 && (
                <div className="mt-4 pt-4 border-t border-[#183D2B]/10 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#183D2B]/60 font-bold block">
                    RECORDED DISCOVERY NOTES ({currentNotes.length})
                  </span>
                  <div className="space-y-2">
                    {currentNotes.map((note, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-white/80 border border-[#183D2B]/10 text-xs flex items-start justify-between gap-3"
                      >
                        <div>
                          <span className="px-1.5 py-0.5 rounded bg-[#ECE8DD] text-[9px] font-mono uppercase font-bold text-[#183D2B] mr-2">
                            {note.tag}
                          </span>
                          <span className="text-[#183D2B]/85 font-sans">{note.text}</span>
                        </div>
                        <span className="text-[10px] font-mono text-[#183D2B]/50 shrink-0">
                          {note.timestamp}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Next Up Preview Card */}
            <ActiveTrailNextUp
              nextStop={nextStop}
              onAdvance={handleNextStop}
              isLastStop={isLastStop}
            />
          </div>

          {/* Right Column (5 cols): Cartographic Corridor & Topo */}
          <div className="lg:col-span-5 space-y-4">
            <ActiveTrailCorridor
              currentStop={currentStop}
              currentStopIndex={currentStopIndex}
              totalStops={totalStops}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <FieldNoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        currentStop={currentStop}
        onSaveNote={handleSaveFieldNote}
      />

      <TrailCompletionModal
        isOpen={isCompletionModalOpen}
        onClose={() => setIsCompletionModalOpen(false)}
        trail={trail}
        notesCount={fieldNotes.length}
      />

      <TrailOverviewModal
        isOpen={isOverviewModalOpen}
        onClose={() => setIsOverviewModalOpen(false)}
        trail={trail}
        stops={stops}
        onSelectStop={(idx) => setCurrentStopIndex(idx)}
      />
    </div>
  );
}

export default function ActiveTrailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F4F2EB] flex items-center justify-center p-8 text-center">
          <div className="space-y-3 font-mono text-xs text-[#183D2B]">
            <div className="w-8 h-8 rounded-full border-2 border-[#183D2B] border-t-transparent animate-spin mx-auto" />
            <p>INITIALIZING EXPEDITION TRAVERSAL...</p>
          </div>
        </div>
      }
    >
      <ActiveTrailContent />
    </Suspense>
  );
}
