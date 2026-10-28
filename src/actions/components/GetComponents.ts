"use server";

import { prisma } from "@/lib/prisma";

export const GetComponents = async () => {
  const components = await prisma.component.findMany({
    include: { category: { select: { name: true } } },
    orderBy: { name: "asc" },
  });

  return components;
};
