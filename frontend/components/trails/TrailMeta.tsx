import React from 'react';
import { Clock, MapPin, Footprints } from 'lucide-react';
import { formatDistance, formatDuration } from '@/lib/utils';

export interface TrailMetaProps {
  distanceKm?: number;
  durationMinutes?: number;
  stopsCount?: number;
  city?: string;
  className?: string;
}

export function TrailMeta({
  distanceKm,
  durationMinutes,
  stopsCount,
  city,
  className,
}: TrailMetaProps) {
  return (
    <div className={`flex flex-wrap items-center gap-3 text-xs text-primary/70 ${className || ''}`}>
      {city && (
        <span className="inline-flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-secondary" />
          {city}
        </span>
      )}
      {durationMinutes !== undefined && (
        <span className="inline-flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-secondary" />
          {formatDuration(durationMinutes)}
        </span>
      )}
      {distanceKm !== undefined && (
        <span className="inline-flex items-center gap-1">
          <Footprints className="w-3.5 h-3.5 text-secondary" />
          {formatDistance(distanceKm)}
        </span>
      )}
      {stopsCount !== undefined && (
        <span className="inline-flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded-full font-medium">
          {stopsCount} stops
        </span>
      )}
    </div>
  );
}
