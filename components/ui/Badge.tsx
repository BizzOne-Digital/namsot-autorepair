import { cn } from "@/utils/cn";

const variantStyles = {
  default: "bg-charcoal-800 text-white",
  accent: "bg-accent text-white",
  outline: "border border-border bg-transparent text-foreground",
  muted: "bg-surface-muted text-muted",
  success: "bg-green-100 text-green-800",
  warning: "bg-amber-100 text-amber-800",
  danger: "bg-red-100 text-red-800",
} as const;

export type BadgeVariant = keyof typeof variantStyles;

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: BadgeVariant;
}

export function Badge({
  children,
  className,
  variant = "default",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
