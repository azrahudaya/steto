import { PageHeader } from "@/components/page-header";
import { PasienTable } from "@/components/pasien-table";
import { mockPasien } from "@/lib/contoh";

export default function PasienPage() {
  return (
    <div className="container mx-auto max-w-6xl">
      <PageHeader title="Daftar Pasien" description="Kelola dan akses data pasien puskesmas" />

      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Cari pasien</span>
              </label>
              <input type="search" placeholder="Nama atau NIK" className="input input-bordered w-full" />
            </div>
            <button className="btn btn-primary mt-6 sm:mt-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              Tambah Pasien
            </button>
          </div>

          <PasienTable pasien={mockPasien} />
        </div>
      </div>
    </div>
  );
}
