"use server";

import { prisma } from "@/lib/prisma";
import {
  addComponentSchema,
  type addComponentSchemaType,
} from "@/schemas/componentSchema";

export const AddComponent = async (values: addComponentSchemaType) => {
  const { success, data } = await addComponentSchema.safeParseAsync(values);

  if (!success) {
    throw new Error("Invalid form data");
  }

  await prisma.component.create({ data });
};
