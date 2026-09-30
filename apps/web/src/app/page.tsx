import Link from "next/link";
import { Show, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

// Clerk <Show> reads the session on the server, so this page renders per request.
export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <div className="min-h-screen bg-base-200 font-sans">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Steto</h1>
        <p className="text-xl md:text-2xl text-base-content/80 mb-8">
          Asisten rekam medis puskesmas: percakapan pemeriksaan jadi draf SOAP dan saran kode ICD-10.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <SignInButton mode="modal">
            <Button size="lg" className="btn-primary">
              Masuk
            </Button>
          </SignInButton>
          <Button size="lg" variant="outline">
            Daftar
          </Button>
        </div>
      </section>

      {/* Cara Kerja */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Cara Kerja</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="text-4xl mb-4">🎤</div>
              <h3 className="text-xl font-bold mb-2">1. Rekam Percakapan</h3>
              <p className="text-base-content/70">Dokter merekam percakapan konsultasi dengan pasien.</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold mb-2">2. AI Membuat SOAP</h3>
              <p className="text-base-content/70">AI mentranskrip dan membuat draf SOAP serta saran ICD-10.</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-2">3. Dokter Menyetujui</h3>
              <p className="text-base-content/70">Dokter meninjau dan menyetujui dokumen untuk dikirim ke SATUSEHAT.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fitur Utama */}
      <section className="container mx-auto px-4 py-16 bg-base-100 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-12">Fitur Utama</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary text-primary-content flex items-center justify-center shrink-0">
              📱
            </div>
            <div>
              <h3 className="font-bold text-lg">Mobile Friendly</h3>
              <p className="text-base-content/70 mt-1">Akses dari mana saja, kapan saja.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary text-primary-content flex items-center justify-center shrink-0">
              🤖
            </div>
            <div>
              <h3 className="font-bold text-lg">AI Assistant</h3>
              <p className="text-base-content/70 mt-1">Draf SOAP dan ICD-10 otomatis.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary text-primary-content flex items-center justify-center shrink-0">
              📤
            </div>
            <div>
              <h3 className="font-bold text-lg">SATUSEHAT</h3>
              <p className="text-base-content/70 mt-1">Integrasi dengan sistem kesehatan nasional.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Siap Mencoba?</h2>
        <p className="text-lg text-base-content/70 mb-8">Mulai menggunakan Steto hari ini untuk mempermudah pekerjaan Anda.</p>
        <SignInButton mode="modal">
          <Button size="lg" className="btn-primary">
            Mulai Sekarang
          </Button>
        </SignInButton>
      </section>

      {/* Footer */}
      <footer className="bg-base-300 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-base-content/70">© 2026 Steto. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
