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
