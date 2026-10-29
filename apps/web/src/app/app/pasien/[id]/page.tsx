import { samplePatients } from "@/lib/sample-data";
import { PatientConsultationView } from "./client";

export function generateStaticParams() {
  return samplePatients.map((p) => ({ id: p.id }));
}

export default async function PatientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PatientConsultationView patientId={id} />;
}
