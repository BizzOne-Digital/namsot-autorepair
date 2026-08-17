import { createAdminItemRoute } from "@/lib/admin/resource";
import { serviceResource } from "@/lib/admin/resources";

const handlers = createAdminItemRoute(serviceResource);

export const GET = handlers.GET;
export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
