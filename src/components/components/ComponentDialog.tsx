"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import type { Component } from "@/types/component";
import { useCreateComponent } from "@/hooks/component/useCreateComponent";
import { useUpdateComponent } from "@/hooks/component/useUpdateComponent";
import {
  type ComponentFormInput,
  type ComponentFormValues,
  componentSchema,
} from "@/schemas/componentSchema";

type ComponentDialogProps = {
  // When set the dialog edits this Component; otherwise it adds a new one.
  component?: Component;
  onOpenChange: (open: boolean) => void;
  open: boolean;
};

const COPY = {
  create: {
    description: "Record a component you own.",
    title: "Add component",
    toast: "Component added",
  },
  edit: {
    description: "Update this component's details.",
    title: "Edit component",
    toast: "Component updated",
  },
} as const;

type ComponentFormProps = Pick<ComponentDialogProps, "component"> & {
  onDone: () => void;
};

const ComponentForm = ({ component, onDone }: ComponentFormProps) => {
  const createComponent = useCreateComponent();
  const updateComponent = useUpdateComponent();
  const isPending = createComponent.isPending || updateComponent.isPending;
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setError,
  } = useForm<ComponentFormInput, unknown, ComponentFormValues>({
    defaultValues: {
      description: component?.description ?? "",
      manufacturer: component?.manufacturer ?? "",
      name: component?.name ?? "",
      quantity: component?.quantity ?? 0,
    },
    resolver: zodResolver(componentSchema),
  });

  // The action takes the raw form input and re-validates it on the server.
  const copy = COPY[component ? "edit" : "create"];

  const onSubmit = handleSubmit(async () => {
    const input = getValues();
    try {
      const result = component
        ? await updateComponent.mutateAsync({ id: component.id, input })
        : await createComponent.mutateAsync(input);
      if (result.success) {
        toast.add({ title: copy.toast, type: "success" });
        onDone();
        return;
      }
      let hasInlineError = false;
      for (const [field, messages] of Object.entries(result.fieldErrors)) {
        if (messages?.[0]) {
          setError(field as keyof ComponentFormInput, { message: messages[0] });
          hasInlineError = true;
        }
      }
      if (!hasInlineError) {
        toast.add({ title: "Could not save component", type: "error" });
      }
    } catch {
      toast.add({ title: "Could not save component", type: "error" });
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <FieldGroup>
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="component-name">Name</FieldLabel>
          <Input
            aria-invalid={!!errors.name}
            autoComplete="off"
            id="component-name"
            {...register("name")}
          />
          <FieldError errors={[errors.name]} />
        </Field>
        <Field data-invalid={!!errors.manufacturer}>
          <FieldLabel htmlFor="component-manufacturer">Manufacturer</FieldLabel>
          <Input
            aria-invalid={!!errors.manufacturer}
            autoComplete="off"
            id="component-manufacturer"
            {...register("manufacturer")}
          />
          <FieldError errors={[errors.manufacturer]} />
        </Field>
        <Field data-invalid={!!errors.quantity}>
          <FieldLabel htmlFor="component-quantity">Quantity</FieldLabel>
          <Input
            aria-invalid={!!errors.quantity}
            id="component-quantity"
            inputMode="numeric"
            step={1}
            type="number"
            {...register("quantity", { valueAsNumber: true })}
          />
          <FieldError errors={[errors.quantity]} />
        </Field>
        <Field data-invalid={!!errors.description}>
          <FieldLabel htmlFor="component-description">Description</FieldLabel>
          <Textarea
            aria-invalid={!!errors.description}
            id="component-description"
            rows={3}
            {...register("description")}
          />
          <FieldError errors={[errors.description]} />
        </Field>
      </FieldGroup>
      <DialogFooter className="mt-6">
        <DialogClose render={<Button type="button" variant="outline" />}>
          Cancel
        </DialogClose>
        <Button disabled={isPending} type="submit">
          Save
        </Button>
      </DialogFooter>
    </form>
  );
};

export const ComponentDialog = ({
  component,
  onOpenChange,
  open,
}: ComponentDialogProps) => {
  const copy = COPY[component ? "edit" : "create"];

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{copy.title}</DialogTitle>
          <DialogDescription>{copy.description}</DialogDescription>
        </DialogHeader>
        <ComponentForm
          component={component}
          onDone={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
