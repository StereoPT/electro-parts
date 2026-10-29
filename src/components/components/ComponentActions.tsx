import { RecordAdjustmentDialog } from "@/components/adjustments/dialogs/RecordAdjustmentDialog";
import { EditComponentDialog } from "@/components/components/dialogs/EditComponentDialog";
import { DeleteDialog } from "@/components/layout/DeleteDialog";
import { Button } from "@/components/ui/button";
import type { Component } from "@/generated/prisma/client";
import { useDeleteComponent } from "@/hooks/components/useDeleteComponent";
import { Edit, PackagePlus, Trash2 } from "lucide-react";
import { useState } from "react";

type ComponentActionsProps = {
  component: Component;
};

export const ComponentActions = ({ component }: ComponentActionsProps) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showAdjustDialog, setShowAdjustDialog] = useState(false);

  const { mutateAsync, isPending } = useDeleteComponent(component.id);

  return (
    <>
      {showDeleteAlert && (
        <DeleteDialog
          description={
            <span>
              This will permanently delete <b>{component.name}</b>. This action
              cannot be undone.
            </span>
          }
          isPending={isPending}
          onDelete={mutateAsync}
          onOpenChange={setShowDeleteAlert}
          open={showDeleteAlert}
        />
      )}

      {showEditDialog && (
        <EditComponentDialog
          componentId={component.id}
          onOpenChange={setShowEditDialog}
          open={showEditDialog}
        />
      )}

      {showAdjustDialog && (
        <RecordAdjustmentDialog
          componentId={component.id}
          componentName={component.name}
          onOpenChange={setShowAdjustDialog}
          open={showAdjustDialog}
          quantity={component.quantity}
        />
      )}

      <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity focus-within:opacity-100 group-hover/row:opacity-100">
        <Button
          aria-label={`Adjust ${component.name}`}
          onClick={() => setShowAdjustDialog(true)}
          size="icon"
          variant="ghost"
        >
          <PackagePlus />
        </Button>
        <Button
          aria-label={`Edit ${component.name}`}
          onClick={() => setShowEditDialog(true)}
          size="icon"
          variant="ghost"
        >
          <Edit />
        </Button>
        <Button
          aria-label={`Delete ${component.name}`}
          onClick={() => setShowDeleteAlert(true)}
          size="icon"
          variant="destructive"
        >
          <Trash2 />
        </Button>
      </div>
    </>
  );
};
