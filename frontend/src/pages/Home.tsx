import { Modal } from "../components/Modal";
import { Table } from "../components/Table";
import { General } from "../layouts/General";
// import { BsCurrencyDollar } from "react-icons/fi";
import { MetricsHome } from "../components/MetricsHome";

export const Home = () => {
  return (
    <>
      <General>
        <div className="relative flex h-full w-full  ">
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              position: "relative",
            }}
            className="relative banner bg-cover h-full w-72 rounded-2xl "
          >
            <video
              className="h-full w-full rounded-2xl object-center object-cover  max-w-xs transition duration-300 ease-in-out hover:scale-105 delay-500"
              loop={true}
              autoPlay={true}
              muted={true}
            >
              <source src={videobg} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div> */}
          <Modal />
          <div className="content w-full flex flex-col gap-3 rounded-2xl overflow-hidden bg-[#fefefe] p-2 m-3">
            <MetricsHome />
            <Table />
          </div>
        </div>
      </General>
    </>
  );
};
