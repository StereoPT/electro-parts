"use client";

import { CategoryFormFields } from "@/components/categories/CategoryFormFields";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useCategory } from "@/hooks/categories/useCategory";
import { useUpdateCategory } from "@/hooks/categories/useUpdateCategory";
import {
  defaultCategoryValues,
  editCategorySchema,
  type editCategorySchemaType,
} from "@/schemas/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, type Dispatch, type SetStateAction } from "react";
import { FormProvider, useForm } from "react-hook-form";

type EditCategoryDialogProps = {
  categoryId: string;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

export const EditCategoryDialog = ({
  categoryId,
  open,
  onOpenChange,
}: EditCategoryDialogProps) => {
  const formId = "edit-category";

  const { data: category } = useCategory(categoryId);

  const form = useForm<editCategorySchemaType>({
    resolver: zodResolver(editCategorySchema),
    defaultValues: defaultCategoryValues,
    values: category ? { name: category.name } : undefined,
    resetOptions: { keepDirtyValues: true },
  });

  const { mutateAsync, isPending } = useUpdateCategory(categoryId);

  const onSubmit = useCallback(
    async (values: editCategorySchemaType) => {
      const result = await mutateAsync(values).catch(() => null);

      if (!result) {
        return;
      }

      if (!result.success) {
        form.setError("name", { message: result.fieldErrors.name[0] });
        return;
      }

      onOpenChange(false);
    },
    [form, mutateAsync, onOpenChange],
  );

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="min-w-lg" finalFocus={false}>
        <DialogHeader>
          <DialogTitle>Edit category</DialogTitle>
          <DialogDescription>Rename this category.</DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
            <CategoryFormFields formId={formId} />
          </form>
        </FormProvider>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          <Button disabled={isPending} form={formId} type="submit">
            {isPending && <Spinner />}
            Edit Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
