import "server-only";
import { connectDB } from "@/lib/db";
import { Category } from "@/models";
import type { SelectChoice } from "./view-types";

/**
 * Reference data that admin forms need as dropdown choices. Includes inactive
 * records so an existing selection is never silently dropped.
 */
export async function getCategoryChoices(): Promise<SelectChoice[]> {
  await connectDB();

  const categories = await Category.find({})
    .select("_id name isActive")
    .sort({ order: 1, name: 1 })
    .lean();

  return categories.map((category) => ({
    value: String(category._id),
    label: category.isActive ? category.name : `${category.name} (hidden)`,
  }));
}
