"use server";

import { z } from "zod";
import { Prisma } from "@/generated/prisma/client";
import { toIdentityKeys } from "@/lib/componentIdentity";
import {
  type ComponentResult,
  duplicateComponentResult,
} from "@/lib/componentResult";
import { prisma } from "@/lib/prisma";
import {
  type ComponentFormInput,
  componentSchema,
} from "@/schemas/componentSchema";

export const updateComponent = async (
  id: number,
  input: ComponentFormInput,
): Promise<ComponentResult> => {
  const parsed = componentSchema.safeParse(input);
  if (!parsed.success) {
    return {
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      success: false,
    };
  }

  const { name, manufacturer, description, quantity } = parsed.data;
  const keys = toIdentityKeys(name, manufacturer);

  // Keeping its own name and Manufacturer is not a duplicate.
  const existing = await prisma.component.findFirst({
    where: { ...keys, NOT: { id } },
  });
  if (existing) {
    return duplicateComponentResult();
  }

  try {
    const component = await prisma.component.update({
      data: { description, manufacturer, name, quantity, ...keys },
      where: { id },
    });
    return { component, success: true };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return duplicateComponentResult();
    }
    throw error;
  }
};
