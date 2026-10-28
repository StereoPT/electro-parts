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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useAddCategory } from "@/hooks/categories/useAddCategory";
import {
  type addCategorySchemaType,
  addCategorySchema,
  defaultCategoryValues,
} from "@/schemas/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const AddCategoryDialog = () => {
  const formId = "add-category";
  const [open, setOpen] = useState(false);

  const form = useForm<addCategorySchemaType>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: defaultCategoryValues,
  });

  const { mutateAsync, isPending } = useAddCategory();

  const onSubmit = useCallback(
    async (values: addCategorySchemaType) => {
      const result = await mutateAsync(values).catch(() => null);

      if (!result) {
        return;
      }

      if (!result.success) {
        form.setError("name", { message: result.fieldErrors.name[0] });
        return;
      }

      setOpen(false);
    },
    [form, mutateAsync],
  );

  return (
    <Dialog
      onOpenChange={setOpen}
      onOpenChangeComplete={(isOpen) => {
        if (!isOpen) {
          form.reset();
        }
      }}
      open={open}
    >
      <DialogTrigger render={<Button />}>Add Category</DialogTrigger>
      <DialogContent className="min-w-lg">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Create a category to group your components.
          </DialogDescription>
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
            Add Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
