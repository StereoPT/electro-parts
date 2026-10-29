import { today } from "@/lib/dates";
import { z } from "zod";

export const ADJUSTMENT_KINDS = ["PURCHASE", "USAGE"] as const;

export const defaultAdjustmentValues = {
  kind: "USAGE" as const,
  units: 1,
  reason: "",
};

export const recordAdjustmentSchema = z
  .object({
    kind: z.enum(ADJUSTMENT_KINDS),
    units: z
      .number({ error: "Units is required" })
      .int("Units must be a whole number")
      .min(1, "Units must be 1 or more"),
    date: z.iso
      .date("Date is required")
      .refine((date) => date <= today(), "Date cannot be in the future"),
    reason: z
      .string()
      .trim()
      .max(500, "Reason must be 500 characters or fewer"),
  })
  .refine((values) => values.kind !== "USAGE" || values.reason.length > 0, {
    message: "Reason is required for a usage",
    path: ["reason"],
  });

export type recordAdjustmentSchemaType = z.input<typeof recordAdjustmentSchema>;
