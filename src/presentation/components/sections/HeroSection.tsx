"use client";

import React from "react";
import Image from "next/image";
import { appConfig } from "@/infrastructure/config/env";
import { trustMetrics } from "@/data/site-content";

export function HeroSection() {
  const basePath = appConfig.basePath;
  const logoSrc = `${basePath}/assets/universal-system-logo.png`;

  return (
    <section
      className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden radial-glow"
      data-purpose="hero-section"
    >
      {/* Subtle floating ambient particles */}
      <div className="absolute top-1/4 left-1/5 w-72 h-72 rounded-full bg-white/[0.02] blur-3xl pointer-events-none animate-float"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-cyan-500/[0.02] blur-3xl pointer-events-none animate-float" style={{ animationDelay: "-3s" }}></div>

      <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center relative z-10">
        {/* Luxury Brand Presentation Card with Breathing Shimmer & Corner Accents */}
        <div
          className="animate-hero-0 relative w-full max-w-2xl mx-auto mb-10 p-2 sm:p-3 rounded-md editorial-border bg-[#0d0e12]/80 backdrop-blur-md logo-hero-frame cursor-pointer group"
          id="hero-brand-card"
        >
          <div className="overflow-hidden rounded border border-white/5 bg-black relative aspect-[1376/768]">
            <Image
              src={logoSrc}
              alt="Universal System - Porque aprender nunca fue tan fácil"
              fill
              priority
              unoptimized
              className="object-cover opacity-95 group-hover:opacity-100 group-hover:scale-[1.01] transition-all duration-700 ease-out"
            />
            {/* Subtle ambient inner highlight sweep on hover */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-white/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>

          {/* Corner Accents for Editorial Aesthetic */}
          <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-white/40 transition-all duration-300 group-hover:border-white group-hover:w-3.5 group-hover:h-3.5"></span>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-white/40 transition-all duration-300 group-hover:border-white group-hover:w-3.5 group-hover:h-3.5"></span>
          <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-white/40 transition-all duration-300 group-hover:border-white group-hover:w-3.5 group-hover:h-3.5"></span>
          <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-white/40 transition-all duration-300 group-hover:border-white group-hover:w-3.5 group-hover:h-3.5"></span>
        </div>

        {/* Tagline Badge */}
        <div className="animate-hero-1 inline-flex items-center px-4 py-1.5 mb-8 rounded-full border border-white/10 bg-white/5 text-[11px] tracking-[0.35em] uppercase text-white/80 font-medium hover:border-white/25 hover:bg-white/10 transition-colors duration-300 cursor-default">
          <span className="w-1.5 h-1.5 rounded-full bg-white/60 mr-2.5 animate-pulse"></span>
          {appConfig.brand.tagline}
        </div>

        {/* Refined Serif Headline */}
        <h1 className="animate-hero-2 font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal leading-[1.15] mb-6 tracking-tight max-w-4xl">
          {appConfig.brand.subtitle}
        </h1>

        {/* Subtitle */}
        <p className="animate-hero-3 text-base sm:text-lg text-[#d1d5db]/80 font-light max-w-2xl leading-relaxed mb-10">
          {appConfig.brand.description}
        </p>

        {/* CTA Buttons */}
        <div className="animate-hero-4 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <a
            className="luxury-btn w-full sm:w-auto px-8 py-3.5 bg-white text-black text-xs font-semibold uppercase tracking-[0.22em] rounded-sm hover:bg-neutral-200 transition-colors shadow-lg shadow-white/5 active:scale-95"
            href="#selector"
          >
            Agendar Diagnóstico o Clase
          </a>
          <a
            className="luxury-btn w-full sm:w-auto px-8 py-3.5 bg-transparent border border-white/20 text-white text-xs font-medium uppercase tracking-[0.22em] rounded-sm hover:bg-white/5 hover:border-white/40 transition-all duration-300 active:scale-95"
            href="#pilares"
          >
            Explorar Servicios
          </a>
        </div>

        {/* Quick Trust Metrics Bar */}
        <div
          className="animate-hero-5 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-16 mt-16 border-t border-[rgba(255,255,255,0.08)] w-full text-left sm:text-center"
          data-purpose="trust-metrics"
        >
          {trustMetrics.map((metric, idx) => (
            <div key={idx} className="metric-card p-2 rounded transition-all group">
              <div className="font-serif text-2xl sm:text-3xl text-white font-normal transition-transform duration-300 group-hover:scale-105">
                {metric.value}
              </div>
              <div className="text-[11px] uppercase tracking-widest text-[#8b8e99] mt-1 font-mono">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
