import { UpdateComponent } from "@/actions/components/UpdateComponent";
import { KEYS } from "@/constants/queryKeys";
import type { editComponentSchemaType } from "@/schemas/componentSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateComponent = (componentId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: editComponentSchemaType) => {
      return UpdateComponent(componentId, data);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: KEYS.components });
    },
  });
};
