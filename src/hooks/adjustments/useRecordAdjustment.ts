import { RecordAdjustment } from "@/actions/adjustments/RecordAdjustment";
import { toast } from "@/components/ui/toast";
import { KEYS } from "@/constants/queryKeys";
import type { recordAdjustmentSchemaType } from "@/schemas/adjustmentSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRecordAdjustment = (componentId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: recordAdjustmentSchemaType) => {
      return RecordAdjustment(componentId, data);
    },
    onSuccess: (result) => {
      if (result.success) {
        toast.add({ title: "Adjustment recorded", type: "success" });
        return Promise.all([
          queryClient.invalidateQueries({ queryKey: KEYS.components }),
          queryClient.invalidateQueries({ queryKey: KEYS.adjustments }),
        ]);
      }
    },
    onError: () => {
      toast.add({ title: "Could not record adjustment", type: "error" });
    },
  });
};
