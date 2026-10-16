import { ServicePillar, LabChecklistItem, Testimonial, TrustMetric } from "@/core/domain/entities/content";

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
    title: "Human Technology Advisory",
    description:
      "Specially designed for seniors, families, and busy professionals. We clear doubts with absolute empathy and without complex technical jargon.",
    benefits: [
      "Secure online banking and two-factor authentication setup.",
      "Comprehensive smartphone setup (Android & iOS).",
      "Official digital procedures without stress or roadblocks.",
    ],
    ctaText: "Request Advisory",
    ctaAnchor: "#selector",
  },
  {
    id: "pilar-2",
    number: "02",
    title: "Skill Leveling & Productivity Classes",
    description:
      "1-on-1 mentorships adapted to your personal pace. Build digital independence for work, academics, or personal projects.",
    benefits: [
      "Modern office tools: Excel, Google Sheets, professional docs.",
      "Applied Artificial Intelligence for daily tasks and workflows.",
      "Cloud file management and organized digital workspace.",
    ],
    ctaText: "Explore Class Plans",
    ctaAnchor: "#selector",
  },
  {
    id: "pilar-3",
    number: "03",
    title: "Precision Lab & Hardware Support",
    description:
      "Exhaustive diagnostics and repair for laptops and desktop workstations. Guaranteed privacy and certified high-durability components.",
    benefits: [
      "High-speed acceleration via solid state drives (SSD).",
      "Deep thermal overhaul and premium thermal paste replacement.",
      "Secure backup and confidential data recovery.",
    ],
    ctaText: "Consult Repair",
    ctaAnchor: "#selector",
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
      "Whether through patient 1-on-1 tutoring or certified benchwork with enterprise-grade components.",
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
      "\"I was struggling with Excel for my new job and couldn't figure out complex formulas. The 1-on-1 sessions were precise, practical, and directly applied to what I needed.\"",
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
