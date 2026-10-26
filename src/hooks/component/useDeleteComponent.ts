import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComponent } from "@/actions/component/deleteComponent";
import { queryKeys } from "@/constants/queryKeys";

export const useDeleteComponent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteComponent(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.components }),
  });
};
