import { blogPosts } from "@/data/blog";
import { faqItems } from "@/data/faq";
import { galleryItems } from "@/data/gallery";
import { pricingPlans } from "@/data/pricing";
import { placeholderProducts } from "@/data/products";
import { services } from "@/data/services";
import {
  businessInfo,
  heroContent,
  openingHours,
  promoContent,
} from "@/data/site";
import { teamMembers } from "@/data/team";
import { testimonials } from "@/data/testimonials";
import type {
  ContentBlogPost,
  ContentCategory,
  ContentFAQ,
  ContentGalleryItem,
  ContentPricingPlan,
  ContentProduct,
  ContentService,
  ContentSiteSettings,
  ContentTeamMember,
  ContentTestimonial,
} from "./types";

/**
 * The launch content shipped with the project. It is imported into MongoDB the
 * first time the database is used, and also acts as the render fallback when no
 * `MONGODB_URI` is configured so the marketing site is never blank.
 *
 * Once content lives in MongoDB the database is the only source of truth — an
 * empty collection renders an empty section rather than falling back to these.
 */

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const defaultServices: ContentService[] = services.map(
  (service, index) => ({
    _id: service.slug,
    name: service.name,
    slug: service.slug,
    shortDescription: service.shortDescription,
    description: service.description,
    features: [...service.features],
    duration: service.duration,
    priceFrom: service.priceFrom,
    imageUrl: service.imageUrl,
    imageAlt: service.imageAlt,
    isActive: true,
    order: index,
  }),
);

const productCategoryNames = Array.from(
  new Set(placeholderProducts.map((product) => product.category)),
);

export const defaultCategories: ContentCategory[] = productCategoryNames.map(
  (name, index) => ({
    _id: slugify(name),
    name,
    slug: slugify(name),
    description: `${name} for routine maintenance and repairs.`,
    isActive: true,
    order: index,
  }),
);

export const defaultProducts: ContentProduct[] = placeholderProducts.map(
  (product) => ({
    _id: slugify(product.name),
    name: product.name,
    slug: slugify(product.name),
    description: product.description,
    shortDescription: product.description,
    price: product.price,
    compareAtPrice: null,
    categoryId: slugify(product.category),
    categoryName: product.category,
    images: [product.imageUrl],
    stock: 25,
    sku: "",
    isActive: true,
    isFeatured: true,
  }),
);

export const defaultTeamMembers: ContentTeamMember[] = teamMembers.map(
  (member, index) => ({
    _id: member.id,
    name: member.name,
    role: member.role,
    bio: member.bio,
    imageUrl: member.imageUrl,
    imageAlt: member.imageAlt,
    order: index,
    isPublished: true,
  }),
);

export const defaultTestimonials: ContentTestimonial[] = testimonials.map(
  (testimonial, index) => ({
    _id: testimonial.id,
    authorName: testimonial.authorName,
    rating: testimonial.rating,
    review: testimonial.review,
    vehicle: testimonial.vehicle ?? "",
    imageUrl: testimonial.imageUrl ?? "",
    imageAlt: testimonial.imageAlt ?? "",
    order: index,
    isPublished: true,
  }),
);

export const defaultFaqs: ContentFAQ[] = faqItems.map((item, index) => ({
  _id: item.id,
  question: item.question,
  answer: item.answer,
  order: index,
  isPublished: true,
}));

export const defaultGalleryItems: ContentGalleryItem[] = galleryItems.map(
  (item, index) => ({
    _id: item.id,
    title: item.title,
    category: item.category,
    imageUrl: item.imageUrl,
    imageAlt: item.imageAlt,
    order: index,
    isPublished: true,
  }),
);

export const defaultPricingPlans: ContentPricingPlan[] = pricingPlans.map(
  (plan, index) => ({
    _id: plan.id,
    name: plan.name,
    description: plan.description,
    price: plan.price,
    priceNote: plan.priceNote ?? "",
    features: [...plan.features],
    highlighted: plan.highlighted ?? false,
    isActive: true,
    order: index,
  }),
);

export const defaultBlogPosts: ContentBlogPost[] = blogPosts.map((post) => ({
  _id: post.slug,
  title: post.title,
  slug: post.slug,
  excerpt: post.excerpt,
  content: [...post.content],
  publishedAt: new Date(post.publishedAt).toISOString(),
  author: post.author,
  category: post.category,
  readTime: post.readTime,
  imageUrl: post.imageUrl,
  imageAlt: post.imageAlt,
  isPublished: true,
}));

export const defaultSiteSettings: ContentSiteSettings = {
  siteName: businessInfo.name,
  contactEmail: businessInfo.email,
  contactPhone: businessInfo.phone,
  address: businessInfo.address,
  addressLine: businessInfo.addressLine,
  socialLinks: {
    facebook: "",
    instagram: "",
    x: "",
    youtube: "",
    linkedin: "",
  },
  heroHeadline: heroContent.headline,
  heroSubheadline: heroContent.subheadline,
  heroPrimaryCtaLabel: heroContent.primaryCta.label,
  heroPrimaryCtaHref: heroContent.primaryCta.href,
  heroSecondaryCtaLabel: heroContent.secondaryCta.label,
  heroSecondaryCtaHref: heroContent.secondaryCta.href,
  promoTitle: promoContent.title,
  promoDescription: promoContent.description,
  promoCtaLabel: promoContent.cta.label,
  promoCtaHref: promoContent.cta.href,
  openingHours: openingHours.map((entry) => ({
    days: entry.days,
    hours: entry.hours,
  })),
};
