import { createAdminItemRoute } from "@/lib/admin/resource";
import { pricingPlanResource } from "@/lib/admin/resources";

const handlers = createAdminItemRoute(pricingPlanResource);

export const GET = handlers.GET;
export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
