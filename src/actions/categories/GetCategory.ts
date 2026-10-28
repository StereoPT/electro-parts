"use server";

import { prisma } from "@/lib/prisma";

export const GetCategory = async (categoryId: string) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new Error(`Category with ID ${categoryId} not found`);
  }

  return category;
};
