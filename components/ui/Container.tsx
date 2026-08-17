import { cn } from "@/utils/cn";

type ContainerSize = "sm" | "md" | "lg" | "full";

const sizeStyles: Record<ContainerSize, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  full: "max-w-full",
};

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: ContainerSize;
}

export function Container({
  children,
  className,
  size = "lg",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </div>
  );
}
