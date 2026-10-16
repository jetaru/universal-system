import React from "react";
import { Navbar } from "@/presentation/components/layout/Navbar";
import { Footer } from "@/presentation/components/layout/Footer";
import { HeroSection } from "@/presentation/components/sections/HeroSection";
import { PillarsSection } from "@/presentation/components/sections/PillarsSection";
import { LaboratorySection } from "@/presentation/components/sections/LaboratorySection";
import { MethodologySection } from "@/presentation/components/sections/MethodologySection";
import { EnterpriseSection } from "@/presentation/components/sections/EnterpriseSection";
import { SolutionSelectorSection } from "@/presentation/components/sections/SolutionSelectorSection";
import { TestimonialsSection } from "@/presentation/components/sections/TestimonialsSection";
import { ClientPageEffects } from "@/presentation/components/effects/ClientPageEffects";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#090a0d] text-[#f3f4f6] selection:bg-white selection:text-black">
      {/* Client-side animations, cursor tracking and scroll-reveal observer */}
      <ClientPageEffects />

      <Navbar />
      <main id="main-content">
        <HeroSection />
        <PillarsSection />
        <LaboratorySection />
        <MethodologySection />
        <EnterpriseSection />
        <SolutionSelectorSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
