/**
 * OWASP Top 10 Security - Rate Limiting & Anti-Automation Guard
 * A04:2021 - Insecure Design & Automated Attack Protection
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

  // In-memory fallback for environments without sessionStorage
  private static inMemoryTimestamps: number[] = [];

  /**
   * Evaluates if a new submission is permitted under OWASP anti-flood rules.
   */
  static checkRateLimit(): RateLimitStatus {
    const now = Date.now();
    let timestamps = this.getTimestamps();

    // Remove timestamps older than the window
    const windowStart = now - this.WINDOW_SECONDS * 1000;
    timestamps = timestamps.filter((t) => t > windowStart);

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
    let timestamps = this.getTimestamps();
    const windowStart = now - this.WINDOW_SECONDS * 1000;
    timestamps = timestamps.filter((t) => t > windowStart);
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

  private static getTimestamps(): number[] {
    if (typeof window !== "undefined" && window.sessionStorage) {
      try {
        const item = window.sessionStorage.getItem(this.STORAGE_KEY);
        if (item) {
          const parsed = JSON.parse(item);
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
