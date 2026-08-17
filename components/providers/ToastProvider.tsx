"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "bg-surface border border-border text-foreground shadow-card",
          title: "font-medium",
          description: "text-muted",
          success: "border-green-200",
          error: "border-red-200",
        },
      }}
      closeButton
      richColors
    />
  );
}
