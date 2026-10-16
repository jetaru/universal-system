import { IServerRepository } from "@/core/domain/repositories/IServerRepository";
import { ServerHealth } from "@/core/domain/entities/server-health";
import { appConfig } from "@/infrastructure/config/env";

export class MockServerRepository implements IServerRepository {
  async checkHealth(targetUrl?: string): Promise<ServerHealth> {
    const url = (targetUrl || appConfig.api.baseUrl || "").replace(/\/$/, "");

    if (!url) {
      // Modo estático autónomo resiliente para GitHub Pages
      return {
        status: "online",
        message: "Plataforma estática de alta disponibilidad activa y operativa.",
        endpointUrl: "Client-Side Standalone",
        latencyMs: 14,
        runtime: "Next.js 16 Static Edge Prerender",
        version: "1.0.0",
        environment: "production",
        uptimeSeconds: 86400,
      };
    }

    const startTime = typeof performance !== "undefined" ? performance.now() : Date.now();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const healthUrl = `${url}/health`;
      const res = await fetch(healthUrl, {
        method: "GET",
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const endTime = typeof performance !== "undefined" ? performance.now() : Date.now();
      const latencyMs = Math.round(endTime - startTime);

      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        return {
          status: "online",
          latencyMs,
          endpointUrl: healthUrl,
          uptimeSeconds: data.uptimeSeconds ?? 3600,
          version: data.version || "1.0.0",
          environment: data.environment || "production",
          runtime: data.runtime || "Node.js (Universal System Edge)",
          message: data.message || "Servicios y microservicios respondiendo en tiempo óptimo.",
        };
      } else {
        return {
          status: "degraded",
          latencyMs,
          endpointUrl: healthUrl,
          message: `El servidor respondió con código HTTP ${res.status}`,
        };
      }
    } catch {
      const endTime = typeof performance !== "undefined" ? performance.now() : Date.now();
      return {
        status: "offline",
        latencyMs: Math.round(endTime - startTime),
        endpointUrl: `${url}/health`,
        message: "Operando en modo de contingencia estática desacoplada.",
        runtime: "Offline Resilient Cache",
      };
    }
  }
}
