/**
 * OWASP Top 10 Security - Rate Limiting & Anti-Automation Guard
 * A04:2021 - Insecure Design & Automated Attack Protection
 *
 * NOTA DE ALCANCE: al ser un sitio estático (GitHub Pages) este limitador es una barrera de
 * UX/anti-flood del lado del cliente; un atacante puede evadirlo borrando el almacenamiento de
 * sesión. La protección efectiva contra abuso del envío de correo debe complementarse en el
 * panel de EmailJS (lista de dominios permitidos, cuota mensual y reCAPTCHA).
 */

export interface RateLimitStatus {
  isAllowed: boolean;
  retryAfterSeconds?: number;
  reason?: string;
}

export class SecurityRateLimiter {
  private static readonly STORAGE_KEY = "us_owasp_throttle_v1";
  private static readonly MIN_INTERVAL_SECONDS = 5;
  private static readonly MAX_REQUESTS_PER_WINDOW = 5;
  private static readonly WINDOW_SECONDS = 600; // 10 minutes
  /** Tolerancia ante desfases de reloj al validar marcas de tiempo almacenadas. */
  private static readonly CLOCK_SKEW_MS = 2000;

  // In-memory fallback for environments without sessionStorage
  private static inMemoryTimestamps: number[] = [];

  /**
   * Evaluates if a new submission is permitted under OWASP anti-flood rules.
   */
  static checkRateLimit(): RateLimitStatus {
    const now = Date.now();
    const timestamps = this.getValidTimestamps(now);

    // 1. Check interval from last submission
    if (timestamps.length > 0) {
      const last = timestamps[timestamps.length - 1];
      const elapsedSeconds = (now - last) / 1000;
      if (elapsedSeconds < this.MIN_INTERVAL_SECONDS) {
        const wait = Math.ceil(this.MIN_INTERVAL_SECONDS - elapsedSeconds);
        return {
          isAllowed: false,
          retryAfterSeconds: wait,
          reason: `Por favor espera ${wait} segundos antes de enviar otra solicitud (OWASP anti-flood).`,
        };
      }
    }

    // 2. Check total submissions in window
    if (timestamps.length >= this.MAX_REQUESTS_PER_WINDOW) {
      const oldestInWindow = timestamps[0];
      const resetSeconds = Math.ceil((oldestInWindow + this.WINDOW_SECONDS * 1000 - now) / 1000);
      return {
        isAllowed: false,
        retryAfterSeconds: resetSeconds > 0 ? resetSeconds : 60,
        reason: "Has alcanzado el límite de solicitudes temporales. Intenta más tarde o contáctanos por WhatsApp.",
      };
    }

    return { isAllowed: true };
  }

  /**
   * Records a successful or initiated submission timestamp
   */
  static recordSubmission(): void {
    const now = Date.now();
    const timestamps = this.getValidTimestamps(now);
    timestamps.push(now);

    this.saveTimestamps(timestamps);
  }

  /**
   * Restablece el historial de peticiones (útil para pruebas unitarias o reinicio de sesión).
   */
  static reset(): void {
    this.inMemoryTimestamps = [];
    if (typeof window !== "undefined" && window.sessionStorage) {
      try {
        window.sessionStorage.removeItem(this.STORAGE_KEY);
      } catch {
        // Ignorar
      }
    }
  }

  /**
   * Lee las marcas de tiempo y descarta cualquier valor manipulado o caducado:
   * no numéricos, no finitos, fuera de la ventana o en el futuro (un valor futuro
   * bloquearía al usuario indefinidamente). Devuelve como máximo `MAX_REQUESTS_PER_WINDOW`
   * entradas ordenadas ascendentemente para acotar el tamaño del almacenamiento.
   */
  private static getValidTimestamps(now: number): number[] {
    const windowStart = now - this.WINDOW_SECONDS * 1000;
    return this.readRaw()
      .filter(
        (t): t is number =>
          typeof t === "number" && Number.isFinite(t) && t > windowStart && t <= now + this.CLOCK_SKEW_MS
      )
      .sort((a, b) => a - b)
      .slice(-this.MAX_REQUESTS_PER_WINDOW);
  }

  private static readRaw(): unknown[] {
    if (typeof window !== "undefined" && window.sessionStorage) {
      try {
        const item = window.sessionStorage.getItem(this.STORAGE_KEY);
        if (item) {
          const parsed: unknown = JSON.parse(item);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch {
        // Fallback to memory
      }
    }
    return this.inMemoryTimestamps;
  }

  private static saveTimestamps(timestamps: number[]): void {
    this.inMemoryTimestamps = timestamps;
    if (typeof window !== "undefined" && window.sessionStorage) {
      try {
        window.sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(timestamps));
      } catch {
        // Ignore storage write issues
      }
    }
  }
}
