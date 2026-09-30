import { SignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function SignInPage() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    redirect("/");
  }

  return (
    <div className="min-h-dvh bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-base-100 rounded-xl shadow-lg p-6">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Masuk ke Steto</h1>
          <p className="text-base-content/70 text-center">Masuk dengan akun organisasi Anda</p>
        </div>
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          appearance={{
            elements: {
              rootBox: "bg-base-100 rounded-xl shadow-xl p-6",
              header: "mb-6 text-center",
              headerTitle: "text-2xl font-bold",
              headerAction: "btn-ghost",
              headerBack: "link link-primary",
              socialButtons: "flex gap-3",
              socialButton: "btn-outline flex-1",
              divider: "divider",
              dividerText: "text-base-content/50",
              formButtonPrimary: "btn-primary w-full",
              formButtonSecondary: "btn-ghost w-full",
              formInput: "input input-bordered w-full",
              formInputIcon: "text-base-content/50",
              formError: "alert alert-error",
              formFieldInput: "input input-bordered",
              formFieldLabel: "label text-sm font-medium",
              formFieldAction: "link link-primary text-sm",
              footer: "mt-6 pt-6 border-t text-center",
              footerAction: "link link-primary",
            },
          }}
        />
      </div>
    </div>
  );
}
