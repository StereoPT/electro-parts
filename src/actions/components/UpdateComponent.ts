"use server";

import { handleComponentWriteError } from "@/lib/componentErrors";
import { prisma } from "@/lib/prisma";
import {
  editComponentSchema,
  type editComponentSchemaType,
} from "@/schemas/componentSchema";

export const UpdateComponent = async (
  componentId: string,
  values: editComponentSchemaType,
) => {
  const { success, data } = await editComponentSchema.safeParseAsync(values);

  if (!success) {
    throw new Error("Invalid form data");
  }

  try {
    await prisma.component.update({
      where: { id: componentId },
      data,
    });
  } catch (error) {
    return handleComponentWriteError(error);
  }

  return { success: true } as const;
};
