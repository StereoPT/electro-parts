"use server";

import { prisma } from "@/lib/prisma";

// deleteMany so a Component that is already gone (e.g. deleted in another
// tab) is a no-op instead of a thrown error.
export const deleteComponent = async (
  id: number,
): Promise<{ success: true }> => {
  await prisma.component.deleteMany({ where: { id } });
  return { success: true };
};
