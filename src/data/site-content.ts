import { ServicePillar, LabChecklistItem, Testimonial, TrustMetric } from "@/core/domain/entities/content";

export const trustMetrics: TrustMetric[] = [
  { value: "100%", label: "Paciencia y Claridad" },
  { value: "< 24h", label: "Diagnóstico Hardware" },
  { value: "1 a 1", label: "Metodología Personal" },
  { value: "+450", label: "Personas Asesoradas" },
];

export const servicePillars: ServicePillar[] = [
  {
    id: "pilar-1",
    number: "01",
    title: "Asesoría Tecnológica Humana",
    description:
      "Especialmente creada para adultos mayores, familias y profesionales con poco tiempo. Despejamos dudas con absoluta empatía y sin tecnicismos complejos.",
    benefits: [
      "Home banking seguro y autenticación en dos pasos.",
      "Configuración integral de smartphones (Android & iOS).",
      "Trámites digitales oficiales sin estrés ni bloqueos.",
    ],
    ctaText: "Solicitar Asesoría",
    ctaAnchor: "#selector",
  },
  {
    id: "pilar-2",
    number: "02",
    title: "Clases de Nivelación & Productividad",
    description:
      "Mentorías 1 a 1 adaptadas a tu propio ritmo. Desarrolla independencia digital para el trabajo, los estudios o tus proyectos personales.",
    benefits: [
      "Ofimática moderna: Excel, Google Sheets, documentos.",
      "Inteligencia Artificial aplicada al día a día y trabajo.",
      "Gestión de archivos en la nube y organización digital.",
    ],
    ctaText: "Ver Planes de Clase",
    ctaAnchor: "#selector",
  },
  {
    id: "pilar-3",
    number: "03",
    title: "Soporte & Laboratorio de Precisión",
    description:
      "Diagnóstico exhaustivo y reparación de computadoras portátiles y de escritorio. Privacidad garantizada y uso exclusivo de componentes certificados.",
    benefits: [
      "Aceleración extrema mediante discos de estado sólido (SSD).",
      "Limpieza térmica profunda y cambio de pasta térmica.",
      "Respaldo seguro y recuperación de datos confidenciales.",
    ],
    ctaText: "Consultar Reparación",
    ctaAnchor: "#selector",
  },
];

export const labChecklist: LabChecklistItem[] = [
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

export const methodologySteps = [
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
      "Ya sea en sesión 1 a 1 con paciencia total o en banco de trabajo técnico con piezas de alta durabilidad.",
  },
  {
    number: "04",
    title: "Garantía Continua",
    description:
      "Seguimiento pos-atención para asegurarnos de que manejes tu herramienta o equipo con plena tranquilidad.",
  },
];

export const testimonials: Testimonial[] = [
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
      "\"Estaba muy trabado con Excel para mi nuevo puesto laboral y no entendía nada de fórmulas. Las clases 1 a 1 fueron precisas, prácticas y directas a lo que precisaba en mi trabajo.\"",
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
