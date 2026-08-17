import { cn } from "@/utils/cn";

interface LoadingProps {
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: "size-5 border-2",
  md: "size-8 border-2",
  lg: "size-12 border-[3px]",
} as const;

export function Loading({ label = "Loading…", className, size = "md" }: LoadingProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-3", className)}
      role="status"
      aria-live="polite"
    >
      <span
        className={cn(
          "animate-spin rounded-full border-accent border-t-transparent",
          sizeStyles[size],
        )}
        aria-hidden="true"
      />
      <span className="text-sm text-muted">{label}</span>
    </div>
  );
}
