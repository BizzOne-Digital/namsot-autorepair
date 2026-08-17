import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { baseMetadata } from "@/lib/metadata";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = baseMetadata;

/**
 * The root layout stays chrome-free: the marketing header and footer live in the
 * `(public)` group, and the admin dashboard supplies its own shell.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
