export interface ProductPlaceholder {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

// Square source keeps every product card cropped identically.
const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&h=600&q=80`;

/** Placeholder products for shop UI — will be replaced by MongoDB/e-commerce in a future phase. */
export const placeholderProducts: ProductPlaceholder[] = [
  {
    id: "1",
    name: "Premium Synthetic Oil (5L)",
    description: "Full synthetic engine oil for modern vehicles.",
    price: 54.99,
    category: "Fluids",
    imageUrl: unsplash("photo-1746014995485-e8a698f39804"),
    imageAlt: "Bottle of synthetic engine oil",
  },
  {
    id: "2",
    name: "OEM Oil Filter",
    description: "High-quality oil filter for most makes and models.",
    price: 14.99,
    category: "Filters",
    imageUrl: unsplash("photo-1552195634-fdabf904f26e"),
    imageAlt: "Spin-on oil filter alongside a bottle of motor oil",
  },
  {
    id: "3",
    name: "Brake Pad Set (Front)",
    description: "Ceramic brake pads for quiet, reliable stopping.",
    price: 89.99,
    category: "Brakes",
    imageUrl: unsplash("photo-1696494561430-de087dd0bd69"),
    imageAlt: "Brake rotor and caliper assembly",
  },
  {
    id: "4",
    name: "Battery — Group Size 24",
    description: "Reliable starting power with 3-year warranty.",
    price: 149.99,
    category: "Electrical",
    imageUrl: unsplash("photo-1676337167752-2062c6ca7366"),
    imageAlt: "12-volt automotive battery with terminal clamps",
  },
];

export function getPlaceholderProducts(): ProductPlaceholder[] {
  return placeholderProducts;
}

export function getFeaturedProducts(count = 3): ProductPlaceholder[] {
  return placeholderProducts.slice(0, count);
}
