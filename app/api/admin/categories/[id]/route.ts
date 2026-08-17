import { createAdminItemRoute } from "@/lib/admin/resource";
import { categoryResource } from "@/lib/admin/resources";

const handlers = createAdminItemRoute(categoryResource);

export const GET = handlers.GET;
export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
