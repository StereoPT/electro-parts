import { AddCategory } from "@/actions/categories/AddCategory";
import { toast } from "@/components/ui/toast";
import { KEYS } from "@/constants/queryKeys";
import type { addCategorySchemaType } from "@/schemas/categorySchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: addCategorySchemaType) => {
      return AddCategory(data);
    },
    onSuccess: (result) => {
      if (result.success) {
        toast.add({ title: "Category added", type: "success" });
        queryClient.invalidateQueries({ queryKey: KEYS.categories });
      }
    },
    onError: () => {
      toast.add({ title: "Could not add category", type: "error" });
    },
  });
};
