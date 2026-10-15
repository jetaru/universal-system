import { ContactMessage, ContactSubmissionResult } from "../domain/entities/contact";
import { IContactRepository } from "../domain/repositories/IContactRepository";
import { SecuritySanitizer } from "../security/sanitizer";
import { SecurityRateLimiter } from "../security/rate-limiter";

export class SendContactUseCase {
  constructor(private readonly contactRepository: IContactRepository) {}

  async execute(message: ContactMessage): Promise<ContactSubmissionResult> {
    const timestamp = new Date().toISOString();

    // 1. OWASP A04: Anti-Bot Honeypot verification
    if (message._honeypot && message._honeypot.trim() !== "") {
      // Silently discard automated bot requests
      return {
        success: false,
        message: "Petición no autorizada por sistema de protección de formularios.",
        timestamp,
      };
    }

    // 2. OWASP A04: Client-side Rate Limiting / Anti-Flood Check
    const rateStatus = SecurityRateLimiter.checkRateLimit();
    if (!rateStatus.isAllowed) {
      return {
        success: false,
        message: rateStatus.reason || "Por favor espera antes de enviar otra solicitud.",
        timestamp,
      };
    }

    // 3. OWASP A03: Input Validation & Sanitization
    const nameCheck = SecuritySanitizer.validateName(message.name);
    if (!nameCheck.isValid) {
      return {
        success: false,
        message: nameCheck.error || "Nombre no válido.",
        timestamp,
      };
    }

    const phoneCheck = SecuritySanitizer.validatePhone(message.contact);
    if (!phoneCheck.isValid) {
      return {
        success: false,
        message: phoneCheck.error || "Teléfono no válido.",
        timestamp,
      };
    }

    const detailCheck = SecuritySanitizer.validateMessageDetail(message.detail);
    if (!detailCheck.isValid) {
      return {
        success: false,
        message: detailCheck.error || "Mensaje demasiado largo.",
        timestamp,
      };
    }

    // 4. Sanitize inputs to prevent XSS / Injection before persistence
    const sanitizedMessage: ContactMessage = {
      name: SecuritySanitizer.sanitizeText(message.name),
      contact: SecuritySanitizer.sanitizeText(message.contact),
      service: message.service,
      detail: message.detail ? SecuritySanitizer.sanitizeText(message.detail) : "",
      email: message.email ? SecuritySanitizer.sanitizeText(message.email) : undefined,
    };

    const result = await this.contactRepository.sendMessage(sanitizedMessage);

    // Record rate limit on success
    if (result.success) {
      SecurityRateLimiter.recordSubmission();
    }

    return result;
  }
}
