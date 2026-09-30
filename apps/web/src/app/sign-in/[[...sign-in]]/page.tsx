import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function SignInPage() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) redirect("/");
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <Link href="/">steto<span>.</span></Link>
        </div>
        <SignIn 
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-transparent shadow-none border-0 p-0",
              headerTitle: "text-2xl font-bold text-center",
              headerSubtitle: "text-muted-foreground text-center",
              formButtonPrimary: "bg-primary hover:bg-primary/90",
              formFieldInput: "rounded-lg",
              footerActionLink: "text-primary font-medium"
            }
          }}
        />
      </div>
    </div>
  );
}
