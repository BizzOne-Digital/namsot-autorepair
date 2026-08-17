/**
 * Declarative descriptions of each admin screen. They are plain data so both the
 * server pages and the client `ResourceManager` can share them.
 */

export interface SelectChoice {
  value: string;
  label: string;
}

export type BadgeTone =
  | "default"
  | "accent"
  | "outline"
  | "muted"
  | "success"
  | "warning"
  | "danger";

export type CellRenderer =
  | "text"
  | "muted"
  | "badge"
  | "money"
  | "date"
  | "datetime"
  | "boolean"
  | "thumbnail"
  | "list"
  | "orderItems"
  | "longText";

export interface ColumnDef {
  key: string;
  label: string;
  render?: CellRenderer;
  /** Tailwind breakpoint below which the column is hidden. */
  hideBelow?: "sm" | "md" | "lg";
  tones?: Record<string, BadgeTone>;
  /** Enables the header sort control. Must match the route's sortable fields. */
  sortable?: boolean;
}

export interface DetailFieldDef {
  key: string;
  label: string;
  render?: CellRenderer;
  tones?: Record<string, BadgeTone>;
}

interface FieldBase {
  name: string;
  label: string;
  hint?: string;
  /** Render across both columns of the form grid. */
  wide?: boolean;
  /** Value used when creating a new record. */
  defaultValue?: string | boolean;
  /**
   * How a blank input is submitted: dropped from the payload ("omit", the
   * default for numbers so an empty box never becomes 0), sent as `null` to clear
   * an optional value, or sent as an empty string (the default).
   */
  emptyValue?: "omit" | "null" | "empty";
}

export type FieldDef =
  | (FieldBase & {
      kind: "text";
      inputType?: "text" | "email" | "url" | "tel" | "password";
      placeholder?: string;
    })
  | (FieldBase & { kind: "textarea"; rows?: number; placeholder?: string })
  | (FieldBase & { kind: "number"; step?: string; min?: number; max?: number })
  | (FieldBase & { kind: "boolean" })
  | (FieldBase & { kind: "date" })
  | (FieldBase & {
      kind: "select";
      choices?: SelectChoice[];
      /** Choices supplied at runtime by the page, e.g. product categories. */
      choicesKey?: string;
      placeholder?: string;
    })
  /** Newline-separated values stored as an array of strings. */
  | (FieldBase & { kind: "list"; rows?: number; placeholder?: string })
  /** Blank-line separated paragraphs stored as an array of strings. */
  | (FieldBase & { kind: "paragraphs"; rows?: number; placeholder?: string });

export interface FilterDef {
  key: string;
  label: string;
  choices: SelectChoice[];
}

export interface ResourceView {
  endpoint: string;
  title: string;
  description: string;
  /** Singular noun used in buttons and dialogs, e.g. "service". */
  singular: string;
  searchPlaceholder?: string;
  columns: ColumnDef[];
  fields: FieldDef[];
  /** Read-only context shown above the form, for records admins do not author. */
  detailFields?: DetailFieldDef[];
  filters?: FilterDef[];
  canCreate: boolean;
  canDelete: boolean;
  emptyTitle: string;
  emptyDescription: string;
  /** Field whose value seeds the slug while creating a new record. */
  slugSource?: string;
}
