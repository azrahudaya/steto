export type Gender = "F" | "M";

export type Patient = {
  id: string;
  name: string;
  recordNumber: string;
  birthDate: string;
  age: number;
  gender: Gender;
  phone: string;
  address: string;
};

export const samplePatients: Patient[] = [
  {
    id: "1",
    name: "Budi Santoso",
    recordNumber: "P-0001",
    birthDate: "1999-03-12",
    age: 27,
    gender: "M",
    phone: "081234567890",
    address: "Jl. Merdeka No. 123",
  },
  {
    id: "2",
    name: "Siti Aminah",
    recordNumber: "P-0002",
    birthDate: "1995-06-25",
    age: 31,
    gender: "F",
    phone: "081234567891",
    address: "Jl. Pahlawan No. 45",
  },
  {
    id: "3",
    name: "Andi Wijaya",
    recordNumber: "P-0003",
    birthDate: "2000-08-08",
    age: 26,
    gender: "M",
    phone: "081234567892",
    address: "Jl. Sudirman No. 67",
  },
  {
    id: "4",
    name: "Dewi Lestari",
    recordNumber: "P-0004",
    birthDate: "1998-01-15",
    age: 28,
    gender: "F",
    phone: "081234567893",
    address: "Jl. Asia Afrika No. 89",
  },
  {
    id: "5",
    name: "Eko Pratomo",
    recordNumber: "P-0005",
    birthDate: "2001-11-30",
    age: 24,
    gender: "M",
    phone: "081234567894",
    address: "Jl. Imam Bonjol No. 101",
  },
];

export function formatGender(gender: Gender): string {
  return gender === "F" ? "Female" : "Male";
}

export function formatAge(age: number): string {
  return `${age} yr`;
}