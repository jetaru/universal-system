import { ServerHealth } from "../entities/server-health";

/**
 * Contrato de repositorio para la verificación de salud del servidor/plataforma.
 */
export interface IServerRepository {
  checkHealth(targetUrl?: string): Promise<ServerHealth>;
}
