"use client";

import React from "react";
import { useServerStatus } from "@/presentation/hooks/useServerStatus";
import { useLanguage } from "@/presentation/context/LanguageContext";

interface PlatformStatusBadgeProps {
  className?: string;
  showLatency?: boolean;
}

export function PlatformStatusBadge({
  className = "",
  showLatency = true,
}: PlatformStatusBadgeProps) {
  const { health, isLoading } = useServerStatus();
  const { t } = useLanguage();

  const isOnline = health.status === "online";
  const isDegraded = health.status === "degraded";

  const statusColor = isOnline
    ? "bg-emerald-400"
    : isDegraded
    ? "bg-amber-400"
    : "bg-neutral-500";

  const pingColor = isOnline
    ? "bg-emerald-500"
    : isDegraded
    ? "bg-amber-500"
    : "bg-neutral-600";

  const statusLabel = isOnline
    ? t("footer.statusOnline")
    : t("footer.statusOffline");

  return (
    <div
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-white/10 bg-[#121318]/90 text-[11px] font-mono transition-all duration-300 hover:border-white/20 ${className}`}
      title={`${health.message || statusLabel} • Latencia: ${health.latencyMs ?? 0}ms`}
      role="status"
      aria-live="polite"
    >
      <span className="relative flex h-2 w-2">
        {isOnline && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pingColor}`}
          ></span>
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${statusColor}`}
        ></span>
      </span>
      <span className="text-neutral-300 text-[10px] tracking-wider uppercase">
        {isLoading ? "Verificando..." : statusLabel}
      </span>
      {showLatency && health.latencyMs !== undefined && health.latencyMs > 0 && (
        <span className="text-neutral-500 text-[9px] hidden sm:inline">
          {health.latencyMs}ms
        </span>
      )}
    </div>
  );
}
