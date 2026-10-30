/**
 * OWASP Top 10 Security Sanitizer & Input Validator
 * A03:2021 - Injection & Cross-Site Scripting (XSS) Prevention
 */

export interface SanitizeOptions {
  /**
   * Conserva saltos de línea (útil para textareas). Por defecto se aplanan a espacios
   * para impedir inyección de cabeceras/líneas en correos y URLs prellenadas.
   */
  multiline?: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/** Cota de pasadas del sanitizador (defensa contra payloads anidados y contra ReDoS por bucles). */
const MAX_SANITIZE_PASSES = 10;

/** Longitud máxima analizada por el sanitizador (superior a cualquier límite de campo válido). */
const MAX_INPUT_LENGTH = 5000;

/** Caracteres de control (excepto \n y \t), DEL, C1, zero-width y overrides bidireccionales. */
// eslint-disable-next-line no-control-regex
const DANGEROUS_CONTROL_CHARS = /[\u0000-\u0008\u000B-\u001F\u007F-\u009F\u200B-\u200F\u2028\u2029\u202A-\u202E\u2060\u2066-\u2069\uFEFF]/g;

const EMAIL_REGEX =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;

export class SecuritySanitizer {
  /**
   * Una pasada de limpieza. Se invoca en bucle hasta alcanzar un punto fijo, de modo que
   * payloads anidados (`javajavascript:script:`, `ononclick=click=`, `<scr<b>ipt>`) no
   * reconstruyan contenido peligroso tras una sola sustitución.
   */
  private static stripOnce(input: string, multiline: boolean): string {
    let s = input;

    // 0. Control chars primero: evita que `java\u0000script:` evada las reglas posteriores.
    s = s.replace(DANGEROUS_CONTROL_CHARS, "");

    // 1. Bloques ejecutables completos (con su contenido)
    s = s.replace(/<(script|iframe|object|embed|style)\b[\s\S]*?<\/\1\s*>/gi, "");

    // 2. Cualquier otra etiqueta HTML remanente
    s = s.replace(/<[^>]*>/g, "");

    // 3. Manejadores de eventos en línea (onerror=, onclick=, ...). `\b` evita dañar palabras
    //    legítimas como "contacto=" o "versión=".
    s = s.replace(/\bon[a-z]+\s*=/gi, "");

    // 4. Pseudo-protocolos peligrosos (javascript:, vbscript:, data:text/html)
    s = s.replace(/\b(?:(?:javascript|vbscript)\s*:|data\s*:\s*text\/html)/gi, "");

    // 5. Saltos de línea / tabulaciones
    if (multiline) {
      s = s.replace(/\r\n?/g, "\n").replace(/\t/g, " ").replace(/[ ]{2,}/g, " ").replace(/\n{3,}/g, "\n\n");
    } else {
      s = s.replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ");
    }

    return s;
  }

  /**
   * Sanitiza texto libre eliminando etiquetas ejecutables, manejadores de eventos,
   * esquemas URI peligrosos y caracteres de control/Unicode de formato (bidi, zero-width).
   * Normaliza a NFKC para neutralizar homoglifos de ancho completo (ej. `＜script＞`).
   */
  static sanitizeText(input: string, options: SanitizeOptions = {}): string {
    if (!input || typeof input !== "string") return "";

    const multiline = options.multiline === true;
    // Cota previa: acota el costo del análisis ante entradas gigantes (DoS por regex cuadrático).
    // Los validadores rechazan igualmente cualquier campo que supere sus límites (<= 1000).
    let current = input.slice(0, MAX_INPUT_LENGTH).normalize("NFKC");

    let converged = false;
    for (let pass = 0; pass < MAX_SANITIZE_PASSES; pass++) {
      const next = this.stripOnce(current, multiline);
      if (next === current) {
        converged = true;
        break;
      }
      current = next;
    }

    // Si un payload adversarial agotó las pasadas, descarta por completo los delimitadores HTML.
    if (!converged) {
      current = current.replace(/[<>]/g, "");
    }

    return current.trim();
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
  static validateName(name: string): ValidationResult {
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
  static validatePhone(phone: string): ValidationResult {
    const cleaned = this.sanitizeText(phone);
    if (!cleaned || cleaned.length < 7) {
      return { isValid: false, error: "El número telefónico o WhatsApp debe tener al menos 7 dígitos." };
    }
    if (cleaned.length > 25) {
      return { isValid: false, error: "El número de contacto excede la longitud máxima permitida." };
    }
    // Validar que contenga solo caracteres telefónicos permitidos y al menos 7 dígitos
    const phoneRegex = /^[+]?[0-9\s().-]{7,25}$/;
    const digitCount = (cleaned.match(/\d/g) || []).length;
    if (!phoneRegex.test(cleaned) || digitCount < 7) {
      return { isValid: false, error: "El formato telefónico no es válido (ej: +56 9 5333 2870)." };
    }
    return { isValid: true };
  }

  /**
   * Validates an optional e-mail address (RFC 5321 length limits + pragmatic RFC 5322 subset).
   * Rechaza cadenas que el sanitizador alteraría (indicio de payload) y dominios mal formados.
   */
  static validateEmail(email: string): ValidationResult {
    const trimmed = typeof email === "string" ? email.trim() : "";
    if (!trimmed) {
      return { isValid: false, error: "Por favor proporciona un correo electrónico válido." };
    }
    if (trimmed.length > 254) {
      return { isValid: false, error: "El correo electrónico excede la longitud máxima permitida." };
    }
    const [local = ""] = trimmed.split("@");
    const invalid =
      this.sanitizeText(trimmed) !== trimmed ||
      !EMAIL_REGEX.test(trimmed) ||
      local.length > 64 ||
      local.startsWith(".") ||
      local.endsWith(".") ||
      trimmed.includes("..");
    if (invalid) {
      return { isValid: false, error: "Por favor proporciona un correo electrónico válido." };
    }
    return { isValid: true };
  }

  /**
   * Validates message details length and integrity
   */
  static validateMessageDetail(detail?: string): ValidationResult {
    if (!detail) return { isValid: true };
    const cleaned = this.sanitizeText(detail, { multiline: true });
    if (cleaned.length > 1000) {
      return { isValid: false, error: "El detalle del mensaje no puede superar 1000 caracteres." };
    }
    return { isValid: true };
  }
}
