import { images } from "./images";

export interface ProductPlaceholder {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

/** Placeholder products for shop UI — will be replaced by MongoDB/e-commerce in a future phase. */
export const placeholderProducts: ProductPlaceholder[] = [
  {
    id: "1",
    name: "Premium Synthetic Oil (5L)",
    description: "Full synthetic engine oil for modern vehicles.",
    price: 54.99,
    category: "Fluids",
    imageUrl: images.productOil.src,
    imageAlt: images.productOil.alt,
  },
  {
    id: "2",
    name: "OEM Oil Filter",
    description: "High-quality oil filter for most makes and models.",
    price: 14.99,
    category: "Filters",
    imageUrl: images.productFilter.src,
    imageAlt: images.productFilter.alt,
  },
  {
    id: "3",
    name: "Brake Pad Set (Front)",
    description: "Ceramic brake pads for quiet, reliable stopping.",
    price: 89.99,
    category: "Brakes",
    imageUrl: images.productBrakePads.src,
    imageAlt: images.productBrakePads.alt,
  },
  {
    id: "4",
    name: "Battery — Group Size 24",
    description: "Reliable starting power with 3-year warranty.",
    price: 149.99,
    category: "Electrical",
    imageUrl: images.productBattery.src,
    imageAlt: images.productBattery.alt,
  },
];

export function getPlaceholderProducts(): ProductPlaceholder[] {
  return placeholderProducts;
}

export function getFeaturedProducts(count = 3): ProductPlaceholder[] {
  return placeholderProducts.slice(0, count);
}
