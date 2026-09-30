import { PageHeader } from "@/components/page-header";
import { PatientTable } from "@/components/pasien-table";
import { Input } from "@/components/ui/input";
import { samplePatients } from "@/lib/sample-data";

export default function PatientsPage() {
  return (
    <div className="container mx-auto max-w-6xl">
      <PageHeader title="Patients" description="Search, open, and start visits." sample />

      <div className="card bg-base-100 shadow-sm">
        <div className="card-body gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="form-control flex-1">
              <label htmlFor="search" className="label-text text-sm font-medium">Search patients</label>
              <Input id="search" type="search" placeholder="Name or record number" />
            </div>
            <button className="btn btn-primary sm:w-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              Add patient
            </button>
          </div>

          <PatientTable patients={samplePatients} />
        </div>
      </div>
    </div>
  );
}