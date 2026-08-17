import { createAdminItemRoute } from "@/lib/admin/resource";
import { teamMemberResource } from "@/lib/admin/resources";

const handlers = createAdminItemRoute(teamMemberResource);

export const GET = handlers.GET;
export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
