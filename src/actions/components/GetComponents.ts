"use server";

import { prisma } from "@/lib/prisma";

export const GetComponents = async () => {
  const components = await prisma.component.findMany({
    orderBy: { name: "asc" },
  });

  return components;
};
