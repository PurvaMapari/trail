import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface TraverseCard {
  id: string;
  badge: string;
  category: string;
  title: string;
  desc: string;
  image: string;
  distance: string;
  duration: string;
  difficulty: string;
}

const traverses: TraverseCard[] = [
  {
    id: 'marin-ocean',
    badge: 'SAN FRANCISCO // PACIFIC OVERLOOK',
    category: 'COASTAL MARITIME // SF',
    title: 'The Marin to Ocean Traverse',
    desc: 'Connecting three heritage bakeries, a 1920s naval lookout, and eucalyptus fog glades.',
    image: '/images/traverse-marin.png',
    distance: '14.2 KM',
    duration: '4H 15M',
    difficulty: 'MODERATE',
  },
  {
    id: 'larchwood-babylon',
    badge: 'HUDSON VALLEY // BEACON RIDGE',
    category: 'HISTORIC RIDGE // NY',
    title: 'The High Larchwood Babylon',
    desc: 'A scenic railway traverse linking antique printmakers, cider press barns, and high granite ledges.',
    image: '/images/traverse-larchwood.png',
    distance: '9.8 KM',
    duration: '3H 00M',
    difficulty: 'EASY',
  },
  {
    id: 'potters-canal',
    badge: 'PACIFIC NORTHWEST // CASCADIA',
    category: 'FOREST CANAL // WA',
    title: "The Potter's Canal Meander",
    desc: 'Hand-thrown pottery kilns, moss-draped boardwalks, and a rain-sheltered cedar reading room.',
    image: '/images/traverse-potter.png',
    distance: '7.6 KM',
    duration: '2H 30M',
    difficulty: 'EASY',
  },
];

export function SocialProof() {
  return (
    <section id="traverses" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#183D2B]/10 scroll-mt-20">
      {/* Top Tag & Header */}
      <div className="flex flex-wrap items-center justify-between text-xs font-mono uppercase tracking-wider text-[#183D2B]/60 mb-6">
        <span>04 // FIELD CURATED EXPEDITIONS</span>
        <Link
          href="/explore"
          className="text-[#E36A2E] hover:underline flex items-center gap-1 font-semibold"
        >
          <span>VIEW ALL 42 TRAILS</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="mb-10">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] leading-tight font-bold text-[#183D2B]">
          Featured Connected Traverses
        </h2>
      </div>

      {/* 3 Traverses Cards */}
      <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
        {traverses.map((card) => (
          <div
            key={card.id}
            className="rounded-2xl border border-[#183D2B]/20 bg-white/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            {/* Card Image Banner */}
            <div className="relative w-full h-48 bg-[#E7E3D7] overflow-hidden">
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
              <div className="absolute top-3 left-3 bg-[#FAF8F3]/90 backdrop-blur-sm border border-[#183D2B]/20 rounded px-2.5 py-1 text-[9px] font-mono font-bold text-[#183D2B] tracking-wider uppercase">
                {card.badge}
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#183D2B]/50 uppercase tracking-wider block mb-1">
                  {card.category}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#183D2B] mb-2 group-hover:text-[#E36A2E] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-[#183D2B]/75 leading-relaxed font-sans line-clamp-3">
                  {card.desc}
                </p>
              </div>

              {/* Card Meta Stats */}
              <div className="mt-6 pt-4 border-t border-[#183D2B]/10">
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono mb-4 text-[#183D2B]/70">
                  <div>
                    <span className="block text-[#183D2B]/40 text-[9px] uppercase">DISTANCE</span>
                    <span className="font-bold text-[#183D2B]">{card.distance}</span>
                  </div>
                  <div>
                    <span className="block text-[#183D2B]/40 text-[9px] uppercase">DURATION</span>
                    <span className="font-bold text-[#183D2B]">{card.duration}</span>
                  </div>
                  <div>
                    <span className="block text-[#183D2B]/40 text-[9px] uppercase">GRADE</span>
                    <span className="font-bold text-[#4E6B48]">{card.difficulty}</span>
                  </div>
                </div>

                <Link
                  href="/trails/demo"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full border border-[#183D2B]/20 bg-[#FAF8F3] hover:bg-[#183D2B] hover:text-[#FAF8F3] text-xs font-mono uppercase tracking-wider text-[#183D2B] font-semibold transition-colors"
                >
                  <span>Inspect Traverse</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
