'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Award } from 'lucide-react';
import { RichTrail, DetailedStop } from '@/data/trails';

interface FieldNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStop: DetailedStop;
  onSaveNote: (note: { text: string; tag: string; timestamp: string }) => void;
}

export function FieldNoteModal({
  isOpen,
  onClose,
  currentStop,
  onSaveNote,
}: FieldNoteModalProps) {
  const [noteText, setNoteText] = useState('');
  const [selectedTag, setSelectedTag] = useState('Atmosphere');

  if (!isOpen) return null;

  const tags = ['Atmosphere', 'Architecture', 'History', 'Flavors', 'Hidden Detail'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    onSaveNote({
      text: noteText,
      tag: selectedTag,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
    setNoteText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#183D2B]/40 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl bg-[#FAF8F3] border border-[#183D2B]/20 p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#183D2B]/10">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#4E6B48] font-bold block">
              DISCOVERY LOGBOOK ENTRY
            </span>
            <h3 className="text-xl font-serif font-bold text-[#183D2B]">
              Add Field Note — {currentStop.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#183D2B]/60 hover:text-[#183D2B] hover:bg-[#183D2B]/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono uppercase text-[#183D2B]/70 mb-1.5 font-semibold">
              Observation Category
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-mono tracking-wider transition-colors ${
                    selectedTag === tag
                      ? 'bg-[#183D2B] text-[#FAF8F3] font-bold'
                      : 'bg-[#ECE8DD] text-[#183D2B]/70 hover:bg-[#183D2B]/10'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-[#183D2B]/70 mb-1.5 font-semibold">
              Field Observation
            </label>
            <textarea
              rows={4}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Record architectural nuances, scents, courtyard sounds, or local conversations..."
              className="w-full p-3 rounded-xl border border-[#183D2B]/20 bg-white/70 text-sm text-[#183D2B] placeholder:text-[#183D2B]/40 focus:outline-hidden focus:border-[#183D2B] font-sans"
              autoFocus
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-mono uppercase text-[#183D2B]/70 hover:bg-[#183D2B]/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!noteText.trim()}
              className="px-5 py-2.5 rounded-xl bg-[#183D2B] hover:bg-[#183D2B]/90 disabled:opacity-50 text-[#FAF8F3] text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-sm"
            >
              Save to Expedition Dossier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface TrailCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  trail: RichTrail;
  notesCount: number;
}

export function TrailCompletionModal({
  isOpen,
  onClose,
  trail,
  notesCount,
}: TrailCompletionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#183D2B]/50 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-[#FAF8F3] border border-[#183D2B]/20 p-6 sm:p-8 shadow-2xl text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#183D2B] text-[#FAF8F3] flex items-center justify-center mx-auto shadow-md">
          <Award className="w-8 h-8 text-[#E36A2E]" />
        </div>

        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#4E6B48] font-bold block mb-1">
            EXPEDITION LEDGER VERIFIED
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#183D2B]">
            Trail Successfully Completed
          </h2>
          <p className="text-sm text-[#183D2B]/70 mt-1 font-sans">
            You traversed the curated stations of <span className="font-semibold text-[#183D2B]">{trail.title}</span>.
          </p>
        </div>

        {/* 3 Metric Summary Boxes */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#ECE8DD]/60 border border-[#183D2B]/10 text-center font-mono">
          <div>
            <span className="block text-[10px] text-[#183D2B]/60 uppercase">Distance</span>
            <span className="text-lg font-bold text-[#183D2B]">{trail.distanceKm.toFixed(1)} KM</span>
          </div>
          <div>
            <span className="block text-[10px] text-[#183D2B]/60 uppercase">Stations</span>
            <span className="text-lg font-bold text-[#183D2B]">{trail.detailedStops?.length || 4} / 4</span>
          </div>
          <div>
            <span className="block text-[10px] text-[#183D2B]/60 uppercase">Field Notes</span>
            <span className="text-lg font-bold text-[#183D2B]">{notesCount}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Link
            href="/explore"
            className="w-full px-5 py-3 rounded-xl bg-[#183D2B] hover:bg-[#183D2B]/90 text-[#FAF8F3] text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-sm text-center"
          >
            Explore Next Trail
          </Link>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-[#183D2B]/20 text-[#183D2B] hover:bg-[#183D2B]/5 text-xs font-mono font-bold tracking-wider uppercase transition-all"
          >
            Review Logbook
          </button>
        </div>
      </div>
    </div>
  );
}

interface TrailOverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  trail: RichTrail;
  stops: DetailedStop[];
  onSelectStop: (index: number) => void;
}

export function TrailOverviewModal({
  isOpen,
  onClose,
  trail,
  stops,
  onSelectStop,
}: TrailOverviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#183D2B]/40 backdrop-blur-xs">
      <div className="w-full max-w-2xl max-h-[85vh] rounded-2xl bg-[#FAF8F3] border border-[#183D2B]/20 p-6 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-[#183D2B]/10">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#4E6B48] font-bold block">
              FULL EXPEDITION ITINERARY
            </span>
            <h3 className="text-xl font-serif font-bold text-[#183D2B]">
              {trail.title} — All Stations
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#183D2B]/60 hover:text-[#183D2B] hover:bg-[#183D2B]/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {stops.map((stop, idx) => (
            <div
              key={stop.id || idx}
              onClick={() => {
                onSelectStop(idx);
                onClose();
              }}
              className="p-4 rounded-xl border border-[#183D2B]/15 bg-white/70 hover:border-[#183D2B]/40 hover:bg-white transition-all cursor-pointer flex items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-[#183D2B] text-[#FAF8F3] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <h4 className="font-serif font-bold text-[#183D2B] text-base">{stop.name}</h4>
                  <p className="text-xs text-[#183D2B]/70 mt-0.5 line-clamp-1">{stop.description}</p>
                  <span className="text-[10px] font-mono text-[#183D2B]/50 mt-1 block">
                    {stop.locationLabel} · {stop.distanceMarker || `${(idx * 0.8).toFixed(1)} KM`}
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#E36A2E] shrink-0">
                JUMP →
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
