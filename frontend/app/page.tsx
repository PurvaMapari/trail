import { Hero } from '@/components/sections/Hero';
import { CuratedTrails } from '@/components/sections/CuratedTrails';
import { AIDiscoveryBanner } from '@/components/sections/AIDiscoveryBanner';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#F4F2EB] selection:bg-[#E36A2E]/20 selection:text-[#183D2B]">
      <Hero />
      <CuratedTrails />
      <AIDiscoveryBanner />
    </main>
  );
}
