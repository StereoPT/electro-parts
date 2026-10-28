import { UpdateCategory } from "@/actions/categories/UpdateCategory";
import { toast } from "@/components/ui/toast";
import { KEYS } from "@/constants/queryKeys";
import type { editCategorySchemaType } from "@/schemas/categorySchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateCategory = (categoryId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: editCategorySchemaType) => {
      return UpdateCategory(categoryId, data);
    },
    onSuccess: (result) => {
      if (result.success) {
        toast.add({ title: "Category updated", type: "success" });
        return queryClient.invalidateQueries({ queryKey: KEYS.categories });
      }
    },
    onError: () => {
      toast.add({ title: "Could not update category", type: "error" });
    },
  });
};
