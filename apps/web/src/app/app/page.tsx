"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AppHome() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/app/pasien");
  }, [router]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <span className="loading loading-spinner loading-md"></span>
    </div>
  );
}