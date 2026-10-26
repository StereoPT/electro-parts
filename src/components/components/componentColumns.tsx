import type { DataTableProps } from "@stereopt/data-table";
import { Badge } from "@/components/ui/badge";
import type { Component } from "@/generated/prisma/browser";

type Columns = DataTableProps<Component, unknown>["columns"];

// Manufacturer and description use coalescing accessors so the global search
// still covers them when the first row's value is null.
export const componentColumns: Columns = [
  { accessorKey: "name", header: "Name", id: "name" },
  {
    accessorFn: (component) => component.manufacturer ?? "",
    header: "Manufacturer",
    id: "manufacturer",
  },
  {
    accessorKey: "quantity",
    cell: ({ row }) =>
      row.original.quantity === 0 ? (
        <Badge className="text-muted-foreground" variant="secondary">
          Out of stock
        </Badge>
      ) : (
        row.original.quantity
      ),
    header: "Quantity",
    id: "quantity",
  },
  {
    accessorFn: (component) => component.description ?? "",
    header: "Description",
    id: "description",
  },
];
