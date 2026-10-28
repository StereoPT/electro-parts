import { EditCategoryDialog } from "@/components/categories/dialogs/EditCategoryDialog";
import { Button } from "@/components/ui/button";
import type { Category } from "@/generated/prisma/client";
import { Edit } from "lucide-react";
import { useState } from "react";

type CategoryActionsProps = {
  category: Category;
};

export const CategoryActions = ({ category }: CategoryActionsProps) => {
  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <>
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
      </div>
    </>
  );
};
