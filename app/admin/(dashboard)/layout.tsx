import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAuthenticatedAdmin } from "@/lib/auth/get-session";

export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s · Namsot Admin" },
  robots: { index: false, follow: false },
};

/**
 * Dashboard pages read live data on every request — an admin must never be shown
 * a cached copy of the records they are editing.
 */
export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // The middleware already guards these routes; this repeats the check so the
  // session details are available to the shell and no page can leak by mistake.
  const admin = await getAuthenticatedAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <AdminShell
      admin={{ name: admin.name, email: admin.email, role: admin.role }}
    >
      {children}
    </AdminShell>
  );
}
