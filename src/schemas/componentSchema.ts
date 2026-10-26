import { z } from "zod";

export const componentSchema = z.object({
  description: z
    .string()
    .max(1000, "Description must be 1000 characters or fewer")
    .optional()
    .transform((value) => (value?.trim() ? value : null)),
  manufacturer: z
    .string()
    .trim()
    .max(100, "Manufacturer must be 100 characters or fewer")
    .optional()
    .transform((value) => (value ? value : null)),
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or fewer"),
  quantity: z
    .number({ error: "Quantity is required" })
    .int("Quantity must be a whole number")
    .min(0, "Quantity must be 0 or more"),
});

export type ComponentFormInput = z.input<typeof componentSchema>;
export type ComponentFormValues = z.output<typeof componentSchema>;

export const componentIdSchema = z.number().int().positive();
