export function ContohBadge() {
  return (
    <span className="badge badge-warning text-xs font-medium">Contoh</span>
  );
}

export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      {description && <p className="text-base-content/70 mt-1">{description}</p>}
    </div>
  );
}
