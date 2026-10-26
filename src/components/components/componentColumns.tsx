import type { DataTableProps } from "@stereopt/data-table";
import { MoreHorizontalIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Component } from "@/generated/prisma/browser";

type Columns = DataTableProps<Component, unknown>["columns"];

type ComponentColumnHandlers = {
  onEdit: (component: Component) => void;
};

// Manufacturer and description use coalescing accessors so the global search
// still covers them when the first row's value is null.
export const createComponentColumns = ({
  onEdit,
}: ComponentColumnHandlers): Columns => [
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
  {
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              aria-label={`Actions for ${row.original.name}`}
              size="icon-sm"
              variant="ghost"
            />
          }
        >
          <MoreHorizontalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit(row.original)}>
            Edit
          </DropdownMenuItem>
          {/* Add further row actions (e.g. Delete) here. */}
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
    header: "",
    id: "actions",
    size: 48,
  },
];
