"use client";

import React from "react";
import { appConfig } from "@/infrastructure/config/env";
import {
  WhatsAppIcon,
  GithubIcon,
  LinkedinIcon,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
} from "@/presentation/components/ui/Icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-black text-white border-t border-[rgba(255,255,255,0.08)] py-16"
      data-purpose="site-footer"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[rgba(255,255,255,0.08)]">
          {/* Brand Info */}
          <div className="md:col-span-5">
            <div className="flex items-center space-x-3 mb-4">
              <span className="font-serif text-3xl font-semibold text-white">
                {appConfig.brand.shortName}
              </span>
              <div className="h-4 w-px bg-white/20"></div>
              <span className="text-xs uppercase tracking-[0.35em] text-white/80 font-medium">
                {appConfig.brand.name}
              </span>
            </div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#8b8e99] font-mono mb-4">
              {appConfig.brand.tagline}
            </p>
            <p className="text-xs text-[#8b8e99] font-light leading-relaxed max-w-sm mb-6">
              {appConfig.brand.description}
            </p>

            <div className="pt-2 text-xs text-neutral-400 font-mono flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-white/70">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{appConfig.author.specialty}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>{appConfig.author.location}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h5 className="text-xs uppercase tracking-widest text-white/50 mb-4 font-mono">
              Servicios Clave
            </h5>
            <ul className="space-y-2 text-xs text-[#d1d5db] font-light">
              <li>
                <a
                  className="hover:text-white transition-colors inline-block hover:translate-x-1 duration-200"
                  href="#pilares"
                >
                  Acompañamiento a Adultos
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white transition-colors inline-block hover:translate-x-1 duration-200"
                  href="#pilares"
                >
                  Mentorías de Productividad &amp; Ofimática
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white transition-colors inline-block hover:translate-x-1 duration-200"
                  href="#laboratorio"
                >
                  Aceleración SSD &amp; Limpieza Térmica
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white transition-colors inline-block hover:translate-x-1 duration-200"
                  href="#laboratorio"
                >
                  Recuperación de Archivos y Seguridad
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white transition-colors inline-block hover:translate-x-1 duration-200"
                  href="#metodologia"
                >
                  Protocolos &amp; Metodología Transparente
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact Channels */}
          <div className="md:col-span-4">
            <h5 className="text-xs uppercase tracking-widest text-white/50 mb-4 font-mono">
              Canales de Atención Directa
            </h5>
            <div className="space-y-3.5 text-xs text-[#d1d5db] font-light">
              <div className="flex items-start gap-2.5">
                <WhatsAppIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">WhatsApp Preferencial:</span>
                  <a
                    href={appConfig.author.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline font-mono text-xs"
                  >
                    {appConfig.author.phoneDisplay}
                  </a>
                  <span className="block text-[11px] text-neutral-400">
                    Respuesta en menos de 1 hora hábil.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">Correo Electrónico:</span>
                  <a
                    href={`mailto:${appConfig.author.email}`}
                    className="text-neutral-300 hover:text-white font-mono text-xs hover:underline"
                  >
                    {appConfig.author.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">Atención:</span>
                  <span className="text-neutral-400">{appConfig.author.availability}.</span>
                </div>
              </div>

              {/* Social profile badges */}
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={appConfig.author.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-sm bg-[#17181c] border border-white/10 hover:border-white/30 text-xs text-neutral-300 hover:text-white transition-all flex items-center gap-2"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span className="font-mono text-[11px]">GitHub</span>
                </a>
                <a
                  href={appConfig.author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-sm bg-[#17181c] border border-white/10 hover:border-white/30 text-xs text-neutral-300 hover:text-white transition-all flex items-center gap-2"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span className="font-mono text-[11px]">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright and Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8b8e99] font-light gap-4">
          <div>
            © {currentYear} {appConfig.brand.name}. Todos los derechos reservados.
            <span className="block sm:inline sm:ml-2 text-neutral-500">
              Desarrollado y mantenido por {appConfig.author.name}
            </span>
          </div>
          <div className="text-center sm:text-right text-[10px] uppercase tracking-[0.35em] text-white/40 font-mono">
            {appConfig.brand.tagline}
          </div>
        </div>
      </div>
    </footer>
  );
}
