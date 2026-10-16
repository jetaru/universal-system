import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { CheckServerStatusUseCase } from "@/core/usecases/check-server.usecase";
import { IServerRepository } from "@/core/domain/repositories/IServerRepository";
import { ServerHealth } from "@/core/domain/entities/server-health";
import { MockServerRepository } from "@/infrastructure/repositories/MockServerRepository";

describe("CheckServerStatusUseCase (Unit Tests)", () => {
  it("debe retornar estado online desde el repositorio mock cuando no hay URL externa configurada", async () => {
    const mockRepo = new MockServerRepository();
    const useCase = new CheckServerStatusUseCase(mockRepo);

    const result = await useCase.execute();

    assert.equal(result.status, "online");
    assert.ok(result.latencyMs !== undefined);
    assert.equal(result.environment, "production");
    assert.match(result.message || "", /alta disponibilidad/i);
  });

  it("debe propagar correctamente la respuesta personalizada de un IServerRepository", async () => {
    const stubRepo: IServerRepository = {
      async checkHealth(targetUrl?: string): Promise<ServerHealth> {
        return {
          status: "online",
          latencyMs: 42,
          version: "2.5.0",
          endpointUrl: targetUrl || "https://api.universalsystem.cl/health",
          message: "Servicio enterprise respondiendo OK",
        };
      },
    };

    const useCase = new CheckServerStatusUseCase(stubRepo);
    const result = await useCase.execute("https://custom-server.com");

    assert.equal(result.status, "online");
    assert.equal(result.latencyMs, 42);
    assert.equal(result.version, "2.5.0");
    assert.equal(result.endpointUrl, "https://custom-server.com");
  });

  it("debe manejar fallos del servidor y retornar status offline sin arrojar excepciones no controladas", async () => {
    const failingRepo: IServerRepository = {
      async checkHealth(): Promise<ServerHealth> {
        return {
          status: "offline",
          latencyMs: 150,
          message: "Servidor caído o inalcanzable",
        };
      },
    };

    const useCase = new CheckServerStatusUseCase(failingRepo);
    const result = await useCase.execute();

    assert.equal(result.status, "offline");
    assert.equal(result.latencyMs, 150);
  });
});
