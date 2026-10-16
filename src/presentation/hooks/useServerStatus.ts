"use client";

import { useState, useEffect, useCallback } from "react";
import { ServerHealth } from "@/core/domain/entities/server-health";
import { container } from "@/infrastructure/container";

export function useServerStatus(customUrl?: string) {
  const [health, setHealth] = useState<ServerHealth>({
    status: "connecting",
    message: "Verificando disponibilidad de infraestructura...",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkStatus = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await container.checkServerStatusUseCase.execute(customUrl);
      setHealth(result);
    } catch {
      setHealth({
        status: "offline",
        message: "No fue posible conectar con los servicios remotos. Modo local resiliente activo.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [customUrl]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  return {
    health,
    isLoading,
    refresh: checkStatus,
  };
}
