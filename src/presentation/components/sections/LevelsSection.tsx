"use client";

import React from "react";
import { Clock, Lock } from "@/presentation/components/ui/Icons";
import { useLanguage } from "@/presentation/context/LanguageContext";

export function LevelsSection() {
  const { content, t } = useLanguage();

  return (
    <section
      id="niveles"
      className="py-24 bg-[#090a0d] border-b border-[rgba(255,255,255,0.08)] relative overflow-hidden"
      data-purpose="curriculum-levels"
    >
      {/* Subtle ambient glow */}
      <div className="absolute top-1/3 right-1/6 w-96 h-96 rounded-full bg-white/[0.015] blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 reveal-on-scroll relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.35em] text-white/60 block mb-2 font-mono">
              {t("levels.tag")}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-tight">
              {t("levels.title")}
            </h2>
            <p className="text-[#8b8e99] text-sm mt-3 font-light leading-relaxed">
              {t("levels.desc")}
            </p>
          </div>

          {/* Session Structure & Discretion Pill Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:max-w-xl w-full">
            <div className="p-4 rounded-md border border-white/10 bg-[#121318]/80">
              <div className="flex items-center gap-2 mb-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-white font-medium">
                  {t("levels.sessionFormatTitle")}
                </span>
              </div>
              <p className="text-xs text-[#8b8e99] font-light leading-relaxed">
                {t("levels.sessionFormatDesc")}
              </p>
            </div>

            <div className="p-4 rounded-md border border-white/10 bg-[#121318]/80">
              <div className="flex items-center gap-2 mb-1.5">
                <Lock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-white font-medium">
                  {t("levels.confidentialTitle")}
                </span>
              </div>
              <p className="text-xs text-[#8b8e99] font-light leading-relaxed">
                {t("levels.confidentialDesc")}
              </p>
            </div>
          </div>
        </div>

        {/* 3-Level General Progression Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.curriculumLevels.map((lvl) => (
            <article
              key={lvl.id}
              className="glass-card interactive-card editorial-border rounded-md p-8 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono uppercase tracking-[0.22em] text-white/60 group-hover:text-white transition-colors">
                    {t("levels.levelPrefix")} {lvl.levelNumber}
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] border border-white/10 text-[#d1d5db]">
                    {lvl.badge}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-white font-normal mb-3 leading-snug group-hover:translate-x-0.5 transition-transform">
                  {lvl.title}
                </h3>

                <p className="text-sm text-[#d1d5db]/80 font-light leading-relaxed mb-6">
                  {lvl.generalFocus}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.08]">
                <div className="text-[11px] font-mono text-[#8b8e99]">
                  {lvl.scopeHint}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
