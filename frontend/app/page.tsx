import { Hero } from '@/components/sections/Hero';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { SolutionSection } from '@/components/sections/SolutionSection';
import { SocialProof } from '@/components/sections/SocialProof';
import { ProductPreview } from '@/components/sections/ProductPreview';
import { AIPreview } from '@/components/sections/AIPreview';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#F4F2EB] selection:bg-[#E36A2E]/20 selection:text-[#183D2B]">
      <Hero />
      <ProblemSection />
      <FeaturesSection />
      <SolutionSection />
      <SocialProof />
      <ProductPreview />
      <AIPreview />
      <FinalCTA />
    </main>
  );
}
