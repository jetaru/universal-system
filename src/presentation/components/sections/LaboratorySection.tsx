"use client";

import React, { useState } from "react";
import { ShieldCheck, Cpu } from "@/presentation/components/ui/Icons";
import { GLOBAL_PRICING_CONFIG, formatCLP } from "@/infrastructure/config/pricing.config";
import { useLanguage } from "@/presentation/context/LanguageContext";

export function LaboratorySection() {
  const { content, t, language } = useLanguage();
  const [selectedChecks, setSelectedChecks] = useState<Record<string, boolean>>({
    "check-1": true,
    "check-2": true,
    "check-3": true,
    "check-4": true,
  });

  const toggleCheck = (id: string) => {
    setSelectedChecks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isEs = language === "es";
  const diagnosticCLP = formatCLP(GLOBAL_PRICING_CONFIG.supportRates.analysisAndQuoteCLP);

  return (
    <section
      id="laboratorio"
      className="py-24 max-w-7xl mx-auto px-6 reveal-on-scroll"
      data-purpose="laboratory-standards"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Protocols & Guarantees */}
        <div className="lg:col-span-5">
          <span className="text-xs font-medium uppercase tracking-[0.35em] text-white/60 block mb-2 font-mono">
            {t("lab.tag")}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mb-6 leading-tight">
            {isEs
              ? "Cuidado riguroso de tus equipos e información privada."
              : "Rigorous care for your hardware and private information."}
          </h2>
          <p className="text-[#d1d5db]/80 text-sm font-light leading-relaxed mb-8">
            {isEs
              ? "En Universal System entendemos que un ordenador no es solo una herramienta, sino el contenedor de tus recuerdos familiares, finanzas y trabajo cotidiano. Nuestro laboratorio opera bajo estándares de confidencialidad absoluta."
              : "At Universal System we understand that a computer is not merely a tool, but the keeper of your family memories, personal finances, and daily livelihood. Our laboratory operates under strict non-disclosure and privacy protocols."}
          </p>

          <div className="space-y-4">
            <div className="p-4 rounded border border-white/5 bg-[#17181c]/50 hover:border-white/20 transition-all duration-300 hover:translate-x-1">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
                  {isEs ? "Garantía Escrita de 90 Días" : "90-Day Written Warranty"}
                </h4>
              </div>
              <p className="text-xs text-[#8b8e99] leading-relaxed">
                {isEs
                  ? "Cualquier intervención de hardware incluye reporte técnico formal y cobertura integral ante cualquier eventualidad."
                  : "Every hardware service includes a formal diagnostic report and comprehensive warranty coverage."}
              </p>
            </div>

            <div className="p-4 rounded border border-white/5 bg-[#17181c]/50 hover:border-white/20 transition-all duration-300 hover:translate-x-1">
              <div className="flex items-center gap-2 mb-1">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
                  {isEs ? "No Manipulación de Datos Sensibles" : "Zero Tampering with Sensitive Data"}
                </h4>
              </div>
              <p className="text-xs text-[#8b8e99] leading-relaxed">
                {isEs
                  ? "Tu información jamás sale de tu equipo sin autorización expresa, manteniendo tu estricta privacidad resguardada."
                  : "Your files never leave your system without explicit written consent, guaranteeing absolute data confidentiality."}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Diagnostic Spec Card with Interactive Items */}
        <div className="lg:col-span-7">
          <div className="editorial-border interactive-card rounded-lg bg-black/60 p-6 sm:p-8 backdrop-blur-md relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block animate-pulse"></span>
                <span className="text-xs uppercase tracking-widest text-white/80 font-mono">
                  {isEs ? "Checklist de Calidad Universal System" : "Universal System Quality Checklist"}
                </span>
              </div>
              <span className="text-[10px] text-[#8b8e99] font-mono uppercase tracking-widest">
                v3.4 {isEs ? "Activo" : "Active"}
              </span>
            </div>

            {/* Inspection Metrics Grid (Interactive click toggle) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono" id="checklist-grid">
              {content.labChecklist.map((item) => {
                const isChecked = !!selectedChecks[item.id];
                return (
                  <div
                    key={item.id}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isChecked}
                    onClick={() => toggleCheck(item.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleCheck(item.id);
                      }
                    }}
                    className={`lab-check-item p-3 border rounded transition-all select-none cursor-pointer ${
                      isChecked
                        ? "is-selected border-emerald-500/40 bg-emerald-950/20 shadow-sm shadow-emerald-500/5"
                        : "border-white/5 bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[#8b8e99] uppercase text-[10px]">
                        {item.stepNumber}. {item.title}
                      </span>
                      <span
                        className={`w-2 h-2 rounded-full transition-colors ${
                          isChecked ? "bg-emerald-400" : "bg-neutral-600"
                        }`}
                      ></span>
                    </div>
                    <div className="text-white font-medium">{item.subtitle}</div>
                    <span
                      className={`text-[10px] mt-1.5 block font-mono transition-colors ${
                        isChecked ? "text-emerald-400" : "text-neutral-500"
                      }`}
                    >
                      {item.metric}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#8b8e99]">
              <span>
                {isEs
                  ? `Análisis de 4 fases + presupuesto formal: ${diagnosticCLP} CLP`
                  : `4-stage analysis + formal written quote: ${diagnosticCLP} CLP`}
              </span>
              <a
                className="mt-1 sm:mt-0 text-white font-medium underline uppercase tracking-widest text-[11px] hover:text-white/70 transition-colors"
                href="#selector"
              >
                {isEs ? "Solicitar chequeo técnico" : "Request technical checkup"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
