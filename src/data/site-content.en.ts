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
import { GLOBAL_PRICING_CONFIG } from "@/infrastructure/config/pricing.config";

export const trustMetricsEn: TrustMetric[] = [
  { value: "100%", label: "Patience and Clarity" },
  { value: "< 24h", label: "Hardware Diagnostic" },
  { value: "1 on 1", label: "Personal Methodology" },
  { value: "+450", label: "Advised Clients" },
];

export const servicePillarsEn: ServicePillar[] = [
  {
    id: "pilar-1",
    number: "01",
    title: "Skill Leveling & Productivity Classes",
    description:
      "Guided sessions in regular or evening tracks incorporating empathetic human tech advisory for seniors, families, and busy professionals. Progress without jargon from everyday confidence to modern workplace tools.",
    benefits: [
      "Patient advisory on smartphones, secure online banking, and digital procedures.",
      "Modern office workflows: spreadsheets, executive docs, and cloud organization.",
      "Applied Artificial Intelligence with sound judgment for daily life and work.",
    ],
    ctaText: "Explore Levels & Plans",
    ctaAnchor: "#planes",
  },
  {
    id: "pilar-2",
    number: "02",
    title: "Precision Lab & Hardware Support",
    description:
      "Exhaustive diagnostics and repair for laptops and desktop workstations. Guaranteed privacy and certified high-durability components.",
    benefits: [
      "High-speed acceleration via solid state drives (SSD).",
      "Deep thermal overhaul and premium thermal paste replacement.",
      "Secure backup and confidential data recovery.",
    ],
    ctaText: "View Support Rates",
    ctaAnchor: "#planes",
  },
  {
    id: "pilar-3",
    number: "03",
    title: "Digital Consulting & B2B Solutions",
    description:
      "Strategic technology advisory, software architecture, and infrastructure modernization for businesses requiring scalability, secure integrations, and high availability.",
    benefits: [
      "Clean software architecture, robust APIs, and legacy modernization.",
      "Enterprise platform integration, cloud workflows, and OWASP security.",
      "Senior technical leadership with direct access to our B2B portfolio.",
    ],
    ctaText: "Go to Enterprise B2B",
    ctaAnchor: "#empresas",
  },
];

export const curriculumLevelsEn: CurriculumLevelOverview[] = [
  {
    id: "nivel-1",
    levelNumber: "01",
    badge: "Core Foundation",
    title: "Foundations & Operational Fluency",
    generalFocus:
      "A calm initial stage designed to build natural confidence with your everyday devices, organize your personal space, and communicate without fear of mistakes.",
    scopeHint: "Freely selectable or sequential level",
  },
  {
    id: "nivel-2",
    levelNumber: "02",
    badge: "Daily Confidence",
    title: "Digital Safeguards & Everyday Autonomy",
    generalFocus:
      "Preventive judgment, personal protection habits, and independent handling of frequent online procedures and modern communication channels.",
    scopeHint: "Freely selectable or sequential level",
  },
  {
    id: "nivel-3",
    levelNumber: "03",
    badge: "Productivity & AI",
    title: "Structuring, Data & Intelligent Tools",
    generalFocus:
      "Practical transition toward connected workspaces, clear interpretation of spreadsheets, and thoughtful adoption of artificial intelligence assistants.",
    scopeHint: "Freely selectable or sequential level",
  },
];

export const scheduleModalitiesEn: ScheduleModalityItem[] = [
  {
    id: "normal",
    label: "Regular Schedule (Daytime)",
    windowLabel: "Daytime Track • Morning / Afternoon",
    description:
      "Live guided sessions held during clear daytime blocks, ideal for learning calmly with unhurried step-by-step guidance.",
  },
  {
    id: "vespertino",
    label: "Evening Schedule",
    windowLabel: "After-Office Track • Late Afternoon / Evening",
    description:
      "Blocks tailored for working professionals and students who want steady progress after regular daytime commitments.",
  },
];

export const pricingPlansEn: PricingPlanContent[] = [
  {
    id: "basico",
    badge: "1 Selectable Level",
    name: "Basic Plan",
    scopeSummary: "1 freely selectable level (Level 01, 02, or 03)",
    scheduleSummary: "1 Schedule of choice (Regular or Evening)",
    description:
      "You can select any available level based on what you want to learn; taking a single individual level always qualifies as our Basic Plan.",
    highlights: [
      "Free selection of any single available pathway level.",
      "Attendance in Regular or Evening schedule track.",
      "Private step-by-step guidance and patient live support.",
    ],
    ctaText: "Select Basic Plan",
  },
  {
    id: "intermedio",
    badge: "Most Balanced",
    name: "Intermediate Plan",
    scopeSummary: "2 selectable levels of your choice",
    scheduleSummary: "1 Schedule of choice (Regular or Evening)",
    description:
      "Allows you to choose any two levels to connect learning stages with direct savings and methodological continuity.",
    highlights: [
      "Structured coverage of 2 selectable pathway levels.",
      "Attendance in Regular or Evening track.",
      "Priority seat reservation and continuous milestone tracking.",
    ],
    ctaText: "Select Intermediate Plan",
  },
  {
    id: "avanzado",
    badge: "Full Pathway",
    name: "Advanced Plan",
    scopeSummary: "Covers up to all 3 selectable levels",
    scheduleSummary: "1 Schedule of choice (Regular or Evening)",
    description:
      "Covers the complete three-level pathway to master everything from core foundations to modern productivity and applied AI.",
    highlights: [
      "Full access to all 3 levels at a preferential rate.",
      "Regular or Evening schedule modality.",
      "Initial placement review and tailored progression roadmap.",
    ],
    ctaText: "Select Advanced Plan",
  },
  {
    id: "intensivo",
    badge: "Dual Schedule",
    name: "Special Intensive Plan",
    scopeSummary: "Selectable levels with accelerated reinforcement",
    scheduleSummary: "Attendance across BOTH schedules: Regular + Evening",
    description:
      "Enables taking your selected level(s) across both Regular and Evening blocks to double guided practice and learning speed.",
    highlights: [
      "Active dual pass for both Regular and Evening tracks.",
      "Free level selection with double weekly guided practice.",
      "Ideal for urgent workplace goals or rapid skill leveling.",
    ],
    ctaText: "Inquire Intensive Pass",
  },
];

export const supportRatesEn: SupportRateContent[] = [
  {
    id: "diagnostico-presupuesto",
    name: "Multi-Phase Analysis, Lab Diagnostic & Formal Quote",
    detail:
      "Complete 4-stage bench inspection (thermals, storage health, power rails, and OS integrity) with a closed written quote.",
    priceCLP: GLOBAL_PRICING_CONFIG.supportRates.analysisAndQuoteCLP,
    isFromPrice: false,
    isPrimaryDiagnostic: true,
  },
  {
    id: "optimizacion-sistema",
    name: "System Optimization & Logical Cleanup",
    detail:
      "Deep startup tuning, bloatware/adware removal, security hardening, and smooth responsiveness without data loss.",
    priceCLP: GLOBAL_PRICING_CONFIG.supportRates.softwareOptimizationFromCLP,
    isFromPrice: true,
  },
  {
    id: "mantenimiento-termico",
    name: "Precision Thermal Maintenance",
    detail:
      "Controlled disassembly, internal airflow cleaning, and high-conductivity thermal paste renewal to prevent overheating.",
    priceCLP: GLOBAL_PRICING_CONFIG.supportRates.thermalMaintenanceFromCLP,
    isFromPrice: true,
  },
  {
    id: "upgrade-ssd",
    name: "SSD Acceleration & Clean Migration",
    detail:
      "Solid-state drive installation and clean system migration (labor rate; SSD hardware quoted separately by capacity).",
    priceCLP: GLOBAL_PRICING_CONFIG.supportRates.ssdUpgradeLaborFromCLP,
    isFromPrice: true,
  },
  {
    id: "respaldo-recuperacion",
    name: "Encrypted Backup & Logical Data Recovery",
    detail:
      "Confidential extraction and safeguarding of family photos, personal records, or business files under strict privacy protocols.",
    priceCLP: GLOBAL_PRICING_CONFIG.supportRates.dataBackupRecoveryFromCLP,
    isFromPrice: true,
  },
];

export const labChecklistEn: LabChecklistItem[] = [
  {
    id: "check-1",
    stepNumber: "01",
    title: "Thermal Stress Test",
    subtitle: "Thermal paste and airflow audit",
    metric: "✓ Dissipation optimization",
    defaultChecked: true,
  },
  {
    id: "check-2",
    stepNumber: "02",
    title: "Storage Health & Integrity",
    subtitle: "S.M.A.R.T. telemetry & SSD/HDD sectors",
    metric: "✓ 100% error-free verification",
    defaultChecked: true,
  },
  {
    id: "check-3",
    stepNumber: "03",
    title: "Load & Voltage Audit",
    subtitle: "Power rails and battery stress testing",
    metric: "✓ Electrical spike protection",
    defaultChecked: true,
  },
  {
    id: "check-4",
    stepNumber: "04",
    title: "Software & Malware Remediation",
    subtitle: "Deep adware and bloatware cleanup",
    metric: "✓ Ultra-fast and clean startup",
    defaultChecked: true,
  },
];

export const methodologyStepsEn = [
  {
    number: "01",
    title: "Initial Diagnostic",
    description:
      "We listen carefully to your situation or perform a thorough hardware check with zero initial rush or pressure.",
  },
  {
    number: "02",
    title: "Tailored Roadmap",
    description:
      "We define educational goals or the hardware repair plan with a transparent fixed budget and delivery timeline.",
  },
  {
    number: "03",
    title: "Guided Execution",
    description:
      "Whether through patient guided tutoring or certified benchwork with enterprise-grade components.",
  },
  {
    number: "04",
    title: "Continuous Warranty",
    description:
      "Post-service follow-up to ensure you master your device or software with complete confidence.",
  },
];

export const testimonialsEn: Testimonial[] = [
  {
    id: "test-1",
    quote:
      "\"I was terrified of using my bank's online platform and making an irreversible mistake. With infinite patience, Universal System taught me step by step. Now I do it on my own in 5 minutes.\"",
    author: "Elena S. (68 years old)",
    meta: "Personalized Tech Advisory",
  },
  {
    id: "test-2",
    quote:
      "\"I was struggling with Excel for my new job and couldn't figure out complex formulas. The sessions were precise, practical, and directly applied to what I needed.\"",
    author: "Mateo D. (27 years old)",
    meta: "Productivity Leveling Mentorship",
  },
  {
    id: "test-3",
    quote:
      "\"My laptop took 10 minutes to boot and overheated before submitting my thesis. They upgraded it with an SSD and deep cleaning: it flies. Service and professionalism were outstanding.\"",
    author: "Carla V. (34 years old)",
    meta: "Precision Technical Support",
  },
];
