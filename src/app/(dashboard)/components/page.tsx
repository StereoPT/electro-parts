import { Components } from "@/components/components/Components";
import { AddComponentDialog } from "@/components/components/dialogs/AddComponentDialog";
import { PageHeader } from "@/components/layout/PageHeader";
import { getComponentsOptions } from "@/lib/queryOptions/components";
import {
  dehydrate,
  HydrationBoundary,
  noop,
  QueryClient,
} from "@tanstack/react-query";

export const dynamic = "force-dynamic";

const ComponentsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.query(getComponentsOptions()).catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageHeader actions={<AddComponentDialog />} title="Components" />
      <div className="flex flex-1 flex-col p-4">
        <Components />
      </div>
    </HydrationBoundary>
  );
};

export default ComponentsPage;
