'use client';

/**
 * TRAIL Scout — Global Trail Context
 *
 * Shared state between the active-trail page and the TrailChatbot widget.
 * Allows TRAIL Scout to:
 *   1. Know what stops are already on the active itinerary
 *   2. Expose addSpot() so "Add to route" in SpotCards actually works
 *   3. Show contextual "nearby" prompts when a trail is active
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Spot } from '@/data/spots';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ActiveTrailStop {
  id: string;
  name: string;
  quarter?: string;
  estimatedMinutes?: number;
  /** true if this was added via the AI chatbot mid-trail */
  addedViaScout?: boolean;
}

interface TrailContextValue {
  /** Name of the currently active trail, if any */
  activeTrailName: string | null;
  /** Current stops in the active itinerary */
  activeStops: ActiveTrailStop[];
  /** Whether a trail is currently in progress */
  isTrailActive: boolean;
  /** Set the active trail context (called by active-trail page on mount) */
  setActiveTrail: (name: string, stops: ActiveTrailStop[]) => void;
  /** Clear trail context (called when trail ends) */
  clearActiveTrail: () => void;
  /** Add a spot to the active itinerary via TRAIL Scout */
  addSpotToTrail: (spot: Spot) => boolean;
  /** Recently added spots (shown as added in the chatbot) */
  recentlyAdded: string[];
}

// ─── Context ─────────────────────────────────────────────────────────────────

const TrailContext = createContext<TrailContextValue>({
  activeTrailName: null,
  activeStops: [],
  isTrailActive: false,
  setActiveTrail: () => {},
  clearActiveTrail: () => {},
  addSpotToTrail: () => false,
  recentlyAdded: [],
});

// ─── Provider ────────────────────────────────────────────────────────────────

export function TrailContextProvider({ children }: { children: React.ReactNode }) {
  const [activeTrailName, setActiveTrailName] = useState<string | null>(null);
  const [activeStops, setActiveStops] = useState<ActiveTrailStop[]>([]);
  const [recentlyAdded, setRecentlyAdded] = useState<string[]>([]);

  const setActiveTrail = useCallback((name: string, stops: ActiveTrailStop[]) => {
    setActiveTrailName(name);
    setActiveStops(stops);
  }, []);

  const clearActiveTrail = useCallback(() => {
    setActiveTrailName(null);
    setActiveStops([]);
    setRecentlyAdded([]);
  }, []);

  const addSpotToTrail = useCallback(
    (spot: Spot): boolean => {
      // Check if already on trail
      const alreadyExists = activeStops.some(
        (s) => s.id === spot.id || s.name.toLowerCase() === spot.name.toLowerCase()
      );
      if (alreadyExists) return false;

      const newStop: ActiveTrailStop = {
        id: spot.id,
        name: spot.name,
        quarter: spot.location.quarter,
        estimatedMinutes: spot.estimatedMinutes,
        addedViaScout: true,
      };

      setActiveStops((prev) => [...prev, newStop]);
      setRecentlyAdded((prev) => [...prev, spot.id]);

      // Persist to sessionStorage so active-trail page can pick it up
      if (typeof window !== 'undefined') {
        try {
          const existing = JSON.parse(
            window.sessionStorage.getItem('scout_added_stops') || '[]'
          ) as ActiveTrailStop[];
          window.sessionStorage.setItem(
            'scout_added_stops',
            JSON.stringify([...existing, newStop])
          );
        } catch {
          // ignore
        }
      }

      return true;
    },
    [activeStops]
  );

  return (
    <TrailContext.Provider
      value={{
        activeTrailName,
        activeStops,
        isTrailActive: !!activeTrailName,
        setActiveTrail,
        clearActiveTrail,
        addSpotToTrail,
        recentlyAdded,
      }}
    >
      {children}
    </TrailContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useTrailContext() {
  return useContext(TrailContext);
}
