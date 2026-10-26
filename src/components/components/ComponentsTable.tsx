"use client";

import { DataTable } from "@stereopt/data-table";
import { useMemo, useState } from "react";
import { ComponentDialog } from "@/components/components/ComponentDialog";
import { createComponentColumns } from "@/components/components/componentColumns";
import { ComponentsEmptyState } from "@/components/components/ComponentsEmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import type { Component } from "@/generated/prisma/browser";
import { useComponents } from "@/hooks/component/useComponents";

export const ComponentsTable = () => {
  const { data, isPending } = useComponents();
  const [editing, setEditing] = useState<Component | null>(null);
  const columns = useMemo(
    () => createComponentColumns({ onEdit: setEditing }),
    [],
  );

  if (isPending) {
    return <Skeleton className="h-64 w-full" />;
  }

  if (!data || data.length === 0) {
    return <ComponentsEmptyState />;
  }

  return (
    <>
      <DataTable
        columns={columns}
        config={{
          search: {
            filterFields: ["name", "manufacturer", "description"],
            placeholder: "Search components…",
          },
        }}
        data={data}
      />
      {editing && (
        <ComponentDialog
          component={editing}
          onOpenChange={(open) => {
            if (!open) {
              setEditing(null);
            }
          }}
          open
        />
      )}
    </>
  );
};
