import { GetAdjustments } from "@/actions/adjustments/GetAdjustments";
import { KEYS } from "@/constants/queryKeys";
import { queryOptions } from "@tanstack/react-query";

export const getAdjustmentsOptions = () => {
  return queryOptions({
    queryFn: () => GetAdjustments(),
    queryKey: KEYS.adjustments,
    throwOnError: true,
  });
};
