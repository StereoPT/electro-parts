import { PageHeader } from "@/components/layout/PageHeader";

const Home = () => {
  return (
    <>
      <PageHeader title="Dashboard" />
      <div className="flex flex-1 items-center justify-center">
        <p className="font-semibold text-3xl">Electro Parts</p>
      </div>
    </>
  );
};

export default Home;
