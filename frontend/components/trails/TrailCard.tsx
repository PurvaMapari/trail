import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trail } from '@/types/trail';

export interface TrailCardProps {
  trail: Trail;
}

export function TrailCard({ trail }: TrailCardProps) {
  const categoryLabel = trail.categoryTags?.join(' · ') || trail.category.toUpperCase();
  const durationHours = (trail.durationMinutes / 60).toFixed(trail.durationMinutes % 60 === 0 ? 0 : 1);
  const formattedDistance = trail.distanceKm < 10 ? `0${trail.distanceKm.toFixed(1)}` : trail.distanceKm.toFixed(1);
  const formattedStops = trail.stops.length < 10 ? `0${trail.stops.length}` : trail.stops.length;

  return (
    <div className="group rounded-2xl border border-[#183D2B]/15 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      {/* Top Image Container */}
      <div className="relative w-full aspect-[4/3] bg-[#E7E3D7] overflow-hidden">
        {trail.coverImage ? (
          <Image
            src={trail.coverImage}
            alt={trail.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs font-mono text-[#183D2B]/40">
            [TRAIL IMAGE]
          </div>
        )}

        {/* Order Badge */}
        {trail.orderBadge && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm border border-[#183D2B]/15 rounded px-2.5 py-1 text-[10px] font-mono font-bold text-[#183D2B] tracking-wider uppercase shadow-sm">
            {trail.orderBadge}
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#183D2B]/60 font-semibold block mb-1.5">
            {categoryLabel}
          </span>
          <h3 className="font-serif text-xl font-bold text-[#183D2B] leading-tight mb-2.5 group-hover:text-[#E36A2E] transition-colors">
            {trail.title}
          </h3>
          <p className="text-xs text-[#183D2B]/75 leading-relaxed font-sans line-clamp-3">
            {trail.subtitle || trail.description}
          </p>
        </div>

        {/* Bottom Meta & Button */}
        <div className="mt-6 pt-4 border-t border-[#183D2B]/10">
          <div className="text-[10px] font-mono text-[#183D2B]/60 uppercase tracking-wider mb-4 font-medium">
            {formattedStops} STOPS &bull; {formattedDistance} KM &bull; {durationHours} {Number(durationHours) === 1 ? 'HOUR' : 'HOURS'}
          </div>

          <Link
            href={`/trails/${trail.id}`}
            className="w-full inline-flex items-center justify-center py-2.5 rounded-xl border border-[#183D2B]/20 bg-[#FAF8F3] hover:bg-[#183D2B] hover:text-[#FAF8F3] text-xs font-mono uppercase tracking-wider font-semibold text-[#183D2B] transition-colors text-center"
          >
            VIEW TRAIL
          </Link>
        </div>
      </div>
    </div>
  );
}
