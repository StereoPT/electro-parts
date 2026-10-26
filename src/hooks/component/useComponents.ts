import { useQuery } from "@tanstack/react-query";
import { listComponents } from "@/actions/component/listComponents";
import { queryKeys } from "@/constants/queryKeys";

export const useComponents = () =>
  useQuery({ queryFn: () => listComponents(), queryKey: queryKeys.components });
