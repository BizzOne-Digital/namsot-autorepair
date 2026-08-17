export interface AdminNavItem {
  href: string;
  label: string;
  /** Only visible to users with the `admin` role. */
  adminOnly?: boolean;
}

export interface AdminNavGroup {
  title: string;
  items: AdminNavItem[];
}

export const adminNavigation: AdminNavGroup[] = [
  {
    title: "Overview",
    items: [{ href: "/admin", label: "Dashboard" }],
  },
  {
    title: "Operations",
    items: [
      { href: "/admin/bookings", label: "Bookings" },
      { href: "/admin/messages", label: "Messages" },
      { href: "/admin/orders", label: "Orders" },
    ],
  },
  {
    title: "Website content",
    items: [
      { href: "/admin/services", label: "Services" },
      { href: "/admin/pricing", label: "Pricing plans" },
      { href: "/admin/blog", label: "Blog posts" },
      { href: "/admin/team", label: "Team" },
      { href: "/admin/testimonials", label: "Testimonials" },
      { href: "/admin/faqs", label: "FAQs" },
      { href: "/admin/gallery", label: "Gallery" },
    ],
  },
  {
    title: "Shop",
    items: [
      { href: "/admin/products", label: "Products" },
      { href: "/admin/categories", label: "Categories" },
    ],
  },
  {
    title: "Configuration",
    items: [
      { href: "/admin/settings", label: "Site settings" },
      { href: "/admin/users", label: "Admin users", adminOnly: true },
    ],
  },
];
