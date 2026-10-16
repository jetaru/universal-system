"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { appConfig } from "@/infrastructure/config/env";
import { WhatsAppIcon, Menu, X, ArrowRight } from "@/presentation/components/ui/Icons";
import { useLanguage } from "@/presentation/context/LanguageContext";
import { Button } from "@/presentation/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t("nav.advisory"), href: "#pilares" },
    { label: t("nav.classes"), href: "#pilares" },
    { label: t("nav.support"), href: "#pilares" },
    { label: t("nav.lab"), href: "#laboratorio" },
    { label: t("nav.methodology"), href: "#metodologia" },
    { label: t("nav.enterprise"), href: "#empresas" },
    { label: t("nav.testimonials"), href: "#testimonios" },
  ];

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-[#090a0d]/95 backdrop-blur-md border-white/10 shadow-lg shadow-black/60"
          : "bg-[#090a0d]/80 backdrop-blur-sm border-[rgba(255,255,255,0.08)]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Monogram and Brand Identity */}
        <Link href="#" className="flex items-center space-x-3 group" aria-label="Universal System Inicio">
          <span className="font-serif text-2xl font-semibold tracking-wider text-white transition-all duration-300 group-hover:tracking-widest">
            {appConfig.brand.shortName}
          </span>
          <div className="h-4 w-px bg-white/20 transition-all duration-300 group-hover:h-5 group-hover:bg-white/40"></div>
          <span className="text-xs uppercase tracking-[0.35em] text-white/90 font-medium transition-colors duration-300 group-hover:text-white">
            {appConfig.brand.name}
          </span>
        </Link>

        {/* Desktop Navigation Links with subtle underline animation */}
        <nav
          className="hidden xl:flex items-center space-x-7 text-[11px] tracking-[0.22em] uppercase text-[#8b8e99]"
          data-purpose="desktop-nav"
          aria-label="Navegación principal"
        >
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="relative py-1 transition-colors hover:text-white group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Action Button, Language Toggle & Contact WhatsApp */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          {/* Language Switcher Button */}
          <button
            onClick={toggleLanguage}
            type="button"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-sm border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-mono transition-all duration-200"
            title={t("nav.langSwitch")}
            aria-label={t("nav.langSwitch")}
          >
            <span className={language === "es" ? "text-white font-bold" : "text-neutral-500"}>ES</span>
            <span className="text-neutral-600">/</span>
            <span className={language === "en" ? "text-white font-bold" : "text-neutral-500"}>EN</span>
          </button>

          <a
            href={appConfig.author.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contacto directo por WhatsApp"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 hover:bg-emerald-900/30 hover:border-emerald-400 text-xs font-mono transition-all duration-300"
            title={`Contactar a ${appConfig.author.name} por WhatsApp`}
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline text-[11px] font-medium tracking-wider">
              {t("nav.whatsapp")}
            </span>
          </a>

          <a
            href="#selector"
            className="luxury-btn hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs uppercase tracking-[0.22em] font-medium text-black bg-white hover:bg-neutral-200 transition-all duration-300 rounded-sm shadow-sm"
          >
            {t("nav.cta")}
          </a>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-white/80 hover:text-white transition-colors"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#090a0d]/98 border-b border-white/10 px-6 py-6 animate-hero-0">
          <nav className="flex flex-col space-y-4" aria-label="Navegación móvil">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs uppercase tracking-[0.2em] text-neutral-300 hover:text-white py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <a
                href="#selector"
                onClick={() => setMobileMenuOpen(false)}
                className="luxury-btn w-full py-3 text-center text-xs uppercase tracking-[0.22em] font-semibold text-black bg-white rounded-sm"
              >
                {t("nav.cta")}
              </a>
              <a
                href={appConfig.author.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 text-center text-xs font-mono text-emerald-400 border border-emerald-500/40 rounded-sm flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>{appConfig.author.phoneDisplay}</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
