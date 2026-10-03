'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Compass,
  RotateCcw,
  X,
} from 'lucide-react';

export interface AICalibrationState {
  locus: string;
  locusSub: string;
  timeHours: number;
  tags: string[];
  maxDistanceKm: number;
}

interface AICalibrationCardProps {
  calibration: AICalibrationState;
  onChange: (updates: Partial<AICalibrationState>) => void;
  onReset: () => void;
  onSynthesize: () => void;
  isLoading: boolean;
}

export function AICalibrationCard({
  calibration,
  onChange,
  onReset,
  onSynthesize,
  isLoading,
}: AICalibrationCardProps) {
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');

  const timeOptions = [
    { label: '30M', value: 0.5 },
    { label: '1H', value: 1.0 },
    { label: '2.0H', value: 2.0 },
    { label: '3H+', value: 3.0 },
  ];

  const distanceOptions = [
    { label: '2.0K', value: 2.0 },
    { label: '3.5K', value: 3.5 },
    { label: '5.0K', value: 5.0 },
    { label: '8.0K', value: 8.0 },
  ];

  const locusOptions = [
    { locus: 'Panaji, Goa', locusSub: 'Fontainhas / Latin Quarter Core' },
    { locus: 'Panaji, Goa', locusSub: 'Altinho / Hilltop & Vistas' },
    { locus: 'Panaji, Goa', locusSub: 'Campal / Riverside Promenade' },
    { locus: 'Panaji, Goa', locusSub: 'Miramar / Coastal Waterfront' },
  ];

  const handleAddTag = () => {
    if (newTagInput.trim() && !calibration.tags.includes(newTagInput.trim())) {
      onChange({ tags: [...calibration.tags, newTagInput.trim()] });
      setNewTagInput('');
      setIsAddingTag(false);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    if (calibration.tags.length > 1) {
      onChange({ tags: calibration.tags.filter((t) => t !== tagToRemove) });
    }
  };

  return (
    <div className="p-4 sm:p-6 rounded-2xl border border-[#183D2B]/15 bg-[#FAF8F3] shadow-xs space-y-4">
      {/* Header */}
      <div className="text-[10px] sm:text-[11px] font-mono tracking-wider font-bold text-[#183D2B] uppercase pb-1">
        02 {'//'} TRAIL PREFERENCES
      </div>

      {/* 4 Calibration Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Col 1: Locus Center */}
        <div className="p-3.5 rounded-xl border border-[#183D2B]/15 bg-white/70 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#183D2B]/60 uppercase font-semibold">
            <span>STARTING LOCATION</span>
            <span className="text-[#4E6B48] font-bold">GOA</span>
          </div>

          <div className="my-2">
            <div className="flex items-center gap-1.5 font-serif font-bold text-sm sm:text-base text-[#183D2B]">
              <MapPin className="w-3.5 h-3.5 text-[#183D2B] shrink-0" />
              <span>{calibration.locus}</span>
            </div>
            <select
              value={calibration.locusSub}
              onChange={(e) => {
                const found = locusOptions.find((l) => l.locusSub === e.target.value);
                if (found) {
                  onChange({ locus: found.locus, locusSub: found.locusSub });
                }
              }}
              className="mt-1 w-full bg-[#ECE8DD]/60 hover:bg-[#ECE8DD] text-[11px] text-[#183D2B] font-sans rounded px-1.5 py-1 border border-[#183D2B]/15 focus:outline-hidden cursor-pointer"
            >
              {locusOptions.map((l) => (
                <option key={l.locusSub} value={l.locusSub}>
                  {l.locusSub}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Col 2: Time Budget */}
        <div className="p-3.5 rounded-xl border border-[#183D2B]/15 bg-white/70 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#183D2B]/60 uppercase font-semibold">
            <span>TIME BUDGET</span>
            <span className="text-[#183D2B]/80 font-bold">45M - 4H</span>
          </div>

          <div className="my-2">
            <div className="flex items-center gap-1.5">
              {timeOptions.map((opt) => {
                const isActive = calibration.timeHours === opt.value;
                return (
                  <button
                    type="button"
                    key={opt.label}
                    onClick={() => onChange({ timeHours: opt.value })}
                    className={`flex-1 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#183D2B] text-[#FAF8F3] shadow-xs'
                        : 'bg-[#ECE8DD] text-[#183D2B]/70 hover:bg-[#183D2B]/10'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
            <div className="text-[11px] text-[#183D2B]/70 font-sans mt-1">
              Includes 3 pause cadences
            </div>
          </div>
        </div>

        {/* Col 3: Waypoint Anchors */}
        <div className="p-3.5 rounded-xl border border-[#183D2B]/15 bg-white/70 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#183D2B]/60 uppercase font-semibold">
            <span>INTERESTS & VIBES</span>
            <span className="text-[#183D2B]/80 font-bold">
              {calibration.tags.length} SELECTED
            </span>
          </div>

          <div className="my-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {calibration.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#EBF2EB] border border-[#183D2B]/20 text-[11px] font-mono font-semibold text-[#183D2B]"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-[#E36A2E] cursor-pointer"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              ))}

              {isAddingTag ? (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                    placeholder="tag..."
                    className="w-16 px-1 py-0.5 text-[10px] font-mono border border-[#183D2B]/30 rounded bg-white"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="text-[10px] font-mono font-bold text-[#183D2B]"
                  >
                    OK
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAddingTag(true)}
                  className="text-[10px] font-mono text-[#4E6B48] font-bold hover:underline cursor-pointer"
                >
                  + ADD
                </button>
              )}
            </div>
            <div className="text-[11px] text-[#183D2B]/70 font-sans mt-1">
              Natural semantic anchors
            </div>
          </div>
        </div>

        {/* Col 4: Distance Envelope */}
        <div className="p-3.5 rounded-xl border border-[#183D2B]/15 bg-white/70 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#183D2B]/60 uppercase font-semibold">
            <span>MAX DISTANCE</span>
            <div className="flex items-center gap-1 bg-[#ECE8DD] px-2 py-0.5 rounded-lg border border-[#183D2B]/15">
              <button
                type="button"
                onClick={() =>
                  onChange({
                    maxDistanceKm: Math.max(1.0, Math.round((calibration.maxDistanceKm - 0.5) * 10) / 10),
                  })
                }
                className="w-5 h-5 rounded bg-white/70 hover:bg-[#183D2B] hover:text-white text-[#183D2B] flex items-center justify-center font-mono font-bold text-xs transition-colors cursor-pointer shadow-2xs"
                title="Decrease distance (-0.5 KM)"
              >
                −
              </button>
              <span className="text-[#183D2B] font-bold text-xs font-mono px-1 min-w-[46px] text-center">
                {calibration.maxDistanceKm.toFixed(1)} KM
              </span>
              <button
                type="button"
                onClick={() =>
                  onChange({
                    maxDistanceKm: Math.min(10.0, Math.round((calibration.maxDistanceKm + 0.5) * 10) / 10),
                  })
                }
                className="w-5 h-5 rounded bg-[#183D2B] text-white hover:bg-[#4E6B48] flex items-center justify-center font-mono font-bold text-xs transition-colors cursor-pointer shadow-2xs"
                title="Add distance (+0.5 KM)"
              >
                +
              </button>
            </div>
          </div>

          <div className="my-2 space-y-1.5">
            <div className="flex items-center gap-1.5">
              {distanceOptions.map((opt) => {
                const isActive = Math.abs(calibration.maxDistanceKm - opt.value) < 0.1;
                return (
                  <button
                    type="button"
                    key={opt.label}
                    onClick={() => onChange({ maxDistanceKm: opt.value })}
                    className={`flex-1 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#183D2B] text-[#FAF8F3] shadow-xs'
                        : 'bg-[#ECE8DD] text-[#183D2B]/70 hover:bg-[#183D2B]/10'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#183D2B]/70 font-sans">
              <span>🚶 Up to {calibration.maxDistanceKm.toFixed(1)} KM</span>
              <span className="font-mono text-[10px] text-[#4E6B48]">
                ~{Math.round(calibration.maxDistanceKm * 18)}m pace
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Ribbon & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#183D2B]/10 text-[10px] sm:text-[11px] font-mono">
        <div className="flex items-center gap-1.5 text-[#183D2B]/80">
          <span className="w-2 h-2 rounded-full bg-[#4E6B48]" />
          <span className="font-semibold">
            Ready · Building your personalized route in Panaji
          </span>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-[#183D2B]/70 hover:text-[#183D2B] hover:bg-[#183D2B]/5 font-mono text-xs uppercase transition-all cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>RESET PARAMETERS</span>
          </button>

          <button
            type="button"
            onClick={() => onSynthesize()}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#183D2B] hover:bg-[#183D2B]/90 disabled:opacity-50 text-[#FAF8F3] text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-sm cursor-pointer"
          >
            {isLoading ? (
              <>
                <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>SYNTHESIZING...</span>
              </>
            ) : (
              <>
                <Compass className="w-3.5 h-3.5" />
                <span>BUILD MY TRAIL →</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
