"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { ContentGalleryItem } from "@/lib/content/types";
import { cn } from "@/utils/cn";
import { FadeIn } from "@/components/motion/FadeIn";

interface GalleryGridProps {
  items: ContentGalleryItem[];
  className?: string;
}

const ALL_CATEGORIES = "All";

export function GalleryGrid({ items, className }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);

  // Categories are free text in the dashboard, so the filter bar is built from
  // whatever the published items actually use.
  const categories = useMemo(() => {
    const used = new Set<string>();

    for (const item of items) {
      if (item.category) {
        used.add(item.category);
      }
    }

    return [ALL_CATEGORIES, ...Array.from(used).sort()];
  }, [items]);

  const isActiveCategoryAvailable = categories.includes(activeCategory);
  const effectiveCategory = isActiveCategoryAvailable
    ? activeCategory
    : ALL_CATEGORIES;

  const filtered =
    effectiveCategory === ALL_CATEGORIES
      ? items
      : items.filter((item) => item.category === effectiveCategory);

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              effectiveCategory === category
                ? "bg-accent text-white"
                : "bg-surface-muted text-muted hover:text-foreground",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, index) => (
          <FadeIn key={item._id} delay={index * 0.03}>
            <div className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-charcoal">
              <Image
                src={item.imageUrl}
                alt={item.imageAlt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="text-xs text-off-white/70">{item.category}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
