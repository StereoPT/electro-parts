"use server";

import { prisma } from "@/lib/prisma";

export const DeleteCategory = async (categoryId: string) => {
  await prisma.category.delete({
    where: { id: categoryId },
  });
};
