/** Central registry of MongoDB model names, keeping registration consistent. */
export const MODEL_NAMES = {
  USER: "User",
  CONTACT_MESSAGE: "ContactMessage",
  PRODUCT: "Product",
  CATEGORY: "Category",
  ORDER: "Order",
  BOOKING: "Booking",
  SERVICE: "Service",
  TEAM_MEMBER: "TeamMember",
  TESTIMONIAL: "Testimonial",
  FAQ: "FAQ",
  BLOG_POST: "BlogPost",
  GALLERY_ITEM: "GalleryItem",
  PRICING_PLAN: "PricingPlan",
  SITE_SETTINGS: "SiteSettings",
  STORED_UPLOAD: "StoredUpload",
} as const;

export type ModelName = (typeof MODEL_NAMES)[keyof typeof MODEL_NAMES];
