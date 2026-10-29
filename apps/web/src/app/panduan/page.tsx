import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "@/components/brand";

export const metadata: Metadata = {
  title: "Panduan Penggunaan Klinis Puskesmas · Steto",
  description: "Standar Prosedur Operasional (SOP), etika informed consent, dan tata kelola dokumentasi medis AI di Puskesmas.",
};

const STEPS = [
  {
    step: "01",
    title: "Triage & Pencatatan Tanda Vital",
    role: "Perawat Poli",
    desc: "Perawat melakukan pengukuran tanda vital pasien (tekanan darah, nadi, frekuensi pernapasan, suhu badan, dan antropometri) lalu mencatatnya di sistem sebelum pasien masuk ruang periksa dokter.",
  },
  {
    step: "02",
    title: "Persetujuan Pasien (Informed Consent)",
    role: "Dokter / Bidan",
    desc: "Sebelum konsultasi dimulai, tenaga medis meminta persetujuan lisan dari pasien untuk mengaktifkan asisten pencatat audio. Pasien berhak menolak atau meminta jeda kapan pun tanpa mengurangi mutu pelayanan.",
  },
  {
    step: "03",
    title: "Percakapan Klinis & Transkripsi Suara",
    role: "Steto AI Engine",
    desc: "Dokter fokus berbicara dan memeriksa pasien secara tatap muka. Steto menangkap audio, mentranskrip dialog secara real-time, dan memetakan informasi klinis ke format baku SOAP (Subjektif, Objektif, Assessment, Plan).",
  },
  {
    step: "04",
    title: "Telaah Medis & Persetujuan Sah",
    role: "Dokter Penanggung Jawab",
    desc: "Semua hasil keluaran AI berstatus draf mentah. Dokter memeriksa kembali, mengoreksi bila ada kekeliruan terminologi atau diagnosis, memilih kode ICD-10 yang tepat, lalu menandatangani rekam medis secara sah.",
  },
];

const GUIDELINES = [
  {
    title: "Prinsip Human-in-the-Loop",
    content:
      "Steto tidak pernah membuat keputusan diagnosis klinis secara mandiri dan tidak pernah menutup kunjungan pasien tanpa persetujuan manual dari dokter yang berizin praktik resmi.",
  },
  {
    title: "Pencegahan Kebocoran Data (Data Isolation)",
    content:
      "Setiap Puskesmas memiliki ruang data terisolasi (multi-tenancy). Tenaga medis dari satu Puskesmas tidak memiliki akses terhadap rekam medis fasyankes lain.",
  },
  {
    title: "Rekomendasi Perangkat Keras Ruang Periksa",
    content:
      "Untuk ruang poli Puskesmas dengan tingkat kebisingan sedang, disarankan memakai mikrofon clip-on atau mikrofon USB boundary dengan peredam noise latar belakang agar transkripsi akurat.",
  },
];

export default function GuidePage() {
  return (
    <div className="min-h-dvh bg-base-100 text-base-content">
      {/* Top Header */}
      <header className="border-b border-base-200 bg-base-100/90 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Brand />
          <div className="flex items-center gap-3">
            <Link href="/" className="btn btn-ghost btn-sm">Beranda</Link>
            <Link href="/app/pasien" className="btn btn-primary btn-sm">Buka Aplikasi</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="container mx-auto max-w-4xl px-4 py-12 space-y-12">
        <div className="space-y-4">
          <div className="badge badge-primary badge-outline text-xs font-semibold">
            Standar Prosedur Operasional (SOP)
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Panduan Penggunaan Klinis Steto di Puskesmas
          </h1>
          <p className="text-base text-base-content/70 leading-relaxed">
            Pedoman tata laksana pencatatan rekam medis elektronik terintegrasi berbasis kecerdasan artifisial,
            mengacu pada Permenkes No. 24 Tahun 2022 dan standar interoperabilitas HL7 FHIR SATUSEHAT.
          </p>
        </div>

        {/* 4 Steps */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight border-b pb-2">
            Alur Konsultasi Pasien
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STEPS.map((s) => (
              <div key={s.step} className="card bg-base-200/50 border border-base-200 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-bold text-primary">{s.step}</span>
                  <span className="badge badge-neutral text-xs font-medium">{s.role}</span>
                </div>
                <h3 className="font-bold text-base">{s.title}</h3>
                <p className="text-xs text-base-content/70 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ethical & Safeguards */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight border-b pb-2">
            Prinsip Etika & Kepatuhan Hukum
          </h2>
          <div className="space-y-4">
            {GUIDELINES.map((g, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-base-200/40 border border-base-200 space-y-1.5">
                <h3 className="font-semibold text-sm text-primary">{g.title}</h3>
                <p className="text-xs text-base-content/80 leading-relaxed">{g.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Audio Recording Protocol */}
        <section className="space-y-4 bg-primary/5 p-6 rounded-xl border border-primary/20">
          <h3 className="text-base font-bold text-primary">Protokol Informed Consent Rekaman Suara</h3>
          <p className="text-xs text-base-content/80 leading-relaxed">
            Sesuai regulasi privasi data medis nasional, perekaman dialog konsultasi dokter dan pasien wajib
            memenuhi 3 prinsip utama:
          </p>
          <ul className="list-disc list-inside text-xs text-base-content/80 space-y-1">
            <li><strong>Pemberitahuan Terbuka:</strong> Pasien dijelaskan bahwa audio diolah oleh komputer semata-mata untuk menghasilkan draf catatan SOAP.</li>
            <li><strong>Hak Menolak Tanpa Syarat:</strong> Jika pasien menolak, perekaman dinonaktifkan dan dokter mengisi catatan secara manual.</li>
            <li><strong>Penghapusan Berkas Suara:</strong> Rekaman suara mentah dapat dihapus berkala setelah draf catatan selesai diverifikasi dan disimpan sah oleh dokter.</li>
          </ul>
        </section>

        {/* CTA */}
        <div className="text-center pt-6 border-t">
          <Link href="/app/pasien" className="btn btn-primary btn-md">
            Mulai Simulasi Konsultasi di Aplikasi Steto
          </Link>
        </div>
      </main>
    </div>
  );
}
