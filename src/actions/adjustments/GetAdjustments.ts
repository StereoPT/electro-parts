"use server";

import { prisma } from "@/lib/prisma";

export const GetAdjustments = async () => {
  const adjustments = await prisma.adjustment.findMany({
    include: { component: { select: { name: true, manufacturer: true } } },
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
  });

  return adjustments;
};

export type AdjustmentRow = Awaited<ReturnType<typeof GetAdjustments>>[number];
