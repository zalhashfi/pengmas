import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Background } from "@/components/landing/Background";
import { Metrics } from "@/components/landing/Metrics";
import { Workflow } from "@/components/landing/Workflow";
import { Impact } from "@/components/landing/Impact";
import { Footer } from "@/components/landing/Footer";

/**
 * Landing page. Rincian BRIEF INFERENCE, Design Read, dan alasan dial ada di
 * DESIGN.md §1 (Dial Antislop), bukan di sini.
 *
 * Ringkasnya: dibaca sebagai landing page lingkungan sekolah untuk guru, siswa,
 * dan orang tua (termasuk proyektor kelas), bahasa visual clean technical terang
 * dengan biru langit INSIGHT, dial ENERGY 2 / RHYTHM 2 / MOTION 2.
 *
 * Skill `design-taste-frontend` dipakai penuh di sini dan TIDAK untuk dashboard.
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
