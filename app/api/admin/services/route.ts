import { createAdminCollectionRoute } from "@/lib/admin/resource";
import { serviceResource } from "@/lib/admin/resources";

const handlers = createAdminCollectionRoute(serviceResource);

export const GET = handlers.GET;
export const POST = handlers.POST;
