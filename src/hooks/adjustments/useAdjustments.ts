import { getAdjustmentsOptions } from "@/lib/queryOptions/adjustments";
import { useQuery } from "@tanstack/react-query";

export const useAdjustments = () => {
  return useQuery(getAdjustmentsOptions());
};
