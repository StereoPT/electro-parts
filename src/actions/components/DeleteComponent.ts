"use server";

import { prisma } from "@/lib/prisma";

export const DeleteComponent = async (componentId: string) => {
  await prisma.component.delete({
    where: { id: componentId },
  });
};
