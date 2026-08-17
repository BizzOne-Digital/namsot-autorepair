export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;

export const galleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Engine Bay Service",
    category: "Maintenance",
    imageUrl: unsplash("photo-1725289339928-06ee31684df5"),
    imageAlt: "Detailed engine bay after a full service",
  },
  {
    id: "2",
    title: "Brake System Work",
    category: "Brakes",
    imageUrl: unsplash("photo-1588017530244-c57df911f73b"),
    imageAlt: "Brake rotor and caliper exposed during a brake repair",
  },
  {
    id: "3",
    title: "Diagnostic Testing",
    category: "Diagnostics",
    imageUrl: unsplash("photo-1638729529430-c4307b3616ec"),
    imageAlt: "Technician running a computer diagnostic scan inside a vehicle",
  },
  {
    id: "4",
    title: "Tire & Wheel Service",
    category: "Tires",
    imageUrl: unsplash("photo-1613214040468-d4d1cda18506"),
    imageAlt: "Wheel and tire on a vehicle raised on a shop lift",
  },
  {
    id: "5",
    title: "Undercarriage Inspection",
    category: "Inspection",
    imageUrl: unsplash("photo-1764869427688-3e97480f4b82"),
    imageAlt: "Undercarriage view of a vehicle during inspection",
  },
  {
    id: "6",
    title: "Shop Floor",
    category: "Facility",
    imageUrl: unsplash("photo-1597986346643-d54491ef85bb"),
    imageAlt: "Service bays and vehicle lifts on the shop floor",
  },
  {
    id: "7",
    title: "Battery Service",
    category: "Electrical",
    imageUrl: unsplash("photo-1632733711679-529326f6db12"),
    imageAlt: "Technician working on a vehicle's electrical system",
  },
  {
    id: "8",
    title: "Alignment Service",
    category: "Alignment",
    imageUrl: unsplash("photo-1658351354155-e854d19233e0"),
    imageAlt: "Alignment and wheel balancing equipment in the service bay",
  },
  {
    id: "9",
    title: "Climate Control",
    category: "A/C",
    imageUrl: unsplash("photo-1762250320345-8cbbd44637d4"),
    imageAlt: "Vehicle dashboard and climate controls after servicing",
  },
];

export function getAllGalleryItems(): GalleryItem[] {
  return galleryItems;
}

export const galleryCategories = [
  "All",
  ...Array.from(new Set(galleryItems.map((item) => item.category))),
];
