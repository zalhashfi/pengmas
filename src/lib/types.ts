import type { DeviceConfig } from "@/config/devices";

/**
 * Tipe internal aplikasi.
 *
 * SENGAJA tidak mengikuti bentuk mentah JSON API. API memakai nama seperti
 * `CO2v` / `PM25v` / `Tempoutv` dan menyertakan banyak field yang selalu kosong
 * (`NO2v`, `V_bat`, `*_valid`). Bentuk mentah itu dipetakan sekali di
 * `src/lib/api.ts`, lalu seluruh UI memakai tipe yang bersih ini. Kalau API
 * berubah, hanya satu file yang perlu disesuaikan.
 */

/** Kualitas udara, 3 level sesuai DESIGN.md §2. */
export type QualityLevel = "good" | "moderate" | "unhealthy" | "unknown";

/** Satu pembacaan sensor pada satu waktu. Semua nilai bisa null bila sensor mati. */
export type Reading = {
  deviceId: string;
  /** ISO string (sudah dinormalkan dari format API). */
  timestamp: string;
  co2: number | null;
  pm25: number | null;
  temperature: number | null;
  humidity: number | null;
};

/**
 * Status pemuatan data.
 * - `ok`    : ada data
 * - `empty` : device dikenal tetapi belum ada data (bukan error!)
 * - `error` : gagal mengambil data
 */
export type FetchStatus = "ok" | "empty" | "error";

export type DeviceVitals = {
  device: DeviceConfig;
  readings: Reading[];
  status: FetchStatus;
  /** Pesan teknis saat status `error`. Jangan ditampilkan mentah ke pengguna. */
  message?: string;
};

/** Field yang dipakai dari satu record API mentah. */
export type ApiRecord = {
  id?: number;
  device?: string;
  created_at?: string;
  CO2v?: number | null;
  PM25v?: number | null;
  Tempoutv?: number | null;
  Humidoutv?: number | null;
  Longitude?: number | null;
  Latitude?: number | null;
  [key: string]: unknown;
};

/**
 * Bentuk respons top-level API.
 *
 * Catatan penting: `data` terurut NAIK (ASCENDING) — `data[0]` adalah yang
 * paling lama dan `data[data.length - 1]` yang paling baru. Ini kebalikan dari
 * kebiasaan umum. Chart harus membaca urutan ini apa adanya.
 */
export type ApiResponse = {
  status: string;
  device: string;
  mode: string;
  start: string | null;
  end: string | null;
  interval_minutes: number;
  server_time: string;
  data: ApiRecord[];
  count: number;
};
