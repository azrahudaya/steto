import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "@/components/brand";
import { LandingExample } from "@/components/landing-example";

export const metadata: Metadata = {
  title: "Steto | Catatan medis, dimulai dari percakapan",
  description: "Kenali alur dokumentasi Steto untuk puskesmas. Lihat contoh percakapan dan draf SOAP, lalu masuk dengan akun Anda.",
};

const workflow = [
  { number: "01", title: "Mulai dari pasien", body: "Siapkan data pasien dan tanda vital sebelum konsultasi.", role: "Perawat" },
  { number: "02", title: "Minta izin, lalu rekam", body: "Persetujuan pasien menjadi awal pencatatan percakapan.", role: "Dokter / bidan" },
  { number: "03", title: "Baca ulang drafnya", body: "Cocokkan catatan SOAP dengan percakapan dan hasil pemeriksaan.", role: "Dokter / bidan" },
  { number: "04", title: "Lengkapi dokumentasi", body: "Tinjau kode ICD-10 dan catatan kunjungan sebelum menyetujui.", role: "Tenaga medis" },
];

export default function Home() {
  return (
    <div className="steto-landing" data-theme="steto">
      <a className="landing-skip" href="#utama">Lewati navigasi</a>
      <header className="landing-header">
        <nav className="du-navbar landing-container" aria-label="Navigasi utama">
          <Brand />
          <div className="landing-nav-links">
            <a href="#cara-kerja">Cara kerja</a>
            <a href="#contoh">Lihat contoh</a>
          </div>
          <Link href="/sign-in" className="du-btn du-btn-neutral nav-signin">Masuk</Link>
        </nav>
      </header>

      <main id="utama">
        <section className="landing-hero landing-container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="hero-context">Asisten dokumentasi untuk puskesmas</p>
            <h1 id="hero-title">Fokus ke pasien.<br />Catatannya,<br /><span>biar Steto.</span></h1>
            <p className="hero-description">Percakapan konsultasi jadi awal catatan medis yang rapi. Tinjau drafnya, lengkapi pemeriksaan, lalu putuskan.</p>
            <div className="hero-actions">
              <Link href="/sign-in" className="du-btn du-btn-primary hero-primary">Masuk ke Steto</Link>
              <a href="#contoh" className="du-btn du-btn-outline">Lihat contoh catatan</a>
            </div>
            <p className="hero-footnote">Dari percakapan ke draf. Tetap dengan tinjauan Anda.</p>
          </div>
          <LandingExample />
        </section>

        <section className="workflow-section" id="cara-kerja" aria-labelledby="workflow-title">
          <div className="landing-container workflow-grid">
            <div className="workflow-intro">
              <p className="section-context">Alur yang dirancang</p>
              <h2 id="workflow-title">Satu kunjungan.<br />Catatan yang utuh.</h2>
              <p>Pencatatan mengikuti pekerjaan di ruang periksa, dari persiapan pasien sampai tinjauan tenaga medis.</p>
              <a href="#contoh" className="workflow-example-link">Lihat bentuk draf SOAP</a>
            </div>
            <ol className="workflow-list">
              {workflow.map((item) => (
                <li key={item.number}>
                  <span className="workflow-number" aria-hidden="true">{item.number}</span>
                  <div><div className="workflow-row-heading"><h3>{item.title}</h3><span>{item.role}</span></div><p>{item.body}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="closing-section landing-container" aria-labelledby="closing-title">
          <div className="closing-note">
            <div><h2 id="closing-title">Kenali Steto dari<br />ruang kerja Anda.</h2><p>Masuk dengan akun yang sudah terdaftar.</p></div>
            <Link href="/sign-in" className="du-btn du-btn-neutral">Buka Steto</Link>
          </div>
        </section>
      </main>

      <footer className="landing-footer landing-container">
        <Brand />
        <p>Catatan medis, dimulai dari percakapan.</p>
        <a href="#utama">Kembali ke atas</a>
      </footer>
    </div>
  );
}
