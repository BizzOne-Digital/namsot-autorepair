import { createAdminCollectionRoute } from "@/lib/admin/resource";
import { productResource } from "@/lib/admin/resources";

const handlers = createAdminCollectionRoute(productResource);

export const GET = handlers.GET;
export const POST = handlers.POST;
