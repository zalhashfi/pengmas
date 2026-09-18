"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Hook pembaca media query yang aman untuk SSR dan tidak memicu cascading render.
 *
 * Memakai `useSyncExternalStore`, bukan `useState` + `useEffect`. Alasannya:
 * `useEffect` yang memanggil `setState` langsung di badannya memicu render
 * berantai (dilarang oleh aturan `react-hooks/set-state-in-effect`), dan juga
 * membuat nilai berkedip salah selama frame pertama.
 *
 * `useSyncExternalStore` menyelesaikan keduanya: ia membaca nilai terkini saat
 * hidrasi, dan berlangganan perubahan tanpa render perantara.
 *
 * @param query Media query yang dipantau, mis. "(prefers-reduced-motion: reduce)".
 * @param serverSnapshot Nilai saat render di server. Harus stabil.
 */
export function useMediaQuery(query: string, serverSnapshot = false): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onStoreChange);
      return () => list.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => serverSnapshot, [serverSnapshot]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
