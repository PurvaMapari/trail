'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Compass, ArrowRight, PlusCircle, Layers } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#183D2B]/10 bg-[#F4F2EB]/95 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
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
        <nav className="hidden md:flex items-center gap-7 text-xs font-mono uppercase tracking-wider text-[#183D2B]/75">
          <Link href="/" className="hover:text-[#183D2B] transition-colors">
            Home
          </Link>
          <Link href="/explore" className="hover:text-[#183D2B] transition-colors">
            Explore Trails
          </Link>
          <Link href="/create-trail" className="hover:text-[#183D2B] transition-colors flex items-center gap-1">
            <PlusCircle className="w-3.5 h-3.5 text-[#4E6B48]" />
            Create Trail
          </Link>
          <Link href="/ai-discovery" className="hover:text-[#183D2B] transition-colors flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-[#E36A2E]" />
            AI Discovery
          </Link>
          <Link href="/wireframes" className="hover:text-[#183D2B] transition-colors flex items-center gap-1 font-semibold text-[#E36A2E]">
            <Layers className="w-3.5 h-3.5" />
            Wireframes
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
          <div className="flex flex-col space-y-3 text-sm font-mono uppercase tracking-wider text-[#183D2B]">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 border-b border-[#183D2B]/10"
            >
              Home
            </Link>
            <Link
              href="/explore"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 border-b border-[#183D2B]/10"
            >
              Explore Trails
            </Link>
            <Link
              href="/create-trail"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 border-b border-[#183D2B]/10 flex items-center justify-between"
            >
              <span>Create Trail</span>
              <PlusCircle className="w-4 h-4 text-[#4E6B48]" />
            </Link>
            <Link
              href="/ai-discovery"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 border-b border-[#183D2B]/10 flex items-center justify-between"
            >
              <span>AI Discovery</span>
              <Compass className="w-4 h-4 text-[#E36A2E]" />
            </Link>
            <Link
              href="/wireframes"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 border-b border-[#183D2B]/10 flex items-center justify-between text-[#E36A2E] font-bold"
            >
              <span>Screen Wireframes</span>
              <Layers className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-2">
            <Link
              href="/explore"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#183D2B] text-[#F4F2EB] text-xs font-mono uppercase tracking-wider"
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
