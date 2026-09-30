"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Mic,
  Square,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function RekamPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [hasConsent, setHasConsent] = useState(true);
  const [seconds, setSeconds] = useState(0);

  const toggleRecording = () => {
    if (!isRecording) {
      // Start recording
      setIsRecording(true);
      const interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
      // In real app, would clear interval on stop
    } else {
      setIsRecording(false);
      setSeconds(0);
    }
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-2">Rekam Konsultasi</h1>
        <p className="text-slate-400">Rekam percakapan dengan pasien untuk dibuatkan draf SOAP</p>
      </div>

      {/* Consent */}
      <div className="p-6 rounded-xl bg-slate-800/50 border border-white/10">
        <div className="flex items-start gap-4">
          <button 
            onClick={() => setHasConsent(!hasConsent)}
            className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 ${
              hasConsent 
                ? "bg-emerald-500 border-emerald-500" 
                : "border-white/20 bg-transparent"
            }`}
          >
            {hasConsent && <CheckCircle className="w-4 h-4 text-white" />}
          </button>
          <div>
            <p className="text-white font-medium">Persetujuan Pasien</p>
            <p className="text-sm text-slate-400 mt-1">
              Saya menyetujui perekaman konsultasi untuk keperluan dokumentasi medis. 
              Data akan disimpan secara aman dan hanya digunakan untuk keperluan kesehatan.
            </p>
          </div>
        </div>
      </div>

      {/* Recording Button */}
      <div className="flex flex-col items-center gap-6">
        {isRecording ? (
          <>
            {/* Recording indicator */}
            <div className="flex items-center gap-3 text-red-400">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className="text-lg font-mono">{formatTime(seconds)}</span>
            </div>

            {/* Stop button */}
            <button
              onClick={toggleRecording}
              className="w-32 h-32 rounded-full bg-red-500 hover:bg-red-400 flex items-center justify-center transition-colors"
            >
              <Square className="w-12 h-12 text-white" />
            </button>
            <p className="text-slate-400">Sentuh untuk berhenti</p>
          </>
        ) : (
          <>
            {/* Start button */}
            <button
              onClick={toggleRecording}
              disabled={!hasConsent}
              className={`w-32 h-32 rounded-full flex items-center justify-center transition-colors ${
                hasConsent 
                  ? "bg-emerald-500 hover:bg-emerald-400" 
                  : "bg-slate-700 cursor-not-allowed"
              }`}
            >
              <Mic className="w-12 h-12 text-white" />
            </button>
            <p className={hasConsent ? "text-slate-400" : "text-slate-500"}>
              {hasConsent ? "Sentuh untuk mulai merekam" : "Centang persetujuan terlebih dahulu"}
            </p>
          </>
        )}
      </div>

      {/* Info */}
      <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-sm text-slate-300">
            <p className="font-medium text-cyan-400 mb-1">Tips perekaman</p>
            <ul className="space-y-1 text-slate-400">
              <li>• Pastikan lingkungan tidak terlalu berisik</li>
              <li>• Bicara dengan jelas dan santai</li>
              <li>• Sebutkan gejala dan riwayat pasien secara lengkap</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
