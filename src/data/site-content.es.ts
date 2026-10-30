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

export const trustMetricsEs: TrustMetric[] = [
  { value: "100%", label: "Paciencia y Claridad" },
  { value: "< 24h", label: "Diagnóstico Hardware" },
  { value: "1 a 1", label: "Metodología Personal" },
  { value: "+450", label: "Personas Asesoradas" },
];

export const servicePillarsEs: ServicePillar[] = [
  {
    id: "pilar-1",
    number: "01",
    title: "Clases de Nivelación & Productividad",
    description:
      "Sesiones guiadas en horario normal o vespertino que integran asesoría tecnológica humana y paciente para adultos mayores, familias y profesionales. Avanza sin tecnicismos desde el uso cotidiano hasta herramientas laborales modernas.",
    benefits: [
      "Asesoría paciente en smartphones, home banking seguro y trámites digitales.",
      "Ofimática moderna: hojas de cálculo, documentos ejecutivos y orden en la nube.",
      "Inteligencia Artificial aplicada con criterio al día a día y al trabajo.",
    ],
    ctaText: "Ver Niveles y Planes",
    ctaAnchor: "#planes",
  },
  {
    id: "pilar-2",
    number: "02",
    title: "Soporte & Laboratorio de Precisión",
    description:
      "Diagnóstico exhaustivo y reparación de computadoras portátiles y de escritorio. Privacidad garantizada y uso exclusivo de componentes certificados.",
    benefits: [
      "Aceleración extrema mediante discos de estado sólido (SSD).",
      "Limpieza térmica profunda y cambio de pasta térmica.",
      "Respaldo seguro y recuperación de datos confidenciales.",
    ],
    ctaText: "Ver Tarifas de Soporte",
    ctaAnchor: "#planes",
  },
  {
    id: "pilar-3",
    number: "03",
    title: "Consultoría Digital & Soluciones B2B",
    description:
      "Asesoramiento estratégico, arquitectura de software y modernización tecnológica para empresas e iniciativas que requieren escalabilidad, integraciones seguras y alto rendimiento.",
    benefits: [
      "Arquitectura de software limpia, APIs y modernización de sistemas.",
      "Integración de plataformas corporativas, nube y seguridad OWASP.",
      "Dirección técnica senior con acceso a proyectos y portafolio B2B.",
    ],
    ctaText: "Ir a Empresas B2B",
    ctaAnchor: "#empresas",
  },
];

export const curriculumLevelsEs: CurriculumLevelOverview[] = [
  {
    id: "nivel-1",
    levelNumber: "01",
    badge: "Base Inicial",
    title: "Cimientos & Fluidez Operativa",
    generalFocus:
      "Primer acercamiento sereno para adquirir control natural frente a tus dispositivos, ordenar tu entorno personal y comunicarte sin temor a equivocarte.",
    scopeHint: "Nivel seleccionable de forma libre o secuencial",
  },
  {
    id: "nivel-2",
    levelNumber: "02",
    badge: "Confianza Diaria",
    title: "Resguardo & Autonomía Cotidiana",
    generalFocus:
      "Desarrollo de criterio preventivo, hábitos de protección personal y desenvolvimiento autónomo en gestiones frecuentes y canales digitales actuales.",
    scopeHint: "Nivel seleccionable de forma libre o secuencial",
  },
  {
    id: "nivel-3",
    levelNumber: "03",
    badge: "Productividad & IA",
    title: "Estructuración, Datos & Herramientas Inteligentes",
    generalFocus:
      "Transición práctica hacia entornos conectados, manejo claro de planillas de trabajo e incorporación criteriosa de asistentes de inteligencia artificial.",
    scopeHint: "Nivel seleccionable de forma libre o secuencial",
  },
];

export const scheduleModalitiesEs: ScheduleModalityItem[] = [
  {
    id: "normal",
    label: "Horario Normal (Diurno)",
    windowLabel: "Jornada Regular • Mañana / Tarde",
    description:
      "Sesiones sincrónicas en bloques diurnos despejados, ideales para aprender con total calma, atención fresca y seguimiento paso a paso.",
  },
  {
    id: "vespertino",
    label: "Horario Vespertino",
    windowLabel: "Jornada Tarde-Noche • Post-Laboral",
    description:
      "Bloques diseñados para trabajadores, estudiantes y profesionales que requieren avanzar después de su jornada diaria sin interrumpir sus actividades.",
  },
];

export const pricingPlansEs: PricingPlanContent[] = [
  {
    id: "basico",
    badge: "1 Nivel Seleccionable",
    name: "Plan Básico",
    scopeSummary: "1 nivel libremente seleccionable (Nivel 01, 02 o 03)",
    scheduleSummary: "1 Horario a elección (Normal o Vespertino)",
    description:
      "Puedes elegir cualquier nivel disponible para aprender según tu interés puntual; cursar un nivel individual corresponde siempre al Plan Básico.",
    highlights: [
      "Elección libre de cualquiera de los niveles disponibles.",
      "Asistencia en bloque Normal o Vespertino según preferencia.",
      "Guía práctica reservada y acompañamiento paciente en vivo.",
    ],
    ctaText: "Inscribir Plan Básico",
  },
  {
    id: "intermedio",
    badge: "Más Equilibrado",
    name: "Plan Intermedio",
    scopeSummary: "2 niveles seleccionables a elección",
    scheduleSummary: "1 Horario a elección (Normal o Vespertino)",
    description:
      "Permite seleccionar cualesquiera dos niveles para conectar etapas de aprendizaje con ahorro directo y continuidad metodológica.",
    highlights: [
      "Cobertura de 2 niveles seleccionables de la ruta formativa.",
      "Asistencia en modalidad Normal o Vespertina.",
      "Prioridad de cupo y seguimiento continuo entre niveles.",
    ],
    ctaText: "Elegir Plan Intermedio",
  },
  {
    id: "avanzado",
    badge: "Ruta Completa",
    name: "Plan Avanzado",
    scopeSummary: "Contempla hasta los 3 niveles seleccionables",
    scheduleSummary: "1 Horario a elección (Normal o Vespertino)",
    description:
      "Abarca la ruta completa de los tres niveles disponibles para dominar desde las bases hasta productividad moderna e inteligencia artificial.",
    highlights: [
      "Acceso articulado a los 3 niveles bajo tarifa preferencial.",
      "Modalidad en bloque Normal o Vespertino.",
      "Evaluación inicial de ubicación y hoja de ruta personalizada.",
    ],
    ctaText: "Elegir Plan Avanzado",
  },
  {
    id: "intensivo",
    badge: "Doble Jornada",
    name: "Plan Especial Intensivo",
    scopeSummary: "Niveles seleccionables con refuerzo acelerado",
    scheduleSummary: "Asistencia a los 2 horarios: Normal + Vespertino",
    description:
      "Habilita cursar el o los niveles seleccionados asistiendo tanto al bloque Normal como al Vespertino para duplicar práctica y velocidad de aprendizaje.",
    highlights: [
      "Pase activo en ambos horarios (Normal y Vespertino).",
      "Libre selección de nivel con doble práctica semanal guiada.",
      "Ideal para metas laborales urgentes o nivelación acelerada.",
    ],
    ctaText: "Consultar Cupo Intensivo",
  },
];

export const supportRatesEs: SupportRateContent[] = [
  {
    id: "diagnostico-presupuesto",
    name: "Análisis, Diagnóstico Multi-Fase & Presupuesto Formal",
    detail:
      "Inspección completa de 4 etapas en laboratorio (temperatura, salud de disco, voltajes y sistema) con entrega de informe y presupuesto cerrado.",
    priceCLP: GLOBAL_PRICING_CONFIG.supportRates.analysisAndQuoteCLP,
    isFromPrice: false,
    isPrimaryDiagnostic: true,
  },
  {
    id: "optimizacion-sistema",
    name: "Optimización de Sistema & Depuración Lógica",
    detail:
      "Limpieza profunda de inicio, eliminación de software invasivo, ajustes de seguridad y fluidez operativa sin pérdida de archivos.",
    priceCLP: GLOBAL_PRICING_CONFIG.supportRates.softwareOptimizationFromCLP,
    isFromPrice: true,
  },
  {
    id: "mantenimiento-termico",
    name: "Mantenimiento Térmico de Precisión",
    detail:
      "Desarme controlado, limpieza interna de ductos y recambio de pasta térmica de alta conductividad para evitar sobrecalentamiento.",
    priceCLP: GLOBAL_PRICING_CONFIG.supportRates.thermalMaintenanceFromCLP,
    isFromPrice: true,
  },
  {
    id: "upgrade-ssd",
    name: "Aceleración por Unidad SSD & Migración",
    detail:
      "Instalación técnica de unidad de estado sólido y configuración limpia de sistema (mano de obra; unidad SSD cotizada según capacidad).",
    priceCLP: GLOBAL_PRICING_CONFIG.supportRates.ssdUpgradeLaborFromCLP,
    isFromPrice: true,
  },
  {
    id: "respaldo-recuperacion",
    name: "Respaldo Cifrado & Recuperación Lógica de Datos",
    detail:
      "Extracción y resguardo confidencial de fotografías, documentos familiares o información laboral bajo protocolo estricto de privacidad.",
    priceCLP: GLOBAL_PRICING_CONFIG.supportRates.dataBackupRecoveryFromCLP,
    isFromPrice: true,
  },
];

export const labChecklistEs: LabChecklistItem[] = [
  {
    id: "check-1",
    stepNumber: "01",
    title: "Test de Estrés Térmico",
    subtitle: "Revisión de pasta térmica y flujo",
    metric: "✓ Optimización de disipación",
    defaultChecked: true,
  },
  {
    id: "check-2",
    stepNumber: "02",
    title: "Integridad de Almacenamiento",
    subtitle: "Lectura S.M.A.R.T. & Sectores SSD/HDD",
    metric: "✓ Verificación 100% libre de fallas",
    defaultChecked: true,
  },
  {
    id: "check-3",
    stepNumber: "03",
    title: "Auditoría de Carga y Voltaje",
    subtitle: "Pruebas en rieles de alimentación",
    metric: "✓ Protección contra picos eléctricos",
    defaultChecked: true,
  },
  {
    id: "check-4",
    stepNumber: "04",
    title: "Depuración de Software & Malware",
    subtitle: "Eliminación de adware y bloatware",
    metric: "✓ Inicio ultrarrápido y limpio",
    defaultChecked: true,
  },
];

export const methodologyStepsEs = [
  {
    number: "01",
    title: "Diagnóstico Inicial",
    description:
      "Escuchamos detalladamente tu caso o realizamos un análisis del equipo sin compromiso inicial apresurado.",
  },
  {
    number: "02",
    title: "Plan a Medida",
    description:
      "Definimos los objetivos pedagógicos o la solución de soporte con presupuesto cerrado y tiempo estimado.",
  },
  {
    number: "03",
    title: "Ejecución Guiada",
    description:
      "Ya sea en sesión guiada con paciencia total o en banco de trabajo técnico con piezas de alta durabilidad.",
  },
  {
    number: "04",
    title: "Garantía Continua",
    description:
      "Seguimiento pos-atención para asegurarnos de que manejes tu herramienta o equipo con plena tranquilidad.",
  },
];

export const testimonialsEs: Testimonial[] = [
  {
    id: "test-1",
    quote:
      "\"Tenía pánico de operar en la computadora de mi banco y cometer una equivocación irreparable. Con paciencia infinita, en Universal System me enseñaron el paso a paso. Ahora lo hago sola en 5 minutos.\"",
    author: "Elena S. (68 años)",
    meta: "Asesoría Tecnológica Personalizada",
  },
  {
    id: "test-2",
    quote:
      "\"Estaba muy trabado con Excel para mi nuevo puesto laboral y no entendía nada de fórmulas. Las clases fueron precisas, prácticas y directas a lo que precisaba en mi trabajo.\"",
    author: "Mateo D. (27 años)",
    meta: "Clases de Nivelación de Productividad",
  },
  {
    id: "test-3",
    quote:
      "\"Mi notebook tardaba 10 minutos en encender y calentaba como un horno antes de entregar mi tesis. Le colocaron un disco SSD y le hicieron mantenimiento: vuela. El trato y la seriedad fueron impecables.\"",
    author: "Carla V. (34 años)",
    meta: "Soporte Técnico de Precisión",
  },
];
