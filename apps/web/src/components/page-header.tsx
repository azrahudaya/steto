import { Badge } from "@/components/ui/badge";

export function ContohBadge() {
  return (
    <Badge variant="outline" className="h-6 border-input px-2 text-xs text-muted-foreground">
      Contoh
    </Badge>
  );
}

export function PageHeader({
  title,
  description,
  contoh,
  children,
}: {
  title: string;
  description?: string;
  contoh?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
          {contoh && <ContohBadge />}
        </div>
        {description && <p className="max-w-prose text-muted-foreground">{description}</p>}
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}
