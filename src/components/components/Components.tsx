"use client";

import { AddComponentDialog } from "@/components/components/dialogs/AddComponentDialog";
import { EmptyState } from "@/components/layout/EmptyState";
import { LoadingState } from "@/components/layout/LoadingState";
import { componentColumns } from "@/constants/componentColumns";
import { useComponents } from "@/hooks/components/useComponents";
import { DataTable } from "@stereopt/data-table";
import { Cpu } from "lucide-react";

export const Components = () => {
  const { data: components, isPending } = useComponents();

  if (isPending || !components) {
    return <LoadingState />;
  }

  if (components.length <= 0) {
    return (
      <EmptyState
        action={<AddComponentDialog />}
        description="Add your first component to start tracking your inventory."
        icon={Cpu}
        title="No components yet"
      />
    );
  }

  return (
    <DataTable
      columns={componentColumns}
      config={{
        search: {
          filterFields: ["name", "manufacturer"],
          placeholder: "Search components…",
        },
      }}
      data={components}
    />
  );
};
