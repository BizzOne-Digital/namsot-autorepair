"use client";

import { useState } from "react";
import type { ContentFAQ } from "@/lib/content/types";
import { cn } from "@/utils/cn";

interface FAQAccordionProps {
  items: ContentFAQ[];
  className?: string;
}

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?._id ?? null);

  return (
    <div className={cn("divide-y divide-border rounded-lg border border-border bg-surface", className)}>
      {items.map((item) => {
        const isOpen = openId === item._id;

        return (
          <div key={item._id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item._id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface-muted"
              aria-expanded={isOpen}
            >
              <span className="font-medium text-foreground">{item.question}</span>
              <svg
                className={cn(
                  "size-5 shrink-0 text-muted transition-transform",
                  isOpen && "rotate-180",
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isOpen ? (
              <div className="px-5 pb-4">
                <p className="text-sm text-muted leading-relaxed">{item.answer}</p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
