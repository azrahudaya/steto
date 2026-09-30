import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  CheckCircle,
  Info
} from "lucide-react";

// Mock ICD-10 suggestions
const icdSuggestions = [
  {
    code: "J20.9",
    name: "Bronchitis akut, tidak spesifik",
    reason: "Gejala batuk, demam, dan produksi lendir sesuai dengan bronchitis akut",
    confidence: "Tinggi"
  },
  {
    code: "J40",
    name: "Bronchitis, tidak spesifik sebagai akut atau kronis",
    reason: "Alternatif jika perjalanan penyakit belum jelas akut atau kronis",
    confidence: "Sedang"
  },
  {
    code: "J06.9",
    name: "Infeksi saluran pernapasan atas akut, tidak spesifik",
    reason: "Jika gejala lebih dominan di saluran napas atas dengan hiperemis tenggorokan",
    confidence: "Rendah"
  }
];

export default function ICDPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link 
          href="/app/soap"
          className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Pilih Kode ICD-10</h1>
          <p className="text-slate-400">Saran diagnosis berdasarkan percakapan</p>
        </div>
      </div>

      {/* Assessment context */}
      <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
        <p className="text-sm text-slate-400 mb-1">Assessment saat ini</p>
        <p className="text-lg text-white font-medium">Bronchitis akut</p>
      </div>

      {/* ICD Suggestions */}
      <div className="space-y-4">
        <p className="text-sm text-slate-400">Pilih kode ICD-10 yang paling sesuai:</p>
        
        {icdSuggestions.map((suggestion, index) => (
          <div 
            key={suggestion.code}
            className={`p-4 rounded-xl border transition-colors cursor-pointer ${
              index === 0 
                ? "bg-emerald-500/10 border-emerald-500/30" 
                : "bg-slate-800/50 border-white/10 hover:border-white/20"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-lg bg-slate-900/50 text-white font-mono font-bold">
                    {suggestion.code}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    suggestion.confidence === "Tinggi" 
                      ? "bg-emerald-500/20 text-emerald-400"
                      : suggestion.confidence === "Sedang"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-slate-500/20 text-slate-400"
                  }`}>
                    {suggestion.confidence}
                  </span>
                </div>
                <p className="text-white font-medium mb-1">{suggestion.name}</p>
                <p className="text-sm text-slate-400">{suggestion.reason}</p>
              </div>
              {index === 0 && (
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-800/50 border border-white/10">
        <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
        <p className="text-sm text-slate-400">
          Saran ICD-10 dihasilkan oleh AI berdasarkan gejala dan temuan klinis. 
          Pastikan untuk memverifikasi keakuratan kode sebelum menyimpan.
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Link href="/app/soap/fhir">
          <Button className="bg-emerald-500 hover:bg-emerald-400 text-white">
            Lanjut ke SATUSEHAT
          </Button>
        </Link>
      </div>
    </div>
  );
}
