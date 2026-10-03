'use client';

import React from 'react';
import Link from 'next/link';

export function FieldDeskFooter() {
  return (
    <footer className="mt-16 border-t border-[#183D2B]/15 bg-[#FAF8F3] pt-12 pb-8 text-[#183D2B]/80 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#183D2B]/10">
          {/* Brand & Edition */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="font-serif font-bold text-xl sm:text-2xl text-[#183D2B] tracking-wider">
                TRAIL
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#ECE8DD] text-[10px] font-mono font-bold text-[#183D2B]/80">
                ED. 01
              </span>
            </div>
            <p className="text-xs text-[#183D2B]/75 leading-relaxed font-sans max-w-sm">
              Geodetic field navigation, route ledgers, and cartographic intelligence for modern explorers.
            </p>
          </div>

          {/* Telemetry & Datum */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#183D2B] font-bold block mb-2">
              TELEMETRY & DATUM
            </span>
            <ul className="text-xs font-mono text-[#183D2B]/70 space-y-1">
              <li>GRID: 12-COL ASYMMETRIC</li>
              <li>REFERENCE: WGS 84 GEODETIC</li>
              <li>SYSTEM: TRAIL CORE V3.2</li>
              <li>NODE: STATION PANJIM-01</li>
            </ul>
          </div>

          {/* Field Desk Links */}
          <div className="md:col-span-2 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#183D2B] font-bold block mb-2">
              FIELD DESK
            </span>
            <ul className="text-xs font-mono text-[#183D2B]/75 space-y-1.5">
              <li>
                <Link href="/explore" className="hover:text-[#183D2B] transition-colors">
                  SURVEY LEDGER
                </Link>
              </li>
              <li>
                <Link href="/ai-discovery" className="hover:text-[#183D2B] transition-colors">
                  CONTOUR RECONNAISSANCE
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-[#183D2B] transition-colors">
                  WAYPOINT REPOSITORY
                </Link>
              </li>
              <li>
                <Link href="/active-trail" className="hover:text-[#183D2B] transition-colors">
                  EXPEDITION DISPATCHES
                </Link>
              </li>
            </ul>
          </div>

          {/* Colophon */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#183D2B] font-bold block mb-2">
              COLOPHON
            </span>
            <p className="text-xs text-[#183D2B]/75 leading-relaxed font-sans">
              Typeset in Source Serif 4 and IBM Plex Sans. Rendered on Warm Sand with Deep Forest accents under physical field specifications.
            </p>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-[10px] font-mono text-[#183D2B]/60 tracking-wider">
          <span>© {new Date().getFullYear()} TRAIL CARTOGRAPHIC INITIATIVE. ALL RIGHTS RESERVED.</span>
          <span>PANAJI, GOA · 15.4989° N, 73.8278° E</span>
        </div>
      </div>
    </footer>
  );
}
