"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";

const SYNC_LOGS = [
  {
    id: "ENC-20261029-001",
    patient: "Budi Santoso",
    recordNo: "P-0001",
    resource: "Encounter, Condition, Observation",
    icd: "R42 (Vertigo)",
    timestamp: "29 Okt 2026, 11:42 WIB",
    status: 201,
    statusText: "Created",
  },
  {
    id: "ENC-20261029-002",
    patient: "Siti Aminah",
    recordNo: "P-0002",
    resource: "Encounter, Condition",
    icd: "K30 (Dyspepsia)",
    timestamp: "29 Okt 2026, 10:15 WIB",
    status: 201,
    statusText: "Created",
  },
  {
    id: "ENC-20261028-089",
    patient: "Andi Wijaya",
    recordNo: "P-0003",
    resource: "Encounter, Condition, Observation",
    icd: "I10 (Hipertensi Esensial)",
    timestamp: "28 Okt 2026, 16:30 WIB",
    status: 200,
    statusText: "Updated",
  },
  {
    id: "ENC-20261028-088",
    patient: "Dewi Lestari",
    recordNo: "P-0004",
    resource: "Encounter, Condition",
    icd: "J00 (Nasofaringitis Akut)",
    timestamp: "28 Okt 2026, 14:10 WIB",
    status: 201,
    statusText: "Created",
  },
];

export default function SatusehatDashboardPage() {
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  function handleTestConnection() {
    setTesting(true);
    setTestResult(null);
    setTimeout(() => {
      setTesting(false);
      setTestResult("Berhasil terhubung ke Gateway SATUSEHAT Kemenkes RI (Status: 200 OK, Latensi: 82ms).");
    }, 1200);
  }

  return (
    <div className="container mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader
          title="Integrasi SATUSEHAT"
          description="Status bridging data rekam medis ke ekosistem Kementerian Kesehatan RI (HL7 FHIR R4)."
          sample
        />
        <button
          onClick={handleTestConnection}
          disabled={testing}
          className="btn btn-outline btn-primary btn-sm self-start sm:self-center"
        >
          {testing ? <span className="loading loading-spinner loading-xs"></span> : null}
          {testing ? "Memeriksa Koneksi..." : "Uji Koneksi Kemenkes"}
        </button>
      </div>

      {testResult && (
        <div className="alert alert-success text-sm py-2 px-4 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{testResult}</span>
        </div>
      )}

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-base-100 shadow-sm border border-base-200 p-4">
          <div className="text-xs text-base-content/60 font-medium">Status Interoperabilitas</div>
          <div className="text-xl font-bold text-success flex items-center gap-2 mt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-success inline-block"></span>
            Aktif (Bridging)
          </div>
          <div className="text-xs text-base-content/50 mt-1">HL7 FHIR Standard R4</div>
        </div>

        <div className="card bg-base-100 shadow-sm border border-base-200 p-4">
          <div className="text-xs text-base-content/60 font-medium">Organisasi IHS Kemenkes</div>
          <div className="text-xl font-bold font-mono text-primary mt-1">10000004</div>
          <div className="text-xs text-base-content/50 mt-1">Puskesmas Kecamatan Setiabudi</div>
        </div>

        <div className="card bg-base-100 shadow-sm border border-base-200 p-4">
          <div className="text-xs text-base-content/60 font-medium">Kunjungan Tersinkron</div>
          <div className="text-xl font-bold mt-1">142 Kunjungan</div>
          <div className="text-xs text-success mt-1">100% Sukses tanpa penolakan</div>
        </div>

        <div className="card bg-base-100 shadow-sm border border-base-200 p-4">
          <div className="text-xs text-base-content/60 font-medium">Kepatuhan Regulasi</div>
          <div className="text-xl font-bold text-primary mt-1">PMK 24 / 2022</div>
          <div className="text-xs text-base-content/50 mt-1">Rekam Medis Elektronik Terintegrasi</div>
        </div>
      </div>

      {/* Profil Konfigurasi FHIR */}
      <div className="card bg-base-100 shadow-sm border border-base-200">
        <div className="card-body p-5">
          <h3 className="font-bold text-sm tracking-wide text-base-content/90 mb-3">
            Resource FHIR Terdaftar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-base-200/60 border border-base-200">
              <div className="font-semibold text-primary">Encounter (Kunjungan Rawat Jalan)</div>
              <div className="text-base-content/70 mt-1">
                Mencatat interaksi pasien dan tenaga medis, waktu mulai, ruang poli, dan status penyelesaian.
              </div>
            </div>
            <div className="p-3 rounded-lg bg-base-200/60 border border-base-200">
              <div className="font-semibold text-primary">Condition (Diagnosis ICD-10)</div>
              <div className="text-base-content/70 mt-1">
                Menyimpan diagnosis kerja dan diagnosis akhir dengan kode ICD-10 yang diverifikasi dokter.
              </div>
            </div>
            <div className="p-3 rounded-lg bg-base-200/60 border border-base-200">
              <div className="font-semibold text-primary">Observation (Tanda Vital & Lab)</div>
              <div className="text-base-content/70 mt-1">
                Menyimpan data tekanan darah, nadi, respirasi, dan suhu badan menggunakan kode LOINC.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Log Sinkronisasi Tabel */}
      <div className="card bg-base-100 shadow-sm border border-base-200">
        <div className="card-body p-0">
          <div className="p-4 border-b flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm">Riwayat Pengiriman Transaksi FHIR</h3>
              <p className="text-xs text-base-content/60">Log pengiriman draf SOAP yang disetujui dokter ke server SATUSEHAT.</p>
            </div>
            <span className="badge badge-neutral badge-sm font-mono">{SYNC_LOGS.length} entri</span>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-zebra text-xs">
              <thead>
                <tr>
                  <th>Encounter ID</th>
                  <th>Pasien</th>
                  <th>Resource Dikirim</th>
                  <th>Diagnosis Terdaftar</th>
                  <th>Waktu</th>
                  <th className="text-right">Respon Gateway</th>
                </tr>
              </thead>
              <tbody>
                {SYNC_LOGS.map((log) => (
                  <tr key={log.id}>
                    <td className="font-mono font-medium">{log.id}</td>
                    <td>
                      <div className="font-medium">{log.patient}</div>
                      <div className="text-[11px] text-base-content/50 font-mono">{log.recordNo}</div>
                    </td>
                    <td>{log.resource}</td>
                    <td><Badge variant="outline" className="font-mono">{log.icd}</Badge></td>
                    <td className="text-base-content/70">{log.timestamp}</td>
                    <td className="text-right">
                      <span className="badge badge-success badge-sm font-mono text-white gap-1">
                        {log.status} {log.statusText}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
