"use client";

import React from "react";
import { useLanguage } from "@/presentation/context/LanguageContext";

export function MethodologySection() {
  const { content, t } = useLanguage();

  return (
    <section
      id="metodologia"
      className="py-24 bg-[#0d0e12] border-t border-[rgba(255,255,255,0.08)]"
      data-purpose="step-by-step-method"
    >
      <div className="max-w-7xl mx-auto px-6 reveal-on-scroll">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-medium uppercase tracking-[0.35em] text-white/60 block mb-2 font-mono">
            {t("methodology.tag")}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
            {t("methodology.title")}
          </h2>
          <p className="text-[#8b8e99] text-sm mt-3 font-light">
            {t("methodology.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {content.methodologySteps.map((step) => (
            <div
              key={step.number}
              className="border-t border-white/20 pt-6 hover:border-white/60 transition-colors duration-300 group"
            >
              <span className="font-mono text-xs text-white/40 block mb-2 group-hover:text-white transition-colors">
                {t("methodology.stepPrefix")} {step.number}
              </span>
              <h3 className="font-serif text-xl text-white mb-2 group-hover:translate-x-1 transition-transform">
                {step.title}
              </h3>
              <p className="text-xs text-[#d1d5db]/70 font-light leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
