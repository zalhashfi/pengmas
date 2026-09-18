"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import type * as THREE from "three";
import { useMediaQuery } from "@/lib/use-media-query";

/**
 * Model 3D alat pemantau kualitas udara untuk hero landing.
 *
 * PENTING — file model ada di `public/3d-indoor.glb` dan dimuat lewat URL string
 * (`useGLTF('/3d-indoor.glb')`), BUKAN lewat `import`. Dengan cara ini tidak
 * perlu mengonfigurasi loader `.glb` di webpack/Turbopack.
 *
 * Model ini JUGA tidak ikut ter-export bila file-nya diletakkan di root project;
 * hanya isi `public/` yang disalin ke `out/` saat build.
 *
 * Kondisi model (terverifikasi dari file):
 *   - 4 mesh, 4 material, tanpa tekstur, tanpa animasi
 *   - Bounding box hanya 0.126 x 0.076 x 0.126 satuan, jadi WAJIB diberi `scale`
 *   - Material gelap (baseColorFactor ~ #1E2127), jadi WAJIB diberi pencahayaan
 */

/**
 * Skala model. Bounding box terbesar 0.126 satuan.
 *
 * Nilai 12 (dari perhitungan awal) terbukti TERLALU BESAR: pada pengukuran
 * piksel, objek mengisi 96.7% lebar kanvas sehingga tepinya terpotong.
 * Nilai 8 memberi ukuran tampilan sekitar 1.0 satuan, yang menyisakan margin
 * di kanan dan kiri pada kamera z=2.2 / fov=40.
 */
const MODEL_SCALE = 8;

/** Kecepatan rotasi model, radian per detik. Konstan, tidak bergantung interaksi. */
const ROTATION_SPEED = 0.35;

function MonitorModel({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/3d-indoor.glb");

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    // Rotasi berputar terus pada sumbu Y. Satu-satunya yang menghentikannya
    // adalah preferensi `prefers-reduced-motion` (DESIGN.md §5).
    groupRef.current.rotation.y += delta * ROTATION_SPEED;
  });

  return (
    <group ref={groupRef}>
      {/* Offset kecil ke atas/ke bawah karena pusat model berada di y ~ +0.026
          dari titik asal, supaya rotasi berputar pada sumbu yang wajar. */}
      <group scale={MODEL_SCALE} position={[0, -0.35, 0]}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

export type Scene3DProps = {
  /** Nilai `dpr` dari Canvas, dipilih pemanggil berdasarkan ukuran layar. */
  dpr: [number, number] | number;
  reducedMotion: boolean;
};

/**
 * Kanvas 3D. Komponen ini hanya boleh dimuat lewat `dynamic(() => ..., { ssr: false })`
 * dari Client Component (`Hero3D`), karena `<Canvas>` memakai WebGL dan `window`.
 */
export default function Scene3D({ dpr, reducedMotion }: Scene3DProps) {
  return (
    <Canvas
      // Kamera disetel untuk model berukuran tampilan ~1.5 satuan.
      camera={{ position: [0, 0.8, 2.2], fov: 40 }}
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      // Kanvas tidak boleh menangkap klik, agar tombol di hero tetap bisa ditekan.
      className="pointer-events-none"
    >
      {/* Model tidak punya tekstur dan materialnya gelap, jadi cahaya wajib ada.
          Tanpa ini model akan tampak hitam pekat. */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 2]} intensity={1.6} />
      <directionalLight position={[-3, -2, -2]} intensity={0.5} />
      <MonitorModel reducedMotion={reducedMotion} />
    </Canvas>
  );
}

// Pemanasan berkas model supaya perpindahan ke halaman tidak terasa lambat.
useGLTF.preload("/3d-indoor.glb");

/**
 * Hook kecil untuk membaca preferensi pengurangan gerak dan ukuran layar.
 *
 * Memakai `useMediaQuery` (berbasis `useSyncExternalStore`) supaya tidak ada
 * pembacaan `window` saat render dan tidak ada cascading render di `useEffect`.
 */
export function useSceneEnvironment() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return { reducedMotion, isDesktop };
}

/**
 * Apakah WebGL tersedia. Dipakai untuk menampilkan fallback, bukan kanvas kosong,
 * bila perangkat tidak mendukung (DESIGN.md §5).
 *
 * Membaca DOM, jadi hanya boleh dipanggil dari event handler atau efek, bukan
 * saat render.
 */
export function isWebGLAvailable(): boolean {
  try {
    if (typeof window === "undefined") return false;
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}
