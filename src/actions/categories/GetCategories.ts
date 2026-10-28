"use server";

import { prisma } from "@/lib/prisma";

export const GetCategories = async () => {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { components: true } } },
    orderBy: { name: "asc" },
  });

  return categories;
};

export type CategoryRow = Awaited<ReturnType<typeof GetCategories>>[number];
