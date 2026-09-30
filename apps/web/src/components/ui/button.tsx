import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "neutral" | "error";
type Size = "default" | "sm" | "lg" | "wide";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const VARIANT: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  outline: "btn-outline",
  ghost: "btn-ghost",
  neutral: "btn-neutral",
  error: "btn-error",
};

const SIZE: Record<Size, string> = {
  default: "",
  sm: "btn-sm",
  lg: "btn-lg",
  wide: "btn-wide",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "primary", size = "default", type = "button", ...props }, ref) => (
  <button ref={ref} type={type} className={cn("btn", VARIANT[variant], SIZE[size], className)} {...props} />
));
Button.displayName = "Button";