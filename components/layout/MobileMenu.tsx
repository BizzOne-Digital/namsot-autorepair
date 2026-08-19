"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import { navLinks } from "@/data/site";
import { LogoLink } from "./Logo";

function CartIcon() {
  return (
    <svg
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="size-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      {open ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M6 18L18 6M6 6l12 12"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 6h16M4 12h16M4 18h16"
        />
      )}
    </svg>
  );
}

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex size-10 items-center justify-center rounded-md text-foreground hover:bg-surface-muted transition-colors"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <MenuIcon open={open} />
      </button>

      {open ? (
        <div
          className="fixed inset-0 top-16 z-50 bg-charcoal/50 backdrop-blur-sm"
          onClick={closeMenu}
          role="presentation"
        >
          <nav
            className="absolute inset-x-0 top-0 border-b border-border bg-surface shadow-lg"
            aria-label="Mobile navigation"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col px-4 py-4">
              <LogoLink className="mb-4 px-3" />
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={cn(
                    "rounded-md px-3 py-3 text-base font-medium transition-colors",
                    pathname === link.href
                      ? "bg-accent/10 text-accent"
                      : "text-foreground hover:bg-surface-muted",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/booking"
                onClick={closeMenu}
                className={cn(
                  "rounded-md px-3 py-3 text-base font-medium transition-colors",
                  pathname === "/booking"
                    ? "bg-accent/10 text-accent"
                    : "text-foreground hover:bg-surface-muted",
                )}
              >
                Booking
              </Link>
              <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
                <Link
                  href="/shop"
                  onClick={closeMenu}
                  className="flex items-center gap-2 rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-surface-muted"
                >
                  <CartIcon />
                  Cart
                </Link>
                <Link
                  href="/booking"
                  onClick={closeMenu}
                  className="inline-flex h-11 w-full items-center justify-center rounded-md bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
