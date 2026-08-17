import { createAdminCollectionRoute } from "@/lib/admin/resource";
import { blogPostResource } from "@/lib/admin/resources";

const handlers = createAdminCollectionRoute(blogPostResource);

export const GET = handlers.GET;
export const POST = handlers.POST;
