"use server";

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

  await prisma.component.update({
    where: { id: componentId },
    data,
  });
};
