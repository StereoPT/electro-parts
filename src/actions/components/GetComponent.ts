"use server";

import { prisma } from "@/lib/prisma";

export const GetComponent = async (componentId: string) => {
  const component = await prisma.component.findUnique({
    where: { id: componentId },
  });

  if (!component) {
    throw new Error(`Component with ID ${componentId} not found`);
  }

  return component;
};
