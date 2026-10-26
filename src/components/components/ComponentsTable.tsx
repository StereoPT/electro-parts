"use client";

import { DataTable } from "@stereopt/data-table";
import { useMemo, useState } from "react";
import { ComponentDialog } from "@/components/components/ComponentDialog";
import { createComponentColumns } from "@/components/components/componentColumns";
import { ComponentsEmptyState } from "@/components/components/ComponentsEmptyState";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/toast";
import type { Component } from "@/generated/prisma/browser";
import { useDeleteComponent } from "@/hooks/component/useDeleteComponent";
import { useComponents } from "@/hooks/component/useComponents";

export const ComponentsTable = () => {
  const { data, isPending } = useComponents();
  const [editing, setEditing] = useState<Component | null>(null);
  const [deleting, setDeleting] = useState<Component | null>(null);
  const deleteComponent = useDeleteComponent();
  const columns = useMemo(
    () => createComponentColumns({ onDelete: setDeleting, onEdit: setEditing }),
    [],
  );

  const confirmDelete = async () => {
    if (!deleting) {
      return;
    }
    await deleteComponent.mutateAsync(deleting.id);
    toast.add({ title: "Component deleted", type: "success" });
    setDeleting(null);
  };

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
      {deleting && (
        <AlertDialog
          onOpenChange={(open) => {
            if (!open) {
              setDeleting(null);
            }
          }}
          open
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Delete {deleting.name}
                {deleting.manufacturer ? ` (${deleting.manufacturer})` : ""}?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This can't be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                disabled={deleteComponent.isPending}
                onClick={confirmDelete}
                variant="destructive"
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};
