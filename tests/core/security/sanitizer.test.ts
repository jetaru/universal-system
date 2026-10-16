import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { SecuritySanitizer } from "@/core/security/sanitizer";

describe("SecuritySanitizer (Unit Tests)", () => {
  describe("sanitizeText", () => {
    it("debe remover scripts, iframes y objetos embebidos", () => {
      const malicious = "<script>alert('xss')</script>Hola Mundo<iframe src='bad.com'></iframe>";
      const cleaned = SecuritySanitizer.sanitizeText(malicious);
      assert.equal(cleaned, "Hola Mundo");
    });

    it("debe remover manejadores de eventos en línea (onerror, onclick)", () => {
      const input = "Texto normal onerror=alert(1) onclick=stealCookies()";
      const cleaned = SecuritySanitizer.sanitizeText(input);
      assert.ok(!cleaned.includes("onerror="));
      assert.ok(!cleaned.includes("onclick="));
    });

    it("debe neutralizar protocolos peligrosos como javascript: y data:text/html", () => {
      const input = "Enlace: javascript:alert(1) y data:text/html;base64,...";
      const cleaned = SecuritySanitizer.sanitizeText(input);
      assert.ok(!cleaned.includes("javascript:"));
      assert.ok(!cleaned.includes("data:text/html:"));
    });

    it("debe retornar cadena vacía si se pasa null o vacío", () => {
      assert.equal(SecuritySanitizer.sanitizeText(""), "");
      // @ts-expect-error probando valor nulo
      assert.equal(SecuritySanitizer.sanitizeText(null), "");
    });
  });

  describe("escapeHtml", () => {
    it("debe escapar caracteres especiales HTML (&, <, >, \", ', /)", () => {
      const input = '<div class="test" data-id=\'1\'>&/</div>';
      const escaped = SecuritySanitizer.escapeHtml(input);
      assert.equal(escaped, "&lt;div class=&quot;test&quot; data-id=&#x27;1&#x27;&gt;&amp;&#x2F;&lt;&#x2F;div&gt;");
    });
  });

  describe("validateName", () => {
    it("debe aceptar nombres válidos con tildes, ñ y espacios", () => {
      assert.equal(SecuritySanitizer.validateName("Jorge Thompson").isValid, true);
      assert.equal(SecuritySanitizer.validateName("María José Núñez").isValid, true);
      assert.equal(SecuritySanitizer.validateName("Jean-Luc O'Connor").isValid, true);
    });

    it("debe rechazar nombres demasiado cortos (< 2 caracteres)", () => {
      const res = SecuritySanitizer.validateName("J");
      assert.equal(res.isValid, false);
      assert.match(res.error!, /al menos 2 caracteres/i);
    });

    it("debe rechazar nombres que exceden 80 caracteres", () => {
      const longName = "A".repeat(81);
      const res = SecuritySanitizer.validateName(longName);
      assert.equal(res.isValid, false);
      assert.match(res.error!, /no puede exceder 80/i);
    });

    it("debe rechazar caracteres especiales no permitidos en nombres", () => {
      const res = SecuritySanitizer.validateName("User <123> $$");
      assert.equal(res.isValid, false);
    });
  });

  describe("validatePhone", () => {
    it("debe aceptar formatos telefónicos y WhatsApp válidos", () => {
      assert.equal(SecuritySanitizer.validatePhone("+56 9 5333 2870").isValid, true);
      assert.equal(SecuritySanitizer.validatePhone("+1 (555) 123-4567").isValid, true);
      assert.equal(SecuritySanitizer.validatePhone("56953332870").isValid, true);
    });

    it("debe rechazar números con menos de 7 dígitos", () => {
      const res = SecuritySanitizer.validatePhone("12345");
      assert.equal(res.isValid, false);
      assert.match(res.error!, /al menos 7 dígitos/i);
    });

    it("debe rechazar números que excedan 25 caracteres", () => {
      const longPhone = "1".repeat(26);
      const res = SecuritySanitizer.validatePhone(longPhone);
      assert.equal(res.isValid, false);
    });
  });

  describe("validateMessageDetail", () => {
    it("debe aceptar mensajes dentro del límite de 1000 caracteres", () => {
      assert.equal(SecuritySanitizer.validateMessageDetail("Consulta válida").isValid, true);
      assert.equal(SecuritySanitizer.validateMessageDetail(undefined).isValid, true);
    });

    it("debe rechazar mensajes con más de 1000 caracteres", () => {
      const longMessage = "A".repeat(1001);
      const res = SecuritySanitizer.validateMessageDetail(longMessage);
      assert.equal(res.isValid, false);
      assert.match(res.error!, /1000 caracteres/i);
    });
  });
});
