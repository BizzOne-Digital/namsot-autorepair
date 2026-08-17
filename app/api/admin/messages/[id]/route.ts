import { createAdminItemRoute } from "@/lib/admin/resource";
import { contactMessageResource } from "@/lib/admin/resources";

const handlers = createAdminItemRoute(contactMessageResource);

export const GET = handlers.GET;
export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
