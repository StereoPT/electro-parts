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

export const createComponent = async (
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

  const existing = await prisma.component.findUnique({
    where: { nameKey_manufacturerKey: keys },
  });
  if (existing) {
    return duplicateComponentResult();
  }

  try {
    const component = await prisma.component.create({
      data: { description, manufacturer, name, quantity, ...keys },
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
