import { GetCategories } from "@/actions/categories/GetCategories";
import { GetCategory } from "@/actions/categories/GetCategory";
import { KEYS } from "@/constants/queryKeys";
import { queryOptions } from "@tanstack/react-query";

export const getCategoriesOptions = () => {
  return queryOptions({
    queryFn: () => GetCategories(),
    queryKey: KEYS.categories,
    throwOnError: true,
  });
};

export const getCategoryOptions = (categoryId: string) => {
  return queryOptions({
    queryFn: () => GetCategory(categoryId),
    queryKey: KEYS.category(categoryId),
    throwOnError: true,
  });
};
