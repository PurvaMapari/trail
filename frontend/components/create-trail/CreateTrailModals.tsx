'use client';

import React, { useState } from 'react';
import { X, Search, MapPin } from 'lucide-react';
import { DraftWaypoint } from './WaypointSequence';

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

  if (!isOpen) return null;

  const catalog: DraftWaypoint[] = [
    {
      id: 'cat-altinho-steps',
      name: 'Altinho Stairway & Miradouro',
      categoryTag: 'VIEW · NATURE',
      estimatedMinutes: 20,
      description: 'Granite steps flanked by bougainvillea leading to a quiet overlook of the Mandovi estuary.',
      locationLabel: 'ALTINHO HILL',
      legWalkDistance: '0.5 km',
      legWalkTime: '7 min',
      legStreetName: 'via Altinho Incline',
      plateImage: '/images/explore-card-2.jpg',
      distanceMarker: '2.2 KM',
    },
    {
      id: 'cat-azulejo-studio',
      name: 'Velha Goa Galeria / Azulejo Workshop',
      categoryTag: 'ART · CRAFT',
      estimatedMinutes: 25,
      description: 'Hand-painted tin-glazed ceramic tile atelier preserving 18th-century Goan craftsmanship.',
      locationLabel: 'RUA 31 DE JANEIRO',
      legWalkDistance: '0.4 km',
      legWalkTime: '5 min',
      legStreetName: 'along Rua 31 de Janeiro',
      plateImage: '/images/active-trail/bookstore.jpg',
      distanceMarker: '1.4 KM',
    },
    {
      id: 'cat-sebastian-chapel',
      name: 'St. Sebastian Chapel Precinct',
      categoryTag: 'HERITAGE · ARCHITECTURE',
      estimatedMinutes: 15,
      description: 'Pristine whitewashed 1888 chapel set within a peaceful cobblestone cul-de-sac.',
      locationLabel: 'FONTAINHAS INTERIOR',
      legWalkDistance: '0.3 km',
      legWalkTime: '4 min',
      legStreetName: 'through Chapel Lane',
      plateImage: '/images/explore-card-3.jpg',
      distanceMarker: '1.8 KM',
    },
    {
      id: 'cat-poi-bakery',
      name: 'Confeitaria Traditional Wood-Fired Oven',
      categoryTag: 'GASTRONOMY',
      estimatedMinutes: 20,
      description: 'Early morning wood-fired oven bakery producing crusty poee and spiced bebinca.',
      locationLabel: 'OLD LATIN QUARTER',
      legWalkDistance: '0.6 km',
      legWalkTime: '8 min',
      legStreetName: 'via Cortin Pass',
      plateImage: '/images/td-plate-01.jpg',
      distanceMarker: '2.6 KM',
    },
  ];

  const filtered = catalog.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#183D2B]/40 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl bg-[#FAF8F3] border border-[#183D2B]/20 p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#183D2B]/10">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#4E6B48] font-bold block">
              WAYPOINT REPOSITORY
            </span>
            <h3 className="text-xl font-serif font-bold text-[#183D2B]">
              Pin Another Discovery Waypoint
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#183D2B]/60 hover:text-[#183D2B] hover:bg-[#183D2B]/5 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#183D2B]/40" />
          <input
            type="text"
            placeholder="Search verified heritage checkpoints, viewpoints, ateliers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#183D2B]/20 bg-white/70 text-xs text-[#183D2B] placeholder:text-[#183D2B]/40 focus:outline-hidden font-sans"
          />
        </div>

        {/* List */}
        <div className="max-h-[300px] overflow-y-auto space-y-2 py-1">
          {filtered.map((item) => {
            const alreadyAdded = existingIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="p-3 rounded-xl border border-[#183D2B]/15 bg-white/70 flex items-start justify-between gap-3 hover:border-[#183D2B]/30 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="px-1.5 py-0.5 rounded bg-[#ECE8DD] text-[9px] font-mono font-bold text-[#183D2B]">
                      {item.categoryTag}
                    </span>
                    <span className="text-[9px] font-mono text-[#183D2B]/60">
                      ~{item.estimatedMinutes} MIN
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-[#183D2B] truncate">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#183D2B]/70 line-clamp-1 font-sans">
                    {item.description}
                  </p>
                </div>

                <button
                  type="button"
                  disabled={alreadyAdded}
                  onClick={() => {
                    onAddWaypoint(item);
                    onClose();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all shrink-0 cursor-pointer ${
                    alreadyAdded
                      ? 'bg-[#ECE8DD] text-[#183D2B]/40 cursor-not-allowed'
                      : 'bg-[#183D2B] text-[#FAF8F3] hover:bg-[#183D2B]/90 shadow-2xs'
                  }`}
                >
                  {alreadyAdded ? 'ADDED ✓' : '+ PIN'}
                </button>
              </div>
            );
          })}
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
      zone: 'Sector 04 — Fontainhas',
    },
    {
      name: 'Fontainhas Gate / Latin Quarter Entrance',
      coord: '15°29\'50"N · 73°49\'45"E',
      zone: 'Sector 04 — North Gate',
    },
    {
      name: 'Church of Our Lady of the Immaculate Conception',
      coord: '15°29\'52"N · 73°49\'32"E',
      zone: 'Sector 02 — Church Square',
    },
    {
      name: 'Old Secretariat Ramparts / Mandovi Quay',
      coord: '15°30\'01"N · 73°49\'38"E',
      zone: 'Sector 01 — Waterfront Port',
    },
    {
      name: 'Miramar Coastal Promenade Overlook',
      coord: '15°28\'44"N · 73°48\'20"E',
      zone: 'Sector 06 — Estuary Mouth',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#183D2B]/40 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-[#FAF8F3] border border-[#183D2B]/20 p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#183D2B]/10">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#4E6B48] font-bold block">
              EXPEDITION DATUM
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

        <div className="space-y-2">
          {locations.map((loc) => (
            <button
              type="button"
              key={loc.name}
              onClick={() => {
                onSelectLocation({ name: loc.name, coord: loc.coord });
                onClose();
              }}
              className="w-full text-left p-3 rounded-xl border border-[#183D2B]/15 bg-white/70 hover:bg-[#EBF2EB]/50 hover:border-[#183D2B]/40 transition-all flex items-start gap-3 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#183D2B] shrink-0 mt-0.5" />
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
