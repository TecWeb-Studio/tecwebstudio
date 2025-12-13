import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "glass";
}

export function Card({ children, className, variant = "default", ...props }: CardProps) {
  const variantStyles = {
    default:
      "border border-emerald-500/20 bg-gradient-to-br from-slate-800/30 to-slate-900/30",
    elevated:
      "border border-emerald-500/30 bg-gradient-to-br from-slate-800/50 to-slate-900/50 shadow-lg shadow-emerald-500/10",
    glass:
      "border border-emerald-400/30 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl",
  };

  return (
    <div
      className={cn(
        "rounded-xl p-6 backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/50",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={cn("text-xl font-bold text-white", className)}>
      {children}
    </h3>
  );
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return <p className={cn("text-slate-400 text-sm", className)}>{children}</p>;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn("", className)}>{children}</div>;
}
