import { AddComponentButton } from "@/components/components/AddComponentButton";
import { ComponentsTable } from "@/components/components/ComponentsTable";
import { PageHeader } from "@/components/layout/PageHeader";

const ComponentsPage = () => {
  return (
    <>
      <PageHeader actions={<AddComponentButton />} title="Components" />
      <div className="flex flex-1 flex-col p-4">
        <ComponentsTable />
      </div>
    </>
  );
};

export default ComponentsPage;
