"use server";

import { toComponentIdentityKeys } from "@/lib/componentIdentity";
import {
  type ComponentResult,
  duplicateComponentResult,
  parseComponentInput,
  toComponentWriteFailure,
} from "@/lib/componentResult";
import { prisma } from "@/lib/prisma";
import type { ComponentFormInput } from "@/schemas/componentSchema";

export const createComponent = async (
  input: ComponentFormInput,
): Promise<ComponentResult> => {
  const parsed = parseComponentInput(input);
  if (!parsed.success) {
    return parsed.result;
  }

  const { name, manufacturer, description, quantity } = parsed.data;
  const keys = toComponentIdentityKeys(name, manufacturer);

  const existing = await prisma.component.findUnique({
    select: { id: true },
    where: { nameKey_manufacturerKey: keys },
  });
  if (existing) {
    return duplicateComponentResult();
  }

  try {
    const component = await prisma.component.create({
      data: { description, manufacturer, name, quantity, ...keys },
      omit: { manufacturerKey: true, nameKey: true },
    });
    return { component, success: true };
  } catch (error) {
    return toComponentWriteFailure(error);
  }
};
