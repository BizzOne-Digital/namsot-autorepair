import "server-only";
import { cache } from "react";
import { connectDB, isDbConfigured, toPlainArray, toPlainObject } from "@/lib/db";
import {
  BlogPost,
  Category,
  FAQ,
  GalleryItem,
  PricingPlan,
  Product,
  Service,
  SiteSettings,
  SITE_SETTINGS_KEY,
  TeamMember,
  Testimonial,
} from "@/models";
import {
  defaultBlogPosts,
  defaultCategories,
  defaultFaqs,
  defaultGalleryItems,
  defaultPricingPlans,
  defaultProducts,
  defaultServices,
  defaultSiteSettings,
  defaultTeamMembers,
  defaultTestimonials,
} from "./defaults";
import {
  mergeBlogImages,
  mergeGalleryImages,
  mergeServiceImages,
  mergeTeamImages,
} from "./bundled-media";
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
 * Reads used by the public site. Nothing here is stored in the Next.js data
 * cache: every request queries MongoDB directly, so a change saved in the admin
 * dashboard is visible on the next page load. `cache()` only deduplicates
 * repeated calls within a single render.
 *
 * When `MONGODB_URI` is missing — or a query fails — the bundled launch content
 * is rendered instead of an error page.
 */
async function read<T>(
  label: string,
  query: () => Promise<T>,
  fallback: () => T,
): Promise<T> {
  if (!isDbConfigured()) {
    return fallback();
  }

  try {
    await connectDB();
    return await query();
  } catch (error) {
    console.error(`[content] Could not load ${label} from MongoDB:`, error);
    return fallback();
  }
}

export const getServices = cache(async (): Promise<ContentService[]> =>
  mergeServiceImages(
    await read(
      "services",
      async () => {
        const documents = await Service.find({ isActive: true })
          .sort({ order: 1, name: 1 })
          .lean();
        return toPlainArray<ContentService>(documents);
      },
      () => defaultServices,
    ),
  ),
);

export const getServiceBySlug = cache(
  async (slug: string): Promise<ContentService | null> => {
    const service = await read(
      `service "${slug}"`,
      async () => {
        const document = await Service.findOne({
          slug: slug.toLowerCase(),
          isActive: true,
        }).lean();
        return document ? toPlainObject<ContentService>(document) : null;
      },
      () => defaultServices.find((service) => service.slug === slug) ?? null,
    );

    if (!service) {
      return null;
    }

    return mergeServiceImages([service])[0] ?? null;
  },
);

export const getCategories = cache(async (): Promise<ContentCategory[]> =>
  read(
    "product categories",
    async () => {
      const documents = await Category.find({ isActive: true })
        .sort({ order: 1, name: 1 })
        .lean();
      return toPlainArray<ContentCategory>(documents);
    },
    () => defaultCategories,
  ),
);

export const getProducts = cache(async (): Promise<ContentProduct[]> =>
  read(
    "products",
    async () => {
      const [documents, categories] = await Promise.all([
        Product.find({ isActive: true }).sort({ name: 1 }).lean(),
        Category.find({}).select("_id name").lean(),
      ]);

      const categoryNameById = new Map(
        categories.map((category) => [String(category._id), category.name]),
      );

      return toPlainArray<ContentProduct>(documents).map((product) => ({
        ...product,
        categoryName: product.categoryId
          ? categoryNameById.get(product.categoryId) ?? null
          : null,
      }));
    },
    () => defaultProducts,
  ),
);

export const getFeaturedProducts = cache(
  async (limit = 3): Promise<ContentProduct[]> => {
    const products = await getProducts();
    const featured = products.filter((product) => product.isFeatured);
    return (featured.length > 0 ? featured : products).slice(0, limit);
  },
);

export const getTeamMembers = cache(async (): Promise<ContentTeamMember[]> =>
  mergeTeamImages(
    await read(
      "team members",
      async () => {
        const documents = await TeamMember.find({ isPublished: true })
          .sort({ order: 1, name: 1 })
          .lean();
        return toPlainArray<ContentTeamMember>(documents);
      },
      () => defaultTeamMembers,
    ),
  ),
);

export const getTestimonials = cache(async (): Promise<ContentTestimonial[]> =>
  read(
    "testimonials",
    async () => {
      const documents = await Testimonial.find({ isPublished: true })
        .sort({ order: 1, createdAt: -1 })
        .lean();
      return toPlainArray<ContentTestimonial>(documents);
    },
    () => defaultTestimonials,
  ),
);

export const getFaqs = cache(async (): Promise<ContentFAQ[]> =>
  read(
    "FAQs",
    async () => {
      const documents = await FAQ.find({ isPublished: true })
        .sort({ order: 1 })
        .lean();
      return toPlainArray<ContentFAQ>(documents);
    },
    () => defaultFaqs,
  ),
);

export const getGalleryItems = cache(async (): Promise<ContentGalleryItem[]> =>
  mergeGalleryImages(
    await read(
      "gallery items",
      async () => {
        const documents = await GalleryItem.find({ isPublished: true })
          .sort({ order: 1, createdAt: -1 })
          .lean();
        return toPlainArray<ContentGalleryItem>(documents);
      },
      () => defaultGalleryItems,
    ),
  ),
);

export const getPricingPlans = cache(async (): Promise<ContentPricingPlan[]> =>
  read(
    "pricing plans",
    async () => {
      const documents = await PricingPlan.find({ isActive: true })
        .sort({ order: 1, price: 1 })
        .lean();
      return toPlainArray<ContentPricingPlan>(documents);
    },
    () => defaultPricingPlans,
  ),
);

export const getBlogPosts = cache(async (): Promise<ContentBlogPost[]> =>
  mergeBlogImages(
    await read(
      "blog posts",
      async () => {
        const documents = await BlogPost.find({ isPublished: true })
          .sort({ publishedAt: -1, createdAt: -1 })
          .lean();
        return toPlainArray<ContentBlogPost>(documents);
      },
      () => defaultBlogPosts,
    ),
  ),
);

export const getBlogPostBySlug = cache(
  async (slug: string): Promise<ContentBlogPost | null> => {
    const post = await read(
      `blog post "${slug}"`,
      async () => {
        const document = await BlogPost.findOne({
          slug: slug.toLowerCase(),
          isPublished: true,
        }).lean();
        return document ? toPlainObject<ContentBlogPost>(document) : null;
      },
      () => defaultBlogPosts.find((post) => post.slug === slug) ?? null,
    );

    if (!post) {
      return null;
    }

    return mergeBlogImages([post])[0] ?? null;
  },
);

export const getSiteSettings = cache(async (): Promise<ContentSiteSettings> =>
  read(
    "site settings",
    async () => {
      const document = await SiteSettings.findOne({
        key: SITE_SETTINGS_KEY,
      }).lean();

      if (!document) {
        return defaultSiteSettings;
      }

      const settings = toPlainObject<Partial<ContentSiteSettings>>(document);

      // Merge over the defaults so a partially filled document still renders.
      return {
        ...defaultSiteSettings,
        ...stripEmpty(settings),
        contactEmail: defaultSiteSettings.contactEmail,
        address: defaultSiteSettings.address,
        addressLine: defaultSiteSettings.addressLine,
        socialLinks: {
          ...defaultSiteSettings.socialLinks,
          ...(settings.socialLinks ?? {}),
        },
        openingHours:
          settings.openingHours && settings.openingHours.length > 0
            ? settings.openingHours
            : defaultSiteSettings.openingHours,
      };
    },
    () => defaultSiteSettings,
  ),
);

function stripEmpty<T extends object>(value: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(value).filter(
      ([, entry]) => entry !== null && entry !== undefined && entry !== "",
    ),
  ) as Partial<T>;
}
