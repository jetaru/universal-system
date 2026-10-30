import {
  trustMetricsEs,
  servicePillarsEs,
  curriculumLevelsEs,
  scheduleModalitiesEs,
  pricingPlansEs,
  supportRatesEs,
  labChecklistEs,
  methodologyStepsEs,
  testimonialsEs,
} from "./site-content.es";
import {
  trustMetricsEn,
  servicePillarsEn,
  curriculumLevelsEn,
  scheduleModalitiesEn,
  pricingPlansEn,
  supportRatesEn,
  labChecklistEn,
  methodologyStepsEn,
  testimonialsEn,
} from "./site-content.en";
import {
  ServicePillar,
  LabChecklistItem,
  Testimonial,
  TrustMetric,
  CurriculumLevelOverview,
  ScheduleModalityItem,
  PricingPlanContent,
  SupportRateContent,
} from "@/core/domain/entities/content";

export {
  trustMetricsEs,
  servicePillarsEs,
  curriculumLevelsEs,
  scheduleModalitiesEs,
  pricingPlansEs,
  supportRatesEs,
  labChecklistEs,
  methodologyStepsEs,
  testimonialsEs,
  trustMetricsEn,
  servicePillarsEn,
  curriculumLevelsEn,
  scheduleModalitiesEn,
  pricingPlansEn,
  supportRatesEn,
  labChecklistEn,
  methodologyStepsEn,
  testimonialsEn,
};

export interface SiteContentBundle {
  trustMetrics: TrustMetric[];
  servicePillars: ServicePillar[];
  curriculumLevels: CurriculumLevelOverview[];
  scheduleModalities: ScheduleModalityItem[];
  pricingPlans: PricingPlanContent[];
  supportRates: SupportRateContent[];
  labChecklist: LabChecklistItem[];
  methodologySteps: typeof methodologyStepsEs;
  testimonials: Testimonial[];
}

export const siteContentBundles: Record<"es" | "en", SiteContentBundle> = {
  es: {
    trustMetrics: trustMetricsEs,
    servicePillars: servicePillarsEs,
    curriculumLevels: curriculumLevelsEs,
    scheduleModalities: scheduleModalitiesEs,
    pricingPlans: pricingPlansEs,
    supportRates: supportRatesEs,
    labChecklist: labChecklistEs,
    methodologySteps: methodologyStepsEs,
    testimonials: testimonialsEs,
  },
  en: {
    trustMetrics: trustMetricsEn,
    servicePillars: servicePillarsEn,
    curriculumLevels: curriculumLevelsEn,
    scheduleModalities: scheduleModalitiesEn,
    pricingPlans: pricingPlansEn,
    supportRates: supportRatesEn,
    labChecklist: labChecklistEn,
    methodologySteps: methodologyStepsEn,
    testimonials: testimonialsEn,
  },
};

// Default export for backward compatibility
export const trustMetrics = trustMetricsEs;
export const servicePillars = servicePillarsEs;
export const curriculumLevels = curriculumLevelsEs;
export const scheduleModalities = scheduleModalitiesEs;
export const pricingPlans = pricingPlansEs;
export const supportRates = supportRatesEs;
export const labChecklist = labChecklistEs;
export const methodologySteps = methodologyStepsEs;
export const testimonials = testimonialsEs;
