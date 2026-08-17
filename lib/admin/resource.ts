import type { Model, SortOrder } from "mongoose";
import { ApiError, apiError, apiSuccess } from "@/lib/api/response";
import {
  buildFilterQuery,
  buildPaginatedResult,
  parseListQuery,
} from "@/lib/api/list-query";
import { requireAdminAuth, requireAdminRole } from "@/lib/auth/guards";
import { connectDB, isValidObjectId, toPlainArray, toPlainObject } from "@/lib/db";
import { asWritable } from "@/lib/db/write";

/**
 * Structural shape of a validator, so any Zod object schema can be supplied
 * without leaking Zod's generics into every resource definition.
 */
export interface PayloadSchema {
  parse: (input: unknown) => Record<string, unknown>;
}

export interface AdminResourceRouteConfig<TDoc> {
  /** Singular, human readable name used in messages, e.g. "Service". */
  label: string;
  model: Model<TDoc>;
  /** Omit to make the collection read-only (bookings, orders, messages). */
  createSchema?: PayloadSchema;
  updateSchema?: PayloadSchema;
  /** Fields matched by the `search` query parameter. */
  searchFields?: readonly string[];
  /** Query parameters accepted as equality filters. */
  filterFields?: readonly string[];
  /** Fields the client may sort by via `sort` and `direction`. */
  sortableFields?: readonly string[];
  defaultSort?: Record<string, SortOrder>;
  /** Restrict every operation to users with the `admin` role. */
  adminOnly?: boolean;
  /** Last chance to normalise a validated payload before it is persisted. */
  prepare?: (
    payload: Record<string, unknown>,
    context: { isUpdate: boolean; id?: string },
  ) => Promise<Record<string, unknown>> | Record<string, unknown>;
  /** Blocks deletion when it returns a message. */
  guardDelete?: (id: string) => Promise<string | null>;
}

type ItemRouteContext = { params: Promise<{ id: string }> };

async function authorize<TDoc>(config: AdminResourceRouteConfig<TDoc>) {
  return config.adminOnly ? requireAdminRole() : requireAdminAuth();
}

/** Builds the `GET` (list) and `POST` (create) handlers for a collection. */
export function createAdminCollectionRoute<TDoc>(
  config: AdminResourceRouteConfig<TDoc>,
) {
  async function GET(request: Request) {
    try {
      await authorize(config);
      await connectDB();

      const query = parseListQuery(request.url, {
        filterFields: config.filterFields,
        sortableFields: config.sortableFields,
      });
      const filter = buildFilterQuery(query, config.searchFields);
      const sort = query.sortField
        ? { [query.sortField]: query.sortDirection }
        : (config.defaultSort ?? { createdAt: -1 });

      const [documents, total] = await Promise.all([
        config.model
          .find(filter)
          .sort(sort as Record<string, SortOrder>)
          .skip(query.skip)
          .limit(query.limit)
          .lean(),
        config.model.countDocuments(filter),
      ]);

      return apiSuccess(
        buildPaginatedResult(toPlainArray(documents), total, query),
      );
    } catch (error) {
      return apiError(error);
    }
  }

  async function POST(request: Request) {
    try {
      await authorize(config);

      if (!config.createSchema) {
        throw new ApiError(
          405,
          `${config.label} records cannot be created here.`,
          "METHOD_NOT_ALLOWED",
        );
      }

      await connectDB();

      const parsed = config.createSchema.parse(await request.json());
      const payload = config.prepare
        ? await config.prepare(parsed, { isUpdate: false })
        : parsed;

      const created = await asWritable(config.model).create(payload);

      return apiSuccess(toPlainObject(created.toObject()), 201);
    } catch (error) {
      return apiError(error);
    }
  }

  return { GET, POST };
}

/** Builds the `GET`, `PATCH` and `DELETE` handlers for a single record. */
export function createAdminItemRoute<TDoc>(
  config: AdminResourceRouteConfig<TDoc>,
) {
  async function resolveId(context: ItemRouteContext) {
    const { id } = await context.params;

    if (!isValidObjectId(id)) {
      throw new ApiError(400, `Invalid ${config.label} id.`, "INVALID_ID");
    }

    return id;
  }

  async function GET(_request: Request, context: ItemRouteContext) {
    try {
      await authorize(config);
      const id = await resolveId(context);
      await connectDB();

      const document = await config.model.findById(id).lean();

      if (!document) {
        throw new ApiError(404, `${config.label} not found.`, "NOT_FOUND");
      }

      return apiSuccess(toPlainObject(document));
    } catch (error) {
      return apiError(error);
    }
  }

  async function PATCH(request: Request, context: ItemRouteContext) {
    try {
      await authorize(config);

      if (!config.updateSchema) {
        throw new ApiError(
          405,
          `${config.label} records cannot be edited here.`,
          "METHOD_NOT_ALLOWED",
        );
      }

      const id = await resolveId(context);
      await connectDB();

      const parsed = config.updateSchema.parse(await request.json());
      const payload = config.prepare
        ? await config.prepare(parsed, { isUpdate: true, id })
        : parsed;

      if (Object.keys(payload).length === 0) {
        throw new ApiError(400, "No changes were provided.", "EMPTY_UPDATE");
      }

      const updated = await config.model
        .findByIdAndUpdate(id, payload, {
          returnDocument: "after",
          runValidators: true,
        })
        .lean();

      if (!updated) {
        throw new ApiError(404, `${config.label} not found.`, "NOT_FOUND");
      }

      return apiSuccess(toPlainObject(updated));
    } catch (error) {
      return apiError(error);
    }
  }

  async function DELETE(_request: Request, context: ItemRouteContext) {
    try {
      await authorize(config);
      const id = await resolveId(context);
      await connectDB();

      const blockedReason = await config.guardDelete?.(id);
      if (blockedReason) {
        throw new ApiError(409, blockedReason, "DELETE_BLOCKED");
      }

      const deleted = await config.model.findByIdAndDelete(id).lean();

      if (!deleted) {
        throw new ApiError(404, `${config.label} not found.`, "NOT_FOUND");
      }

      return apiSuccess({ _id: id, deleted: true });
    } catch (error) {
      return apiError(error);
    }
  }

  return { GET, PATCH, DELETE };
}
