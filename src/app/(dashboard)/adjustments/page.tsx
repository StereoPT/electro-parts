import { Adjustments } from "@/components/adjustments/Adjustments";
import { PageHeader } from "@/components/layout/PageHeader";
import { getAdjustmentsOptions } from "@/lib/queryOptions/adjustments";
import {
  dehydrate,
  HydrationBoundary,
  noop,
  QueryClient,
} from "@tanstack/react-query";

export const dynamic = "force-dynamic";

const AdjustmentsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.query(getAdjustmentsOptions()).catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageHeader title="Adjustments" />
      <div className="flex flex-1 flex-col p-4">
        <Adjustments />
      </div>
    </HydrationBoundary>
  );
};

export default AdjustmentsPage;
