"use client";

import { AddComponentButton } from "@/components/components/AddComponentButton";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

export const ComponentsEmptyState = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No components yet</EmptyTitle>
        <EmptyDescription>
          Add your first component to start tracking your inventory.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <AddComponentButton />
      </EmptyContent>
    </Empty>
  );
};
