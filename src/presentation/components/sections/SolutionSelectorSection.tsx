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
  ShieldCheck,
} from "@/presentation/components/ui/Icons";
import { useLanguage } from "@/presentation/context/LanguageContext";

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

  const { t, language } = useLanguage();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const services = [
    {
      id: "asesoria" as const,
      title: t("selector.service.asesoria.title"),
      desc: t("selector.service.asesoria.desc"),
    },
    {
      id: "clases" as const,
      title: t("selector.service.clases.title"),
      desc: t("selector.service.clases.desc"),
    },
    {
      id: "soporte" as const,
      title: t("selector.service.soporte.title"),
      desc: t("selector.service.soporte.desc"),
    },
  ];

  const isEs = language === "es";

  return (
    <section
      id="selector"
      className="py-24 max-w-4xl mx-auto px-6 reveal-on-scroll"
      data-purpose="solution-selector"
      aria-label={t("selector.title")}
    >
      <div className="editorial-border interactive-card rounded-xl bg-gradient-to-b from-[#181920] to-[#101114] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        {/* Glow ambient highlight */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-3xl pointer-events-none"></div>

        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70 block mb-2 font-mono">
            {t("selector.tag")}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mb-3">
            {t("selector.title")}
          </h2>
          <p className="text-xs sm:text-sm text-[#d1d5db] max-w-lg mx-auto">
            {t("selector.desc")}
          </p>
        </div>

        {/* Success confirmation modal / screen */}
        {result && result.success ? (
          <div
            className="p-8 sm:p-10 rounded-xl bg-black/60 border border-emerald-500/30 text-center space-y-6 animate-hero-0"
            role="status"
            aria-live="polite"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                {t("selector.success.title")}
              </h3>
              <p className="text-xs sm:text-sm text-[#d1d5db] max-w-md mx-auto leading-relaxed">
                {result.message}
              </p>
            </div>

            {result.ticketId && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#090a0d] border border-white/10 font-mono text-xs text-white">
                <span className="text-[#8b8e99]">{t("selector.ticket.label")}</span>
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
                  aria-label={t("selector.btn.whatsapp")}
                  className="w-full sm:w-auto px-6 py-3 rounded-sm bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon className="w-4 h-4 text-black" />
                  <span>{t("selector.btn.whatsapp")}</span>
                </a>
              )}

              {result.mailtoUrl && (
                <a
                  href={result.mailtoUrl}
                  aria-label={t("selector.btn.email")}
                  className="w-full sm:w-auto px-6 py-3 rounded-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>{t("selector.btn.email")}</span>
                </a>
              )}
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={resetForm}
                className="text-xs text-[#d1d5db] hover:text-white underline font-mono transition-colors focus:outline-none focus:ring-1 focus:ring-white/40"
              >
                {t("selector.btn.reset")}
              </button>
            </div>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={submitForm} noValidate={false}>
            {/* OWASP A04: Anti-Bot Honeypot - Invisible to legitimate users */}
            <div className="hidden opacity-0 pointer-events-none absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="form_security_trap">No completar este campo</label>
              <input
                id="form_security_trap"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData._honeypot || ""}
                onChange={(e) => updateField("_honeypot", e.target.value)}
              />
            </div>

            {error && (
              <div
                className="p-4 rounded-lg bg-red-950/60 border border-red-700 text-red-200 text-xs flex items-center gap-2.5 font-sans"
                role="alert"
                aria-live="assertive"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Category Selector */}
            <fieldset>
              <legend
                id="service-category-label"
                className="block text-xs uppercase tracking-widest text-[#e5e7eb] mb-3 font-mono font-medium"
              >
                1. {isEs ? "¿En qué área necesitas ayuda?" : "Which service area do you need?"}
              </legend>
              <div
                className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                role="radiogroup"
                aria-labelledby="service-category-label"
              >
                {services.map((item) => {
                  const isActive = formData.service === item.id;
                  return (
                    <label
                      key={item.id}
                      onClick={() => setService(item.id)}
                      className={`service-option-card flex flex-col justify-center p-3.5 rounded border cursor-pointer transition-all ${
                        isActive
                          ? "active-option border-white bg-white/[0.12] shadow-sm shadow-white/20"
                          : "border-white/20 hover:border-white/50 bg-white/[0.03]"
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="service"
                          value={item.id}
                          checked={isActive}
                          onChange={() => setService(item.id)}
                          aria-checked={isActive}
                          className="text-black focus:ring-1 focus:ring-white mr-3 accent-white cursor-pointer"
                        />
                        <span className="text-xs font-semibold text-white">{item.title}</span>
                      </div>
                      <span className="text-[10px] text-[#9ca3af] mt-1 ml-6 font-mono">
                        {item.desc}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* User Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-xs uppercase tracking-widest text-[#e5e7eb] mb-2 font-mono font-medium"
                  htmlFor="contact_name"
                >
                  {t("selector.label.name")} *
                </label>
                <input
                  id="contact_name"
                  type="text"
                  required
                  aria-required="true"
                  aria-invalid={!!error && !formData.name}
                  maxLength={80}
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder={t("selector.placeholder.name")}
                  className="luxury-input w-full bg-black/60 border border-white/20 rounded px-4 py-2.5 text-xs text-white placeholder-neutral-400 focus:border-white focus:ring-1 focus:ring-white font-sans transition-colors"
                />
              </div>

              <div>
                <label
                  className="block text-xs uppercase tracking-widest text-[#e5e7eb] mb-2 font-mono font-medium"
                  htmlFor="contact_phone"
                >
                  {t("selector.label.contact")} *
                </label>
                <input
                  id="contact_phone"
                  type="tel"
                  required
                  aria-required="true"
                  aria-invalid={!!error && !formData.contact}
                  maxLength={25}
                  value={formData.contact}
                  onChange={(e) => updateField("contact", e.target.value)}
                  placeholder={t("selector.placeholder.contact")}
                  className="luxury-input w-full bg-black/60 border border-white/20 rounded px-4 py-2.5 text-xs text-white placeholder-neutral-400 focus:border-white focus:ring-1 focus:ring-white font-mono transition-colors"
                />
              </div>
            </div>

            {/* Message Detail */}
            <div>
              <label
                className="block text-xs uppercase tracking-widest text-[#e5e7eb] mb-2 font-mono font-medium"
                htmlFor="contact_detail"
              >
                {t("selector.label.detail")}
              </label>
              <textarea
                id="contact_detail"
                rows={3}
                maxLength={1000}
                value={formData.detail}
                onChange={(e) => updateField("detail", e.target.value)}
                placeholder={t("selector.placeholder.detail")}
                className="luxury-input w-full bg-black/60 border border-white/20 rounded px-4 py-2.5 text-xs text-white placeholder-neutral-400 focus:border-white focus:ring-1 focus:ring-white font-sans resize-none transition-colors"
              />
              <span className="text-[10px] text-neutral-400 font-mono block text-right mt-1">
                {(formData.detail || "").length}/1000 {isEs ? "caracteres" : "characters"}
              </span>
            </div>

            {/* Submit Button & OWASP Security Badge */}
            <div className="pt-2 text-center space-y-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="luxury-btn w-full sm:w-auto px-10 py-3.5 bg-white text-black text-xs uppercase tracking-[0.22em] font-semibold rounded hover:bg-neutral-200 transition-colors active:scale-95 shadow-lg shadow-white/10 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
              >
                {isSubmitting ? t("selector.submitting") : t("selector.submit")}
              </button>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-[11px] text-[#9ca3af] font-mono">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.05] border border-white/10 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t("selector.securityNote")}</span>
                </span>
                <span className="hidden sm:inline">•</span>
                <span>{isEs ? "Atención preferencial por orden de llegada." : "Priority attention by order of arrival."}</span>
              </div>
            </div>
          </form>
        )}

        {/* Quick Contact Pill Bar with Jorge Thompson's direct credentials */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#d1d5db]">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">{isEs ? "Contacto Directo:" : "Direct Contact:"}</span>
            <span className="text-neutral-200 font-semibold">{appConfig.author.name}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => copyToClipboard(appConfig.author.phone, "phone")}
              className="flex items-center gap-1.5 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white/30 rounded p-1"
              aria-label={`${isEs ? "Copiar teléfono:" : "Copy phone:"} ${appConfig.author.phoneDisplay}`}
              title={isEs ? "Copiar teléfono" : "Copy phone"}
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{appConfig.author.phoneDisplay}</span>
              {copiedField === "phone" ? (
                <Check className="w-3 h-3 text-emerald-400" />
              ) : (
                <Copy className="w-3 h-3 text-neutral-400" />
              )}
            </button>

            <button
              type="button"
              onClick={() => copyToClipboard(appConfig.author.email, "email")}
              className="flex items-center gap-1.5 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white/30 rounded p-1"
              aria-label={`${isEs ? "Copiar correo:" : "Copy email:"} ${appConfig.author.email}`}
              title={isEs ? "Copiar correo" : "Copy email"}
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>{appConfig.author.email}</span>
              {copiedField === "email" ? (
                <Check className="w-3 h-3 text-emerald-400" />
              ) : (
                <Copy className="w-3 h-3 text-neutral-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
