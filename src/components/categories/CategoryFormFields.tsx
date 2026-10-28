"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { addCategorySchemaType } from "@/schemas/categorySchema";
import { Controller, useFormContext } from "react-hook-form";

type CategoryFormFieldsProps = {
  formId: string;
};

export const CategoryFormFields = ({ formId }: CategoryFormFieldsProps) => {
  const { control } = useFormContext<addCategorySchemaType>();

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
              placeholder="Category Name"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};
