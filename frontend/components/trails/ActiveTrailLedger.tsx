'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { DetailedStop } from '@/data/trails';

interface ActiveTrailLedgerProps {
  stops: DetailedStop[];
  currentStopIndex: number;
  onSelectStop: (index: number) => void;
  totalElevation?: string;
}

export function ActiveTrailLedger({
  stops,
  currentStopIndex,
  onSelectStop,
  totalElevation = '+14M',
}: ActiveTrailLedgerProps) {
  return (
    <div className="p-4 sm:p-5 rounded-2xl border border-[#183D2B]/15 bg-[#FAF8F3] shadow-xs">
      {/* Ledger Header */}
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-wider pb-3 border-b border-[#183D2B]/10">
        <span className="font-bold text-[#183D2B]/70 uppercase">
          TRAIL PROGRESSION LEDGER
        </span>
        <span className="text-[#183D2B]/60 font-semibold">
          TOTAL ROUTE ELEVATION: <span className="text-[#183D2B]">{totalElevation}</span>
        </span>
      </div>

      {/* Interactive Horizontal Timeline */}
      <div className="pt-5 pb-2 overflow-x-auto no-scrollbar">
        <div className="relative min-w-[580px] sm:min-w-0 flex items-center justify-between">
          {/* Background Track Line */}
          <div className="absolute top-[18px] left-[40px] right-[40px] h-[3px] bg-[#183D2B]/15 -z-0" />

          {/* Active Completed Progress Line */}
          <div
            className="absolute top-[18px] left-[40px] h-[3px] bg-[#183D2B] transition-all duration-500 -z-0"
            style={{
              width: stops.length > 1
                ? `${(currentStopIndex / (stops.length - 1)) * 100}%`
                : '0%',
              maxWidth: 'calc(100% - 80px)',
            }}
          />

          {stops.map((stop, idx) => {
            const isCompleted = idx < currentStopIndex;
            const isActive = idx === currentStopIndex;
            
            const stationNum = String(idx + 1).padStart(2, '0');
            const distanceLabel = stop.distanceMarker || `${(idx * 0.8).toFixed(1)} KM`;

            return (
              <button
                key={stop.id || idx}
                onClick={() => onSelectStop(idx)}
                className="relative z-10 flex flex-col items-center group text-center focus:outline-hidden cursor-pointer"
              >
                {/* Node Symbol */}
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? 'bg-[#183D2B] text-[#FAF8F3] shadow-xs'
                      : isActive
                      ? 'bg-[#FAF8F3] border-4 border-[#E36A2E] text-[#E36A2E] ring-4 ring-[#E36A2E]/20 shadow-md scale-110'
                      : 'bg-[#FAF8F3] border-2 border-[#183D2B]/20 text-[#183D2B]/40 group-hover:border-[#183D2B]/50'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : isActive ? (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#E36A2E]" />
                  ) : (
                    <span className="font-mono text-xs font-semibold">{stationNum}</span>
                  )}
                </div>

                {/* Subtext info */}
                <div className="mt-3 flex flex-col items-center">
                  {/* Distance / Station ref */}
                  <span
                    className={`font-mono text-[10px] tracking-wider uppercase ${
                      isActive
                        ? 'text-[#E36A2E] font-bold'
                        : isCompleted
                        ? 'text-[#183D2B]/80 font-medium'
                        : 'text-[#183D2B]/50'
                    }`}
                  >
                    {stationNum} {'//'} {distanceLabel}
                  </span>

                  {/* Stop Name */}
                  <span
                    className={`text-xs sm:text-sm font-semibold max-w-[110px] truncate mt-0.5 ${
                      isActive
                        ? 'text-[#183D2B] font-bold'
                        : isCompleted
                        ? 'text-[#183D2B]/80'
                        : 'text-[#183D2B]/60'
                    }`}
                  >
                    {stop.shortName || stop.name}
                  </span>

                  {/* Status Indicator Pill */}
                  <span
                    className={`text-[9px] font-mono uppercase tracking-widest mt-0.5 px-1.5 py-0.2 rounded ${
                      isActive
                        ? 'text-[#E36A2E] font-bold'
                        : isCompleted
                        ? 'text-[#183D2B]/50'
                        : idx === currentStopIndex + 1
                        ? 'text-[#4E6B48] font-medium'
                        : 'text-[#183D2B]/40'
                    }`}
                  >
                    {isCompleted
                      ? 'Completed'
                      : isActive
                      ? 'ACTIVE STOP'
                      : idx === currentStopIndex + 1
                      ? 'Next Up'
                      : idx === stops.length - 1
                      ? 'Terminus'
                      : 'Upcoming'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
