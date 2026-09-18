import { API_BASE, DEVICES, TREND_POINTS, type DeviceConfig } from "@/config/devices";
import { parseApiTime, toIso } from "@/lib/format";
import type { ApiRecord, ApiResponse, DeviceVitals, Reading } from "@/lib/types";

/**
 * Pemetaan dari bentuk mentah API ke tipe internal.
 *
 * Ini SATU-SATUNYA tempat nama field API (`CO2v`, `PM25v`, `Tempoutv`,
 * `Humidoutv`) boleh muncul. Seluruh UI memakai tipe `Reading` yang bersih.
 *
 * Field yang SENGAJA dibuang karena selalu kosong (terverifikasi 0/100 record):
 *   - `NO2v`   -> tidak pernah terisi
 *   - `V_bat`  -> tidak pernah terisi
 *   - `*_valid`-> tidak pernah terisi
 * Jangan menambahkan field ini ke UI tanpa memverifikasi API dulu.
 */
function mapRecord(record: ApiRecord, deviceId: string): Reading {
  return {
    deviceId,
    timestamp: toIso(parseApiTime(record.created_at)),
    co2: typeof record.CO2v === "number" ? record.CO2v : null,
    pm25: typeof record.PM25v === "number" ? record.PM25v : null,
    temperature: typeof record.Tempoutv === "number" ? record.Tempoutv : null,
    humidity: typeof record.Humidoutv === "number" ? record.Humidoutv : null,
  };
}

/**
 * Ambil data satu device.
 *
 * Kasus penting: device yang tidak dikenal TIDAK menghasilkan error. API
 * membalas HTTP 200 dengan `count: 0` dan `data: []`. Itu harus jadi kondisi
 * `empty`, bukan `error`, supaya UI menampilkan "belum ada data" alih-alih
 * "terjadi kesalahan".
 *
 * `data` dari API terurut NAIK (paling lama dulu). Urutan itu dipertahankan
 * karena chart membacanya apa adanya.
 */
export async function fetchDeviceVitals(
  device: DeviceConfig,
  points: number = TREND_POINTS,
): Promise<DeviceVitals> {
  const url = `${API_BASE}/${encodeURIComponent(device.id)}?last${points}`;

  try {
    const response = await fetch(url, { headers: { Accept: "application/json" } });

    if (!response.ok) {
      return {
        device,
        readings: [],
        status: "error",
        message: `HTTP ${response.status}`,
      };
    }

    const payload = (await response.json()) as ApiResponse;

    if (!payload || !Array.isArray(payload.data) || payload.data.length === 0) {
      return { device, readings: [], status: "empty" };
    }

    return {
      device,
      readings: payload.data.map((record) => mapRecord(record, device.id)),
      status: "ok",
    };
  } catch (error) {
    return {
      device,
      readings: [],
      status: "error",
      message: error instanceof Error ? error.message : "Gagal menghubungi server",
    };
  }
}

/** Ambil data semua device yang terdaftar. Satu request per device. */
export async function fetchAllDevices(points: number = TREND_POINTS): Promise<DeviceVitals[]> {
  return Promise.all(DEVICES.map((device) => fetchDeviceVitals(device, points)));
}
