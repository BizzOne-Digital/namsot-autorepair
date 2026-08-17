import { createAdminItemRoute } from "@/lib/admin/resource";
import { galleryItemResource } from "@/lib/admin/resources";

const handlers = createAdminItemRoute(galleryItemResource);

export const GET = handlers.GET;
export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
