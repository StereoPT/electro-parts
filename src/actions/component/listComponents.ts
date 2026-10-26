"use server";

import { prisma } from "@/lib/prisma";
import type { Component } from "@/types/component";

export const listComponents = async (): Promise<Component[]> => {
  return prisma.component.findMany({
    omit: { manufacturerKey: true, nameKey: true },
    orderBy: { name: "asc" },
  });
};
