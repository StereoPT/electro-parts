import { ComponentsTable } from "@/components/components/ComponentsTable";
import { PageHeader } from "@/components/layout/PageHeader";

const ComponentsPage = () => {
  return (
    <>
      <PageHeader title="Components" />
      <div className="flex flex-1 flex-col p-4">
        <ComponentsTable />
      </div>
    </>
  );
};

export default ComponentsPage;
