import { DeleteComponent } from "@/actions/components/DeleteComponent";
import { toast } from "@/components/ui/toast";
import { KEYS } from "@/constants/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteComponent = (componentId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return DeleteComponent(componentId);
    },
    onSuccess: () => {
      toast.add({ title: "Component deleted", type: "success" });
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: KEYS.components }),
        queryClient.invalidateQueries({ queryKey: KEYS.categories }),
      ]);
    },
    onError: () => {
      toast.add({ title: "Could not delete component", type: "error" });
    },
  });
};
