import { z } from "zod";
import { CONTACT_MESSAGE_STATUSES } from "@/models/ContactMessage";

/**
 * Validation for everything the admin dashboard writes. Each resource exposes a
 * create schema plus a partial update schema, so a PATCH only ever persists the
 * fields the admin actually changed.
 */

const text = () => z.string().trim();
const requiredText = (message: string) => text().min(1, message);
const optionalText = () => text().default("");
const flag = (fallback: boolean) => z.boolean().default(fallback);
const order = () => z.coerce.number().int().min(0).default(0);
const money = (message: string) =>
  z.coerce.number({ message }).min(0, "Must be zero or more");

const slug = () =>
  requiredText("Slug is required")
    .transform((value) => value.toLowerCase())
    .refine(
      (value) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value),
      "Use lowercase letters, numbers and single dashes only",
    );

const imageSource = (message: string) =>
  requiredText(message).refine(
    (value) => /^https?:\/\//i.test(value) || value.startsWith("/"),
    "Enter a full https:// URL or a path starting with /",
  );

/** Accepts a real array or a textarea value with one entry per line. */
const stringList = () =>
  z.preprocess(
    (value) =>
      typeof value === "string"
        ? value
            .split("\n")
            .map((entry) => entry.trim())
            .filter(Boolean)
        : value,
    z.array(requiredText("Entries cannot be empty")).default([]),
  );

/** Accepts a real array or a textarea value with one paragraph per blank line. */
const paragraphList = () =>
  z.preprocess(
    (value) =>
      typeof value === "string"
        ? value
            .split(/\n\s*\n/)
            .map((entry) => entry.trim())
            .filter(Boolean)
        : value,
    z
      .array(requiredText("Paragraphs cannot be empty"))
      .min(1, "Add at least one paragraph"),
  );

const objectId = () =>
  text().regex(/^[a-f\d]{24}$/i, "Select a valid option");

/** Empty form inputs mean "no value", not an invalid value. */
const blankToNull = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess(
    (value) => (value === "" || value === undefined ? null : value),
    schema.nullable(),
  );

export const serviceSchema = z.object({
  name: requiredText("Name is required"),
  slug: slug(),
  shortDescription: requiredText("Short description is required"),
  description: requiredText("Description is required"),
  features: stringList(),
  duration: optionalText(),
  priceFrom: money("Starting price is required"),
  imageUrl: imageSource("Image URL is required"),
  imageAlt: requiredText("Image alt text is required"),
  isActive: flag(true),
  order: order(),
});

export const categorySchema = z.object({
  name: requiredText("Name is required"),
  slug: slug(),
  description: optionalText(),
  isActive: flag(true),
  order: order(),
});

export const productSchema = z.object({
  name: requiredText("Name is required"),
  slug: slug(),
  description: requiredText("Description is required"),
  shortDescription: optionalText(),
  price: money("Price is required"),
  compareAtPrice: blankToNull(z.coerce.number().min(0)),
  categoryId: blankToNull(objectId()),
  images: stringList(),
  stock: z.coerce.number().int().min(0).default(0),
  sku: optionalText(),
  isActive: flag(true),
  isFeatured: flag(false),
});

export const teamMemberSchema = z.object({
  name: requiredText("Name is required"),
  role: requiredText("Job title is required"),
  bio: requiredText("Bio is required"),
  imageUrl: imageSource("Photo URL is required"),
  imageAlt: requiredText("Photo alt text is required"),
  order: order(),
  isPublished: flag(true),
});

export const testimonialSchema = z.object({
  authorName: requiredText("Customer name is required"),
  rating: z.coerce.number().int().min(1, "Rating must be 1-5").max(5, "Rating must be 1-5"),
  review: requiredText("Review is required"),
  vehicle: optionalText(),
  imageUrl: optionalText(),
  imageAlt: optionalText(),
  order: order(),
  isPublished: flag(true),
});

export const faqSchema = z.object({
  question: requiredText("Question is required"),
  answer: requiredText("Answer is required"),
  order: order(),
  isPublished: flag(true),
});

export const galleryItemSchema = z.object({
  title: requiredText("Title is required"),
  category: requiredText("Category is required"),
  imageUrl: imageSource("Image URL is required"),
  imageAlt: requiredText("Image alt text is required"),
  order: order(),
  isPublished: flag(true),
});

export const pricingPlanSchema = z.object({
  name: requiredText("Name is required"),
  description: requiredText("Description is required"),
  price: money("Price is required"),
  priceNote: optionalText(),
  features: stringList(),
  highlighted: flag(false),
  isActive: flag(true),
  order: order(),
});

export const blogPostSchema = z.object({
  title: requiredText("Title is required"),
  slug: slug(),
  excerpt: requiredText("Excerpt is required"),
  content: paragraphList(),
  publishedAt: blankToNull(z.coerce.date()),
  author: requiredText("Author is required"),
  category: requiredText("Category is required"),
  readTime: optionalText(),
  imageUrl: imageSource("Cover image URL is required"),
  imageAlt: requiredText("Cover image alt text is required"),
  isPublished: flag(false),
});

export const bookingUpdateSchema = z.object({
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
  date: text().min(1).optional(),
  time: text().min(1).optional(),
  message: text().optional(),
});

export const orderUpdateSchema = z.object({
  status: z.enum(["pending", "paid", "shipped", "completed", "cancelled"]),
});

export const contactMessageUpdateSchema = z.object({
  status: z.enum(CONTACT_MESSAGE_STATUSES),
});

export const adminUserCreateSchema = z.object({
  name: requiredText("Name is required"),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  password: z.string().min(10, "Use at least 10 characters"),
  role: z.enum(["admin", "staff"]).default("staff"),
  isActive: flag(true),
});

export const adminUserUpdateSchema = z.object({
  name: requiredText("Name is required").optional(),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address")
    .optional(),
  password: z.string().min(10, "Use at least 10 characters").optional(),
  role: z.enum(["admin", "staff"]).optional(),
  isActive: z.boolean().optional(),
});

const openingHoursSchema = z.object({
  days: requiredText("Days are required"),
  hours: requiredText("Hours are required"),
});

export const siteSettingsSchema = z.object({
  siteName: requiredText("Site name is required"),
  contactEmail: z.string().trim().toLowerCase().email("Enter a valid email address"),
  contactPhone: requiredText("Phone number is required"),
  address: optionalText(),
  addressLine: optionalText(),
  socialLinks: z
    .object({
      facebook: optionalText(),
      instagram: optionalText(),
      x: optionalText(),
      youtube: optionalText(),
      linkedin: optionalText(),
    })
    .default({
      facebook: "",
      instagram: "",
      x: "",
      youtube: "",
      linkedin: "",
    }),
  heroHeadline: optionalText(),
  heroSubheadline: optionalText(),
  heroPrimaryCtaLabel: optionalText(),
  heroPrimaryCtaHref: optionalText(),
  heroSecondaryCtaLabel: optionalText(),
  heroSecondaryCtaHref: optionalText(),
  promoTitle: optionalText(),
  promoDescription: optionalText(),
  promoCtaLabel: optionalText(),
  promoCtaHref: optionalText(),
  openingHours: z.array(openingHoursSchema).default([]),
});

export const serviceUpdateSchema = serviceSchema.partial();
export const categoryUpdateSchema = categorySchema.partial();
export const productUpdateSchema = productSchema.partial();
export const teamMemberUpdateSchema = teamMemberSchema.partial();
export const testimonialUpdateSchema = testimonialSchema.partial();
export const faqUpdateSchema = faqSchema.partial();
export const galleryItemUpdateSchema = galleryItemSchema.partial();
export const pricingPlanUpdateSchema = pricingPlanSchema.partial();
export const blogPostUpdateSchema = blogPostSchema.partial();
