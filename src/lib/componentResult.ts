import type { Component } from "@/generated/prisma/client";
import type { ComponentFormInput } from "@/schemas/componentSchema";

export type ComponentFieldErrors = Partial<
  Record<keyof ComponentFormInput, string[]>
>;

// Shared by the create and update actions. Expected failures are returned,
// not thrown, so the form can show them inline.
export type ComponentResult =
  | { success: true; component: Component }
  | { success: false; fieldErrors: ComponentFieldErrors };

export const duplicateComponentResult = (): ComponentResult => ({
  fieldErrors: {
    name: ["A component with this name and manufacturer already exists."],
  },
  success: false,
});
