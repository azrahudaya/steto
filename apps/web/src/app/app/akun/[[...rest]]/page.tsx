import { UserProfile } from "@clerk/nextjs";
import { PageHeader } from "@/components/page-header";

export default function AkunPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Akun" description="Nama, email, kata sandi, dan sesi masuk." />
      <UserProfile path="/app/akun" routing="path" appearance={{ elements: { rootBox: "w-full", cardBox: "w-full max-w-full" } }} />
    </div>
  );
}
