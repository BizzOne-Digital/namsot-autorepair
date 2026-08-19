import Image from "next/image";
import Link from "next/link";
import { businessInfo, brandAssets } from "@/data/site";
import { cn } from "@/utils/cn";

const sizeStyles = {
  sm: "h-16 w-auto",
  md: "h-20 w-auto sm:h-[5.25rem]",
  lg: "h-32 w-auto sm:h-36",
  header: "h-[4.75rem] w-auto sm:h-[5.5rem] lg:h-[6.25rem]",
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
  linkClassName?: string;
}

export function LogoLink({
  href = "/",
  className,
  linkClassName,
  size,
  priority,
}: LogoLinkProps) {
  return (
    <Link href={href} className={cn("shrink-0", linkClassName)}>
      <Logo size={size} priority={priority} className={className} />
    </Link>
  );
}
