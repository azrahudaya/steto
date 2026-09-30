"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function AppNav({ admin, mobile = false }: { admin: boolean; mobile?: boolean }) {
  const pathname = usePathname();
  const base = mobile ? "flex flex-col gap-2" : "flex items-center gap-2";

  const links = [
    { href: "/app/pasien", label: "Pasien" },
    { href: "/app/organisasi", label: "Organisasi" },
  ];

  if (admin) {
    links.push({ href: "/app/akun", label: "Akun" });
  }

  return (
    <nav className={base}>
      <Link href="/" className="font-bold text-primary">
        steto
      </Link>
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={cn(
            "px-3 py-2 rounded-md text-sm font-medium",
            pathname === l.href ? "bg-primary text-primary-content" : "hover:bg-base-200",
          )}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
