"use client";

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
import { useScrollReveal } from "@/presentation/hooks/useScrollReveal";
import { useInteractiveCard } from "@/presentation/hooks/useInteractiveCard";

export default function HomePage() {
  // Activate interactive animations
  useScrollReveal();
  useInteractiveCard();

  return (
    <div className="min-h-screen bg-[#090a0d] text-[#f3f4f6] selection:bg-white selection:text-black">
      <Navbar />
      <main>
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
