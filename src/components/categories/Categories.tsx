"use client";

import { AddCategoryDialog } from "@/components/categories/dialogs/AddCategoryDialog";
import { EmptyState } from "@/components/layout/EmptyState";
import { LoadingState } from "@/components/layout/LoadingState";
import { categoryColumns } from "@/constants/categoryColumns";
import { useCategories } from "@/hooks/categories/useCategories";
import { DataTable } from "@stereopt/data-table";
import { Tags } from "lucide-react";

export const Categories = () => {
  const { data: categories, isPending } = useCategories();

  if (isPending || !categories) {
    return <LoadingState />;
  }

  if (categories.length <= 0) {
    return (
      <EmptyState
        action={<AddCategoryDialog />}
        description="Add your first category to start grouping your components."
        icon={Tags}
        title="No categories yet"
      />
    );
  }

  return (
    <DataTable
      columns={categoryColumns}
      config={{
        search: {
          filterFields: ["name"],
          placeholder: "Search categories…",
        },
      }}
      data={categories}
    />
  );
};
