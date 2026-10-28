"use server";

import { prisma } from "@/lib/prisma";
import { handleUniqueViolation } from "@/lib/writeErrors";
import {
  addComponentSchema,
  type addComponentSchemaType,
} from "@/schemas/componentSchema";

const DUPLICATE_COMPONENT_MESSAGE =
  "A component with this name and manufacturer already exists.";

export const AddComponent = async (values: addComponentSchemaType) => {
  const { success, data } = await addComponentSchema.safeParseAsync(values);

  if (!success) {
    throw new Error("Invalid form data");
  }

  try {
    await prisma.component.create({ data });
  } catch (error) {
    return handleUniqueViolation(error, DUPLICATE_COMPONENT_MESSAGE);
  }

  return { success: true } as const;
};
