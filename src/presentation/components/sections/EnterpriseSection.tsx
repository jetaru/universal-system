"use client";

import React from "react";
import { appConfig } from "@/infrastructure/config/env";
import { ExternalLink, Terminal } from "@/presentation/components/ui/Icons";

export function EnterpriseSection() {
  const enterpriseUrl = appConfig.author.enterpriseUrl || "https://jetaru.github.io";

  const enterpriseBadges = [
    "Clean Architecture & DDD",
    "High-Performance Back-End (NestJS / .NET)",
    "SAP HANA & Cloud Integration",
    "Mobile Apps (Kotlin / React Native)",
    "Ciberseguridad OWASP",
  ];

  return (
    <section
      id="empresas"
      className="py-16 max-w-7xl mx-auto px-6 reveal-on-scroll"
      data-purpose="enterprise-solutions"
    >
      <div className="editorial-border interactive-card rounded-xl bg-gradient-to-r from-[#111318]/90 via-[#14161f]/80 to-[#0e1015]/90 p-8 sm:p-10 backdrop-blur-md relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/[0.04] blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-800/40 text-[11px] font-mono text-cyan-300">
              <Terminal className="w-3.5 h-3.5" />
              <span>Soluciones B2B &amp; Consultoría Corporativa</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight">
              ¿Requieres Arquitectura de Software o Desarrollo para Empresas?
            </h3>

            <p className="text-xs sm:text-sm text-[#d1d5db]/80 font-light leading-relaxed">
              Para modernización de sistemas legacy, microservicios de alto tráfico, integraciones SAP HANA, aplicaciones móviles nativas y estándares de ciberseguridad OWASP, conoce el portafolio de ingeniería senior de{" "}
              <strong className="text-white font-medium">{appConfig.author.name}</strong>.
            </p>

            {/* Capability tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {enterpriseBadges.map((badge, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded text-[10px] font-mono bg-white/[0.03] border border-white/10 text-neutral-300"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Box */}
          <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 pt-2 lg:pt-0">
            <a
              href={enterpriseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="luxury-btn w-full sm:w-auto px-6 py-3 rounded-sm bg-white text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-white/5 flex items-center justify-center gap-2.5 group"
            >
              <span>Ir a jetaru.github.io</span>
              <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <span className="text-[11px] text-[#8b8e99] font-mono">
              Portafolio de Ingeniería Senior &amp; Sistemas
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
