import Link from "next/link";
import { SeedContentButton } from "@/components/admin/SeedContentButton";
import { StatCard } from "@/components/admin/StatCard";
import { formatDate, formatMoney, renderCell } from "@/components/admin/cells";
import { Badge } from "@/components/ui/Badge";
import { getAdminStats, type AdminStatsSummary } from "@/lib/admin/stats";
import { getAuthenticatedAdmin } from "@/lib/auth/get-session";
import { isDbConfigured } from "@/lib/db";

const bookingTones = {
  pending: "warning",
  confirmed: "accent",
  completed: "success",
  cancelled: "danger",
} as const;

const messageTones = {
  new: "warning",
  read: "muted",
  replied: "success",
  archived: "muted",
} as const;

export default async function AdminDashboardPage() {
  const admin = await getAuthenticatedAdmin();
  const stats = isDbConfigured() ? await loadStats() : null;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-display text-2xl font-semibold text-foreground">
            Welcome back, {admin?.name?.split(" ")[0] ?? "there"}
          </h1>
          <p className="text-sm text-muted">
            Everything you change here is written to MongoDB and shows on the
            website straight away.
          </p>
        </div>
        {admin?.role === "admin" && stats ? <SeedContentButton /> : null}
      </header>

      {!stats ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
          <p className="font-medium">MongoDB is not connected</p>
          <p className="mt-1">
            Set <code>MONGODB_URI</code> in <code>.env.local</code> and restart
            the server. Until then the website renders its bundled starter
            content and nothing can be saved.
          </p>
        </div>
      ) : (
        <>
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Bookings"
              value={stats.bookings.total}
              detail={`${stats.bookings.pending} pending · ${stats.bookings.confirmed} confirmed`}
              href="/admin/bookings"
            />
            <StatCard
              label="Messages"
              value={stats.messages.total}
              detail={`${stats.messages.unread} unread`}
              href="/admin/messages"
            />
            <StatCard
              label="Orders"
              value={stats.orders.total}
              detail={`${stats.orders.pending} awaiting payment`}
              href="/admin/orders"
            />
            <StatCard
              label="Revenue"
              value={formatMoney(stats.orders.revenue)}
              detail="Paid, shipped and completed orders"
              href="/admin/orders"
            />
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <RecentPanel
              title="Latest bookings"
              href="/admin/bookings"
              isEmpty={stats.recentBookings.length === 0}
              emptyText="No booking requests yet."
            >
              {stats.recentBookings.map((booking) => (
                <li
                  key={booking._id}
                  className="flex items-start justify-between gap-4 px-5 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {booking.customerName}
                    </p>
                    <p className="truncate text-xs text-muted">
                      {booking.serviceName} · {booking.date} at {booking.time}
                    </p>
                  </div>
                  {renderCell(booking.status, "badge", bookingTones)}
                </li>
              ))}
            </RecentPanel>

            <RecentPanel
              title="Latest messages"
              href="/admin/messages"
              isEmpty={stats.recentMessages.length === 0}
              emptyText="No enquiries yet."
            >
              {stats.recentMessages.map((message) => (
                <li
                  key={message._id}
                  className="flex items-start justify-between gap-4 px-5 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {message.subject}
                    </p>
                    <p className="truncate text-xs text-muted">
                      {message.name} · {formatDate(message.createdAt)}
                    </p>
                  </div>
                  {renderCell(message.status, "badge", messageTones)}
                </li>
              ))}
            </RecentPanel>
          </section>

          <section className="rounded-lg border border-border bg-surface p-5">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Published content
            </h2>
            <p className="mt-1 text-sm text-muted">
              Records currently stored for each part of the website.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <CatalogChip
                label="Services"
                count={stats.catalog.services}
                href="/admin/services"
              />
              <CatalogChip
                label="Pricing plans"
                count={stats.catalog.pricingPlans}
                href="/admin/pricing"
              />
              <CatalogChip
                label="Products"
                count={stats.catalog.products}
                href="/admin/products"
              />
              <CatalogChip
                label="Blog posts"
                count={stats.catalog.blogPosts}
                href="/admin/blog"
              />
              <CatalogChip
                label="Team"
                count={stats.catalog.teamMembers}
                href="/admin/team"
              />
              <CatalogChip
                label="Testimonials"
                count={stats.catalog.testimonials}
                href="/admin/testimonials"
              />
              <CatalogChip
                label="Gallery"
                count={stats.catalog.galleryItems}
                href="/admin/gallery"
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
}

async function loadStats(): Promise<AdminStatsSummary | null> {
  try {
    return await getAdminStats();
  } catch (error) {
    console.error("[admin] Could not load dashboard statistics:", error);
    return null;
  }
}

function RecentPanel({
  title,
  href,
  isEmpty,
  emptyText,
  children,
}: {
  title: string;
  href: string;
  isEmpty: boolean;
  emptyText: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <h2 className="font-display text-base font-semibold text-foreground">
          {title}
        </h2>
        <Link
          href={href}
          className="text-sm text-accent transition-colors hover:text-accent-hover"
        >
          View all
        </Link>
      </div>
      {isEmpty ? (
        <p className="px-5 py-8 text-center text-sm text-muted">{emptyText}</p>
      ) : (
        <ul className="divide-y divide-border">{children}</ul>
      )}
    </div>
  );
}

function CatalogChip({
  label,
  count,
  href,
}: {
  label: string;
  count: number;
  href: string;
}) {
  return (
    <Link href={href} className="group">
      <Badge
        variant="outline"
        className="gap-2 py-1 transition-colors group-hover:border-accent/60"
      >
        {label}
        <span className="font-semibold text-accent">{count}</span>
      </Badge>
    </Link>
  );
}
