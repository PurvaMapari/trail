'use client';

import React from 'react';
import {
  ChevronUp,
  ChevronDown,
  X,
  Plus,
  ArrowDown
} from 'lucide-react';
import { DetailedStop } from '@/data/trails';

export interface DraftWaypoint extends DetailedStop {
  legWalkDistance?: string;
  legWalkTime?: string;
  legStreetName?: string;
}

interface WaypointSequenceProps {
  waypoints: DraftWaypoint[];
  startingPoint: string;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onRemove: (index: number) => void;
  onOpenAddModal: () => void;
  totalDistanceKm: number;
  totalDurationMinutes: number;
}

export function WaypointSequence({
  waypoints,
  startingPoint,
  onMoveUp,
  onMoveDown,
  onRemove,
  onOpenAddModal,
  totalDistanceKm,
  totalDurationMinutes,
}: WaypointSequenceProps) {
  const durationHours = Math.floor(totalDurationMinutes / 60);
  const durationMins = totalDurationMinutes % 60;
  const durationText =
    durationHours > 0
      ? `~${durationHours} HR ${durationMins > 0 ? `${durationMins} MIN` : ''}`
      : `~${durationMins} MIN`;

  return (
    <div className="space-y-4">
      {/* 05 // WAYPOINT SEQUENCE CARD */}
      <div className="p-4 sm:p-5 rounded-2xl border border-[#183D2B]/15 bg-[#FAF8F3] shadow-xs space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#183D2B]/10">
          <span className="font-bold text-[#183D2B] uppercase text-[10px] sm:text-[11px] font-mono tracking-wider">
            05 {'//'} WAYPOINT SEQUENCE
          </span>
          <span className="px-2 py-0.5 rounded bg-[#183D2B] text-[#FAF8F3] text-[9px] font-mono font-bold tracking-widest uppercase">
            LIVE ROUTE
          </span>
        </div>

        {/* Sub-strip metrics */}
        <div className="text-[10px] sm:text-[11px] font-mono tracking-wider text-[#183D2B]/80 font-semibold bg-[#ECE8DD]/60 px-3 py-1.5 rounded-lg flex flex-wrap items-center justify-between gap-2">
          <span>{String(waypoints.length).padStart(2, '0')} STOPS</span>
          <span>·</span>
          <span>EST. {totalDistanceKm.toFixed(1)} KM</span>
          <span>·</span>
          <span>{durationText}</span>
          <span>·</span>
          <span className="text-[#4E6B48]">FOOD & CULTURE</span>
        </div>

        {/* Stations Timeline */}
        <div className="space-y-2 pt-2 relative">
          {/* Departure Datum */}
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#183D2B] text-[#FAF8F3] flex items-center justify-center shrink-0 mt-0.5 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#FAF8F3]" />
            </div>
            <div className="flex-1 min-w-0 p-2.5 rounded-xl border border-[#183D2B]/10 bg-white/50">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#4E6B48] font-bold block">
                DEPARTURE DATUM (START)
              </span>
              <h4 className="font-serif font-bold text-xs sm:text-sm text-[#183D2B] truncate mt-0.5">
                {startingPoint.toUpperCase()}
              </h4>
            </div>
          </div>

          {/* Waypoint Nodes with Connecting Legs */}
          {waypoints.map((wp, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === waypoints.length - 1;
            const nodeNum = String(idx + 1).padStart(2, '0');

            // Default leg descriptions
            const walkDist = wp.legWalkDistance || '0.6 km';
            const walkTime = wp.legWalkTime || '8 min';
            const streetName =
              wp.legStreetName ||
              (idx === 0
                ? 'along Rua 31 de Janeiro'
                : idx === 1
                ? 'through Altinho Stairway'
                : idx === 2
                ? 'via Church Square'
                : 'along Dayanand Bandodkar Marg');

            return (
              <React.Fragment key={wp.id || idx}>
                {/* Connecting Leg Walk Badge */}
                <div className="ml-3 pl-5 border-l-2 border-dashed border-[#183D2B]/20 py-1.5 flex items-center gap-1.5 text-[10px] font-mono text-[#183D2B]/60">
                  <ArrowDown className="w-3 h-3 text-[#4E6B48]" />
                  <span>
                    {walkDist} · {walkTime} walk {streetName}
                  </span>
                </div>

                {/* Waypoint Card */}
                <div className="flex items-start gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-2 font-mono text-[10px] font-bold ${
                      isLast
                        ? 'bg-[#E36A2E] text-[#FAF8F3] ring-2 ring-[#E36A2E]/30'
                        : 'bg-[#183D2B] text-[#FAF8F3]'
                    }`}
                  >
                    {nodeNum}
                  </div>

                  <div className="flex-1 min-w-0 p-3 rounded-xl border border-[#183D2B]/15 bg-white/70 hover:border-[#183D2B]/30 transition-all">
                    {/* Top Row: Category + Duration + Action Buttons */}
                    <div className="flex items-center justify-between gap-2 pb-1">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-[#ECE8DD] text-[9px] font-mono font-bold text-[#183D2B] uppercase">
                          {wp.categoryTag || 'HERITAGE'}
                        </span>
                        <span className="text-[9px] font-mono text-[#183D2B]/60">
                          ~{wp.estimatedMinutes || 25} MIN {isLast ? 'TERMINUS' : 'EXPLORE'}
                        </span>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-0.5 shrink-0">
                        <button
                          type="button"
                          disabled={isFirst}
                          onClick={() => onMoveUp(idx)}
                          className="w-5 h-5 rounded flex items-center justify-center text-[#183D2B]/60 hover:text-[#183D2B] hover:bg-[#183D2B]/5 disabled:opacity-20 cursor-pointer"
                          title="Move up"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={isLast}
                          onClick={() => onMoveDown(idx)}
                          className="w-5 h-5 rounded flex items-center justify-center text-[#183D2B]/60 hover:text-[#183D2B] hover:bg-[#183D2B]/5 disabled:opacity-20 cursor-pointer"
                          title="Move down"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onRemove(idx)}
                          className="w-5 h-5 rounded flex items-center justify-center text-[#183D2B]/60 hover:text-[#E36A2E] hover:bg-[#E36A2E]/10 cursor-pointer ml-1"
                          title="Remove waypoint"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="font-serif font-bold text-sm sm:text-base text-[#183D2B] tracking-tight">
                      {wp.name}
                    </h4>

                    {/* Description */}
                    <p className="text-xs text-[#183D2B]/75 line-clamp-2 mt-0.5 font-sans leading-relaxed">
                      {wp.description}
                    </p>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Add Waypoint Button */}
        <button
          type="button"
          onClick={onOpenAddModal}
          className="w-full py-2.5 px-4 rounded-xl border border-dashed border-[#183D2B]/30 hover:border-[#183D2B] hover:bg-[#ECE8DD]/40 text-xs font-mono font-bold tracking-wider text-[#183D2B] uppercase transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
        >
          <Plus className="w-4 h-4 text-[#4E6B48]" />
          <span>+ PIN ANOTHER DISCOVERY / SEARCH WAYPOINT</span>
        </button>
      </div>

      {/* TERRAIN PROFILE // ELEVATION LEDGER */}
      <div className="p-4 sm:p-5 rounded-2xl border border-[#183D2B]/15 bg-[#FAF8F3] shadow-xs space-y-3">
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-wider">
          <span className="font-bold text-[#183D2B] uppercase">
            TERRAIN PROFILE {'//'} ELEVATION LEDGER
          </span>
          <span className="text-[#183D2B]/70 font-semibold">
            ASCENT +42M · DESCENT -38M
          </span>
        </div>

        {/* Elevation Area Graph */}
        <div className="relative rounded-lg overflow-hidden bg-[#EBF2EB]/50 border border-[#183D2B]/10 p-2.5">
          <svg
            className="w-full h-14"
            viewBox="0 0 320 56"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="createElevationGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4E6B48" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#4E6B48" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Area Fill */}
            <path
              d="M 0 48 Q 50 46, 90 38 T 160 20 T 240 14 Q 280 18, 320 48 L 320 56 L 0 56 Z"
              fill="url(#createElevationGrad)"
            />

            {/* Stroke Line */}
            <path
              d="M 0 48 Q 50 46, 90 38 T 160 20 T 240 14 Q 280 18, 320 48"
              fill="none"
              stroke="#183D2B"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Waypoint dots */}
            <circle cx="10" cy="48" r="3.5" fill="#183D2B" />
            <circle cx="90" cy="38" r="3.5" fill="#183D2B" />
            <circle cx="160" cy="20" r="4" fill="#183D2B" />
            <circle cx="280" cy="24" r="3.5" fill="#183D2B" />
            <circle cx="310" cy="48" r="4" fill="#E36A2E" />
          </svg>

          {/* Station labels under graph */}
          <div className="flex items-center justify-between text-[9px] font-mono text-[#183D2B]/60 mt-1 px-1">
            <span>START (0M)</span>
            <span className="font-bold text-[#183D2B]">ALTINHO CREST (+42M)</span>
            <span>RIVERSIDE (0M)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
