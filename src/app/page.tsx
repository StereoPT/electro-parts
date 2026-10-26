import { PageHeader } from "@/components/layout/PageHeader";

const Home = () => {
  return (
    <>
      <PageHeader title="Dashboard" />
      <div className="flex flex-1 items-center justify-center">
        <h1 className="font-semibold text-3xl">Electro Parts</h1>
      </div>
    </>
  );
};

export default Home;
