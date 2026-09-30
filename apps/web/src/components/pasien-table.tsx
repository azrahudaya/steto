import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { type Patient, formatAge, formatGender } from "@/lib/sample-data";

export function PatientTable({ patients }: { patients: Patient[] }) {
  if (patients.length === 0) {
    return (
      <div className="alert alert-info" role="status">
        <span>No patients yet. Add a patient to start a visit.</span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Name</th>
            <th>Record</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Phone</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id}>
              <td className="font-medium">{p.name}</td>
              <td><Badge variant="outline" className="font-mono">{p.recordNumber}</Badge></td>
              <td>{formatAge(p.age)}</td>
              <td>{formatGender(p.gender)}</td>
              <td>{p.phone}</td>
              <td className="text-right">
                <Link href={`/app/pasien/${p.id}`} className="btn btn-primary btn-sm">
                  Open
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}