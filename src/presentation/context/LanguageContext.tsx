"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { siteContentBundles, SiteContentBundle } from "@/data/site-content";

export type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  content: SiteContentBundle;
  t: (key: string) => string;
}

const UI_STRINGS: Record<Language, Record<string, string>> = {
  es: {
    // Nav
    "nav.advisory": "Asesoría & Paciencia",
    "nav.classes": "Clases Particulares",
    "nav.support": "Soporte Técnico",
    "nav.lab": "Laboratorio",
    "nav.methodology": "Metodología",
    "nav.enterprise": "Empresas B2B",
    "nav.testimonials": "Testimonios",
    "nav.cta": "Agendar Consulta",
    "nav.whatsapp": "WhatsApp Directo",
    "nav.langSwitch": "Switch to English",

    // Hero
    "hero.tagline": "Porque aprender nunca fue tan fácil.",
    "hero.title": "Tecnología Clara, Paciencia y Soporte de Precisión",
    "hero.subtitle": "Acompañamiento tecnológico humano para adultos y familias, mentorías personalizadas de productividad y laboratorio de soporte informático de alta precisión.",
    "hero.ctaExplore": "Conocer Servicios",
    "hero.ctaBook": "Agendar Atención",
    "hero.guarantee": "Garantía de Servicio",

    // Pillars
    "pillars.tag": "Excelencia & Soluciones",
    "pillars.title": "Nuestros Tres Pilares de Atención",
    "pillars.desc": "Diseñados con rigor técnico y vocación pedagógica para resolver cualquier desafío digital de forma definitiva.",
    "pillars.itemPrefix": "Pilar",

    // Laboratory
    "lab.tag": "Protocolo Técnico",
    "lab.title": "Laboratorio de Precisión & Hardware",
    "lab.desc": "Cada equipo ingresado atraviesa una pauta estricta de 4 fases de control antes de ser devuelto a su dueño.",
    "lab.stagePrefix": "Fase",

    // Methodology
    "methodology.tag": "Proceso Transparente",
    "methodology.title": "Metodología en Cuatro Pasos Claros",
    "methodology.desc": "Sin tecnicismos oscuros, sin costos sorpresa y con respaldo total en cada etapa.",
    "methodology.stepPrefix": "Paso",

    // Enterprise
    "enterprise.tag": "Soluciones B2B Corporativas",
    "enterprise.title": "Ingeniería de Software & Consultoría Enterprise",
    "enterprise.desc": "Para proyectos a gran escala, modernización de infraestructura y desarrollo backend/full-stack de alta disponibilidad liderado por Jorge Thompson.",
    "enterprise.cta": "Ver Perfil & Proyectos Enterprise",
    "enterprise.tagline": "Arquitectura limpia, contratos OpenAPI y despliegues de alto rendimiento.",

    // Solution Selector
    "selector.tag": "Atención Inmediata",
    "selector.title": "¿En qué te podemos ayudar hoy?",
    "selector.desc": "Selecciona el área de interés y cuéntanos brevemente tu caso. Te responderemos a la brevedad con una solución transparente.",
    "selector.service.asesoria.title": "Asesoría / Paciencia",
    "selector.service.asesoria.desc": "Trámites, banca y smartphones",
    "selector.service.clases.title": "Clases 1 a 1",
    "selector.service.clases.desc": "Nivelación, Excel, IA y oficina",
    "selector.service.soporte.title": "Soporte Técnico",
    "selector.service.soporte.desc": "Reparación, limpieza y SSD",
    "selector.label.name": "Tu Nombre o Familiar",
    "selector.label.contact": "Teléfono / WhatsApp de Contacto",
    "selector.label.detail": "¿Qué necesitas resolver o aprender?",
    "selector.placeholder.name": "Ej: Juan Pérez o María González",
    "selector.placeholder.contact": "Ej: +56 9 9516 2841",
    "selector.placeholder.detail": "Describe brevemente tu problema, modelo del equipo o tema que deseas aprender...",
    "selector.submit": "Enviar Consulta y Generar Ticket",
    "selector.submitting": "Procesando solicitud segura...",
    "selector.success.title": "¡Solicitud Procesada Exitosamente!",
    "selector.ticket.label": "ID de Ticket:",
    "selector.ticket.copy": "Copiar",
    "selector.ticket.copied": "¡Copiado!",
    "selector.btn.whatsapp": "Abrir WhatsApp con este Ticket",
    "selector.btn.email": "Enviar Vía Correo Electrónico",
    "selector.btn.reset": "Hacer otra consulta",
    "selector.securityNote": "Tus datos están protegidos por sanitización OWASP y cifrado en tránsito.",

    // Testimonials
    "testimonials.tag": "Confianza Comprobada",
    "testimonials.title": "Historias Reales de Nuestros Clientes",
    "testimonials.desc": "La tranquilidad y satisfacción de quienes ya resolvieron sus dificultades digitales con nosotros.",

    // Footer
    "footer.keyServices": "Servicios Clave",
    "footer.directChannels": "Canales de Atención Directa",
    "footer.whatsappPref": "WhatsApp Preferencial:",
    "footer.whatsappResponse": "Respuesta en menos de 1 hora hábil.",
    "footer.emailLabel": "Correo Electrónico:",
    "footer.hoursLabel": "Atención:",
    "footer.rights": "Todos los derechos reservados.",
    "footer.maintainedBy": "Desarrollado y mantenido por",
    "footer.status": "Estado de Plataforma",
    "footer.statusOnline": "Sistemas Operativos",
    "footer.statusOffline": "Modo Estático Resiliente",
  },
  en: {
    // Nav
    "nav.advisory": "Advisory & Patience",
    "nav.classes": "Private Classes",
    "nav.support": "Technical Support",
    "nav.lab": "Laboratory",
    "nav.methodology": "Methodology",
    "nav.enterprise": "Enterprise B2B",
    "nav.testimonials": "Testimonials",
    "nav.cta": "Book Consultation",
    "nav.whatsapp": "Direct WhatsApp",
    "nav.langSwitch": "Cambiar a Español",

    // Hero
    "hero.tagline": "Because learning was never so easy.",
    "hero.title": "Clear Technology, Patience & Precision Support",
    "hero.subtitle": "Empathetic tech advisory for seniors and families, personalized productivity mentoring, and precision computer support laboratory.",
    "hero.ctaExplore": "Explore Services",
    "hero.ctaBook": "Schedule Service",
    "hero.guarantee": "Service Guarantee",

    // Pillars
    "pillars.tag": "Excellence & Solutions",
    "pillars.title": "Our Three Service Pillars",
    "pillars.desc": "Engineered with technical rigor and pedagogical dedication to resolve any digital challenge definitively.",
    "pillars.itemPrefix": "Pillar",

    // Laboratory
    "lab.tag": "Technical Protocol",
    "lab.title": "Precision Hardware Laboratory",
    "lab.desc": "Every workstation or laptop undergoes a strict 4-phase inspection before returning to its owner.",
    "lab.stagePrefix": "Phase",

    // Methodology
    "methodology.tag": "Transparent Process",
    "methodology.title": "Methodology in Four Clear Steps",
    "methodology.desc": "No obscure jargon, no surprise costs, and full ongoing backing at every step.",
    "methodology.stepPrefix": "Step",

    // Enterprise
    "enterprise.tag": "Corporate B2B Solutions",
    "enterprise.title": "Software Engineering & Enterprise Consulting",
    "enterprise.desc": "For large-scale projects, infrastructure modernization, and high-availability backend/full-stack engineering led by Jorge Thompson.",
    "enterprise.cta": "View Enterprise Profile & Projects",
    "enterprise.tagline": "Clean Architecture, OpenAPI contracts, and high-performance deployments.",

    // Solution Selector
    "selector.tag": "Immediate Attention",
    "selector.title": "How can we help you today?",
    "selector.desc": "Select your area of interest and tell us about your case. We'll respond promptly with a transparent solution.",
    "selector.service.asesoria.title": "Advisory / Patience",
    "selector.service.asesoria.desc": "Procedures, banking & mobile",
    "selector.service.clases.title": "1-on-1 Classes",
    "selector.service.clases.desc": "Leveling, Excel, AI & Office",
    "selector.service.soporte.title": "Tech Support",
    "selector.service.soporte.desc": "Repair, maintenance & SSD",
    "selector.label.name": "Your Name or Family Member",
    "selector.label.contact": "Phone / WhatsApp Contact",
    "selector.label.detail": "What do you need to resolve or learn?",
    "selector.placeholder.name": "E.g.: John Doe or Mary Smith",
    "selector.placeholder.contact": "E.g.: +56 9 9516 2841",
    "selector.placeholder.detail": "Briefly describe your issue, device model or subject you want to master...",
    "selector.submit": "Submit Inquiry & Generate Ticket",
    "selector.submitting": "Processing secure request...",
    "selector.success.title": "Request Successfully Processed!",
    "selector.ticket.label": "Ticket ID:",
    "selector.ticket.copy": "Copy",
    "selector.ticket.copied": "Copied!",
    "selector.btn.whatsapp": "Open WhatsApp with this Ticket",
    "selector.btn.email": "Send Via Email",
    "selector.btn.reset": "Submit another inquiry",
    "selector.securityNote": "Your data is protected by OWASP sanitization and encryption in transit.",

    // Testimonials
    "testimonials.tag": "Proven Trust",
    "testimonials.title": "Real Stories from Our Clients",
    "testimonials.desc": "The peace of mind and satisfaction of those who overcame their digital challenges with us.",

    // Footer
    "footer.keyServices": "Key Services",
    "footer.directChannels": "Direct Attention Channels",
    "footer.whatsappPref": "Priority WhatsApp:",
    "footer.whatsappResponse": "Response in under 1 business hour.",
    "footer.emailLabel": "Email Address:",
    "footer.hoursLabel": "Hours:",
    "footer.rights": "All rights reserved.",
    "footer.maintainedBy": "Developed and maintained by",
    "footer.status": "Platform Status",
    "footer.statusOnline": "Systems Operational",
    "footer.statusOffline": "Resilient Static Mode",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");

  useEffect(() => {
    // 1. Check saved language preference in localStorage
    try {
      const saved = localStorage.getItem("universal_system_lang") as Language | null;
      if (saved === "es" || saved === "en") {
        setLanguageState(saved);
        return;
      }
    } catch {
      // localStorage may not be available in strict iframe/privacy environments
    }

    // 2. Initial detection based on user's browser language
    if (typeof navigator !== "undefined" && navigator.language) {
      const isSpanish = navigator.language.toLowerCase().startsWith("es");
      setLanguageState(isSpanish ? "es" : "en");
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("universal_system_lang", lang);
    } catch {
      // ignore storage errors
    }
  };

  const toggleLanguage = () => {
    const next = language === "es" ? "en" : "es";
    setLanguage(next);
  };

  const t = (key: string): string => {
    return UI_STRINGS[language]?.[key] || UI_STRINGS.es[key] || key;
  };

  const content = siteContentBundles[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        content,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
