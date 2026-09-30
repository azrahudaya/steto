import { BAGIAN, ICD10, type Pasien, type Soap, type Vital } from "./contoh";

const LOINC = "http://loinc.org";
const UCUM = "http://unitsofmeasure.org";

const OBSERVASI: { key: keyof Vital; code: string; display: string; unit: string; ucum: string }[] = [
  { key: "sistol", code: "8480-6", display: "Systolic blood pressure", unit: "mmHg", ucum: "mm[Hg]" },
  { key: "diastol", code: "8462-4", display: "Diastolic blood pressure", unit: "mmHg", ucum: "mm[Hg]" },
  { key: "nadi", code: "8867-4", display: "Heart rate", unit: "/min", ucum: "/min" },
  { key: "suhu", code: "8310-5", display: "Body temperature", unit: "°C", ucum: "Cel" },
  { key: "napas", code: "9279-1", display: "Respiratory rate", unit: "/min", ucum: "/min" },
  { key: "berat", code: "29463-7", display: "Body weight", unit: "kg", ucum: "kg" },
  { key: "tinggi", code: "8302-2", display: "Body height", unit: "cm", ucum: "cm" },
];

type Json = Record<string, unknown>;
export type Bundle = { resourceType: "Bundle"; type: string; entry: { fullUrl: string; resource: Json; request: Json }[] };

function uuid(n: number) {
  return `urn:uuid:5f0c6a4e-8b1d-4c3a-9e2f-${n.toString(16).padStart(12, "0")}`;
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function susunBundle(input: {
  pasien: Pasien;
  vital: Partial<Vital>;
  soap: Soap;
  icd: string;
  waktu: string;
  penulis: string;
}): Bundle {
  const { pasien, vital, soap, icd, waktu, penulis } = input;
  const pid = uuid(1);
  const eid = uuid(2);
  const entri = (fullUrl: string, resource: Json) => ({
    fullUrl,
    resource,
    request: { method: "POST", url: resource.resourceType as string },
  });

  const observasi = OBSERVASI.map((o, i) =>
    entri(uuid(16 + i), {
      resourceType: "Observation",
      status: "final",
      category: [
        {
          coding: [
            { system: "http://terminology.hl7.org/CodeSystem/observation-category", code: "vital-signs", display: "Vital Signs" },
          ],
        },
      ],
      code: { coding: [{ system: LOINC, code: o.code, display: o.display }] },
      subject: { reference: pid },
      encounter: { reference: eid },
      effectiveDateTime: waktu,
      valueQuantity: { value: vital[o.key] ?? null, unit: o.unit, system: UCUM, code: o.ucum },
    }),
  );

  return {
    resourceType: "Bundle",
    type: "transaction",
    entry: [
      entri(pid, {
        resourceType: "Patient",
        identifier: [{ use: "official", system: "https://fhir.kemkes.go.id/id/nik", value: pasien.nik }],
        name: [{ use: "official", text: pasien.nama }],
        gender: pasien.jk === "L" ? "male" : "female",
        birthDate: pasien.lahir,
      }),
      entri(eid, {
        resourceType: "Encounter",
        status: "finished",
        class: { system: "http://terminology.hl7.org/CodeSystem/v3-ActCode", code: "AMB", display: "ambulatory" },
        subject: { reference: pid, display: pasien.nama },
        period: { start: waktu, end: waktu },
      }),
      ...observasi,
      entri(uuid(3), {
        resourceType: "Condition",
        clinicalStatus: {
          coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-clinical", code: "active" }],
        },
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/condition-category",
                code: "encounter-diagnosis",
                display: "Encounter Diagnosis",
              },
            ],
          },
        ],
        code: {
          coding: [{ system: "http://hl7.org/fhir/sid/icd-10", code: icd, display: ICD10.find((x) => x.kode === icd)?.judul }],
        },
        subject: { reference: pid },
        encounter: { reference: eid },
        recordedDate: waktu,
      }),
      entri(uuid(4), {
        resourceType: "Composition",
        status: "final",
        type: { coding: [{ system: LOINC, code: "11506-3", display: "Progress note" }] },
        subject: { reference: pid },
        encounter: { reference: eid },
        date: waktu,
        author: [{ display: penulis }],
        title: "Catatan SOAP",
        section: BAGIAN.map((b) => ({
          title: b.judul,
          text: {
            status: "generated",
            div: `<div xmlns="http://www.w3.org/1999/xhtml">${escapeHtml(soap[b.key].map((k) => k.teks).join(" "))}</div>`,
          },
        })),
      }),
    ],
  };
}

function kumpulkanRujukan(node: unknown, out: string[]) {
  if (Array.isArray(node)) node.forEach((n) => kumpulkanRujukan(n, out));
  else if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) {
      if (k === "reference" && typeof v === "string") out.push(v);
      else kumpulkanRujukan(v, out);
    }
  }
}

export type Cek = { label: string; ok: boolean };

export function validasiBundle(bundle: Bundle): Cek[] {
  const urls = bundle.entry.map((e) => e.fullUrl);
  const rujukan: string[] = [];
  kumpulkanRujukan(bundle.entry.map((e) => e.resource), rujukan);
  const jenis = (t: string) => bundle.entry.filter((e) => e.resource.resourceType === t).map((e) => e.resource);
  const nik = (jenis("Patient")[0]?.identifier as { value?: string }[] | undefined)?.[0]?.value ?? "";
  const kode = (jenis("Condition")[0]?.code as { coding?: { code?: string }[] } | undefined)?.coding?.[0]?.code ?? "";
  const vital = jenis("Observation").filter((o) => typeof (o.valueQuantity as { value?: unknown })?.value === "number");
  const bagian = (jenis("Composition")[0]?.section as { text?: { div?: string } }[] | undefined) ?? [];

  return [
    { label: "Bundle bertipe transaction", ok: bundle.resourceType === "Bundle" && bundle.type === "transaction" },
    { label: "Setiap entri punya fullUrl unik", ok: urls.every((u) => u.startsWith("urn:uuid:")) && new Set(urls).size === urls.length },
    { label: "Semua rujukan antar-resource ditemukan", ok: rujukan.length > 0 && rujukan.every((r) => urls.includes(r)) },
    { label: "NIK pasien 16 digit", ok: /^\d{16}$/.test(nik) },
    { label: "Tujuh tanda vital berisi angka", ok: vital.length === 7 },
    { label: "Kode ICD-10 ada di daftar Steto", ok: ICD10.some((i) => i.kode === kode) },
    {
      label: "Keempat bagian SOAP terisi",
      ok: bagian.length === 4 && bagian.every((s) => (s.text?.div ?? "").replace(/<[^>]+>/g, "").trim().length > 0),
    },
  ];
}
