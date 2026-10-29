"use server";

import { prisma } from "@/lib/prisma";
import {
  recordAdjustmentSchema,
  type recordAdjustmentSchemaType,
} from "@/schemas/adjustmentSchema";

export const RecordAdjustment = async (
  componentId: string,
  values: recordAdjustmentSchemaType,
) => {
  const { success, data } = await recordAdjustmentSchema.safeParseAsync(values);

  if (!success) {
    throw new Error("Invalid form data");
  }

  return prisma.$transaction(async (tx) => {
    const { count } = await tx.component.updateMany({
      where: {
        id: componentId,
        ...(data.kind === "USAGE" && { quantity: { gte: data.units } }),
      },
      data: {
        quantity:
          data.kind === "USAGE"
            ? { decrement: data.units }
            : { increment: data.units },
      },
    });

    if (count === 0) {
      const component = await tx.component.findUnique({
        where: { id: componentId },
        select: { quantity: true },
      });

      if (!component) {
        throw new Error("Component not found");
      }

      return {
        success: false,
        fieldErrors: {
          units: [`Only ${component.quantity} in stock`],
        },
      } as const;
    }

    await tx.adjustment.create({ data: { ...data, componentId } });

    return { success: true } as const;
  });
};
