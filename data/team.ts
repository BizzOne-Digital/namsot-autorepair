export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  imageAlt: string;
}

// `crop=faces` keeps the subject framed when the portrait is cropped to the card ratio.
const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&crop=faces,entropy&w=600&h=750&q=80`;

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sanjeev Kumar",
    role: "Owner & Lead Technician",
    bio:
      "With over 15 years in automotive repair, Sanjeev founded Namsot Auto Repairs with a commitment to honest service and quality workmanship. He specializes in engine diagnostics and complex drivability issues.",
    imageUrl: unsplash("photo-1545262722-9e0d80a0bc01"),
    imageAlt: "Sanjeev Kumar, Owner and Lead Technician",
  },
  {
    id: "2",
    name: "Marcus Chen",
    role: "Senior Automotive Technician",
    bio:
      "Marcus brings certified expertise in brake systems, suspension, and alignment. His attention to detail ensures every vehicle leaves the shop performing at its best.",
    imageUrl: unsplash("photo-1554178562-3d08ff874bd8"),
    imageAlt: "Marcus Chen, Senior Automotive Technician",
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    role: "Diagnostic Specialist",
    bio:
      "Elena specializes in computer diagnostics and electrical systems. She excels at tracing complex issues and explaining technical problems in plain language for customers.",
    imageUrl: unsplash("photo-1581091224003-01e7c2e69f6f"),
    imageAlt: "Elena Rodriguez, Diagnostic Specialist",
  },
  {
    id: "4",
    name: "James O'Brien",
    role: "Maintenance Technician",
    bio:
      "James handles oil changes, tire services, and preventive maintenance with efficiency and care. He ensures routine services are never rushed and every vehicle gets a thorough inspection.",
    imageUrl: unsplash("photo-1748640857973-93524ef0fe7d"),
    imageAlt: "James O'Brien, Maintenance Technician",
  },
];

export function getAllTeamMembers(): TeamMember[] {
  return teamMembers;
}
