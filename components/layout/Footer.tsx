import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { footerLinks } from "@/data/site";
import { LogoLink } from "./Logo";
import { getSiteSettings, mailtoHref, mapsHref, telHref } from "@/lib/content";

const SOCIAL_LABELS: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  x: "X",
  youtube: "YouTube",
  linkedin: "LinkedIn",
};

export async function Footer() {
  const settings = await getSiteSettings();
  const year = new Date().getFullYear();

  const socials = Object.entries(settings.socialLinks).filter(
    ([, url]) => Boolean(url),
  );

  return (
    <footer className="border-t border-charcoal-800 bg-charcoal text-off-white">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4 lg:py-16">
          <div className="space-y-4">
            <LogoLink size="lg" />
            <p className="text-sm text-off-white/70 leading-relaxed">
              Professional automotive repair and maintenance. Quality workmanship,
              honest service, and your safety on every job.
            </p>
            <div className="space-y-1 text-sm">
              <a
                href={mapsHref(settings.address)}
                target="_blank"
                rel="noreferrer noopener"
                className="block text-off-white/80 hover:text-accent transition-colors"
              >
                {settings.address}
              </a>
              <p className="text-off-white/60">{settings.addressLine}</p>
              <a
                href={telHref(settings.contactPhone)}
                className="text-off-white/80 hover:text-accent transition-colors"
              >
                {settings.contactPhone}
              </a>
              <br />
              <a
                href={mailtoHref(settings.contactEmail)}
                className="text-off-white/80 hover:text-accent transition-colors"
              >
                {settings.contactEmail}
              </a>
            </div>
            {socials.length > 0 ? (
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {socials.map(([platform, url]) => (
                  <li key={platform}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-sm text-off-white/70 hover:text-accent transition-colors"
                    >
                      {SOCIAL_LABELS[platform] ?? platform}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
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
              {settings.openingHours.map((item) => (
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
            © {year} {settings.siteName}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
