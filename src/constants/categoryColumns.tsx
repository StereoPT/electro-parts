"use client";

import type { Category } from "@/generated/prisma/client";
import type { ColumnDef } from "@tanstack/react-table";

export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
];
