import { createAdminCollectionRoute } from "@/lib/admin/resource";
import { bookingResource } from "@/lib/admin/resources";

// Bookings are created by customers through the public booking form.
const handlers = createAdminCollectionRoute(bookingResource);

export const GET = handlers.GET;
