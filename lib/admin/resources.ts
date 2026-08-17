import {
  BlogPost,
  Booking,
  Category,
  ContactMessage,
  FAQ,
  GalleryItem,
  Order,
  PricingPlan,
  Product,
  Service,
  TeamMember,
  Testimonial,
  type IBlogPost,
  type IBooking,
  type ICategory,
  type IContactMessage,
  type IFAQ,
  type IGalleryItem,
  type IOrder,
  type IPricingPlan,
  type IProduct,
  type IService,
  type ITeamMember,
  type ITestimonial,
} from "@/models";
import {
  blogPostSchema,
  blogPostUpdateSchema,
  bookingUpdateSchema,
  categorySchema,
  categoryUpdateSchema,
  contactMessageUpdateSchema,
  faqSchema,
  faqUpdateSchema,
  galleryItemSchema,
  galleryItemUpdateSchema,
  orderUpdateSchema,
  pricingPlanSchema,
  pricingPlanUpdateSchema,
  productSchema,
  productUpdateSchema,
  serviceSchema,
  serviceUpdateSchema,
  teamMemberSchema,
  teamMemberUpdateSchema,
  testimonialSchema,
  testimonialUpdateSchema,
} from "@/lib/validation/admin-resources";
import type { AdminResourceRouteConfig } from "./resource";

/**
 * One definition per admin-managed collection. The route handlers are generated
 * from these, which keeps validation, sorting and search behaviour consistent.
 */

export const serviceResource: AdminResourceRouteConfig<IService> = {
  label: "Service",
  model: Service,
  createSchema: serviceSchema,
  updateSchema: serviceUpdateSchema,
  searchFields: ["name", "slug", "shortDescription"],
  filterFields: ["isActive"],
  sortableFields: ["name", "priceFrom", "order", "createdAt"],
  defaultSort: { order: 1, name: 1 },
};

export const categoryResource: AdminResourceRouteConfig<ICategory> = {
  label: "Category",
  model: Category,
  createSchema: categorySchema,
  updateSchema: categoryUpdateSchema,
  searchFields: ["name", "slug"],
  sortableFields: ["name", "order", "createdAt"],
  defaultSort: { order: 1, name: 1 },
  guardDelete: async (id) => {
    const linkedProducts = await Product.countDocuments({ categoryId: id });
    return linkedProducts > 0
      ? `This category is still used by ${linkedProducts} product(s). Reassign them first.`
      : null;
  },
};

export const productResource: AdminResourceRouteConfig<IProduct> = {
  label: "Product",
  model: Product,
  createSchema: productSchema,
  updateSchema: productUpdateSchema,
  searchFields: ["name", "slug", "sku"],
  filterFields: ["categoryId", "isActive", "isFeatured"],
  sortableFields: ["name", "price", "stock", "createdAt"],
  defaultSort: { createdAt: -1 },
};

export const teamMemberResource: AdminResourceRouteConfig<ITeamMember> = {
  label: "Team member",
  model: TeamMember,
  createSchema: teamMemberSchema,
  updateSchema: teamMemberUpdateSchema,
  searchFields: ["name", "role"],
  filterFields: ["isPublished"],
  sortableFields: ["name", "order", "createdAt"],
  defaultSort: { order: 1, name: 1 },
};

export const testimonialResource: AdminResourceRouteConfig<ITestimonial> = {
  label: "Testimonial",
  model: Testimonial,
  createSchema: testimonialSchema,
  updateSchema: testimonialUpdateSchema,
  searchFields: ["authorName", "review", "vehicle"],
  filterFields: ["isPublished"],
  sortableFields: ["authorName", "rating", "order", "createdAt"],
  defaultSort: { order: 1, createdAt: -1 },
};

export const faqResource: AdminResourceRouteConfig<IFAQ> = {
  label: "FAQ",
  model: FAQ,
  createSchema: faqSchema,
  updateSchema: faqUpdateSchema,
  searchFields: ["question", "answer"],
  filterFields: ["isPublished"],
  sortableFields: ["order", "createdAt"],
  defaultSort: { order: 1 },
};

export const galleryItemResource: AdminResourceRouteConfig<IGalleryItem> = {
  label: "Gallery item",
  model: GalleryItem,
  createSchema: galleryItemSchema,
  updateSchema: galleryItemUpdateSchema,
  searchFields: ["title", "category"],
  filterFields: ["category", "isPublished"],
  sortableFields: ["title", "order", "createdAt"],
  defaultSort: { order: 1, createdAt: -1 },
};

export const pricingPlanResource: AdminResourceRouteConfig<IPricingPlan> = {
  label: "Pricing plan",
  model: PricingPlan,
  createSchema: pricingPlanSchema,
  updateSchema: pricingPlanUpdateSchema,
  searchFields: ["name", "description"],
  filterFields: ["isActive"],
  sortableFields: ["name", "price", "order", "createdAt"],
  defaultSort: { order: 1, price: 1 },
};

export const blogPostResource: AdminResourceRouteConfig<IBlogPost> = {
  label: "Blog post",
  model: BlogPost,
  createSchema: blogPostSchema,
  updateSchema: blogPostUpdateSchema,
  searchFields: ["title", "slug", "excerpt", "author", "category"],
  filterFields: ["isPublished", "category"],
  sortableFields: ["title", "publishedAt", "createdAt"],
  defaultSort: { publishedAt: -1, createdAt: -1 },
  prepare: (payload) => {
    // Publishing without an explicit date should stamp "now".
    if (payload.isPublished === true && !payload.publishedAt) {
      return { ...payload, publishedAt: new Date() };
    }
    return payload;
  },
};

export const bookingResource: AdminResourceRouteConfig<IBooking> = {
  label: "Booking",
  model: Booking,
  updateSchema: bookingUpdateSchema,
  searchFields: ["customerName", "email", "phone", "serviceName"],
  filterFields: ["status", "serviceSlug"],
  sortableFields: ["date", "customerName", "status", "createdAt"],
  defaultSort: { createdAt: -1 },
};

export const orderResource: AdminResourceRouteConfig<IOrder> = {
  label: "Order",
  model: Order,
  updateSchema: orderUpdateSchema,
  searchFields: ["orderNumber", "customerEmail", "customerName"],
  filterFields: ["status"],
  sortableFields: ["orderNumber", "total", "status", "createdAt"],
  defaultSort: { createdAt: -1 },
};

export const contactMessageResource: AdminResourceRouteConfig<IContactMessage> =
  {
    label: "Message",
    model: ContactMessage,
    updateSchema: contactMessageUpdateSchema,
    searchFields: ["name", "email", "subject", "message"],
    filterFields: ["status"],
    sortableFields: ["name", "status", "createdAt"],
    defaultSort: { createdAt: -1 },
  };
