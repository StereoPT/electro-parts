"use server";

import type { Component } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export const listComponents = async (): Promise<Component[]> => {
  return prisma.component.findMany({ orderBy: { name: "asc" } });
};
