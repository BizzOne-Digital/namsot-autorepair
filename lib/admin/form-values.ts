import type { AdminRecord } from "./client";
import type { FieldDef, SelectChoice } from "./view-types";

/** Form state mirrors the DOM: text inputs hold strings, checkboxes booleans. */
export type FieldValue = string | boolean;
export type FormValues = Record<string, FieldValue>;

/**
 * Builds the initial form state. Editing reads from the record; creating falls
 * back to the field's default so new records start with sensible values.
 */
export function toFormValues(
  fields: FieldDef[],
  record: AdminRecord | null,
  choices: Record<string, SelectChoice[]> = {},
): FormValues {
  const values: FormValues = {};

  for (const field of fields) {
    if (record) {
      values[field.name] = fromRecord(field, record[field.name]);
      continue;
    }

    if (field.defaultValue !== undefined) {
      values[field.name] = field.defaultValue;
      continue;
    }

    if (field.kind === "boolean") {
      values[field.name] = false;
      continue;
    }

    if (field.kind === "select" && !field.placeholder) {
      const options = field.choicesKey
        ? (choices[field.choicesKey] ?? [])
        : (field.choices ?? []);
      values[field.name] = options[0]?.value ?? "";
      continue;
    }

    values[field.name] = "";
  }

  return values;
}

function fromRecord(field: FieldDef, value: unknown): FieldValue {
  switch (field.kind) {
    case "boolean":
      return value === true;

    case "list":
      return Array.isArray(value) ? value.join("\n") : "";

    case "paragraphs":
      return Array.isArray(value) ? value.join("\n\n") : "";

    case "date":
      // `<input type="date">` only accepts `YYYY-MM-DD`.
      return typeof value === "string" ? value.slice(0, 10) : "";

    default:
      return value === null || value === undefined ? "" : String(value);
  }
}

/**
 * Converts form state into the JSON body for the API. Text lists stay as raw
 * text because the Zod schemas split them into arrays server-side.
 */
export function toPayload(
  fields: FieldDef[],
  values: FormValues,
): Record<string, unknown> {
  const payload: Record<string, unknown> = {};

  for (const field of fields) {
    const value = values[field.name];

    if (field.kind === "boolean") {
      payload[field.name] = value === true;
      continue;
    }

    const text = typeof value === "string" ? value.trim() : "";

    if (text === "") {
      const blank = field.emptyValue ?? (field.kind === "number" ? "omit" : "empty");

      if (blank === "omit") continue;
      payload[field.name] = blank === "null" ? null : "";
      continue;
    }

    payload[field.name] = field.kind === "number" ? Number(text) : text;
  }

  return payload;
}
