"use client";

import type { GetComponents } from "@/actions/components/GetComponents";
import { ComponentActions } from "@/components/components/ComponentActions";
import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";

type ComponentRow = Awaited<ReturnType<typeof GetComponents>>[number];

export const componentColumns: ColumnDef<ComponentRow>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "manufacturer",
    header: "Manufacturer",
    cell: ({ row }) => {
      const { manufacturer } = row.original;

      return manufacturer ?? "";
    },
  },
  {
    id: "category",
    header: "Category",
    accessorFn: (component) => component.category?.name,
    cell: ({ row }) => {
      const category = row.original.category;

      return category ? (
        <Badge variant="outline">{category.name}</Badge>
      ) : (
        <Badge className="text-muted-foreground" variant="secondary">
          Uncategorized
        </Badge>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const { quantity } = row.original;

      return quantity === 0 ? (
        <Badge className="text-muted-foreground" variant="secondary">
          Out of stock
        </Badge>
      ) : (
        <span className="tabular-nums">{quantity}</span>
      );
    },
  },
  {
    id: "actions",
    header: () => null,
    size: 50,
    cell: ({ row }) => {
      const component = row.original;

      return <ComponentActions component={component} />;
    },
  },
];
