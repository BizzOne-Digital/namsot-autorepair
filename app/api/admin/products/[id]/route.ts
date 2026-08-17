import { createAdminItemRoute } from "@/lib/admin/resource";
import { productResource } from "@/lib/admin/resources";

const handlers = createAdminItemRoute(productResource);

export const GET = handlers.GET;
export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
