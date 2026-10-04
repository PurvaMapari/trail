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
            <Link href="/" className="inline-block group">
              <Image
                src="/logo/trail-logo.png"
                alt="TRAIL"
                width={120}
                height={28}
                className="h-8 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
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
                  All Walking Trails
                </Link>
              </li>
              <li>
                <Link href="/explore?cat=nature" className="hover:text-[#183D2B] transition-colors">
                  Coastal Overlooks
                </Link>
              </li>
              <li>
                <Link href="/explore?cat=food" className="hover:text-[#183D2B] transition-colors">
                  Cafés &amp; Roasteries
                </Link>
              </li>
              <li>
                <Link href="/explore?cat=hidden-gems" className="hover:text-[#183D2B] transition-colors">
                  Hidden Courtyards &amp; Gems
                </Link>
              </li>
              <li>
                <Link href="/explore?cat=art" className="hover:text-[#183D2B] transition-colors">
                  Street Art &amp; Murals
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Cartography & Tools */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#183D2B] mb-4">
              Discovery Tools
            </h4>
            <ul className="space-y-2.5 text-xs text-[#183D2B]/70 font-sans">
              <li>
                <Link href="/explore?tab=places" className="hover:text-[#183D2B] transition-colors">
                  21 Curated Places Database
                </Link>
              </li>
              <li>
                <Link href="/create-trail" className="hover:text-[#183D2B] transition-colors">
                  Create Custom Trail
                </Link>
              </li>
              <li>
                <Link href="/ai-discovery" className="hover:text-[#183D2B] transition-colors">
                  AI Route Scout
                </Link>
              </li>
              <li>
                <Link href="/active-trail" className="hover:text-[#183D2B] transition-colors">
                  Active Walking Guide
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
            <span>15.4989° N, 73.8278° E</span>
            <span>&bull;</span>
            <span className="text-[#E36A2E] font-semibold">EDITION 01 ACTIVE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
