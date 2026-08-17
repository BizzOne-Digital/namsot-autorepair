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
} from "@/lib/content/defaults";
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
import { connectDB } from "./mongodb";
import { asWritable } from "./write";

export type SeedReport = {
  seeded: boolean;
  inserted: Record<string, number>;
};

/**
 * Imports the launch content into MongoDB. Collections that already contain
 * documents are left untouched, so running this can never overwrite or delete
 * anything an admin has edited.
 */
export async function seedInitialContent(
  options: { auto?: boolean } = {},
): Promise<SeedReport> {
  await connectDB();

  const settings = await SiteSettings.findOne({ key: SITE_SETTINGS_KEY });

  // The automatic boot-time run happens only once per database.
  if (options.auto && settings?.contentSeededAt) {
    return { seeded: false, inserted: {} };
  }

  const inserted: Record<string, number> = {};

  if (!settings) {
    await SiteSettings.create({
      key: SITE_SETTINGS_KEY,
      ...defaultSiteSettings,
    });
    inserted.settings = 1;
  }

  inserted.services = await insertIfEmpty(
    Service,
    defaultServices.map(({ _id: _ignored, ...service }) => service),
  );

  const categoryIdBySlug = new Map<string, string>();
  inserted.categories = await insertIfEmpty(
    Category,
    defaultCategories.map(({ _id: _ignored, ...category }) => category),
  );

  const categories = await Category.find({}).select("_id slug").lean();
  for (const category of categories) {
    categoryIdBySlug.set(category.slug, String(category._id));
  }

  inserted.products = await insertIfEmpty(
    Product,
    defaultProducts.map(
      ({
        _id: _ignored,
        categoryId,
        categoryName: _categoryName,
        ...product
      }) => ({
        ...product,
        categoryId: categoryId ? categoryIdBySlug.get(categoryId) : undefined,
      }),
    ),
  );

  inserted.teamMembers = await insertIfEmpty(
    TeamMember,
    defaultTeamMembers.map(({ _id: _ignored, ...member }) => member),
  );

  inserted.testimonials = await insertIfEmpty(
    Testimonial,
    defaultTestimonials.map(({ _id: _ignored, ...testimonial }) => testimonial),
  );

  inserted.faqs = await insertIfEmpty(
    FAQ,
    defaultFaqs.map(({ _id: _ignored, ...faq }) => faq),
  );

  inserted.galleryItems = await insertIfEmpty(
    GalleryItem,
    defaultGalleryItems.map(({ _id: _ignored, ...item }) => item),
  );

  inserted.pricingPlans = await insertIfEmpty(
    PricingPlan,
    defaultPricingPlans.map(({ _id: _ignored, ...plan }) => plan),
  );

  inserted.blogPosts = await insertIfEmpty(
    BlogPost,
    defaultBlogPosts.map(({ _id: _ignored, publishedAt, ...post }) => ({
      ...post,
      publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
    })),
  );

  await SiteSettings.updateOne(
    { key: SITE_SETTINGS_KEY },
    { $set: { contentSeededAt: new Date() } },
  );

  return { seeded: true, inserted };
}

async function insertIfEmpty(
  model: unknown,
  documents: Record<string, unknown>[],
): Promise<number> {
  const writable = asWritable(model);
  const existing = await writable.estimatedDocumentCount();

  if (existing > 0 || documents.length === 0) {
    return 0;
  }

  const created = await writable.insertMany(documents);
  return created.length;
}
