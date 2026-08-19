"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import { Container } from "@/components/ui/Container";
import { navLinks } from "@/data/site";
import { LogoLink } from "./Logo";
import { MobileMenu } from "./MobileMenu";

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

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          <LogoLink priority />

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-accent"
                    : "text-foreground hover:text-accent",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === "/booking"
                  ? "text-accent"
                  : "text-foreground hover:text-accent",
              )}
            >
              Booking
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/shop"
              className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:text-accent lg:flex"
            >
              <CartIcon />
              <span>Cart</span>
            </Link>

            <Link
              href="/shop"
              className="flex size-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-surface-muted lg:hidden"
              aria-label="Cart"
            >
              <CartIcon />
            </Link>

            <Link
              href="/booking"
              className="hidden h-10 items-center justify-center rounded-md bg-accent px-4 text-sm font-medium text-white transition-colors hover:bg-accent-hover sm:inline-flex"
            >
              Book Now
            </Link>

            <Link
              href="/booking"
              className="inline-flex h-9 items-center justify-center rounded-md bg-accent px-3 text-xs font-medium text-white transition-colors hover:bg-accent-hover sm:hidden"
            >
              Book
            </Link>

            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}
