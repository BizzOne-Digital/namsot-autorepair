import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { Container } from "@/components/ui/Container";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  /** Optional full-bleed background photograph for the page hero. */
  imageUrl?: string;
  imageAlt?: string;
  /** Tailwind object-position utility controlling which part of the photo stays visible. */
  imageClassName?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  className,
  imageUrl,
  imageAlt = "",
  imageClassName = "object-center",
  children,
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden border-b border-border bg-charcoal text-off-white",
        className
      )}
    >
      {imageUrl ? (
        <>
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            priority
            className={cn("object-cover opacity-45", imageClassName)}
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/55"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/40"
            aria-hidden="true"
          />
        </>
      ) : null}

      <Container className="relative">
        <div className={cn("py-12 md:py-16", imageUrl && "md:py-24 lg:py-28")}>
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-2xl text-base text-off-white/75 sm:text-lg">
              {description}
            </p>
          ) : null}
          {children}
        </div>
      </Container>
    </section>
  );
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-off-white/60">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-off-white transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-off-white/90">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
