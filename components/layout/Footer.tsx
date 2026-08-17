import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { businessInfo, footerLinks, openingHours } from "@/data/site";
import { siteConfig } from "@/lib/metadata";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-charcoal-800 bg-charcoal text-off-white">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4 lg:py-16">
          <div className="space-y-4">
            <div>
              <p className="font-display text-lg font-bold uppercase tracking-[0.12em]">
                NAMSOT
              </p>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-off-white/60">
                Auto Repairs
              </p>
            </div>
            <p className="text-sm text-off-white/70 leading-relaxed">
              Professional automotive repair and maintenance. Quality workmanship,
              honest service, and your safety on every job.
            </p>
            <div className="space-y-1 text-sm">
              <a
                href={businessInfo.phoneHref}
                className="text-off-white/80 hover:text-accent transition-colors"
              >
                {businessInfo.phone}
              </a>
              <br />
              <a
                href={businessInfo.emailHref}
                className="text-off-white/80 hover:text-accent transition-colors"
              >
                {businessInfo.email}
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-off-white">
              Services
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-off-white/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-off-white">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-off-white/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-off-white">
              Hours
            </h3>
            <ul className="mt-4 space-y-2">
              {openingHours.map((item) => (
                <li
                  key={item.days}
                  className="flex justify-between gap-4 text-sm text-off-white/70"
                >
                  <span>{item.days}</span>
                  <span>{item.hours}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-off-white/50 hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-charcoal-800 py-6">
          <p className="text-center text-sm text-off-white/50">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
