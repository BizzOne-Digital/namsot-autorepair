"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { adminRequest } from "@/lib/admin/client";
import { adminNavigation } from "@/lib/admin/navigation";
import { cn } from "@/utils/cn";

interface AdminShellProps {
  admin: { name: string; email: string; role: "admin" | "staff" };
  children: ReactNode;
}

export function AdminShell({ admin, children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const groups = adminNavigation
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) => !item.adminOnly || admin.role === "admin",
      ),
    }))
    .filter((group) => group.items.length > 0);

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      await adminRequest("/api/admin/auth/logout", { method: "POST" });
      router.replace("/admin/login");
    } catch (error) {
      setIsSigningOut(false);
      toast.error(
        error instanceof Error ? error.message : "Could not sign out.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-surface-muted/40 lg:grid lg:grid-cols-[16rem_1fr]">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 overflow-y-auto border-r border-charcoal-800 bg-charcoal text-white transition-transform",
          "lg:static lg:translate-x-0",
          isNavOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center border-b border-charcoal-800 px-5">
          <Link
            href="/admin"
            onClick={() => setIsNavOpen(false)}
            className="font-display text-lg font-semibold"
          >
            Namsot <span className="text-accent">Admin</span>
          </Link>
        </div>

        <nav className="space-y-6 px-3 py-5" aria-label="Dashboard">
          {groups.map((group) => (
            <div key={group.title} className="space-y-1">
              <p className="px-2 text-xs font-medium uppercase tracking-wider text-white/40">
                {group.title}
              </p>
              {group.items.map((item) => {
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    // The mobile drawer must not stay open across a navigation.
                    onClick={() => setIsNavOpen(false)}
                    className={cn(
                      "block rounded-md px-2 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-accent text-white"
                        : "text-white/75 hover:bg-charcoal-800 hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>

      {isNavOpen ? (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-charcoal/60 lg:hidden"
          onClick={() => setIsNavOpen(false)}
        />
      ) : null}

      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-border bg-surface px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setIsNavOpen(true)}
            aria-label="Open navigation"
            className="rounded-md border border-border p-2 text-foreground lg:hidden"
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              className="size-4"
              aria-hidden="true"
            >
              <path d="M3 5h14M3 10h14M3 15h14" strokeLinecap="round" />
            </svg>
          </button>

          <div className="ml-auto flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden text-sm text-muted transition-colors hover:text-foreground sm:block"
            >
              View website
            </Link>
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium leading-tight text-foreground">
                {admin.name}
              </p>
              <p className="text-xs capitalize text-muted">{admin.role}</p>
            </div>
            <button
              type="button"
              onClick={() => void handleSignOut()}
              disabled={isSigningOut}
              className="rounded-md border border-border px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-surface-muted disabled:opacity-50"
            >
              {isSigningOut ? "Signing out…" : "Sign out"}
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
