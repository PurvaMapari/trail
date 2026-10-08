export type CuratorLocation =
  | 'Panaji (Fontainhas & Altinho)'
  | 'Fontainhas Latin Quarter'
  | 'Altinho Hilltop & Viewpoints'
  | 'Campal & Mandovi Waterfront'
  | 'Miramar Coastal Edge';

export type CuratorTime = '1 Hour' | '2 Hours' | '3 Hours' | '4 Hours';

export type CuratorInterest =
  | 'Art & Culture'
  | 'Coffee & Roasteries'
  | 'Heritage Architecture'
  | 'Books & Prints'
  | 'Secret Courtyards'
  | 'Viewpoints & Vistas'
  | 'Local Bakeries & Food';

export type CuratorMood =
  | 'Curious'
  | 'Relaxed'
  | 'Contemplative'
  | 'Energetic'
  | 'Romantic';

export type CuratorTravelStyle =
  | 'Walking'
  | 'Slow Wanderer'
  | 'Photography Pace'
  | 'Active Strider';

export interface CuratorPreferences {
  location: CuratorLocation | string;
  availableTime: CuratorTime | string;
  timeHours: number;
  interests: CuratorInterest[] | string[];
  mood: CuratorMood | string;
  travelStyle: CuratorTravelStyle | string;
  adaptationModifier?: 'default' | 'slower' | 'more-culture' | 'less-walking';
}

export interface PersonalizedStop {
  id: string;
  originalSpotId: string;
  order: number;
  name: string;
  shortName: string;
  categoryTag: string;
  quarter: string;
  address: string;
  dwellTimeMinutes: number;
  dwellTimeLabel: string;
  walkToNextDistanceKm: number;
  walkToNextMinutes: number;
  walkToNextLabel: string;
  walkToNextStreet: string;
  whySelected: string;
  curatorClue: string;
  image: string;
  vibes: string[];
  openingHours?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  verifiedStatus: {
    isVetted: boolean;
    vettedBy: string;
    surveyNote: string;
  };
}

export interface TimeBudgetBreakdown {
  totalDwellMinutes: number;
  totalWalkMinutes: number;
  totalDurationMinutes: number;
  totalDurationLabel: string;
  budgetMinutes: number;
  bufferMinutes: number;
  budgetComparisonLabel: string;
  bufferExplanation: string;
}

export interface AIMatchExplanation {
  headline: string;
  overallScore: number;
  moodAlignment: string;
  interestAlignment: string;
  paceAlignment: string;
  curatorSummary: string;
}

export interface PersonalizedTrail {
  id: string;
  title: string;
  subtitle: string;
  variationLabel: string;
  shortDescription: string;
  matchScore: number;
  matchBreakdown: string;
  aiExplanation: AIMatchExplanation;
  timeBudget: TimeBudgetBreakdown;
  totalDurationLabel: string;
  totalDurationMinutes: number;
  totalDistanceKm: number;
  departurePoint: string;
  terminusPoint: string;
  recommendedStops: PersonalizedStop[];
  preferences: CuratorPreferences;
  createdAt: string;
}

export interface CuratedTrailResult {
  primaryTrail: PersonalizedTrail;
  alternativeTrails: PersonalizedTrail[];
}
