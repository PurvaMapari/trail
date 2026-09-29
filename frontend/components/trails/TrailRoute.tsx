import React from 'react';
import { TrailStop as TrailStopType } from '@/types/trail';
import { TrailStop } from './TrailStop';

export interface TrailRouteProps {
  stops: TrailStopType[];
  currentStopId?: string;
}

export function TrailRoute({ stops, currentStopId }: TrailRouteProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-primary">Trail Route</h3>
      <div className="space-y-3">
        {stops.map((stop, index) => (
          <TrailStop
            key={stop.id}
            stop={stop}
            index={index}
            isActive={currentStopId === stop.id}
          />
        ))}
      </div>
    </div>
  );
}
