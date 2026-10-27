import { AddComponent } from "@/actions/components/AddComponent";
import { KEYS } from "@/constants/queryKeys";
import type { addComponentSchemaType } from "@/schemas/componentSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddComponent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: addComponentSchemaType) => {
      return AddComponent(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.components });
    },
  });
};
