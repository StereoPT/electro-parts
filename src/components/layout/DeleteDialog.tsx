import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  useCallback,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type DeleteDialogProps = {
  title?: string;
  description: ReactNode;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  isPending: boolean;
  onDelete: () => Promise<void>;
};

export const DeleteDialog = ({
  title = "Are you absolutely sure?",
  description,
  open,
  onOpenChange,
  isPending,
  onDelete,
}: DeleteDialogProps) => {
  const handleDelete = useCallback(async () => {
    try {
      await onDelete();
    } catch {
      return;
    }
    onOpenChange(false);
  }, [onDelete, onOpenChange]);

  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent finalFocus={false}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending && <Spinner />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
