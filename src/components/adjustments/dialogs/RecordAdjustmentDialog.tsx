"use client";

import { AdjustmentFormFields } from "@/components/adjustments/AdjustmentFormFields";
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
import { useRecordAdjustment } from "@/hooks/adjustments/useRecordAdjustment";
import { today } from "@/lib/dates";
import {
  defaultAdjustmentValues,
  recordAdjustmentSchema,
  type recordAdjustmentSchemaType,
} from "@/schemas/adjustmentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, type Dispatch, type SetStateAction } from "react";
import { FormProvider, useForm } from "react-hook-form";

type RecordAdjustmentDialogProps = {
  componentId: string;
  componentName: string;
  quantity: number;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

export const RecordAdjustmentDialog = ({
  componentId,
  componentName,
  quantity,
  open,
  onOpenChange,
}: RecordAdjustmentDialogProps) => {
  const formId = "record-adjustment";

  const form = useForm<recordAdjustmentSchemaType>({
    resolver: zodResolver(recordAdjustmentSchema),
    defaultValues: {
      ...defaultAdjustmentValues,
      date: today(),
    },
  });

  const { mutateAsync, isPending } = useRecordAdjustment(componentId);

  const onSubmit = useCallback(
    async (values: recordAdjustmentSchemaType) => {
      const result = await mutateAsync(values).catch(() => null);

      if (!result) {
        return;
      }

      if (!result.success) {
        form.setError("units", { message: result.fieldErrors.units[0] });
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
          <DialogTitle>Adjust quantity</DialogTitle>
          <DialogDescription>
            Record a purchase or usage of <b>{componentName}</b>.
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
            <AdjustmentFormFields formId={formId} quantity={quantity} />
          </form>
        </FormProvider>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          <Button disabled={isPending} form={formId} type="submit">
            {isPending && <Spinner />}
            Record
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
