import { createAdminCollectionRoute } from "@/lib/admin/resource";
import { pricingPlanResource } from "@/lib/admin/resources";

const handlers = createAdminCollectionRoute(pricingPlanResource);

export const GET = handlers.GET;
export const POST = handlers.POST;
