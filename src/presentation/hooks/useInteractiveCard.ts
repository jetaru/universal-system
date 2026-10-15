"use client";

import { useEffect } from "react";

export function useInteractiveCard() {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".interactive-card");

    const handleMouseMove = (e: MouseEvent, card: HTMLElement) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    const cleanups: (() => void)[] = [];

    cards.forEach((card) => {
      const listener = (e: MouseEvent) => handleMouseMove(e, card);
      card.addEventListener("mousemove", listener);
      cleanups.push(() => card.removeEventListener("mousemove", listener));
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);
}
