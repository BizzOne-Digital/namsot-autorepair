import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { getServiceBySlug } from "@/lib/content";
import { FadeIn } from "@/components/motion/FadeIn";
import { BookingCTASection } from "@/components/sections/BookingCTASection";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: service.name,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <PageHeader title={service.name} description={service.shortDescription}>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.name },
          ]}
        />
      </PageHeader>

      <section className="section-spacing bg-section-light">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-charcoal">
                <Image
                  src={service.imageUrl}
                  alt={service.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </FadeIn>

            <FadeIn direction="left">
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
                  From ${service.priceFrom}
                </span>
                <span className="rounded-full bg-surface-muted px-3 py-1 text-sm text-muted">
                  {service.duration}
                </span>
              </div>

              <div className="mt-6 space-y-4 text-muted leading-relaxed">
                <p>{service.description}</p>
              </div>

              <Card className="mt-8">
                <h3 className="font-display font-semibold text-foreground">
                  What&apos;s Included
                </h3>
                <ul className="mt-4 space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-muted"
                    >
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>

              <Link
                href={`/booking?service=${service.slug}`}
                className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-accent px-8 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Book This Service
              </Link>
            </FadeIn>
          </div>
        </Container>
      </section>

      <BookingCTASection />
    </>
  );
}
