export interface Testimonial {
  id: string;
  authorName: string;
  rating: number;
  review: string;
  vehicle?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    authorName: "David Thompson",
    rating: 5,
    review:
      "Namsot Auto repairs & tire works diagnosed an engine issue that two other shops couldn't figure out. Sanjeev explained everything clearly and the repair was done right the first time. Highly recommend.",
    vehicle: "2018 Honda Civic",
  },
  {
    id: "2",
    authorName: "Sarah Mitchell",
    rating: 5,
    review:
      "I've been bringing my family's vehicles here for three years. Fair pricing, honest recommendations, and they never try to upsell unnecessary work. That's rare in this industry.",
    vehicle: "2020 Toyota RAV4",
  },
  {
    id: "3",
    authorName: "Robert Hayes",
    rating: 5,
    review:
      "Quick brake service with quality parts and a full explanation of what was done. The car feels solid and safe again. Professional team that treats you with respect.",
    vehicle: "2016 Ford F-150",
  },
  {
    id: "4",
    authorName: "Amanda Lewis",
    rating: 5,
    review:
      "Booked an oil change and they found a worn belt during the inspection. Fixed it before it failed on the highway. Grateful for their thorough approach to maintenance.",
    vehicle: "2019 Mazda CX-5",
  },
  {
    id: "5",
    authorName: "Kevin Park",
    rating: 4,
    review:
      "Great experience with tire change and alignment. Car drives noticeably smoother. Wait time was a bit longer than expected but the quality of work made it worthwhile.",
    vehicle: "2021 Subaru Outback",
  },
  {
    id: "6",
    authorName: "Jennifer Walsh",
    rating: 5,
    review:
      "The A/C in my car stopped working before summer. They found a leak, repaired it, and recharged the system. Cool air again and a fair bill. Will definitely return.",
    vehicle: "2017 Hyundai Tucson",
  },
];

export function getAllTestimonials(): Testimonial[] {
  return testimonials;
}

export function getFeaturedTestimonials(count = 3): Testimonial[] {
  return testimonials.slice(0, count);
}
