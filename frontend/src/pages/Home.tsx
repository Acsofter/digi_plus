import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { Modal } from "../components/Modal";
import { Table } from "../components/Table";
import { General } from "../layouts/General";
import { Contexts } from "../services/Contexts";
import { useUserServices } from "../services/user.services";
import { VscPercentage } from "react-icons/vsc";
import { MdOutlineAttachMoney } from "react-icons/md";
// import { BsCurrencyDollar } from "react-icons/fi";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoTicketOutline } from "react-icons/io5";
import AnimatedCounter from "../components/AnimatedCounter";

const videobg = require("../assets/video/bg6.mp4");
interface DataInterface {
  tickets: number;
  gross: number;
  net: number;
}

export const Home = () => {
  const { get_metrics } = useUserServices();
  const { state } = React.useContext(Contexts);
  

  const [data, setData] = React.useState<{
    today: DataInterface;
    week: DataInterface;
    month: DataInterface;
    year: DataInterface;
  }>({
    today: {
      tickets: 0,
      gross: 0,
      net: 0,
    },
    week: {
      tickets: 0,
      gross: 0,
      net: 0,
    },
    month: {
      tickets: 0,
      gross: 0,
      net: 0,
    },
    year: {
      tickets: 0,
      gross: 0,
      net: 0,
    },
  });

  const cards = [
    {
      name: "Tickets",
      count: data.week.tickets,
      color: "bg-primary-blue",
      shadow: `shadow-primary-blue/50`,
      icon: <IoTicketOutline size={24} />,
    },
    {
      name: "Bruto",
      count: data.week.gross,
      color: "bg-primary/90",
      shadow: `shadow-primary/50`,
      icon: <MdOutlineAttachMoney size={24} />,
    },
    {
      name: "Porc.",
      count: data.week.net,
      color: "bg-slate-700",
      shadow: `shadow-slate-700/40`,
      icon: <VscPercentage size={24} />,
    },
  ];

  const fetchMetrics = async () => {
    const response = await get_metrics();
    if (response) {
      setData((prev) => ({
        ...prev,
        ...response,
      }));
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, [state.popup.isOpen]);

  useEffect(() => {
    const msg = state.ws.lastMessage;
    if (!msg) return;

    switch (msg.type) {
      case "ticket_added":
        (msg.user.id === state.auth.user.id ||
          state.auth.user.roles.includes("staff")) &&
          fetchMetrics();
        break;
      case "ticket_deleted":
        (msg.user.id === state.auth.user.id ||
          state.auth.user.roles.includes("staff")) &&
          fetchMetrics();
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.ws.lastMessage]);

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
            <div className="cards w-full  flex justify-between my-2 ">
              <Table />
            </div>
          </div>
        </div>
      </General>
    </>
  );
};
