import { z } from "zod";

export const defaultComponentValues = {
  name: "",
  quantity: 0,
  manufacturer: "",
  categoryId: null,
  description: "",
};

export const addComponentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or fewer"),
  quantity: z
    .number({ error: "Quantity is required" })
    .int("Quantity must be a whole number")
    .min(0, "Quantity must be 0 or more"),
  manufacturer: z
    .string()
    .trim()
    .max(100, "Manufacturer must be 100 characters or fewer")
    .optional(),
  categoryId: z.string().nullable().optional(),
  description: z
    .string()
    .trim()
    .max(1000, "Description must be 1000 characters or fewer")
    .optional(),
});

export const editComponentSchema = addComponentSchema.partial();

export type addComponentSchemaType = z.input<typeof addComponentSchema>;
export type editComponentSchemaType = z.input<typeof editComponentSchema>;
