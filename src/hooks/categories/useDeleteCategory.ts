import { DeleteCategory } from "@/actions/categories/DeleteCategory";
import { toast } from "@/components/ui/toast";
import { KEYS } from "@/constants/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteCategory = (categoryId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return DeleteCategory(categoryId);
    },
    onSuccess: () => {
      toast.add({ title: "Category deleted", type: "success" });

      return Promise.all([
        queryClient.invalidateQueries({ queryKey: KEYS.categories }),
        queryClient.invalidateQueries({ queryKey: KEYS.components }),
      ]);
    },
    onError: () => {
      toast.add({ title: "Could not delete category", type: "error" });
    },
  });
};
