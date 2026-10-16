import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { SecurityRateLimiter } from "@/core/security/rate-limiter";

describe("SecurityRateLimiter (Unit Tests)", () => {
  beforeEach(() => {
    SecurityRateLimiter.reset();
  });

  it("debe permitir el primer envío sin restricciones", () => {
    const status = SecurityRateLimiter.checkRateLimit();
    assert.equal(status.isAllowed, true);
  });

  it("debe bloquear peticiones consecutivas enviadas en menos del intervalo mínimo", () => {
    SecurityRateLimiter.recordSubmission();
    const status = SecurityRateLimiter.checkRateLimit();

    assert.equal(status.isAllowed, false);
    assert.ok(status.retryAfterSeconds! > 0);
    assert.match(status.reason!, /anti-flood/i);
  });

  it("debe permitir el reinicio manual del limitador", () => {
    SecurityRateLimiter.recordSubmission();
    SecurityRateLimiter.reset();

    const status = SecurityRateLimiter.checkRateLimit();
    assert.equal(status.isAllowed, true);
  });
});
