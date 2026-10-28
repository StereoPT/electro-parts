import type { CategoryRow } from "@/actions/categories/GetCategories";
import { EditCategoryDialog } from "@/components/categories/dialogs/EditCategoryDialog";
import { DeleteDialog } from "@/components/layout/DeleteDialog";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useDeleteCategory } from "@/hooks/categories/useDeleteCategory";
import { Edit, Info, Trash2, TriangleAlert } from "lucide-react";
import { useState } from "react";

type CategoryActionsProps = {
  category: CategoryRow;
};

export const CategoryActions = ({ category }: CategoryActionsProps) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const { mutateAsync, isPending } = useDeleteCategory(category.id);

  const componentCount = category._count.components;
  const hasComponents = componentCount > 0;
  const impact = hasComponents
    ? `${componentCount} ${componentCount === 1 ? "component" : "components"} will become uncategorized.`
    : "No components use this category.";

  return (
    <>
      {showDeleteAlert && (
        <DeleteDialog
          description={
            <span>
              This will permanently delete <b>{category.name}</b>.
              <br />
              This action cannot be undone.
            </span>
          }
          isPending={isPending}
          onDelete={mutateAsync}
          onOpenChange={setShowDeleteAlert}
          open={showDeleteAlert}
        >
          <Alert variant={hasComponents ? "destructive" : "default"}>
            {hasComponents ? <TriangleAlert /> : <Info />}
            <AlertTitle>{impact}</AlertTitle>
          </Alert>
        </DeleteDialog>
      )}

      {showEditDialog && (
        <EditCategoryDialog
          categoryId={category.id}
          onOpenChange={setShowEditDialog}
          open={showEditDialog}
        />
      )}

      <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity focus-within:opacity-100 group-hover/row:opacity-100">
        <Button
          aria-label={`Edit ${category.name}`}
          onClick={() => setShowEditDialog(true)}
          size="icon"
          variant="ghost"
        >
          <Edit />
        </Button>
        <Button
          aria-label={`Delete ${category.name}`}
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
