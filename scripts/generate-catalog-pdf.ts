import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import {
  GLOBAL_PRICING_CONFIG,
  calculateRegularPriceCLP,
  formatCLP,
} from "../src/infrastructure/config/pricing.config";
import { appConfig } from "../src/infrastructure/config/env";
import {
  curriculumLevelsEs,
  pricingPlansEs,
  scheduleModalitiesEs,
  supportRatesEs,
  labChecklistEs,
} from "../src/data/site-content.es";

function findBrowserExecutable(): string {
  const candidates = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  throw new Error("No se encontró Google Chrome ni Microsoft Edge para renderizar el PDF.");
}

function buildCatalogHtml(logoDataUri: string): string {
  const discountPct = GLOBAL_PRICING_CONFIG.launchDiscountPercent;
  const primaryDiag = supportRatesEs.find((r) => r.isPrimaryDiagnostic)!;
  const secondarySupport = supportRatesEs.filter((r) => !r.isPrimaryDiagnostic);

  const plansHtml = pricingPlansEs
    .map((plan) => {
      const cfg = GLOBAL_PRICING_CONFIG.plans[plan.id];
      const finalPrice = formatCLP(cfg.discountedMonthlyCLP);
      const regularPrice = formatCLP(calculateRegularPriceCLP(cfg.discountedMonthlyCLP, discountPct));
      const isFeatured = !!cfg.featured;
      const isIntensive = plan.id === "intensivo";

      const borderClass = isFeatured
        ? "plan-featured"
        : isIntensive
        ? "plan-intensive"
        : "";

      const badgeClass = isFeatured
        ? "badge-emerald"
        : isIntensive
        ? "badge-cyan"
        : "badge-neutral";

      return `
        <div class="plan-card ${borderClass}">
          <div class="plan-top">
            <span class="badge ${badgeClass}">${plan.badge}</span>
            <span class="discount-pill">-${discountPct}% OFF</span>
          </div>
          <h3 class="plan-name">${plan.name}</h3>
          <div class="price-box">
            <div class="regular-price">Valor normal: <span>${regularPrice} CLP</span></div>
            <div class="final-price">${finalPrice} <small>CLP / mes</small></div>
          </div>
          <div class="plan-scope">${plan.scopeSummary}</div>
          <div class="plan-schedule ${isIntensive ? "text-cyan" : "text-emerald"}">${plan.scheduleSummary}</div>
          <p class="plan-desc">${plan.description}</p>
          <ul class="plan-list">
            ${plan.highlights.map((h) => `<li><span>✓</span> ${h}</li>`).join("")}
          </ul>
        </div>
      `;
    })
    .join("");

  const levelsHtml = curriculumLevelsEs
    .map(
      (lvl) => `
      <div class="level-row">
        <div class="level-num">NIVEL ${lvl.levelNumber}</div>
        <div class="level-body">
          <div class="level-title-line">
            <strong>${lvl.title}</strong>
            <span class="level-meta">${lvl.badge}</span>
          </div>
          <p>${lvl.generalFocus}</p>
        </div>
      </div>
    `
    )
    .join("");

  const supportRowsHtml = secondarySupport
    .map(
      (srv) => `
      <div class="support-row">
        <div class="support-info">
          <h4>${srv.name}</h4>
          <p>${srv.detail}</p>
        </div>
        <div class="support-price">
          ${srv.isFromPrice ? `<span class="from-label">DESDE</span>` : ""}
          <strong>${formatCLP(srv.priceCLP)}</strong> <small>CLP</small>
        </div>
      </div>
    `
    )
    .join("");

  const checklistHtml = labChecklistEs
    .map(
      (chk) => `
      <div class="chk-pill">
        <span class="chk-step">${chk.stepNumber}. ${chk.title}</span>
        <span class="chk-sub">${chk.subtitle}</span>
      </div>
    `
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Catálogo Oficial de Precios — Universal System</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    html, body {
      width: 210mm;
      background: #090a0d;
      color: #f3f4f6;
      font-family: "Plus Jakarta Sans", system-ui, sans-serif;
    }
    .page {
      width: 210mm;
      height: 297mm;
      padding: 13mm 15mm 12mm 15mm;
      background:
        radial-gradient(circle at 82% 10%, rgba(56, 189, 248, 0.07) 0%, rgba(9, 10, 13, 0) 48%),
        radial-gradient(circle at 18% 88%, rgba(16, 185, 129, 0.06) 0%, rgba(9, 10, 13, 0) 45%),
        #090a0d;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      page-break-after: always;
    }
    .page:last-child {
      page-break-after: auto;
    }

    /* Editorial Top Bar */
    .top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.10);
      margin-bottom: 12px;
    }
    .brand-id {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .brand-monogram {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 24px;
      font-weight: 600;
      color: #ffffff;
      letter-spacing: 0.06em;
    }
    .brand-divider {
      width: 1px;
      height: 16px;
      background: rgba(255, 255, 255, 0.25);
    }
    .brand-name {
      font-family: "JetBrains Mono", monospace;
      font-size: 9.5px;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.9);
      white-space: nowrap;
    }
    .promo-chip {
      font-family: "JetBrains Mono", monospace;
      font-size: 8.5px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 5px 11px;
      border-radius: 999px;
      background: rgba(6, 78, 59, 0.45);
      border: 1px solid rgba(16, 185, 129, 0.45);
      color: #6ee7b7;
      font-weight: 600;
      white-space: nowrap;
    }

    /* Hero Banner on Page 1 */
    .hero-strip {
      display: grid;
      grid-template-columns: 165px 1fr;
      gap: 16px;
      align-items: center;
      padding: 12px 14px;
      background: linear-gradient(135deg, rgba(24, 26, 33, 0.9) 0%, rgba(14, 15, 19, 0.95) 100%);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 6px;
      margin-bottom: 12px;
      position: relative;
    }
    .logo-frame {
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 4px;
      overflow: hidden;
      background: #000;
      aspect-ratio: 1376 / 768;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .logo-frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .hero-copy .eyebrow {
      font-family: "JetBrains Mono", monospace;
      font-size: 8.5px;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: #9ca3af;
      display: block;
      margin-bottom: 4px;
    }
    .hero-copy h1 {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 25px;
      font-weight: 500;
      color: #ffffff;
      line-height: 1.12;
      margin-bottom: 5px;
    }
    .hero-copy p {
      font-size: 10px;
      color: #d1d5db;
      line-height: 1.45;
      font-weight: 300;
    }

    /* Schedule Bar */
    .schedules-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 12px;
    }
    .sched-card {
      padding: 9px 12px;
      background: #12141b;
      border: 1px solid rgba(255, 255, 255, 0.10);
      border-radius: 5px;
    }
    .sched-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 3px;
    }
    .sched-head strong {
      font-size: 10.5px;
      color: #ffffff;
      font-weight: 600;
    }
    .sched-head span {
      font-family: "JetBrains Mono", monospace;
      font-size: 8.5px;
      color: #6ee7b7;
    }
    .sched-card.vesp .sched-head span {
      color: #7dd3fc;
    }
    .sched-card p {
      font-size: 9px;
      color: #9ca3af;
      line-height: 1.38;
    }

    /* Section Label */
    .sec-label {
      font-family: "JetBrains Mono", monospace;
      font-size: 8.2px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.55);
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      white-space: nowrap;
    }

    /* 4 Plans 2x2 Compact Grid */
    .plans-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 12px;
    }
    .plan-card {
      background: linear-gradient(145deg, #161820 0%, #101217 100%);
      border: 1px solid rgba(255, 255, 255, 0.11);
      border-radius: 6px;
      padding: 11px 13px;
      display: flex;
      flex-direction: column;
    }
    .plan-featured {
      border-color: rgba(16, 185, 129, 0.5);
      background: linear-gradient(145deg, rgba(6, 78, 59, 0.16) 0%, #111319 100%);
    }
    .plan-intensive {
      border-color: rgba(56, 189, 248, 0.45);
      background: linear-gradient(145deg, rgba(12, 74, 110, 0.18) 0%, #111319 100%);
    }
    .plan-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 5px;
    }
    .badge {
      font-family: "JetBrains Mono", monospace;
      font-size: 8px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      padding: 2.5px 7px;
      border-radius: 3px;
    }
    .badge-neutral {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.14);
      color: #d1d5db;
    }
    .badge-emerald {
      background: rgba(6, 78, 59, 0.55);
      border: 1px solid rgba(16, 185, 129, 0.45);
      color: #6ee7b7;
    }
    .badge-cyan {
      background: rgba(12, 74, 110, 0.55);
      border: 1px solid rgba(56, 189, 248, 0.45);
      color: #7dd3fc;
    }
    .discount-pill {
      font-family: "JetBrains Mono", monospace;
      font-size: 8.5px;
      font-weight: 600;
      color: #34d399;
    }
    .plan-name {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 20px;
      font-weight: 600;
      color: #ffffff;
      margin-bottom: 4px;
    }
    .price-box {
      padding-bottom: 6px;
      margin-bottom: 6px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: baseline;
      justify-content: space-between;
    }
    .regular-price {
      font-family: "JetBrains Mono", monospace;
      font-size: 8.5px;
      color: #8b8e99;
    }
    .regular-price span {
      text-decoration: line-through;
      color: rgba(255, 255, 255, 0.45);
    }
    .final-price {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-variant-numeric: lining-nums tabular-nums;
      font-feature-settings: "lnum" 1, "tnum" 1;
      font-size: 23px;
      font-weight: 600;
      color: #ffffff;
    }
    .final-price small {
      font-family: "JetBrains Mono", monospace;
      font-size: 8.5px;
      font-weight: 400;
      color: #9ca3af;
    }
    .plan-scope {
      font-family: "JetBrains Mono", monospace;
      font-size: 8.5px;
      color: #f3f4f6;
      margin-bottom: 2px;
    }
    .plan-schedule {
      font-family: "JetBrains Mono", monospace;
      font-size: 8.5px;
      margin-bottom: 5px;
    }
    .text-emerald { color: #6ee7b7; }
    .text-cyan { color: #7dd3fc; }
    .plan-desc {
      font-size: 9px;
      color: #b5b9c4;
      line-height: 1.38;
      margin-bottom: 6px;
    }
    .plan-list {
      list-style: none;
      border-top: 1px solid rgba(255, 255, 255, 0.07);
      padding-top: 5px;
    }
    .plan-list li {
      font-size: 8.5px;
      color: #d1d5db;
      line-height: 1.42;
      margin-bottom: 2px;
    }
    .plan-list li span {
      color: #ffffff;
      font-weight: 600;
      margin-right: 4px;
    }

    /* Compact Levels Box on Page 1 */
    .levels-box {
      background: #101217;
      border: 1px solid rgba(255, 255, 255, 0.10);
      border-radius: 6px;
      padding: 10px 12px;
    }
    .level-row {
      display: grid;
      grid-template-columns: 62px 1fr;
      gap: 10px;
      padding: 4.5px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      align-items: start;
    }
    .level-row:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    .level-num {
      font-family: "JetBrains Mono", monospace;
      font-size: 8.5px;
      color: #6ee7b7;
      padding-top: 1px;
      letter-spacing: 0.08em;
    }
    .level-title-line {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1px;
    }
    .level-title-line strong {
      font-size: 9.8px;
      color: #ffffff;
      font-weight: 600;
    }
    .level-meta {
      font-family: "JetBrains Mono", monospace;
      font-size: 8px;
      color: #8b8e99;
    }
    .level-body p {
      font-size: 8.5px;
      color: #a1a6b3;
      line-height: 1.32;
    }

    /* Page 2 Styles: Technical Support & Lab */
    .p2-title-block {
      margin-bottom: 14px;
    }
    .p2-title-block .eyebrow {
      font-family: "JetBrains Mono", monospace;
      font-size: 9px;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: #38bdf8;
      display: block;
      margin-bottom: 4px;
    }
    .p2-title-block h2 {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 28px;
      font-weight: 500;
      color: #ffffff;
      margin-bottom: 4px;
    }
    .p2-title-block p {
      font-size: 10.5px;
      color: #9ca3af;
      line-height: 1.45;
    }

    .diag-hero {
      background: linear-gradient(135deg, rgba(6, 78, 59, 0.28) 0%, #12151c 65%, #0e1015 100%);
      border: 1px solid rgba(16, 185, 129, 0.48);
      border-radius: 8px;
      padding: 16px 18px;
      margin-bottom: 14px;
    }
    .diag-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.10);
    }
    .diag-top h3 {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 22px;
      font-weight: 600;
      color: #ffffff;
      margin-top: 4px;
    }
    .diag-price-tag {
      text-align: right;
      flex-shrink: 0;
    }
    .diag-price-tag .fixed-lbl {
      display: block;
      font-family: "JetBrains Mono", monospace;
      font-size: 8.5px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #6ee7b7;
      margin-bottom: 2px;
    }
    .diag-price-tag .amount {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-variant-numeric: lining-nums tabular-nums;
      font-feature-settings: "lnum" 1, "tnum" 1;
      font-size: 32px;
      font-weight: 600;
      color: #ffffff;
      line-height: 1;
    }
    .diag-price-tag .amount small {
      font-family: "JetBrains Mono", monospace;
      font-size: 10px;
      color: #d1d5db;
    }
    .diag-desc {
      font-size: 10px;
      color: #d1d5db;
      line-height: 1.48;
      margin-bottom: 10px;
    }
    .chk-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }
    .chk-pill {
      background: rgba(0, 0, 0, 0.42);
      border: 1px solid rgba(255, 255, 255, 0.10);
      border-radius: 4px;
      padding: 7px 8px;
    }
    .chk-step {
      display: block;
      font-family: "JetBrains Mono", monospace;
      font-size: 7.8px;
      text-transform: uppercase;
      color: #6ee7b7;
      margin-bottom: 2px;
    }
    .chk-sub {
      display: block;
      font-size: 8.5px;
      color: #e5e7eb;
      line-height: 1.3;
    }

    /* Secondary Support List */
    .support-table {
      background: #111319;
      border: 1px solid rgba(255, 255, 255, 0.10);
      border-radius: 7px;
      padding: 6px 14px;
      margin-bottom: 14px;
    }
    .support-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 10px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    }
    .support-row:last-child {
      border-bottom: none;
    }
    .support-info h4 {
      font-size: 11px;
      font-weight: 600;
      color: #ffffff;
      margin-bottom: 3px;
    }
    .support-info p {
      font-size: 9.2px;
      color: #9ca3af;
      line-height: 1.4;
      max-width: 430px;
    }
    .support-price {
      text-align: right;
      flex-shrink: 0;
    }
    .support-price .from-label {
      display: block;
      font-family: "JetBrains Mono", monospace;
      font-size: 7.5px;
      letter-spacing: 0.16em;
      color: #8b8e99;
    }
    .support-price strong {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-variant-numeric: lining-nums tabular-nums;
      font-feature-settings: "lnum" 1, "tnum" 1;
      font-size: 21px;
      font-weight: 600;
      color: #ffffff;
    }
    .support-price small {
      font-family: "JetBrains Mono", monospace;
      font-size: 9px;
      color: #9ca3af;
    }

    /* Guarantees & Policies Grid */
    .guarantees-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 14px;
    }
    .guar-card {
      background: #13151c;
      border: 1px solid rgba(255, 255, 255, 0.09);
      border-radius: 6px;
      padding: 11px 12px;
    }
    .guar-card h5 {
      font-family: "JetBrains Mono", monospace;
      font-size: 8.8px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #ffffff;
      margin-bottom: 4px;
    }
    .guar-card p {
      font-size: 8.8px;
      color: #9ca3af;
      line-height: 1.42;
    }

    /* Direct Contact Card */
    .contact-card {
      background: linear-gradient(90deg, #151821 0%, #101218 100%);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 7px;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
    }
    .contact-left .role {
      font-family: "JetBrains Mono", monospace;
      font-size: 8.2px;
      text-transform: uppercase;
      letter-spacing: 0.18em;
      color: #38bdf8;
      display: block;
      margin-bottom: 3px;
    }
    .contact-left h4 {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 21px;
      font-weight: 600;
      color: #ffffff;
      margin-bottom: 2px;
    }
    .contact-left p {
      font-size: 9px;
      color: #9ca3af;
    }
    .contact-channels {
      text-align: right;
      font-family: "JetBrains Mono", monospace;
      font-size: 9.5px;
      line-height: 1.65;
    }
    .contact-channels .wa {
      color: #6ee7b7;
      font-weight: 600;
    }
    .contact-channels .em {
      color: #e5e7eb;
    }
    .contact-channels .loc {
      font-size: 8.2px;
      color: #8b8e99;
    }

    /* Footer Line */
    .page-footer {
      padding-top: 8px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      font-family: "JetBrains Mono", monospace;
      font-size: 7.6px;
      color: #6b7280;
      letter-spacing: 0.09em;
      text-transform: uppercase;
      white-space: nowrap;
    }
    .order-note {
      background: rgba(120, 53, 15, 0.16);
      border: 1px solid rgba(251, 191, 36, 0.30);
      border-radius: 5px;
      padding: 8px 11px;
      margin-bottom: 12px;
      font-size: 8.8px;
      color: #e5e7eb;
      line-height: 1.42;
    }
    .order-note strong {
      font-family: "JetBrains Mono", monospace;
      font-size: 8.2px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #fcd34d;
      margin-right: 5px;
    }
  </style>
</head>
<body>
  <!-- PÁGINA 1: PLANES MENSUALES, HORARIOS Y RUTA RESERVADA DE NIVELES -->
  <section class="page">
    <div>
      <header class="top-bar">
        <div class="brand-id">
          <span class="brand-monogram">${appConfig.brand.shortName}</span>
          <span class="brand-divider"></span>
          <span class="brand-name">${appConfig.brand.name} • Catálogo Tarifario</span>
        </div>
        <div class="promo-chip">Apertura Clientes • ${discountPct}% Descuento Aplicado</div>
      </header>

      <div class="hero-strip">
        <div class="logo-frame">
          <img src="${logoDataUri}" alt="Universal System Logo" />
        </div>
        <div class="hero-copy">
          <span class="eyebrow">${appConfig.brand.tagline}</span>
          <h1>Planes de Nivelación & Soporte de Precisión</h1>
          <p>
            Acompañamiento tecnológico humano, paciente y libre de tecnicismos intimidantes.
            Cualquier nivel seleccionado de forma individual corresponde al <strong>Plan Básico</strong>,
            con opción de combinar niveles o cursar asistencia intensiva en doble horario.
          </p>
        </div>
      </div>

      <div class="sec-label">
        <span>01 • Dos Modalidades Horarias Disponibles</span>
        <span>Cupos Reducidos por Bloque</span>
      </div>
      <div class="schedules-grid">
        <div class="sched-card">
          <div class="sched-head">
            <strong>${scheduleModalitiesEs[0].label}</strong>
            <span>${scheduleModalitiesEs[0].windowLabel}</span>
          </div>
          <p>${scheduleModalitiesEs[0].description}</p>
        </div>
        <div class="sched-card vesp">
          <div class="sched-head">
            <strong>${scheduleModalitiesEs[1].label}</strong>
            <span>${scheduleModalitiesEs[1].windowLabel}</span>
          </div>
          <p>${scheduleModalitiesEs[1].description}</p>
        </div>
      </div>

      <div class="sec-label">
        <span>02 • Planes Mensuales con ${discountPct}% de Descuento Inicial</span>
        <span>Valores en Pesos Chilenos (CLP)</span>
      </div>
      <div class="plans-grid">
        ${plansHtml}
      </div>

      <div class="order-note">
        <strong>Nota de Recomendación Pedagógica:</strong>
        Puedes seleccionar libremente cualquier nivel según lo que desees aprender; sin embargo, recomendamos avanzar por orden de nivel (Nivel 01 → Nivel 02 → Nivel 03) para comprender mejor las bases de cada clase.
      </div>

      <div class="sec-label">
        <span>03 • Síntesis General de los 3 Niveles Formativos</span>
        <span>Malla Interna Reservada</span>
      </div>
      <div class="levels-box">
        ${levelsHtml}
      </div>
    </div>

    <footer class="page-footer">
      <span>Universal System Chile • ${appConfig.author.phoneDisplay}</span>
      <span>El temario detallado se entrega de forma privada al alumno • Pág. 01 / 02</span>
    </footer>
  </section>

  <!-- PÁGINA 2: SOPORTE TÉCNICO, DIAGNÓSTICO $10.000 CLP Y CONTACTO -->
  <section class="page">
    <div>
      <header class="top-bar">
        <div class="brand-id">
          <span class="brand-monogram">${appConfig.brand.shortName}</span>
          <span class="brand-divider"></span>
          <span class="brand-name">${appConfig.brand.name} • Laboratorio & Soporte</span>
        </div>
        <div class="promo-chip">Garantía Escrita 90 Días</div>
      </header>

      <div class="p2-title-block">
        <span class="eyebrow">04 • Laboratorio de Precisión & Hardware</span>
        <h2>Tarifas de Soporte Técnico, Análisis y Presupuesto</h2>
        <p>
          Protocolo riguroso de revisión para notebooks y estaciones de escritorio bajo confidencialidad absoluta.
          Ninguna reparación se ejecuta sin diagnóstico previo documentado y aprobación transparente del presupuesto.
        </p>
      </div>

      <div class="diag-hero">
        <div class="diag-top">
          <div>
            <span class="badge badge-emerald">Evaluación Inicial Estandarizada</span>
            <h3>${primaryDiag.name}</h3>
          </div>
          <div class="diag-price-tag">
            <span class="fixed-lbl">Tarifa Fija</span>
            <span class="amount">${formatCLP(primaryDiag.priceCLP)} <small>CLP</small></span>
          </div>
        </div>
        <p class="diag-desc">${primaryDiag.detail}</p>
        <div class="chk-grid">
          ${checklistHtml}
        </div>
      </div>

      <div class="sec-label">
        <span>05 • Servicios Técnicos de Laboratorio (Valores Referenciales)</span>
        <span>Repuestos cotizados según equipo</span>
      </div>
      <div class="support-table">
        ${supportRowsHtml}
      </div>

      <div class="sec-label">
        <span>06 • Compromisos de Calidad & Confidencialidad</span>
        <span>Estándar Universal System</span>
      </div>
      <div class="guarantees-grid">
        <div class="guar-card">
          <h5>Privacidad Absoluta</h5>
          <p>Tus fotografías, documentos personales o archivos financieros jamás se revisan ni extraen sin autorización expresa.</p>
        </div>
        <div class="guar-card">
          <h5>Garantía Formal 90 Días</h5>
          <p>Toda intervención física en nuestro banco de trabajo cuenta con respaldo escrito ante cualquier eventualidad técnica.</p>
        </div>
        <div class="guar-card">
          <h5>Enfoque Sin Tecnicismos</h5>
          <p>Explicamos cada diagnóstico, nivel formativo o recomendación en lenguaje claro, honesto y verificable.</p>
        </div>
      </div>

      <div class="contact-card">
        <div class="contact-left">
          <span class="role">Atención & Dirección Técnica</span>
          <h4>${appConfig.author.name}</h4>
          <p>${appConfig.author.specialty} • ${appConfig.author.availability}</p>
        </div>
        <div class="contact-channels">
          <div class="wa">WhatsApp Directo: ${appConfig.author.phoneDisplay}</div>
          <div class="em">${appConfig.author.email}</div>
          <div class="loc">${appConfig.author.location}</div>
        </div>
      </div>
    </div>

    <footer class="page-footer">
      <span>© ${new Date().getFullYear()} ${appConfig.brand.name} • Todos los derechos reservados</span>
      <span>Valores promocionales sujetos a cupos de apertura • Pág. 02 / 02</span>
    </footer>
  </section>
</body>
</html>`;
}

async function main() {
  const projectRoot = process.cwd();
  const logoPath = path.join(projectRoot, "public", "assets", "universal-system-logo.png");
  const outputPdfPath = path.join(projectRoot, "public", "assets", "catalogo-precios-universal-system.pdf");

  if (!fs.existsSync(logoPath)) {
    throw new Error(`No se encontró el logo en: ${logoPath}`);
  }

  const logoBase64 = fs.readFileSync(logoPath).toString("base64");
  const logoDataUri = `data:image/png;base64,${logoBase64}`;

  const htmlContent = buildCatalogHtml(logoDataUri);
  const tmpHtmlPath = path.join(os.tmpdir(), `universal-system-catalog-${Date.now()}.html`);
  fs.writeFileSync(tmpHtmlPath, htmlContent, "utf8");

  const browserExe = findBrowserExecutable();
  const fileUrl = `file:///${tmpHtmlPath.replace(/\\/g, "/")}`;

  try {
    execFileSync(
      browserExe,
      [
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        "--print-to-pdf-no-header",
        `--print-to-pdf=${outputPdfPath}`,
        fileUrl,
      ],
      { stdio: "pipe", timeout: 45000 }
    );
    console.log(`Catálogo PDF generado exitosamente en: ${outputPdfPath}`);
  } finally {
    if (fs.existsSync(tmpHtmlPath)) {
      fs.unlinkSync(tmpHtmlPath);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
