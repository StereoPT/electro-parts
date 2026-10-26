"use server";

import { z } from "zod";
import type { Component } from "@/generated/prisma/client";
import { Prisma } from "@/generated/prisma/client";
import { toIdentityKeys } from "@/lib/componentIdentity";
import { prisma } from "@/lib/prisma";
import {
  type ComponentFormInput,
  componentSchema,
} from "@/schemas/componentSchema";

export type ComponentFieldErrors = Partial<
  Record<keyof ComponentFormInput, string[]>
>;

export type CreateComponentResult =
  | { success: true; component: Component }
  | { success: false; fieldErrors: ComponentFieldErrors };

const DUPLICATE_ERROR =
  "A component with this name and manufacturer already exists.";

const duplicate = (): CreateComponentResult => ({
  fieldErrors: { name: [DUPLICATE_ERROR] },
  success: false,
});

export const createComponent = async (
  input: ComponentFormInput,
): Promise<CreateComponentResult> => {
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
    return duplicate();
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
      return duplicate();
    }
    throw error;
  }
};
