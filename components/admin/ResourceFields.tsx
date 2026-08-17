"use client";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import type { FieldValue, FormValues } from "@/lib/admin/form-values";
import type { FieldDef, SelectChoice } from "@/lib/admin/view-types";
import { cn } from "@/utils/cn";

interface ResourceFieldsProps {
  fields: FieldDef[];
  values: FormValues;
  errors: Record<string, string>;
  choices: Record<string, SelectChoice[]>;
  disabled?: boolean;
  onChange: (name: string, value: FieldValue) => void;
}

export function ResourceFields({
  fields,
  values,
  errors,
  choices,
  disabled,
  onChange,
}: ResourceFieldsProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {fields.map((field) => (
        <div
          key={field.name}
          className={cn(field.wide || field.kind === "boolean" ? "sm:col-span-2" : undefined)}
        >
          <FieldControl
            field={field}
            value={values[field.name]}
            error={errors[field.name]}
            choices={choices}
            disabled={disabled}
            onChange={onChange}
          />
        </div>
      ))}
    </div>
  );
}

interface FieldControlProps {
  field: FieldDef;
  value: FieldValue | undefined;
  error?: string;
  choices: Record<string, SelectChoice[]>;
  disabled?: boolean;
  onChange: (name: string, value: FieldValue) => void;
}

function FieldControl({
  field,
  value,
  error,
  choices,
  disabled,
  onChange,
}: FieldControlProps) {
  const text = typeof value === "string" ? value : "";

  switch (field.kind) {
    case "boolean":
      return (
        <label className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-surface-muted/40 p-3">
          <input
            type="checkbox"
            name={field.name}
            checked={value === true}
            disabled={disabled}
            onChange={(event) => onChange(field.name, event.target.checked)}
            className="mt-0.5 size-4 rounded border-border text-accent focus-visible:ring-2 focus-visible:ring-accent/40"
          />
          <span className="space-y-1">
            <span className="block text-sm font-medium">{field.label}</span>
            {field.hint ? (
              <span className="block text-xs text-muted">{field.hint}</span>
            ) : null}
            {error ? (
              <span className="block text-xs text-red-600">{error}</span>
            ) : null}
          </span>
        </label>
      );

    case "textarea":
    case "list":
    case "paragraphs":
      return (
        <Textarea
          name={field.name}
          label={field.label}
          hint={field.hint}
          error={error}
          rows={field.rows ?? 4}
          placeholder={field.placeholder}
          value={text}
          disabled={disabled}
          onChange={(event) => onChange(field.name, event.target.value)}
        />
      );

    case "select": {
      const options = field.choicesKey
        ? (choices[field.choicesKey] ?? [])
        : (field.choices ?? []);

      return (
        <Select
          name={field.name}
          label={field.label}
          hint={field.hint}
          error={error}
          options={
            field.placeholder
              ? [{ value: "", label: field.placeholder }, ...options]
              : options
          }
          value={text}
          disabled={disabled}
          onChange={(event) => onChange(field.name, event.target.value)}
        />
      );
    }

    case "number":
      return (
        <Input
          name={field.name}
          label={field.label}
          hint={field.hint}
          error={error}
          type="number"
          inputMode="decimal"
          step={field.step ?? "1"}
          min={field.min}
          max={field.max}
          value={text}
          disabled={disabled}
          onChange={(event) => onChange(field.name, event.target.value)}
        />
      );

    case "date":
      return (
        <Input
          name={field.name}
          label={field.label}
          hint={field.hint}
          error={error}
          type="date"
          value={text}
          disabled={disabled}
          onChange={(event) => onChange(field.name, event.target.value)}
        />
      );

    default:
      return (
        <Input
          name={field.name}
          label={field.label}
          hint={field.hint}
          error={error}
          type={field.inputType ?? "text"}
          placeholder={field.placeholder}
          autoComplete={field.inputType === "password" ? "new-password" : "off"}
          value={text}
          disabled={disabled}
          onChange={(event) => onChange(field.name, event.target.value)}
        />
      );
  }
}
