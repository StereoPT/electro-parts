import { DeleteComponent } from "@/actions/components/DeleteComponent";
import { KEYS } from "@/constants/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteComponent = (componentId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return DeleteComponent(componentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.components });
    },
  });
};
