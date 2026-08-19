import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { ContentProduct } from "@/lib/content/types";
import { images } from "@/data/images";
import { cn } from "@/utils/cn";

interface ProductCardProps {
  product: ContentProduct;
  /** Width hint passed to the image optimizer. */
  sizes?: string;
  className?: string;
}

const placeholderImage = images.productFallback.src;

export function ProductCard({ product, sizes, className }: ProductCardProps) {
  const image = product.images[0] ?? placeholderImage;
  const isOnSale =
    product.compareAtPrice !== null && product.compareAtPrice > product.price;

  return (
    <Card padding="none" className={cn("overflow-hidden", className)}>
      <div className="relative aspect-square bg-charcoal">
        <Image
          src={image}
          alt={product.name}
          fill
          className="object-cover"
          sizes={sizes ?? "(max-width: 768px) 50vw, 25vw"}
        />
        {isOnSale ? (
          <div className="absolute left-3 top-3">
            <Badge variant="accent">Sale</Badge>
          </div>
        ) : null}
        {product.stock === 0 ? (
          <div className="absolute right-3 top-3">
            <Badge variant="outline" className="bg-surface/90">
              Out of stock
            </Badge>
          </div>
        ) : null}
      </div>
      <div className="p-5">
        {product.categoryName ? (
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            {product.categoryName}
          </p>
        ) : null}
        <h3 className="mt-1 font-display text-base font-semibold text-foreground">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">
          {product.shortDescription || product.description}
        </p>
        <p className="mt-3 flex items-baseline gap-2 font-semibold text-foreground">
          ${product.price.toFixed(2)}
          {isOnSale ? (
            <span className="text-sm font-normal text-muted line-through">
              ${product.compareAtPrice?.toFixed(2)}
            </span>
          ) : null}
        </p>
      </div>
    </Card>
  );
}
