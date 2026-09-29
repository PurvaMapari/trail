export type TrailCategory =
  | 'all'
  | 'food'
  | 'art'
  | 'culture'
  | 'nature'
  | 'hidden-gems'
  | 'street-art'
  | 'bookstores'
  | 'coffee';

export interface TrailStop {
  id: string;
  name: string;
  description: string;
  category?: string;
  estimatedMinutes?: number;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  imageUrl?: string;
}

export interface Trail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: TrailCategory;
  categoryTags?: string[];
  city: string;
  distanceKm: number;
  durationMinutes: number;
  difficulty?: 'easy' | 'moderate' | 'challenging';
  coverImage?: string;
  featuredImage?: string;
  stops: TrailStop[];
  author?: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  featured?: boolean;
  orderBadge?: string;
}

export interface TrailCategoryInfo {
  id: TrailCategory;
  name: string;
  iconName: string;
  description: string;
}
