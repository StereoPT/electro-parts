"use client";

import { ComponentActions } from "@/components/components/ComponentActions";
import { Badge } from "@/components/ui/badge";
import type { Component } from "@/generated/prisma/client";
import type { ColumnDef } from "@tanstack/react-table";

export const componentColumns: ColumnDef<Component>[] = [
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
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const { quantity } = row.original;

      return quantity === 0 ? (
        <Badge className="text-muted-foreground" variant="secondary">
          Out of stock
        </Badge>
      ) : (
        quantity
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const { description } = row.original;

      return description ?? "";
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
