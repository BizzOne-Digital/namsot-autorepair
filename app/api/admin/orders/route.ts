import { createAdminCollectionRoute } from "@/lib/admin/resource";
import { orderResource } from "@/lib/admin/resources";

// Orders originate from checkout, so the dashboard only reads and updates them.
const handlers = createAdminCollectionRoute(orderResource);

export const GET = handlers.GET;
