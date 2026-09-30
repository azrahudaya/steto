"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brand } from "@/components/brand";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/app/pasien", label: "Patients" },
  { href: "/app/organisasi", label: "Organization" },
  { href: "/app/akun", label: "Account" },
];

export function AppNav({ sample }: { sample?: boolean }) {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-1">
      <Brand size="sm" />
      <div className="ml-2 flex items-center gap-1">
        {LINKS.map((l) => {
          const active = pathname === l.href || pathname.startsWith(l.href + "/");
          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active ? "bg-primary text-primary-content" : "hover:bg-base-200",
              )}
            >{l.label}</Link>
          );
        })}
      </div>
      {sample && (
        <span className="badge badge-outline badge-sm ml-2 text-base-content/60">Sample data</span>
      )}
    </nav>
  );
}