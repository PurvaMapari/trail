import React from 'react';
import { TrailStop as TrailStopType } from '@/types/trail';
import { MapPin, Clock } from 'lucide-react';

export interface TrailStopProps {
  stop: TrailStopType;
  index: number;
  isActive?: boolean;
}

export function TrailStop({ stop, index, isActive = false }: TrailStopProps) {
  return (
    <div
      className={`p-4 rounded-xl border transition-all ${
        isActive
          ? 'border-accent bg-accent/5 shadow-sm ring-1 ring-accent'
          : 'border-primary/10 bg-white/50'
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-neutral text-xs font-bold shrink-0">
          {index + 1}
        </span>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-primary">{stop.name}</h4>
            <span className="text-xs text-primary/60 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {stop.estimatedMinutes} min
            </span>
          </div>
          <p className="text-xs text-primary/70 mt-1">{stop.description}</p>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-primary/50">
            <MapPin className="w-3 h-3 text-secondary" />
            <span>{stop.location?.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
