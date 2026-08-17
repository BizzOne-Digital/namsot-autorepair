/**
 * Plain, JSON-safe shapes returned by the content layer. Public pages and
 * admin screens both consume these, so they never depend on Mongoose types.
 */

export interface ContentService {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  features: string[];
  duration: string;
  priceFrom: number;
  imageUrl: string;
  imageAlt: string;
  isActive: boolean;
  order: number;
}

export interface ContentCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
  order: number;
}

export interface ContentProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice: number | null;
  categoryId: string | null;
  categoryName: string | null;
  images: string[];
  stock: number;
  sku: string;
  isActive: boolean;
  isFeatured: boolean;
}

export interface ContentTeamMember {
  _id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  imageAlt: string;
  order: number;
  isPublished: boolean;
}

export interface ContentTestimonial {
  _id: string;
  authorName: string;
  rating: number;
  review: string;
  vehicle: string;
  imageUrl: string;
  imageAlt: string;
  order: number;
  isPublished: boolean;
}

export interface ContentFAQ {
  _id: string;
  question: string;
  answer: string;
  order: number;
  isPublished: boolean;
}

export interface ContentGalleryItem {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  order: number;
  isPublished: boolean;
}

export interface ContentPricingPlan {
  _id: string;
  name: string;
  description: string;
  price: number;
  priceNote: string;
  features: string[];
  highlighted: boolean;
  isActive: boolean;
  order: number;
}

export interface ContentBlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  publishedAt: string | null;
  author: string;
  category: string;
  readTime: string;
  imageUrl: string;
  imageAlt: string;
  isPublished: boolean;
}

export interface ContentSocialLinks {
  facebook: string;
  instagram: string;
  x: string;
  youtube: string;
  linkedin: string;
}

export interface ContentOpeningHours {
  days: string;
  hours: string;
}

export interface ContentSiteSettings {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  addressLine: string;
  socialLinks: ContentSocialLinks;
  heroHeadline: string;
  heroSubheadline: string;
  heroPrimaryCtaLabel: string;
  heroPrimaryCtaHref: string;
  heroSecondaryCtaLabel: string;
  heroSecondaryCtaHref: string;
  promoTitle: string;
  promoDescription: string;
  promoCtaLabel: string;
  promoCtaHref: string;
  openingHours: ContentOpeningHours[];
}
