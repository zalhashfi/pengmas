/**
 * ⚠️ MOCK DATA — BUKAN DATA SENSOR ASLI. ⚠️
 *
 * File ini hanya untuk membangun dan menguji tampilan sebelum dashboard
 * disambungkan ke API. Angka-angka di sini dihasilkan secara sintetis.
 *
 * Cara membedakan dari data asli:
 *   - Nilai di sini deterministik (tidak berubah tiap pemuatan), sedangkan data
 *     asli bergerak setiap 2 menit.
 *   - Data asli datang lewat `fetchAllDevices()` di `src/lib/api.ts`.
 *
 * Menyambungkan ke data asli: ganti pemanggilan `getMockVitals()` dengan
 * `fetchAllDevices()`. Pages Function di `functions/api/[[path]].ts` sudah siap,
 * jadi tidak ada perubahan lain yang diperlukan.
 */

import { DEVICES, SAMPLE_INTERVAL_MINUTES, TREND_POINTS } from "@/config/devices";
import type { DeviceVitals, Reading } from "@/lib/types";

/**
 * Generator acak deterministik (mulberry32). Dipakai supaya nilai mock stabil
 * antar render, sehingga tidak memicu ketidakcocokan hidrasi dan memudahkan
 * pembuatan screenshot.
 */
function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Buat deret nilai yang naik-turun halus, meniru pola sensor ruangan:
 * ada tren perlahan (drift) ditambah sedikit derau (noise).
 */
function makeSeries(
  random: () => number,
  base: number,
  drift: number,
  noise: number,
  decimals: number,
): number[] {
  const values: number[] = [];
  let current = base;
  for (let i = 0; i < TREND_POINTS; i += 1) {
    current = base + Math.sin(i / 6) * drift + (random() - 0.5) * noise;
    values.push(Number(current.toFixed(decimals)));
  }
  return values;
}

/** Profil tiap device supaya ketiganya tidak tampak identik. */
const MOCK_PROFILES = [
  { co2: 720, pm25: 22, temp: 27.4, humid: 58 },
  { co2: 1080, pm25: 41, temp: 29.1, humid: 66 },
  { co2: 620, pm25: 16, temp: 28.2, humid: 61 },
];

/**
 * Hitung `count` titik terakhir dalam satu jam (interval 2 menit), berakhir
 * kira-kira "sekarang". Timestamp di-round ke kelipatan interval supaya mock
 * tidak berubah tiap milidetik.
 */
function buildTimestamps(count: number): string[] {
  const stepMs = SAMPLE_INTERVAL_MINUTES * 60 * 1000;
  const rounded = Math.floor(Date.now() / stepMs) * stepMs;
  return Array.from({ length: count }, (_, i) =>
    new Date(rounded - (count - 1 - i) * stepMs).toISOString(),
  );
}

/** Data mock untuk semua device terdaftar. */
export function getMockVitals(): DeviceVitals[] {
  const timestamps = buildTimestamps(TREND_POINTS);

  return DEVICES.map((device, index) => {
    const profile = MOCK_PROFILES[index % MOCK_PROFILES.length];
    const random = seededRandom(1000 + index * 37);

    const co2Series = makeSeries(random, profile.co2, 180, 90, 0);
    const pm25Series = makeSeries(random, profile.pm25, 8, 6, 0);
    const tempSeries = makeSeries(random, profile.temp, 0.8, 0.4, 1);
    const humidSeries = makeSeries(random, profile.humid, 4, 3, 0);

    const readings: Reading[] = timestamps.map((timestamp, i) => ({
      deviceId: device.id,
      timestamp,
      co2: co2Series[i],
      pm25: pm25Series[i],
      temperature: tempSeries[i],
      humidity: humidSeries[i],
    }));

    return { device, readings, status: "ok" as const };
  });
}

/** Ambil data mock satu device berdasarkan id. */
export function getMockVitalsFor(deviceId: string): DeviceVitals | undefined {
  return getMockVitals().find((entry) => entry.device.id === deviceId);
}
