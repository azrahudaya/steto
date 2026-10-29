"use client";

import { useState } from "react";
import Link from "next/link";
import { samplePatients, type Patient } from "@/lib/sample-data";
import { Badge } from "@/components/ui/badge";

const SAMPLE_DIALOGUE = [
  { role: "doctor", speaker: "Dokter", text: "Selamat pagi, Bu Siti. Ada keluhan apa yang bisa saya bantu hari ini?" },
  { role: "patient", speaker: "Pasien", text: "Pagi Dok, kepala saya pusing berputar sejak 3 hari lalu. Kadang terasa mual juga kalau bangun dari tidur." },
  { role: "doctor", speaker: "Dokter", text: "Apakah ada riwayat darah tinggi atau sakit maag sebelumnya?" },
  { role: "patient", speaker: "Pasien", text: "Ada maag Dok, suka telat makan. Tapi kalau darah tinggi setahu saya normal." },
  { role: "doctor", speaker: "Dokter", text: "Baik, tensinya tadi 120/80 mmHg, suhu normal 36.6 C. Saya periksa telinga dan keseimbangan sebentar ya." },
  { role: "doctor", speaker: "Dokter", text: "Nanti saya beri obat pereda pusing dan lambung, banyak minum air hangat dan hindari gerakan mendadak." },
];

export function PatientConsultationView({ patientId }: { patientId: string }) {
  const patient: Patient = samplePatients.find((p) => p.id === patientId) || samplePatients[0];

  const [recording, setRecording] = useState(false);
  const [dialogue, setDialogue] = useState(SAMPLE_DIALOGUE);
  const [consentGranted, setConsentGranted] = useState(true);
  const [approved, setApproved] = useState(false);
  const [activeTab, setActiveTab] = useState<"soap" | "fhir">("soap");

  // Editable SOAP state
  const [subjective, setSubjective] = useState(
    "Pasien mengeluh pusing berputar (vertigo) sejak 3 hari yang lalu. Keluhan disertai rasa mual ringan terutama saat perubahan posisi dari tidur ke duduk. Riwayat dispepsia/maag kambuhan bila telat makan. Riwayat hipertensi disangkal."
  );
  const [objective, setObjective] = useState(
    "Keadaan umum: Sedang, Compos Mentis\nTD: 120/80 mmHg | HR: 78 x/menit | RR: 18 x/menit | Suhu: 36.6 C | SpO2: 99%\nPemeriksaan Fisik:\n- Kepala/Leher: Anemis (-), Ikterik (-)\n- THT: Membran timpani intak, sekret (-), nistagmus (-)\n- Abdomen: Nyeri tekan epigastrium ringan (+), bising usus normal."
  );
  const [assessment, setAssessment] = useState(
    "1. Benign Paroxysmal Positional Vertigo (BPPV) / Dizziness (ICD-10: R42)\n2. Dispepsia fungsional (ICD-10: K30)"
  );
  const [plan, setPlan] = useState(
    "1. Betahistine Mesilate 6 mg 3x1 tablet (sesudah makan)\n2. Antasida DOEN 3x1 tablet kunyah (1 jam sebelum makan)\n3. Edukasi manuver Brandt-Daroff di rumah\n4. Edukasi pola makan teratur dan hidrasi cukup\n5. Kontrol ulang 3 hari jika gejala tidak membaik atau timbul muntah hebat"
  );

  const [selectedIcd, setSelectedIcd] = useState<string[]>(["R42", "K30"]);

  function toggleRecord() {
    if (!consentGranted) {
      alert("Persetujuan lisan pasien (informed consent) wajib dikonfirmasi sebelum rekaman dimulai.");
      return;
    }
    setRecording(!recording);
  }

  function handleResetExample() {
    setDialogue(SAMPLE_DIALOGUE);
    setSubjective(
      "Pasien mengeluh pusing berputar (vertigo) sejak 3 hari yang lalu. Keluhan disertai rasa mual ringan terutama saat perubahan posisi dari tidur ke duduk. Riwayat dispepsia/maag kambuhan bila telat makan. Riwayat hipertensi disangkal."
    );
    setObjective(
      "Keadaan umum: Sedang, Compos Mentis\nTD: 120/80 mmHg | HR: 78 x/menit | RR: 18 x/menit | Suhu: 36.6 C | SpO2: 99%\nPemeriksaan Fisik:\n- Kepala/Leher: Anemis (-), Ikterik (-)\n- THT: Membran timpani intak, sekret (-), nistagmus (-)\n- Abdomen: Nyeri tekan epigastrium ringan (+), bising usus normal."
    );
    setAssessment(
      "1. Benign Paroxysmal Positional Vertigo (BPPV) / Dizziness (ICD-10: R42)\n2. Dispepsia fungsional (ICD-10: K30)"
    );
    setPlan(
      "1. Betahistine Mesilate 6 mg 3x1 tablet (sesudah makan)\n2. Antasida DOEN 3x1 tablet kunyah (1 jam sebelum makan)\n3. Edukasi manuver Brandt-Daroff di rumah\n4. Edukasi pola makan teratur dan hidrasi cukup\n5. Kontrol ulang 3 hari jika gejala tidak membaik atau timbul muntah hebat"
    );
    setSelectedIcd(["R42", "K30"]);
    setApproved(false);
  }

  const fhirPayload = {
    resourceType: "Bundle",
    type: "transaction",
    timestamp: new Date().toISOString(),
    entry: [
      {
        resource: {
          resourceType: "Encounter",
          status: approved ? "finished" : "in-progress",
          class: {
            system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
            code: "AMB",
            display: "ambulatory",
          },
          subject: {
            reference: `Patient/${patient.recordNumber}`,
            display: patient.name,
          },
          period: {
            start: new Date().toISOString(),
          },
          serviceProvider: {
            display: "Puskesmas Kecamatan",
          },
        },
      },
      ...selectedIcd.map((code) => ({
        resource: {
          resourceType: "Condition",
          clinicalStatus: {
            coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-clinical", code: "active" }],
          },
          code: {
            coding: [{ system: "http://hl7.org/fhir/sid/icd-10", code, display: code === "R42" ? "Dizziness and giddiness" : "Dyspepsia" }],
          },
          subject: {
            reference: `Patient/${patient.recordNumber}`,
          },
        },
      })),
    ],
  };

  return (
    <div className="container mx-auto max-w-7xl space-y-6 pb-12">
      {/* Top breadcrumb & patient quick bio */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm breadcrumbs mb-1">
            <ul>
              <li><Link href="/app/pasien" className="link link-hover">Daftar Pasien</Link></li>
              <li className="font-semibold text-primary">{patient.name}</li>
            </ul>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">{patient.name}</h1>
            <Badge variant="outline" className="font-mono text-xs">{patient.recordNumber}</Badge>
            <span className="text-sm text-base-content/70">
              {patient.age} tahun &bull; {patient.gender === "F" ? "Perempuan" : "Laki-laki"} &bull; Lahir {patient.birthDate}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handleResetExample} className="btn btn-outline btn-sm">
            Reset Percakapan Contoh
          </button>
          <Link href="/app/pasien" className="btn btn-ghost btn-sm">
            Kembali
          </Link>
        </div>
      </div>

      {/* Vital Signs Banner */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <div className="stat bg-base-100 rounded-lg shadow-sm border border-base-200 p-3">
          <div className="stat-title text-xs">Tekanan Darah</div>
          <div className="stat-value text-lg font-bold text-primary">120/80</div>
          <div className="stat-desc text-xs">mmHg (Normal)</div>
        </div>
        <div className="stat bg-base-100 rounded-lg shadow-sm border border-base-200 p-3">
          <div className="stat-title text-xs">Denyut Nadi</div>
          <div className="stat-value text-lg font-bold">78</div>
          <div className="stat-desc text-xs">kali / menit</div>
        </div>
        <div className="stat bg-base-100 rounded-lg shadow-sm border border-base-200 p-3">
          <div className="stat-title text-xs">Pernapasan</div>
          <div className="stat-value text-lg font-bold">18</div>
          <div className="stat-desc text-xs">kali / menit</div>
        </div>
        <div className="stat bg-base-100 rounded-lg shadow-sm border border-base-200 p-3">
          <div className="stat-title text-xs">Suhu Tubuh</div>
          <div className="stat-value text-lg font-bold">36.6</div>
          <div className="stat-desc text-xs">Derajat Celsius</div>
        </div>
        <div className="stat bg-base-100 rounded-lg shadow-sm border border-base-200 p-3">
          <div className="stat-title text-xs">Saturasi O2</div>
          <div className="stat-value text-lg font-bold text-success">99%</div>
          <div className="stat-desc text-xs">SpO2 normal</div>
        </div>
        <div className="stat bg-base-100 rounded-lg shadow-sm border border-base-200 p-3">
          <div className="stat-title text-xs">Berat / Tinggi</div>
          <div className="stat-value text-lg font-bold">58 kg</div>
          <div className="stat-desc text-xs">TB: 162 cm</div>
        </div>
      </div>

      {/* Main Grid: Left = Consultation audio & transcript; Right = SOAP AI & SATUSEHAT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Audio capture card */}
          <div className="card bg-base-100 shadow-sm border border-base-200">
            <div className="card-body p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">Perekaman Konsultasi</span>
                <span className={`badge ${recording ? "badge-error animate-pulse" : "badge-ghost"} text-xs font-mono`}>
                  {recording ? "MEREKAM..." : "STANDBY"}
                </span>
              </div>

              {/* Informed consent toggle */}
              <label className="flex items-center gap-2 cursor-pointer bg-base-200/60 p-2.5 rounded-md text-xs">
                <input
                  type="checkbox"
                  checked={consentGranted}
                  onChange={(e) => setConsentGranted(e.target.checked)}
                  className="checkbox checkbox-primary checkbox-xs"
                />
                <span className="text-base-content/80">
                  Pasien menyetujui perekaman suara untuk bantuan dokumentasi rekam medis (Informed Consent).
                </span>
              </label>

              {/* Recorder control */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={toggleRecord}
                  className={`btn btn-sm ${recording ? "btn-error" : "btn-primary"} gap-2`}
                >
                  <span className={`inline-block w-2.5 h-2.5 rounded-full ${recording ? "bg-white animate-ping" : "bg-white"}`} />
                  {recording ? "Hentikan Rekam" : "Mulai Rekam Konsultasi"}
                </button>
                <span className="text-xs font-mono text-base-content/60">
                  {recording ? "02:14" : "00:00"}
                </span>
              </div>
            </div>
          </div>

          {/* Transcript card */}
          <div className="card bg-base-100 shadow-sm border border-base-200">
            <div className="card-body p-4 space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="font-semibold text-sm">Transkrip Percakapan</span>
                <span className="text-xs text-base-content/60">{dialogue.length} ucapan terdeteksi</span>
              </div>

              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1 text-sm">
                {dialogue.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg text-xs leading-relaxed ${
                      item.role === "doctor"
                        ? "bg-primary/10 border-l-4 border-primary text-base-content"
                        : "bg-base-200/80 border-l-4 border-base-300 text-base-content"
                    }`}
                  >
                    <div className="font-semibold text-xs mb-1 text-base-content/70">
                      {item.speaker}
                    </div>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): AI SOAP Draft & SATUSEHAT */}
        <div className="lg:col-span-7 space-y-4">
          <div className="card bg-base-100 shadow-sm border border-base-200">
            {/* Tab header */}
            <div className="border-b px-4 pt-3 flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("soap")}
                  className={`px-3 py-2 text-sm font-semibold border-b-2 transition-colors ${
                    activeTab === "soap" ? "border-primary text-primary" : "border-transparent text-base-content/60 hover:text-base-content"
                  }`}
                >
                  Draf Catatan SOAP
                </button>
                <button
                  onClick={() => setActiveTab("fhir")}
                  className={`px-3 py-2 text-sm font-semibold border-b-2 transition-colors ${
                    activeTab === "fhir" ? "border-primary text-primary" : "border-transparent text-base-content/60 hover:text-base-content"
                  }`}
                >
                  Ekspor SATUSEHAT (FHIR)
                </button>
              </div>

              <span className={`badge ${approved ? "badge-success text-white" : "badge-warning"} text-xs font-medium`}>
                {approved ? "Disetujui Dokter" : "Draf AI (Perlu Verifikasi)"}
              </span>
            </div>

            <div className="card-body p-4 space-y-4">
              {activeTab === "soap" ? (
                <>
                  {/* S - Subjective */}
                  <div className="form-control">
                    <label className="label py-1">
                      <span className="label-text font-bold text-xs uppercase tracking-wider text-primary">
                        S &bull; Subjektif (Anamnesis)
                      </span>
                    </label>
                    <textarea
                      rows={3}
                      value={subjective}
                      onChange={(e) => setSubjective(e.target.value)}
                      className="textarea textarea-bordered text-xs leading-relaxed font-sans"
                    />
                  </div>

                  {/* O - Objective */}
                  <div className="form-control">
                    <label className="label py-1">
                      <span className="label-text font-bold text-xs uppercase tracking-wider text-primary">
                        O &bull; Objektif (Pemeriksaan Fisik & Vitals)
                      </span>
                    </label>
                    <textarea
                      rows={4}
                      value={objective}
                      onChange={(e) => setObjective(e.target.value)}
                      className="textarea textarea-bordered text-xs leading-relaxed font-sans font-mono"
                    />
                  </div>

                  {/* A - Assessment */}
                  <div className="form-control">
                    <label className="label py-1">
                      <span className="label-text font-bold text-xs uppercase tracking-wider text-primary">
                        A &bull; Assessment (Diagnosis Klinis)
                      </span>
                    </label>
                    <textarea
                      rows={2}
                      value={assessment}
                      onChange={(e) => setAssessment(e.target.value)}
                      className="textarea textarea-bordered text-xs leading-relaxed font-sans"
                    />
                  </div>

                  {/* ICD-10 Tags */}
                  <div className="space-y-1.5 bg-base-200/50 p-3 rounded-lg border border-base-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-base-content/80">
                        Rekomendasi Kode ICD-10 Otomatis
                      </span>
                      <span className="text-[11px] text-base-content/50">Klik kode untuk pilih/lepas</span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {[
                        { code: "R42", label: "Dizziness and giddiness (Vertigo)" },
                        { code: "K30", label: "Dyspepsia" },
                        { code: "I10", label: "Essential hypertension" },
                        { code: "J00", label: "Acute nasopharyngitis (Common cold)" },
                      ].map((item) => {
                        const isPicked = selectedIcd.includes(item.code);
                        return (
                          <button
                            key={item.code}
                            type="button"
                            onClick={() => {
                              setSelectedIcd(
                                isPicked ? selectedIcd.filter((c) => c !== item.code) : [...selectedIcd, item.code]
                              );
                            }}
                            className={`badge gap-1 cursor-pointer transition-all ${
                              isPicked ? "badge-primary" : "badge-outline opacity-60 hover:opacity-100"
                            }`}
                          >
                            <span className="font-mono font-bold">{item.code}</span>
                            <span className="text-[11px]">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* P - Plan */}
                  <div className="form-control">
                    <label className="label py-1">
                      <span className="label-text font-bold text-xs uppercase tracking-wider text-primary">
                        P &bull; Plan (Tata Laksana, Obat & Rencana Kontrol)
                      </span>
                    </label>
                    <textarea
                      rows={4}
                      value={plan}
                      onChange={(e) => setPlan(e.target.value)}
                      className="textarea textarea-bordered text-xs leading-relaxed font-sans"
                    />
                  </div>

                  {/* Safeguards & Sign-off Footer */}
                  <div className="pt-3 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-xs text-base-content/60">
                      Keputusan medis dan rekam catatan sah tetap berada di tangan dokter pemeriksa.
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setApproved(true);
                          alert("Rekam medis berhasil diverifikasi dan disimpan oleh dokter penanggung jawab.");
                        }}
                        className={`btn btn-sm ${approved ? "btn-success text-white" : "btn-primary"} gap-1.5`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        {approved ? "Catatan Terverifikasi" : "Setujui & Simpan Catatan"}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold">HL7 FHIR R4 Bundle Payload</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(JSON.stringify(fhirPayload, null, 2));
                        alert("Payload FHIR berhasil disalin ke clipboard!");
                      }}
                      className="btn btn-xs btn-outline"
                    >
                      Salin JSON
                    </button>
                  </div>
                  <pre className="bg-base-300/80 p-4 rounded-lg font-mono text-xs overflow-x-auto max-h-[480px]">
                    {JSON.stringify(fhirPayload, null, 2)}
                  </pre>
                  <p className="text-xs text-base-content/60">
                    Standar format data interoperabilitas nasional Kemenkes SATUSEHAT (Profil Encounter & Condition FHIR R4).
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
