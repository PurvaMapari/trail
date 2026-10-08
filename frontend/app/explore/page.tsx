'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Search, MapPin, ArrowRight, Bookmark, Compass, Sparkles, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { mockTrails } from '@/data/trails';
import { TrailCard } from '@/components/trails/TrailCard';
import { TrailCategory } from '@/types/trail';
import { CustomDropdown } from '@/components/ui/CustomDropdown';

const categoriesList: { id: TrailCategory; label: string }[] = [
  { id: 'all', label: 'All Trails' },
  { id: 'food', label: 'Cafés & Food' },
  { id: 'art', label: 'Street Art' },
  { id: 'culture', label: 'Heritage & History' },
  { id: 'nature', label: 'Nature & Views' },
  { id: 'hidden-gems', label: 'Hidden Gems' },
];

const durationOptions = ['Any Time', 'Under 1 Hour', '1 - 2 Hours', '2+ Hours'];

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const initialCat = (searchParams.get('cat') as TrailCategory) || 'all';

  const [searchQuery, setSearchQuery] = useState(initialQ);
  const [selectedCategory, setSelectedCategory] = useState<TrailCategory>(initialCat);
  const [selectedDuration, setSelectedDuration] = useState('Any Time');
  const [isSavedFeatured, setIsSavedFeatured] = useState(false);

  useEffect(() => {
    if (initialQ) setSearchQuery(initialQ);
    if (initialCat) setSelectedCategory(initialCat);
  }, [initialQ, initialCat]);

  // Filter unique public trails
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
      if (selectedDuration === 'Under 1 Hour' && trail.durationMinutes > 60) return false;
      if (selectedDuration === '1 - 2 Hours' && (trail.durationMinutes < 60 || trail.durationMinutes > 120)) return false;
      if (selectedDuration === '2+ Hours' && trail.durationMinutes < 120) return false;

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
  };

  const isFiltered = searchQuery.trim() !== '' || selectedCategory !== 'all' || selectedDuration !== 'Any Time';

  return (
    <div className="min-h-screen bg-[#F4F2EB] text-[#183D2B] pb-20">
      {/* 1. Header & Location */}
      <section className="pt-8 sm:pt-12 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#183D2B]/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#4E6B48] font-bold mb-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#E36A2E]" />
              <span>Panaji, Goa · 4 Curated Routes</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#183D2B] tracking-tight">
              Explore Walking Trails
            </h1>
            <p className="mt-1.5 text-sm sm:text-base text-[#183D2B]/75 font-sans max-w-xl">
              Follow curated footsteps through Latin quarters, historic cafes, and hilltop vistas.
            </p>
          </div>

          <Link
            href="/ai-discovery"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#183D2B]/5 hover:bg-[#183D2B]/10 border border-[#183D2B]/15 text-xs font-mono text-[#183D2B] font-semibold transition-colors shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E36A2E]" />
            <span>Plan with AI Scout</span>
          </Link>
        </div>

        {/* 2. Unified Clean Search & Filters */}
        <div className="mt-6 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#183D2B]/40" />
              <input
                type="text"
                placeholder="Search by name, neighborhood, or stop (e.g. Bodega, art, Fontainhas)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#183D2B]/15 bg-white text-xs sm:text-sm font-sans text-[#183D2B] placeholder:text-[#183D2B]/40 focus:outline-none focus:ring-2 focus:ring-[#183D2B] shadow-sm transition-all"
              />
            </div>

            {/* Duration Selector */}
            <div className="flex items-center gap-2">
              <CustomDropdown
                options={durationOptions}
                value={selectedDuration}
                onChange={setSelectedDuration}
                className="w-40 sm:w-44"
              />

              {isFiltered && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="px-3.5 py-3 rounded-xl border border-[#183D2B]/20 bg-white hover:bg-[#183D2B]/5 text-xs font-mono text-[#183D2B] flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Reset filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {categoriesList.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#183D2B] text-white shadow-sm'
                      : 'bg-white/80 border border-[#183D2B]/15 text-[#183D2B]/80 hover:bg-white hover:border-[#183D2B]/40'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Featured Trail Banner (Only when not actively filtering by search) */}
      {!searchQuery && selectedCategory === 'all' && (
        <section className="py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="rounded-3xl border border-[#183D2B]/15 bg-white overflow-hidden shadow-sm grid lg:grid-cols-12 transition-all">
            {/* Left Column: Details */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E36A2E]/15 text-[#E36A2E] text-[10px] font-mono font-bold uppercase tracking-wider">
                    Featured Walk
                  </span>
                  <span className="text-xs font-mono text-[#183D2B]/60 font-semibold">
                    Food &bull; Culture
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#183D2B] tracking-tight">
                  {featuredTrail.title}
                </h2>

                <p className="mt-2.5 text-sm sm:text-base text-[#183D2B]/80 font-sans leading-relaxed">
                  {featuredTrail.subtitle}
                </p>

                {/* Meta stats bar */}
                <div className="mt-6 pt-4 pb-4 border-y border-[#183D2B]/10 grid grid-cols-3 gap-4">
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-[#183D2B]/50">
                      Stops
                    </span>
                    <span className="text-base sm:text-lg font-bold font-mono text-[#183D2B]">
                      {featuredTrail.stops.length} Stops
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-[#183D2B]/50">
                      Distance
                    </span>
                    <span className="text-base sm:text-lg font-bold font-mono text-[#183D2B]">
                      {featuredTrail.distanceKm} KM
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-[#183D2B]/50">
                      Duration
                    </span>
                    <span className="text-base sm:text-lg font-bold font-mono text-[#183D2B]">
                      2 Hours
                    </span>
                  </div>
                </div>

                {/* Route stops line */}
                <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#183D2B]/80 font-mono">
                  <span className="font-bold text-[#183D2B]">Stops:</span>
                  <span>Café Bodega</span>
                  <span>→</span>
                  <span>Heritage Books</span>
                  <span>→</span>
                  <span>Chapel Mural</span>
                  <span>→</span>
                  <span>Coffee Roasters</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-3 pt-2">
                <Link
                  href={`/trails/${featuredTrail.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#183D2B] hover:bg-[#4E6B48] text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors shadow-sm"
                >
                  <span>View Trail Details</span>
                  <ArrowRight className="w-4 h-4 text-[#E36A2E]" />
                </Link>

                <button
                  type="button"
                  onClick={() => setIsSavedFeatured(!isSavedFeatured)}
                  className={`inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border border-[#183D2B]/20 text-xs font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                    isSavedFeatured
                      ? 'bg-[#183D2B] text-white'
                      : 'bg-[#FAF8F3] hover:bg-[#183D2B]/5 text-[#183D2B]'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{isSavedFeatured ? 'Saved' : 'Save'}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Photography */}
            <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-[#E7E3D7]">
              <Image
                src="/images/explore-featured-bodega.jpg"
                alt="Café Bodega, Panaji"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* 4. Curated Trails Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between gap-2 mb-6 border-b border-[#183D2B]/10 pb-3">
          <h2 className="font-serif text-2xl font-bold text-[#183D2B]">
            {isFiltered ? 'Matching Trails' : 'All Curated Trails'}
          </h2>
          <span className="text-xs font-mono text-[#183D2B]/60">
            {filteredTrails.length} {filteredTrails.length === 1 ? 'trail' : 'trails'} available
          </span>
        </div>

        {filteredTrails.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTrails.map((trail) => (
              <TrailCard key={trail.id} trail={trail} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-[#183D2B]/15 bg-white/70 p-12 text-center max-w-lg mx-auto my-8">
            <Compass className="w-10 h-10 text-[#183D2B]/40 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-[#183D2B] mb-2">
              No trails match your search
            </h3>
            <p className="text-xs text-[#183D2B]/70 font-sans mb-6">
              Try adjusting your search terms or clearing your filters to see all Panaji walks.
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="px-5 py-2.5 rounded-xl bg-[#183D2B] text-white text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#4E6B48] transition-colors cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* 5. Clean AI Discovery Banner */}
      <section className="pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="rounded-3xl bg-[#112B1E] text-white p-8 sm:p-10 border border-[#183D2B] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#E36A2E] font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Need something different?</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Create a custom route with AI
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-white/75 font-sans leading-relaxed">
              Tell our scout how much time you have and what you want to experience. We&apos;ll plot a unique path in seconds.
            </p>
          </div>

          <div className="relative z-10 shrink-0 w-full sm:w-auto">
            <Link
              href="/ai-discovery"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#E36A2E] hover:bg-[#E36A2E]/90 text-white text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-md"
            >
              <span>Launch AI Scout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F4F2EB] flex items-center justify-center">
          <div className="text-xs font-mono text-[#183D2B]/60 uppercase">Loading trails...</div>
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  );
}
