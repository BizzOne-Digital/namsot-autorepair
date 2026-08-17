import type { BaseDocument } from "./api";

/** Future model interfaces — schemas implemented in later phases. */

export type UserRole = "admin" | "staff";

export interface User extends BaseDocument {
  email: string;
  name: string;
  role: UserRole;
}

export interface Product extends BaseDocument {
  name: string;
  slug: string;
  description: string;
  price: number;
  categoryId: string;
  images: string[];
  isActive: boolean;
}

export interface Category extends BaseDocument {
  name: string;
  slug: string;
  description?: string;
}

export interface Order extends BaseDocument {
  orderNumber: string;
  customerEmail: string;
  status: "pending" | "paid" | "shipped" | "completed" | "cancelled";
  total: number;
}

export interface Booking extends BaseDocument {
  customerName: string;
  customerEmail: string;
  serviceId: string;
  scheduledAt: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

export interface Service extends BaseDocument {
  name: string;
  slug: string;
  description: string;
  durationMinutes: number;
  price: number;
  isActive: boolean;
}

export interface TeamMember extends BaseDocument {
  name: string;
  role: string;
  bio?: string;
  imageUrl?: string;
}

export interface Testimonial extends BaseDocument {
  authorName: string;
  content: string;
  rating: number;
  isPublished: boolean;
}

export interface FAQ extends BaseDocument {
  question: string;
  answer: string;
  order: number;
  isPublished: boolean;
}

export interface BlogPost extends BaseDocument {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  isPublished: boolean;
  publishedAt?: string;
}

export interface GalleryItem extends BaseDocument {
  title: string;
  imageUrl: string;
  category?: string;
  order: number;
}

export interface PricingPlan extends BaseDocument {
  name: string;
  description: string;
  price: number;
  features: string[];
  isActive: boolean;
}

export interface SiteSettings extends BaseDocument {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: Record<string, string>;
}

export interface StoredUpload extends BaseDocument {
  filename: string;
  mimeType: string;
  size: number;
  path: string;
}
