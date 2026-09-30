import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  CheckCircle,
  Copy,
  Download
} from "lucide-react";

// Mock FHIR Bundle
const fhirBundle = {
  "resourceType": "Bundle",
  "type": "document",
  "timestamp": "2026-09-30T10:30:00+07:00",
  "entry": [
    {
      "resource": {
        "resourceType": "Patient",
        "id": "patient-001",
        "identifier": [
          {
            "system": "urn:oid:2.16.840.1.113883.4.1",
            "value": "3171234567890001"
          }
        ],
        "name": [
          {
            "use": "official",
            "text": "Ahmad Sulaiman"
          }
        ],
        "gender": "male",
        "birthDate": "1985-03-15"
      }
    },
    {
      "resource": {
        "resourceType": "Encounter",
        "id": "encounter-001",
        "status": "finished",
        "class": {
          "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
          "code": "AMB",
          "display": "ambulatory"
        },
        "subject": {
          "reference": "Patient/patient-001"
        },
        "period": {
          "start": "2026-09-30T10:00:00+07:00",
          "end": "2026-09-30T10:30:00+07:00"
        }
      }
    },
    {
      "resource": {
        "resourceType": "Condition",
        "id": "condition-001",
        "clinicalStatus": {
          "coding": [
            {
              "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
              "code": "active"
            }
          ]
        },
        "code": {
          "coding": [
            {
              "system": "http://hl7.org/fhir/sid/icd-10",
              "code": "J20.9",
              "display": "Acute bronchitis, unspecified"
            }
          ]
        },
        "subject": {
          "reference": "Patient/patient-001"
        }
      }
    }
  ]
};

export default function FHIRPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link 
          href="/app/soap/icd"
          className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Siap SATUSEHAT</h1>
          <p className="text-slate-400">Bundle FHIR untuk dikirim ke Kemenkes</p>
        </div>
      </div>

      {/* Validation Status */}
      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <div>
            <p className="text-white font-medium">Bundle FHIR Valid</p>
            <p className="text-sm text-slate-400">Semua field required terisi dan sesuai format</p>
          </div>
        </div>
      </div>

      {/* FHIR Bundle */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">FHIR Bundle</h2>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              <Copy className="w-4 h-4 mr-2" />
              Salin
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              <Download className="w-4 h-4 mr-2" />
              Unduh
            </Button>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/50 border border-white/10 overflow-auto max-h-[500px]">
          <pre className="text-sm text-slate-300 font-mono whitespace-pre-wrap">
            {JSON.stringify(fhirBundle, null, 2)}
          </pre>
        </div>
      </div>

      {/* Resources Summary */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-800/50 border border-white/10">
          <p className="text-sm text-slate-400 mb-1">Patient</p>
          <p className="text-white font-medium">Ahmad Sulaiman</p>
          <p className="text-xs text-slate-500 mt-1">NIK: 3171...0001</p>
        </div>
        <div className="p-4 rounded-xl bg-slate-800/50 border border-white/10">
          <p className="text-sm text-slate-400 mb-1">Encounter</p>
          <p className="text-white font-medium">Kunjungan Rawat Jalan</p>
          <p className="text-xs text-slate-500 mt-1">30 Sep 2026, 10:00</p>
        </div>
        <div className="p-4 rounded-xl bg-slate-800/50 border border-white/10">
          <p className="text-sm text-slate-400 mb-1">Condition</p>
          <p className="text-white font-medium">J20.9 - Bronchitis akut</p>
          <p className="text-xs text-slate-500 mt-1">Status: Active</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Button className="bg-emerald-500 hover:bg-emerald-400 text-white">
          Kirim ke SATUSEHAT
        </Button>
      </div>
    </div>
  );
}
