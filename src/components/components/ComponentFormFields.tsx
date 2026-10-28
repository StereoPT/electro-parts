"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCategories } from "@/hooks/categories/useCategories";
import type {
  addComponentSchemaType,
  editComponentSchemaType,
} from "@/schemas/componentSchema";
import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";

type ComponentSchema = addComponentSchemaType | editComponentSchemaType;

type ComponentFormFieldsProps = {
  formId: string;
};

export const ComponentFormFields = ({ formId }: ComponentFormFieldsProps) => {
  const { control } = useFormContext<ComponentSchema>();
  const { data: categories } = useCategories();

  const categoryItems = useMemo(() => {
    if (!categories) return [];

    return [
      { value: null, label: "None" },
      ...categories.map((category) => ({
        value: category.id,
        label: category.name,
      })),
    ];
  }, [categories]);

  return (
    <FieldGroup>
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error}>
            <FieldLabel htmlFor={`${formId}-name`}>Name</FieldLabel>
            <Input
              {...field}
              id={`${formId}-name`}
              placeholder="Component Name"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        control={control}
        name="manufacturer"
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error}>
            <FieldLabel htmlFor={`${formId}-manufacturer`}>
              Manufacturer
            </FieldLabel>
            <Input
              {...field}
              id={`${formId}-manufacturer`}
              placeholder="Manufacturer"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        control={control}
        name="categoryId"
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error}>
            <FieldLabel htmlFor={`${formId}-category`}>Category</FieldLabel>
            <Select
              disabled={!categories}
              items={categoryItems}
              onValueChange={(value) => field.onChange(value)}
              value={field.value ?? null}
            >
              <SelectTrigger
                className="w-full"
                id={`${formId}-category`}
                onBlur={field.onBlur}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                {categoryItems.map(({ value, label }) => (
                  <SelectItem key={value ?? "none"} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        control={control}
        name="quantity"
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error}>
            <FieldLabel htmlFor={`${formId}-quantity`}>Quantity</FieldLabel>
            <Input
              {...field}
              id={`${formId}-quantity`}
              inputMode="numeric"
              onChange={(event) => field.onChange(event.target.valueAsNumber)}
              placeholder="Quantity"
              step={1}
              type="number"
              value={Number.isNaN(field.value) ? "" : field.value}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error}>
            <FieldLabel htmlFor={`${formId}-description`}>
              Description
            </FieldLabel>
            <Textarea
              {...field}
              id={`${formId}-description`}
              placeholder="Component Description"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};
