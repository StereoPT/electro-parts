import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComponent } from "@/actions/component/createComponent";
import { queryKeys } from "@/constants/queryKeys";

export const useCreateComponent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComponent,
    onSuccess: (result) => {
      if (result.success) {
        return queryClient.invalidateQueries({
          queryKey: queryKeys.components,
        });
      }
    },
  });
};
