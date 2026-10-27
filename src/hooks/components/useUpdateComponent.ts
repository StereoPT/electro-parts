import { UpdateComponent } from "@/actions/components/UpdateComponent";
import { toast } from "@/components/ui/toast";
import { KEYS } from "@/constants/queryKeys";
import type { editComponentSchemaType } from "@/schemas/componentSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateComponent = (componentId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: editComponentSchemaType) => {
      return UpdateComponent(componentId, data);
    },
    onSuccess: (result) => {
      if (result.success) {
        toast.add({ title: "Component updated", type: "success" });
        return queryClient.invalidateQueries({ queryKey: KEYS.components });
      }
    },
    onError: () => {
      toast.add({ title: "Could not update component", type: "error" });
    },
  });
};
