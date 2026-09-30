import { OrganizationProfile } from "@clerk/nextjs";

export default async function OrganisasiPage() {
  return (
    <div className="container mx-auto max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Organisasi</h1>
        <p className="text-base-content/70">Kelola organisasi dan anggota puskesmas</p>
      </div>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-0">
          <OrganizationProfile
            appearance={{
              elements: {
                rootBox: "p-6",
                header: "mb-6",
                headerTitle: "text-2xl font-bold",
                headerAction: "btn-primary",
                organizationPreview: "bg-base-200 hover:bg-base-300",
                previewText: "font-medium",
                memberPreview: "bg-base-100 hover:bg-base-200 border",
                memberPreviewAvatar: "w-10 h-10",
                memberPreviewAction: "btn-ghost",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
