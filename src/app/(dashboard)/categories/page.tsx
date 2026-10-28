import { Categories } from "@/components/categories/Categories";
import { AddCategoryDialog } from "@/components/categories/dialogs/AddCategoryDialog";
import { PageHeader } from "@/components/layout/PageHeader";
import { getCategoriesOptions } from "@/lib/queryOptions/categories";
import {
  dehydrate,
  HydrationBoundary,
  noop,
  QueryClient,
} from "@tanstack/react-query";

export const dynamic = "force-dynamic";

const CategoriesPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.query(getCategoriesOptions()).catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageHeader actions={<AddCategoryDialog />} title="Categories" />
      <div className="flex flex-1 flex-col p-4">
        <Categories />
      </div>
    </HydrationBoundary>
  );
};

export default CategoriesPage;
