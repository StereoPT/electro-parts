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
  children?: ReactNode;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  isPending: boolean;
  onDelete: () => Promise<void>;
};

export const DeleteDialog = ({
  title = "Are you absolutely sure?",
  description,
  children,
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
      <AlertDialogContent className="min-w-lg" finalFocus={false}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {children}
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
