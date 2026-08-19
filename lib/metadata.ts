import type { Metadata } from "next";
import { businessInfo } from "@/data/site";

const siteName = businessInfo.name;
const defaultDescription =
  "Premium automotive repair and maintenance services. Professional, trustworthy, and built for performance.";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteConfig = {
  name: siteName,
  description: defaultDescription,
  url: siteUrl,
};

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName,
    title: siteName,
    description: defaultDescription,
    images: [{ url: "/logo.jpg", alt: siteName }],
  },
  robots: {
    index: true,
    follow: true,
  },
};
