import { ApiError, apiError, apiSuccess } from "@/lib/api/response";
import {
  buildFilterQuery,
  buildPaginatedResult,
  parseListQuery,
} from "@/lib/api/list-query";
import { requireAdminRole } from "@/lib/auth/guards";
import { hashPassword } from "@/lib/auth/password";
import { connectDB, toPlainArray, toPlainObject } from "@/lib/db";
import { adminUserCreateSchema } from "@/lib/validation/admin-resources";
import { User } from "@/models";

const SEARCH_FIELDS = ["name", "email"] as const;

export async function GET(request: Request) {
  try {
    await requireAdminRole();
    await connectDB();

    const query = parseListQuery(request.url, {
      filterFields: ["role", "isActive"],
      sortableFields: ["name", "email", "role", "createdAt"],
    });
    const filter = buildFilterQuery(query, SEARCH_FIELDS);
    const sort = query.sortField
      ? { [query.sortField]: query.sortDirection }
      : { createdAt: -1 as const };

    const [documents, total] = await Promise.all([
      User.find(filter)
        .select("-passwordHash")
        .sort(sort)
        .skip(query.skip)
        .limit(query.limit)
        .lean(),
      User.countDocuments(filter),
    ]);

    return apiSuccess(
      buildPaginatedResult(toPlainArray(documents), total, query),
    );
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminRole();
    await connectDB();

    const { password, ...details } = adminUserCreateSchema.parse(
      await request.json(),
    );

    const existing = await User.findOne({ email: details.email }).select("_id");
    if (existing) {
      throw new ApiError(
        409,
        "A user with that email already exists.",
        "DUPLICATE_KEY",
      );
    }

    const created = await User.create({
      ...details,
      passwordHash: await hashPassword(password),
    });

    const { passwordHash: _passwordHash, ...safeUser } = created.toObject();

    return apiSuccess(toPlainObject(safeUser), 201);
  } catch (error) {
    return apiError(error);
  }
}
