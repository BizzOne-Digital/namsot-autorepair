import { createAdminItemRoute } from "@/lib/admin/resource";
import { testimonialResource } from "@/lib/admin/resources";

const handlers = createAdminItemRoute(testimonialResource);

export const GET = handlers.GET;
export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
