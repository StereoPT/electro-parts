"use client";

import { ComponentFormFields } from "@/components/components/ComponentFormFields";
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
import { useComponent } from "@/hooks/components/useComponent";
import { useUpdateComponent } from "@/hooks/components/useUpdateComponent";
import {
  defaultComponentValues,
  editComponentSchema,
  type editComponentSchemaType,
} from "@/schemas/componentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, type Dispatch, type SetStateAction } from "react";
import { FormProvider, useForm } from "react-hook-form";

type EditComponentDialogProps = {
  componentId: string;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

export const EditComponentDialog = ({
  componentId,
  open,
  onOpenChange,
}: EditComponentDialogProps) => {
  const formId = "edit-component";

  const { data: component } = useComponent(componentId);

  const form = useForm<editComponentSchemaType>({
    resolver: zodResolver(editComponentSchema),
    defaultValues: defaultComponentValues,
    values: component
      ? {
          name: component.name,
          manufacturer: component.manufacturer ?? undefined,
          categoryId: component.categoryId,
          quantity: component.quantity,
          description: component.description ?? undefined,
        }
      : undefined,
    resetOptions: { keepDirtyValues: true },
  });

  const { mutateAsync, isPending } = useUpdateComponent(componentId);

  const onSubmit = useCallback(
    async (values: editComponentSchemaType) => {
      // A thrown error is reported by the mutation's onError toast.
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
          <DialogTitle>Edit component</DialogTitle>
          <DialogDescription>
            Update this component's details.
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
            <ComponentFormFields formId={formId} />
          </form>
        </FormProvider>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          <Button disabled={isPending} form={formId} type="submit">
            {isPending && <Spinner />}
            Edit Component
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
