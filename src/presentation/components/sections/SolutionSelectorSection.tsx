"use client";

import React, { useState } from "react";
import { useSolutionSelector } from "@/presentation/hooks/useSolutionSelector";
import { appConfig } from "@/infrastructure/config/env";
import {
  WhatsAppIcon,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
} from "@/presentation/components/ui/Icons";

export function SolutionSelectorSection() {
  const {
    formData,
    setService,
    updateField,
    submitForm,
    resetForm,
    isSubmitting,
    result,
    error,
  } = useSolutionSelector();

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const services = [
    {
      id: "asesoria" as const,
      title: "Asesoría / Paciencia",
      desc: "Trámites, banca y smartphones",
    },
    {
      id: "clases" as const,
      title: "Clases 1 a 1",
      desc: "Excel, IA y productividad",
    },
    {
      id: "soporte" as const,
      title: "Soporte Notebook/PC",
      desc: "Limpieza, SSD y reparación",
    },
  ];

  return (
    <section
      id="selector"
      className="py-24 max-w-4xl mx-auto px-6 reveal-on-scroll"
      data-purpose="solution-selector"
    >
      <div className="editorial-border interactive-card rounded-xl bg-gradient-to-b from-[#181920] to-[#101114] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        {/* Glow ambient highlight */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-3xl pointer-events-none"></div>

        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60 block mb-2 font-mono">
            Atención Personalizada
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mb-3">
            Encuentra Tu Solución Ideal
          </h2>
          <p className="text-xs sm:text-sm text-[#8b8e99] max-w-lg mx-auto">
            Selecciona tu necesidad y nuestro equipo se contactará para coordinar la mejor alternativa.
          </p>
        </div>

        {/* Success confirmation modal / screen */}
        {result && result.success ? (
          <div className="p-8 sm:p-10 rounded-xl bg-black/60 border border-emerald-500/30 text-center space-y-6 animate-hero-0">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                ¡Solicitud Registrada con Éxito!
              </h3>
              <p className="text-xs sm:text-sm text-[#d1d5db] max-w-md mx-auto leading-relaxed">
                {result.message}
              </p>
            </div>

            {result.ticketId && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#090a0d] border border-white/10 font-mono text-xs text-white">
                <span className="text-[#8b8e99]">Nº de Ticket:</span>
                <span className="text-emerald-400 font-semibold">{result.ticketId}</span>
              </div>
            )}

            {/* Direct action dispatch buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              {result.whatsappUrl && (
                <a
                  href={result.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-sm bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon className="w-4 h-4 text-black" />
                  <span>Continuar por WhatsApp</span>
                </a>
              )}

              {result.mailtoUrl && (
                <a
                  href={result.mailtoUrl}
                  className="w-full sm:w-auto px-6 py-3 rounded-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>Enviar por Email</span>
                </a>
              )}
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={resetForm}
                className="text-xs text-[#8b8e99] hover:text-white underline font-mono transition-colors"
              >
                Realizar otra consulta
              </button>
            </div>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={submitForm}>
            {error && (
              <div className="p-4 rounded-lg bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Category Selector */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#d1d5db] mb-3 font-mono">
                1. ¿En qué área necesitas ayuda?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" id="service-options-group">
                {services.map((item) => {
                  const isActive = formData.service === item.id;
                  return (
                    <label
                      key={item.id}
                      onClick={() => setService(item.id)}
                      className={`service-option-card flex flex-col justify-center p-3.5 rounded border cursor-pointer transition-all ${
                        isActive
                          ? "active-option border-white/60 bg-white/[0.08] shadow-sm shadow-white/10"
                          : "border-white/10 hover:border-white/30 bg-white/[0.02]"
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="service"
                          value={item.id}
                          checked={isActive}
                          onChange={() => setService(item.id)}
                          className="text-black focus:ring-0 mr-3 accent-white cursor-pointer"
                        />
                        <span className="text-xs font-medium text-white">{item.title}</span>
                      </div>
                      <span className="text-[10px] text-[#8b8e99] mt-1 ml-6 font-mono">
                        {item.desc}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* User Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-xs uppercase tracking-widest text-[#d1d5db] mb-2 font-mono"
                  htmlFor="name"
                >
                  Tu Nombre Completo
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Ej: Marcela González"
                  className="luxury-input w-full bg-black/40 border border-white/10 rounded px-4 py-2.5 text-xs text-white placeholder-[#8b8e99]/50 focus:border-white/50 focus:ring-0 font-sans"
                />
              </div>

              <div>
                <label
                  className="block text-xs uppercase tracking-widest text-[#d1d5db] mb-2 font-mono"
                  htmlFor="contact"
                >
                  WhatsApp o Teléfono
                </label>
                <input
                  id="contact"
                  type="tel"
                  required
                  value={formData.contact}
                  onChange={(e) => updateField("contact", e.target.value)}
                  placeholder="Ej: +56 9 8245 6154"
                  className="luxury-input w-full bg-black/40 border border-white/10 rounded px-4 py-2.5 text-xs text-white placeholder-[#8b8e99]/50 focus:border-white/50 focus:ring-0 font-mono"
                />
              </div>
            </div>

            {/* Message Detail */}
            <div>
              <label
                className="block text-xs uppercase tracking-widest text-[#d1d5db] mb-2 font-mono"
                htmlFor="detail"
              >
                Describe brevemente qué necesitas resolver o aprender
              </label>
              <textarea
                id="detail"
                rows={3}
                value={formData.detail}
                onChange={(e) => updateField("detail", e.target.value)}
                placeholder="Ej: Deseo aprender a usar el home banking con seguridad sin temor a cometer errores..."
                className="luxury-input w-full bg-black/40 border border-white/10 rounded px-4 py-2.5 text-xs text-white placeholder-[#8b8e99]/50 focus:border-white/50 focus:ring-0 font-sans resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="luxury-btn w-full sm:w-auto px-10 py-3.5 bg-white text-black text-xs uppercase tracking-[0.22em] font-semibold rounded hover:bg-neutral-200 transition-colors active:scale-95 shadow-lg shadow-white/5 disabled:opacity-50"
              >
                {isSubmitting ? "Registrando Solicitud..." : "Solicitar Asesoramiento Inmediato"}
              </button>
              <p className="text-[11px] text-[#8b8e99] mt-3 font-mono">
                Atención preferencial por orden de llegada. Sin ningún costo de consulta previa.
              </p>
            </div>
          </form>
        )}

        {/* Quick Contact Pill Bar with Jorge Thompson's direct credentials */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#8b8e99]">
          <div className="flex items-center gap-2">
            <span className="text-white">Contacto Directo:</span>
            <span className="text-neutral-300 font-semibold">{appConfig.author.name}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => copyToClipboard(appConfig.author.phone, "phone")}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              title="Copiar teléfono"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{appConfig.author.phoneDisplay}</span>
              {copiedField === "phone" ? (
                <Check className="w-3 h-3 text-emerald-400" />
              ) : (
                <Copy className="w-3 h-3 text-neutral-500" />
              )}
            </button>

            <button
              type="button"
              onClick={() => copyToClipboard(appConfig.author.email, "email")}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              title="Copiar correo"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>{appConfig.author.email}</span>
              {copiedField === "email" ? (
                <Check className="w-3 h-3 text-emerald-400" />
              ) : (
                <Copy className="w-3 h-3 text-neutral-500" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
