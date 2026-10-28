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
    id: "components",
    header: "Components",
    accessorFn: (category) => category._count.components,
    cell: ({ row }) => {
      const { components } = row.original._count;

      return <span className="tabular-nums">{components}</span>;
    },
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
