import { images } from "./images";

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Engine Bay Service",
    category: "Maintenance",
    imageUrl: images.galleryEngineBay.src,
    imageAlt: images.galleryEngineBay.alt,
  },
  {
    id: "2",
    title: "Brake System Work",
    category: "Brakes",
    imageUrl: images.galleryBrakes.src,
    imageAlt: images.galleryBrakes.alt,
  },
  {
    id: "3",
    title: "Diagnostic Testing",
    category: "Diagnostics",
    imageUrl: images.galleryDiagnostics.src,
    imageAlt: images.galleryDiagnostics.alt,
  },
  {
    id: "4",
    title: "Tire & Wheel Service",
    category: "Tires",
    imageUrl: images.galleryTireWheel.src,
    imageAlt: images.galleryTireWheel.alt,
  },
  {
    id: "5",
    title: "Undercarriage Inspection",
    category: "Inspection",
    imageUrl: images.galleryUndercarriage.src,
    imageAlt: images.galleryUndercarriage.alt,
  },
  {
    id: "6",
    title: "Shop Floor",
    category: "Facility",
    imageUrl: images.galleryShopFloor.src,
    imageAlt: images.galleryShopFloor.alt,
  },
  {
    id: "7",
    title: "Battery Service",
    category: "Electrical",
    imageUrl: images.galleryElectrical.src,
    imageAlt: images.galleryElectrical.alt,
  },
  {
    id: "8",
    title: "Alignment Service",
    category: "Alignment",
    imageUrl: images.galleryAlignment.src,
    imageAlt: images.galleryAlignment.alt,
  },
  {
    id: "9",
    title: "Climate Control",
    category: "A/C",
    imageUrl: images.galleryClimate.src,
    imageAlt: images.galleryClimate.alt,
  },
];

export function getAllGalleryItems(): GalleryItem[] {
  return galleryItems;
}

export const galleryCategories = [
  "All",
  ...Array.from(new Set(galleryItems.map((item) => item.category))),
];
