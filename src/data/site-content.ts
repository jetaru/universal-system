import { trustMetricsEs, servicePillarsEs, labChecklistEs, methodologyStepsEs, testimonialsEs } from "./site-content.es";
import { trustMetricsEn, servicePillarsEn, labChecklistEn, methodologyStepsEn, testimonialsEn } from "./site-content.en";
import { ServicePillar, LabChecklistItem, Testimonial, TrustMetric } from "@/core/domain/entities/content";

export {
  trustMetricsEs,
  servicePillarsEs,
  labChecklistEs,
  methodologyStepsEs,
  testimonialsEs,
  trustMetricsEn,
  servicePillarsEn,
  labChecklistEn,
  methodologyStepsEn,
  testimonialsEn,
};

export interface SiteContentBundle {
  trustMetrics: TrustMetric[];
  servicePillars: ServicePillar[];
  labChecklist: LabChecklistItem[];
  methodologySteps: typeof methodologyStepsEs;
  testimonials: Testimonial[];
}

export const siteContentBundles: Record<"es" | "en", SiteContentBundle> = {
  es: {
    trustMetrics: trustMetricsEs,
    servicePillars: servicePillarsEs,
    labChecklist: labChecklistEs,
    methodologySteps: methodologyStepsEs,
    testimonials: testimonialsEs,
  },
  en: {
    trustMetrics: trustMetricsEn,
    servicePillars: servicePillarsEn,
    labChecklist: labChecklistEn,
    methodologySteps: methodologyStepsEn,
    testimonials: testimonialsEn,
  },
};

// Default export for backward compatibility
export const trustMetrics = trustMetricsEs;
export const servicePillars = servicePillarsEs;
export const labChecklist = labChecklistEs;
export const methodologySteps = methodologyStepsEs;
export const testimonials = testimonialsEs;
