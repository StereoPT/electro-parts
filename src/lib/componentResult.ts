import { z } from "zod";
import { Prisma } from "@/generated/prisma/client";
import {
  type ComponentFormInput,
  type ComponentFormValues,
  componentSchema,
} from "@/schemas/componentSchema";
import type { Component } from "@/types/component";

export type ComponentFieldErrors = Partial<
  Record<keyof ComponentFormInput, string[]>
>;

// Shared by the create and update actions. Expected failures are returned,
// not thrown, so the form can show them inline. A failure with no field
// errors (e.g. an invalid id) has nothing to show inline.
export type ComponentResult =
  | { success: true; component: Component }
  | { success: false; fieldErrors: ComponentFieldErrors };

export const duplicateComponentResult = (): ComponentResult => ({
  fieldErrors: {
    name: ["A component with this name and manufacturer already exists."],
  },
  success: false,
});

export const invalidIdResult = (): ComponentResult => ({
  fieldErrors: {},
  success: false,
});

export const parseComponentInput = (
  input: ComponentFormInput,
):
  | { data: ComponentFormValues; success: true }
  | { result: ComponentResult; success: false } => {
  const parsed = componentSchema.safeParse(input);
  if (!parsed.success) {
    return {
      result: {
        fieldErrors: z.flattenError(parsed.error).fieldErrors,
        success: false,
      },
      success: false,
    };
  }
  return { data: parsed.data, success: true };
};

// A unique-constraint race becomes a duplicate result; anything else is thrown.
export const toComponentWriteFailure = (error: unknown): ComponentResult => {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    return duplicateComponentResult();
  }
  throw error;
};
