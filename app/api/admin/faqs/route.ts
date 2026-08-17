import { createAdminCollectionRoute } from "@/lib/admin/resource";
import { faqResource } from "@/lib/admin/resources";

const handlers = createAdminCollectionRoute(faqResource);

export const GET = handlers.GET;
export const POST = handlers.POST;
