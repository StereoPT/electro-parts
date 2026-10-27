import { Spinner } from "@/components/ui/spinner";

export const LoadingState = () => {
  return (
    <div className="flex justify-center">
      <Spinner className="text-primary size-12" />
    </div>
  );
};
