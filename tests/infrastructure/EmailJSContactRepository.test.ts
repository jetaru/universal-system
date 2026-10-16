import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { EmailJSContactRepository, EmailJSSenderFn } from "@/infrastructure/repositories/EmailJSContactRepository";
import { ContactMessage } from "@/core/domain/entities/contact";
import { appConfig } from "@/infrastructure/config/env";

describe("EmailJSContactRepository (Unit Tests)", () => {
  it("debe mapear correctamente los campos y despachar el correo con la clave pública de EmailJS", async () => {
    let capturedCall: {
      serviceId: string;
      templateId: string;
      templateParams: Record<string, unknown>;
      options: { publicKey: string };
    } | null = null;

    const mockSender: EmailJSSenderFn = async (serviceId, templateId, templateParams, options) => {
      capturedCall = { serviceId, templateId, templateParams, options };
      return { status: 200, text: "OK" };
    };

    const repo = new EmailJSContactRepository(mockSender);

    const message: ContactMessage = {
      name: "Jorge Thompson",
      contact: "+56 9 5333 2870",
      service: "soporte",
      detail: "Mantenimiento preventivo notebook y cambio a SSD NVMe",
      email: "cliente@ejemplo.com",
    };

    const result = await repo.sendMessage(message);

    // Verificaciones del resultado
    assert.equal(result.success, true);
    assert.equal(result.deliveryMethod, "emailjs");
    assert.match(result.ticketId!, /^US-ORD-\d{4}$/);
    assert.ok(result.whatsappUrl?.includes("wa.me"));
    assert.ok(result.mailtoUrl?.includes("mailto:"));

    // Verificaciones de la llamada a EmailJS
    if (!capturedCall) {
      assert.fail("capturedCall no debe ser nulo");
    }
    const call = capturedCall as {
      serviceId: string;
      templateId: string;
      templateParams: Record<string, unknown>;
      options: { publicKey: string };
    };

    assert.equal(call.options.publicKey, appConfig.emailjs.publicKey);
    assert.equal(call.templateParams.from_name, "Jorge Thompson");
    assert.equal(call.templateParams.contact_phone, "+56 9 5333 2870");
    assert.equal(call.templateParams.user_email, "cliente@ejemplo.com");
    assert.match(String(call.templateParams.service_type), /Soporte Técnico Notebook/i);
    assert.equal(
      call.templateParams.message,
      "Mantenimiento preventivo notebook y cambio a SSD NVMe"
    );
    assert.equal(call.templateParams.to_email, appConfig.author.email);
  });

  it("debe activar fallback resiliente hacia WhatsApp/mailto si EmailJS arroja un error", async () => {
    const failingSender: EmailJSSenderFn = async () => {
      throw new Error("The service ID is not found or quota exceeded");
    };

    const repo = new EmailJSContactRepository(failingSender);

    const message: ContactMessage = {
      name: "Mariana Silva",
      contact: "+56 9 8888 7777",
      service: "clases",
      detail: "Clases personalizadas de Excel y automatización",
    };

    const result = await repo.sendMessage(message);

    // No debe lanzar excepción al usuario, sino activar canales de contingencia
    assert.equal(result.success, true);
    assert.equal(result.deliveryMethod, "fallback_mailto");
    assert.match(result.ticketId!, /^US-ORD-\d{4}$/);
    assert.ok(result.whatsappUrl);
    assert.ok(result.mailtoUrl);
    assert.match(result.message, /ticket han sido generados/i);
  });
});
