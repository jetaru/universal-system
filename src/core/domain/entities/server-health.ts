/**
 * Entidad de dominio que representa el estado de salud y disponibilidad
 * de la infraestructura y servicios de Universal System.
 */
export interface ServerHealth {
  status: "online" | "offline" | "connecting" | "degraded";
  uptimeSeconds?: number;
  serverTime?: string;
  version?: string;
  environment?: string;
  latencyMs?: number;
  runtime?: string;
  message?: string;
  endpointUrl?: string;
}
