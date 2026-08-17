"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Global Error]", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <main className="flex min-h-screen items-center justify-center px-4">
          <div className="max-w-md space-y-6 text-center">
            <h1 className="text-2xl font-bold">Something went wrong</h1>
            <p className="text-muted">
              A critical error occurred. Please try again or contact support if
              the problem persists.
            </p>
            <button
              type="button"
              onClick={reset}
              className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-medium text-white hover:bg-accent-hover"
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
