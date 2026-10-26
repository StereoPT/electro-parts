"use client";

import { DataTable } from "@stereopt/data-table";
import { ComponentsEmptyState } from "@/components/components/ComponentsEmptyState";
import { componentColumns } from "@/components/components/componentColumns";
import { Skeleton } from "@/components/ui/skeleton";
import { useComponents } from "@/hooks/component/useComponents";

export const ComponentsTable = () => {
  const { data, isPending } = useComponents();

  if (isPending) {
    return <Skeleton className="h-64 w-full" />;
  }

  if (!data || data.length === 0) {
    return <ComponentsEmptyState />;
  }

  return (
    <DataTable
      columns={componentColumns}
      config={{
        search: {
          filterFields: ["name", "manufacturer", "description"],
          placeholder: "Search components…",
        },
      }}
      data={data}
    />
  );
};
