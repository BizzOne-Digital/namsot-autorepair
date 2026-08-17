/**
 * Mongoose's `create`/`insertMany` typings demand the exact document shape of a
 * concrete model, which generic helpers cannot express. Every payload that
 * reaches these calls has already been validated (Zod for admin input, the
 * bundled defaults for seeding), so narrowing the model to just the write
 * methods keeps the shared helpers type-safe without `any`.
 */
export interface WritableModel {
  create(document: Record<string, unknown>): Promise<{
    toObject(): Record<string, unknown>;
  }>;
  insertMany(documents: Record<string, unknown>[]): Promise<unknown[]>;
  estimatedDocumentCount(): Promise<number>;
}

export function asWritable(model: unknown): WritableModel {
  return model as WritableModel;
}
