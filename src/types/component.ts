import type { Component as ComponentRecord } from "@/generated/prisma/browser";

// What the actions return: the record without its internal identity keys.
export type Component = Omit<ComponentRecord, "manufacturerKey" | "nameKey">;
