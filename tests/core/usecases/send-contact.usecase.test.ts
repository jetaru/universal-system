import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { SendContactUseCase } from "@/core/usecases/send-contact.usecase";
import { IContactRepository } from "@/core/domain/repositories/IContactRepository";
import { ContactMessage, ContactSubmissionResult } from "@/core/domain/entities/contact";
import { SecurityRateLimiter } from "@/core/security/rate-limiter";

/**
 * Repositorio de prueba simulado para pruebas unitarias del caso de uso.
 */
class SpyContactRepository implements IContactRepository {
  public lastMessageSent?: ContactMessage;
  public callCount = 0;

  async sendMessage(message: ContactMessage): Promise<ContactSubmissionResult> {
    this.lastMessageSent = message;
    this.callCount++;
    return {
      success: true,
      message: "Procesado correctamente por spy",
      ticketId: "US-ORD-9999",
      timestamp: new Date().toISOString(),
    };
  }
}

describe("SendContactUseCase (Unit Tests)", () => {
  beforeEach(() => {
    SecurityRateLimiter.reset();
  });

  it("debe rechazar la solicitud si el campo honeypot anti-bot contiene datos (OWASP A04)", async () => {
    const spyRepo = new SpyContactRepository();
    const useCase = new SendContactUseCase(spyRepo);

    const maliciousMessage: ContactMessage = {
      name: "Bot Malicioso",
      contact: "+56912345678",
      service: "asesoria",
      detail: "Intento de spam automatizado",
      _honeypot: "spam_value_trap",
    };

    const result = await useCase.execute(maliciousMessage);

    assert.equal(result.success, false);
    assert.match(result.message, /protección de formularios/i);
    assert.equal(spyRepo.callCount, 0, "No debe invocar al repositorio ante bots");
  });

  it("debe rechazar si el nombre está vacío o es demasiado corto", async () => {
    const spyRepo = new SpyContactRepository();
    const useCase = new SendContactUseCase(spyRepo);

    const invalidMessage: ContactMessage = {
      name: "A",
      contact: "+56912345678",
      service: "asesoria",
      detail: "Consulta válida",
    };

    const result = await useCase.execute(invalidMessage);

    assert.equal(result.success, false);
    assert.match(result.message, /nombre/i);
    assert.equal(spyRepo.callCount, 0);
  });

  it("debe rechazar si el teléfono de contacto no tiene formato numérico suficiente", async () => {
    const spyRepo = new SpyContactRepository();
    const useCase = new SendContactUseCase(spyRepo);

    const invalidMessage: ContactMessage = {
      name: "Cliente Legítimo",
      contact: "123", // Muy corto
      service: "soporte",
      detail: "Necesito asistencia técnica para mi notebook",
    };

    const result = await useCase.execute(invalidMessage);

    assert.equal(result.success, false);
    assert.match(result.message, /telef|contact|dígitos/i);
    assert.equal(spyRepo.callCount, 0);
  });

  it("debe sanitizar etiquetas HTML maliciosas en los campos antes de enviarlos (OWASP A03)", async () => {
    const spyRepo = new SpyContactRepository();
    const useCase = new SendContactUseCase(spyRepo);

    const messageWithXss: ContactMessage = {
      name: "Carlos <script>alert('xss')</script>",
      contact: "+56 9 5555 4444",
      service: "clases",
      detail: "Hola <b>mundo</b> <img src=x onerror=alert(1)>",
    };

    const result = await useCase.execute(messageWithXss);

    assert.equal(result.success, true);
    assert.equal(spyRepo.callCount, 1);
    assert.ok(spyRepo.lastMessageSent);
    // Verificar que se hayan escapado las etiquetas peligrosas
    assert.ok(!spyRepo.lastMessageSent.name.includes("<script>"));
    assert.ok(!spyRepo.lastMessageSent.detail?.includes("<img"));
  });

  it("debe procesar exitosamente un mensaje válido y registrar el rate limiting", async () => {
    const spyRepo = new SpyContactRepository();
    const useCase = new SendContactUseCase(spyRepo);

    const validMessage: ContactMessage = {
      name: "Ana Thompson",
      contact: "+56 9 1234 5678",
      service: "asesoria",
      detail: "Requiero asistencia personalizada para trámites en línea",
    };

    const result = await useCase.execute(validMessage);

    assert.equal(result.success, true);
    assert.equal(spyRepo.callCount, 1);
    assert.equal(result.ticketId, "US-ORD-9999");
  });
});
