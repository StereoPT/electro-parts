"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { DatePicker } from "@/components/layout/DatePicker";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { recordAdjustmentSchemaType } from "@/schemas/adjustmentSchema";
import { Controller, useFormContext } from "react-hook-form";

const KIND_ITEMS = [
  { value: "PURCHASE", label: "Purchase" },
  { value: "USAGE", label: "Usage" },
];

type AdjustmentFormFieldsProps = {
  formId: string;
  quantity: number;
};

export const AdjustmentFormFields = ({
  formId,
  quantity,
}: AdjustmentFormFieldsProps) => {
  const { control, watch } = useFormContext<recordAdjustmentSchemaType>();
  const isUsage = watch("kind") === "USAGE";

  return (
    <FieldGroup>
      <Controller
        control={control}
        name="kind"
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error}>
            <FieldLabel htmlFor={`${formId}-kind`}>Kind</FieldLabel>
            <Select
              items={KIND_ITEMS}
              onValueChange={(value) => field.onChange(value)}
              value={field.value}
            >
              <SelectTrigger
                className="w-full"
                id={`${formId}-kind`}
                onBlur={field.onBlur}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                {KIND_ITEMS.map(({ value, label }) => (
                  <SelectItem
                    disabled={value === "USAGE" && quantity === 0}
                    key={value}
                    value={value}
                  >
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <Controller
          control={control}
          name="units"
          render={({ field, fieldState }) => (
            <Field data-invalid={!!fieldState.error}>
              <FieldLabel htmlFor={`${formId}-units`}>Units</FieldLabel>
              <Input
                {...field}
                id={`${formId}-units`}
                inputMode="numeric"
                max={isUsage ? quantity : undefined}
                min={1}
                onChange={(event) => field.onChange(event.target.valueAsNumber)}
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
          name="date"
          render={({ field, fieldState }) => (
            <Field data-invalid={!!fieldState.error}>
              <FieldLabel htmlFor={`${formId}-date`}>Date</FieldLabel>
              <DatePicker
                id={`${formId}-date`}
                invalid={fieldState.invalid}
                maxDate={new Date()}
                onBlur={field.onBlur}
                onChange={field.onChange}
                value={field.value}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      <Controller
        control={control}
        name="reason"
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error}>
            <FieldLabel htmlFor={`${formId}-reason`}>Reason</FieldLabel>
            <Textarea
              {...field}
              id={`${formId}-reason`}
              placeholder="Supplier, or the project it was used in"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};
