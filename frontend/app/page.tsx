import { Hero } from '@/components/sections/Hero';
import { ProblemSolution } from '@/components/sections/ProblemSolution';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { CuratedTrails } from '@/components/sections/CuratedTrails';
import { AIDiscoveryBanner } from '@/components/sections/AIDiscoveryBanner';
import { SocialProof } from '@/components/sections/SocialProof';
import { WaitlistSection } from '@/components/sections/WaitlistSection';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#F4F2EB] selection:bg-[#E36A2E]/20 selection:text-[#183D2B]">
      {/* 1. Hero with clear value prop, CTA, and interactive preview */}
      <Hero />

      {/* 2. Problem & Solution */}
      <ProblemSolution />

      {/* 3. Key Features & User Benefits */}
      <FeaturesSection />

      {/* 4. Product Showcase: Real Curated Trails */}
      <CuratedTrails />

      {/* 5. Interactive AI Route Discovery */}
      <AIDiscoveryBanner />

      {/* 6. Social Proof: Pilot Metrics & Beta Walker Reviews */}
      <SocialProof />

      {/* 7. Waitlist Lead Capture & Early Access Form */}
      <WaitlistSection />
    </main>
  );
}
