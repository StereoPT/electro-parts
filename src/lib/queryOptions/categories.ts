import { GetCategories } from "@/actions/categories/GetCategories";
import { KEYS } from "@/constants/queryKeys";
import { queryOptions } from "@tanstack/react-query";

export const getCategoriesOptions = () => {
  return queryOptions({
    queryFn: () => GetCategories(),
    queryKey: KEYS.categories,
    throwOnError: true,
  });
};
