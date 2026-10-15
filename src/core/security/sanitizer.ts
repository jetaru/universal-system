/**
 * OWASP Top 10 Security Sanitizer & Input Validator
 * A03:2021 - Injection & Cross-Site Scripting (XSS) Prevention
 */

export class SecuritySanitizer {
  /**
   * Sanitizes generic text input by stripping executable tags, scripting patterns,
   * event handlers and dangerous URI schemes.
   */
  static sanitizeText(input: string): string {
    if (!input || typeof input !== "string") return "";

    let sanitized = input;

    // 1. Remove dangerous script, iframe, object, embed, and style tags
    sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
    sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "");
    sanitized = sanitized.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "");
    sanitized = sanitized.replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, "");
    sanitized = sanitized.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");

    // 2. Strip any remaining HTML tags
    sanitized = sanitized.replace(/<[^>]+>/g, "");

    // 3. Remove dangerous event handlers (e.g. onerror=, onload=, onclick=)
    sanitized = sanitized.replace(/on\w+\s*=/gi, "");

    // 4. Remove pseudo-protocol URIs (javascript:, vbscript:, data:text/html)
    sanitized = sanitized.replace(/(javascript|vbscript|data\s*:\s*text\/html):/gi, "");

    // 5. Remove non-printable control characters and dangerous Unicode format characters (bidi overrides)
    sanitized = sanitized.replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200D\uFEFF\u202A-\u202E]/g, "");

    return sanitized.trim();
  }

  /**
   * Escapes HTML entities to ensure safe rendering in all contexts
   */
  static escapeHtml(str: string): string {
    if (!str) return "";
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "/": "&#x2F;",
    };
    return str.replace(/[&<>"'/]/g, (match) => map[match] || match);
  }

  /**
   * Validates a person's full name (2-80 chars, only letters, accents, spaces, hyphens and dots)
   */
  static validateName(name: string): { isValid: boolean; error?: string } {
    const cleaned = this.sanitizeText(name);
    if (!cleaned || cleaned.length < 2) {
      return { isValid: false, error: "El nombre debe contener al menos 2 caracteres." };
    }
    if (cleaned.length > 80) {
      return { isValid: false, error: "El nombre no puede exceder 80 caracteres." };
    }
    // Allow unicode letters (accents, ñ), spaces, hyphens, dots
    const nameRegex = /^[\p{L}\s.'\-]+$/u;
    if (!nameRegex.test(cleaned)) {
      return { isValid: false, error: "El nombre contiene caracteres especiales no permitidos." };
    }
    return { isValid: true };
  }

  /**
   * Validates a contact phone or WhatsApp number (allows +, digits, spaces, hyphens, parens)
   */
  static validatePhone(phone: string): { isValid: boolean; error?: string } {
    const cleaned = this.sanitizeText(phone);
    if (!cleaned || cleaned.length < 7) {
      return { isValid: false, error: "El número telefónico o WhatsApp debe tener al menos 7 dígitos." };
    }
    if (cleaned.length > 25) {
      return { isValid: false, error: "El número de contacto excede la longitud máxima permitida." };
    }
    // E.164 and international contact regex
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,20}$/;
    if (!phoneRegex.test(cleaned)) {
      return { isValid: false, error: "El formato telefónico no es válido (ej: +56 9 5333 2870)." };
    }
    return { isValid: true };
  }

  /**
   * Validates message details length and integrity
   */
  static validateMessageDetail(detail?: string): { isValid: boolean; error?: string } {
    if (!detail) return { isValid: true };
    const cleaned = this.sanitizeText(detail);
    if (cleaned.length > 1000) {
      return { isValid: false, error: "El detalle del mensaje no puede superar 1000 caracteres." };
    }
    return { isValid: true };
  }
}
