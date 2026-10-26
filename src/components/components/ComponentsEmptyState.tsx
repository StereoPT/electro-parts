"use client";

import { Button } from "@/components/ui/button";
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
        <Button type="button">Add component</Button>
      </EmptyContent>
    </Empty>
  );
};
