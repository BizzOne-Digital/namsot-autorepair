"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Button } from "./Button";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  className,
}: DialogProps) {
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
      className={cn(
        "fixed inset-0 z-50 m-auto w-full max-w-lg rounded-lg border border-border bg-surface p-0 shadow-xl backdrop:bg-charcoal/60",
        "open:animate-in open:fade-in open:zoom-in-95",
        className,
      )}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      <div className="p-6">
        <div className="mb-4 space-y-2">
          <h2 className="font-display text-xl font-semibold text-foreground">
            {title}
          </h2>
          {description ? (
            <p className="text-sm text-muted">{description}</p>
          ) : null}
        </div>
        {children}
        <div className="mt-6 flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </dialog>
  );
}
