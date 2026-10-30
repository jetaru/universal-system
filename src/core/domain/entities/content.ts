export interface ServicePillar {
  id: string;
  number: string;
  title: string;
  description: string;
  benefits: string[];
  ctaText: string;
  ctaAnchor: string;
}

export interface LabChecklistItem {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  metric: string;
  defaultChecked?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  meta: string;
}

export interface TrustMetric {
  value: string;
  label: string;
}

export interface CurriculumLevelOverview {
  id: string;
  levelNumber: string;
  badge: string;
  title: string;
  generalFocus: string;
  scopeHint: string;
}

export interface ScheduleModalityItem {
  id: "normal" | "vespertino";
  label: string;
  windowLabel: string;
  description: string;
}

export interface PricingPlanContent {
  id: "basico" | "intermedio" | "avanzado" | "intensivo";
  badge: string;
  name: string;
  scopeSummary: string;
  scheduleSummary: string;
  description: string;
  highlights: string[];
  ctaText: string;
}

export interface SupportRateContent {
  id: string;
  name: string;
  detail: string;
  priceCLP: number;
  isFromPrice?: boolean;
  isPrimaryDiagnostic?: boolean;
}
