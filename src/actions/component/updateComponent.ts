"use server";

import { toComponentIdentityKeys } from "@/lib/componentIdentity";
import {
  type ComponentResult,
  duplicateComponentResult,
  invalidIdResult,
  parseComponentInput,
  toComponentWriteFailure,
} from "@/lib/componentResult";
import { prisma } from "@/lib/prisma";
import {
  type ComponentFormInput,
  componentIdSchema,
} from "@/schemas/componentSchema";

export const updateComponent = async (
  id: number,
  input: ComponentFormInput,
): Promise<ComponentResult> => {
  if (!componentIdSchema.safeParse(id).success) {
    return invalidIdResult();
  }

  const parsed = parseComponentInput(input);
  if (!parsed.success) {
    return parsed.result;
  }

  const { name, manufacturer, description, quantity } = parsed.data;
  const keys = toComponentIdentityKeys(name, manufacturer);

  // Keeping its own name and Manufacturer is not a duplicate.
  const existing = await prisma.component.findFirst({
    select: { id: true },
    where: { ...keys, NOT: { id } },
  });
  if (existing) {
    return duplicateComponentResult();
  }

  try {
    const component = await prisma.component.update({
      data: { description, manufacturer, name, quantity, ...keys },
      omit: { manufacturerKey: true, nameKey: true },
      where: { id },
    });
    return { component, success: true };
  } catch (error) {
    return toComponentWriteFailure(error);
  }
};
