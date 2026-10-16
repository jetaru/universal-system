import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { MockContactRepository } from "@/infrastructure/repositories/MockContactRepository";
import { ContactMessage } from "@/core/domain/entities/contact";

describe("MockContactRepository (Unit Tests)", () => {
  it("debe generar un ticket con formato US-ORD y devolver URLs para WhatsApp y mailto", async () => {
    const repo = new MockContactRepository();
    const message: ContactMessage = {
      name: "Juan Pérez",
      contact: "+56 9 1234 5678",
      service: "clases",
      detail: "Aprender diseño web",
    };

    const result = await repo.sendMessage(message);

    assert.equal(result.success, true);
    assert.match(result.ticketId!, /^US-ORD-\d{4}$/);
    assert.ok(result.whatsappUrl?.includes("wa.me"));
    assert.ok(result.whatsappUrl?.includes("Juan%20P%C3%A9rez"));
    assert.ok(result.mailtoUrl?.includes("mailto:"));
    assert.ok(result.mailtoUrl?.includes(result.ticketId!));
  });
});
