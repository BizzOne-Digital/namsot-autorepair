import { createAdminItemRoute } from "@/lib/admin/resource";
import { blogPostResource } from "@/lib/admin/resources";

const handlers = createAdminItemRoute(blogPostResource);

export const GET = handlers.GET;
export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
