'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  MapPin,
  Clock,
  Compass,
  Footprints,
  Heart,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Info,
  RotateCcw,
  Check,
  ShieldCheck,
  ChevronDown,
  Layers,
  Shuffle,
  Calendar,
} from 'lucide-react';
import {
  CuratorPreferences,
  CuratorLocation,
  CuratorTime,
  CuratorInterest,
  CuratorMood,
  CuratorTravelStyle,
  PersonalizedTrail,
  CuratedTrailResult,
} from '@/types/curator';
import { curatePersonalizedTrailWithVariations } from '@/lib/curatorEngine';
import { InteractiveRouteMap } from '@/components/curator/InteractiveRouteMap';
import { CustomDropdown } from '@/components/ui/CustomDropdown';

const LOCATIONS: { value: CuratorLocation; label: string; sublabel: string }[] = [
  {
    value: 'Panaji (Fontainhas & Altinho)',
    label: 'Panaji (Fontainhas & Altinho Core)',
    sublabel: 'Historic Latin quarter, hillside stairs & artisan cafes',
  },
  {
    value: 'Fontainhas Latin Quarter',
    label: 'Fontainhas Latin Quarter',
    sublabel: 'Cobblestone alleyways, tiled facades & bakeries',
  },
  {
    value: 'Altinho Hilltop & Viewpoints',
    label: 'Altinho Hilltop & Viewpoints',
    sublabel: 'Panoramic estuary vistas, leafy villas & quiet chapels',
  },
  {
    value: 'Campal & Mandovi Waterfront',
    label: 'Campal & Mandovi Waterfront',
    sublabel: 'Riverside promenades, heritage trees & river breeze',
  },
  {
    value: 'Miramar Coastal Edge',
    label: 'Miramar Coastal Edge',
    sublabel: 'Ocean breezes, dune paths & sunset terminus points',
  },
];

const TIME_OPTIONS: { label: CuratorTime; hours: number }[] = [
  { label: '1 Hour', hours: 1 },
  { label: '2 Hours', hours: 2 },
  { label: '3 Hours', hours: 3 },
  { label: '4 Hours', hours: 4 },
];

const INTERESTS: { id: CuratorInterest; label: string; icon: string }[] = [
  { id: 'Art & Culture', label: 'Art & Culture', icon: '🎨' },
  { id: 'Coffee & Roasteries', label: 'Coffee & Roasteries', icon: '☕' },
  { id: 'Heritage Architecture', label: 'Heritage Architecture', icon: '🏛️' },
  { id: 'Books & Prints', label: 'Books & Prints', icon: '📖' },
  { id: 'Secret Courtyards', label: 'Secret Courtyards', icon: '🌿' },
  { id: 'Viewpoints & Vistas', label: 'Viewpoints & Vistas', icon: '🔭' },
  { id: 'Local Bakeries & Food', label: 'Local Bakeries & Food', icon: '🥐' },
];

const MOODS: { label: CuratorMood; desc: string; icon: string }[] = [
  { label: 'Curious', desc: 'Hidden alleys & artisan craft studios', icon: '🔍' },
  { label: 'Relaxed', desc: 'Slow coffee & peaceful shaded courtyards', icon: '☕' },
  { label: 'Contemplative', desc: 'Low noise corridors & quiet vantage points', icon: '🌿' },
  { label: 'Energetic', desc: 'Multi-quarter traverse with hill staircases', icon: '⚡' },
  { label: 'Romantic', desc: 'Golden-hour vistas & colonial pastel lanes', icon: '✨' },
];

const TRAVEL_STYLES: { label: CuratorTravelStyle; desc: string; cadence: string }[] = [
  { label: 'Walking', desc: 'Balanced pedestrian pace (~3.5 km/h)', cadence: 'Standard Walk' },
  { label: 'Slow Wanderer', desc: 'Extended dwell time at cafes & books', cadence: 'Deep Dwell' },
  { label: 'Photography Pace', desc: 'Scenic angles & golden hour timing', cadence: 'Visual Pace' },
  { label: 'Active Strider', desc: 'Brisk cadence & hill step climbs', cadence: 'Active Cadence' },
];

interface Preset {
  title: string;
  badge: string;
  preferences: CuratorPreferences;
}

const PRESETS: Preset[] = [
  {
    title: 'Panjim · 4h · Art+Culture · Curious · Walking',
    badge: 'Popular',
    preferences: {
      location: 'Panaji (Fontainhas & Altinho)',
      availableTime: '4 Hours',
      timeHours: 4,
      interests: ['Art & Culture', 'Coffee & Roasteries', 'Heritage Architecture'],
      mood: 'Curious',
      travelStyle: 'Walking',
    },
  },
  {
    title: 'Fontainhas · 2h · Coffee + Books · Relaxed',
    badge: 'Morning',
    preferences: {
      location: 'Fontainhas Latin Quarter',
      availableTime: '2 Hours',
      timeHours: 2,
      interests: ['Coffee & Roasteries', 'Books & Prints', 'Secret Courtyards'],
      mood: 'Relaxed',
      travelStyle: 'Slow Wanderer',
    },
  },
  {
    title: 'Altinho · 3h · Vistas + Heritage · Photography',
    badge: 'Sunset',
    preferences: {
      location: 'Altinho Hilltop & Viewpoints',
      availableTime: '3 Hours',
      timeHours: 3,
      interests: ['Viewpoints & Vistas', 'Heritage Architecture', 'Art & Culture'],
      mood: 'Contemplative',
      travelStyle: 'Photography Pace',
    },
  },
];

interface TrailCuratorStudioProps {
  initialPreferences?: Partial<CuratorPreferences>;
}

export function TrailCuratorStudio({ initialPreferences }: TrailCuratorStudioProps) {
  const router = useRouter();

  // Preferences State
  const [preferences, setPreferences] = useState<CuratorPreferences>({
    location: initialPreferences?.location || 'Panaji (Fontainhas & Altinho)',
    availableTime: initialPreferences?.availableTime || '4 Hours',
    timeHours: initialPreferences?.timeHours || 4,
    interests: initialPreferences?.interests || ['Art & Culture', 'Coffee & Roasteries', 'Heritage Architecture'],
    mood: initialPreferences?.mood || 'Curious',
    travelStyle: initialPreferences?.travelStyle || 'Walking',
    adaptationModifier: 'default',
  });

  // Processing & Output State
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [curationResult, setCurationResult] = useState<CuratedTrailResult | null>(null);
  const [activeTrailIndex, setActiveTrailIndex] = useState(0);
  const [activeStopIndex, setActiveStopIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showFullExplanation, setShowFullExplanation] = useState(true);

  const toggleInterest = (interest: CuratorInterest) => {
    setValidationError(null);
    setPreferences((prev) => {
      const exists = prev.interests.includes(interest);
      const next = exists
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: next };
    });
  };

  const handleApplyPreset = (preset: Preset) => {
    setValidationError(null);
    setPreferences(preset.preferences);
  };

  const handleCurateWithModifier = async (modifier?: 'default' | 'slower' | 'more-culture' | 'less-walking') => {
    const updatedPrefs = {
      ...preferences,
      adaptationModifier: modifier || preferences.adaptationModifier || 'default',
    };

    if (updatedPrefs.interests.length === 0) {
      setValidationError('Please select at least one interest to guide the trail curation.');
      return;
    }

    setValidationError(null);
    setIsProcessing(true);
    setProcessingStep(0);

    const stepTimer1 = setTimeout(() => setProcessingStep(1), 300);
    const stepTimer2 = setTimeout(() => setProcessingStep(2), 650);
    const stepTimer3 = setTimeout(() => setProcessingStep(3), 1050);

    try {
      const result = await curatePersonalizedTrailWithVariations(updatedPrefs);

      setTimeout(() => {
        setCurationResult(result);
        setActiveTrailIndex(0);
        setActiveStopIndex(0);
        setIsProcessing(false);

        // Smooth scroll to output
        setTimeout(() => {
          const el = document.getElementById('personalized-trail-output');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      }, 1300);
    } catch (err) {
      console.error('[TrailCurator] Error curating trail:', err);
      setIsProcessing(false);
      setValidationError('Unable to curate trail. Please verify your settings and retry.');
    }
  };

  const handleSaveTrail = () => {
    setIsSaved(!isSaved);
    setToastMessage(
      !isSaved
        ? 'Trail saved to your explorer logbook!'
        : 'Trail removed from saved collection.'
    );
    setTimeout(() => setToastMessage(null), 3000);
  };

  const activeTrail: PersonalizedTrail | null = curationResult
    ? activeTrailIndex === 0
      ? curationResult.primaryTrail
      : curationResult.alternativeTrails[activeTrailIndex - 1] || curationResult.primaryTrail
    : null;

  const handleStartTrail = () => {
    if (activeTrail) {
      router.push(`/active-trail?trail=${activeTrail.id}`);
    }
  };

  const allTrailVariations: PersonalizedTrail[] = curationResult
    ? [curationResult.primaryTrail, ...curationResult.alternativeTrails]
    : [];

  const processingStepsText = [
    `Scanning 24+ verified Panaji places across ${preferences.location}...`,
    `Filtering candidate spots for [${preferences.interests.slice(0, 2).join(' + ')}] with [${preferences.mood}] mood...`,
    `Sequencing walking corridor for [${preferences.travelStyle}] cadence...`,
    `Calibrating dwell times and walking transit for [${preferences.availableTime}]...`,
  ];

  return (
    <div className="w-full space-y-10">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-[#183D2B] text-white text-xs font-mono tracking-wider shadow-2xl flex items-center gap-2 border border-white/20 animate-in fade-in">
          <Check className="w-4 h-4 text-[#E36A2E]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── STEP 1: PREFERENCES STUDIO INPUT PANEL ── */}
      <div className="rounded-3xl border border-[#183D2B]/15 bg-white p-6 sm:p-10 shadow-sm relative overflow-hidden">
        {/* Header Ribbon & Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-7 border-b border-[#183D2B]/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#183D2B]/5 border border-[#183D2B]/10 text-xs font-mono text-[#183D2B] mb-2 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#E36A2E]" />
              <span>AI Trail Curator Studio</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#183D2B] tracking-tight">
              Personalize Your Walking Journey
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#183D2B]/75 font-sans max-w-2xl leading-relaxed">
              Define your schedule, mood, and movement cadence. Our engine analyzes 24+ vetted Panaji locations to build a concrete, foot-calibrated trail.
            </p>
          </div>

          <div className="flex items-center gap-2.5 text-xs font-mono text-[#183D2B]/70 shrink-0 bg-[#FAF8F3] px-4 py-2.5 rounded-2xl border border-[#183D2B]/10">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium">24+ Panaji Spots Active</span>
          </div>
        </div>

        {/* Quick Presets Strip */}
        <div className="pt-6 pb-2">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#183D2B]/50 font-bold">
              Curator Presets:
            </span>
            <span className="text-[10px] font-mono text-[#183D2B]/40 hidden sm:inline">
              Click to load signature preferences
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {PRESETS.map((p, idx) => {
              const isMatch =
                preferences.availableTime === p.preferences.availableTime &&
                preferences.mood === p.preferences.mood &&
                preferences.travelStyle === p.preferences.travelStyle;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all border cursor-pointer flex items-center gap-2 ${
                    isMatch
                      ? 'bg-[#183D2B] text-white border-[#183D2B] shadow-xs'
                      : 'bg-[#FAF8F3] hover:bg-white text-[#183D2B]/85 border-[#183D2B]/15 hover:border-[#183D2B]/40'
                  }`}
                >
                  <span className="font-medium truncate">{p.title}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                      isMatch
                        ? 'bg-[#E36A2E] text-white'
                        : 'bg-[#183D2B]/10 text-[#183D2B]/70'
                    }`}
                  >
                    {p.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Studio Form Controls */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCurateWithModifier('default');
          }}
          className="mt-6 space-y-7"
        >
          {/* Section 01 & 02: Region & Time Budget */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Custom Location Dropdown */}
            <div className="lg:col-span-6 space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#183D2B]/60 block">
                01 / EXPLORATION REGION
              </span>
              <CustomDropdown
                options={LOCATIONS.map((loc) => ({
                  value: loc.value,
                  label: loc.label,
                  sublabel: loc.sublabel,
                }))}
                value={preferences.location}
                onChange={(val) => setPreferences({ ...preferences, location: val })}
                icon={<MapPin className="w-4 h-4 text-[#E36A2E]" />}
              />
            </div>

            {/* Time Budget Selector */}
            <div className="lg:col-span-6 space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#183D2B]/60 block">
                02 / TEMPORAL BUDGET
              </span>
              <div className="grid grid-cols-4 gap-2">
                {TIME_OPTIONS.map((t) => {
                  const isSelected = preferences.availableTime === t.label;
                  return (
                    <button
                      key={t.label}
                      type="button"
                      onClick={() =>
                        setPreferences({
                          ...preferences,
                          availableTime: t.label,
                          timeHours: t.hours,
                        })
                      }
                      className={`h-12 px-2 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all border cursor-pointer flex flex-col items-center justify-center ${
                        isSelected
                          ? 'bg-[#183D2B] text-white border-[#183D2B] shadow-sm'
                          : 'bg-[#FAF8F3] hover:bg-white text-[#183D2B]/80 border-[#183D2B]/15 hover:border-[#183D2B]/40'
                      }`}
                    >
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 03: Sensory & Cultural Themes (Interests) */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#183D2B]/60 block">
                03 / SENSORY &amp; CULTURAL THEMES
              </span>
              <span className="text-[10px] font-mono text-[#183D2B]/50">
                {preferences.interests.length} selected
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {INTERESTS.map((item) => {
                const isSelected = preferences.interests.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleInterest(item.id)}
                    className={`h-10 px-4 rounded-xl text-xs font-mono transition-all border cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? 'bg-[#183D2B] text-white border-[#183D2B] shadow-xs font-semibold'
                        : 'bg-[#FAF8F3] hover:bg-white text-[#183D2B]/80 border-[#183D2B]/15 hover:border-[#183D2B]/40'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#E36A2E]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 04 & 05: Mood & Movement Cadence */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-1">
            {/* Mood Selector */}
            <div className="lg:col-span-6 space-y-2.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#183D2B]/60 block">
                04 / AMBIENT MOOD
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {MOODS.map((m) => {
                  const isSelected = preferences.mood === m.label;
                  return (
                    <button
                      key={m.label}
                      type="button"
                      onClick={() => setPreferences({ ...preferences, mood: m.label })}
                      className={`p-3 rounded-2xl text-left transition-all border cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#183D2B] text-white border-[#183D2B] shadow-sm'
                          : 'bg-[#FAF8F3] hover:bg-white text-[#183D2B] border-[#183D2B]/15 hover:border-[#183D2B]/40'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{m.icon}</span>
                        <span className="text-xs font-sans font-bold">{m.label}</span>
                      </div>
                      <span
                        className={`block text-[10px] font-sans mt-1 line-clamp-1 ${
                          isSelected ? 'text-white/70' : 'text-[#183D2B]/60'
                        }`}
                      >
                        {m.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Travel Style Selector */}
            <div className="lg:col-span-6 space-y-2.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#183D2B]/60 block">
                05 / MOVEMENT CADENCE
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TRAVEL_STYLES.map((s) => {
                  const isSelected = preferences.travelStyle === s.label;
                  return (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => setPreferences({ ...preferences, travelStyle: s.label })}
                      className={`p-3 rounded-2xl text-left transition-all border cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#183D2B] text-white border-[#183D2B] shadow-sm'
                          : 'bg-[#FAF8F3] hover:bg-white text-[#183D2B] border-[#183D2B]/15 hover:border-[#183D2B]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-sans font-bold">{s.label}</span>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-[#183D2B]/5 text-[#183D2B]/60'
                          }`}
                        >
                          {s.cadence}
                        </span>
                      </div>
                      <span
                        className={`block text-[10px] font-sans mt-1 line-clamp-1 ${
                          isSelected ? 'text-white/70' : 'text-[#183D2B]/60'
                        }`}
                      >
                        {s.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Validation Alert */}
          {validationError && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-mono flex items-center gap-2.5">
              <Info className="w-4 h-4 text-red-500 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Signature Summary Bar & Curate Action */}
          <div className="pt-3 border-t border-[#183D2B]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-[#183D2B]/65">
              Curator Parameters:{' '}
              <strong className="text-[#183D2B]">{preferences.location.split(' ')[0]}</strong> ·{' '}
              <strong className="text-[#183D2B]">{preferences.availableTime}</strong> ·{' '}
              <strong className="text-[#183D2B]">{preferences.mood}</strong> ·{' '}
              <strong className="text-[#183D2B]">{preferences.travelStyle}</strong>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#E36A2E] hover:bg-[#E36A2E]/90 text-white text-xs sm:text-sm font-mono uppercase tracking-wider font-bold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {isProcessing ? 'Curating Personalized Trail...' : 'Curate Personalized Trail'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* ── STEP 2: AI PROCESSING ANIMATION ── */}
      {isProcessing && (
        <div className="rounded-3xl border border-[#183D2B]/15 bg-[#FAF8F3] p-10 sm:p-14 text-center space-y-5 shadow-sm animate-pulse">
          <div className="w-14 h-14 rounded-full border-3 border-[#183D2B] border-t-[#E36A2E] animate-spin mx-auto" />
          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#E36A2E] font-bold block">
              AI TRAIL CURATOR PROCESSING
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#183D2B]">
              Constructing Your Personalized Route...
            </h3>
            <p className="text-xs sm:text-sm font-mono text-[#183D2B]/75 bg-white px-4 py-2 rounded-xl border border-[#183D2B]/10 inline-block shadow-xs">
              {processingStepsText[processingStep] || processingStepsText[0]}
            </p>
          </div>
        </div>
      )}

      {/* ── STEP 3: STRUCTURED PERSONALIZED TRAIL OUTPUT ── */}
      {activeTrail && !isProcessing && (
        <div
          id="personalized-trail-output"
          className="space-y-8 animate-in fade-in duration-500 scroll-mt-6"
        >
          {/* Alternative Variations Bar */}
          <div className="rounded-2xl border border-[#183D2B]/15 bg-white p-3 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#183D2B] font-bold">
                <Layers className="w-4 h-4 text-[#E36A2E]" />
                <span>AI CURATED VARIATIONS:</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {allTrailVariations.map((trail, vIdx) => {
                  const isCurrent = activeTrailIndex === vIdx;
                  return (
                    <button
                      key={vIdx}
                      type="button"
                      onClick={() => {
                        setActiveTrailIndex(vIdx);
                        setActiveStopIndex(0);
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all border cursor-pointer flex items-center gap-2 ${
                        isCurrent
                          ? 'bg-[#183D2B] text-white border-[#183D2B] shadow-xs'
                          : 'bg-[#FAF8F3] hover:bg-white text-[#183D2B]/80 border-[#183D2B]/15'
                      }`}
                    >
                      <span>{trail.variationLabel}</span>
                      {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-[#E36A2E]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Trail Dossier Card */}
          <div className="rounded-3xl bg-[#112B1E] text-white p-6 sm:p-10 shadow-xl border border-[#183D2B] space-y-7">
            {/* Top Match Score Pill & Status */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="px-3.5 py-1 rounded-full bg-[#E36A2E] text-white text-[11px] font-mono font-bold tracking-wider uppercase shadow-xs">
                  {activeTrail.matchScore}% Match
                </span>
                <span className="text-xs font-mono text-white/70">
                  {activeTrail.matchBreakdown}
                </span>
              </div>

              <span className="text-[11px] font-mono text-white/50 uppercase tracking-widest hidden sm:inline">
                CURATION: {activeTrail.variationLabel.toUpperCase()}
              </span>
            </div>

            {/* Title & Description */}
            <div className="max-w-3xl">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                {activeTrail.title}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-white/80 font-sans leading-relaxed">
                {activeTrail.shortDescription}
              </p>
            </div>

            {/* AI Personalization Rationale Card */}
            <div className="rounded-2xl bg-white/10 border border-white/15 p-5 text-xs font-sans space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#E36A2E] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Personalization Rationale</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowFullExplanation(!showFullExplanation)}
                  className="text-[10px] font-mono text-white/60 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <span>{showFullExplanation ? 'Hide Details' : 'View Details'}</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${
                      showFullExplanation ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              <p className="text-white/95 font-medium leading-relaxed">
                {activeTrail.aiExplanation.headline}
              </p>

              {showFullExplanation && (
                <div className="space-y-2.5 pt-2.5 border-t border-white/10 text-white/80 text-[11px] leading-relaxed">
                  <p>
                    •{' '}
                    <strong className="text-white">
                      {activeTrail.aiExplanation.moodAlignment}
                    </strong>
                  </p>
                  <p>
                    •{' '}
                    <strong className="text-white">
                      {activeTrail.aiExplanation.interestAlignment}
                    </strong>
                  </p>
                  <p>
                    •{' '}
                    <strong className="text-white">
                      {activeTrail.aiExplanation.paceAlignment}
                    </strong>
                  </p>
                  <p className="text-[#E36A2E] font-mono pt-1 text-[11px]">
                    {activeTrail.aiExplanation.curatorSummary}
                  </p>
                </div>
              )}
            </div>

            {/* Accurate Time Budget Validation Grid */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-3 font-mono">
              <div className="flex items-center justify-between text-[11px] text-white/70 border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#E36A2E]" />
                  <span className="font-bold text-white uppercase tracking-wider">
                    TIME BUDGET BREAKDOWN
                  </span>
                </div>
                <span className="text-[#E36A2E] font-semibold">
                  {activeTrail.timeBudget.budgetComparisonLabel}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="block text-[9px] text-white/50 uppercase">
                    Dwell Time (Stops)
                  </span>
                  <span className="text-base sm:text-lg font-bold text-white mt-0.5 block">
                    {activeTrail.timeBudget.totalDwellMinutes} min
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="block text-[9px] text-white/50 uppercase">
                    Walking Transit
                  </span>
                  <span className="text-base sm:text-lg font-bold text-white mt-0.5 block">
                    {activeTrail.timeBudget.totalWalkMinutes} min
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="block text-[9px] text-white/50 uppercase">
                    Total Duration
                  </span>
                  <span className="text-base sm:text-lg font-bold text-[#E36A2E] mt-0.5 block">
                    {activeTrail.timeBudget.totalDurationLabel}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="block text-[9px] text-white/50 uppercase">
                    Unused Buffer
                  </span>
                  <span className="text-base sm:text-lg font-bold text-emerald-400 mt-0.5 block">
                    {activeTrail.timeBudget.bufferMinutes} min
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-white/60 font-sans italic pt-1">
                ℹ {activeTrail.timeBudget.bufferExplanation}
              </p>
            </div>

            {/* Quick Actions & Adaptations Bar */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleStartTrail}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#E36A2E] hover:bg-[#E36A2E]/90 text-white text-xs font-mono uppercase tracking-wider font-bold shadow-md transition-all cursor-pointer"
                  >
                    <Footprints className="w-4 h-4" />
                    <span>Start Trail</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveTrail}
                    className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border text-xs font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                      isSaved
                        ? 'bg-white text-[#183D2B] border-white'
                        : 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                    <span>{isSaved ? 'Saved to Ledger' : 'Save Trail'}</span>
                  </button>
                </div>

                {/* Regenerate Action */}
                <button
                  type="button"
                  onClick={() => handleCurateWithModifier('default')}
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors cursor-pointer"
                >
                  <Shuffle className="w-3.5 h-3.5 text-[#E36A2E]" />
                  <span>Regenerate Trail</span>
                </button>
              </div>

              {/* Dynamic Modifiers */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10 text-xs font-mono">
                <span className="text-white/50 text-[10px] uppercase mr-1">
                  Quick Adaptations:
                </span>
                <button
                  type="button"
                  onClick={() => handleCurateWithModifier('slower')}
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>🐢</span>
                  <span>Make It Slower</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCurateWithModifier('more-culture')}
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>🎨</span>
                  <span>More Culture</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCurateWithModifier('less-walking')}
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>📍</span>
                  <span>Less Walking</span>
                </button>
              </div>
            </div>
          </div>

          {/* ── STEP 3B: INTERACTIVE ROUTE MAP ── */}
          <div className="space-y-3">
            <InteractiveRouteMap
              stops={activeTrail.recommendedStops}
              activeStopIndex={activeStopIndex}
              onSelectStop={(idx) => {
                setActiveStopIndex(idx);
                const el = document.getElementById(`stop-card-${idx}`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              locationLabel={activeTrail.preferences.location}
            />
          </div>

          {/* ── STEP 3C: NUMBERED CONNECTED STOPS TIMELINE ── */}
          <div className="rounded-3xl border border-[#183D2B]/15 bg-white p-6 sm:p-10 shadow-sm space-y-8">
            <div className="flex items-center justify-between border-b border-[#183D2B]/10 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#E36A2E] font-bold block mb-1">
                  ORDERED PEDESTRIAN TIMELINE
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#183D2B]">
                  Connected Waypoints &amp; Dwell Guidance
                </h3>
              </div>
              <span className="text-xs font-mono text-[#183D2B]/60 hidden sm:inline">
                {activeTrail.recommendedStops.length} Verified Stations
              </span>
            </div>

            {/* Timeline Corridor */}
            <div className="relative space-y-6 before:absolute before:inset-0 before:left-5 sm:before:left-7 before:w-0.5 before:bg-[#183D2B]/15 before:pointer-events-none">
              {activeTrail.recommendedStops.map((stop, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === activeTrail.recommendedStops.length - 1;
                const isActive = activeStopIndex === idx;

                return (
                  <div
                    key={stop.id}
                    id={`stop-card-${idx}`}
                    className={`relative pl-12 sm:pl-16 space-y-4 transition-all ${
                      isActive
                        ? 'opacity-100 ring-2 ring-[#E36A2E]/25 rounded-3xl p-1'
                        : 'opacity-95'
                    }`}
                    onClick={() => setActiveStopIndex(idx)}
                  >
                    {/* Numbered Node Badge */}
                    <div className="absolute left-0 top-0 w-10 sm:w-14 flex items-center justify-center">
                      <div
                        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center font-mono font-bold text-xs sm:text-sm shadow-sm z-10 transition-transform ${
                          isFirst
                            ? 'bg-[#183D2B] text-white ring-4 ring-[#183D2B]/10'
                            : isLast
                            ? 'bg-[#E36A2E] text-white ring-4 ring-[#E36A2E]/20'
                            : 'bg-[#FAF8F3] border-2 border-[#183D2B] text-[#183D2B]'
                        } ${isActive ? 'scale-110' : ''}`}
                      >
                        {String(stop.order).padStart(2, '0')}
                      </div>
                    </div>

                    {/* Stop Card */}
                    <div className="rounded-2xl border border-[#183D2B]/15 bg-[#FAF8F3] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
                        {/* Stop Data */}
                        <div className="lg:col-span-8 space-y-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#183D2B]/10 text-[#183D2B] text-[10px] font-mono font-bold uppercase tracking-wider">
                              {stop.categoryTag}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-[#4E6B48]/15 text-[#183D2B] text-[10px] font-mono font-semibold">
                              ⏱ {stop.dwellTimeLabel}
                            </span>

                            {/* Verified Badge */}
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-semibold">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              <span>{stop.verifiedStatus.vettedBy}</span>
                            </span>
                          </div>

                          <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#183D2B] leading-tight">
                            {stop.name}
                          </h4>

                          <p className="text-xs font-mono text-[#183D2B]/60">
                            {stop.address}
                          </p>

                          {/* Reason Selected for You Callout */}
                          <div className="p-3.5 rounded-xl bg-white border border-[#183D2B]/10 space-y-1">
                            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#E36A2E] font-bold">
                              <Sparkles className="w-3 h-3" />
                              <span>Reason Selected for You</span>
                            </div>
                            <p className="text-xs text-[#183D2B]/85 font-sans leading-relaxed">
                              {stop.whySelected}
                            </p>
                          </div>

                          {/* Curator Clue */}
                          <div className="flex items-start gap-2 text-xs text-[#183D2B]/75 font-sans italic pt-1">
                            <Info className="w-3.5 h-3.5 text-[#4E6B48] shrink-0 mt-0.5" />
                            <span>&ldquo;{stop.curatorClue}&rdquo;</span>
                          </div>

                          {/* Vibes tags */}
                          <div className="flex flex-wrap items-center gap-1.5 pt-2">
                            {stop.vibes.map((vibe, vIdx) => (
                              <span
                                key={vIdx}
                                className="px-2 py-0.5 rounded-md bg-white border border-[#183D2B]/10 text-[9px] font-mono text-[#183D2B]/70"
                              >
                                #{vibe}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Place Image */}
                        <div className="lg:col-span-4 relative h-40 sm:h-48 rounded-xl overflow-hidden bg-[#E7E3D7] border border-[#183D2B]/10">
                          <Image
                            src={stop.image}
                            alt={stop.name}
                            fill
                            sizes="(max-width: 1024px) 100vw, 33vw"
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-[9px] font-mono">
                            Waypoint {stop.order}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Between Stops: Walking Connection Connector */}
                    {!isLast && (
                      <div className="py-2 flex items-center gap-3 text-xs font-mono text-[#183D2B]/75 bg-white/80 border border-[#183D2B]/10 px-4 py-2.5 rounded-xl shadow-xs">
                        <Footprints className="w-4 h-4 text-[#E36A2E] shrink-0" />
                        <div>
                          <strong className="text-[#183D2B]">{stop.walkToNextLabel}</strong>
                          <span className="text-[#183D2B]/60 ml-2 hidden sm:inline">
                            {stop.walkToNextStreet}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
