"use server";

import { prisma } from "@/lib/prisma";

export const GetCategories = async () => {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return categories;
};
