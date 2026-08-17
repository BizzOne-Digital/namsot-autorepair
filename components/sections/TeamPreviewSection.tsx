import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getTeamMembers } from "@/lib/content";
import { TeamCard } from "@/components/team/TeamCard";
import { FadeIn } from "@/components/motion/FadeIn";

export async function TeamPreviewSection() {
  const members = (await getTeamMembers()).slice(0, 4);

  if (members.length === 0) {
    return null;
  }

  return (
    <section className="section-spacing bg-background">
      <Container>
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              title="Meet Our Team"
              subtitle="Skilled technicians committed to quality work and customer satisfaction."
            />
            <Link
              href="/team"
              className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
            >
              View full team →
            </Link>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member, index) => (
            <FadeIn key={member._id} delay={index * 0.05}>
              <TeamCard member={member} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
