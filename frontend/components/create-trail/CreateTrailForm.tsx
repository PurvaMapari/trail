'use client';

import React from 'react';
import {
  Navigation,
  Check,
  Plus,
  Info,
  RefreshCw,
  Target
} from 'lucide-react';

export interface CreateTrailFormState {
  startingPoint: string;
  geodeticCoord: string;
  selectedInterests: string[];
  durationMinutes: number;
  durationLabel: string;
  distanceKm: number;
  distanceLabel: string;
}

interface CreateTrailFormProps {
  formState: CreateTrailFormState;
  onChange: (updates: Partial<CreateTrailFormState>) => void;
  onOpenLocationPicker: () => void;
}

export function CreateTrailForm({
  formState,
  onChange,
  onOpenLocationPicker,
}: CreateTrailFormProps) {
  const interestsList = [
    { id: 'coffee', label: 'COFFEE & ROASTERIES' },
    { id: 'books', label: 'BOOKS & ARCHIVES' },
    { id: 'art', label: 'ART GALLERIES' },
    { id: 'colonial', label: 'COLONIAL CULTURE' },
    { id: 'nature', label: 'CANOPY NATURE' },
    { id: 'photo', label: 'PHOTOGRAPHY VISTAS' },
    { id: 'gems', label: 'HIDDEN GEMS' },
    { id: 'gastronomy', label: 'LOCAL GASTRONOMY' },
  ];

  const durationOptions = [
    { value: 30, num: '30', unit: 'MINUTES', sub: 'QUICK LOOP' },
    { value: 60, num: '1.0', unit: 'HOUR', sub: 'BALANCED RUN' },
    { value: 120, num: '2.0', unit: 'HOURS', sub: 'SELECTED' },
    { value: 180, num: '3+', unit: 'HOURS', sub: 'FULL VOYAGE' },
  ];

  const distanceOptions = [
    { value: 2.0, label: '2.0K', fullLabel: 'UP TO 2.0 KM', envelope: '1.9 KM EXPEDITION' },
    { value: 3.5, label: '3.5K', fullLabel: 'UP TO 3.5 KM', envelope: '3.2 KM EXPEDITION' },
    { value: 5.0, label: '5.0K', fullLabel: 'UP TO 5.0 KM', envelope: '4.8 KM EXPEDITION' },
    { value: 8.0, label: '8.0K', fullLabel: 'UP TO 8.0 KM', envelope: '7.5 KM EXPEDITION' },
  ];

  const toggleInterest = (label: string) => {
    const exists = formState.selectedInterests.includes(label);
    if (exists) {
      if (formState.selectedInterests.length > 1) {
        onChange({
          selectedInterests: formState.selectedInterests.filter((i) => i !== label),
        });
      }
    } else {
      onChange({
        selectedInterests: [...formState.selectedInterests, label],
      });
    }
  };

  return (
    <div className="space-y-5">
      {/* 01 // STARTING FROM */}
      <div className="p-4 sm:p-5 rounded-2xl border border-[#183D2B]/15 bg-[#FAF8F3] shadow-xs space-y-3">
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-wider">
          <span className="font-bold text-[#183D2B] uppercase">
            01 {'//'} STARTING FROM
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#ECE8DD] text-[#183D2B] font-semibold text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4E6B48]" />
            GPS LOCK
          </span>
        </div>

        {/* Location Input Box */}
        <div className="flex items-center justify-between gap-3 p-3 sm:p-3.5 rounded-xl border border-[#183D2B]/20 bg-white/70">
          <div className="flex items-center gap-2.5 min-w-0">
            <Navigation className="w-4 h-4 text-[#183D2B] shrink-0" />
            <input
              type="text"
              value={formState.startingPoint}
              onChange={(e) => onChange({ startingPoint: e.target.value })}
              className="bg-transparent font-serif font-bold text-sm sm:text-base text-[#183D2B] focus:outline-hidden w-full truncate"
              placeholder="Enter starting location..."
            />
          </div>

          <button
            type="button"
            onClick={onOpenLocationPicker}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#183D2B]/20 bg-[#ECE8DD]/60 hover:bg-[#ECE8DD] text-[10px] font-mono font-bold tracking-wider text-[#183D2B] uppercase transition-all shrink-0 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>CHANGE</span>
          </button>
        </div>

        {/* Sub-strip Geodetic Coord */}
        <div className="flex items-center justify-between text-[10px] font-mono text-[#183D2B]/60 pt-1">
          <span>GEODETIC COORD: {formState.geodeticCoord}</span>
          <span>DATUM: WGS 84</span>
        </div>
      </div>

      {/* 02 // WHAT ARE YOU INTO? */}
      <div className="p-4 sm:p-5 rounded-2xl border border-[#183D2B]/15 bg-[#FAF8F3] shadow-xs space-y-3">
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-wider">
          <span className="font-bold text-[#183D2B] uppercase">
            02 {'//'} WHAT ARE YOU INTO?
          </span>
          <span className="text-[#183D2B]/60 uppercase text-[10px]">
            MULTI-SELECT ACTIVE
          </span>
        </div>

        <p className="text-xs text-[#183D2B]/75 font-sans">
          Select one or more thematic filters to calibrate discovery anchors along the route.
        </p>

        {/* Chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          {interestsList.map((interest) => {
            const isSelected = formState.selectedInterests.includes(interest.label);
            return (
              <button
                type="button"
                key={interest.id}
                onClick={() => toggleInterest(interest.label)}
                className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${isSelected
                    ? 'bg-[#183D2B] text-[#FAF8F3] font-bold shadow-xs'
                    : 'bg-[#ECE8DD]/50 text-[#183D2B]/80 border border-[#183D2B]/20 hover:bg-[#ECE8DD] hover:border-[#183D2B]/40'
                  }`}
              >
                {isSelected ? (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                ) : (
                  <Plus className="w-3.5 h-3.5" />
                )}
                <span>{interest.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 03 // HOW MUCH TIME DO YOU HAVE? */}
      <div className="p-4 sm:p-5 rounded-2xl border border-[#183D2B]/15 bg-[#FAF8F3] shadow-xs space-y-3">
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-wider">
          <span className="font-bold text-[#183D2B] uppercase">
            03 {'//'} HOW MUCH TIME DO YOU HAVE?
          </span>
          <div className="flex items-center gap-1 bg-[#ECE8DD] px-2 py-0.5 rounded-lg border border-[#183D2B]/15">
            <button
              type="button"
              onClick={() => {
                const nextMins = Math.max(15, formState.durationMinutes - 15);
                const hours = Math.round((nextMins / 60) * 10) / 10;
                onChange({ durationMinutes: nextMins, durationLabel: `${hours} HOURS` });
              }}
              className="w-5 h-5 rounded bg-white/70 hover:bg-[#183D2B] hover:text-white text-[#183D2B] flex items-center justify-center font-mono font-bold text-xs transition-colors cursor-pointer shadow-2xs"
              title="Decrease time (-15 min)"
            >
              −
            </button>
            <span className="text-[#183D2B] font-bold text-xs font-mono px-1.5 min-w-[56px] text-center">
              {formState.durationMinutes} MIN
            </span>
            <button
              type="button"
              onClick={() => {
                const nextMins = Math.min(480, formState.durationMinutes + 15);
                const hours = Math.round((nextMins / 60) * 10) / 10;
                onChange({ durationMinutes: nextMins, durationLabel: `${hours} HOURS` });
              }}
              className="w-5 h-5 rounded bg-[#183D2B] text-white hover:bg-[#4E6B48] flex items-center justify-center font-mono font-bold text-xs transition-colors cursor-pointer shadow-2xs"
              title="Add time (+15 min)"
            >
              +
            </button>
          </div>
        </div>

        {/* Duration Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {durationOptions.map((opt) => {
            const isSelected = formState.durationMinutes === opt.value;
            return (
              <button
                type="button"
                key={opt.value}
                onClick={() =>
                  onChange({
                    durationMinutes: opt.value,
                    durationLabel: `${opt.num} ${opt.unit}`,
                  })
                }
                className={`relative p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${isSelected
                    ? 'border-[#183D2B] bg-[#EBF2EB]/50 shadow-xs ring-1 ring-[#183D2B]'
                    : 'border-[#183D2B]/15 bg-white/50 hover:bg-white hover:border-[#183D2B]/30'
                  }`}
              >
                {isSelected && (
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#E36A2E]" />
                )}
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#183D2B]">
                  {opt.num}
                </span>
                <span className="text-[10px] font-mono tracking-wider text-[#183D2B]/70 uppercase mt-0.5">
                  {opt.unit}
                </span>
                <span
                  className={`text-[9px] font-mono uppercase tracking-widest mt-1 ${isSelected ? 'text-[#E36A2E] font-bold' : 'text-[#183D2B]/50'
                    }`}
                >
                  {opt.sub}
                </span>
              </button>
            );
          })}
        </div>

        {/* Informational Callout */}
        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-[#ECE8DD]/60 text-[11px] text-[#183D2B]/80 font-sans">
          <Info className="w-3.5 h-3.5 text-[#4E6B48] shrink-0 mt-0.5" />
          <span>
            Optimal temporal budget for 3 to 4 leisurely, unhurried heritage checkpoints.
          </span>
        </div>
      </div>

      {/* 04 // HOW FAR DO YOU WANT TO GO? */}
      <div className="p-4 sm:p-5 rounded-2xl border border-[#183D2B]/15 bg-[#FAF8F3] shadow-xs space-y-3">
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-wider">
          <span className="font-bold text-[#183D2B] uppercase">
            04 {'//'} HOW FAR DO YOU WANT TO GO?
          </span>
          <div className="flex items-center gap-1 bg-[#ECE8DD] px-2 py-0.5 rounded-lg border border-[#183D2B]/15">
            <button
              type="button"
              onClick={() => {
                const nextDist = Math.max(1.0, Math.round((formState.distanceKm - 0.5) * 10) / 10);
                onChange({ distanceKm: nextDist, distanceLabel: `UP TO ${nextDist.toFixed(1)} KM` });
              }}
              className="w-5 h-5 rounded bg-white/70 hover:bg-[#183D2B] hover:text-white text-[#183D2B] flex items-center justify-center font-mono font-bold text-xs transition-colors cursor-pointer shadow-2xs"
              title="Decrease distance (-0.5 KM)"
            >
              −
            </button>
            <span className="text-[#183D2B] font-bold text-xs font-mono px-1.5 min-w-[50px] text-center">
              {formState.distanceKm.toFixed(1)} KM
            </span>
            <button
              type="button"
              onClick={() => {
                const nextDist = Math.min(15.0, Math.round((formState.distanceKm + 0.5) * 10) / 10);
                onChange({ distanceKm: nextDist, distanceLabel: `UP TO ${nextDist.toFixed(1)} KM` });
              }}
              className="w-5 h-5 rounded bg-[#183D2B] text-white hover:bg-[#4E6B48] flex items-center justify-center font-mono font-bold text-xs transition-colors cursor-pointer shadow-2xs"
              title="Add distance (+0.5 KM)"
            >
              +
            </button>
          </div>
        </div>

        {/* Distance Range Selector Pills (styled like Picture) */}
        <div className="grid grid-cols-4 gap-2">
          {distanceOptions.map((opt) => {
            const isSelected = Math.abs(formState.distanceKm - opt.value) < 0.1;
            return (
              <button
                type="button"
                key={opt.label}
                onClick={() =>
                  onChange({
                    distanceKm: opt.value,
                    distanceLabel: opt.fullLabel,
                  })
                }
                className={`py-2 px-3 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer text-center ${
                  isSelected
                    ? 'bg-[#183D2B] text-[#FAF8F3] shadow-xs'
                    : 'bg-[#ECE8DD] text-[#183D2B]/70 hover:bg-[#183D2B]/10'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Pace & Distance Subline (matching Picture) */}
        <div className="flex items-center justify-between text-[11px] text-[#183D2B]/75 font-mono px-0.5">
          <span className="flex items-center gap-1 font-medium">
            <span>🚶</span>
            <span>Up to {formState.distanceKm.toFixed(1)} KM</span>
          </span>
          <span className="text-[#183D2B]/60">~{Math.round(formState.distanceKm * 18)}m pace</span>
        </div>

        {/* Radial Envelope Detail Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#ECE8DD]/50 border border-[#183D2B]/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#183D2B]/10 flex items-center justify-center shrink-0">
              <Target className="w-5 h-5 text-[#183D2B]" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold text-[#183D2B] uppercase block">
                RADIAL ENVELOPE: {(formState.distanceKm * 0.9 + 0.1).toFixed(1)} KM EXPEDITION
              </span>
              <span className="text-[11px] text-[#183D2B]/70 font-sans block">
                Est. pedestrian perimeter with winding alleys and courtyards factored.
              </span>
            </div>
          </div>

          <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-[#183D2B]/10">
            <span className="text-[9px] font-mono uppercase text-[#183D2B]/60 block">
              PACE CADENCE
            </span>
            <span className="text-xs font-mono font-bold text-[#183D2B]">
              18 MIN / KM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
