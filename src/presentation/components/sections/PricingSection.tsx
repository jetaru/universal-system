"use client";

import React from "react";
import { appConfig } from "@/infrastructure/config/env";
import {
  GLOBAL_PRICING_CONFIG,
  calculateRegularPriceCLP,
  formatCLP,
} from "@/infrastructure/config/pricing.config";
import {
  Clock,
  Check,
  FileDown,
  ShieldCheck,
  Sparkles,
  Wrench,
  GraduationCap,
} from "@/presentation/components/ui/Icons";
import { useLanguage } from "@/presentation/context/LanguageContext";

export function PricingSection() {
  const { content, t, language } = useLanguage();
  const isEs = language === "es";
  const catalogHref = `${appConfig.basePath}${GLOBAL_PRICING_CONFIG.catalogPdfPath}`;
  const discountPct = GLOBAL_PRICING_CONFIG.launchDiscountPercent;
  const isDiscountActive = GLOBAL_PRICING_CONFIG.isDiscountActive;

  return (
    <section
      id="planes"
      className="py-24 bg-[#0c0d11] border-b border-[rgba(255,255,255,0.08)] relative overflow-hidden radial-glow-cyan"
      data-purpose="pricing-and-support-rates"
    >
      <div className="max-w-7xl mx-auto px-6 reveal-on-scroll relative z-10">
        {/* Top Header + PDF Catalog CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.35em] text-white/60 block mb-2 font-mono">
              {t("pricing.tag")}
            </span>

            {isDiscountActive && (
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-emerald-950/40 border border-emerald-500/35 text-[11px] font-mono text-emerald-300">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t("pricing.discountBadge")}</span>
              </div>
            )}

            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-tight">
              {t("pricing.title")}
            </h2>
            <p className="text-[#8b8e99] text-sm mt-3 font-light leading-relaxed">
              {t("pricing.desc")}
            </p>
          </div>

          <div className="shrink-0">
            <a
              href={catalogHref}
              target="_blank"
              rel="noopener noreferrer"
              download="Catalogo_Precios_Universal_System.pdf"
              className="luxury-btn inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-sm bg-white text-black hover:bg-neutral-200 text-xs font-semibold uppercase tracking-[0.18em] transition-all shadow-lg shadow-white/5"
            >
              <FileDown className="w-4 h-4 text-black shrink-0" />
              <span>{t("pricing.downloadPdf")}</span>
            </a>
          </div>
        </div>

        {/* 2 Schedule Modalities Banner (Normal & Vespertino) */}
        <div className="mb-12">
          <div className="text-[11px] uppercase tracking-[0.28em] text-white/50 font-mono mb-4">
            {t("pricing.schedulesHeading")}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.scheduleModalities.map((sched) => (
              <div
                key={sched.id}
                className="p-5 rounded-md border border-white/10 bg-[#13151b]/90 flex items-start gap-4 hover:border-white/25 transition-colors"
              >
                <div className="w-9 h-9 rounded bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock
                    className={`w-4 h-4 ${
                      sched.id === "normal" ? "text-emerald-400" : "text-cyan-400"
                    }`}
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-white tracking-wide">
                      {sched.label}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-[#8b8e99]">
                      {sched.windowLabel}
                    </span>
                  </div>
                  <p className="text-xs text-[#d1d5db]/75 font-light leading-relaxed">
                    {sched.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Monthly Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
          {content.pricingPlans.map((plan) => {
            const globalPlan = GLOBAL_PRICING_CONFIG.plans[plan.id];
            const finalCLP = globalPlan.discountedMonthlyCLP;
            const regularCLP = calculateRegularPriceCLP(finalCLP, discountPct);
            const isFeatured = !!globalPlan.featured;
            const isIntensive = plan.id === "intensivo";

            return (
              <article
                key={plan.id}
                className={`glass-card interactive-card rounded-md p-7 flex flex-col justify-between relative transition-all ${
                  isFeatured
                    ? "border border-emerald-400/45 shadow-xl shadow-emerald-950/20"
                    : isIntensive
                    ? "border border-cyan-400/40 shadow-xl shadow-cyan-950/20"
                    : "editorial-border"
                }`}
              >
                <div>
                  {/* Top Badge + Discount Tag */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span
                      className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider border ${
                        isFeatured
                          ? "bg-emerald-950/50 border-emerald-500/40 text-emerald-300"
                          : isIntensive
                          ? "bg-cyan-950/50 border-cyan-500/40 text-cyan-300"
                          : "bg-white/[0.04] border-white/10 text-[#d1d5db]"
                      }`}
                    >
                      {plan.badge}
                    </span>
                    {isDiscountActive && (
                      <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                        -{discountPct}% OFF
                      </span>
                    )}
                  </div>

                  {/* Plan Title */}
                  <h3 className="font-serif text-2xl text-white font-normal mb-2">
                    {plan.name}
                  </h3>

                  {/* Price Block */}
                  <div className="my-5 pb-5 border-b border-white/10">
                    {isDiscountActive && regularCLP > finalCLP && (
                      <div className="text-[11px] font-mono text-[#8b8e99] mb-1">
                        <span>{t("pricing.regularPrefix")} </span>
                        <span className="line-through text-white/45">
                          {formatCLP(regularCLP)} CLP
                        </span>
                      </div>
                    )}
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-tight lining-nums tabular-nums">
                        {formatCLP(finalCLP)}
                      </span>
                      <span className="text-xs font-mono text-[#8b8e99]">
                        CLP {t("pricing.monthlyUnit")}
                      </span>
                    </div>
                  </div>

                  {/* Scope & Schedule Summary */}
                  <div className="space-y-1.5 mb-4 text-xs font-mono">
                    <div className="text-white/90 font-medium">{plan.scopeSummary}</div>
                    <div
                      className={
                        isIntensive ? "text-cyan-300" : "text-emerald-400/90"
                      }
                    >
                      {plan.scheduleSummary}
                    </div>
                  </div>

                  <p className="text-xs text-[#d1d5db]/75 font-light leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2.5 text-xs text-[#8b8e99] border-t border-white/[0.08] pt-5">
                    {plan.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-white/70 shrink-0 mt-0.5" />
                        <span className="text-[#d1d5db]/85">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-7">
                  <a
                    href="#selector"
                    className={`luxury-btn w-full py-2.5 px-4 rounded-sm text-center text-[11px] uppercase tracking-[0.2em] font-semibold block transition-all ${
                      isFeatured
                        ? "bg-white text-black hover:bg-neutral-200"
                        : isIntensive
                        ? "bg-cyan-400/90 text-black hover:bg-cyan-300"
                        : "bg-white/[0.06] border border-white/20 text-white hover:bg-white/15"
                    }`}
                  >
                    {plan.ctaText}
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Sequential Level Recommendation Note */}
        <div className="mb-20 p-4 sm:p-5 rounded-md border border-amber-400/25 bg-amber-950/[0.12] flex items-start gap-3.5">
          <GraduationCap className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
          <p className="text-xs text-[#d1d5db]/90 font-light leading-relaxed">
            <strong className="text-white font-semibold font-mono uppercase tracking-wider text-[11px] mr-2">
              {t("pricing.orderNoteTitle")}
            </strong>
            {t("pricing.orderNoteDesc")}
          </p>
        </div>

        {/* Technical Support & Diagnostic Rates Subsection */}
        <div className="editorial-border rounded-xl bg-[#0e1015]/90 p-7 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Featured Diagnostic & Quote Rate ($10.000 CLP) */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-cyan-400 block mb-2">
                  {t("pricing.supportTag")}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-snug">
                  {t("pricing.supportTitle")}
                </h3>
                <p className="text-xs text-[#8b8e99] font-light leading-relaxed mt-2">
                  {t("pricing.supportDesc")}
                </p>
              </div>

              {content.supportRates
                .filter((r) => r.isPrimaryDiagnostic)
                .map((diag) => (
                  <div
                    key={diag.id}
                    className="p-6 rounded-lg border border-emerald-500/35 bg-gradient-to-br from-emerald-950/25 via-[#13161d] to-[#0f1116]"
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-emerald-300 px-2.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
                        <Wrench className="w-3 h-3" />
                        <span>{t("pricing.fixedRate")}</span>
                      </span>
                      <span className="text-[10px] font-mono text-[#8b8e99]">
                        4 {isEs ? "Fases de Laboratorio" : "Lab Stages"}
                      </span>
                    </div>

                    <h4 className="font-serif text-xl text-white font-normal mb-2">
                      {diag.name}
                    </h4>

                    <div className="flex items-baseline gap-2 my-3">
                      <span className="font-serif text-3xl sm:text-4xl text-emerald-300 font-normal lining-nums tabular-nums">
                        {formatCLP(diag.priceCLP)}
                      </span>
                      <span className="text-xs font-mono text-[#d1d5db]">CLP</span>
                    </div>

                    <p className="text-xs text-[#d1d5db]/80 font-light leading-relaxed mb-4">
                      {diag.detail}
                    </p>

                    <div className="flex items-center gap-2 text-[11px] font-mono text-white/75 pt-3 border-t border-white/10">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{appConfig.author.hardwareGuarantee}</span>
                    </div>
                  </div>
                ))}
            </div>

            {/* Right: Reference Support Interventions Table */}
            <div className="lg:col-span-7 space-y-3">
              {content.supportRates
                .filter((r) => !r.isPrimaryDiagnostic)
                .map((service) => (
                  <div
                    key={service.id}
                    className="p-4 sm:p-5 rounded-md border border-white/10 bg-[#14161d]/70 hover:border-white/25 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 max-w-lg">
                      <h4 className="text-sm font-medium text-white">
                        {service.name}
                      </h4>
                      <p className="text-xs text-[#8b8e99] font-light leading-relaxed">
                        {service.detail}
                      </p>
                    </div>
                    <div className="sm:text-right shrink-0 border-t sm:border-t-0 border-white/5 pt-2 sm:pt-0">
                      {service.isFromPrice && (
                        <span className="block text-[10px] font-mono uppercase tracking-wider text-[#8b8e99]">
                          {t("pricing.fromPrefix")}
                        </span>
                      )}
                      <span className="font-serif text-xl text-white font-normal lining-nums tabular-nums">
                        {formatCLP(service.priceCLP)}
                      </span>
                      <span className="text-[11px] font-mono text-[#8b8e99] ml-1">
                        CLP
                      </span>
                    </div>
                  </div>
                ))}

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#8b8e99] font-mono">
                <span>
                  {isEs
                    ? "* Los repuestos físicos (ej. unidades SSD o memorias) se cotizan de forma transparente según modelo."
                    : "* Replacement hardware parts (e.g. SSD drives or RAM) are quoted transparently by device model."}
                </span>
                <a
                  href="#selector"
                  className="text-white underline hover:text-emerald-300 uppercase tracking-wider text-[11px] shrink-0"
                >
                  {isEs ? "Agendar Evaluación →" : "Schedule Diagnostic →"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
