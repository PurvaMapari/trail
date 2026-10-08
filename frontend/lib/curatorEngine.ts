import { curated_spots, Spot } from '@/data/spots';
import { RichTrail, DetailedStop, saveCustomTrail } from '@/data/trails';
import {
  CuratorPreferences,
  PersonalizedTrail,
  PersonalizedStop,
  CuratedTrailResult,
  TimeBudgetBreakdown,
  AIMatchExplanation,
} from '@/types/curator';

/**
 * Calculates geographic distance in km using the Haversine formula
 */
function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * Generates an authentic, personalized "Why selected" rationale
 * connecting the spot's real attributes to user's Mood, Interests, and Style.
 */
function generateWhySelected(
  spot: Spot,
  prefs: CuratorPreferences,
  isFirst: boolean,
  isLast: boolean
): string {
  const mood = (prefs.mood || 'Curious').toLowerCase();
  const style = (prefs.travelStyle || 'Walking').toLowerCase();
  const interests = (prefs.interests || []).map((i) => i.toLowerCase());

  let reason = '';

  if (isFirst) {
    if (spot.category === 'coffee' || spot.category === 'food') {
      reason = `Selected as the opening anchor for your ${prefs.availableTime} journey — grounds your senses with artisan pour-overs in a peaceful courtyard setting before taking to the streets.`;
    } else {
      reason = `Selected as your departure waypoint in ${spot.location.quarter} to establish an unhurried, atmospheric tone aligned with your ${prefs.mood} mood.`;
    }
  } else if (isLast) {
    if (spot.category === 'viewpoint' || spot.vibes.includes('sunset') || spot.vibes.includes('scenic')) {
      reason = `Chosen as the panoramic terminus to reward your ${style} route with sweeping golden-hour vistas over ${spot.location.quarter} and the Mandovi estuary.`;
    } else {
      reason = `Selected as your final reflective destination — offers a shaded, quiet courtyard to sit and review field notes.`;
    }
  } else {
    // Intermediate stops
    if (interests.some((i) => i.includes('art') || i.includes('culture')) && (spot.category === 'art' || spot.category === 'street-art' || spot.category === 'heritage')) {
      reason = `Directly fulfills your Art & Culture preference, showcasing authentic local craftsmanship and preserved colonial architecture away from commercial crowds.`;
    } else if (interests.some((i) => i.includes('book')) && spot.category === 'bookstore') {
      reason = `Curated for your literary curiosity, providing an intimate haven with rare Goan histories and independent press editions.`;
    } else if (interests.some((i) => i.includes('courtyard')) && (spot.vibes.includes('colonial') || spot.description.includes('courtyard'))) {
      reason = `Handpicked for its secluded courtyard architecture, rewarding a ${mood} explorer with shaded pedestrian calm and historic masonry.`;
    } else {
      reason = `Selected for its high atmospheric resonance (${spot.noiseLevel} ambiance) and easy walking connectivity along the ${spot.location.quarter} corridor.`;
    }
  }

  if (mood.includes('curious')) {
    reason += ` Features subtle artisan details easily bypassed on traditional GPS maps.`;
  } else if (mood.includes('relaxed') || mood.includes('contemplative')) {
    reason += ` Low acoustic disruption lets you absorb the atmosphere at an unhurried cadence.`;
  }

  return reason;
}

/**
 * Generates an in-depth AI match explanation detailing why this trail fits
 * the user's specific inputs across Mood, Interests, Time, and Pace.
 */
function generateAIMatchExplanation(
  prefs: CuratorPreferences,
  matchScore: number,
  stopsCount: number,
  totalDistanceKm: number,
  timeBudget: TimeBudgetBreakdown
): AIMatchExplanation {
  const mood = prefs.mood || 'Curious';
  const interestsList = (prefs.interests || []).join(' & ');
  const style = prefs.travelStyle || 'Walking';

  return {
    headline: `Calibrated specifically for ${prefs.availableTime} of ${mood.toLowerCase()} exploration in ${prefs.location}.`,
    overallScore: matchScore,
    moodAlignment: `Mood (${mood}): Prioritizes secluded, character-rich spaces (such as historic courtyards, local artisan workshops, and quiet view benches) that reward curious exploration while avoiding high-traffic commercial zones.`,
    interestAlignment: `Interests (${interestsList}): Directly connects stops that celebrate ${interestsList}, ensuring each station offers authentic engagement rather than superficial walkthroughs.`,
    paceAlignment: `Pacing (${style}): Sequenced along a ${totalDistanceKm} KM corridor with an average ${Math.round(totalDistanceKm * 10.5)} min total walking transit time, allowing ${timeBudget.totalDwellMinutes} min of dedicated indoor and courtyard dwell time.`,
    curatorSummary: `This trail balances ${stopsCount} verified waypoints with ${timeBudget.totalDwellMinutes} minutes of unhurried dwell time and ${timeBudget.totalWalkMinutes} minutes of shaded walking. An intentional ${timeBudget.bufferMinutes} minute buffer protects you from transit anxiety and leaves room for spontaneous discoveries.`,
  };
}

/**
 * Builds a single Personalized Trail from candidate spots
 */
function buildPersonalizedTrailFromSpots(
  selectedSpots: Spot[],
  prefs: CuratorPreferences,
  variationNum: number,
  variationLabel: string
): PersonalizedTrail {
  const timeBudgetMinutes = prefs.timeHours * 60;
  const styleTerm = (prefs.travelStyle || 'Walking').toLowerCase();
  const locus = prefs.location || 'Panaji (Fontainhas & Altinho)';

  const plateImages = [
    '/images/explore-featured-bodega.jpg',
    '/images/active-trail/bookstore.jpg',
    '/images/active-trail/next_thumb.jpg',
    '/images/td-plate-04.jpg',
    '/images/td-plate-01.jpg',
  ];

  let cumulativeDistanceKm = 0;
  let totalDwellMinutes = 0;
  let totalWalkMinutes = 0;

  const personalizedStops: PersonalizedStop[] = selectedSpots.map((spot, index) => {
    const isFirst = index === 0;
    const isLast = index === selectedSpots.length - 1;
    const nextSpot = !isLast ? selectedSpots[index + 1] : null;

    let legDistanceKm = 0;
    let legWalkMinutes = 0;
    let walkLabel = 'TRAIL COMPLETED';
    let walkStreet = '';

    if (nextSpot) {
      legDistanceKm = calculateDistanceKm(
        spot.location.lat,
        spot.location.lng,
        nextSpot.location.lat,
        nextSpot.location.lng
      );
      if (legDistanceKm < 0.25) legDistanceKm = 0.35;
      cumulativeDistanceKm += legDistanceKm;

      // Pacing speed based on travel style
      const minPerKm = styleTerm.includes('active') ? 9 : styleTerm.includes('slow') ? 13 : 11;
      legWalkMinutes = Math.max(4, Math.round(legDistanceKm * minPerKm));
      totalWalkMinutes += legWalkMinutes;

      walkLabel = `${legWalkMinutes} min walk (${Math.round(legDistanceKm * 1000)}m)`;
      walkStreet = `via ${spot.location.quarter} pedestrian alleys toward ${nextSpot.shortName || nextSpot.name}`;
    }

    // Calibrate dwell time to time budget and modifier
    let dwellMinutes = spot.estimatedMinutes || 30;
    if (prefs.adaptationModifier === 'slower' || styleTerm.includes('slow')) {
      dwellMinutes = Math.round(dwellMinutes * 1.3);
    } else if (styleTerm.includes('active')) {
      dwellMinutes = Math.round(dwellMinutes * 0.85);
    }
    totalDwellMinutes += dwellMinutes;

    const whySelected = generateWhySelected(spot, prefs, isFirst, isLast);

    return {
      id: `curated-stop-${spot.id}-${index + 1}-v${variationNum}`,
      originalSpotId: spot.id,
      order: index + 1,
      name: spot.name,
      shortName: spot.shortName || spot.name.split('/')[0].trim(),
      categoryTag: `${spot.category.toUpperCase()} · ${spot.location.quarter.toUpperCase()}`,
      quarter: spot.location.quarter,
      address: spot.location.address,
      dwellTimeMinutes: dwellMinutes,
      dwellTimeLabel: `Spend ~${dwellMinutes} min`,
      walkToNextDistanceKm: legDistanceKm,
      walkToNextMinutes: legWalkMinutes,
      walkToNextLabel: walkLabel,
      walkToNextStreet: walkStreet,
      whySelected,
      curatorClue: spot.curatorNote,
      image: plateImages[index % plateImages.length],
      vibes: spot.vibes,
      openingHours: spot.openingHours,
      coordinates: {
        lat: spot.location.lat,
        lng: spot.location.lng,
      },
      verifiedStatus: {
        isVetted: true,
        vettedBy: 'TRAIL Panaji Field Cartographer',
        surveyNote: 'On-foot verified · Non-commercial curation',
      },
    };
  });

  const totalDurationMinutes = totalDwellMinutes + totalWalkMinutes;
  const hours = Math.floor(totalDurationMinutes / 60);
  const mins = totalDurationMinutes % 60;
  const totalDurationLabel = hours > 0 ? `${hours}h ${mins > 0 ? `${mins}m` : ''}` : `${mins} min`;

  const bufferMinutes = Math.max(0, timeBudgetMinutes - totalDurationMinutes);
  const budgetComparisonLabel = `${totalDurationLabel} planned against ${prefs.availableTime} budget`;
  const bufferExplanation =
    bufferMinutes > 0
      ? `${bufferMinutes} min reserved for unscripted pauses, photography, and spontaneous courtyard diversions.`
      : `Optimally planned to completely utilize your ${prefs.availableTime} window without rush.`;

  const timeBudget: TimeBudgetBreakdown = {
    totalDwellMinutes,
    totalWalkMinutes,
    totalDurationMinutes,
    totalDurationLabel,
    budgetMinutes: timeBudgetMinutes,
    bufferMinutes,
    budgetComparisonLabel,
    bufferExplanation,
  };

  const matchScore = Math.min(98, 92 + Math.min(6, (prefs.interests || []).length * 2) - (variationNum - 1) * 2);
  const matchBreakdown = `${matchScore}% Match · Calibrated for ${prefs.travelStyle} · ${prefs.mood} Mood · ${prefs.interests.slice(0, 2).join(' + ')}`;

  const first = personalizedStops[0];
  const last = personalizedStops[personalizedStops.length - 1];

  let title = '';
  if (variationNum === 1) {
    title = `The ${prefs.mood} ${prefs.interests[0] || 'Discovery'} Trail: ${first.shortName} to ${last.shortName}`;
  } else if (variationNum === 2) {
    title = `The Artisan & Colonial Flow: ${first.shortName} to ${last.shortName}`;
  } else {
    title = `The Hidden Quarters Drift: ${first.shortName} to ${last.shortName}`;
  }

  const shortDescription = `A personalized ${totalDurationLabel} walking itinerary across ${locus}. Calibrated for your ${prefs.mood.toLowerCase()} mood and ${prefs.travelStyle.toLowerCase()} pace, connecting ${personalizedStops.length} hand-vetted stops.`;

  const totalDistanceKm = Math.max(1.8, Math.round(cumulativeDistanceKm * 10) / 10);
  const aiExplanation = generateAIMatchExplanation(prefs, matchScore, personalizedStops.length, totalDistanceKm, timeBudget);

  return {
    id: `personalized-trail-${Date.now()}-v${variationNum}`,
    title,
    subtitle: matchBreakdown,
    variationLabel,
    shortDescription,
    matchScore,
    matchBreakdown,
    aiExplanation,
    timeBudget,
    totalDurationLabel,
    totalDurationMinutes,
    totalDistanceKm,
    departurePoint: first.name,
    terminusPoint: last.name,
    recommendedStops: personalizedStops,
    preferences: prefs,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Main AI Trail Curator Engine:
 * Returns the primary personalized trail PLUS 1–2 alternative dynamic variations.
 */
export async function curatePersonalizedTrailWithVariations(
  preferences: CuratorPreferences
): Promise<CuratedTrailResult> {
  const timeHours = preferences.timeHours || 2;
  const locus = preferences.location || 'Panaji (Fontainhas & Altinho)';
  const interests = preferences.interests || ['Art & Culture', 'Coffee & Roasteries'];
  const mood = preferences.mood || 'Curious';
  const travelStyle = preferences.travelStyle || 'Walking';

  // Target stop count: 1h -> 3 stops, 2h -> 3-4 stops, 3h -> 4 stops, 4h -> 4-5 stops
  let targetStopsCount = timeHours <= 1.5 ? 3 : timeHours <= 3 ? 4 : 5;
  if (preferences.adaptationModifier === 'less-walking') {
    targetStopsCount = Math.max(3, targetStopsCount - 1);
  }

  const interestTerms = interests.flatMap((i) => i.toLowerCase().split(/[\s&/]+/));
  const moodTerm = mood.toLowerCase();
  const styleTerm = travelStyle.toLowerCase();

  // Score all 24+ vetted spots
  const scoredSpots = curated_spots.map((spot) => {
    let score = 0;
    const searchable = `${spot.name} ${spot.category} ${spot.categoryTags.join(' ')} ${spot.vibes.join(' ')} ${spot.description} ${spot.curatorNote} ${spot.location.quarter}`.toLowerCase();

    // Interest scoring
    for (const term of interestTerms) {
      if (term.length > 2 && searchable.includes(term)) {
        score += 8;
      }
    }

    if (interests.some((i) => i.includes('Coffee')) && spot.category === 'coffee') score += 12;
    if (interests.some((i) => i.includes('Art')) && (spot.category === 'art' || spot.category === 'street-art')) score += 12;
    if (interests.some((i) => i.includes('Books')) && spot.category === 'bookstore') score += 14;
    if (interests.some((i) => i.includes('Heritage')) && spot.category === 'heritage') score += 10;
    if (interests.some((i) => i.includes('Viewpoints')) && spot.category === 'viewpoint') score += 10;
    if (interests.some((i) => i.includes('Courtyards')) && searchable.includes('courtyard')) score += 10;
    if (interests.some((i) => i.includes('Food') || i.includes('Bakery')) && spot.category === 'food') score += 10;

    // Adaptation modifier boosts
    if (preferences.adaptationModifier === 'more-culture') {
      if (spot.category === 'art' || spot.category === 'heritage' || spot.category === 'bookstore') score += 15;
    }
    if (preferences.adaptationModifier === 'less-walking') {
      if (spot.location.quarter === 'Fontainhas') score += 12;
    }

    // Mood alignment
    if (moodTerm === 'curious' && (spot.category === 'art' || spot.category === 'hidden-gem' || searchable.includes('secret') || searchable.includes('alley'))) {
      score += 7;
    }
    if (moodTerm === 'relaxed' && (spot.footTraffic === 'quiet' || spot.noiseLevel === 'quiet')) {
      score += 6;
    }
    if (moodTerm === 'contemplative' && (spot.category === 'viewpoint' || searchable.includes('atrium') || searchable.includes('quiet'))) {
      score += 7;
    }
    if (moodTerm === 'energetic' && (spot.location.quarter === 'Altinho' || searchable.includes('stair'))) {
      score += 6;
    }

    if (spot.highlighted) score += 2;

    return { spot, score };
  });

  scoredSpots.sort((a, b) => b.score - a.score);

  // Group into diverse candidate pools for Variation 1, Variation 2, and Variation 3
  const poolA = scoredSpots.slice(0, 10).map((s) => s.spot);
  const poolB = scoredSpots.slice(3, 14).map((s) => s.spot);
  const poolC = scoredSpots.slice(6, 18).map((s) => s.spot);

  function pickStopsFromPool(pool: Spot[], count: number, preferCategory?: string): Spot[] {
    const chosen: Spot[] = [];
    const usedCats = new Set<string>();

    if (preferCategory) {
      const topCat = pool.find((s) => s.category === preferCategory);
      if (topCat) {
        chosen.push(topCat);
        usedCats.add(topCat.category);
      }
    }

    for (const spot of pool) {
      if (chosen.length >= count) break;
      if (!chosen.some((c) => c.id === spot.id)) {
        if (!usedCats.has(spot.category) || chosen.length < 2) {
          chosen.push(spot);
          usedCats.add(spot.category);
        }
      }
    }

    // Backfill
    for (const spot of pool) {
      if (chosen.length >= count) break;
      if (!chosen.some((c) => c.id === spot.id)) {
        chosen.push(spot);
      }
    }

    // Sort logically: cafes first, viewpoints last
    chosen.sort((a, b) => {
      if (a.category === 'coffee' || a.category === 'food') return -1;
      if (b.category === 'coffee' || b.category === 'food') return 1;
      if (a.category === 'viewpoint') return 1;
      if (b.category === 'viewpoint') return -1;
      return 0;
    });

    return chosen;
  }

  // Generate 3 distinct curated routes
  const stops1 = pickStopsFromPool(poolA, targetStopsCount);
  const primaryTrail = buildPersonalizedTrailFromSpots(stops1, preferences, 1, 'Option 1: Recommended Balance');

  const stops2 = pickStopsFromPool(poolB, targetStopsCount, 'art');
  const variation2 = buildPersonalizedTrailFromSpots(stops2, preferences, 2, 'Option 2: Deep Cultural Narrative');

  const stops3 = pickStopsFromPool(poolC, targetStopsCount, 'viewpoint');
  const variation3 = buildPersonalizedTrailFromSpots(stops3, preferences, 3, 'Option 3: Courtyards & Scenic Vistas');

  // Save the primary trail to session storage as RichTrail for active-trail navigation
  const richTrail: RichTrail = {
    id: primaryTrail.id,
    title: primaryTrail.title,
    subtitle: primaryTrail.subtitle,
    description: primaryTrail.shortDescription,
    category: 'culture',
    categoryTags: preferences.interests.map((i) => i.toUpperCase()),
    city: 'Panaji',
    distanceKm: primaryTrail.totalDistanceKm,
    durationMinutes: primaryTrail.totalDurationMinutes,
    difficulty: primaryTrail.totalDistanceKm > 4 ? 'moderate' : 'easy',
    featured: true,
    orderBadge: `CURATED · ${primaryTrail.matchScore}% MATCH`,
    coverImage: primaryTrail.recommendedStops[0]?.image || '/images/explore-featured-bodega.jpg',
    stops: primaryTrail.recommendedStops.map((s) => ({
      id: s.id,
      name: s.name,
      description: s.whySelected,
      estimatedMinutes: s.dwellTimeMinutes,
    })),
    detailedStops: primaryTrail.recommendedStops.map((s, idx) => ({
      id: s.id,
      name: s.name,
      shortName: s.shortName,
      categoryTag: s.categoryTag,
      estimatedMinutes: s.dwellTimeMinutes,
      locationLabel: s.address,
      refCode: `REF: PNJ-0${idx + 1}`,
      plateTag: idx === 0 ? 'START ANCHOR' : idx === primaryTrail.recommendedStops.length - 1 ? 'TERMINUS' : `STATION 0${idx + 1}`,
      plateImage: s.image,
      distanceMarker: idx === 0 ? '0.0 KM' : `+${s.walkToNextDistanceKm} KM`,
      distanceKm: s.walkToNextDistanceKm,
      legLabel: `STATION 0${idx + 1}`,
      bearing: `${s.coordinates.lat.toFixed(4)}°N ${s.coordinates.lng.toFixed(4)}°E`,
      corridorLabel: s.quarter,
      surfaceType: 'Heritage Pavement',
      elevationChange: '+6M',
      elevationProfile: '+6M',
      description: s.whySelected,
      curatorClue: s.curatorClue,
      nextWalkDistance: `${s.walkToNextDistanceKm} KM AWAY`,
      nextWalkTime: s.walkToNextLabel,
    })),
  };

  saveCustomTrail(richTrail);

  return {
    primaryTrail,
    alternativeTrails: [variation2, variation3],
  };
}
