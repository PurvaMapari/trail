'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, SlidersHorizontal, ArrowRight, Bookmark, Compass } from 'lucide-react';
import { mockTrails } from '@/data/trails';
import { TrailCard } from '@/components/trails/TrailCard';
import { TrailCategory } from '@/types/trail';

const categoriesList: { id: TrailCategory; label: string }[] = [
  { id: 'all', label: 'ALL' },
  { id: 'food', label: 'FOOD' },
  { id: 'art', label: 'ART' },
  { id: 'culture', label: 'CULTURE' },
  { id: 'nature', label: 'NATURE' },
  { id: 'hidden-gems', label: 'HIDDEN GEMS' },
];

const durationOptions = ['Any Time', '30 Min', '1 Hour', '2 Hours', '3+ Hours'];
const radiusOptions = ['Nearby', '2 KM', '5 KM', '10 KM'];

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TrailCategory>('all');
  const [selectedDuration, setSelectedDuration] = useState('Any Time');
  const [selectedRadius, setSelectedRadius] = useState('Nearby');
  const [isSavedFeatured, setIsSavedFeatured] = useState(false);

  // Filter unique public trails (exclude the duplicate demo alias from the grid)
  const baseTrails = useMemo(() => {
    return mockTrails.filter((t) => t.id !== 'demo');
  }, []);

  // Filtered trails list based on search, category and duration
  const filteredTrails = useMemo(() => {
    return baseTrails.filter((trail) => {
      // Category match
      if (selectedCategory !== 'all') {
        const matchesCat =
          trail.category === selectedCategory ||
          trail.categoryTags?.some((t) => t.toLowerCase() === selectedCategory.toLowerCase());
        if (!matchesCat) return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = trail.title.toLowerCase().includes(query);
        const matchesDesc = (trail.subtitle || trail.description).toLowerCase().includes(query);
        const matchesCity = trail.city.toLowerCase().includes(query);
        const matchesStops = trail.stops.some((s) => s.name.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesCity && !matchesStops) return false;
      }

      // Duration filter match
      if (selectedDuration === '30 Min' && trail.durationMinutes > 45) return false;
      if (selectedDuration === '1 Hour' && (trail.durationMinutes < 45 || trail.durationMinutes > 75)) return false;
      if (selectedDuration === '2 Hours' && (trail.durationMinutes < 75 || trail.durationMinutes > 150)) return false;
      if (selectedDuration === '3+ Hours' && trail.durationMinutes < 150) return false;

      return true;
    });
  }, [baseTrails, selectedCategory, searchQuery, selectedDuration]);

  const featuredTrail = useMemo(() => {
    return mockTrails.find((t) => t.id === 'hidden-cafes-panaji') || mockTrails[0];
  }, []);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedDuration('Any Time');
    setSelectedRadius('Nearby');
  };

  return (
    <div className="min-h-screen bg-[#F4F2EB] text-[#183D2B] pb-24">
      {/* 1. Top Section Header */}
      <section className="pt-8 sm:pt-12 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#183D2B]/10 pb-6">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#183D2B]/60 font-semibold block mb-1">
              PANAJI &bull; 24 TRAILS NEARBY
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-bold text-[#183D2B] tracking-tight uppercase">
              FIND YOUR NEXT TRAIL.
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#183D2B]/75 font-sans">
              Follow a path. Discover something unexpected.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#183D2B]/70 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#4E6B48] animate-pulse" />
            <span className="font-bold">GPS LOCKED: 15°29&apos;N 73°49&apos;E</span>
          </div>
        </div>

        {/* 2. Search & Multi-Filter Card */}
        <div className="mt-6 rounded-2xl border border-[#183D2B]/15 bg-white/80 p-4 sm:p-6 shadow-sm backdrop-blur-sm space-y-4">
          {/* Search Input & City Dropdown */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1 flex items-center">
              <Search className="absolute left-4 w-4 h-4 text-[#183D2B]/40" />
              <input
                type="text"
                placeholder="What do you want to discover?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-14 py-3 rounded-xl border border-[#183D2B]/15 bg-[#FAF8F3] text-xs font-mono text-[#183D2B] placeholder:text-[#183D2B]/40 focus:outline-none focus:ring-2 focus:ring-[#183D2B] transition-all"
              />
              <span className="absolute right-3 hidden sm:inline-block px-2 py-0.5 rounded border border-[#183D2B]/15 bg-white text-[10px] font-mono text-[#183D2B]/40">
                ⌘ K
              </span>
            </div>

            {/* Location Selector */}
            <div className="flex items-center gap-2">
              <div className="relative flex items-center px-4 py-3 rounded-xl border border-[#183D2B]/15 bg-[#FAF8F3] text-xs font-mono text-[#183D2B] font-semibold gap-2 min-w-[140px]">
                <MapPin className="w-4 h-4 text-[#4E6B48]" />
                <span>PANAJI</span>
              </div>

              {/* Filter Action Icon */}
              <button
                type="button"
                onClick={handleClearFilters}
                className="p-3 rounded-xl bg-[#183D2B] text-white hover:bg-[#4E6B48] transition-colors shrink-0 cursor-pointer"
                title="Reset Filters"
                aria-label="Filter Options"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Categories Pill Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#183D2B]/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#183D2B]/50 mr-2 font-bold">
              CATEGORIES:
            </span>
            {categoriesList.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#183D2B] text-white shadow-sm'
                      : 'bg-white border border-[#183D2B]/15 text-[#183D2B]/80 hover:border-[#183D2B]/50'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Duration & Radius Secondary Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-wider text-[#183D2B]/60 pt-2 border-t border-[#183D2B]/10">
            {/* Duration row */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="font-bold text-[#183D2B]/40">DURATION:</span>
              {durationOptions.map((dur) => (
                <button
                  key={dur}
                  onClick={() => setSelectedDuration(dur)}
                  className={`hover:text-[#183D2B] transition-colors cursor-pointer ${
                    selectedDuration === dur
                      ? 'text-[#183D2B] font-bold underline underline-offset-4 decoration-[#E36A2E]'
                      : 'text-[#183D2B]/70'
                  }`}
                >
                  {dur}
                </button>
              ))}
            </div>

            {/* Radius row */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="font-bold text-[#183D2B]/40">RADIUS:</span>
              {radiusOptions.map((rad) => (
                <button
                  key={rad}
                  onClick={() => setSelectedRadius(rad)}
                  className={`hover:text-[#183D2B] transition-colors cursor-pointer ${
                    selectedRadius === rad
                      ? 'text-[#183D2B] font-bold underline underline-offset-4 decoration-[#E36A2E]'
                      : 'text-[#183D2B]/70'
                  }`}
                >
                  {rad}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Trail Hero Banner */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="rounded-2xl border border-[#183D2B]/15 bg-white overflow-hidden shadow-sm grid lg:grid-cols-12">
          {/* Left Column: Details */}
          <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
            <div>
              {/* Badge & Category */}
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#4E6B48]/15 text-[#183D2B] text-[10px] font-mono font-bold uppercase tracking-wider">
                  FEATURED TRAIL
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#183D2B]/60 font-semibold">
                  FOOD &bull; CULTURE
                </span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#183D2B] tracking-tight uppercase">
                {featuredTrail.title}
              </h2>

              {/* Description quote */}
              <p className="mt-3 text-sm text-[#183D2B]/80 font-sans leading-relaxed italic">
                &ldquo;{featuredTrail.subtitle}&rdquo;
              </p>

              {/* Meta stats bar */}
              <div className="mt-6 pt-5 pb-5 border-y border-[#183D2B]/10 grid grid-cols-3 gap-4 text-left">
                <div>
                  <span className="block text-[9px] font-mono uppercase tracking-wider text-[#183D2B]/50">
                    STOPS
                  </span>
                  <span className="text-base sm:text-lg font-bold font-mono text-[#183D2B]">
                    04 STOPS
                  </span>
                </div>
                <div>
                  <span className="block text-[9px] font-mono uppercase tracking-wider text-[#183D2B]/50">
                    DISTANCE
                  </span>
                  <span className="text-base sm:text-lg font-bold font-mono text-[#183D2B]">
                    3.2 KM
                  </span>
                </div>
                <div>
                  <span className="block text-[9px] font-mono uppercase tracking-wider text-[#183D2B]/50">
                    DURATION
                  </span>
                  <span className="text-base sm:text-lg font-bold font-mono text-[#183D2B]">
                    2 HOURS
                  </span>
                </div>
              </div>

              {/* Route Waypoints Chain */}
              <div className="mt-6">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#183D2B]/50 block mb-2 font-bold">
                  ROUTE WAYPOINTS
                </span>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-[#183D2B]/85 font-mono">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-5 h-5 rounded-full bg-[#183D2B] text-white flex items-center justify-center text-[10px] font-bold">
                      01
                    </span>
                    Fontainhas Bakery
                  </span>
                  <span className="text-[#183D2B]/30">&mdash;</span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-5 h-5 rounded-full border border-[#183D2B] text-[#183D2B] flex items-center justify-center text-[10px] font-bold">
                      02
                    </span>
                    Heritage Bookstore
                  </span>
                  <span className="text-[#183D2B]/30">&mdash;</span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-5 h-5 rounded-full border border-[#183D2B] text-[#183D2B] flex items-center justify-center text-[10px] font-bold">
                      03
                    </span>
                    Chapel Mural
                  </span>
                  <span className="text-[#183D2B]/30">&mdash;</span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-5 h-5 rounded-full border border-[#183D2B] text-[#183D2B] flex items-center justify-center text-[10px] font-bold">
                      04
                    </span>
                    Coffee Roasters
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3 pt-4">
              <Link
                href={`/trails/${featuredTrail.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#183D2B] hover:bg-[#4E6B48] text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors shadow-sm"
              >
                <span>VIEW TRAIL</span>
                <ArrowRight className="w-4 h-4 text-[#E36A2E]" />
              </Link>

              <button
                type="button"
                onClick={() => setIsSavedFeatured(!isSavedFeatured)}
                className={`inline-flex items-center gap-1.5 px-5 py-3 rounded-xl border border-[#183D2B]/20 text-xs font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                  isSavedFeatured
                    ? 'bg-[#183D2B] text-white'
                    : 'bg-[#FAF8F3] hover:bg-[#183D2B]/5 text-[#183D2B]'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{isSavedFeatured ? 'SAVED' : 'SAVE'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Photography */}
          <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[440px] bg-[#E7E3D7]">
            <Image
              src="/images/explore-featured-bodega.jpg"
              alt="Café Bodega, Panaji"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* 4. Curated Trails Worth Taking (4-Card Grid) */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8 border-b border-[#183D2B]/10 pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#183D2B]/50 font-bold block mb-1">
              CURATED PATHS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#183D2B] tracking-tight uppercase">
              TRAILS WORTH TAKING
            </h2>
          </div>
          <span className="text-xs font-mono text-[#183D2B]/60">
            Showing {filteredTrails.length} selected urban traverses in Panaji
          </span>
        </div>

        {/* Trail Cards Grid */}
        {filteredTrails.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTrails.map((trail) => (
              <TrailCard key={trail.id} trail={trail} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-2xl border-2 border-dashed border-[#183D2B]/20 bg-white/50 p-12 text-center max-w-2xl mx-auto my-8">
            <div className="w-12 h-12 rounded-full bg-[#183D2B]/10 text-[#183D2B] flex items-center justify-center mx-auto mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#183D2B] mb-2">
              Nothing on this path yet.
            </h3>
            <p className="text-xs sm:text-sm text-[#183D2B]/70 max-w-md mx-auto leading-relaxed mb-6 font-sans">
              Try widening your distance or changing your interests to discover hidden corridors in Panaji.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleClearFilters}
                className="px-5 py-2.5 rounded-xl bg-[#183D2B] text-white text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#4E6B48] transition-colors cursor-pointer"
              >
                CLEAR FILTERS
              </button>
              <Link
                href="/ai-discovery"
                className="px-5 py-2.5 rounded-xl border border-[#183D2B]/20 bg-[#FAF8F3] text-[#183D2B] text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#183D2B]/10 transition-colors"
              >
                TRY AI DISCOVERY
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* 5. Cartographic Overview Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="rounded-2xl border border-[#183D2B]/15 bg-white p-6 sm:p-8 shadow-sm">
          {/* Top Tag & Header */}
          <div className="flex flex-wrap items-center justify-between text-xs font-mono uppercase tracking-wider text-[#183D2B]/60 mb-6 gap-2">
            <div>
              <span className="text-[10px] block text-[#183D2B]/40 font-bold mb-0.5">
                CARTOGRAPHIC OVERVIEW
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#183D2B] uppercase">
                PANAJI URBAN TRAVERSES
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#183D2B]" />
              <span>ACTIVE TRAILS &bull; DATUM: WGS 84</span>
            </div>
          </div>

          {/* Vector Cartographic Overview Canvas */}
          <div className="relative w-full h-[280px] sm:h-[340px] bg-[#FAF8F3] rounded-xl border border-[#183D2B]/10 overflow-hidden flex items-center justify-center">
            {/* SVG Topographic Paths */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 800 300"
              preserveAspectRatio="none"
            >
              {/* Route 1: Dashed Green Curve */}
              <path
                d="M 120 100 Q 360 250, 480 120"
                fill="none"
                stroke="#183D2B"
                strokeWidth="2.5"
                strokeDasharray="6 4"
              />

              {/* Route 2: Solid Terracotta Curve */}
              <path
                d="M 180 240 Q 340 180, 540 220"
                fill="none"
                stroke="#E36A2E"
                strokeWidth="2.5"
              />
            </svg>

            {/* Waypoint Nodes positioned along curves */}
            {/* 01 Fontainhas */}
            <div className="absolute top-[28%] left-[20%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-[#183D2B] text-white flex items-center justify-center text-xs font-mono font-bold shadow-sm">
                01
              </div>
              <span className="mt-1 px-2 py-0.5 rounded bg-white/90 border border-[#183D2B]/15 text-[9px] font-mono font-bold text-[#183D2B] uppercase shadow-sm">
                FONTAINHAS
              </span>
            </div>

            {/* 02 Bookstore */}
            <div className="absolute top-[68%] left-[45%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-[#4E6B48] text-white flex items-center justify-center text-xs font-mono font-bold shadow-sm">
                02
              </div>
              <span className="mt-1 px-2 py-0.5 rounded bg-white/90 border border-[#183D2B]/15 text-[9px] font-mono font-bold text-[#183D2B] uppercase shadow-sm">
                BOOKSTORE
              </span>
            </div>

            {/* 03 Chapel Mural */}
            <div className="absolute top-[38%] left-[72%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-[#183D2B] text-white flex items-center justify-center text-xs font-mono font-bold shadow-sm">
                03
              </div>
              <span className="mt-1 px-2 py-0.5 rounded bg-white/90 border border-[#183D2B]/15 text-[9px] font-mono font-bold text-[#183D2B] uppercase shadow-sm">
                CHAPEL MURAL
              </span>
            </div>

            {/* 04 Mandovi Pier */}
            <div className="absolute top-[64%] left-[80%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-[#E36A2E] text-white flex items-center justify-center text-xs font-mono font-bold shadow-sm">
                04
              </div>
              <span className="mt-1 px-2 py-0.5 rounded bg-white/90 border border-[#183D2B]/15 text-[9px] font-mono font-bold text-[#183D2B] uppercase shadow-sm">
                MANDOVI PIER
              </span>
            </div>

            {/* Bottom Scale Badge */}
            <div className="absolute bottom-3 left-3 bg-white/90 border border-[#183D2B]/15 rounded px-2.5 py-1 text-[9px] font-mono text-[#183D2B]/70 uppercase font-semibold">
              LAT 15°29&apos;N &bull; LONG 73°49&apos;E &bull; SCALE 1:10000
            </div>
          </div>
        </div>
      </section>

      {/* 6. AI Discovery Protocol Banner */}
      <section className="pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="rounded-2xl bg-[#112B1E] text-white p-8 sm:p-12 border border-[#183D2B] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#E36A2E] font-bold block mb-1">
              AI DISCOVERY PROTOCOL
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight uppercase">
              NOT SURE WHERE TO GO?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-white/75 font-sans leading-relaxed">
              Give TRAIL a little time, a place and a mood. We&apos;ll find a route worth taking.
            </p>
          </div>

          <div className="relative z-10 shrink-0 w-full sm:w-auto">
            <Link
              href="/ai-discovery"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#E36A2E] hover:bg-[#E36A2E]/90 text-white text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-md"
            >
              <span>BUILD A SPONTANEOUS TRAIL</span>
              <span>✦</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
