import Link from "next/link";
import { type Pasien } from "@/lib/contoh";

export function PasienTable({ pasien }: { pasien: Pasien[] }) {
  if (pasien.length === 0) {
    return (
      <div className="alert alert-info">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
        <span>Tidak ada pasien ditemukan.</span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Nama</th>
            <th>NIK</th>
            <th>Usia</th>
            <th>Jenis Kelamin</th>
            <th>Telp</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {pasien.map((p) => (
            <tr key={p.id}>
              <td className="font-medium">{p.nama}</td>
              <td>{p.nik}</td>
              <td>{p.usia} tahun</td>
              <td>{p.jenisKelamin === "L" ? "Laki-laki" : "Perempuan"}</td>
              <td>{p.telp}</td>
              <td>
                <Link href={`/app/pasien/${p.id}`} className="btn btn-primary btn-sm">
                  Kunjungi
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
