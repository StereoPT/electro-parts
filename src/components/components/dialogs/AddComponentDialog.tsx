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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useAddComponent } from "@/hooks/component/useAddComponent";
import {
  type addComponentSchemaType,
  addComponentSchema,
  defaultComponentValues,
} from "@/schemas/componentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const AddComponentDialog = () => {
  const formId = "add-component";
  const [open, setOpen] = useState(false);

  const form = useForm<addComponentSchemaType>({
    resolver: zodResolver(addComponentSchema),
    defaultValues: defaultComponentValues,
  });

  const { mutateAsync, isPending } = useAddComponent();

  const onSubmit = useCallback(
    async (values: addComponentSchemaType) => {
      await mutateAsync(values);
      form.reset();
      setOpen(false);
    },
    [form, mutateAsync],
  );

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger render={<Button />}>Add Component</DialogTrigger>
      <DialogContent className="min-w-lg">
        <DialogHeader>
          <DialogTitle>Add Component</DialogTitle>
          <DialogDescription>Record a component you own.</DialogDescription>
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
            Add Component
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
