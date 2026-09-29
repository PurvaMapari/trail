import { TrailCategory } from './trail';

export interface AIDiscoveryRequest {
  prompt: string;
  city?: string;
  durationHours?: number;
  categories?: TrailCategory[];
  vibe?: string;
}

export interface AIDiscoverySuggestion {
  title: string;
  theme: string;
  summary: string;
  estimatedStops: number;
  highlightCategory: TrailCategory;
  tags: string[];
}

export interface AIDiscoveryResponse {
  query: string;
  suggestions: AIDiscoverySuggestion[];
  generatedAt: string;
}
