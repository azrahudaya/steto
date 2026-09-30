import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "neutral" | "error";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
}

const VARIANT: Record<Variant, string> = {
  primary: "badge-primary",
  secondary: "badge-secondary",
  outline: "badge-outline",
  ghost: "badge-ghost",
  neutral: "badge-neutral",
  error: "badge-error",
};

export function Badge({ className, variant = "outline", ...props }: BadgeProps) {
  return <span className={cn("badge", VARIANT[variant], className)} {...props} />;
}