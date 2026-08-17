import type { ContentTestimonial } from "@/lib/content/types";
import { Card } from "@/components/ui/Card";
import { cn } from "@/utils/cn";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={cn(
            "size-4",
            i < rating ? "text-accent" : "text-border",
          )}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

interface TestimonialCardProps {
  testimonial: ContentTestimonial;
  className?: string;
}

export function TestimonialCard({
  testimonial,
  className,
}: TestimonialCardProps) {
  return (
    <Card className={cn("h-full", className)}>
      <StarRating rating={testimonial.rating} />
      <blockquote className="mt-4 text-sm text-foreground leading-relaxed">
        &ldquo;{testimonial.review}&rdquo;
      </blockquote>
      <div className="mt-6 border-t border-border pt-4">
        <p className="font-semibold text-foreground">{testimonial.authorName}</p>
        {testimonial.vehicle ? (
          <p className="mt-0.5 text-xs text-muted">{testimonial.vehicle}</p>
        ) : null}
      </div>
    </Card>
  );
}
