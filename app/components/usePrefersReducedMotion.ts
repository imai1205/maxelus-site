"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

// prefers-reduced-motion を SSR セーフに購読する。
// useEffect 内 setState（cascading renders）を避けるため useSyncExternalStore を使う。
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(QUERY).matches, // クライアント側スナップショット
    () => false // サーバー側スナップショット（reduce なし扱い）
  );
}
