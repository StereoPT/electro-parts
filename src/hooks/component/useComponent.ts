import { getComponentOptions } from "@/lib/queryOptions/components";
import { useQuery } from "@tanstack/react-query";

export const useComponent = (componentId: string) => {
  return useQuery(getComponentOptions(componentId));
};
