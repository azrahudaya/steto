import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Lightbulb
} from "lucide-react";

// Mock transkrip
const transcript = `Dokter: Selamat pagi, silakan duduk. Ada keluhan apa hari ini?
Pasien: Selamat pagi dok. Saya sudah 3 hari ini batuk terus, kadang batuknya ada lendirnya.
Dokter: Batuknya sudah berapa lama? Ada demam?
Pasien: Sudah 3 hari dok. Demam juga kadang-kadang, terutama malem.
Dokter: Pernah minum obat apa?
Pasien: Sudah minum obat batuk dari warung tapi tidak sembuh-sembuh dok.
Dokter: Baik, saya akan periksa. *pemeriksaan fisik*`;

// Mock SOAP
const soap = {
  subjective: "Pasien laki-laki usia 40 tahun datang dengan keluhan batuk sejak 3 hari yang lalu. Batuk berlendir, demam terutama malam hari. Sudah minum obat batuk dari warung tapi tidak ada perbaikan.",
  objective: "Kesadaran kompos mentis. TD: 120/80 mmHg, Nadi: 78x/menit, Suhu: 37.5°C, RR: 18x/menit. Pemeriksaan paru: vesikuler, tidak ada ronki. Tenggorokan hiperemis ringan.",
  assessment: "Bronchitis akut",
  plan: "1. Ambroxol 30mg 3x1 tab\n2. Paracetamol 500mg 3x1 tab (jika demam)\n3. Minum air putih minimal 8 gelas/hari\n4. Kontrol 3 hari lagi jika tidak membaik"
};

// Highlighted sentences (for demo)
const highlightedInTranscript = ["Batuk berlendir, demam terutama malam hari."];
const highlightedInSOAP = ["Bronchitis akut"];

export default function SOAPPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link 
          href="/app"
          className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Tinjau SOAP</h1>
          <p className="text-slate-400">Ahmad Sulaiman • 30 Sep 2026</p>
        </div>
      </div>

      {/* Main content */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Transcript */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Transkrip</h2>
          <div className="p-4 rounded-xl bg-slate-800/50 border border-white/10 font-mono text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
            {transcript.split('\n').map((line, i) => (
              <div key={i} className="mb-2">
                {line.startsWith('Dokter:') ? (
                  <span className="text-emerald-400">{line}</span>
                ) : line.startsWith('Pasien:') ? (
                  <span className="text-cyan-400">{line}</span>
                ) : (
                  <span className="text-slate-400 italic">{line}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: SOAP */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Draf SOAP</h2>
          
          {/* Subjective */}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-cyan-500/20 text-cyan-400">S</span>
              <span className="text-sm font-medium text-white">Subjektif</span>
            </div>
            <p className="text-sm text-slate-300">{soap.subjective}</p>
          </div>

          {/* Objective */}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/20 text-emerald-400">O</span>
              <span className="text-sm font-medium text-white">Objektif</span>
            </div>
            <p className="text-sm text-slate-300">{soap.objective}</p>
          </div>

          {/* Assessment */}
          <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-yellow-500/20 text-yellow-400">A</span>
              <span className="text-sm font-medium text-white">Assessment</span>
              <AlertTriangle className="w-4 h-4 text-yellow-400 ml-auto" />
            </div>
            <p className="text-sm text-white font-medium">{soap.assessment}</p>
            <p className="text-xs text-yellow-400 mt-1">Perlu verifikasi kode ICD-10</p>
          </div>

          {/* Plan */}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-violet-500/20 text-violet-400">P</span>
              <span className="text-sm font-medium text-white">Plan</span>
            </div>
            <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans">{soap.plan}</pre>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Link href="/app/soap/icd">
          <Button className="bg-emerald-500 hover:bg-emerald-400 text-white">
            Pilih ICD-10
          </Button>
        </Link>
      </div>
    </div>
  );
}
