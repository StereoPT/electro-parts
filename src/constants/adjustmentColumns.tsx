"use client";

import type { AdjustmentRow } from "@/actions/adjustments/GetAdjustments";
import { Badge } from "@/components/ui/badge";
import { formatDay } from "@/lib/dates";
import type { ColumnDef } from "@tanstack/react-table";

export const adjustmentColumns: ColumnDef<AdjustmentRow>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <span className="tabular-nums">{formatDay(row.original.date)}</span>
    ),
  },
  {
    id: "component",
    header: "Component",
    accessorFn: (adjustment) => adjustment.component.name,
    cell: ({ row }) => {
      const { name, manufacturer } = row.original.component;

      return (
        <span>
          {name}
          {manufacturer && (
            <span className="text-muted-foreground"> · {manufacturer}</span>
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "kind",
    header: "Kind",
    cell: ({ row }) => {
      const isPurchase = row.original.kind === "PURCHASE";

      return (
        <Badge variant={isPurchase ? "secondary" : "outline"}>
          {isPurchase ? "Purchase" : "Usage"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "units",
    header: "Units",
    cell: ({ row }) => {
      const { kind, units } = row.original;

      return (
        <span className="inline-flex tabular-nums">
          <span className="w-3 text-center">
            {kind === "PURCHASE" ? "+" : "-"}
          </span>
          {units}
        </span>
      );
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => {
      const { reason } = row.original;

      return reason || <span className="text-muted-foreground">-</span>;
    },
  },
];
