'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Clock,
  Compass,
  Bookmark,
  Share2,
  Download,
  Check,
  ArrowRight,
  Info,
  Maximize2
} from 'lucide-react';
import { mockTrails, RichTrail } from '@/data/trails';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function TrailDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  // Resolve trail from mock data or custom generated trail via lazy initial state
  const [trail] = useState<RichTrail | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored =
          window.sessionStorage.getItem('trail_' + id) ||
          (id.startsWith('custom') ? window.sessionStorage.getItem('last_custom_trail') : null);
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
    const found = mockTrails.find((t) => t.id === id);
    if (found) return found;
    if (id === 'demo') return mockTrails[0];
    return null;
  });

  // Interactive UI states
  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isOfflineDownloaded, setIsOfflineDownloaded] = useState(false);
  const [activeStationIndex, setActiveStationIndex] = useState(0);

  // If trail not found in registry, show sensible Not Found state
  if (!trail) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center max-w-xl mx-auto space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#183D2B]/10 text-[#183D2B] flex items-center justify-center mb-4">
          <Compass className="w-8 h-8 text-[#4E6B48]" />
        </div>
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#E36A2E] font-bold block">
            TRAIL PROTOCOL {'//'} ARCHIVE 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#183D2B]">
            Trail Not Found in Registry
          </h1>
          <p className="text-sm text-[#183D2B]/75 font-sans leading-relaxed">
            The requested traverse identifier <code className="px-2 py-0.5 rounded bg-[#ECE8DD] font-mono text-xs text-[#183D2B] font-bold">{id}</code> could not be located in our active field ledgers.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#183D2B] hover:bg-[#4E6B48] text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors shadow-sm"
          >
            <span>EXPLORE ALL TRAILS</span>
            <ArrowRight className="w-4 h-4 text-[#E36A2E]" />
          </Link>
          <Link
            href="/create-trail"
            className="px-5 py-3 rounded-xl border border-[#183D2B]/20 bg-white/80 hover:bg-white text-xs font-mono uppercase tracking-wider font-semibold text-[#183D2B] transition-colors"
          >
            CREATE A TRAIL
          </Link>
          <Link
            href="/ai-discovery"
            className="px-5 py-3 rounded-xl border border-[#183D2B]/20 bg-[#ECE8DD]/60 hover:bg-[#ECE8DD] text-xs font-mono uppercase tracking-wider font-semibold text-[#183D2B] transition-colors"
          >
            TRY AI DISCOVERY
          </Link>
        </div>
      </div>
    );
  }

  const durationHours = (trail.durationMinutes / 60).toFixed(trail.durationMinutes % 60 === 0 ? 0 : 1);
  const categoryLabel = trail.categoryTags?.join(' · ') || trail.category.toUpperCase();

  // Share handler
  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  // Offline handler
  const handleOfflinePack = () => {
    setIsOfflineDownloaded(true);
    setTimeout(() => setIsOfflineDownloaded(false), 3000);
  };

  // Other trails for "More Trails to Explore"
  const otherTrails = mockTrails.filter((t) => t.id !== trail.id && t.id !== 'demo').slice(0, 3);

  // Fallback detailed stops if not explicitly present on non-featured trails
  const detailedStops = trail.detailedStops || trail.stops.map((s, idx) => ({
    id: s.id,
    name: s.name,
    categoryTag: trail.category.toUpperCase(),
    estimatedMinutes: s.estimatedMinutes || 25,
    locationLabel: `${trail.city.toUpperCase()} SECTOR 0${idx + 1}`,
    plateTag: `PLATE // 0${idx + 1}`,
    plateImage: trail.coverImage || '/images/explore-card-1.jpg',
    distanceMarker: idx === 0 ? '0.0 KM · START' : `+${(idx * 0.8).toFixed(1)} KM`,
    legLabel: `STATION 0${idx + 1}`,
    bearing: '042° NE',
    recommendedItem: 'LOCAL SPECIALTY & HISTORIC WALKING ROUTE',
    description: s.description,
    fieldNote: 'Tactile field observation verified by local resident explorers.',
  }));

  return (
    <div className="min-h-screen bg-[#F4F2EB] text-[#183D2B] pb-24">
      {/* 1. Top Bar / Breadcrumb Sub-Header */}
      <div className="border-b border-[#183D2B]/10 bg-[#FAF8F3]/90 backdrop-blur-sm sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#183D2B]/70">
          <div className="flex items-center gap-2 truncate">
            <Link
              href="/explore"
              className="inline-flex items-center gap-1.5 hover:text-[#183D2B] font-semibold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK TO EXPLORE</span>
            </Link>
            <span className="text-[#183D2B]/30 hidden sm:inline">/</span>
            <span className="text-[#183D2B]/80 truncate hidden sm:inline">
              {trail.city.toUpperCase()} &bull; URBAN TRAVERSE #{trail.orderBadge?.slice(0, 2) || '01'}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0 text-[10px] sm:text-xs">
            <span className="hidden md:inline">15°29&apos;N 73°49&apos;E &bull; DATUM: WGS 84</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#183D2B]/10 text-[#183D2B] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4E6B48] animate-pulse" />
              SECTOR VERIFIED
            </span>
          </div>
        </div>
      </div>

      {/* 2. Hero Section: Title, Dossier, Stats & Photography */}
      <section className="pt-8 sm:pt-12 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Dossier Details & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-[#183D2B]/10 text-[10px] font-mono font-bold uppercase tracking-wider text-[#183D2B]">
                TRAVERSE DOSSIER
              </span>
              <span className="px-2.5 py-1 rounded bg-[#4E6B48]/20 text-[10px] font-mono font-bold uppercase tracking-wider text-[#183D2B]">
                {categoryLabel}
              </span>
              <span className="px-2.5 py-1 rounded bg-[#183D2B]/5 text-[10px] font-mono uppercase tracking-wider text-[#183D2B]/60 hidden sm:inline">
                CURATED BY FIELD OFFICE 03
              </span>
            </div>

            {/* Index Ref */}
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#183D2B]/50 font-bold">
              {trail.indexRef || 'INDEX REF // GOA-PNJ-01'}
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-bold text-[#183D2B] tracking-tight leading-[1.08]">
              {trail.title}
            </h1>

            {/* Italic Quote Subtitle */}
            <p className="font-serif italic text-base sm:text-xl text-[#183D2B]/85 leading-relaxed">
              &ldquo;{trail.subtitle || trail.description}&rdquo;
            </p>

            {/* 5-Column Metrics Matrix Bar */}
            <div className="rounded-2xl border border-[#183D2B]/15 bg-white/80 p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 font-mono shadow-sm">
              <div>
                <span className="block text-[9px] uppercase tracking-wider text-[#183D2B]/50">
                  STOPS
                </span>
                <span className="text-sm sm:text-base font-bold text-[#183D2B]">
                  {trail.stops.length < 10 ? `0${trail.stops.length}` : trail.stops.length} Stations
                </span>
              </div>

              <div>
                <span className="block text-[9px] uppercase tracking-wider text-[#183D2B]/50">
                  DISTANCE
                </span>
                <span className="text-sm sm:text-base font-bold text-[#183D2B]">
                  {trail.distanceKm.toFixed(1)} Kilometers
                </span>
              </div>

              <div>
                <span className="block text-[9px] uppercase tracking-wider text-[#183D2B]/50">
                  ESTIMATED
                </span>
                <span className="text-sm sm:text-base font-bold text-[#183D2B]">
                  {durationHours} Hours
                </span>
              </div>

              <div>
                <span className="block text-[9px] uppercase tracking-wider text-[#183D2B]/50">
                  CADENCE
                </span>
                <span className="text-sm sm:text-base font-bold text-[#4E6B48]">
                  {trail.cadenceLabel || 'Slow Pace'}
                </span>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <span className="block text-[9px] uppercase tracking-wider text-[#183D2B]/50">
                  LOCALE
                </span>
                <span className="text-sm sm:text-base font-bold text-[#183D2B]">
                  {trail.localeLabel || `${trail.city}, Goa`}
                </span>
              </div>
            </div>

            {/* Primary Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={`/active-trail?trail=${trail.id}`}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#183D2B] hover:bg-[#4E6B48] text-white text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-sm text-center"
              >
                <Compass className="w-4 h-4 text-[#E36A2E]" />
                <span>START ACTIVE TRAIL</span>
              </Link>

              <button
                type="button"
                onClick={() => setIsSaved(!isSaved)}
                className={`inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl border text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  isSaved
                    ? 'bg-[#183D2B] text-white border-[#183D2B]'
                    : 'bg-white/80 border-[#183D2B]/20 text-[#183D2B] hover:bg-white'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{isSaved ? 'SAVED' : 'SAVE TRAIL'}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl border border-[#183D2B]/20 bg-white/80 text-[#183D2B] hover:bg-white text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-[#E36A2E]" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'LINK COPIED' : 'SHARE'}</span>
              </button>

              <button
                type="button"
                onClick={handleOfflinePack}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl border border-[#183D2B]/20 bg-white/80 text-[#183D2B] hover:bg-white text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isOfflineDownloaded ? 'PACK READY' : 'OFFLINE PACK'}</span>
              </button>
            </div>

            {/* Field Lead Notes */}
            <div className="pt-2 text-xs font-sans text-[#183D2B]/75 leading-relaxed flex items-start gap-2">
              <span className="font-mono font-bold uppercase text-[10px] text-[#183D2B]/50 shrink-0 mt-0.5">
                NOTES FROM FIELD LEAD:
              </span>
              <span>
                {trail.fieldLeadNotes ||
                  'Recommended start at early morning light to catch courtyard bakeries before midday humidity.'}
              </span>
            </div>
          </div>

          {/* Right Column: Hero Field Photography Plate */}
          <div className="lg:col-span-5 space-y-2">
            <div className="rounded-2xl border border-[#183D2B]/20 bg-white overflow-hidden shadow-sm">
              <div className="relative w-full aspect-[4/3] bg-[#E7E3D7]">
                <Image
                  src={trail.heroImage || trail.featuredImage || '/images/td-hero-capture.jpg'}
                  alt={trail.title}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Badges on photo */}
                <div className="absolute top-3 left-3 bg-[#183D2B]/90 text-white px-2.5 py-1 rounded text-[9px] font-mono font-bold uppercase tracking-wider">
                  FIELD CAPTURE // PNJ-01
                </div>
                <div className="absolute bottom-3 right-3 bg-white/95 text-[#183D2B] px-2.5 py-1 rounded text-[9px] font-mono font-bold uppercase tracking-wider shadow-sm">
                  FONTAINHAS LATIN QUARTER
                </div>
              </div>

              {/* Photo Caption Strip */}
              <div className="p-3 bg-[#FAF8F3] border-t border-[#183D2B]/10 flex items-center justify-between text-[10px] font-mono text-[#183D2B]/60">
                <span className="italic">Courtyard access via Rua 31 de Janeiro</span>
                <span>LAT 15.4989° N</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Connected Route Section (Interactive Stations Timeline & Elevation Grid) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-[#183D2B]/10">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between text-xs font-mono uppercase tracking-wider text-[#183D2B]/60 mb-6 gap-2">
          <div>
            <span className="text-[10px] block text-[#183D2B]/50 font-bold mb-0.5">
              CARTOGRAPHIC SCHEMA &bull; PEDESTRIAN PATH
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#183D2B]">
              The Connected Route
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#183D2B]/75 font-sans">
              A continuous {trail.distanceKm.toFixed(1)} km foot traverse connecting {detailedStops.length} local discoveries.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#E36A2E]" />
            <span>WAYPOINTS 01&ndash;0{detailedStops.length} &bull; MANDOVI DRAINAGE SECTOR</span>
          </div>
        </div>

        {/* The Stations Track Container */}
        <div className="rounded-2xl border border-[#183D2B]/15 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          {/* Top Stations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {detailedStops.map((stop, index) => {
              const isSelected = activeStationIndex === index;
              return (
                <div
                  key={stop.id}
                  onClick={() => setActiveStationIndex(index)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#E36A2E] bg-[#FAF8F3] shadow-sm ring-1 ring-[#E36A2E]/30'
                      : 'border-[#183D2B]/10 bg-transparent hover:border-[#183D2B]/30'
                  }`}
                >
                  <div className="text-[10px] font-mono text-[#183D2B]/50 uppercase tracking-wider font-bold mb-1 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[#E36A2E]">
                      <span className="w-4 h-4 rounded-full bg-[#183D2B] text-white flex items-center justify-center text-[9px]">
                        {index + 1}
                      </span>
                      {stop.distanceMarker || `+${(index * 0.8).toFixed(1)} KM`}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#183D2B] mb-1 leading-tight">
                    0{index + 1} {stop.name}
                  </h3>
                  <span className="block text-[11px] text-[#183D2B]/70 font-sans mb-3">
                    {stop.locationLabel}
                  </span>

                  <div className="flex items-center justify-between text-[10px] font-mono text-[#183D2B]/50 border-t border-[#183D2B]/10 pt-2 uppercase">
                    <span>{stop.legLabel || `STATION 0${index + 1}`}</span>
                    <span className="flex items-center gap-1 font-semibold text-[#183D2B]/70">
                      <Clock className="w-3 h-3 text-[#E36A2E]" />
                      {stop.estimatedMinutes} MIN
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Horizontal Route Progress Rail */}
          <div className="relative pt-6 pb-2 hidden md:block">
            {/* The Rail Line */}
            <div className="w-full h-1 bg-[#4E6B48]/30 rounded-full relative">
              <div
                className="h-full bg-[#183D2B] rounded-full transition-all duration-300"
                style={{ width: `${((activeStationIndex + 1) / detailedStops.length) * 100}%` }}
              />
            </div>

            {/* Mile Node Markers along Rail */}
            <div className="flex justify-between items-center -mt-2.5">
              {detailedStops.map((stop, index) => {
                const isSelected = activeStationIndex === index;
                return (
                  <button
                    key={stop.id}
                    onClick={() => setActiveStationIndex(index)}
                    className="flex flex-col items-center group cursor-pointer focus:outline-none"
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                        isSelected
                          ? 'border-[#E36A2E] bg-white ring-4 ring-[#E36A2E]/20 scale-125'
                          : 'border-[#183D2B] bg-[#FAF8F3] group-hover:border-[#E36A2E]'
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isSelected ? 'bg-[#E36A2E]' : 'bg-[#183D2B]'
                        }`}
                      />
                    </div>
                    <span className="text-[9px] font-mono text-[#183D2B]/60 mt-1 font-semibold">
                      {(index * 0.8).toFixed(1)} KM
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Interactive Field Map Quadrant Card */}
        <div className="mt-6 rounded-2xl border border-[#183D2B]/15 bg-[#ECE8DD]/50 p-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="max-w-md bg-white/95 rounded-xl border border-[#183D2B]/15 p-4 text-xs font-mono shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#183D2B]/50 block mb-1">
              MAP QUADRANT: PNJ-CENTRAL
            </span>
            <p className="text-[#183D2B]/85 font-sans leading-relaxed">
              Topographic gradient: +12m to +2m (Sea Level). Urban alleys, paved stone surface.
            </p>
            <span className="text-[9px] text-[#183D2B]/50 tracking-wider block mt-2">
              MAG DECL: -1.2°W &bull; SCALE 1:5,000
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[10px] font-mono text-[#183D2B]/60 uppercase">
              GPS LOCK: VALIDATED
            </span>
            <Link
              href={`/active-trail?trail=${trail.id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#183D2B] text-white text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#4E6B48] transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#E36A2E]" />
              <span>OPEN FULL GRID</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Stops Along the Trail (Alternating Plate Layout) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-[#183D2B]/10">
        <div className="mb-10">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#183D2B]/50 font-bold block mb-1">
            WAYPOINT CATALOG
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#183D2B]">
            Stops Along the Trail
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#183D2B]/75 font-sans">
            Take your time at each station. There is no rush to complete the path.
          </p>
        </div>

        {/* 4 Alternating Stop Cards */}
        <div className="space-y-8">
          {detailedStops.map((stop, index) => {
            const isPhotoLeft = index % 2 === 0;

            return (
              <div
                key={stop.id}
                className="rounded-2xl border border-[#183D2B]/15 bg-white overflow-hidden shadow-sm grid lg:grid-cols-12 items-center"
              >
                {/* Photo Plate (Left if even, Right if odd) */}
                <div
                  className={`lg:col-span-5 relative w-full aspect-[4/3] bg-[#E7E3D7] ${
                    isPhotoLeft ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <Image
                    src={stop.plateImage || `/images/td-plate-0${index + 1}.jpg`}
                    alt={stop.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#183D2B]/90 text-white px-2.5 py-1 rounded text-[9px] font-mono font-bold uppercase tracking-wider">
                    {stop.plateTag || `PLATE // 0${index + 1}`}
                  </div>
                </div>

                {/* Content Details (Right if even, Left if odd) */}
                <div
                  className={`lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-4 ${
                    isPhotoLeft ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div>
                    {/* Stop Header Tags */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#E36A2E]/15 text-[#E36A2E] font-bold uppercase">
                          STOP 0{index + 1} {'//'} {stop.distanceMarker || `+${(index * 0.8).toFixed(1)} KM`}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#183D2B]/10 text-[#183D2B] font-semibold uppercase">
                          {stop.categoryTag || 'CURATED'}
                        </span>
                      </div>

                      <span className="text-[#183D2B]/60 font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#E36A2E]" />
                        APPROX. {stop.estimatedMinutes} MIN
                      </span>
                    </div>

                    {/* Stop Title */}
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#183D2B] mb-1">
                      {stop.name}
                    </h3>
                    <span className="block text-[10px] font-mono text-[#183D2B]/50 uppercase tracking-wider mb-3">
                      LOC: {stop.locationLabel}
                    </span>

                    {/* Stop Description */}
                    <p className="text-xs sm:text-sm text-[#183D2B]/80 font-sans leading-relaxed mb-4">
                      {stop.description}
                    </p>

                    {/* Field Log Discovery Note Box */}
                    {stop.fieldNote && (
                      <div className="rounded-xl border border-[#183D2B]/10 bg-[#FAF8F3] p-4 text-xs font-sans text-[#183D2B]/85 space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#4E6B48] flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5" />
                          FIELD LOG DISCOVERY NOTE
                        </span>
                        <p className="italic text-[#183D2B]/80 pl-5">
                          &ldquo;{stop.fieldNote}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Stop Footer Info */}
                  <div className="pt-3 border-t border-[#183D2B]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] font-mono text-[#183D2B]/60 uppercase">
                    <span className="truncate">
                      RECOMMENDED: {stop.recommendedItem || 'REGIONAL ARTISAN COFFEE & SNACKS'}
                    </span>
                    <span className="font-semibold text-[#183D2B] shrink-0">
                      BEARING: {stop.bearing || '042° NE'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Trail at a Glance (8-Card Ledger Matrix) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-[#183D2B]/10">
        <div className="mb-6">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#183D2B]/50 font-bold block mb-1">
            FIELD LEDGER
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#183D2B]">
            Trail at a Glance
          </h2>
        </div>

        <div className="rounded-2xl border border-[#183D2B]/15 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          {/* 8 Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#FAF8F3] border border-[#183D2B]/10 font-mono">
              <span className="text-[9px] uppercase tracking-wider text-[#183D2B]/50 block mb-1">
                ROUTE STATIONS
              </span>
              <span className="text-lg font-bold text-[#183D2B] block">
                {detailedStops.length < 10 ? `0${detailedStops.length}` : detailedStops.length} Stops
              </span>
              <span className="text-[11px] text-[#183D2B]/60 font-sans">All stops foot-accessible</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8F3] border border-[#183D2B]/10 font-mono">
              <span className="text-[9px] uppercase tracking-wider text-[#183D2B]/50 block mb-1">
                TOTAL DISTANCE
              </span>
              <span className="text-lg font-bold text-[#183D2B] block">
                {trail.distanceKm.toFixed(1)} KM
              </span>
              <span className="text-[11px] text-[#183D2B]/60 font-sans">Continuous loop &amp; return</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8F3] border border-[#183D2B]/10 font-mono">
              <span className="text-[9px] uppercase tracking-wider text-[#183D2B]/50 block mb-1">
                ESTIMATED DURATION
              </span>
              <span className="text-lg font-bold text-[#183D2B] block">{durationHours} Hours</span>
              <span className="text-[11px] text-[#183D2B]/60 font-sans">Includes pause times</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8F3] border border-[#183D2B]/10 font-mono">
              <span className="text-[9px] uppercase tracking-wider text-[#183D2B]/50 block mb-1">
                CORE THEMES
              </span>
              <span className="text-lg font-bold text-[#183D2B] block">Food &bull; Culture &bull; Art</span>
              <span className="text-[11px] text-[#183D2B]/60 font-sans">Culinary &amp; human heritage</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8F3] border border-[#183D2B]/10 font-mono">
              <span className="text-[9px] uppercase tracking-wider text-[#183D2B]/50 block mb-1">
                DEPARTURE POINT
              </span>
              <span className="text-lg font-bold text-[#183D2B] block">
                {trail.departurePoint || 'Fontainhas Gate'}
              </span>
              <span className="text-[11px] text-[#183D2B]/60 font-sans">Near Old Secretariat</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8F3] border border-[#183D2B]/10 font-mono">
              <span className="text-[9px] uppercase tracking-wider text-[#183D2B]/50 block mb-1">
                WALKING CADENCE
              </span>
              <span className="text-lg font-bold text-[#183D2B] block">Slow / Unhurried</span>
              <span className="text-[11px] text-[#183D2B]/60 font-sans">Approx. 2.4 km/h pace</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8F3] border border-[#183D2B]/10 font-mono">
              <span className="text-[9px] uppercase tracking-wider text-[#183D2B]/50 block mb-1">
                TERRAIN PROFILE
              </span>
              <span className="text-lg font-bold text-[#183D2B] block">
                {trail.terrainProfile || 'Cobblestone / Flat'}
              </span>
              <span className="text-[11px] text-[#183D2B]/60 font-sans">Minor steps, smooth sidewalks</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8F3] border border-[#183D2B]/10 font-mono">
              <span className="text-[9px] uppercase tracking-wider text-[#183D2B]/50 block mb-1">
                OPTIMAL HOURS
              </span>
              <span className="text-lg font-bold text-[#183D2B] block">
                {trail.optimalHours || '08:30 AM or 16:30 PM'}
              </span>
              <span className="text-[11px] text-[#183D2B]/60 font-sans">Low heat, slanted lighting</span>
            </div>
          </div>

          {/* Accessibility & Index Footer */}
          <div className="pt-4 border-t border-[#183D2B]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] font-mono text-[#183D2B]/60">
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#4E6B48]" />
              Accessibility notice: Narrow sidewalks in Fontainhas; flat sneakers or walking shoes recommended.
            </span>
            <span className="uppercase font-semibold">INDEX ID: PNJ-TR-2025-01</span>
          </div>
        </div>
      </section>

      {/* 6. Ready to Follow the Trail? CTA Banner */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="rounded-3xl bg-[#112B1E] text-white p-8 sm:p-12 lg:p-14 border border-[#183D2B] flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-xl">
          <div className="max-w-2xl space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#E36A2E] font-bold block">
              EXPEDITION DISPATCH READY
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
              Ready to follow the trail?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
              Four stops. One route. A few things you probably wouldn&apos;t find by searching for them.
              Download route instructions and offline field notes before embarking.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0">
            <Link
              href={`/active-trail?trail=${trail.id}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#E36A2E] hover:bg-[#E36A2E]/90 text-white text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-md text-center"
            >
              <span>▷ START THIS TRAIL</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsSaved(!isSaved)}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer text-center"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{isSaved ? 'SAVED' : 'SAVE FOR LATER'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 6.5. Bottom CTA Banner */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="rounded-2xl bg-[#183D2B] text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#E36A2E] font-bold block">
              EXPEDITION ACTIVATION
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
              Ready to follow the trail?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
              Launch the active field navigation instrument to step through stations with live discovery notes, coordinates, and local clues.
            </p>
          </div>

          <div className="relative z-10 shrink-0 w-full sm:w-auto">
            <Link
              href={"/active-trail?trail=" + trail.id}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#E36A2E] hover:bg-[#E36A2E]/90 text-white text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-md text-center"
            >
              <Compass className="w-4 h-4" />
              <span>START ACTIVE TRAIL</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. More Trails to Explore Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-[#183D2B]/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#183D2B]/50 font-bold block mb-1">
              RELATED TRAVERSES
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#183D2B]">
              More Trails to Explore
            </h3>
            <p className="mt-1 text-xs text-[#183D2B]/75 font-sans">
              Continue discovering Panaji through connected local walks.
            </p>
          </div>

          <Link
            href="/explore"
            className="text-xs font-mono text-[#E36A2E] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>VIEW ALL PANAJI INDEX</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Related Trail Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {otherTrails.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-[#183D2B]/15 bg-white overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition-all"
            >
              {/* Photo Banner */}
              <div className="relative w-full aspect-[16/10] bg-[#E7E3D7] overflow-hidden">
                {item.coverImage && (
                  <Image
                    src={item.coverImage}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded text-[9px] font-mono font-bold uppercase tracking-wider text-[#183D2B] shadow-sm">
                  {item.categoryTags?.join(' · ') || item.category.toUpperCase()}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#183D2B]/50 block mb-1">
                    {item.indexRef || 'INDEX // 02'}
                  </span>
                  <h4 className="font-serif text-xl font-bold text-[#183D2B] mb-1.5 group-hover:text-[#E36A2E] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#183D2B]/75 font-sans line-clamp-2 mb-3">
                    {item.subtitle || item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#183D2B]/10">
                  <div className="text-[10px] font-mono text-[#183D2B]/60 uppercase tracking-wider flex items-center justify-between mb-4">
                    <span>{item.stops.length} STOPS &bull; {item.distanceKm.toFixed(1)} KM</span>
                    <span>{(item.durationMinutes / 60).toFixed(1)} HOURS</span>
                  </div>

                  <Link
                    href={`/trails/${item.id}`}
                    className="w-full inline-flex items-center justify-center py-2.5 rounded-xl border border-[#183D2B]/20 bg-[#FAF8F3] hover:bg-[#183D2B] hover:text-white text-xs font-mono uppercase tracking-wider font-semibold text-[#183D2B] transition-colors"
                  >
                    VIEW TRAIL
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
