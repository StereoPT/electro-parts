import { getCategoryOptions } from "@/lib/queryOptions/categories";
import { useQuery } from "@tanstack/react-query";

export const useCategory = (categoryId: string) => {
  return useQuery(getCategoryOptions(categoryId));
};
