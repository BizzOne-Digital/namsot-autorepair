export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

export interface ListQuery {
  page: number;
  limit: number;
  skip: number;
  search: string;
  sortField: string | null;
  sortDirection: 1 | -1;
  filters: Record<string, string>;
}

export interface ParseListQueryOptions {
  searchFields?: readonly string[];
  filterFields?: readonly string[];
  sortableFields?: readonly string[];
}

export function parseListQuery(
  url: string,
  options: ParseListQueryOptions = {},
): ListQuery {
  const params = new URL(url).searchParams;

  const page = Math.max(1, toInteger(params.get("page"), 1));
  const limit = Math.min(
    MAX_PAGE_SIZE,
    Math.max(1, toInteger(params.get("limit"), DEFAULT_PAGE_SIZE)),
  );

  const requestedSort = params.get("sort");
  const sortField =
    requestedSort && options.sortableFields?.includes(requestedSort)
      ? requestedSort
      : null;

  const filters: Record<string, string> = {};
  for (const field of options.filterFields ?? []) {
    const value = params.get(field);
    if (value && value !== "all") {
      filters[field] = value;
    }
  }

  return {
    page,
    limit,
    skip: (page - 1) * limit,
    search: params.get("search")?.trim() ?? "",
    sortField,
    sortDirection: params.get("direction") === "asc" ? 1 : -1,
    filters,
  };
}

export function buildFilterQuery(
  query: ListQuery,
  searchFields: readonly string[] = [],
): Record<string, unknown> {
  const conditions: Record<string, unknown> = { ...query.filters };

  if (query.search && searchFields.length > 0) {
    const pattern = new RegExp(escapeRegExp(query.search), "i");
    conditions.$or = searchFields.map((field) => ({ [field]: pattern }));
  }

  return conditions;
}

export function buildPaginatedResult<T>(
  items: T[],
  total: number,
  query: ListQuery,
) {
  return {
    items,
    total,
    page: query.page,
    pageSize: query.limit,
    totalPages: Math.max(1, Math.ceil(total / query.limit)),
  };
}

function toInteger(value: string | null, fallback: number): number {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
