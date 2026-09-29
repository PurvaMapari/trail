import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="w-full border-t border-[#183D2B]/15 bg-[#FAF8F3] py-16 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#183D2B]/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo/trail-logo.png"
                alt="TRAIL"
                width={28}
                height={28}
                className="object-contain"
              />
              <span className="font-serif text-2xl font-bold tracking-tight text-[#183D2B]">
                TRAIL
              </span>
            </Link>
            <p className="font-serif italic text-base text-[#4E6B48]">
              &ldquo;Don&apos;t just get there. Discover along the way.&rdquo;
            </p>
            <p className="text-xs text-[#183D2B]/70 max-w-sm leading-relaxed font-sans">
              A curated cartographic network connecting independent roasteries, second-hand bookshops,
              panoramic viewpoints, and forgotten architectural passages across living terrain.
            </p>
            <div className="text-[10px] font-mono text-[#183D2B]/50 uppercase tracking-widest pt-2">
              EST. 2026 // CARTOGRAPHIC EXPEDITION SYSTEM
            </div>
          </div>

          {/* Col 1: Explore */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#183D2B] mb-4">
              Traverses
            </h4>
            <ul className="space-y-2.5 text-xs text-[#183D2B]/70 font-sans">
              <li>
                <Link href="/explore" className="hover:text-[#183D2B] transition-colors">
                  Explore All (42)
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-[#183D2B] transition-colors">
                  Coastal Overlooks
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-[#183D2B] transition-colors">
                  Literary &amp; Roastery Walks
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-[#183D2B] transition-colors">
                  Secret Stairways
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-[#183D2B] transition-colors">
                  Urban Murals
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Cartography */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#183D2B] mb-4">
              Cartography
            </h4>
            <ul className="space-y-2.5 text-xs text-[#183D2B]/70 font-sans">
              <li>
                <a href="#cartography" className="hover:text-[#183D2B] transition-colors">
                  Topographic Engine
                </a>
              </li>
              <li>
                <a href="#protocol" className="hover:text-[#183D2B] transition-colors">
                  Four-Step Protocol
                </a>
              </li>
              <li>
                <a href="#hardware" className="hover:text-[#183D2B] transition-colors">
                  Field Instrument
                </a>
              </li>
              <li>
                <Link href="/ai-discovery" className="hover:text-[#183D2B] transition-colors">
                  Algorithmic Compass
                </Link>
              </li>
              <li>
                <Link href="/create-trail" className="hover:text-[#183D2B] transition-colors">
                  Submit Field Dossier
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Protocol */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#183D2B] mb-4">
              Protocol
            </h4>
            <ul className="space-y-2.5 text-xs text-[#183D2B]/70 font-sans">
              <li>
                <span className="text-[#183D2B]/60">Zero Ad Tracking</span>
              </li>
              <li>
                <span className="text-[#183D2B]/60">Pedestrian-First Policy</span>
              </li>
              <li>
                <span className="text-[#183D2B]/60">Community Registry</span>
              </li>
              <li>
                <span className="text-[#183D2B]/60">Offline Architecture</span>
              </li>
              <li>
                <span className="text-[#183D2B]/60">Field Guide Manifesto</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-wider text-[#183D2B]/50">
          <p>&copy; {new Date().getFullYear()} TRAIL CARTOGRAPHIC INITIATIVE. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4">
            <span>37.7749° N, 122.4194° W</span>
            <span>&bull;</span>
            <span className="text-[#E36A2E] font-semibold">EDITION 01 ACTIVE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
