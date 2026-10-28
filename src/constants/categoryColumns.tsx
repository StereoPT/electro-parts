"use client";

import { CategoryActions } from "@/components/categories/CategoryActions";
import type { Category } from "@/generated/prisma/client";
import type { ColumnDef } from "@tanstack/react-table";

export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    header: () => null,
    size: 50,
    cell: ({ row }) => {
      const category = row.original;

      return <CategoryActions category={category} />;
    },
  },
];
