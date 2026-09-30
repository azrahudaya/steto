import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PilihPuskesmasPage() {
  return (
    <div className="min-h-dvh bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-base-100 rounded-xl shadow-lg p-6">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Pilih Puskesmas</h1>
          <p className="text-base-content/70 text-center">Pilih organisasi untuk masuk</p>
        </div>

        <div className="card bg-base-200 shadow mb-4">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                🏥
              </div>
              <div>
                <p className="font-medium">Puskesmas Demo Steto</p>
                <p className="text-sm text-base-content/60">Organisasi demo</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-base-content/60">
            Belum punya organisasi?{" "}
            <Link href="/app/organisasi" className="link link-primary">
              Buat organisasi baru
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Button size="lg" className="w-full">
            Masuk dengan Akun Demo
          </Button>
        </div>
      </div>
    </div>
  );
}
