'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  MapPin,
  ArrowRight,
  Bookmark,
  Compass,
  Sparkles,
  RotateCcw,
  Footprints,
  Landmark,
  Clock,
  ExternalLink,
  PlusCircle,
  Eye,
} from 'lucide-react';
import { mockTrails, RichTrail } from '@/data/trails';
import { curated_spots, Spot } from '@/data/spots';
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

const spotCategories: { id: string; label: string }[] = [
  { id: 'all', label: 'All Places' },
  { id: 'coffee', label: 'Cafés & Coffee' },
  { id: 'heritage', label: 'Heritage & History' },
  { id: 'art', label: 'Art & Galleries' },
  { id: 'street-art', label: 'Street Art' },
  { id: 'nature', label: 'Nature & Views' },
  { id: 'bookstore', label: 'Bookstores' },
  { id: 'food', label: 'Local Food' },
  { id: 'hidden-gem', label: 'Hidden Gems' },
  { id: 'artisan', label: 'Artisan & Craft' },
  { id: 'music', label: 'Music & Night' },
];

const spotQuarters = [
  'All Areas',
  'Fontainhas',
  'Altinho',
  'Panaji City Centre',
  'Panaji Riverfront',
  'Campal',
  'Miramar',
  'Sao Tome',
];

const durationOptions = ['Any Time', 'Under 1 Hour', '1 - 2 Hours', '2+ Hours'];

const spotImageMap: Record<string, string> = {
  // Semantic spot IDs
  'spot-cafe-bodega': '/images/explore-featured-bodega.jpg',
  'spot-caffe-tato': '/images/trails/trail-hidden-cafes.jpg',
  'spot-organic-world': '/images/trails/trail-hidden-cafes.jpg',
  'spot-literati-bookshop': '/images/trails/trail-bookstore-vinyl.jpg',
  'spot-mandovi-books': '/images/trails/trail-bookstore-vinyl.jpg',
  'spot-gitanjali-gallery': '/images/trails/trail-art-after-dark.jpg',
  'spot-kala-academy': '/images/trails/trail-coastal-walk.jpg',
  'spot-fontainhas-murals': '/images/trails/trail-art-after-dark.jpg',
  'spot-tiger-mural': '/images/trails/trail-art-after-dark.jpg',
  'spot-mandovi-embankment': '/images/trails/trail-coastal-walk.jpg',
  'spot-miramar-beach': '/images/trails/trail-coastal-walk.jpg',
  'spot-campal-gardens': '/images/trails/trail-altinho-vistas.jpg',
  'spot-rua-31': '/images/trails/trail-old-streets.jpg',
  'spot-imc-church': '/images/trails/trail-heritage-church.jpg',
  'spot-old-secretariat': '/images/trails/trail-heritage-church.jpg',
  'spot-sao-thome-lane': '/images/trails/trail-latin-quarter.jpg',
  'spot-altinho-view': '/images/trails/trail-altinho-vistas.jpg',
  'spot-pottery-studio': '/images/trails/trail-hidden-gems.jpg',
  'spot-ritz-classic': '/images/trails/trail-hidden-cafes.jpg',
  'spot-horseshoe-restaurant': '/images/trails/trail-hidden-cafes.jpg',
  'spot-vinyl-den': '/images/trails/trail-bookstore-vinyl.jpg',
  // Numeric spot IDs fallback
  'spot-01': '/images/explore-featured-bodega.jpg',
  'spot-02': '/images/trails/trail-bookstore-vinyl.jpg',
  'spot-03': '/images/trails/trail-art-after-dark.jpg',
  'spot-04': '/images/trails/trail-coastal-walk.jpg',
  'spot-05': '/images/trails/trail-hidden-gems.jpg',
  'spot-06': '/images/trails/trail-hidden-cafes.jpg',
  'spot-07': '/images/trails/trail-heritage-church.jpg',
  'spot-08': '/images/trails/trail-altinho-vistas.jpg',
  'spot-09': '/images/trails/trail-art-after-dark.jpg',
  'spot-10': '/images/trails/trail-latin-quarter.jpg',
  'spot-11': '/images/trails/trail-coastal-walk.jpg',
  'spot-12': '/images/trails/trail-old-streets.jpg',
  'spot-13': '/images/trails/trail-hidden-cafes.jpg',
  'spot-14': '/images/trails/trail-coastal-walk.jpg',
  'spot-15': '/images/trails/trail-heritage-church.jpg',
  'spot-16': '/images/trails/trail-hidden-cafes.jpg',
  'spot-17': '/images/trails/trail-altinho-vistas.jpg',
  'spot-18': '/images/trails/trail-art-after-dark.jpg',
  'spot-19': '/images/trails/trail-hidden-cafes.jpg',
  'spot-20': '/images/trails/trail-old-streets.jpg',
  'spot-21': '/images/trails/trail-bookstore-vinyl.jpg',
};

function getSpotImage(spot: Spot | null | undefined): string {
  if (!spot) return '/images/trails/trail-hidden-cafes.jpg';
  if (spotImageMap[spot.id]) return spotImageMap[spot.id];
  switch (spot.category) {
    case 'coffee':
    case 'food':
      return '/images/trails/trail-hidden-cafes.jpg';
    case 'art':
    case 'street-art':
      return '/images/trails/trail-art-after-dark.jpg';
    case 'heritage':
    case 'culture':
      return '/images/trails/trail-heritage-church.jpg';
    case 'bookstore':
    case 'music':
      return '/images/trails/trail-bookstore-vinyl.jpg';
    case 'nature':
    case 'viewpoint':
      return '/images/trails/trail-altinho-vistas.jpg';
    default:
      return '/images/trails/trail-latin-quarter.jpg';
  }
}


function ExploreContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const initialCat = (searchParams.get('cat') as TrailCategory) || 'all';
  const initialTab = searchParams.get('tab') === 'places' ? 'places' : 'trails';

  const [activeTab, setActiveTab] = useState<'trails' | 'places'>(initialTab);
  const [searchQuery, setSearchQuery] = useState(initialQ);
  const [selectedCategory, setSelectedCategory] = useState<TrailCategory>(initialCat);
  const [selectedDuration, setSelectedDuration] = useState('Any Time');
  const [selectedSpotCat, setSelectedSpotCat] = useState('all');
  const [selectedQuarter, setSelectedQuarter] = useState('All Areas');
  const [isSavedFeatured, setIsSavedFeatured] = useState(false);
  const [selectedSpotModal, setSelectedSpotModal] = useState<Spot | null>(null);

  const [baseTrails, setBaseTrails] = useState<RichTrail[]>(() =>
    mockTrails.filter((t) => t.id !== 'demo')
  );

  useEffect(() => {
    if (initialQ) setSearchQuery(initialQ);
    if (initialCat) setSelectedCategory(initialCat);
    if (searchParams.get('tab') === 'places') setActiveTab('places');
  }, [initialQ, initialCat, searchParams]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const customStored: RichTrail[] = [];
        for (let i = 0; i < window.sessionStorage.length; i++) {
          const key = window.sessionStorage.key(i);
          if (key && (key.startsWith('trail_') || key === 'last_custom_trail')) {
            const raw = window.sessionStorage.getItem(key);
            if (raw) {
              const parsed = JSON.parse(raw);
              if (
                parsed &&
                parsed.id &&
                !customStored.some((t) => t.id === parsed.id) &&
                !mockTrails.some((t) => t.id === parsed.id)
              ) {
                customStored.push(parsed);
              }
            }
          }
        }
        if (customStored.length > 0) {
          setBaseTrails([...customStored, ...mockTrails.filter((t) => t.id !== 'demo')]);
        }
      } catch {
        // Fallback gracefully if session storage is restricted
      }
    }
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
      if (
        selectedDuration === '1 - 2 Hours' &&
        (trail.durationMinutes < 60 || trail.durationMinutes > 120)
      )
        return false;
      if (selectedDuration === '2+ Hours' && trail.durationMinutes < 120) return false;

      return true;
    });
  }, [baseTrails, selectedCategory, searchQuery, selectedDuration]);

  // Filtered places dataset
  const filteredSpots = useMemo(() => {
    return curated_spots.filter((spot) => {
      // Category match
      if (selectedSpotCat !== 'all') {
        if (selectedSpotCat === 'heritage' && spot.category !== 'heritage') return false;
        if (selectedSpotCat === 'nature' && spot.category !== 'nature' && spot.category !== 'viewpoint')
          return false;
        if (
          selectedSpotCat !== 'heritage' &&
          selectedSpotCat !== 'nature' &&
          spot.category !== selectedSpotCat
        )
          return false;
      }

      // Quarter match
      if (selectedQuarter !== 'All Areas') {
        if (spot.location.quarter !== selectedQuarter) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = spot.name.toLowerCase().includes(q);
        const matchesDesc = spot.description.toLowerCase().includes(q);
        const matchesNote = spot.curatorNote.toLowerCase().includes(q);
        const matchesQuarter = spot.location.quarter.toLowerCase().includes(q);
        const matchesVibes = spot.vibes.some((v) => v.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesNote && !matchesQuarter && !matchesVibes)
          return false;
      }

      return true;
    });
  }, [selectedSpotCat, selectedQuarter, searchQuery]);

  const featuredTrail = useMemo(() => {
    return mockTrails.find((t) => t.id === 'hidden-cafes-panaji') || mockTrails[0];
  }, []);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedDuration('Any Time');
    setSelectedSpotCat('all');
    setSelectedQuarter('All Areas');
  };

  const isFiltered =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedDuration !== 'Any Time' ||
    selectedSpotCat !== 'all' ||
    selectedQuarter !== 'All Areas';

  return (
    <div className="min-h-screen bg-[#F4F2EB] text-[#183D2B] pb-24">
      {/* 1. Header & Location */}
      <section className="pt-8 sm:pt-12 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#183D2B]/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#4E6B48] font-bold mb-2">
              <MapPin className="w-3.5 h-3.5 text-[#E36A2E]" />
              <span>Panaji, Goa &bull; {baseTrails.length} Curated Trails &bull; {curated_spots.length} Verified Places</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#183D2B] tracking-tight">
              Explore Walking Trails
            </h1>
            <p className="mt-1.5 text-sm sm:text-base text-[#183D2B]/75 font-sans max-w-xl">
              Follow curated footsteps through Latin quarters, historic cafes, and hilltop vistas.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/create-trail"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#183D2B] text-white hover:bg-[#4E6B48] text-xs font-mono font-semibold transition-colors shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#E36A2E]" />
              <span>Create Custom Trail</span>
            </Link>

            <Link
              href="/ai-discovery"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#183D2B]/5 hover:bg-[#183D2B]/10 border border-[#183D2B]/15 text-xs font-mono text-[#183D2B] font-semibold transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E36A2E]" />
              <span>Plan with AI Scout</span>
            </Link>
          </div>
        </div>

        {/* 2. Main View Switcher (Walking Trails vs All 21 Curated Places) */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex rounded-xl bg-white p-1 border border-[#183D2B]/15 shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab('trails')}
              className={`inline-flex items-center gap-2 px-4 sm:px-6 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer ${
                activeTab === 'trails'
                  ? 'bg-[#183D2B] text-white shadow-sm'
                  : 'text-[#183D2B]/70 hover:text-[#183D2B]'
              }`}
            >
              <Footprints className="w-4 h-4 text-[#E36A2E]" />
              <span>Curated Trails ({baseTrails.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('places')}
              className={`inline-flex items-center gap-2 px-4 sm:px-6 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer ${
                activeTab === 'places'
                  ? 'bg-[#183D2B] text-white shadow-sm'
                  : 'text-[#183D2B]/70 hover:text-[#183D2B]'
              }`}
            >
              <Landmark className="w-4 h-4 text-[#E36A2E]" />
              <span>All Curated Places ({curated_spots.length})</span>
            </button>
          </div>

          <div className="text-xs font-mono text-[#183D2B]/60">
            {activeTab === 'trails'
              ? `Showing ${filteredTrails.length} of ${baseTrails.length} trails`
              : `Showing ${filteredSpots.length} of ${curated_spots.length} spots in dataset`}
          </div>
        </div>

        {/* 3. Filters and Search Area */}
        {activeTab === 'trails' ? (
          <div className="mt-4 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#183D2B]/40" />
                <input
                  type="text"
                  placeholder="Search trails by title, neighborhood, or stop (e.g. Bodega, art, Altinho)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#183D2B]/15 bg-white text-xs sm:text-sm font-sans text-[#183D2B] placeholder:text-[#183D2B]/40 focus:outline-none focus:ring-2 focus:ring-[#183D2B] shadow-sm transition-all"
                />
              </div>

              {/* Duration Selector */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-[#183D2B]/15 bg-white text-xs font-mono text-[#183D2B] focus:outline-none focus:ring-2 focus:ring-[#183D2B] shadow-sm cursor-pointer"
                >
                  {durationOptions.map((dur) => (
                    <option key={dur} value={dur}>
                      {dur}
                    </option>
                  ))}
                </select>

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
        ) : (
          <div className="mt-4 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search Places Input */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#183D2B]/40" />
                <input
                  type="text"
                  placeholder="Search 21 spots by name, vibe, or keyword (e.g. coffee, courtyard, vinyl, sunset)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#183D2B]/15 bg-white text-xs sm:text-sm font-sans text-[#183D2B] placeholder:text-[#183D2B]/40 focus:outline-none focus:ring-2 focus:ring-[#183D2B] shadow-sm transition-all"
                />
              </div>

              {/* Area / Quarter Selector */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedQuarter}
                  onChange={(e) => setSelectedQuarter(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-[#183D2B]/15 bg-white text-xs font-mono text-[#183D2B] focus:outline-none focus:ring-2 focus:ring-[#183D2B] shadow-sm cursor-pointer"
                >
                  {spotQuarters.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>

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

            {/* Spot Category Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {spotCategories.map((cat) => {
                const isSelected = selectedSpotCat === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedSpotCat(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer ${
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
        )}
      </section>

      {/* 4. Tab 1: WALKING TRAILS VIEW */}
      {activeTab === 'trails' && (
        <>
          {/* Featured Trail Banner (Only when not actively filtering by search) */}
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
                        Food &bull; Culture &bull; Architecture
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
                          {Math.round((featuredTrail.durationMinutes / 60) * 10) / 10} Hours
                        </span>
                      </div>
                    </div>

                    {/* Route stops line */}
                    <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#183D2B]/80 font-mono">
                      <span className="font-bold text-[#183D2B]">Route:</span>
                      {featuredTrail.stops.map((stop, idx) => (
                        <React.Fragment key={stop.id}>
                          <span>{stop.name}</span>
                          {idx < featuredTrail.stops.length - 1 && <span>&rarr;</span>}
                        </React.Fragment>
                      ))}
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

                {/* Right Column: High Quality Photography */}
                <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full bg-[#E7E3D7]">
                  <Image
                    src={featuredTrail.featuredImage || featuredTrail.coverImage || '/images/explore-featured-bodega.jpg'}
                    alt={featuredTrail.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute bottom-3 left-3 bg-[#183D2B]/90 text-white px-3 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                    Café Bodega &bull; Fontainhas
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* All Curated Trails Grid */}
          <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            <div className="flex items-center justify-between gap-2 mb-6 border-b border-[#183D2B]/10 pb-3">
              <h2 className="font-serif text-2xl font-bold text-[#183D2B]">
                {isFiltered ? 'Matching Trails' : 'All Curated Walking Trails'}
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
        </>
      )}

      {/* 5. Tab 2: ALL 21 CURATED PLACES DATASET VIEW */}
      {activeTab === 'places' && (
        <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-[#183D2B]/10 pb-3">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#183D2B]">
                Curated Places Knowledge Base
              </h2>
              <p className="text-xs text-[#183D2B]/70 font-sans mt-0.5">
                Every individual landmark, café, gallery, and viewpoint in the Panaji dataset.
              </p>
            </div>
            <span className="text-xs font-mono text-[#183D2B]/60">
              {filteredSpots.length} of {curated_spots.length} spots
            </span>
          </div>

          {filteredSpots.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSpots.map((spot) => (
                <div
                  key={spot.id}
                  className="rounded-2xl border border-[#183D2B]/15 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Spot Photographic Banner */}
                    <div className="relative w-full aspect-[16/10] bg-[#ECE8DD] overflow-hidden">
                      <Image
                        src={getSpotImage(spot)}
                        alt={spot.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                      
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm border border-[#183D2B]/15 rounded px-2.5 py-0.5 text-[9px] font-mono font-bold text-[#183D2B] uppercase shadow-xs">
                        {spot.category.toUpperCase()}
                      </div>
                      
                      <div className="absolute top-3 right-3 bg-[#183D2B]/90 backdrop-blur-sm rounded px-2 py-0.5 text-[9px] font-mono font-bold text-white flex items-center gap-1 shadow-xs">
                        <Clock className="w-2.5 h-2.5 text-[#E36A2E]" />
                        ~{spot.walkTimeFromCenterMin} MIN
                      </div>

                      <div className="absolute bottom-2.5 left-3 text-white text-[10px] font-mono font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#E36A2E]" />
                        <span className="drop-shadow-sm">{spot.location.quarter}</span>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="font-serif text-xl font-bold text-[#183D2B] mb-1 group-hover:text-[#E36A2E] transition-colors">
                        {spot.name}
                      </h3>

                      <div className="flex items-center gap-1 text-[11px] font-mono text-[#183D2B]/60 mb-3">
                        <span>{spot.location.address}</span>
                      </div>

                      <p className="text-xs text-[#183D2B]/80 font-sans leading-relaxed line-clamp-3 mb-4">
                        {spot.description}
                      </p>

                      {/* Curator Note Box */}
                      <div className="rounded-xl border border-[#183D2B]/10 bg-[#FAF8F3] p-3 text-[11px] font-sans text-[#183D2B]/85 mb-4">
                        <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-[#4E6B48] block mb-1">
                          CURATOR FIELD TIP
                        </span>
                        <p className="italic line-clamp-2">&ldquo;{spot.curatorNote}&rdquo;</p>
                      </div>

                      {/* Vibes pills */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {spot.vibes.slice(0, 3).map((vibe) => (
                          <span
                            key={vibe}
                            className="px-2 py-0.5 rounded bg-[#FAF8F3] border border-[#183D2B]/10 text-[9px] font-mono uppercase text-[#183D2B]/70"
                          >
                            #{vibe}
                          </span>
                        ))}
                        {spot.footTraffic === 'quiet' && (
                          <span className="px-2 py-0.5 rounded bg-[#4E6B48]/10 text-[9px] font-mono uppercase text-[#4E6B48] font-bold">
                            Quiet
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="px-5 pb-5 pt-3 border-t border-[#183D2B]/10 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedSpotModal(spot)}
                      className="inline-flex items-center gap-1 text-xs font-mono text-[#183D2B] hover:text-[#E36A2E] font-semibold cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Spot Dossier</span>
                    </button>

                    <Link
                      href={`/create-trail?startSpot=${spot.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#183D2B]/5 hover:bg-[#183D2B] hover:text-white text-xs font-mono text-[#183D2B] font-semibold transition-colors"
                      title="Use this spot in a new trail"
                    >
                      <span>Add to Trail</span>
                      <PlusCircle className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-[#183D2B]/15 bg-white/70 p-12 text-center max-w-lg mx-auto my-8">
              <Landmark className="w-10 h-10 text-[#183D2B]/40 mx-auto mb-3" />
              <h3 className="font-serif text-xl font-bold text-[#183D2B] mb-2">
                No places match your search
              </h3>
              <p className="text-xs text-[#183D2B]/70 font-sans mb-6">
                Try selecting &ldquo;All Areas&rdquo; or clearing your category filters to browse all 21 places.
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
      )}

      {/* Spot Detail Modal */}
      {selectedSpotModal && (
        <div className="fixed inset-0 z-50 bg-[#183D2B]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#183D2B]/20 max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-[#183D2B]/15 bg-[#ECE8DD]">
              <Image
                src={getSpotImage(selectedSpotModal)}
                alt={selectedSpotModal.name}
                fill
                sizes="600px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 bg-[#183D2B]/90 backdrop-blur-sm text-white px-2.5 py-1 rounded text-[10px] font-mono uppercase font-bold tracking-wider">
                {selectedSpotModal.location.quarter} &bull; {selectedSpotModal.category.toUpperCase()}
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-[#183D2B]/10 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#183D2B]/10 text-[#183D2B] text-[10px] font-mono font-bold uppercase tracking-wider">
                  {selectedSpotModal.category.toUpperCase()} &bull; {selectedSpotModal.location.quarter}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#183D2B] mt-1.5">
                  {selectedSpotModal.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSpotModal(null)}
                className="w-8 h-8 rounded-full border border-[#183D2B]/20 flex items-center justify-center hover:bg-[#183D2B]/10 text-xs font-mono cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4 text-xs font-sans text-[#183D2B]/85">
              <p className="leading-relaxed">{selectedSpotModal.description}</p>

              <div className="rounded-xl border border-[#183D2B]/15 bg-[#FAF8F3] p-4 space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#4E6B48] block">
                  Curator Field Observation
                </span>
                <p className="italic text-[#183D2B]/90">&ldquo;{selectedSpotModal.curatorNote}&rdquo;</p>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono text-[11px] pt-2">
                <div className="p-3 rounded-lg bg-[#FAF8F3] border border-[#183D2B]/10">
                  <span className="text-[9px] uppercase text-[#183D2B]/50 block">Walk From Center</span>
                  <span className="font-bold">{selectedSpotModal.walkTimeFromCenterMin} min ({selectedSpotModal.distanceFromCenterKm} km)</span>
                </div>
                <div className="p-3 rounded-lg bg-[#FAF8F3] border border-[#183D2B]/10">
                  <span className="text-[9px] uppercase text-[#183D2B]/50 block">Best Visiting Time</span>
                  <span className="font-bold capitalize">{selectedSpotModal.bestTime.join(', ')}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#FAF8F3] border border-[#183D2B]/10">
                  <span className="text-[9px] uppercase text-[#183D2B]/50 block">Foot Traffic</span>
                  <span className="font-bold capitalize">{selectedSpotModal.footTraffic} traffic</span>
                </div>
                <div className="p-3 rounded-lg bg-[#FAF8F3] border border-[#183D2B]/10">
                  <span className="text-[9px] uppercase text-[#183D2B]/50 block">Hours</span>
                  <span className="font-bold">{selectedSpotModal.openingHours || 'Always accessible'}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#183D2B]/10 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedSpotModal(null)}
                className="px-4 py-2.5 rounded-xl border border-[#183D2B]/20 text-xs font-mono uppercase tracking-wider font-semibold cursor-pointer"
              >
                Close
              </button>
              <Link
                href={`/create-trail?startSpot=${selectedSpotModal.id}`}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#183D2B] text-white text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#4E6B48] transition-colors"
              >
                <PlusCircle className="w-3.5 h-3.5 text-[#E36A2E]" />
                <span>Build Route With Spot</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 6. Clean AI Discovery Banner */}
      <section className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
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
