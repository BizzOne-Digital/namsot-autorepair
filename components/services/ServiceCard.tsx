import Image from "next/image";
import Link from "next/link";
import type { ContentService } from "@/lib/content/types";
import { cn } from "@/utils/cn";
import { Card } from "@/components/ui/Card";

interface ServiceCardProps {
  service: ContentService;
  className?: string;
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  return (
    <Link href={`/services/${service.slug}`} className={cn("group block", className)}>
      <Card padding="none" className="overflow-hidden transition-shadow hover:shadow-lg">
        <div className="relative aspect-[16/10] overflow-hidden bg-charcoal">
          <Image
            src={service.imageUrl}
            alt={service.imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
          <div className="absolute bottom-3 left-3">
            <span className="rounded bg-accent px-2 py-0.5 text-xs font-medium text-white">
              From ${service.priceFrom}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
            {service.name}
          </h3>
          <p className="mt-2 text-sm text-muted line-clamp-2">
            {service.shortDescription}
          </p>
          <p className="mt-3 text-xs font-medium text-accent">
            Learn more →
          </p>
        </div>
      </Card>
    </Link>
  );
}
