import { OrganizationProfile } from "@clerk/nextjs";
import { PageHeader } from "@/components/page-header";

export default function OrganizationPage() {
  return (
    <div className="container mx-auto max-w-5xl">
      <PageHeader title="Organization" description="Manage the clinic and its members." />
      <div className="card bg-base-100 shadow-sm">
        <OrganizationProfile
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "card-body",
              navbar: "border-b pb-4 mb-6",
              navbarButton: "btn btn-sm",
              profileSection: "space-y-6",
              profileSectionTitle: "text-lg font-semibold",
              organizationPreview: "rounded-lg bg-base-200 p-4",
              memberPreview: "rounded-lg border p-3 hover:bg-base-200",
              memberPreviewAvatar: "w-10 h-10",
            },
          }}
        />
      </div>
    </div>
  );
}