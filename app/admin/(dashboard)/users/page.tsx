import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { usersView } from "@/lib/admin/views";
import { getAuthenticatedAdmin } from "@/lib/auth/get-session";

export const metadata: Metadata = { title: "Admin users" };

export default async function AdminUsersPage() {
  const admin = await getAuthenticatedAdmin();

  // Staff accounts cannot see or manage other accounts.
  if (admin?.role !== "admin") {
    notFound();
  }

  return <ResourceManager view={usersView} />;
}
