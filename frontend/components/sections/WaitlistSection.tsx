'use client';

import React, { useState } from 'react';

export function WaitlistSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-16 px-6 max-w-4xl mx-auto border-t border-primary/10 text-center">
      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary">
        Join our early community of explorers
      </h2>
      <p className="mt-3 text-sm text-primary/70 max-w-md mx-auto">
        Be the first to test new curated walks in your city and get early access to trail curation tools.
      </p>
      {submitted ? (
        <p className="mt-6 text-sm font-semibold text-secondary">
          Thank you! You&apos;re on the list.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 flex max-w-md mx-auto gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-2.5 rounded-full border border-primary/20 bg-white/70 text-sm text-primary placeholder:text-primary/40 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-primary text-neutral text-sm font-medium hover:bg-secondary transition-colors"
          >
            Join Waitlist
          </button>
        </form>
      )}
    </section>
  );
}
