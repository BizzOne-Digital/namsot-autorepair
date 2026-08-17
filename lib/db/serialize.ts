import { Types } from "mongoose";

/**
 * Mongoose documents contain ObjectId, Date and Map instances that cannot cross
 * the server/client boundary. Every read that leaves the data layer is passed
 * through here so callers always receive JSON-safe plain values.
 */
export function toPlainObject<T>(value: unknown): T {
  return normalize(value) as T;
}

export function toPlainArray<T>(value: unknown[]): T[] {
  return value.map((entry) => normalize(entry)) as T[];
}

const INTERNAL_KEYS = new Set(["__v"]);

function normalize(value: unknown): unknown {
  if (value === null || value === undefined) {
    return value ?? null;
  }

  if (value instanceof Types.ObjectId) {
    return value.toString();
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (Array.isArray(value)) {
    return value.map(normalize);
  }

  if (value instanceof Map) {
    return Object.fromEntries(
      Array.from(value.entries(), ([key, entry]) => [key, normalize(entry)]),
    );
  }

  if (typeof value === "object") {
    const source = value as Record<string, unknown>;
    const result: Record<string, unknown> = {};

    for (const key of Object.keys(source)) {
      if (INTERNAL_KEYS.has(key)) continue;
      result[key] = normalize(source[key]);
    }

    return result;
  }

  return value;
}

/** Narrow a user-supplied string to a usable Mongo id. */
export function isValidObjectId(value: string): boolean {
  return Types.ObjectId.isValid(value) && String(new Types.ObjectId(value)) === value;
}
