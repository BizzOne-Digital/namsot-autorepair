import { createAdminCollectionRoute } from "@/lib/admin/resource";
import { testimonialResource } from "@/lib/admin/resources";

const handlers = createAdminCollectionRoute(testimonialResource);

export const GET = handlers.GET;
export const POST = handlers.POST;
