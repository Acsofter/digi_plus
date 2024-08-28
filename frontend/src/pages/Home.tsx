import { Modal } from "../components/Modal";
import { Table } from "../components/Table";
import { General } from "../layouts/General";
import { MetricsHome } from "../components/MetricsHome";

export const Home = () => {
  return (
    <>
      <>
        <div className="relative flex h-full w-full  ">
          <Modal />
          <div className="content w-full flex flex-col gap-3 rounded-2xl overflow-hidden bg-[#fefefe] p-2 m-3">
            <MetricsHome />
            <Table />
          </div>
        </div>
      </>
    </>
  );
};
