import { ContactMessage, ContactSubmissionResult } from "../domain/entities/contact";
import { IContactRepository } from "../domain/repositories/IContactRepository";
import { SecuritySanitizer } from "../security/sanitizer";
import { SecurityRateLimiter } from "../security/rate-limiter";

const ALLOWED_SERVICES: ReadonlyArray<ContactMessage["service"]> = [
  "clases",
  "soporte",
  "consultoria",
  "asesoria",
];

export class SendContactUseCase {
  /** Evita envíos concurrentes (doble clic / ráfagas) antes de que se registre el rate limit. */
  private inFlight = false;

  constructor(private readonly contactRepository: IContactRepository) {}

  async execute(message: ContactMessage): Promise<ContactSubmissionResult> {
    const timestamp = new Date().toISOString();
    const fail = (reason: string): ContactSubmissionResult => ({
      success: false,
      message: reason,
      timestamp,
    });

    // 1. OWASP A04: Anti-Bot Honeypot verification
    if (message._honeypot && message._honeypot.trim() !== "") {
      // Descarta peticiones automatizadas sin invocar la infraestructura
      return fail("Petición no autorizada por sistema de protección de formularios.");
    }

    // 2. OWASP A04: Client-side Rate Limiting / Anti-Flood Check
    const rateStatus = SecurityRateLimiter.checkRateLimit();
    if (!rateStatus.isAllowed) {
      return fail(rateStatus.reason || "Por favor espera antes de enviar otra solicitud.");
    }

    if (this.inFlight) {
      return fail("Ya hay una solicitud en proceso. Por favor espera unos segundos.");
    }

    // 3. OWASP A03: Input Validation & Sanitization
    const nameCheck = SecuritySanitizer.validateName(message.name);
    if (!nameCheck.isValid) {
      return fail(nameCheck.error || "Nombre no válido.");
    }

    const phoneCheck = SecuritySanitizer.validatePhone(message.contact);
    if (!phoneCheck.isValid) {
      return fail(phoneCheck.error || "Teléfono no válido.");
    }

    if (!ALLOWED_SERVICES.includes(message.service)) {
      return fail("El tipo de servicio seleccionado no es válido.");
    }

    const hasEmail = typeof message.email === "string" && message.email.trim() !== "";
    if (hasEmail) {
      const emailCheck = SecuritySanitizer.validateEmail(message.email as string);
      if (!emailCheck.isValid) {
        return fail(emailCheck.error || "Correo electrónico no válido.");
      }
    }

    const detailCheck = SecuritySanitizer.validateMessageDetail(message.detail);
    if (!detailCheck.isValid) {
      return fail(detailCheck.error || "Mensaje demasiado largo.");
    }

    // 4. Sanitize inputs to prevent XSS / Injection before persistence
    const sanitizedMessage: ContactMessage = {
      name: SecuritySanitizer.sanitizeText(message.name),
      contact: SecuritySanitizer.sanitizeText(message.contact),
      service: message.service,
      detail: message.detail ? SecuritySanitizer.sanitizeText(message.detail, { multiline: true }) : "",
      email: hasEmail ? (message.email as string).trim() : undefined,
    };

    this.inFlight = true;
    try {
      const result = await this.contactRepository.sendMessage(sanitizedMessage);

      // Record rate limit on success
      if (result.success) {
        SecurityRateLimiter.recordSubmission();
      }

      return result;
    } finally {
      this.inFlight = false;
    }
  }
}
