import React, { useCallback, useEffect } from "react";
import { useUserServices } from "../services/user.services";
import { Contexts } from "../services/Contexts";
import { IoTicketOutline } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";
import { VscPercentage } from "react-icons/vsc";
import AnimatedCounter from "./AnimatedCounter";

interface DataInterface {
  tickets: number;
  gross: number;
  net: number;
}

export const MetricsHome = () => {
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
      color: "text-amber-400",
      icon: <IoTicketOutline size={24} />,
    },
    {
      name: "Bruto",
      count: data.week.gross,
      color: "text-secondary",
      icon: <MdOutlineAttachMoney size={24} />,
    },
    {
      name: "Porc.",
      count: data.week.net,
      color: "text-violet-500",
      icon: <VscPercentage size={24} />,
    },
  ];

  const fetchMetrics = useCallback(async () => {
    const response = await get_metrics();
    if (response) {
      setData((prev) => ({
        ...prev,
        ...response,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

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
    <div className="inline-flex gap-3">
      <div className="w-1/3 bg-light shadow-md shadow-slate-200 border border-slate-100 rounded-lg p-3 text-zinc-500">
        <h2 className="text-lg font-bold">Tickets del dia</h2>
        <div className="grid grid-cols-2 gap-1">
          <span>
            <IoTicketOutline className={`inline ${cards[0].color}`} size={20} />{" "}
            Tickets
          </span>
          <span className="text-end">
            {" "}
            <AnimatedCounter  to={data.today.tickets} />{" "}
          </span>
          <span>
            {" "}
            <MdOutlineAttachMoney
              className={`inline ${cards[1].color}`}
              size={20}
            />
            Bruto
          </span> 
          <span className="text-end">
            <AnimatedCounter  to={data.today.gross} />
          </span>
          <span>
            {" "}
            <VscPercentage
              className={`inline ${cards[2].color}`}
              size={20}
            />{" "}
            Neto
          </span>
          <span className="text-end">
            <AnimatedCounter  to={data.today.net} />
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 w-2/3 gap-1">
        {cards.map((card, index) => (
          <div className={` rounded-lg`} key={index}>
            <div
              className={`flex items-center justify-between p-3 rounded-lg bg-gradient-to-tr from-base to-slate-800  shadow-lg text-white font-bold`}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{card.icon}</span>
                <span>
                  <p className="text-xl">{card.name}</p>
                </span>
              </div>
              <div className="relative size-40">
                <svg
                  className="size-full -rotate-90"
                  viewBox="0 0 36 36"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-current text-white "
                    stroke-width="2"
                  ></circle>
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className={`stroke-current ${card.color}`}
                    stroke-width="3"
                    stroke-dasharray="100"
                    stroke-dashoffset="16"
                    stroke-linecap="round"
                  ></circle>
                </svg>

                <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                  <span
                    className={`text-center text-2xl font-bold ${card.color} `}
                  >
                    <AnimatedCounter  to={card.count} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
