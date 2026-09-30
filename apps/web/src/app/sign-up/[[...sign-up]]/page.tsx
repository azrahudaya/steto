import { SignUp } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function SignUpPage() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) redirect("/");

  return (
    <div className="flex min-h-dvh items-center justify-center bg-base-200 p-4">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        appearance={{
          elements: {
            rootBox: "card w-full max-w-md bg-base-100 shadow-xl",
            card: "card-body p-8",
            header: "mb-4 text-center",
            headerTitle: "text-2xl font-bold",
            headerSubtitle: "text-base-content/70 mt-1",
            socialButtons: "flex flex-col gap-2",
            socialButton: "btn btn-outline",
            divider: "divider text-base-content/60 text-xs",
            formButtonPrimary: "btn btn-primary w-full",
            formFieldInput: "input input-bordered w-full",
            formFieldLabel: "label-text text-sm font-medium",
            formFieldAction: "link link-primary text-sm",
            footerAction: "link link-primary",
            footer: "mt-6 border-t pt-6 text-center text-sm",
          },
        }}
      />
    </div>
  );
}