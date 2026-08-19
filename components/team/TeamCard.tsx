import Image from "next/image";
import type { ContentTeamMember } from "@/lib/content/types";
import { Card } from "@/components/ui/Card";
import { cn } from "@/utils/cn";

interface TeamCardProps {
  member: ContentTeamMember;
  className?: string;
}

export function TeamCard({ member, className }: TeamCardProps) {
  const isPortraitTechnician = member.imageUrl.includes("client-sikandar");

  return (
    <Card padding="none" className={cn("overflow-hidden", className)}>
      <div className="relative aspect-[4/5] bg-charcoal">
        <Image
          src={member.imageUrl}
          alt={member.imageAlt}
          fill
          className={cn(
            "object-cover",
            isPortraitTechnician ? "object-[22%_42%]" : "object-top",
          )}
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-foreground">
          {member.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-accent">{member.role}</p>
        <p className="mt-3 text-sm text-muted line-clamp-3">{member.bio}</p>
      </div>
    </Card>
  );
}
