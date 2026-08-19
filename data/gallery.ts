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
    title: "Our Waterloo Shop",
    category: "Facility",
    imageUrl: images.hero.src,
    imageAlt: images.hero.alt,
  },
  {
    id: "2",
    title: "Outdoor Service Station",
    category: "Facility",
    imageUrl: images.galleryTireWheel.src,
    imageAlt: images.galleryTireWheel.alt,
  },
  {
    id: "3",
    title: "Premium Vehicle Service",
    category: "Repairs",
    imageUrl: images.galleryShopFloor.src,
    imageAlt: images.galleryShopFloor.alt,
  },
  {
    id: "4",
    title: "Brake & Suspension Work",
    category: "Brakes",
    imageUrl: images.galleryBrakes.src,
    imageAlt: images.galleryBrakes.alt,
  },
  {
    id: "5",
    title: "Sikandar — Engine Service",
    category: "Team",
    imageUrl: images.galleryEngineBay.src,
    imageAlt: images.galleryEngineBay.alt,
  },
  {
    id: "6",
    title: "Alignment & Wheel Studio",
    category: "Alignment",
    imageUrl: images.galleryAlignment.src,
    imageAlt: images.galleryAlignment.alt,
  },
  {
    id: "7",
    title: "Diagnostics Bay",
    category: "Diagnostics",
    imageUrl: images.galleryDiagnostics.src,
    imageAlt: images.galleryDiagnostics.alt,
  },
  {
    id: "8",
    title: "Undercarriage Inspection",
    category: "Inspection",
    imageUrl: images.galleryUndercarriage.src,
    imageAlt: images.galleryUndercarriage.alt,
  },
  {
    id: "9",
    title: "Shop Floor Overview",
    category: "Facility",
    imageUrl: images.galleryElectrical.src,
    imageAlt: images.galleryElectrical.alt,
  },
];

export function getAllGalleryItems(): GalleryItem[] {
  return galleryItems;
}
