import { UserProfile } from "@clerk/nextjs";

export default function AkunPage() {
  return (
    <div className="container mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Akun Saya</h1>
        <p className="text-base-content/70">Kelola informasi akun dan pengaturan keamanan</p>
      </div>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-0">
          <UserProfile
            appearance={{
              elements: {
                rootBox: "p-6",
                header: "mb-6",
                headerTitle: "text-2xl font-bold",
                headerAction: "btn-primary",
                dangerSection: "bg-error/10 border-error/20",
                pageBackdrop: "bg-base-100",
                userPreview: "bg-base-200 rounded-xl p-6",
                userPreviewMainButton: "btn-primary",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
