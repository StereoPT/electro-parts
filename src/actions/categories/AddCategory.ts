"use server";

import { prisma } from "@/lib/prisma";
import { handleUniqueViolation } from "@/lib/writeErrors";
import {
  addCategorySchema,
  type addCategorySchemaType,
} from "@/schemas/categorySchema";

const DUPLICATE_CATEGORY_MESSAGE = "A category with this name already exists.";

export const AddCategory = async (values: addCategorySchemaType) => {
  const { success, data } = await addCategorySchema.safeParseAsync(values);

  if (!success) {
    throw new Error("Invalid form data");
  }

  try {
    await prisma.category.create({ data });
  } catch (error) {
    return handleUniqueViolation(error, DUPLICATE_CATEGORY_MESSAGE);
  }

  return { success: true } as const;
};
