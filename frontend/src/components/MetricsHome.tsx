import React, { useCallback, useEffect } from "react";
import { useUserServices } from "../services/user.services";
import { Contexts } from "../services/Contexts";
import { IoTicketOutline } from "react-icons/io5";
import {
  MdOutlineAttachMoney,
  MdOutlineCancel,
  MdPendingActions,
} from "react-icons/md";
import { VscPercentage } from "react-icons/vsc";
import AnimatedCounter from "./AnimatedCounter";

interface DataInterface {
  tickets: { approved: number; total: number };
  gross: { approved: number; total: number };
  net: { approved: number; total: number };
  cancelled: { approved: number; total: number };
  pending: { approved: number; total: number };
}

export const MetricsHome = () => {
  const { get_metrics } = useUserServices();
  const { state, dispatch } = React.useContext(Contexts);
  const [data, setData] = React.useState<{
    today: DataInterface;
    week: DataInterface;
    month: DataInterface;
    year: DataInterface;
  }>({
    today: {
      tickets: { approved: 0, total: 0 },
      gross: { approved: 0, total: 0 },
      net: { approved: 0, total: 0 },
      cancelled: { approved: 0, total: 0 },
      pending: { approved: 0, total: 0 },
    },
    week: {
      tickets: { approved: 0, total: 0 },
      gross: { approved: 0, total: 0 },
      net: { approved: 0, total: 0 },
      cancelled: { approved: 0, total: 0 },
      pending: { approved: 0, total: 0 },
    },
    month: {
      tickets: { approved: 0, total: 0 },
      gross: { approved: 0, total: 0 },
      net: { approved: 0, total: 0 },
      cancelled: { approved: 0, total: 0 },
      pending: { approved: 0, total: 0 },
    },
    year: {
      tickets: { approved: 0, total: 0 },
      gross: { approved: 0, total: 0 },
      net: { approved: 0, total: 0 },
      cancelled: { approved: 0, total: 0 },
      pending: { approved: 0, total: 0 },
    },
  });

  const cards = [
    {
      name: "Tickets",
      total: data.week.tickets.total,
      approved: data.week.tickets.approved,
      color: "text-amber-400",
      icon: (
        <IoTicketOutline
          size={35}
          className="text-amber-400 inline text-center w-full"
        />
      ),
    },
    {
      name: "Bruto",
      total: data.week.gross.total,
      approved: data.week.gross.approved,
      pending: data.week.pending,
      cancelled: data.week.cancelled,
      color: "text-secondary",
      icon: (
        <MdOutlineAttachMoney
          size={35}
          className="text-secondary inline text-center w-full"
        />
      ),
    },
    {
      name: "Porc.",
      total: data.week.net.total,
      approved: data.week.net.approved,
      color: "text-violet-500",
      icon: (
        <VscPercentage
          size={35}
          className="text-violet-500 inline text-center w-full"
        />
      ),
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
      case "ticket_deleted":
        (msg.user.id === state.auth.user.id ||
          state.auth.user.roles.includes("staff")) &&
          fetchMetrics();
        break;
      case "ticket_updated":
        if (msg.user.username === state.auth.user.username) {
          fetchMetrics();
        } else if (
          msg.payload.collaborator &&
          msg.payload.collaborator.username === state.auth.user.username
        ) {
          fetchMetrics();
        }

        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.ws.lastMessage]);

  return (
    <div className="inline-flex gap-3 lg:h-1/4">
      <div className="w-full md:w-1/3 bg-light shadow-md shadow-slate-200 border border-slate-100 rounded-lg p-3 text-zinc-500">
        <h2 className="text-lg font-bold my-2">Tickets del dia</h2>
        <div className="grid grid-cols-2 gap-1">
          <div className="flex gap-1 items-center">
            <IoTicketOutline className={`inline ${cards[0].color}`} size={20} />{" "}
            <span>Tickets</span>
          </div>
          <span className="text-end font-bold">
            <AnimatedCounter to={data.today.tickets.approved} />
          </span>
          <div className="flex gap-1 items-center">
            <MdOutlineAttachMoney
              className={`inline ${cards[1].color}`}
              size={20}
            />{" "}
            <span>Bruto</span>
          </div>
          <span className="text-end font-bold">
            $ <AnimatedCounter to={data.today.gross.approved} format />
          </span>

          <div className="flex gap-1 items-center">
            <VscPercentage className={`inline ${cards[2].color}`} size={20} />{" "}
            <span>Porc.</span>
          </div>
          <span className="text-end font-bold">
            $ <AnimatedCounter to={data.today.net.approved} />
          </span>
          {/* ---- */}

          <div className="flex gap-1 items-center">
            <MdPendingActions
              className={`inline ${"text-orange-500"}`}
              size={20}
            />
            <span>Pend.</span>
          </div>
          <span className="text-end font-bold">
            <AnimatedCounter to={data.today.pending.total} />
          </span>
          <div className="flex gap-1 items-center">
            <MdOutlineCancel className={`inline ${"text-red-400"}`} size={20} />{" "}
            <span>Cancel.</span>
          </div>
          <span className="text-end font-bold">
            <AnimatedCounter to={data.today.cancelled.total} />
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 w-full md:w-2/3 gap-1 h-full">
        {cards.map((card, index) => (
          <div className={` rounded-lg`} key={index}>
            <div
              className={`flex flex-row gap-1 items-center justify-between p-3 rounded-lg bg-gradient-to-tr from-base to-slate-800  shadow-lg text-white font-bold h-full`}
            >
              <div className="flex flex-col items-center content-center justify-center gap-1 w-1/2">
                <span className=" w-1/2">{card.icon}</span>
                <span>
                  <p className="text-sm lg:text-xl">{card.name}</p>
                </span>
              </div>
              <div className="relative size-full md:size-40">
                <svg
                  className="size-full -rotate-90 hidden lg:block"
                  viewBox="0 0 36 36"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-current text-white hidden md:block"
                    stroke-width="2"
                  ></circle>
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className={`stroke-current ${card.color} hidden md:block`}
                    stroke-width="3"
                    stroke-dasharray="100"
                    stroke-dashoffset="16"
                    stroke-linecap="round"
                  ></circle>
                </svg>

                <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2 text-center">
                  <span
                    className={`block text-center text-xl md:text-2xl font-bold ${card.color} `}
                  >
                    <AnimatedCounter to={card.approved} />
                  </span>
                  <span
                    className={`text-center text-xl md:text-lg font-bold text-zinc-300 animate-pulse`}
                  >
                    <AnimatedCounter to={ card.total - card.approved } />
                  </span>{" "}
                 
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
