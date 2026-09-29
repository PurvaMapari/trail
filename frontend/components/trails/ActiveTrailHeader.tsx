'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Compass, Crosshair } from 'lucide-react';
import { RichTrail, DetailedStop } from '@/data/trails';

interface ActiveTrailHeaderProps {
  trail: RichTrail;
  currentStop: DetailedStop;
  currentStopIndex: number;
  totalStops: number;
  remainingDistanceKm: number;
  estimatedRemainingMinutes: number;
}

export function ActiveTrailHeader({
  trail,
  currentStop,
  currentStopIndex,
  totalStops,
  remainingDistanceKm,
  estimatedRemainingMinutes,
}: ActiveTrailHeaderProps) {
  const completedCount = currentStopIndex;
  const currentStationNumber = String(currentStopIndex + 1).padStart(2, '0');
  const totalStationsNumber = String(totalStops).padStart(2, '0');

  return (
    <div className="space-y-4">
      {/* Top Cartographic Telemetry Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-y-2 py-2 px-3 sm:px-4 bg-[#ECE8DD]/80 border border-[#183D2B]/10 rounded-lg text-[10px] sm:text-[11px] font-mono text-[#183D2B]/80 tracking-wider">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Link
            href={`/trails/${trail.id}`}
            className="inline-flex items-center gap-1 font-bold text-[#183D2B] hover:text-[#E36A2E] transition-colors mr-1 sm:mr-2"
            title="Return to Trail Details"
          >
            <ArrowLeft className="w-3 h-3" />
            <span className="hidden xs:inline">EXIT</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 font-bold text-[#E36A2E]">
            <span className="w-2 h-2 rounded-full bg-[#E36A2E] animate-pulse" />
            ACTIVE TRAIL · STATION {currentStationNumber} OF {totalStationsNumber} · IN PROGRESS
          </span>

          <span className="hidden md:inline text-[#183D2B]/40">·</span>

          <span className="hidden md:inline">
            SECTOR: {trail.localeLabel?.toUpperCase() || 'PANAJI'} ({currentStop.bearing || "15°29'N 73°49'E"})
          </span>

          <span className="hidden lg:inline text-[#183D2B]/40">·</span>

          <span className="hidden lg:inline">DATUM: WGS 84</span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 shrink-0 ml-auto">
          <span className="inline-flex items-center gap-1">
            <Crosshair className="w-3 h-3 text-[#4E6B48]" />
            ACCURACY ±1.8M
          </span>
          <span className="inline-flex items-center gap-1">
            <Compass className="w-3 h-3 text-[#4E6B48]" />
            BEARING: {currentStop.bearing || '310° NW'}
          </span>
        </div>
      </div>

      {/* Trail Title & Modality Badges */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pt-1">
        <div>
          <span className="block text-[11px] font-mono uppercase tracking-[0.2em] text-[#4E6B48] font-bold">
            URBAN DISCOVERY EXPEDITION
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#183D2B] tracking-tight mt-0.5">
            {trail.title}
          </h1>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <span className="px-3 py-1 rounded bg-[#EBF2EB] border border-[#183D2B]/20 text-[10px] font-mono font-bold tracking-wider text-[#183D2B] uppercase">
            WALKING TRAVERSE
          </span>
          <span className="px-3 py-1 rounded bg-[#ECE8DD] border border-[#183D2B]/10 text-[10px] font-mono font-semibold tracking-wider text-[#183D2B]/70 uppercase">
            FOOT ONLY
          </span>
        </div>
      </div>

      {/* 4-Metric Field Ledger Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1: Trail Stations */}
        <div className="p-3.5 sm:p-4 rounded-xl border border-[#183D2B]/15 bg-[#FAF8F3] flex flex-col justify-between">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#183D2B]/60 font-medium">
            TRAIL STATIONS
          </span>
          <div className="mt-1">
            <div className="text-xl sm:text-2xl font-bold font-mono text-[#183D2B]">
              {String(completedCount).padStart(2, '0')} / {totalStationsNumber}
            </div>
            <div className="text-[11px] text-[#183D2B]/70 mt-0.5 font-sans">
              {completedCount === 0
                ? 'At expedition trailhead'
                : completedCount === 1
                ? 'Station 01 completed'
                : `Station 0${completedCount} completed`}
            </div>
          </div>
        </div>

        {/* Metric 2: Distance Remaining */}
        <div className="p-3.5 sm:p-4 rounded-xl border border-[#183D2B]/15 bg-[#FAF8F3] flex flex-col justify-between">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#183D2B]/60 font-medium">
            DISTANCE REMAINING
          </span>
          <div className="mt-1">
            <div className="text-xl sm:text-2xl font-bold font-mono text-[#183D2B]">
              {remainingDistanceKm.toFixed(1)} KM
            </div>
            <div className="text-[11px] text-[#183D2B]/70 mt-0.5 font-sans">
              Total: {trail.distanceKm.toFixed(1)} km planned
            </div>
          </div>
        </div>

        {/* Metric 3: Time Remaining */}
        <div className="p-3.5 sm:p-4 rounded-xl border border-[#183D2B]/15 bg-[#FAF8F3] flex flex-col justify-between">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#183D2B]/60 font-medium">
            TIME REMAINING
          </span>
          <div className="mt-1">
            <div className="text-xl sm:text-2xl font-bold font-mono text-[#183D2B]">
              {estimatedRemainingMinutes} MIN
            </div>
            <div className="text-[11px] text-[#183D2B]/70 mt-0.5 font-sans">
              Estimated exploratory pace
            </div>
          </div>
        </div>

        {/* Metric 4: Current Cadence */}
        <div className="p-3.5 sm:p-4 rounded-xl border border-[#183D2B]/15 bg-[#FAF8F3] flex flex-col justify-between">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#183D2B]/60 font-medium">
            CURRENT CADENCE
          </span>
          <div className="mt-1">
            <div className="text-xl sm:text-2xl font-bold font-mono text-[#183D2B]">
              2.2 <span className="text-sm font-sans font-normal text-[#183D2B]/70">KM/H</span>
            </div>
            <div className="text-[11px] text-[#183D2B]/70 mt-0.5 font-sans">
              Attentive / meandering pace
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
