import { createAdminItemRoute } from "@/lib/admin/resource";
import { faqResource } from "@/lib/admin/resources";

const handlers = createAdminItemRoute(faqResource);

export const GET = handlers.GET;
export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
