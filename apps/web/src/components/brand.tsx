export function Brand({ href = "/", className = "h-8" }: { href?: string; className?: string }) {
  return (
    <a href={href} className="flex items-center gap-2">
      <img src="/logo.png" alt="Steto" className={className} />
      <span className="font-bold text-lg hidden sm:block">steto</span>
    </a>
  );
}
