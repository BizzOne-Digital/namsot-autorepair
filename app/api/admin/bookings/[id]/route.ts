import { createAdminItemRoute } from "@/lib/admin/resource";
import { bookingResource } from "@/lib/admin/resources";

const handlers = createAdminItemRoute(bookingResource);

export const GET = handlers.GET;
export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
