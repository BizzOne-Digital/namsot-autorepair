import type { Metadata } from "next";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Site settings" };

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="font-display text-2xl font-semibold text-foreground">
          Site settings
        </h1>
        <p className="max-w-2xl text-sm text-muted">
          Contact details, opening hours and the homepage copy used across the
          website.
        </p>
      </header>

      <SettingsForm settings={settings} />
    </div>
  );
}
