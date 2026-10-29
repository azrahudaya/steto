import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "@/components/brand";

export const metadata: Metadata = {
  title: "Kebijakan Privasi & Perlindungan Data Medis · Steto",
  description: "Komitmen Steto dalam pelindungan data pribadi pasien dan rekam medis elektronik sesuai UU PDP dan PMK 24/2022.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-dvh bg-base-100 text-base-content">
      <header className="border-b border-base-200 bg-base-100/90 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Brand />
          <div className="flex items-center gap-3">
            <Link href="/" className="btn btn-ghost btn-sm">Beranda</Link>
            <Link href="/app/pasien" className="btn btn-primary btn-sm">Aplikasi</Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-4 py-12 space-y-8">
        <div className="space-y-3">
          <div className="badge badge-outline text-xs">Pembaruan: Oktober 2026</div>
          <h1 className="text-3xl font-extrabold tracking-tight">Kebijakan Privasi & Pelindungan Data Medis</h1>
          <p className="text-sm text-base-content/70 leading-relaxed">
            Steto berkomitmen menjaga kerahasiaan data medis dan data pribadi pasien sesuai regulasi kesehatan Republik Indonesia.
          </p>
        </div>

        <section className="space-y-3 text-sm leading-relaxed text-base-content/85">
          <h2 className="text-lg font-bold text-base-content">1. Landasan Hukum & Regulasi</h2>
          <p>
            Pengelolaan data rekam medis elektronik pada sistem Steto tunduk dan patuh pada:
          </p>
          <ul className="list-disc list-inside space-y-1 text-xs pl-2">
            <li>Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP).</li>
            <li>Peraturan Menteri Kesehatan Republik Indonesia Nomor 24 Tahun 2022 tentang Rekam Medis.</li>
            <li>Standar Interoperabilitas Data Kesehatan Nasional (HL7 FHIR Platform SATUSEHAT).</li>
          </ul>
        </section>

        <section className="space-y-3 text-sm leading-relaxed text-base-content/85">
          <h2 className="text-lg font-bold text-base-content">2. Pemrosesan Rekaman Suara Konsultasi</h2>
          <p>
            Rekaman audio percakapan konsultasi klinis diproses dengan ketentuan:
          </p>
          <ul className="list-disc list-inside space-y-1 text-xs pl-2">
            <li>Perekaman hanya aktif setelah pasien memberikan persetujuan lisan (informed consent).</li>
            <li>Berkas audio diolah semata-mata untuk menghasilkan transkrip teks dan draf catatan SOAP.</li>
            <li>Audio percakapan tidak pernah dijual atau digunakan untuk melatih model AI publik.</li>
          </ul>
        </section>

        <section className="space-y-3 text-sm leading-relaxed text-base-content/85">
          <h2 className="text-lg font-bold text-base-content">3. Isolasi Multi-Tenant & Keamanan Data</h2>
          <p>
            Steto menerapkan prinsip isolasi ruang kerja fasyankes. Data rekam medis satu Puskesmas tidak dapat diakses atau dilihat oleh Puskesmas lain. Seluruh transmisi data dienkripsi menggunakan protokol TLS standar industri.
          </p>
        </section>

        <section className="space-y-3 text-sm leading-relaxed text-base-content/85">
          <h2 className="text-lg font-bold text-base-content">4. Tanggung Jawab Klinis</h2>
          <p>
            Semua draf SOAP, rangkuman, dan rekomendasi kode ICD-10 yang dihasilkan oleh kecerdasan artifisial bersifat saran asistensi. Tanggung jawab hukum akhir dan penetapan diagnosa berada sepenuhnya pada dokter yang memeriksa.
          </p>
        </section>

        <div className="pt-6 border-t text-xs text-base-content/60 flex items-center justify-between">
          <span>Steto &bull; Puskesmas Clinical Assistant</span>
          <Link href="/panduan" className="link link-hover">Baca Panduan Penggunaan</Link>
        </div>
      </main>
    </div>
  );
}
