import { UserProfile } from "@clerk/nextjs";
import { PageHeader } from "@/components/page-header";

export default function AccountPage() {
  return (
    <div className="container mx-auto max-w-4xl">
      <PageHeader title="Account" description="Manage your profile and security settings." />
      <div className="card bg-base-100 shadow-sm">
        <UserProfile
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "card-body",
              navbar: "border-b pb-4 mb-6",
              navbarButton: "btn btn-sm",
              profileSection: "space-y-6",
              profileSectionTitle: "text-lg font-semibold",
              userPreview: "rounded-lg bg-base-200 p-4",
            },
          }}
        />
      </div>
    </div>
  );
}