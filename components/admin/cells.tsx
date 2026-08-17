import type { ReactNode } from "react";
import { Badge } from "@/components/ui/Badge";
import type { BadgeTone, CellRenderer } from "@/lib/admin/view-types";
import { cn } from "@/utils/cn";

const currency = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 2,
});

export function formatMoney(value: unknown): string {
  const amount = typeof value === "number" ? value : Number(value);
  return Number.isFinite(amount) ? currency.format(amount) : "—";
}

export function formatDate(value: unknown): string {
  const date = toDate(value);
  if (!date) return "—";
  return date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(value: unknown): string {
  const date = toDate(value);
  if (!date) return "—";
  return `${formatDate(date)} · ${date.toLocaleTimeString("en-CA", {
    hour: "numeric",
    minute: "2-digit",
  })}`;
}

function toDate(value: unknown): Date | null {
  if (value instanceof Date) return value;
  if (typeof value !== "string" || value.trim() === "") return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

interface OrderLine {
  name?: string;
  quantity?: number;
  price?: number;
}

/**
 * Turns a raw API value into table/detail markup. Keeping this in one place means
 * a status badge or price looks identical everywhere in the dashboard.
 */
export function renderCell(
  value: unknown,
  renderer: CellRenderer = "text",
  tones?: Record<string, BadgeTone>,
): ReactNode {
  switch (renderer) {
    case "money":
      return formatMoney(value);

    case "date":
      return formatDate(value);

    case "datetime":
      return formatDateTime(value);

    case "boolean":
      return (
        <Badge variant={value ? "success" : "muted"}>
          {value ? "Yes" : "No"}
        </Badge>
      );

    case "badge": {
      const label = String(value ?? "—");
      return (
        <Badge variant={tones?.[label] ?? "muted"} className="capitalize">
          {label}
        </Badge>
      );
    }

    case "thumbnail": {
      const source = Array.isArray(value) ? value[0] : value;
      if (typeof source !== "string" || source === "") {
        return (
          <span className="block size-10 rounded border border-border bg-surface-muted" />
        );
      }
      return (
        // Admins may point images at any host, and dashboard thumbnails do not
        // benefit from the image optimizer.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={source}
          alt=""
          className="size-10 rounded border border-border object-cover"
          loading="lazy"
        />
      );
    }

    case "list": {
      if (!Array.isArray(value) || value.length === 0) return "—";
      return (
        <ul className="space-y-1">
          {value.map((entry, index) => (
            <li key={index}>{String(entry)}</li>
          ))}
        </ul>
      );
    }

    case "orderItems": {
      if (!Array.isArray(value) || value.length === 0) return "—";
      return (
        <ul className="space-y-1">
          {(value as OrderLine[]).map((item, index) => (
            <li key={index} className="flex justify-between gap-4">
              <span>
                {item.name ?? "Item"} × {item.quantity ?? 1}
              </span>
              <span className="tabular-nums">{formatMoney(item.price)}</span>
            </li>
          ))}
        </ul>
      );
    }

    case "longText":
      return (
        <span className="block whitespace-pre-line">
          {toDisplayText(value)}
        </span>
      );

    case "muted":
      return <span className="text-muted">{toDisplayText(value)}</span>;

    default:
      return toDisplayText(value);
  }
}

function toDisplayText(value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  if (Array.isArray(value)) return value.join(", ");
  return String(value);
}

export const hideBelowClass = {
  sm: "hidden sm:table-cell",
  md: "hidden md:table-cell",
  lg: "hidden lg:table-cell",
} as const;

export function cellClass(hideBelow?: "sm" | "md" | "lg", extra?: string) {
  return cn(hideBelow ? hideBelowClass[hideBelow] : undefined, extra);
}
