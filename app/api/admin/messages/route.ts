import { createAdminCollectionRoute } from "@/lib/admin/resource";
import { contactMessageResource } from "@/lib/admin/resources";

// Messages arrive through the public contact form.
const handlers = createAdminCollectionRoute(contactMessageResource);

export const GET = handlers.GET;
