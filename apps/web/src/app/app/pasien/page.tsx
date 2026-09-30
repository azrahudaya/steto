import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Search,
  MoreHorizontal,
  Phone,
  Calendar
} from "lucide-react";

// Mock data pasien
const patients = [
  { id: 1, name: "Ahmad Sulaiman", nik: "3171234567890001", dob: "1985-03-15", phone: "081234567890", lastVisit: "2026-09-28" },
  { id: 2, name: "Siti Aminah", nik: "3171234567890002", dob: "1990-07-22", phone: "081234567891", lastVisit: "2026-09-27" },
  { id: 3, name: "Budi Santoso", nik: "3171234567890003", dob: "1978-11-08", phone: "081234567892", lastVisit: "2026-09-25" },
  { id: 4, name: "Dewi Lestari", nik: "3171234567890004", dob: "1995-02-14", phone: "081234567893", lastVisit: "2026-09-20" },
  { id: 5, name: "Rudi Hermawan", nik: "3171234567890005", dob: "1982-09-30", phone: "081234567894", lastVisit: "2026-09-18" },
];

export default function PasienPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Daftar Pasien</h1>
          <p className="text-slate-400">Kelola data pasien puskesmas</p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-400 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Pasien
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          type="text" 
          placeholder="Cari nama atau NIK..."
          className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
        />
      </div>

      {/* Patient List */}
      <div className="bg-slate-800/50 border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-400">Nama</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-400">NIK</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-400">Tanggal Lahir</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-slate-400">Kunjungan Terakhir</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-slate-400">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm font-medium">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-medium">{patient.name}</p>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Phone className="w-3 h-3" />
                          {patient.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-300 font-mono text-sm">{patient.nik}</td>
                  <td className="px-4 py-3 text-slate-300">{patient.dob}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-slate-300">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {patient.lastVisit}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link 
                      href={`/app/pasien/${patient.id}/vital`}
                      className="text-emerald-400 hover:text-emerald-300 text-sm"
                    >
                      Lihat
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
