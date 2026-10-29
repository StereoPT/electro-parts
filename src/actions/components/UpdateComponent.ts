"use server";

import { prisma } from "@/lib/prisma";
import { handleUniqueViolation } from "@/lib/writeErrors";
import {
  editComponentSchema,
  type editComponentSchemaType,
} from "@/schemas/componentSchema";

const DUPLICATE_COMPONENT_MESSAGE =
  "A component with this name and manufacturer already exists.";

export const UpdateComponent = async (
  componentId: string,
  values: editComponentSchemaType,
) => {
  const { success, data } = await editComponentSchema
    .omit({ quantity: true })
    .safeParseAsync(values);

  if (!success) {
    throw new Error("Invalid form data");
  }

  try {
    await prisma.component.update({
      where: { id: componentId },
      data,
    });
  } catch (error) {
    return handleUniqueViolation(error, DUPLICATE_COMPONENT_MESSAGE);
  }

  return { success: true } as const;
};
