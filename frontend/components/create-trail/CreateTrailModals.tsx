'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { X, Search, MapPin, Sparkles, Filter } from 'lucide-react';
import { DraftWaypoint } from './WaypointSequence';
import { curated_spots, Spot } from '@/data/spots';
import { fetchSpots } from '@/lib/api';

interface AddWaypointModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWaypoint: (wp: DraftWaypoint) => void;
  existingIds: string[];
}

export function AddWaypointModal({
  isOpen,
  onClose,
  onAddWaypoint,
  existingIds,
}: AddWaypointModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [spots, setSpots] = useState<Spot[]>(curated_spots);
  const [dataSource, setDataSource] = useState<'backend' | 'local'>('local');

  useEffect(() => {
    if (!isOpen) return;
    let isMounted = true;
    fetchSpots().then((loadedSpots) => {
      if (isMounted && loadedSpots && loadedSpots.length > 0) {
        setSpots(loadedSpots);
        setDataSource(loadedSpots.length > 0 ? 'backend' : 'local');
      }
    });
    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  const plateImages = [
    '/images/trails/trail-hidden-cafes.jpg',
    '/images/trails/trail-old-streets.jpg',
    '/images/trails/trail-art-after-dark.jpg',
    '/images/trails/trail-coastal-walk.jpg',
    '/images/trails/trail-hidden-gems.jpg',
    '/images/trails/trail-bookstore-vinyl.jpg',
    '/images/trails/trail-altinho-vistas.jpg',
    '/images/trails/trail-heritage-church.jpg',
  ];

  const categories = [
    { id: 'all', label: 'All Places' },
    { id: 'coffee', label: 'Coffee & Cafés' },
    { id: 'art', label: 'Art & Murals' },
    { id: 'heritage', label: 'Heritage & Colonial' },
    { id: 'bookstore', label: 'Bookstores' },
    { id: 'viewpoint', label: 'Scenic Overlooks' },
    { id: 'food', label: 'Local Food' },
  ];

  // Convert spots to DraftWaypoints
  const catalog: DraftWaypoint[] = useMemo(() => {
    return spots.map((spot, idx) => {
      const img = plateImages[idx % plateImages.length];
      const dist = spot.distanceFromCenterKm || 0.8;
      const walkTime = spot.walkTimeFromCenterMin || Math.round(dist * 12);

      return {
        id: spot.id,
        name: spot.name,
        shortName: spot.shortName || spot.name.split('/')[0].trim(),
        categoryTag: spot.categoryTags?.slice(0, 2).join(' · ') || spot.category.toUpperCase(),
        estimatedMinutes: spot.estimatedMinutes || 25,
        description: spot.description,
        locationLabel: spot.location.quarter.toUpperCase() || 'PANAJI',
        refCode: `REF: ${spot.id.replace('spot-', 'PNJ-').toUpperCase()}`,
        plateImage: img,
        distanceMarker: `${dist.toFixed(1)} KM`,
        distanceKm: dist,
        legWalkDistance: `${dist.toFixed(1)} km`,
        legWalkTime: `${walkTime} min`,
        legStreetName: spot.location.address || 'Fontainhas passage',
        bearing: `${spot.location.lat.toFixed(4)}°N · ${spot.location.lng.toFixed(4)}°E`,
        corridorLabel: `${spot.location.quarter.toUpperCase()} CORRIDOR`,
        surfaceType: 'PORTUGUESE BASALT / COBBLESTONE',
        elevationChange: '+2M → +8M',
        elevationProfile: '+6M',
        curatorClue: spot.curatorNote,
        quarterContext: `Located in ${spot.location.quarter} · Foot traffic: ${spot.footTraffic} · Noise: ${spot.noiseLevel}`,
      };
    });
  }, [spots]);

  const filtered = useMemo(() => {
    return catalog.filter((item) => {
      // Find underlying spot to check category
      const spot = spots.find((s) => s.id === item.id);
      if (selectedCategory !== 'all' && spot) {
        if (selectedCategory === 'coffee' && spot.category !== 'coffee') return false;
        if (selectedCategory === 'art' && spot.category !== 'art' && spot.category !== 'street-art') return false;
        if (selectedCategory === 'heritage' && spot.category !== 'heritage') return false;
        if (selectedCategory === 'bookstore' && spot.category !== 'bookstore') return false;
        if (selectedCategory === 'viewpoint' && spot.category !== 'viewpoint') return false;
        if (selectedCategory === 'food' && spot.category !== 'food') return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesTag = item.categoryTag?.toLowerCase().includes(q);
        const matchesQuarter = item.locationLabel?.toLowerCase().includes(q);
        return matchesName || matchesDesc || matchesTag || matchesQuarter;
      }

      return true;
    });
  }, [catalog, spots, selectedCategory, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#183D2B]/50 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-2xl rounded-2xl bg-[#FAF8F3] border border-[#183D2B]/20 p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#183D2B]/10 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#4E6B48] font-bold block">
                WAYPOINT REPOSITORY
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#183D2B]/10 text-[#183D2B] font-semibold">
                {spots.length} Places Loaded
              </span>
            </div>
            <h3 className="text-xl font-serif font-bold text-[#183D2B]">
              Add a Curated Panaji Waypoint
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#183D2B]/60 hover:text-[#183D2B] hover:bg-[#183D2B]/5 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="space-y-2.5 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#183D2B]/40" />
            <input
              type="text"
              placeholder="Search by name, coffee, art, courtyard, books, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#183D2B]/20 bg-white/80 text-xs text-[#183D2B] placeholder:text-[#183D2B]/40 focus:outline-hidden font-sans"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer text-[11px] ${
                    active
                      ? 'bg-[#183D2B] text-white font-bold shadow-2xs'
                      : 'bg-[#ECE8DD] text-[#183D2B]/75 hover:bg-[#183D2B]/10'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* List of Waypoints */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 min-h-[220px]">
          {filtered.length > 0 ? (
            filtered.map((item) => {
              const alreadyAdded = existingIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-[#183D2B]/15 bg-white/80 flex items-start justify-between gap-3 hover:border-[#183D2B]/35 hover:shadow-xs transition-all"
                >
                  {item.plateImage && (
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 border border-[#183D2B]/15 bg-[#ECE8DD]">
                      <Image
                        src={item.plateImage}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="px-2 py-0.5 rounded bg-[#EBF2EB] border border-[#183D2B]/15 text-[10px] font-mono font-bold text-[#183D2B]">
                        {item.categoryTag}
                      </span>
                      <span className="text-[10px] font-mono text-[#183D2B]/60">
                        {item.locationLabel}
                      </span>
                      <span className="text-[10px] font-mono text-[#4E6B48] font-semibold">
                        ~{item.estimatedMinutes} MIN
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-sm text-[#183D2B]">
                      {item.name}
                    </h4>

                    <p className="text-xs text-[#183D2B]/75 line-clamp-2 font-sans mt-0.5 leading-relaxed">
                      {item.description}
                    </p>

                    {item.curatorClue && (
                      <p className="text-[11px] font-mono text-[#E36A2E] mt-1.5 line-clamp-1 italic">
                        Tip: {item.curatorClue}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    disabled={alreadyAdded}
                    onClick={() => {
                      onAddWaypoint(item);
                      onClose();
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all shrink-0 cursor-pointer ${
                      alreadyAdded
                        ? 'bg-[#ECE8DD] text-[#183D2B]/40 cursor-not-allowed'
                        : 'bg-[#183D2B] text-[#FAF8F3] hover:bg-[#23553C] shadow-xs active:scale-95'
                    }`}
                  >
                    {alreadyAdded ? 'ADDED ✓' : '+ ADD'}
                  </button>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs font-mono text-[#183D2B]/60">
              No places found matching &quot;{searchQuery}&quot;. Try a different term or category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface LocationPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (loc: { name: string; coord: string }) => void;
}

export function LocationPickerModal({
  isOpen,
  onClose,
  onSelectLocation,
}: LocationPickerModalProps) {
  if (!isOpen) return null;

  const locations = [
    {
      name: 'Panaji, Goa · Latin Quarter Fountain',
      coord: '15°29\'56"N · 73°49\'40"E',
      zone: 'Fontainhas Core',
    },
    {
      name: 'Cafe Bodega / Sunlit Atrium',
      coord: '15°29\'54"N · 73°49\'41"E',
      zone: 'Altinho Hill, Fontainhas',
    },
    {
      name: 'Church of Our Lady of the Immaculate Conception',
      coord: '15°29\'52"N · 73°49\'32"E',
      zone: 'Church Square, Panaji',
    },
    {
      name: 'Fontainhas Gate / Latin Quarter Entrance',
      coord: '15°29\'50"N · 73°49\'45"E',
      zone: 'North Gate, Fontainhas',
    },
    {
      name: 'Old Secretariat Ramparts / Mandovi Quay',
      coord: '15°30\'01"N · 73°49\'38"E',
      zone: 'Waterfront Promenade',
    },
    {
      name: 'Miramar Coastal Promenade Overlook',
      coord: '15°28\'44"N · 73°48\'20"E',
      zone: 'Mandovi Estuary Beach',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#183D2B]/40 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md rounded-2xl bg-[#FAF8F3] border border-[#183D2B]/20 p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#183D2B]/10">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#4E6B48] font-bold block">
              STARTING POINT
            </span>
            <h3 className="text-xl font-serif font-bold text-[#183D2B]">
              Select Trailhead Origin
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#183D2B]/60 hover:text-[#183D2B] hover:bg-[#183D2B]/5 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
          {locations.map((loc) => (
            <button
              type="button"
              key={loc.name}
              onClick={() => {
                onSelectLocation({ name: loc.name, coord: loc.coord });
                onClose();
              }}
              className="w-full text-left p-3 rounded-xl border border-[#183D2B]/15 bg-white/70 hover:bg-[#EBF2EB]/50 hover:border-[#183D2B]/40 transition-all flex items-start gap-3 cursor-pointer group"
            >
              <MapPin className="w-4 h-4 text-[#183D2B] shrink-0 mt-0.5 group-hover:text-[#E36A2E] transition-colors" />
              <div>
                <h4 className="font-serif font-bold text-xs sm:text-sm text-[#183D2B]">
                  {loc.name}
                </h4>
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#183D2B]/60 mt-0.5">
                  <span>{loc.zone}</span>
                  <span>·</span>
                  <span>{loc.coord}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
