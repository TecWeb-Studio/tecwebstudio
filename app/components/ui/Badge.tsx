import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  const variantStyles = {
    default: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50",
    success: "bg-green-500/20 text-green-300 border border-green-500/50",
    warning: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/50",
    error: "bg-red-500/20 text-red-300 border border-red-500/50",
    info: "bg-blue-500/20 text-blue-300 border border-blue-500/50",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
