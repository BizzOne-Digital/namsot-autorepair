"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import {
  AdminRequestError,
  adminRequest,
  fetchAdminList,
  type AdminRecord,
} from "@/lib/admin/client";
import {
  toFormValues,
  toPayload,
  type FieldValue,
  type FormValues,
} from "@/lib/admin/form-values";
import type { ResourceView, SelectChoice } from "@/lib/admin/view-types";
import { slugify } from "@/utils/slugify";
import { cn } from "@/utils/cn";
import { AdminModal } from "./AdminModal";
import { ConfirmDialog } from "./ConfirmDialog";
import { ResourceFields } from "./ResourceFields";
import { cellClass, renderCell } from "./cells";

interface ResourceManagerProps {
  view: ResourceView;
  /** Runtime dropdown options keyed by the field's `choicesKey`. */
  choices?: Record<string, SelectChoice[]>;
}

type EditorState =
  | { mode: "closed" }
  | { mode: "create" }
  | { mode: "edit"; record: AdminRecord };

const PAGE_SIZE = 20;

export function ResourceManager({ view, choices = {} }: ResourceManagerProps) {
  const [records, setRecords] = useState<AdminRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sort, setSort] = useState<{ field: string; direction: "asc" | "desc" }>(
    { field: "", direction: "desc" },
  );
  const [loadError, setLoadError] = useState<string | null>(null);
  /** Bumped by manual refreshes so the fetch effect runs again. */
  const [reloadToken, setReloadToken] = useState(0);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const [editor, setEditor] = useState<EditorState>({ mode: "closed" });
  const [pendingDelete, setPendingDelete] = useState<AdminRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Debounce the search box so typing does not fire a request per keystroke.
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Identifies the list currently on screen. Loading is derived by comparing it
  // to the last key that finished fetching, which keeps the fetch effect free of
  // synchronous state updates.
  const queryKey = useMemo(
    () =>
      JSON.stringify({
        endpoint: view.endpoint,
        page,
        search,
        sort,
        filters,
        reloadToken,
      }),
    [view.endpoint, page, search, sort, filters, reloadToken],
  );

  const isLoading = loadedKey !== queryKey;
  const refresh = useCallback(() => setReloadToken((token) => token + 1), []);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const result = await fetchAdminList(view.endpoint, {
          page,
          limit: PAGE_SIZE,
          search,
          sort: sort.field || undefined,
          direction: sort.field ? sort.direction : undefined,
          ...filters,
        });

        if (cancelled) return;

        setRecords(result.items);
        setTotal(result.total);
        setTotalPages(result.totalPages);
        setLoadError(null);
      } catch (error) {
        if (cancelled) return;

        setRecords([]);
        setLoadError(toMessage(error));
      } finally {
        if (!cancelled) {
          setLoadedKey(queryKey);
        }
      }
    })();

    // A newer query must win even if an earlier one resolves later.
    return () => {
      cancelled = true;
    };
  }, [queryKey, view.endpoint, page, search, sort, filters]);

  const columnCount = view.columns.length + 1;
  const hasControls = Boolean(view.searchPlaceholder) || Boolean(view.filters?.length);

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-display text-2xl font-semibold text-foreground">
            {view.title}
          </h1>
          <p className="max-w-2xl text-sm text-muted">{view.description}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="muted">
            {total} {total === 1 ? "record" : "records"}
          </Badge>
          {view.canCreate ? (
            <Button size="sm" onClick={() => setEditor({ mode: "create" })}>
              Add {view.singular}
            </Button>
          ) : null}
        </div>
      </header>

      {hasControls ? (
        <div className="flex flex-wrap items-end gap-3 rounded-lg border border-border bg-surface p-4">
          {view.searchPlaceholder ? (
            <div className="min-w-56 flex-1">
              <Input
                name="search"
                label="Search"
                type="search"
                placeholder={view.searchPlaceholder}
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
              />
            </div>
          ) : null}

          {view.filters?.map((filter) => (
            <div key={filter.key} className="w-44">
              <Select
                name={filter.key}
                label={filter.label}
                options={filter.choices}
                value={filters[filter.key] ?? "all"}
                onChange={(event) => {
                  setPage(1);
                  setFilters((current) => ({
                    ...current,
                    [filter.key]: event.target.value,
                  }));
                }}
              />
            </div>
          ))}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-surface-muted/60 text-xs uppercase tracking-wide text-muted">
              <tr>
                {view.columns.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    className={cellClass(column.hideBelow, "px-4 py-3 font-medium")}
                  >
                    {column.sortable ? (
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
                        onClick={() => {
                          setPage(1);
                          setSort((current) =>
                            current.field === column.key
                              ? {
                                  field: column.key,
                                  direction:
                                    current.direction === "asc" ? "desc" : "asc",
                                }
                              : { field: column.key, direction: "asc" },
                          );
                        }}
                      >
                        {column.label}
                        <SortIcon
                          active={sort.field === column.key}
                          direction={sort.direction}
                        />
                      </button>
                    ) : (
                      column.label
                    )}
                  </th>
                ))}
                <th scope="col" className="px-4 py-3 text-right font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <SkeletonRows columns={columnCount} />
              ) : loadError ? (
                <tr>
                  <td colSpan={columnCount} className="px-4 py-12 text-center">
                    <p className="text-sm text-red-600">{loadError}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={refresh}
                    >
                      Try again
                    </Button>
                  </td>
                </tr>
              ) : records.length === 0 ? (
                <tr>
                  <td colSpan={columnCount} className="px-4 py-14 text-center">
                    <p className="font-medium text-foreground">
                      {search || Object.values(filters).some((v) => v && v !== "all")
                        ? "No matches"
                        : view.emptyTitle}
                    </p>
                    <p className="mx-auto mt-1 max-w-sm text-sm text-muted">
                      {search || Object.values(filters).some((v) => v && v !== "all")
                        ? "Try a different search term or filter."
                        : view.emptyDescription}
                    </p>
                  </td>
                </tr>
              ) : (
                records.map((record) => (
                  <tr key={record._id} className="hover:bg-surface-muted/40">
                    {view.columns.map((column) => (
                      <td
                        key={column.key}
                        className={cellClass(
                          column.hideBelow,
                          "max-w-xs truncate px-4 py-3 align-middle",
                        )}
                      >
                        {renderCell(
                          record[column.key],
                          column.render,
                          column.tones,
                        )}
                      </td>
                    ))}
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <div className="inline-flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditor({ mode: "edit", record })}
                        >
                          Edit
                        </Button>
                        {view.canDelete ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => setPendingDelete(record)}
                          >
                            Delete
                          </Button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 ? (
          <div className="flex items-center justify-between gap-4 border-t border-border px-4 py-3 text-sm">
            <p className="text-muted">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1 || isLoading}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages || isLoading}
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
              >
                Next
              </Button>
            </div>
          </div>
        ) : null}
      </div>

      {editor.mode !== "closed" ? (
        <ResourceEditor
          view={view}
          choices={choices}
          record={editor.mode === "edit" ? editor.record : null}
          onClose={() => setEditor({ mode: "closed" })}
          onSaved={() => {
            setEditor({ mode: "closed" });
            refresh();
          }}
        />
      ) : null}

      <ConfirmDialog
        open={pendingDelete !== null}
        title={`Delete this ${view.singular}?`}
        description="This permanently removes the record from the database and the website. It cannot be undone."
        confirmLabel="Delete"
        isLoading={isDeleting}
        onCancel={() => setPendingDelete(null)}
        onConfirm={async () => {
          if (!pendingDelete) return;
          setIsDeleting(true);

          try {
            await adminRequest(`${view.endpoint}/${pendingDelete._id}`, {
              method: "DELETE",
            });
            toast.success(`${capitalize(view.singular)} deleted`);
            setPendingDelete(null);

            // Stepping back avoids landing on a page that no longer exists.
            if (records.length === 1 && page > 1) {
              setPage((current) => current - 1);
            } else {
              refresh();
            }
          } catch (error) {
            toast.error(toMessage(error));
          } finally {
            setIsDeleting(false);
          }
        }}
      />
    </div>
  );
}

interface ResourceEditorProps {
  view: ResourceView;
  choices: Record<string, SelectChoice[]>;
  record: AdminRecord | null;
  onClose: () => void;
  onSaved: () => void;
}

function ResourceEditor({
  view,
  choices,
  record,
  onClose,
  onSaved,
}: ResourceEditorProps) {
  const [values, setValues] = useState<FormValues>(() =>
    toFormValues(view.fields, record, choices),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  // Auto-slugging stops as soon as the admin edits the slug themselves.
  const slugTouched = useRef(record !== null);

  const hasSlugField = useMemo(
    () => view.fields.some((field) => field.name === "slug"),
    [view.fields],
  );

  const handleChange = (name: string, value: FieldValue) => {
    setValues((current) => {
      const next = { ...current, [name]: value };

      if (name === "slug") {
        slugTouched.current = true;
      }

      if (
        hasSlugField &&
        !slugTouched.current &&
        name === view.slugSource &&
        typeof value === "string"
      ) {
        next.slug = slugify(value);
      }

      return next;
    });

    setErrors((current) => {
      if (!current[name]) return current;
      const { [name]: _removed, ...rest } = current;
      return rest;
    });
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    setErrors({});
    setFormError(null);

    try {
      const payload = toPayload(view.fields, values);

      await adminRequest(
        record ? `${view.endpoint}/${record._id}` : view.endpoint,
        {
          method: record ? "PATCH" : "POST",
          body: JSON.stringify(payload),
        },
      );

      toast.success(
        record
          ? `${capitalize(view.singular)} updated`
          : `${capitalize(view.singular)} created`,
      );
      onSaved();
    } catch (error) {
      if (error instanceof AdminRequestError) {
        setErrors(error.details);
        setFormError(error.message);
      } else {
        setFormError(toMessage(error));
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminModal
      open
      onClose={onClose}
      title={record ? `Edit ${view.singular}` : `New ${view.singular}`}
      description={
        record
          ? "Saved changes appear on the website immediately."
          : `This ${view.singular} goes live as soon as it is saved and marked visible.`
      }
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button
            form="resource-form"
            type="submit"
            isLoading={isSaving}
          >
            {record ? "Save changes" : `Create ${view.singular}`}
          </Button>
        </>
      }
    >
      <form
        id="resource-form"
        className="space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit();
        }}
      >
        {formError ? (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {formError}
          </p>
        ) : null}

        {record && view.detailFields?.length ? (
          <dl className="grid gap-x-6 gap-y-3 rounded-md border border-border bg-surface-muted/40 p-4 text-sm sm:grid-cols-2">
            {view.detailFields.map((field) => (
              <div key={field.key} className="space-y-0.5">
                <dt className="text-xs uppercase tracking-wide text-muted">
                  {field.label}
                </dt>
                <dd className="text-foreground">
                  {renderCell(record[field.key], field.render, field.tones)}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        <ResourceFields
          fields={view.fields}
          values={values}
          errors={errors}
          choices={choices}
          disabled={isSaving}
          onChange={handleChange}
        />
      </form>
    </AdminModal>
  );
}

function SkeletonRows({ columns }: { columns: number }) {
  return (
    <>
      {Array.from({ length: 5 }, (_, rowIndex) => (
        <tr key={rowIndex}>
          {Array.from({ length: columns }, (_, cellIndex) => (
            <td key={cellIndex} className="px-4 py-4">
              <span className="block h-4 animate-pulse rounded bg-surface-muted" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

function SortIcon({
  active,
  direction,
}: {
  active: boolean;
  direction: "asc" | "desc";
}) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={cn("size-3 shrink-0", active ? "text-accent" : "text-border")}
      aria-hidden="true"
      fill="currentColor"
    >
      <path
        d="M6 1.5 9 5H3z"
        opacity={active && direction === "desc" ? 0.25 : 1}
      />
      <path
        d="M6 10.5 3 7h6z"
        opacity={active && direction === "asc" ? 0.25 : 1}
      />
    </svg>
  );
}

function toMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "Something went wrong. Please try again.";
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
