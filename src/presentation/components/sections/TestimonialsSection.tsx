"use client";

import React from "react";
import { useLanguage } from "@/presentation/context/LanguageContext";

export function TestimonialsSection() {
  const { content, t } = useLanguage();

  return (
    <section
      id="testimonios"
      className="py-24 bg-[#0a0b0d] border-t border-[rgba(255,255,255,0.08)]"
      data-purpose="customer-testimonials"
    >
      <div className="max-w-7xl mx-auto px-6 reveal-on-scroll">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-medium uppercase tracking-[0.35em] text-white/60 block mb-2 font-mono">
            {t("testimonials.tag")}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
            {t("testimonials.title")}
          </h2>
          <p className="text-[#8b8e99] text-sm mt-3 font-light">
            {t("testimonials.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.testimonials.map((test) => (
            <div
              key={test.id}
              className="editorial-border interactive-card rounded p-6 bg-[#17181c]/30 flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300"
            >
              <p className="font-serif italic text-base text-[#d1d5db] leading-relaxed mb-6 group-hover:text-white transition-colors">
                {test.quote}
              </p>
              <div className="border-t border-white/10 pt-4">
                <div className="text-xs uppercase font-medium tracking-wider text-white">
                  {test.author}
                </div>
                <div className="text-[11px] text-[#8b8e99] mt-0.5 font-mono">
                  {test.meta}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
