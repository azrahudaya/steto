import { OrganizationProfile } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { PageHeader } from "@/components/page-header";

export default async function OrganisasiPage() {
  const { orgRole } = await auth();

  if (orgRole !== "org:admin") {
    return (
      <div className="space-y-6">
        <PageHeader title="Organisasi" />
        <div className="rounded-xl border bg-card p-6">
          <p className="font-medium">Halaman ini khusus admin puskesmas.</p>
          <p className="mt-1 text-sm text-muted-foreground">Minta admin untuk menambah anggota atau mengubah peran.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Organisasi" description="Anggota, undangan, dan profil puskesmas." />
      <OrganizationProfile
        path="/app/organisasi"
        routing="path"
        afterLeaveOrganizationUrl="/app/pilih-puskesmas"
        appearance={{ elements: { rootBox: "w-full", cardBox: "w-full max-w-full" } }}
      />
    </div>
  );
}
