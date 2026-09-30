import Image from "next/image";
import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { 
  Stethoscope, 
  Mic, 
  FileText, 
  Shield, 
  Users, 
  Zap,
  CheckCircle,
  ArrowRight 
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Steto" width={32} height={12} className="h-8 w-auto" />
            <span className="text-xl font-semibold text-white">Steto</span>
          </Link>
          <div className="flex items-center gap-4">
            <SignInButton mode="modal">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10">
                Masuk
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button className="bg-white text-slate-900 hover:bg-slate-100">
                Mulai Gratis
              </Button>
            </SignInButton>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-8">
            <Zap className="w-4 h-4" />
            <span>Dokumentasi medis 10x lebih cepat</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Dokter fokus ke pasien,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Steto yang mencatat
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Rekam percakapan konsultasi, dapatkan draf SOAP dan saran kode ICD-10 
            secara otomatis. Siap integrasi dengan SATUSEHAT.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignInButton mode="modal">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 h-12 text-base">
                Coba Sekarang
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </SignInButton>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 h-12">
              Lihat Demo
            </Button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Cara Kerja
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-xl mx-auto">
            Tiga langkah sederhana untuk dokumentasi medis yang lebih efisien
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative p-6 rounded-2xl bg-slate-800/50 border border-white/5 hover:border-emerald-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                <Mic className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">1. Rekam</h3>
              <p className="text-slate-400">
                Tekan tombol rekam saat konsultasi dengan pasien. Steto mendengarkan dan mentranskrip percakapan.
              </p>
            </div>

            <div className="relative p-6 rounded-2xl bg-slate-800/50 border border-white/5 hover:border-emerald-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">2. Tinjau</h3>
              <p className="text-slate-400">
                AI menghasilkan draf SOAP lengkap dengan saran kode ICD-10. Edit sesuai kebutuhan.
              </p>
            </div>

            <div className="relative p-6 rounded-2xl bg-slate-800/50 border border-white/5 hover:border-emerald-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">3. Kirim</h3>
              <p className="text-slate-400">
                Simpan ke SATUSEHAT dengan satu klik. Tercatat rapi dan siap audit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Fitur Utama
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Stethoscope, title: "Transkripsi Medis", desc: "AI yang memahami terminologi medis Indonesia" },
              { icon: FileText, title: "Draf SOAP Otomatis", desc: "Subjektif, Objektif, Assessment, Plan dalam hitungan detik" },
              { icon: CheckCircle, title: "Saran ICD-10", desc: "Rekomendasi kode diagnosis berdasarkan percakapan" },
              { icon: Shield, title: "Integrasi SATUSEHAT", desc: "Kirim ke Kemenkes dengan format FHIR standar" },
              { icon: Users, title: "Multi-Tenancy", desc: "Satu aplikasi untuk seluruh Puskesmas di Indonesia" },
              { icon: Zap, title: "Real-time", desc: "Hasil transkrip muncul saat konsultasi berlangsung" },
            ].map((f, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                  <f.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">{f.title}</h3>
                  <p className="text-sm text-slate-400">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Siap memulai?
          </h2>
          <p className="text-slate-400 mb-8">
            Daftar gratis dan mulai gunakan Steto di Puskesmas Anda hari ini.
          </p>
          <SignInButton mode="modal">
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 h-12">
              Mulai Gratis
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </SignInButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Steto" width={24} height={9} className="h-6 w-auto" />
            <span className="text-slate-400 text-sm">© 2026 Steto</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-400">
            <Link href="/privasi" className="hover:text-white transition-colors">Privasi</Link>
            <Link href="/ketentuan" className="hover:text-white transition-colors">Ketentuan</Link>
            <Link href="https://github.com/azrahudaya/steto" className="hover:text-white transition-colors">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
