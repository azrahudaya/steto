import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { type ButtonHTMLAttributes, forwardRef } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    const variants = {
      primary: "btn-primary text-primary-content",
      secondary: "btn-secondary text-secondary-content",
      outline: "btn-outline",
      ghost: "btn-ghost hover:bg-base-200",
    };

    const sizes = {
      sm: "btn-sm",
      default: "",
      lg: "btn-lg",
    };

    return (
      <button
        ref={ref}
        className={cn("btn", variants[variant], sizes[size], className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
