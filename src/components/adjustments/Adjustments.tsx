"use client";

import { EmptyState } from "@/components/layout/EmptyState";
import { LoadingState } from "@/components/layout/LoadingState";
import { adjustmentColumns } from "@/constants/adjustmentColumns";
import { useAdjustments } from "@/hooks/adjustments/useAdjustments";
import { DataTable } from "@stereopt/data-table";
import { History } from "lucide-react";

export const Adjustments = () => {
  const { data: adjustments, isPending } = useAdjustments();

  if (isPending || !adjustments) {
    return <LoadingState />;
  }

  if (adjustments.length <= 0) {
    return (
      <EmptyState
        description="Record a purchase or usage from the Components page to see it here."
        icon={History}
        title="No adjustments yet"
      />
    );
  }

  return <DataTable columns={adjustmentColumns} data={adjustments} />;
};
