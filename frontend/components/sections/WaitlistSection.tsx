'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export function WaitlistSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-[#183D2B]/10">
      <div className="rounded-3xl bg-[#183D2B] text-white p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-xl text-center max-w-4xl mx-auto">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E36A2E]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#4E6B48]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-white/90 mb-4">
            <Mail className="w-3.5 h-3.5 text-[#E36A2E]" />
            <span>Early Access & Community Ledger</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Step onto the trail.
          </h2>

          <p className="mt-3 text-sm sm:text-base text-white/80 font-sans leading-relaxed">
            Join 400+ early explorers in Panaji. Be the first to receive new verified walking routes, secret architectural field notes, and early invites to community walkouts.
          </p>

          {/* Form / Submitted state */}
          <div className="mt-8 max-w-md mx-auto">
            {submitted ? (
              <div className="p-5 rounded-2xl bg-white/15 border border-white/20 text-white flex flex-col items-center gap-2 animate-in fade-in duration-300">
                <div className="w-10 h-10 rounded-full bg-[#E36A2E] flex items-center justify-center text-white">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-lg">You&apos;re on the explorer list!</h4>
                <p className="text-xs text-white/80 font-sans text-center">
                  We&apos;ve reserved your early access spot. Look out for our welcome dispatch with the Panaji Latin Quarter offline guide.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3.5 rounded-xl border border-white/20 bg-white/10 text-xs sm:text-sm font-sans text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#E36A2E] backdrop-blur-sm shadow-inner transition-all"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#E36A2E] hover:bg-[#E36A2E]/90 text-white text-xs sm:text-sm font-mono uppercase tracking-wider font-bold shadow-md transition-all cursor-pointer shrink-0"
                >
                  <span>Join Waitlist</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-mono text-white/50 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4E6B48]" />
              <span>Zero spam · Unsubscribe anytime · 100% free pilot</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
