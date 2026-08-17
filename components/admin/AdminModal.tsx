"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";

const sizeClass = {
  md: "max-w-lg",
  lg: "max-w-3xl",
} as const;

interface AdminModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  size?: keyof typeof sizeClass;
  children: ReactNode;
  /** Sticky action row rendered at the bottom of the panel. */
  footer?: ReactNode;
}

/**
 * A scrollable modal panel for the dashboard. Built on `<dialog>` so focus
 * trapping, `Esc` and the backdrop come from the platform.
 */
export function AdminModal({
  open,
  onClose,
  title,
  description,
  size = "lg",
  children,
  footer,
}: AdminModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="admin-modal-title"
      className={cn(
        "fixed inset-0 z-50 m-auto max-h-[92vh] w-[calc(100%-2rem)] overflow-hidden rounded-lg",
        "border border-border bg-surface p-0 text-foreground shadow-xl backdrop:bg-charcoal/60",
        sizeClass[size],
      )}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      <div className="flex max-h-[92vh] flex-col">
        <header className="flex items-start justify-between gap-4 border-b border-border px-6 py-4">
          <div className="space-y-1">
            <h2
              id="admin-modal-title"
              className="font-display text-lg font-semibold"
            >
              {title}
            </h2>
            {description ? (
              <p className="text-sm text-muted">{description}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 -mt-1 rounded-md p-2 text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              className="size-4"
              aria-hidden="true"
            >
              <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

        {footer ? (
          <footer className="flex flex-wrap justify-end gap-3 border-t border-border bg-surface-muted/40 px-6 py-4">
            {footer}
          </footer>
        ) : null}
      </div>
    </dialog>
  );
}
