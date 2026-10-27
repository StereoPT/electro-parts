"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type {
  addComponentSchemaType,
  editComponentSchemaType,
} from "@/schemas/componentSchema";
import { Controller, useFormContext } from "react-hook-form";

type ComponentSchema = addComponentSchemaType | editComponentSchemaType;

type ComponentFormFieldsProps = {
  formId: string;
};

export const ComponentFormFields = ({ formId }: ComponentFormFieldsProps) => {
  const { control } = useFormContext<ComponentSchema>();

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
