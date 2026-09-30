export function Terbatas({ judul, isi }: { judul: string; isi: string }) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <p className="font-medium">{judul}</p>
      <p className="mt-1 text-sm text-muted-foreground">{isi}</p>
    </div>
  );
}
