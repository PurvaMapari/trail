'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FieldDeskFooter } from '@/components/layout/FieldDeskFooter';
import { CreateTrailHeader } from '@/components/create-trail/CreateTrailHeader';
import {
  CreateTrailForm,
  CreateTrailFormState
} from '@/components/create-trail/CreateTrailForm';
import {
  WaypointSequence,
  DraftWaypoint
} from '@/components/create-trail/WaypointSequence';
import { CreateTrailActions } from '@/components/create-trail/CreateTrailActions';
import {
  AddWaypointModal,
  LocationPickerModal
} from '@/components/create-trail/CreateTrailModals';
import { RichTrail, saveCustomTrail } from '@/data/trails';

export default function CreateTrailPage() {
  const router = useRouter();

  // Form State initialized to match Figma design
  const [formState, setFormState] = useState<CreateTrailFormState>({
    startingPoint: 'Panaji, Goa · Latin Quarter Fountain',
    geodeticCoord: '15°29\'56"N · 73°49\'40"E',
    selectedInterests: [
      'COFFEE & ROASTERIES',
      'BOOKS & ARCHIVES',
      'COLONIAL CULTURE',
      'HIDDEN GEMS',
    ],
    durationMinutes: 120,
    durationLabel: '2.0 HOURS',
    distanceKm: 3.5,
    distanceLabel: 'UP TO 3.5 KM',
  });

  // Waypoints matching the Figma reference
  const [waypoints, setWaypoints] = useState<DraftWaypoint[]>([
    {
      id: 'wp-01',
      name: 'Café Bodega / Sunlit Courtyard',
      shortName: 'Café Bodega',
      categoryTag: 'COFFEE · HERITAGE',
      estimatedMinutes: 30,
      description: 'Artisanal roast in an open 19th-century Portuguese colonial atrium.',
      locationLabel: 'FONTAINHAS COURTYARD',
      refCode: 'REF: FNT-CF-01',
      plateImage: '/images/explore-featured-bodega.jpg',
      distanceMarker: '0.4 KM',
      distanceKm: 0.4,
      legWalkDistance: '0.4 km',
      legWalkTime: '6 min',
      legStreetName: 'along Rua 31 de Janeiro',
      bearing: '042° NE',
      corridorLabel: 'RUA 31 DE JANEIRO CORRIDOR',
      surfaceType: 'PORTUGUESE BASALT',
      elevationChange: '+0M → +4M GRADIENT',
      elevationProfile: '+4M',
      curatorClue: 'Look for the sunlit fountain alcove behind the bakery counter.',
      quarterContext: 'One of the earliest Portuguese domestic residences converted into an open atelier.',
    },
    {
      id: 'wp-02',
      name: "Singbal's Book House / Vintage Corner",
      shortName: "Singbal's Books",
      categoryTag: 'BOOKS · HISTORY',
      estimatedMinutes: 25,
      description: 'Historic bookstore stocking Goan folklore, cartography & poetry.',
      locationLabel: 'CHURCH SQUARE CORNER',
      refCode: 'REF: FNT-BK-02',
      plateImage: '/images/active-trail/bookstore.jpg',
      distanceMarker: '1.2 KM',
      distanceKm: 1.2,
      legWalkDistance: '0.8 km',
      legWalkTime: '11 min',
      legStreetName: 'through Altinho Stairway',
      bearing: '310° NW',
      corridorLabel: 'ALTINHO INCLINE PASS',
      surfaceType: 'HERITAGE COBBLESTONE',
      elevationChange: '+4M → +12M GRADIENT',
      elevationProfile: '+12M',
      curatorClue: 'Ask for the rare maritime editions stored in the high teak mezzanine.',
      quarterContext: 'Stands adjacent to the monumental whitewashed church steps constructed in 1541.',
    },
    {
      id: 'wp-03',
      name: 'Rua 31 de Janeiro Fresco Corridor',
      shortName: 'Fresco Corridor',
      categoryTag: 'ART · STREET ARCHIVE',
      estimatedMinutes: 20,
      description: 'Ochre azulejos, tiled facades, and quiet bougainvillea corridors.',
      locationLabel: 'CHAPEL INTERSECTION',
      refCode: 'REF: FNT-ART-03',
      plateImage: '/images/active-trail/next_thumb.jpg',
      distanceMarker: '2.0 KM',
      distanceKm: 2.0,
      legWalkDistance: '0.6 km',
      legWalkTime: '8 min',
      legStreetName: 'via Church Square',
      bearing: '280° W',
      corridorLabel: 'FRESCO PASSAGEWAY',
      surfaceType: 'LATERITE FLAGSTONE',
      elevationChange: '+12M → +8M GRADIENT',
      elevationProfile: '+8M',
      curatorClue: 'Examine the floral hand-painted border tiles beneath the second-storey wooden balcony.',
      quarterContext: 'Vibrant indigo and ochre pigments represent the traditional caste and mercantile distinctions.',
    },
    {
      id: 'wp-04',
      name: 'Mandovi Riverside Terrace & Sunset Perch',
      shortName: 'Riverside Terrace',
      categoryTag: 'NATURE · VIEW',
      estimatedMinutes: 35,
      description: 'Open promenade facing the delta ferry slips and tidal mangrove channels.',
      locationLabel: 'MANDOVI WATERFRONT',
      refCode: 'REF: FNT-TRM-04',
      plateImage: '/images/td-plate-04.jpg',
      distanceMarker: '3.2 KM',
      distanceKm: 3.2,
      legWalkDistance: '0.9 km',
      legWalkTime: '12 min',
      legStreetName: 'along Dayanand Bandodkar Marg',
      bearing: '265° W',
      corridorLabel: 'RIVERSIDE EMBANKMENT',
      surfaceType: 'GRANITE PROMENADE',
      elevationChange: '+8M → +2M GRADIENT',
      elevationProfile: '+2M',
      curatorClue: 'Stone seating under the ancient banyans catches uninterrupted ocean breezes as dusk settles.',
      quarterContext: 'Historically the terminal loading quay for river vessels arriving from Old Goa.',
    },
  ]);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form handlers
  const handleFormChange = (updates: Partial<CreateTrailFormState>) => {
    setFormState((prev) => ({ ...prev, ...updates }));
    setErrorMessage(null);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setWaypoints((prev) => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const handleMoveDown = (index: number) => {
    if (index >= waypoints.length - 1) return;
    setWaypoints((prev) => {
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const handleRemove = (index: number) => {
    if (waypoints.length <= 2) {
      setErrorMessage('A curated trail requires at least 2 waypoint checkpoints.');
      return;
    }
    setWaypoints((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleAddWaypoint = (wp: DraftWaypoint) => {
    setWaypoints((prev) => [...prev, wp]);
    setErrorMessage(null);
  };

  // Submit and generate trail
  const handleCreateTrail = () => {
    if (formState.selectedInterests.length === 0) {
      setErrorMessage('Please select at least one thematic interest.');
      return;
    }
    if (waypoints.length < 2) {
      setErrorMessage('Please include at least 2 waypoint checkpoints.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    // Create unique dynamic trail ID
    const trailId = `custom-latin-quarter-${Date.now().toString().slice(-4)}`;

    // Build complete RichTrail object
    const generatedTrail: RichTrail = {
      id: trailId,
      title: 'Latin Quarter Discovery Traverse',
      subtitle: `An intentional ${formState.durationLabel.toLowerCase()} route curated for ${formState.selectedInterests.slice(0, 2).join(' & ').toLowerCase()}.`,
      description: `Curated pedestrian traverse originating at ${formState.startingPoint}. Connecting ${waypoints.length} historic anchors, courtyard roasteries, and river views.`,
      category: 'culture',
      categoryTags: formState.selectedInterests.map((item) =>
        item.split('&')[0].trim()
      ),
      city: 'Panaji',
      distanceKm: formState.distanceKm,
      durationMinutes: formState.durationMinutes,
      difficulty: 'easy',
      featured: true,
      orderBadge: 'DRAFT // CUSTOM TRAIL',
      coverImage: waypoints[0]?.plateImage || '/images/explore-card-1.jpg',
      featuredImage: waypoints[0]?.plateImage || '/images/explore-featured-bodega.jpg',
      heroImage: waypoints[0]?.plateImage || '/images/td-hero-capture.jpg',
      indexRef: `INDEX REF // PNJ-GEN-${Date.now().toString().slice(-4)}`,
      cadenceLabel: 'Curated Cadence',
      localeLabel: 'Panaji Vintage Sector',
      fieldLeadNotes: `Synthesized starting from ${formState.startingPoint}. Recommended unhurried pacing with 18 min/km pedestrian cadence.`,
      departurePoint: formState.startingPoint,
      terrainProfile: 'Cobblestone / Architectural Incline',
      optimalHours: '08:30 AM or 16:30 PM',
      stops: waypoints.map((wp, idx) => ({
        id: wp.id || `stop-${idx + 1}`,
        name: wp.name,
        description: wp.description,
        estimatedMinutes: wp.estimatedMinutes || 25,
      })),
      detailedStops: waypoints.map((wp, idx) => ({
        id: wp.id || `stop-${idx + 1}`,
        name: wp.name,
        shortName: wp.shortName || wp.name,
        categoryTag: wp.categoryTag || 'HERITAGE',
        estimatedMinutes: wp.estimatedMinutes || 25,
        locationLabel: wp.locationLabel || formState.startingPoint,
        refCode: wp.refCode || `REF: PNJ-0${idx + 1}`,
        plateTag: wp.plateTag || `PLATE // 0${idx + 1}`,
        plateImage: wp.plateImage || '/images/active-trail/bookstore.jpg',
        distanceMarker: `${(idx * (formState.distanceKm / waypoints.length)).toFixed(1)} KM`,
        distanceKm: Number((idx * (formState.distanceKm / waypoints.length)).toFixed(1)),
        legLabel: `STATION 0${idx + 1}`,
        bearing: wp.bearing || `${(idx * 75 + 40) % 360}°`,
        corridorLabel: wp.corridorLabel || `${wp.name} Corridor`,
        surfaceType: wp.surfaceType || 'Heritage Pavement',
        elevationChange: wp.elevationChange || '+2M → +8M GRADIENT',
        elevationProfile: wp.elevationProfile || '+6M',
        description: wp.description,
        curatorClue: wp.curatorClue || `Notice the distinctive architecture and historic courtyard details near ${wp.name}.`,
        quarterContext: wp.quarterContext || `An essential anchor in this custom traverse calibrated around ${formState.startingPoint}.`,
        nextWalkDistance: idx < waypoints.length - 1 ? `${wp.legWalkDistance || '0.6 km'} AWAY` : '0.0 KM',
        nextWalkTime: idx < waypoints.length - 1 ? `${wp.legWalkTime || '8 min'} WALK` : 'TRAIL COMPLETED',
      })),
    };

    // Save trail to session storage & memory registry
    saveCustomTrail(generatedTrail);

    // Navigate to generated trail details
    setTimeout(() => {
      router.push(`/trails/${generatedTrail.id}`);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F4F2EB] text-[#183D2B] flex flex-col">

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-16 space-y-6 w-full">
        {/* Header & Protocol Ribbon */}
        <CreateTrailHeader />

        {/* Validation Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-mono">
            {errorMessage}
          </div>
        )}

        {/* 2-Column Worktable Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (7 cols): Configuration Steps 01 to 04 */}
          <div className="lg:col-span-7 space-y-5">
            <CreateTrailForm
              formState={formState}
              onChange={handleFormChange}
              onOpenLocationPicker={() => setIsLocationModalOpen(true)}
            />
          </div>

          {/* Right Column (5 cols): 05 // Waypoint Sequence & Elevation */}
          <div className="lg:col-span-5 space-y-5">
            <WaypointSequence
              waypoints={waypoints}
              startingPoint={formState.startingPoint}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
              onRemove={handleRemove}
              onOpenAddModal={() => setIsAddModalOpen(true)}
              totalDistanceKm={formState.distanceKm}
              totalDurationMinutes={formState.durationMinutes}
            />
          </div>
        </div>

        {/* Bottom Action Ribbon */}
        <CreateTrailActions
          onSubmit={handleCreateTrail}
          isSubmitting={isSubmitting}
        />
      </main>

      {/* Archival Field Desk Footer */}
      <FieldDeskFooter />

      {/* Modals */}
      <AddWaypointModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddWaypoint={handleAddWaypoint}
        existingIds={waypoints.map((w) => w.id)}
      />

      <LocationPickerModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelectLocation={(loc) => {
          handleFormChange({
            startingPoint: loc.name,
            geodeticCoord: loc.coord,
          });
        }}
      />
    </div>
  );
}
