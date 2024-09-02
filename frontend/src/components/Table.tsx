import axios from "axios";
import { format } from "date-fns";

import { motion } from "framer-motion";
import React, { useEffect } from "react";
import {
  FcCancel,
  FcDeleteRow,
  FcMediumPriority,
  FcMoneyTransfer,
  FcOk,
  FcViewDetails,
} from "react-icons/fc";
import { AuthHeader } from "../services/auth.header";
import { Contexts } from "../services/Contexts";
import { useUserServices } from "../services/user.services";
import { FormTicket } from "./Form.ticket";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  CircleDashed,
  CircleFadingPlus,
  CircleX,
  CreditCard,
  DollarSign,
  ListCollapse,
  UserRound,
} from "lucide-react";

export const Table = () => {
  const { get_tickets, update_ticket } = useUserServices();
  const { state, dispatch } = React.useContext(Contexts);
  const [responseTicketsApproved, setResponseTicketsApproved] =
    React.useState<ResponseTickets>();
  const [responseTicketsPending, setResponseTicketsPending] =
    React.useState<ResponseTickets>();
  const [responseTicketsRejected, setResponseTicketsRejected] =
    React.useState<ResponseTickets>();

  // const [search, setSearch] = React.useState("");
  const [rangeDate, setRangeDate] = React.useState({
    start: "",
    end: "",
  });

  const handlerPagination = React.useCallback(
    async (url: string | null, type: "approved" | "pending" | "rejected") => {
      if (!url) return;
      try {
        const response = await axios.get(url, {
          headers: AuthHeader(),
        });

        switch (type) {
          case "approved":
            setResponseTicketsApproved(response.data);
            break;
          case "pending":
            setResponseTicketsPending(response.data);
            break;
          case "rejected":
            setResponseTicketsRejected(response.data);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error(`Error fetching tickets: ${error}`);
      }
    },
    []
  );

  const format_tickets = ({
    title,
    response,
  }: {
    title: string;
    response: ResponseTickets;
  }) => {
    const type =
      title === "Tickets Rechazados"
        ? "rejected"
        : title === "Tickets Pendientes"
        ? "pending"
        : "approved";
    return (
      <>
        <tr className="text-left text-zinc-400 dark:text-slate-200 text-xs ">
          {response.current && (
            <>
              <td className="font-bold">
                {`${title.replace("Tickets ", "")}`}
              </td>

              <td className="text-center">{"Mostrando "}</td>

              <td className="w-20">
                {`${Math.min(
                  (response.current - 1) * 5 + 1,
                  response.count
                )} - ${Math.min(response.current * 5, response.count)} de ${
                  response.count
                }`}
              </td>

              <td className="text-zinc-400 text-xs">
                <div className="inline-flex gap-1">
                  <button
                    className="text-primary/60 hover:text-primary/80"
                    onClick={() => handlerPagination(response.previous, type)}
                    disabled={!response.previous}
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <button
                    className=" text-primary/60 hover:text-primary/80"
                    onClick={() => handlerPagination(response.next, type)}
                    disabled={!response.next}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </td>
            </>
          )}
        </tr>
        {response?.results.map((ticket, index) => (
          <motion.tr
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 * index }}
            className={" "}
            key={ticket.id}
          >
            <td className="w-4  p-2 md:p-4 bg-white dark:bg-slate-800/20  dark:text-white rounded-l-lg">
              <div className="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  className="w-4 h-4 ring-none dark:bg-slate-500"
                />
                <label htmlFor="checkbox-table-search-1" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>

            {/*  */}
            <td className=" py-3 w-20  bg-white dark:bg-slate-800/20  dark:text-white ">
              {response.current && (response.current - 1) * 5 + index + 1}{" "}
              <br />
              <span></span>
            </td>
            <td className=" py-3  bg-white dark:bg-slate-800/20 dark:text-white ">
              <div className="grid sm:grid-cols-2 items-center justify-center max-full gap-3">
                <div
                  className={`p-2 max-w-10 rounded-full bg-amber-300 hidden sm:table-cell justify-self-end`}
                >
                  <DollarSign className="text-white" size={20} />
                </div>
                <p className="text-left font-bold">
                  {ticket.payment.amount} <br />
                  <span className=" block text-xs text-gray-400 font-normal">
                    {parseInt(ticket.payment.amount) > 200
                      ? "Bajo"
                      : parseInt(ticket.payment.amount) < 500
                      ? "Alto"
                      : "Medio"}
                  </span>
                </p>
              </div>
            </td>

            <td className=" py-5 bg-white dark:bg-slate-800/20 dark:text-white  hidden md:table-cell">
              {ticket.payment.type === "Efectivo" ? (
                <FcMoneyTransfer className="inline-block mx-1" size={16} />
              ) : (
                <CreditCard
                  className="inline-block mx-1 text-primary"
                  size={16}
                />
              )}{" "}
              {ticket.payment.type}
            </td>

            <td className=" py-3 gap-2 bg-white dark:bg-slate-800/20 dark:text-white  w-34">
              <div className="grid sm:grid-cols-2 items-center justify-center gap-3">
                <div
                  className={`p-2 max-w-10 rounded-full hidden sm:block justify-self-end`}
                  style={{ backgroundColor: ticket.collaborator.color }}
                >
                  <UserRound className="text-white" size={20} />
                </div>
                <p className="text-left font-bold">
                  {ticket.collaborator.username}

                  <span className=" block text-xs text-gray-400 font-normal">
                    usuario
                  </span>
                </p>
              </div>
            </td>

            <td className=" py-5 bg-white dark:bg-slate-800/20 dark:text-white ">
              {new Date(ticket.created_at).toLocaleString()}
            </td>
            <td className=" py-3 gap-2  bg-white dark:bg-slate-800/20 dark:text-white  w-34">
              <div className="grid sm:grid-cols-2 items-center justify-center gap-3">
                <div
                  className={`p-2 max-w-10 rounded-full hidden sm:block justify-self-end ${
                    ticket.payment.status === "1"
                      ? "bg-violet-400"
                      : ticket.payment.status === "2"
                      ? "bg-green-400"
                      : "bg-red-400"
                  }`}
                >
                  <CircleDashed className="text-white" size={20} />
                </div>
                <p className="text-left font-bold">
                  {ticket.payment.status === "1"
                    ? "Pendiente"
                    : ticket.payment.status === "2"
                    ? "Aprobado"
                    : "Cancelado"}

                  <span className=" block text-xs text-gray-400 font-light">
                    default
                  </span>
                </p>
              </div>
            </td>
            <td className=" bg-white dark:bg-slate-800/20 dark:text-white   rounded-r-lg">
              {state.auth.user?.roles.includes("user") ? (
                <>
                  <ListCollapse
                    size={20}
                    className="inline-block mx-1 text-primary cursor-pointer"
                    onClick={() =>
                      dispatch({
                        type: "SET_POPUP",
                        payload: {
                          isOpen: true,
                          loading: true,
                          title: "Ticket",
                          subtitle: "Editar",
                          content: <FormTicket ticket_id={ticket.id} />,
                        },
                      })
                    }
                  />
                  <CircleX
                    size={20}
                    className="inline mx-0.5 cursor-pointer"
                    onClick={() => {}}
                  />
                </>
              ) : (
                <>
                  <button
                    className="inline mx-0.5 text-lg"
                    onClick={() => {
                      update_ticket({
                        details: {
                          id: ticket.id,
                          payment: {
                            status: "2",
                          },
                        },
                      });
                    }}
                  >
                    👍
                  </button>
                  <button
                    className="inline mx-0.5 text-lg"
                    onClick={() => {
                      update_ticket({
                        details: {
                          id: ticket.id,
                          payment: {
                            status: "3",
                          },
                        },
                      });
                    }}
                  >
                    👎
                  </button>
                  <button
                    className="inline mx-0.5 text-lg"
                    onClick={() => {
                      update_ticket({
                        details: {
                          id: ticket.id,
                          payment: {
                            status: "1",
                          },
                        },
                      });
                    }}
                  >
                    ⚠️
                  </button>
                </>
              )}
            </td>
          </motion.tr>
        ))}
      </>
    );
  };

  const fetchTickets = async () => {
    const rangeDateFormatted = [
      format(rangeDate.end ? rangeDate.start : new Date(), "yyyy-MM-dd"),
      format(rangeDate.start ? rangeDate.end : new Date(), "yyyy-MM-dd"),
    ];

    const ticketsApprovedResponse = await get_tickets({
      status: "2",
      range: rangeDateFormatted,
    });
    const ticketsPendingResponse = await get_tickets({
      status: "1",
      range: rangeDateFormatted,
    });
    const ticketsRejectedResponse = await get_tickets({
      status: "3",
      range: rangeDateFormatted,
    });

    ticketsApprovedResponse &&
      setResponseTicketsApproved(ticketsApprovedResponse);
    ticketsPendingResponse && setResponseTicketsPending(ticketsPendingResponse);
    ticketsRejectedResponse &&
      setResponseTicketsRejected(ticketsRejectedResponse);
  };

  useEffect(() => {
    fetchTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const msg = state.ws.lastMessage;
    if (!msg) return;

    switch (msg.type) {
      case "ticket_added":
      case "ticket_deleted":
        (msg.user.username === state.auth.user.username ||
          state.auth.user.roles.includes("staff")) &&
          fetchTickets();
        break;
      case "ticket_updated":
        ((msg.payload.collaborator &&
          msg.payload.collaborator.id === state.auth.user.id) ||
          state.auth.user.roles.includes("staff")) &&
          fetchTickets();
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.ws.lastMessage]);
  return (
    <div className="w-full flex flex-col justify-between my-2 h-2/3 ">
      <div className="flex flex-wrap justify-end items-center w-full py-2 gap-1">
        <div className="relative max-w-sm">
          <input
            id="default-datepicker"
            type="date"
            className=" text-gray-600 dark:text-gray-300 text-sm rounded-lg focus:ring-blue-500  focus:bordern-white/500 block w-full ps-10 p-2.5 bg-zinc-100 dark:bg-white/5 dark:border-white/5 border border-zinc-200   "
            placeholder="desde"
            value={rangeDate.start}
            onChange={(e) => {
              setRangeDate({ ...rangeDate, start: e.target.value });
            }}
          />
        </div>
        <div className="relative max-w-sm">
          <input
            id="default-datepicker"
            type="date"
            className=" text-gray-600 dark:text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 bg-zinc-100 dark:bg-white/5 dark:border-white/5 border border-zinc-200 placeholder-gray-400 "
            placeholder="hasta"
            value={rangeDate.end}
            onChange={(e) => {
              setRangeDate({ ...rangeDate, end: e.target.value });
            }}
          />
        </div>

        <button
          className="px-5 py-2 rounded-lg text-sm border border-green-500 text-green-500 dark:border-white/10 shadow-sm dark:bg-white/15 dark:text-white "
          onClick={fetchTickets}
        >
          Buscar
        </button>
        <button
          className="px-5 py-2 rounded-lg text-sm border border-blue-500 text-blue-500 dark:border-white/10 shadow-sm dark:bg-white/15 dark:text-white"
          onClick={() => {}}
        >
          Imprimir
        </button>
        {state.auth.user.roles.includes("user") && (
          <button
            className="px-5 py-2 rounded-lg text-sm bg-gradient-to-tr border border-blue-500 from-blue-600 to-blue-400 text-white dark:border-slate-800/15 shadow-sm dark:to-slate-800/20 dark:from-slate-800 dark:text-white"
            onClick={() =>
              dispatch({
                type: "SET_POPUP",
                payload: {
                  isOpen: true,
                  loading: false,
                  title: "Ticket",
                  subtitle: "Agregar",
                  content: <FormTicket />,
                },
              })
            }
          >
            Agregar
          </button>
        )}
      </div>

      <div className="w-full h-full overflow-scroll bg-zinc-100 dark:bg-slate-800/15 dark:border dark:border-slate-300/5 text-slate-700 p-3 rounded-xl no-scrollbar ">
        <table className="table w-full border-separate border-spacing-y-1 text-xs lg:text-sm text-center  space-y-2 h-1/2 ">
          <thead className=" text-xs text-gray-700 uppercase sticky top-0 bg-white dark:bg-slate-800/20 dark:text-white dark:border dark:border-slate-100 backdrop-blur-2xl">
            <tr>
              <th className="p-2 md:p-4 dark:text-white rounded-l-lg ">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 rounded-xl text-primary-blue bg-gray-100 border-gray-300 focus:ring-primary-blue focus:ring-primary-blue ring-offset-gray-800 focus:ring-offset-gray-800 focus:ring-2  "
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th className=" max-w-5 py-5 dark:text-white">ID</th>
              <th className=" py-5 bg-transparent dark:text-white ">Monto</th>
              <th className=" py-5 bg-transparent dark:text-white  hidden md:block">
                Tipo
              </th>
              <th className=" py-5 bg-transparent dark:text-white ">Usuario</th>
              <th className=" py-5 bg-transparent dark:text-white ">Fecha</th>
              <th className=" py-5 bg-transparent dark:text-white ">Estado</th>
              <th className=" py-5 bg-transparent dark:text-white  rounded-r-lg">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="">
            {responseTicketsPending &&
              format_tickets({
                title: "Tickets Pendientes",
                response: responseTicketsPending,
              })}
            {responseTicketsRejected &&
              format_tickets({
                title: "Tickets Rechazados",
                response: responseTicketsRejected,
              })}
            {responseTicketsApproved &&
              format_tickets({
                title: "Tickets Aprobados",
                response: responseTicketsApproved,
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
