import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Stethoscope, 
  FileText, 
  Settings,
  Plus,
  Activity
} from "lucide-react";

export default async function AppHome() {
  const { orgId } = await auth();
  if (!orgId) redirect("/app/pilih-puskesmas");
  
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <p className="text-emerald-400 text-sm font-medium mb-1">Ruang Kerja</p>
        <h1 className="text-2xl font-bold text-white">Selamat datang di Steto</h1>
        <p className="text-slate-400 mt-1">
          Ruang kerja untuk mencatat kunjungan pasien.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link 
          href="/app/pasien" 
          className="group p-6 rounded-xl bg-slate-800/50 border border-white/10 hover:border-emerald-500/30 transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
            <Users className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="font-medium text-white mb-1">Daftar Pasien</h3>
          <p className="text-sm text-slate-400">Kelola data pasien puskesmas</p>
        </Link>

        <Link 
          href="/app/rekam" 
          className="group p-6 rounded-xl bg-slate-800/50 border border-white/10 hover:border-cyan-500/30 transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
            <Stethoscope className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="font-medium text-white mb-1">Rekam Konsultasi</h3>
          <p className="text-sm text-slate-400">Catat kunjungan baru</p>
        </Link>

        <Link 
          href="/app/soap" 
          className="group p-6 rounded-xl bg-slate-800/50 border border-white/10 hover:border-violet-500/30 transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center mb-4 group-hover:bg-violet-500/20 transition-colors">
            <FileText className="w-5 h-5 text-violet-400" />
          </div>
          <h3 className="font-medium text-white mb-1">Draf SOAP</h3>
          <p className="text-sm text-slate-400">Tinjau hasil transkripsi</p>
        </Link>

        <Link 
          href="/app/organisasi" 
          className="group p-6 rounded-xl bg-slate-800/50 border border-white/10 hover:border-slate-500/30 transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-slate-500/10 flex items-center justify-center mb-4 group-hover:bg-slate-500/20 transition-colors">
            <Settings className="w-5 h-5 text-slate-400" />
          </div>
          <h3 className="font-medium text-white mb-1">Pengaturan</h3>
          <p className="text-sm text-slate-400">Kelola organisasi</p>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-800/50 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">24</p>
              <p className="text-sm text-slate-400">Kunjungan hari ini</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-slate-800/50 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">156</p>
              <p className="text-sm text-slate-400">Pasien terdaftar</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-slate-800/50 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">89</p>
              <p className="text-sm text-slate-400">SOAP selesai</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
