import Image from "next/image";
import Link from "next/link";
import { businessInfo, brandAssets } from "@/data/site";
import { cn } from "@/utils/cn";

const sizeStyles = {
  sm: "h-10 w-auto",
  md: "h-12 w-auto sm:h-14",
  lg: "h-16 w-auto sm:h-20",
} as const;

interface LogoProps {
  className?: string;
  size?: keyof typeof sizeStyles;
  priority?: boolean;
}

export function Logo({ className, size = "md", priority = false }: LogoProps) {
  return (
    <Image
      src={brandAssets.logo}
      alt={businessInfo.name}
      width={brandAssets.logoWidth}
      height={brandAssets.logoHeight}
      priority={priority}
      className={cn(sizeStyles[size], className)}
    />
  );
}

interface LogoLinkProps extends LogoProps {
  href?: string;
}

export function LogoLink({ href = "/", className, size, priority }: LogoLinkProps) {
  return (
    <Link href={href} className={cn("shrink-0", className)}>
      <Logo size={size} priority={priority} />
    </Link>
  );
}
