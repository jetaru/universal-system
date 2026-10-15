"use client";

import React from "react";
import { servicePillars } from "@/data/site-content";

export function PillarsSection() {
  return (
    <section
      id="pilares"
      className="py-24 bg-[#0c0d10] border-t border-b border-[rgba(255,255,255,0.08)] relative"
      data-purpose="core-pillars"
    >
      <div className="max-w-7xl mx-auto px-6 reveal-on-scroll">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-medium uppercase tracking-[0.35em] text-white/60 block mb-2 font-mono">
            Excelencia &amp; Soluciones
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-tight">
            Nuestros Tres Pilares de Atención
          </h2>
          <p className="text-[#8b8e99] text-sm mt-3 font-light leading-relaxed">
            Diseñados con rigor técnico y vocación pedagógica para resolver cualquier desafío digital de forma definitiva.
          </p>
        </div>

        {/* Bento Grid Structure with Parallax Flashlight Sheen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {servicePillars.map((pillar) => (
            <article
              key={pillar.id}
              className="glass-card interactive-card editorial-border rounded-md p-8 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-[#8b8e99] mb-6">
                  <span className="text-xs uppercase tracking-widest font-mono text-white/50 group-hover:text-white/80 transition-colors">
                    Pilar {pillar.number}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-white/40 group-hover:bg-white group-hover:scale-125 transition-all duration-300"></span>
                </div>

                <h3 className="font-serif text-2xl text-white mb-3 font-normal group-hover:translate-x-0.5 transition-transform">
                  {pillar.title}
                </h3>

                <p className="text-sm text-[#d1d5db]/80 leading-relaxed font-light mb-6">
                  {pillar.description}
                </p>

                <ul className="space-y-2.5 text-xs text-[#8b8e99] border-t border-[rgba(255,255,255,0.08)] pt-6">
                  {pillar.benefits.map((benefit, bIdx) => (
                    <li
                      key={bIdx}
                      className="flex items-start gap-2.5 group-hover:text-[#d1d5db] transition-colors"
                    >
                      <span className="text-white/70 font-semibold shrink-0">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <a
                  className="inline-flex items-center text-xs tracking-widest text-white uppercase font-semibold group-hover:translate-x-1.5 transition-all duration-300 gap-1.5"
                  href={pillar.ctaAnchor}
                >
                  <span>{pillar.ctaText}</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
