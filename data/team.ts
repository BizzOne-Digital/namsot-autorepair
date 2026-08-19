import { images } from "./images";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  imageAlt: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sanjeev Kumar",
    role: "Owner & Lead Technician",
    bio:
      "With over 15 years in automotive repair, Sanjeev founded Namsot Auto repairs & tire works with a commitment to honest service and quality workmanship. He specializes in engine diagnostics and complex drivability issues.",
    imageUrl: images.teamLead.src,
    imageAlt: images.teamLead.alt,
  },
  {
    id: "2",
    name: "Marcus Chen",
    role: "Senior Automotive Technician",
    bio:
      "Marcus brings certified expertise in brake systems, suspension, and alignment. His attention to detail ensures every vehicle leaves the shop performing at its best.",
    imageUrl: images.teamSenior.src,
    imageAlt: images.teamSenior.alt,
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    role: "Diagnostic Specialist",
    bio:
      "Elena specializes in computer diagnostics and electrical systems. She excels at tracing complex issues and explaining technical problems in plain language for customers.",
    imageUrl: images.teamDiagnostic.src,
    imageAlt: images.teamDiagnostic.alt,
  },
  {
    id: "4",
    name: "James O'Brien",
    role: "Maintenance Technician",
    bio:
      "James handles oil changes, tire services, and preventive maintenance with efficiency and care. He ensures routine services are never rushed and every vehicle gets a thorough inspection.",
    imageUrl: images.teamMaintenance.src,
    imageAlt: images.teamMaintenance.alt,
  },
];

export function getAllTeamMembers(): TeamMember[] {
  return teamMembers;
}
