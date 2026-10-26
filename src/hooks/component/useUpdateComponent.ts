import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComponent } from "@/actions/component/updateComponent";
import { queryKeys } from "@/constants/queryKeys";
import type { ComponentFormInput } from "@/schemas/componentSchema";

type UpdateComponentVariables = {
  id: number;
  input: ComponentFormInput;
};

export const useUpdateComponent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: UpdateComponentVariables) =>
      updateComponent(id, input),
    onSuccess: (result) => {
      if (result.success) {
        return queryClient.invalidateQueries({
          queryKey: queryKeys.components,
        });
      }
    },
  });
};
