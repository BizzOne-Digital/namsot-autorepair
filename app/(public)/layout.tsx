import { SiteLayout } from "@/components/layout/SiteLayout";

/**
 * Every public page reads its content from MongoDB, so nothing here may be
 * prerendered or served from the full route cache: an edit saved in the admin
 * dashboard has to be visible on the very next request. Segment config set on a
 * layout applies to all pages nested inside it.
 */
export const dynamic = "force-dynamic";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteLayout>{children}</SiteLayout>;
}
