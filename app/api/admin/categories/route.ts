import { createAdminCollectionRoute } from "@/lib/admin/resource";
import { categoryResource } from "@/lib/admin/resources";

const handlers = createAdminCollectionRoute(categoryResource);

export const GET = handlers.GET;
export const POST = handlers.POST;
