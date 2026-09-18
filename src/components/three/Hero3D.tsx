"use client";

import { Component, type ReactNode, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { Boxes } from "lucide-react";
import { useLang } from "@/components/lang/LanguageProvider";
import { useSceneEnvironment, isWebGLAvailable } from "./Scene3D";

/**
 * Pembungkus hero 3D.
 *
 * `ssr: false` WAJIB dan HANYA boleh dipanggil dari Client Component. `<Canvas>`
 * memakai WebGL dan `window`, yang tidak ada saat prerender di server. Memanggil
 * `ssr: false` dari Server Component akan membuat Next.js error saat build.
 *
 * Efek samping yang diinginkan: Three.js dan model tidak ikut memblokir initial
 * load landing, karena baru diunduh setelah halaman hidup.
 */
const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => <ScenePlaceholder />,
});

/** Tampilan sementara selama bundel 3D dan model sedang diunduh. */
function ScenePlaceholder({ message }: { message?: string }) {
  return (
    <div className="flex size-full items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <Boxes className="size-6 animate-pulse" aria-hidden="true" />
        <p className="text-xs font-mono">{message ?? "..."}</p>
      </div>
    </div>
  );
}

/**
 * Penjaring kesalahan saat memuat model 3D.
 *
 * Kalau file model hilang atau gagal di-parse, kita menampilkan placeholder 2D,
 * bukan area kosong dan bukan halaman blank (DESIGN.md §5).
 */
class SceneErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

/**
 * Deteksi ketersediaan WebGL.
 *
 * Memakai `useSyncExternalStore` supaya nilai ini dibaca dengan benar saat
 * hidrasi di klien, sementara di server tetap `false` (tidak menyentuh DOM).
 * Ini menggantikan pola `useState` + `useEffect` yang memicu cascading render.
 */
function useWebGLAvailable(): boolean {
  return useSyncExternalStore(
    () => () => {},
    isWebGLAvailable,
    () => false,
  );
}

export function Hero3D() {
  const { t } = useLang();
  const { reducedMotion, isDesktop } = useSceneEnvironment();
  const webglOk = useWebGLAvailable();

  const fallback = (
    <div className="flex size-full items-center justify-center p-6">
      <div className="flex max-w-xs flex-col items-center gap-3 text-center">
        <Boxes className="size-8 text-muted-foreground" aria-hidden="true" />
        <p className="text-sm text-muted-foreground">{t.hero.modelUnavailable}</p>
      </div>
    </div>
  );

  if (!webglOk) return <ScenePlaceholder message={t.hero.modelLoading} />;

  return (
    <SceneErrorBoundary fallback={fallback}>
      <Scene3D
        // Versi ringan di layar kecil: tetap tampil dan berputar, hanya resolusi
        // render yang diturunkan (DESIGN.md §5 dan keputusan rilis 1).
        dpr={isDesktop ? [1, 2] : [1, 1.5]}
        reducedMotion={reducedMotion}
      />
    </SceneErrorBoundary>
  );
}
