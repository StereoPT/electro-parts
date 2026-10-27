import { getComponentsOptions } from "@/lib/queryOptions/components";
import { useQuery } from "@tanstack/react-query";

export const useComponents = () => {
  return useQuery(getComponentsOptions());
};
