import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Background } from "@/components/landing/Background";
import { Metrics } from "@/components/landing/Metrics";
import { Workflow } from "@/components/landing/Workflow";
import { Impact } from "@/components/landing/Impact";
import { Footer } from "@/components/landing/Footer";

/**
 * ============================================================================
 * BRIEF INFERENCE (skill: design-taste-frontend, bagian 0)
 * ============================================================================
 *
 * Dijalankan sebelum menulis komponen. Ringkasannya:
 *
 * Page kind   : landing page produk publik (bukan dashboard, bukan data table).
 *               Karena itu skill `design-taste-frontend` DIPAKAI PENUH di sini.
 *               Skill itu menyatakan dirinya tidak untuk dashboard, dan rilis 1
 *               memang hanya landing.
 *
 * Vibe words  : "clean technical", "lingkungan sekolah", "terang", "biru langit
 *               INSIGHT". Dari user: at-a-glance, ringan, jujur soal data.
 *
 * Audience    : guru, siswa, dan orang tua SMP Telkom. Sering ditampilkan lewat
 *               proyektor kelas, kadang di jaringan sekolah yang lambat. Ini
 *               constraint yang MENIMPA preferensi estetika (bagian 0.A poin 6):
 *               keterbacaan dan bobot halaman lebih penting daripada efek.
 *
 * Reference   : struktur landing Nexora (hero split, trust badge, footer) dan
 *               struktur dashboard Airy Weather. Keduanya dipakai sebagai
 *               struktur saja, bukan sebagai palet.
 *
 * Design Read : "Reading this as: landing page dashboard lingkungan sekolah
 *               untuk guru, siswa, dan orang tua (termasuk proyektor kelas),
 *               dalam bahasa visual clean technical, terang, biru langit
 *               INSIGHT, dial ENERGY 2 / RHYTHM 2 / MOTION 2."
 *
 * Dial        : ENERGY 2 / RHYTHM 2 / MOTION 2. Ditulis lengkap beserta
 *               alasannya di DESIGN.md bagian 1 (Dial Antislop).
 *
 * Arah yang diinferensi (bagian 1.A tabel): constraint "trust-first /
 * public-sector / regulated / accessibility-critical" menghasilkan
 * VARIANCE 3-4 / MOTION 2-3 / DENSITY 4-5. Itu sejalan dengan dial di atas:
 * variansi rendah, motion rendah, kepadatan sedang.
 *
 * Yang SENGAJA TIDAK dipakai, sesuai bagian 0.D Anti-Default Discipline:
 *   - gradien AI-ungu, hero terpusat di atas mesh gelap
 *   - tiga kartu fitur berukuran sama (section Metrics memakai grid 2x2 dengan
 *     pemisah hairline, section Impact memakai tiga kolom berpenomoran)
 *   - glassmorphism di semua tempat, animasi loop tak berujung, Inter + slate-900
 *
 * Hasil pencarian skill pendukung:
 *   - ui-ux-pro-max `--domain style`, query "environmental monitoring landing
 *     page hero" -> merekomendasikan Minimalism & Swiss Style (biaya rendah,
 *     risiko aksesibilitas rendah, kompatibel Tailwind). Dipakai.
 *     Rekomendasi "kinetic typography" DITOLAK karena bertabrakan dengan
 *     MOTION 2 dan prinsip ringan di jaringan sekolah.
 *   - ui-ux-pro-max `--domain chart`, query "air quality sensor trend line
 *     chart" -> Line Chart, dan aturan "never distinguish series by hue alone".
 *     Sejalan dengan DESIGN.md bagian 6: garis ambang memakai garis putus-putus
 *     warna netral, bukan warna semantik.
 *   - ui-ux-pro-max `--domain ux`, query aksesibilitas -> focus indicator
 *     minimal 2px dengan offset, kontras teks minimal 4.5:1. Diterapkan di
 *     globals.css (`:focus-visible`) dan di seluruh komponen.
 * ============================================================================
 */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Background />
        <Metrics />
        <Workflow />
        <Impact />
      </main>
      <Footer />
    </>
  );
}
