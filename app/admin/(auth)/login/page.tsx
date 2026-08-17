import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/admin/LoginForm";
import { isSessionConfigured } from "@/lib/auth/session";
import { isDbConfigured } from "@/lib/db";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

interface LoginPageProps {
  searchParams: Promise<{ from?: string }>;
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const { from } = await searchParams;
  const redirectTo = from?.startsWith("/admin") ? from : "/admin";
  const isReady = isSessionConfigured() && isDbConfigured();

  return (
    <main className="flex min-h-screen items-center justify-center bg-charcoal px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <Link
            href="/"
            className="font-display text-2xl font-semibold text-white"
          >
            Namsot <span className="text-accent">Auto Repairs</span>
          </Link>
          <p className="mt-2 text-sm text-white/60">Dashboard sign in</p>
        </div>

        <div className="rounded-lg border border-border bg-surface p-6 shadow-xl">
          {isReady ? (
            <LoginForm redirectTo={redirectTo} />
          ) : (
            <div className="space-y-3 text-sm">
              <h1 className="font-display text-lg font-semibold text-foreground">
                Setup required
              </h1>
              <p className="text-muted">
                The dashboard needs these environment variables before anyone can
                sign in. Add them to <code>.env.local</code> and restart the
                server.
              </p>
              <ul className="space-y-2 text-muted">
                {!isDbConfigured() ? (
                  <li>
                    <code className="text-foreground">MONGODB_URI</code> — the
                    connection string for your MongoDB database.
                  </li>
                ) : null}
                {!isSessionConfigured() ? (
                  <li>
                    <code className="text-foreground">SESSION_SECRET</code> — a
                    random string of at least 32 characters.
                  </li>
                ) : null}
              </ul>
              <p className="text-muted">
                Set <code className="text-foreground">ADMIN_EMAIL</code> and{" "}
                <code className="text-foreground">ADMIN_PASSWORD</code> too, and
                the first admin account is created automatically at startup.
              </p>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-white/40">
          Authorised personnel only.
        </p>
      </div>
    </main>
  );
}
