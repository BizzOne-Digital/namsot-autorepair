import { createAdminItemRoute } from "@/lib/admin/resource";
import { orderResource } from "@/lib/admin/resources";

const handlers = createAdminItemRoute(orderResource);

export const GET = handlers.GET;
export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
