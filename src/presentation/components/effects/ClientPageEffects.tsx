"use client";

import { useEffect } from "react";
import { useScrollReveal } from "@/presentation/hooks/useScrollReveal";
import { useInteractiveCard } from "@/presentation/hooks/useInteractiveCard";

export function ClientPageEffects() {
  useScrollReveal();
  useInteractiveCard();

  return null;
}
