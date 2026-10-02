'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Compass, ArrowRight, Clock, MapPin, Sparkles, Coffee, BookOpen, Eye, Palette } from 'lucide-react';

interface StopPreview {
  id: string;
  num: string;
  name: string;
  time: string;
  category: string;
  note: string;
  image: string;
}

const stops: StopPreview[] = [
  {
    id: 's1',
    num: '01',
    name: 'Café Bodega',
    time: '9:00 AM',
    category: 'Coffee & Breakfast',
    note: 'Artisanal roasts and freshly baked pastries nestled in an open-air 19th-century Portuguese atrium.',
    image: '/images/explore-featured-bodega.jpg',
  },
  {
    id: 's2',
    num: '02',
    name: 'Heritage Bookstore & Gallery',
    time: '10:15 AM',
    category: 'Books & Prints',
    note: 'Rare Goan histories, indie press fiction, and vintage regional maps stacked in fragrant cedar shelves.',
    image: '/images/explore-card-2.jpg',
  },
  {
    id: 's3',
    num: '03',
    name: 'Fontainhas Chapel & Alley Murals',
    time: '11:30 AM',
    category: 'Street Art & Architecture',
    note: 'Vibrant cobalt blue and terracotta stucco facades leading to hidden ceramic tile murals.',
    image: '/images/explore-card-3.jpg',
  },
  {
    id: 's4',
    num: '04',
    name: 'Black Market Coffee Roastery',
    time: '12:45 PM',
    category: 'Cold Brew & Shaded Rest',
    note: 'Single-origin pour-overs served in a shaded alley courtyard under flowering bougainvillea.',
    image: '/images/explore-card-1.jpg',
  },
];

export function Hero() {
  const router = useRouter();
  const [activeStop, setActiveStop] = useState<StopPreview>(stops[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/explore');
    }
  };

  return (
    <section className="pt-8 sm:pt-14 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Top Tagline Pill */}
      <div className="flex items-center justify-center sm:justify-start mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#183D2B]/5 border border-[#183D2B]/10 text-xs font-mono text-[#183D2B]">
          <span className="w-2 h-2 rounded-full bg-[#E36A2E] animate-pulse" />
          <span>Curated Urban & Nature Walking Trails</span>
        </div>
      </div>

      {/* Main Hero Header */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10 sm:mb-14">
        <div className="lg:col-span-7">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[62px] leading-[1.08] font-bold text-[#183D2B] tracking-tight">
            Don&apos;t just get there. <br />
            <span className="italic font-normal text-[#4E6B48]">Discover along the way.</span>
          </h1>

          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#183D2B]/80 leading-relaxed font-sans max-w-2xl">
            Thoughtfully mapped walking routes connecting independent roasteries, second-hand bookshops,
            hidden murals, and scenic viewpoints.
          </p>

          {/* Quick Search & Explore Bar */}
          <form onSubmit={handleSearch} className="mt-6 sm:mt-8 max-w-xl flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#183D2B]/40" />
              <input
                type="text"
                placeholder="Search cafes, art, Panaji quarters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#183D2B]/20 bg-white text-xs sm:text-sm font-sans text-[#183D2B] placeholder:text-[#183D2B]/40 focus:outline-none focus:ring-2 focus:ring-[#183D2B] shadow-sm transition-all"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#183D2B] hover:bg-[#4E6B48] text-white text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold shadow-sm transition-all cursor-pointer shrink-0"
            >
              <span>Explore</span>
              <ArrowRight className="w-4 h-4 text-[#E36A2E]" />
            </button>
          </form>

          {/* Quick Category Chips */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-mono text-[#183D2B]/70">
            <span className="text-[11px] uppercase tracking-wider text-[#183D2B]/40 mr-1">Popular:</span>
            <Link href="/explore?cat=food" className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/60 hover:bg-white border border-[#183D2B]/10 hover:border-[#183D2B]/30 transition-colors">
              <Coffee className="w-3 h-3 text-[#E36A2E]" />
              <span>Cafes</span>
            </Link>
            <Link href="/explore?cat=art" className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/60 hover:bg-white border border-[#183D2B]/10 hover:border-[#183D2B]/30 transition-colors">
              <Palette className="w-3 h-3 text-[#4E6B48]" />
              <span>Street Art</span>
            </Link>
            <Link href="/explore?cat=culture" className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/60 hover:bg-white border border-[#183D2B]/10 hover:border-[#183D2B]/30 transition-colors">
              <BookOpen className="w-3 h-3 text-[#183D2B]" />
              <span>Heritage</span>
            </Link>
            <Link href="/ai-discovery" className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#E36A2E]/10 hover:bg-[#E36A2E]/20 text-[#E36A2E] border border-[#E36A2E]/20 font-bold transition-colors">
              <Sparkles className="w-3 h-3" />
              <span>AI Route Planner</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Clean Interactive Trail Card Preview */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-[#183D2B]/15 bg-white shadow-lg overflow-hidden flex flex-col transition-all">
            {/* Header info */}
            <div className="p-5 border-b border-[#183D2B]/10 bg-[#FAF8F3] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#E36A2E] font-bold block">
                  FEATURED WALK
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#183D2B]">
                  Hidden Cafés & Heritage of Panaji
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#4E6B48]/15 text-[#183D2B] text-[10px] font-mono font-semibold">
                3.2 KM · 2H
              </span>
            </div>

            {/* Selected Stop Photo & Details */}
            <div className="relative h-48 sm:h-52 bg-[#E7E3D7] overflow-hidden">
              <Image
                src={activeStop.image}
                alt={activeStop.name}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#E36A2E] bg-white/90 px-2 py-0.5 rounded font-bold inline-block mb-1">
                  Stop {activeStop.num} · {activeStop.time}
                </span>
                <h4 className="font-serif text-lg font-bold leading-tight">
                  {activeStop.name}
                </h4>
                <p className="text-xs text-white/90 line-clamp-2 mt-0.5 font-sans">
                  {activeStop.note}
                </p>
              </div>
            </div>

            {/* Clickable Waypoint Timeline */}
            <div className="p-4 bg-white space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#183D2B]/50 font-bold block mb-1">
                Select a stop along the trail:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {stops.map((stop) => {
                  const isSelected = activeStop.id === stop.id;
                  return (
                    <button
                      key={stop.id}
                      type="button"
                      onClick={() => setActiveStop(stop)}
                      className={`p-2 rounded-xl text-left transition-all border cursor-pointer ${
                        isSelected
                          ? 'border-[#183D2B] bg-[#183D2B] text-white shadow-sm'
                          : 'border-[#183D2B]/15 bg-[#FAF8F3] text-[#183D2B] hover:border-[#183D2B]/40'
                      }`}
                    >
                      <span className={`block text-[10px] font-mono font-bold ${isSelected ? 'text-[#E36A2E]' : 'text-[#183D2B]/60'}`}>
                        {stop.num}
                      </span>
                      <span className="block text-[11px] font-sans font-semibold truncate">
                        {stop.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Action Button */}
              <div className="pt-2">
                <Link
                  href="/trails/hidden-cafes-panaji"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#183D2B] hover:bg-[#4E6B48] text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors shadow-sm"
                >
                  <span>Start Walking This Trail</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E36A2E]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
