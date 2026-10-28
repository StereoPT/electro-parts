"use client";

import type { CategoryRow } from "@/actions/categories/GetCategories";
import { CategoryActions } from "@/components/categories/CategoryActions";
import type { ColumnDef } from "@tanstack/react-table";

export const categoryColumns: ColumnDef<CategoryRow>[] = [
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
