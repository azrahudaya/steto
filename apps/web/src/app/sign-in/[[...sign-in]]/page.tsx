import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export default function SignInPage() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Steto" width={28} height={11} className="h-7 w-auto" />
            <span className="text-lg font-semibold text-white">Steto</span>
          </Link>
        </div>
      </header>

      {/* Sign In Form */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Masuk ke akun Anda</h1>
            <p className="text-slate-400">Lanjutkan dengan email atau akun sosial</p>
          </div>
          
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-8">
            <SignIn 
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "bg-transparent shadow-none",
                  header: "hidden",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton: "bg-white/10 border-white/20 text-white hover:bg-white/20",
                  socialButtonsBlockButtonArrow: "text-white",
                  dividerLine: "bg-white/20",
                  dividerText: "text-slate-400",
                  formFieldLabel: "text-slate-300",
                  formFieldInput: "bg-slate-900/50 border-white/20 text-white focus:border-emerald-500",
                  formFieldInputShowPasswordButton: "text-slate-400 hover:text-white",
                  formButtonPrimary: "bg-emerald-500 hover:bg-emerald-400 text-white",
                  footerActionLink: "text-emerald-400 hover:text-emerald-300",
                  identityPreviewText: "text-white",
                  formFieldSuccessText: "text-emerald-400",
                  formFieldErrorText: "text-red-400",
                },
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
