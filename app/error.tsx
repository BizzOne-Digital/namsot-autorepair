"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { ErrorState } from "@/components/ui/ErrorState";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[App Error]", error);
  }, [error]);

  return (
    <section className="section-spacing">
      <Container size="sm">
        <ErrorState
          title="Something went wrong"
          message="We encountered an unexpected error. Please try again."
          onRetry={reset}
        />
      </Container>
    </section>
  );
}
