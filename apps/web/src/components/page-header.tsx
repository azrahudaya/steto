import type { ReactNode } from "react";

export function PageHeader({ title, description, actions, sample }: { title: string; description?: string; actions?: ReactNode; sample?: boolean }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-base-content/70">{description}</p>}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {sample && (
          <span className="badge badge-outline badge-sm text-base-content/60">Sample data</span>
        )}
        {actions}
      </div>
    </div>
  );
}