import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  Heart,
  Activity,
  Thermometer,
  Droplets,
  Scale,
  Ruler
} from "lucide-react";

// Mock data vital signs
const vitalSigns = {
  patientName: "Ahmad Sulaiman",
  patientNik: "3171234567890001",
  visitDate: "2026-09-30",
  bloodPressureSystolic: 120,
  bloodPressureDiastolic: 80,
  heartRate: 78,
  temperature: 36.5,
  respiratoryRate: 16,
  weight: 68,
  height: 170,
  oxygenSaturation: 98,
};

export default function VitalPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link 
          href="/app/pasien"
          className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Tanda Vital</h1>
          <p className="text-slate-400">{vitalSigns.patientName} • {vitalSigns.patientNik}</p>
        </div>
      </div>

      {/* Visit Info */}
      <div className="p-4 rounded-xl bg-slate-800/50 border border-white/10">
        <p className="text-sm text-slate-400">Tanggal Kunjungan</p>
        <p className="text-lg text-white font-medium">{vitalSigns.visitDate}</p>
      </div>

      {/* Vital Signs Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Blood Pressure */}
        <div className="p-4 rounded-xl bg-slate-800/50 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-red-400" />
            </div>
            <p className="text-sm text-slate-400">Tekanan Darah</p>
          </div>
          <p className="text-3xl font-bold text-white">
            {vitalSigns.bloodPressureSystolic}/{vitalSigns.bloodPressureDiastolic}
            <span className="text-lg text-slate-400 ml-1">mmHg</span>
          </p>
        </div>

        {/* Heart Rate */}
        <div className="p-4 rounded-xl bg-slate-800/50 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
              <Heart className="w-5 h-5 text-pink-400" />
            </div>
            <p className="text-sm text-slate-400">Nadi</p>
          </div>
          <p className="text-3xl font-bold text-white">
            {vitalSigns.heartRate}
            <span className="text-lg text-slate-400 ml-1">bpm</span>
          </p>
        </div>

        {/* Temperature */}
        <div className="p-4 rounded-xl bg-slate-800/50 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <Thermometer className="w-5 h-5 text-orange-400" />
            </div>
            <p className="text-sm text-slate-400">Suhu</p>
          </div>
          <p className="text-3xl font-bold text-white">
            {vitalSigns.temperature}
            <span className="text-lg text-slate-400 ml-1">°C</span>
          </p>
        </div>

        {/* Respiratory Rate */}
        <div className="p-4 rounded-xl bg-slate-800/50 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <Droplets className="w-5 h-5 text-cyan-400" />
            </div>
            <p className="text-sm text-slate-400">Pernapasan</p>
          </div>
          <p className="text-3xl font-bold text-white">
            {vitalSigns.respiratoryRate}
            <span className="text-lg text-slate-400 ml-1">x/menit</span>
          </p>
        </div>

        {/* Weight */}
        <div className="p-4 rounded-xl bg-slate-800/50 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Scale className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-sm text-slate-400">Berat Badan</p>
          </div>
          <p className="text-3xl font-bold text-white">
            {vitalSigns.weight}
            <span className="text-lg text-slate-400 ml-1">kg</span>
          </p>
        </div>

        {/* Height */}
        <div className="p-4 rounded-xl bg-slate-800/50 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
              <Ruler className="w-5 h-5 text-violet-400" />
            </div>
            <p className="text-sm text-slate-400">Tinggi Badan</p>
          </div>
          <p className="text-3xl font-bold text-white">
            {vitalSigns.height}
            <span className="text-lg text-slate-400 ml-1">cm</span>
          </p>
        </div>
      </div>

      {/* SpO2 */}
      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Saturasi Oksigen</p>
              <p className="text-2xl font-bold text-white">{vitalSigns.oxygenSaturation}%</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm">
            Normal
          </span>
        </div>
      </div>
    </div>
  );
}
