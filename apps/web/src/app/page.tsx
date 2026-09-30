import Link from "next/link";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { Button, buttonVariants } from "@/components/ui/button";

export default function Home() {
  const authReady = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  return (
    <div className="site-shell">
      <header className="site-header wrap">
        <Link href="/" className="wordmark" aria-label="Steto, beranda">steto<span className="wordmark-stop">.</span></Link>
        <nav aria-label="Navigasi utama" className="header-actions">
          {authReady ? <>
            <Show when="signed-out"><SignInButton mode="redirect"><Button variant="outline">Masuk</Button></SignInButton></Show>
            <Show when="signed-in"><Link href="/app" className={buttonVariants()}>Buka aplikasi</Link><UserButton /></Show>
          </> : <span className="setup-label">Akses belum dikonfigurasi</span>}
        </nav>
      </header>
      <main>
        <section className="hero wrap" aria-labelledby="judul">
          <div className="hero-copy">
            <p className="overline">Catatan pemeriksaan puskesmas</p>
            <h1 id="judul">Dokter fokus ke pasien, <em>Steto yang mencatat.</em></h1>
            <p className="hero-lead">Dari percakapan pemeriksaan menjadi draf SOAP dan saran ICD-10. Dokter tetap memeriksa, mengedit, dan menyetujui hasilnya.</p>
            {authReady && <Show when="signed-out"><SignInButton mode="redirect"><Button size="lg">Masuk ke Steto</Button></SignInButton></Show>}
            {authReady && <Show when="signed-in"><Link href="/app" className={buttonVariants({ size: "lg" })}>Buka aplikasi</Link></Show>}
          </div>
          <div className="record-sheet" aria-label="Alur catatan pemeriksaan">
            <div className="sheet-top"><span>Alur kerja</span><span>01 / 03</span></div>
            <div className="sheet-main"><span className="sheet-index">01</span><div><h2>Rekam percakapan</h2><p>Dengan persetujuan pasien.</p></div></div>
            <div className="sheet-row"><span>02</span><div><strong>Tinjau draf</strong><p>Periksa transkrip, SOAP, dan kode ICD-10.</p></div></div>
            <div className="sheet-row"><span>03</span><div><strong>Setujui catatan</strong><p>Dokter memegang keputusan akhir.</p></div></div>
          </div>
        </section>
        <section className="context-band" aria-labelledby="masalah"><div className="wrap context-inner"><h2 id="masalah">Waktu pemeriksaan terbatas. Catatan tetap harus jelas.</h2><p>Steto membantu menyusun catatan dari percakapan agar dokter dapat memusatkan perhatian pada pasien. Setiap keluaran AI adalah draf, bukan keputusan klinis.</p></div></section>
      </main>
      <footer className="wrap site-footer"><span>steto.</span><span>Data simulasi. Bukan alat diagnosis. Integrasi SATUSEHAT menunggu kredensial resmi.</span></footer>
    </div>
  );
}
