import Link from "next/link";
import { cn } from "@/utils/cn";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="section-spacing">
      <Container size="sm">
        <div className="mx-auto max-w-lg space-y-6 text-center">
          <p className="font-display text-6xl font-bold text-accent">404</p>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Page not found
          </h1>
          <p className="text-muted">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className={cn(
              "inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-medium",
              "bg-accent text-white transition-colors hover:bg-accent-hover",
            )}
          >
            Return home
          </Link>
        </div>
      </Container>
    </section>
  );
}
