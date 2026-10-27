import { GetComponent } from "@/actions/components/GetComponent";
import { GetComponents } from "@/actions/components/GetComponents";
import { KEYS } from "@/constants/queryKeys";
import { queryOptions } from "@tanstack/react-query";

export const getComponentsOptions = () => {
  return queryOptions({
    queryFn: () => GetComponents(),
    queryKey: KEYS.components,
    throwOnError: true,
  });
};

export const getComponentOptions = (componentId: string) => {
  return queryOptions({
    queryFn: () => GetComponent(componentId),
    queryKey: KEYS.component(componentId),
    throwOnError: true,
  });
};
