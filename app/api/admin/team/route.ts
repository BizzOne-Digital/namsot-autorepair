import { createAdminCollectionRoute } from "@/lib/admin/resource";
import { teamMemberResource } from "@/lib/admin/resources";

const handlers = createAdminCollectionRoute(teamMemberResource);

export const GET = handlers.GET;
export const POST = handlers.POST;
