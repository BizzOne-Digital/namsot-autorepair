import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { getTeamMembers } from "@/lib/content";
import { TeamCard } from "@/components/team/TeamCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { BookingCTASection } from "@/components/sections/BookingCTASection";

import { images } from "@/data/images";
import { siteConfig } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Our Team",
  description: `Meet the skilled technicians and staff behind ${siteConfig.name}.`,
};

export default async function TeamPage() {
  const members = await getTeamMembers();

  return (
    <>
      <PageHeader
        title="Our Team"
        description="Skilled professionals dedicated to quality workmanship and exceptional customer service."
        imageUrl={images.teamHero.src}
        imageAlt={images.teamHero.alt}
        imageClassName="object-[60%_center]"
      />

      <section className="section-spacing bg-section-light">
        <Container>
          {members.length === 0 ? (
            <EmptyState
              title="Team profiles coming soon"
              description="We are putting our technician profiles together. Call the shop and we will introduce you to whoever will be working on your vehicle."
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {members.map((member, index) => (
                <FadeIn key={member._id} delay={index * 0.05}>
                  <TeamCard member={member} />
                </FadeIn>
              ))}
            </div>
          )}
        </Container>
      </section>

      <BookingCTASection />
    </>
  );
}
