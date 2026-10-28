import { AddComponent } from "@/actions/components/AddComponent";
import { toast } from "@/components/ui/toast";
import { KEYS } from "@/constants/queryKeys";
import type { addComponentSchemaType } from "@/schemas/componentSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddComponent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: addComponentSchemaType) => {
      return AddComponent(data);
    },
    onSuccess: (result) => {
      if (result.success) {
        toast.add({ title: "Component added", type: "success" });
        return Promise.all([
          queryClient.invalidateQueries({ queryKey: KEYS.components }),
          queryClient.invalidateQueries({ queryKey: KEYS.categories }),
        ]);
      }
    },
    onError: () => {
      toast.add({ title: "Could not add component", type: "error" });
    },
  });
};
