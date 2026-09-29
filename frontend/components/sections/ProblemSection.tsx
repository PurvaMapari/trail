import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export function ProblemSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#183D2B]/10">
      {/* Section Header Tag */}
      <div className="flex flex-wrap items-center justify-between text-xs font-mono uppercase tracking-wider text-[#183D2B]/60 mb-6">
        <span>01 // THE SYSTEM FAILURE OF MODERN TRANSIT</span>
        <span className="hidden sm:inline">FIELD RESEARCH REPORT NO. 042 // URBAN DISCONNECT</span>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Headline, Narrative & Stats */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] leading-tight font-bold text-[#183D2B] tracking-tight">
            The blind spot of modern navigation.
          </h2>

          <p className="text-sm sm:text-base text-[#183D2B]/80 leading-relaxed font-sans">
            The fastest path from A to B is usually the dullest. Decades of efficiency-obsessed
            navigation apps have flattened the topography of cities, stripping out the unexpected
            encounters that make walking meaningful.
          </p>

          <p className="text-sm text-[#183D2B]/75 leading-relaxed font-sans">
            TRAIL operates on an inverted principle: we map connection, cadence, and cultural
            resonance across contiguous terrain.
          </p>

          {/* Metric Cards */}
          <div className="space-y-4 pt-2">
            {/* Card 1: Traditional Routing Tax */}
            <div className="p-4 rounded-xl border border-red-200 bg-red-50/50">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-red-600 block mb-1">
                TRADITIONAL ROUTING TAX
              </span>
              <div className="text-2xl font-bold font-mono text-[#183D2B] mb-1">
                28 fps / 0%
              </div>
              <p className="text-xs text-[#183D2B]/70 leading-relaxed">
                Traditional apps punish curiosity with rerouting alerts and ETA anxiety. Every detour to inspect a craft workshop is registered as lost efficiency.
              </p>
            </div>

            {/* Card 2: Trail Serendipity Ratio */}
            <div className="p-4 rounded-xl border border-[#4E6B48]/30 bg-[#4E6B48]/10">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#183D2B] block mb-1">
                TRAIL SERENDIPITY RATIO
              </span>
              <div className="text-2xl font-bold font-mono text-[#183D2B] mb-1">
                4+ Encounters / 5KM
              </div>
              <p className="text-xs text-[#183D2B]/70 leading-relaxed">
                Every route connects curated independent waypoints vetted for atmosphere, architectural beauty, and human resonance.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Comparative Matrix Card */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-[#183D2B]/20 bg-white/80 p-6 sm:p-8 shadow-sm backdrop-blur-sm">
            {/* Table Header */}
            <div className="border-b border-[#183D2B]/10 pb-4 mb-6">
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[#183D2B]">
                POINT-TO-POINT VECTOR VS CONNECTED TRAVERSE
              </h3>
            </div>

            {/* Two Side-by-Side Comparison Columns */}
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              {/* Conventional Maps */}
              <div className="space-y-5">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-[#183D2B]/60 pb-2 border-b border-[#183D2B]/10">
                  <XCircle className="w-4 h-4 text-red-500/80" />
                  <span>CONVENTIONAL DIGITAL MAPS</span>
                </div>

                <div className="space-y-4 text-xs text-[#183D2B]/75 leading-relaxed">
                  <div>
                    <strong className="block text-[#183D2B] font-semibold mb-0.5">
                      Fastest Vector Optimization
                    </strong>
                    Treats everything between origin and destination as dead transit friction.
                  </div>

                  <div>
                    <strong className="block text-[#183D2B] font-semibold mb-0.5">
                      Algorithmic Erasure
                    </strong>
                    Reroutes away from organic side alleys, stairways, and elevation views.
                  </div>

                  <div>
                    <strong className="block text-[#183D2B] font-semibold mb-0.5">
                      Ad-Centric Clutter
                    </strong>
                    Populates the canvas with paid pins rather than genuine neighborhood craft.
                  </div>

                  <div>
                    <strong className="block text-[#183D2B] font-semibold mb-0.5">
                      Screen Dependency
                    </strong>
                    Forces you to walk with eyes glued down to a turn-by-turn blinking cursor.
                  </div>
                </div>
              </div>

              {/* TRAIL Living Traverse */}
              <div className="space-y-5 sm:border-l sm:border-[#183D2B]/10 sm:pl-8 bg-[#FAF8F3]/50 p-4 sm:p-0 rounded-xl sm:rounded-none">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-[#E36A2E] pb-2 border-b border-[#E36A2E]/20">
                  <CheckCircle2 className="w-4 h-4 text-[#E36A2E]" />
                  <span>TRAIL LIVING TRAVERSE</span>
                </div>

                <div className="space-y-4 text-xs text-[#183D2B]/85 leading-relaxed">
                  <div>
                    <strong className="block text-[#183D2B] font-semibold mb-0.5">
                      Narrative Cohesion
                    </strong>
                    Stops are thoughtfully choreographed chapters that complement your pace.
                  </div>

                  <div>
                    <strong className="block text-[#183D2B] font-semibold mb-0.5">
                      Pedestrian-First Cartography
                    </strong>
                    Prioritizes sun angles, historic corridors, and scenic vistas over highways.
                  </div>

                  <div>
                    <strong className="block text-[#183D2B] font-semibold mb-0.5">
                      Topographic Resonance
                    </strong>
                    Integrates elevation contours, cobblestone textures, and quiet pauses.
                  </div>

                  <div>
                    <strong className="block text-[#183D2B] font-semibold mb-0.5">
                      Ambient Wayfinding
                    </strong>
                    Glance-and-walk landmarks that keep your eyes engaged with the real street.
                  </div>
                </div>
              </div>
            </div>

            {/* Matrix Card Footer */}
            <div className="mt-8 pt-4 border-t border-[#183D2B]/10 flex flex-wrap items-center justify-between text-[10px] font-mono text-[#183D2B]/50 uppercase tracking-wider">
              <span>FIG. 1.1 // COMPARATIVE TRANSIT MATRIX</span>
              <span>SOURCE: FIELD OBSERVATIONS 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
