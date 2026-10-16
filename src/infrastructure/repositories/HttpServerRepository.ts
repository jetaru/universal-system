import { IServerRepository } from "@/core/domain/repositories/IServerRepository";
import { ServerHealth } from "@/core/domain/entities/server-health";
import { MockServerRepository } from "./MockServerRepository";

export class HttpServerRepository implements IServerRepository {
  private readonly fallbackRepo = new MockServerRepository();

  async checkHealth(targetUrl?: string): Promise<ServerHealth> {
    return this.fallbackRepo.checkHealth(targetUrl);
  }
}
