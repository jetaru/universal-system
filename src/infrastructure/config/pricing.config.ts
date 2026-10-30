/**
 * CONFIGURACIÓN GLOBAL DE PRECIOS Y PROMOCIONES — UNIVERSAL SYSTEM
 * ============================================================================
 * Este archivo actúa como única fuente de verdad (Single Source of Truth) para
 * los valores iniciales de planes mensuales, descuentos de lanzamiento, bloques
 * horarios y tarifas de soporte técnico tanto en el sitio web como en el
 * generador del catálogo PDF.
 */

export interface PlanPricingValue {
  id: "basico" | "intermedio" | "avanzado" | "intensivo";
  /** Valor mensual final en CLP con el descuento promocional ya aplicado */
  discountedMonthlyCLP: number;
  /** Cantidad de niveles contemplados en el plan */
  levelsIncluded: number;
  /** Cantidad de bloques horarios incluidos (1 = Normal o Vespertino, 2 = Ambos) */
  schedulesIncluded: 1 | 2;
  /** Número estimado de sesiones guiadas al mes */
  monthlySessionsCount: number;
  /** Destacar visualmente en la grilla comercial */
  featured?: boolean;
}

export const GLOBAL_PRICING_CONFIG = {
  currency: "CLP",
  /** Porcentaje global de descuento inicial para clientes (20%) */
  launchDiscountPercent: 20,
  /** Activa o desactiva la visualización del descuento de apertura */
  isDiscountActive: true,
  /** Ruta pública del catálogo oficial descargable en PDF */
  catalogPdfPath: "/assets/catalogo-precios-universal-system.pdf",

  /** Modalidades horarias habilitadas inicialmente */
  schedules: {
    normal: {
      id: "normal",
      code: "HORARIO NORMAL",
      sessionsPerWeek: 1,
    },
    vespertino: {
      id: "vespertino",
      code: "HORARIO VESPERTINO",
      sessionsPerWeek: 1,
    },
  },

  /**
   * Planes mensuales de nivelación (valores iniciales en CLP con 20% OFF aplicado).
   * - Básico: Cualquier nivel individual se considera básico ($17.000 CLP/mes).
   * - Intermedio: Contempla 2 niveles ($30.000 CLP/mes).
   * - Avanzado: Contempla hasta 3 niveles ($42.000 CLP/mes).
   * - Especial Intensivo: Asistencia combinada a los 2 horarios (Normal + Vespertino) ($52.000 CLP/mes).
   */
  plans: {
    basico: {
      id: "basico",
      discountedMonthlyCLP: 17000,
      levelsIncluded: 1,
      schedulesIncluded: 1,
      monthlySessionsCount: 4,
      featured: false,
    },
    intermedio: {
      id: "intermedio",
      discountedMonthlyCLP: 30000,
      levelsIncluded: 2,
      schedulesIncluded: 1,
      monthlySessionsCount: 8,
      featured: true,
    },
    avanzado: {
      id: "avanzado",
      discountedMonthlyCLP: 42000,
      levelsIncluded: 3,
      schedulesIncluded: 1,
      monthlySessionsCount: 12,
      featured: false,
    },
    intensivo: {
      id: "intensivo",
      discountedMonthlyCLP: 52000,
      levelsIncluded: 3,
      schedulesIncluded: 2,
      monthlySessionsCount: 16,
      featured: false,
    },
  } satisfies Record<string, PlanPricingValue>,

  /**
   * Tarifas oficiales de Soporte Técnico y Laboratorio de Precisión (en CLP).
   */
  supportRates: {
    /** Análisis exhaustivo de 4 fases, diagnóstico y presupuesto cerrado */
    analysisAndQuoteCLP: 10000,
    /** Optimización de sistema operativo, limpieza lógica y puesta a punto */
    softwareOptimizationFromCLP: 20000,
    /** Mantenimiento térmico profundo y renovación de pasta de alto desempeño */
    thermalMaintenanceFromCLP: 25000,
    /** Mano de obra instalación de unidad SSD y migración limpia de entorno */
    ssdUpgradeLaborFromCLP: 25000,
    /** Respaldo blindado y recuperación lógica de archivos confidenciales */
    dataBackupRecoveryFromCLP: 30000,
  },

  /**
   * Referencia estratégica recomendada por el Estudio de Mercado en Chile
   * (para futura transición post-cohorte fundacional en células grupales / 1 a 1).
   */
  marketStudyRecommendedCLP: {
    basicoGroupMonthly: 29900,
    intermedioGroupMonthly: 54900,
    avanzadoGroupMonthly: 74900,
    intensivoDualScheduleMonthly: 89900,
    intensivoSingleLevelDualScheduleMonthly: 28000,
    mentoria1on1SingleSession: 29900,
  },
} as const;

/**
 * Calcula el precio de lista (sin descuento) a partir del precio promocional
 * y el porcentaje de descuento global, redondeando a múltiplos limpios de $50 CLP.
 */
export function calculateRegularPriceCLP(
  discountedCLP: number,
  discountPercent: number = GLOBAL_PRICING_CONFIG.launchDiscountPercent
): number {
  if (discountPercent <= 0 || discountPercent >= 100) {
    return discountedCLP;
  }
  const rawRegular = discountedCLP / (1 - discountPercent / 100);
  return Math.round(rawRegular / 50) * 50;
}

/**
 * Formatea un monto numérico en pesos chilenos de manera determinista
 * entre servidor (SSR/SSG) y navegador (ej: 17000 -> "$17.000").
 */
export function formatCLP(amount: number, includeCode = false): string {
  const sign = amount < 0 ? "-" : "";
  const digits = Math.abs(Math.round(amount))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return includeCode ? `${sign}$${digits} CLP` : `${sign}$${digits}`;
}
