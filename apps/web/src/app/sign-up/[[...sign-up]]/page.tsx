import { SignUp } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Brand } from "@/components/brand";

export default function SignUpPage() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) redirect("/");

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 sm:px-6">
        <Brand className="h-7" />
      </header>
      <main className="flex flex-1 items-start justify-center px-4 pb-16 pt-6 sm:items-center sm:pt-0">
        <SignUp fallbackRedirectUrl="/app/pasien" />
      </main>
    </div>
  );
}
