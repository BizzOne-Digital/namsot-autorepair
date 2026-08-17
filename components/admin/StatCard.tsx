import Link from "next/link";

interface StatCardProps {
  label: string;
  value: string | number;
  detail?: string;
  href?: string;
}

export function StatCard({ label, value, detail, href }: StatCardProps) {
  const body = (
    <>
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold text-foreground">
        {value}
      </p>
      {detail ? <p className="mt-1 text-xs text-muted">{detail}</p> : null}
    </>
  );

  if (!href) {
    return (
      <div className="rounded-lg border border-border bg-surface p-5">{body}</div>
    );
  }

  return (
    <Link
      href={href}
      className="block rounded-lg border border-border bg-surface p-5 transition-colors hover:border-accent/50 hover:bg-surface-muted/40"
    >
      {body}
    </Link>
  );
}
