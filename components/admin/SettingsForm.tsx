"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { AdminRequestError, adminRequest } from "@/lib/admin/client";
import type { ContentSiteSettings } from "@/lib/content/types";

interface SettingsFormProps {
  settings: ContentSiteSettings;
}

type Draft = ContentSiteSettings;

/**
 * Edits the single site-settings document that drives the header, footer,
 * homepage hero and contact details.
 */
export function SettingsForm({ settings }: SettingsFormProps) {
  const [draft, setDraft] = useState<Draft>(settings);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      const key_ = String(key);
      if (!current[key_]) return current;
      const { [key_]: _removed, ...rest } = current;
      return rest;
    });
  };

  const setSocial = (key: keyof Draft["socialLinks"], value: string) => {
    setDraft((current) => ({
      ...current,
      socialLinks: { ...current.socialLinks, [key]: value },
    }));
  };

  const setHours = (index: number, key: "days" | "hours", value: string) => {
    setDraft((current) => ({
      ...current,
      openingHours: current.openingHours.map((entry, entryIndex) =>
        entryIndex === index ? { ...entry, [key]: value } : entry,
      ),
    }));
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    setErrors({});
    setFormError(null);

    try {
      await adminRequest("/api/admin/settings", {
        method: "PUT",
        body: JSON.stringify(draft),
      });
      toast.success("Site settings saved");
    } catch (error) {
      if (error instanceof AdminRequestError) {
        setErrors(error.details);
        setFormError(error.message);
      } else {
        setFormError("Could not save the settings. Please try again.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        void handleSubmit();
      }}
    >
      {formError ? (
        <p
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {formError}
        </p>
      ) : null}

      <Section
        title="Business details"
        description="Used in the header, footer, contact page and structured data."
      >
        <Input
          name="siteName"
          label="Business name"
          value={draft.siteName}
          error={errors.siteName}
          onChange={(event) => set("siteName", event.target.value)}
        />
        <Input
          name="contactPhone"
          label="Phone number"
          value={draft.contactPhone}
          error={errors.contactPhone}
          onChange={(event) => set("contactPhone", event.target.value)}
        />
        <Input
          name="contactEmail"
          label="Contact email"
          type="email"
          value={draft.contactEmail}
          error={errors.contactEmail}
          onChange={(event) => set("contactEmail", event.target.value)}
        />
        <Input
          name="address"
          label="Location"
          value={draft.address}
          error={errors.address}
          onChange={(event) => set("address", event.target.value)}
        />
        <div className="sm:col-span-2">
          <Input
            name="addressLine"
            label="Service area line"
            hint="Shown under the location, e.g. “Serving Waterloo and surrounding communities”"
            value={draft.addressLine}
            error={errors.addressLine}
            onChange={(event) => set("addressLine", event.target.value)}
          />
        </div>
      </Section>

      <Section
        title="Opening hours"
        description="Displayed in the footer and on the contact page."
      >
        {draft.openingHours.map((entry, index) => (
          <div key={index} className="grid gap-3 sm:col-span-2 sm:grid-cols-2">
            <Input
              name={`openingHours.${index}.days`}
              label={`Row ${index + 1} — days`}
              placeholder="Monday – Friday"
              value={entry.days}
              onChange={(event) => setHours(index, "days", event.target.value)}
            />
            <Input
              name={`openingHours.${index}.hours`}
              label={`Row ${index + 1} — hours`}
              placeholder="8:00 AM – 6:00 PM"
              value={entry.hours}
              onChange={(event) => setHours(index, "hours", event.target.value)}
            />
          </div>
        ))}
        <div className="flex gap-3 sm:col-span-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setDraft((current) => ({
                ...current,
                openingHours: [...current.openingHours, { days: "", hours: "" }],
              }))
            }
          >
            Add a row
          </Button>
          {draft.openingHours.length > 0 ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() =>
                setDraft((current) => ({
                  ...current,
                  openingHours: current.openingHours.slice(0, -1),
                }))
              }
            >
              Remove last row
            </Button>
          ) : null}
        </div>
      </Section>

      <Section
        title="Homepage hero"
        description="The headline area at the top of the homepage."
      >
        <div className="sm:col-span-2">
          <Input
            name="heroHeadline"
            label="Headline"
            value={draft.heroHeadline}
            error={errors.heroHeadline}
            onChange={(event) => set("heroHeadline", event.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <Textarea
            name="heroSubheadline"
            label="Sub-headline"
            rows={3}
            value={draft.heroSubheadline}
            error={errors.heroSubheadline}
            onChange={(event) => set("heroSubheadline", event.target.value)}
          />
        </div>
        <Input
          name="heroPrimaryCtaLabel"
          label="Primary button label"
          value={draft.heroPrimaryCtaLabel}
          onChange={(event) => set("heroPrimaryCtaLabel", event.target.value)}
        />
        <Input
          name="heroPrimaryCtaHref"
          label="Primary button link"
          value={draft.heroPrimaryCtaHref}
          onChange={(event) => set("heroPrimaryCtaHref", event.target.value)}
        />
        <Input
          name="heroSecondaryCtaLabel"
          label="Secondary button label"
          value={draft.heroSecondaryCtaLabel}
          onChange={(event) => set("heroSecondaryCtaLabel", event.target.value)}
        />
        <Input
          name="heroSecondaryCtaHref"
          label="Secondary button link"
          value={draft.heroSecondaryCtaHref}
          onChange={(event) => set("heroSecondaryCtaHref", event.target.value)}
        />
      </Section>

      <Section
        title="Promotion banner"
        description="The highlighted offer block on the homepage."
      >
        <div className="sm:col-span-2">
          <Input
            name="promoTitle"
            label="Title"
            value={draft.promoTitle}
            onChange={(event) => set("promoTitle", event.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <Textarea
            name="promoDescription"
            label="Description"
            rows={3}
            value={draft.promoDescription}
            onChange={(event) => set("promoDescription", event.target.value)}
          />
        </div>
        <Input
          name="promoCtaLabel"
          label="Button label"
          value={draft.promoCtaLabel}
          onChange={(event) => set("promoCtaLabel", event.target.value)}
        />
        <Input
          name="promoCtaHref"
          label="Button link"
          value={draft.promoCtaHref}
          onChange={(event) => set("promoCtaHref", event.target.value)}
        />
      </Section>

      <Section
        title="Social profiles"
        description="Leave a field blank to hide that icon in the footer."
      >
        <Input
          name="facebook"
          label="Facebook"
          value={draft.socialLinks.facebook}
          onChange={(event) => setSocial("facebook", event.target.value)}
        />
        <Input
          name="instagram"
          label="Instagram"
          value={draft.socialLinks.instagram}
          onChange={(event) => setSocial("instagram", event.target.value)}
        />
        <Input
          name="x"
          label="X"
          value={draft.socialLinks.x}
          onChange={(event) => setSocial("x", event.target.value)}
        />
        <Input
          name="youtube"
          label="YouTube"
          value={draft.socialLinks.youtube}
          onChange={(event) => setSocial("youtube", event.target.value)}
        />
        <Input
          name="linkedin"
          label="LinkedIn"
          value={draft.socialLinks.linkedin}
          onChange={(event) => setSocial("linkedin", event.target.value)}
        />
      </Section>

      <div className="sticky bottom-0 flex items-center justify-between gap-4 rounded-lg border border-border bg-surface px-4 py-3">
        <p className="text-sm text-muted">
          Changes appear on the website immediately after saving.
        </p>
        <Button type="submit" isLoading={isSaving}>
          Save settings
        </Button>
      </div>
    </form>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-border bg-surface p-5">
      <div className="mb-5 space-y-1">
        <h2 className="font-display text-lg font-semibold text-foreground">
          {title}
        </h2>
        <p className="text-sm text-muted">{description}</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
    </section>
  );
}
