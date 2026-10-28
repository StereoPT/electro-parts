import { z } from "zod";

export const defaultCategoryValues = {
  name: "",
};

export const addCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or fewer"),
});

export const editCategorySchema = addCategorySchema;

export type addCategorySchemaType = z.input<typeof addCategorySchema>;
export type editCategorySchemaType = z.input<typeof editCategorySchema>;
