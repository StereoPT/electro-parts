"use server";

import { prisma } from "@/lib/prisma";
import { handleUniqueViolation } from "@/lib/writeErrors";
import {
  editCategorySchema,
  type editCategorySchemaType,
} from "@/schemas/categorySchema";

const DUPLICATE_CATEGORY_MESSAGE = "A category with this name already exists.";

export const UpdateCategory = async (
  categoryId: string,
  values: editCategorySchemaType,
) => {
  const { success, data } = await editCategorySchema.safeParseAsync(values);

  if (!success) {
    throw new Error("Invalid form data");
  }

  try {
    await prisma.category.update({
      where: { id: categoryId },
      data,
    });
  } catch (error) {
    return handleUniqueViolation(error, DUPLICATE_CATEGORY_MESSAGE);
  }

  return { success: true } as const;
};
