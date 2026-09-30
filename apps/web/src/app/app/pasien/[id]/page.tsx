import { redirect } from "next/navigation";

export default async function KunjunganPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/app/pasien/${encodeURIComponent(id)}/vital`);
}
