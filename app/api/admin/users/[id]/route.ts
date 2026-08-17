import { ApiError, apiError, apiSuccess } from "@/lib/api/response";
import { requireAdminRole } from "@/lib/auth/guards";
import { hashPassword } from "@/lib/auth/password";
import { connectDB, isValidObjectId, toPlainObject } from "@/lib/db";
import { adminUserUpdateSchema } from "@/lib/validation/admin-resources";
import { User } from "@/models";

type RouteContext = { params: Promise<{ id: string }> };

async function resolveId(context: RouteContext) {
  const { id } = await context.params;

  if (!isValidObjectId(id)) {
    throw new ApiError(400, "Invalid user id.", "INVALID_ID");
  }

  return id;
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const currentAdmin = await requireAdminRole();
    const id = await resolveId(context);
    await connectDB();

    const { password, ...changes } = adminUserUpdateSchema.parse(
      await request.json(),
    );

    const isSelf = currentAdmin.userId === id;

    if (isSelf && changes.role && changes.role !== "admin") {
      throw new ApiError(
        400,
        "You cannot remove your own admin role.",
        "SELF_DEMOTION",
      );
    }

    if (isSelf && changes.isActive === false) {
      throw new ApiError(
        400,
        "You cannot deactivate your own account.",
        "SELF_DEACTIVATION",
      );
    }

    if (changes.role === "staff" || changes.isActive === false) {
      await assertAnotherActiveAdminExists(id);
    }

    const update: Record<string, unknown> = { ...changes };
    if (password) {
      update.passwordHash = await hashPassword(password);
    }

    if (Object.keys(update).length === 0) {
      throw new ApiError(400, "No changes were provided.", "EMPTY_UPDATE");
    }

    const updated = await User.findByIdAndUpdate(id, update, {
      returnDocument: "after",
      runValidators: true,
    })
      .select("-passwordHash")
      .lean();

    if (!updated) {
      throw new ApiError(404, "User not found.", "NOT_FOUND");
    }

    return apiSuccess(toPlainObject(updated));
  } catch (error) {
    return apiError(error);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const currentAdmin = await requireAdminRole();
    const id = await resolveId(context);
    await connectDB();

    if (currentAdmin.userId === id) {
      throw new ApiError(
        400,
        "You cannot delete your own account.",
        "SELF_DELETION",
      );
    }

    await assertAnotherActiveAdminExists(id);

    const deleted = await User.findByIdAndDelete(id).lean();

    if (!deleted) {
      throw new ApiError(404, "User not found.", "NOT_FOUND");
    }

    return apiSuccess({ _id: id, deleted: true });
  } catch (error) {
    return apiError(error);
  }
}

/** Keeps at least one active admin so the dashboard can never lock everyone out. */
async function assertAnotherActiveAdminExists(excludedId: string) {
  const remainingAdmins = await User.countDocuments({
    _id: { $ne: excludedId },
    role: "admin",
    isActive: true,
  });

  if (remainingAdmins === 0) {
    throw new ApiError(
      400,
      "This is the last active admin account. Promote another user first.",
      "LAST_ADMIN",
    );
  }
}
