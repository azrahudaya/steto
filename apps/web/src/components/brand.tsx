import Image from "next/image";
import Link from "next/link";

export function Brand({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="inline-block">
      <Image src="/logo.png" alt="Steto" width={48} height={48} className="w-12 h-12" />
    </Link>
  );
}
