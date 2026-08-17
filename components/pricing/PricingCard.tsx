import type { ContentPricingPlan } from "@/lib/content/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";

interface PricingCardProps {
  plan: ContentPricingPlan;
  className?: string;
}

export function PricingCard({ plan, className }: PricingCardProps) {
  return (
    <Card
      className={cn(
        "h-full",
        plan.highlighted && "border-accent ring-1 ring-accent/20",
        className,
      )}
    >
      {plan.highlighted ? (
        <Badge variant="accent" className="mb-4">Popular</Badge>
      ) : null}
      <h3 className="font-display text-xl font-semibold text-foreground">
        {plan.name}
      </h3>
      <p className="mt-2 text-sm text-muted">{plan.description}</p>
      <div className="mt-4">
        {plan.priceNote ? (
          <span className="text-xs text-muted">{plan.priceNote} </span>
        ) : null}
        <span className="font-display text-3xl font-bold text-foreground">
          ${plan.price}
        </span>
      </div>
      <ul className="mt-6 space-y-2">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-muted">
            <svg
              className="mt-0.5 size-4 shrink-0 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </Card>
  );
}
