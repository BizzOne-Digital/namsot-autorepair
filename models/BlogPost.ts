import mongoose, { Schema, type InferSchemaType } from "mongoose";
import { MODEL_NAMES } from "@/lib/db/model-names";
import { registerModel } from "@/lib/db/register-model";

const BlogPostSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, index: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    excerpt: { type: String, required: true },
    content: [{ type: String }],
    publishedAt: { type: Date, index: true },
    author: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true, index: true },
    readTime: { type: String, trim: true },
    imageUrl: { type: String, required: true },
    imageAlt: { type: String, required: true },
    isPublished: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

BlogPostSchema.index({ isPublished: 1, publishedAt: -1 });

export type IBlogPost = InferSchemaType<typeof BlogPostSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const BlogPost = registerModel<IBlogPost>(
  MODEL_NAMES.BLOG_POST,
  BlogPostSchema,
);
