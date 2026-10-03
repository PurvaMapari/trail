'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Compass, ArrowRight, PlusCircle } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname() || '';

  const isHomeActive = pathname === '/';
  const isExploreActive =
    pathname === '/explore' ||
    pathname.startsWith('/trails') ||
    pathname.startsWith('/active-trail');
  const isCreateActive = pathname.startsWith('/create-trail');
  const isAIDiscoveryActive = pathname.startsWith('/ai-discovery');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#183D2B]/10 bg-[#F4F2EB]/95 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/logo/trail-logo.png"
            alt="TRAIL"
            width={120}
            height={28}
            className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            priority
          />
          <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-[#183D2B]/5 text-[#183D2B]/60 border border-[#183D2B]/10">
            PANAJI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#183D2B]/75">
          <Link
            href="/"
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              isHomeActive
                ? 'bg-[#183D2B] text-[#FAF8F3] font-bold shadow-xs'
                : 'text-[#183D2B]/75 hover:text-[#183D2B] hover:bg-[#183D2B]/8'
            }`}
          >
            {isHomeActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#E36A2E] animate-pulse shrink-0" />
            )}
            <span>Home</span>
          </Link>

          <Link
            href="/explore"
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              isExploreActive
                ? 'bg-[#183D2B] text-[#FAF8F3] font-bold shadow-xs'
                : 'text-[#183D2B]/75 hover:text-[#183D2B] hover:bg-[#183D2B]/8'
            }`}
          >
            {isExploreActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#E36A2E] animate-pulse shrink-0" />
            )}
            <span>Explore Trails</span>
          </Link>

          <Link
            href="/create-trail"
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              isCreateActive
                ? 'bg-[#183D2B] text-[#FAF8F3] font-bold shadow-xs'
                : 'text-[#183D2B]/75 hover:text-[#183D2B] hover:bg-[#183D2B]/8'
            }`}
          >
            {isCreateActive ? (
              <span className="w-1.5 h-1.5 rounded-full bg-[#E36A2E] animate-pulse shrink-0" />
            ) : (
              <PlusCircle className="w-3.5 h-3.5 text-[#4E6B48]" />
            )}
            <span>Create Trail</span>
          </Link>

          <Link
            href="/ai-discovery"
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              isAIDiscoveryActive
                ? 'bg-[#183D2B] text-[#FAF8F3] font-bold shadow-xs'
                : 'text-[#183D2B]/75 hover:text-[#183D2B] hover:bg-[#183D2B]/8'
            }`}
          >
            {isAIDiscoveryActive ? (
              <span className="w-1.5 h-1.5 rounded-full bg-[#E36A2E] animate-pulse shrink-0" />
            ) : (
              <Compass className="w-3.5 h-3.5 text-[#E36A2E]" />
            )}
            <span>AI Discovery</span>
          </Link>
        </nav>

        {/* Right CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#183D2B] text-[#F4F2EB] text-xs font-mono uppercase tracking-wider hover:bg-[#4E6B48] transition-colors shadow-sm"
          >
            <span>Start a Trail</span>
            <ArrowRight className="w-3 h-3 text-[#E36A2E]" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#183D2B] hover:bg-[#183D2B]/5 focus:outline-none cursor-pointer"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#183D2B]/10 bg-[#F4F2EB] px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col space-y-2 text-sm font-mono uppercase tracking-wider text-[#183D2B]">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 px-3 rounded-lg flex items-center justify-between transition-all ${
                isHomeActive
                  ? 'bg-[#183D2B] text-[#FAF8F3] font-bold'
                  : 'hover:bg-[#183D2B]/5 text-[#183D2B]'
              }`}
            >
              <span>Home</span>
              {isHomeActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#E36A2E]" />
              )}
            </Link>

            <Link
              href="/explore"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 px-3 rounded-lg flex items-center justify-between transition-all ${
                isExploreActive
                  ? 'bg-[#183D2B] text-[#FAF8F3] font-bold'
                  : 'hover:bg-[#183D2B]/5 text-[#183D2B]'
              }`}
            >
              <span>Explore Trails</span>
              {isExploreActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#E36A2E]" />
              )}
            </Link>

            <Link
              href="/create-trail"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 px-3 rounded-lg flex items-center justify-between transition-all ${
                isCreateActive
                  ? 'bg-[#183D2B] text-[#FAF8F3] font-bold'
                  : 'hover:bg-[#183D2B]/5 text-[#183D2B]'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <PlusCircle className="w-4 h-4 text-[#4E6B48]" />
                <span>Create Trail</span>
              </span>
              {isCreateActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#E36A2E]" />
              )}
            </Link>

            <Link
              href="/ai-discovery"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2 px-3 rounded-lg flex items-center justify-between transition-all ${
                isAIDiscoveryActive
                  ? 'bg-[#183D2B] text-[#FAF8F3] font-bold'
                  : 'hover:bg-[#183D2B]/5 text-[#183D2B]'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#E36A2E]" />
                <span>AI Discovery</span>
              </span>
              {isAIDiscoveryActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#E36A2E]" />
              )}
            </Link>
          </div>

          <div className="pt-2">
            <Link
              href="/explore"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#183D2B] text-[#F4F2EB] text-xs font-mono uppercase tracking-wider font-semibold"
            >
              <span>Start a Trail</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E36A2E]" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
