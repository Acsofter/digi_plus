import axios from "axios";
import { format } from "date-fns";

import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { BsCreditCard2Front } from "react-icons/bs";
import { FaBullseye } from "react-icons/fa";
import {
  FcCancel,
  FcDeleteRow,
  FcMediumPriority,
  FcMoneyTransfer,
  FcOk,
  FcViewDetails,
} from "react-icons/fc";
import { FiUser } from "react-icons/fi";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { MdAttachMoney, MdDateRange } from "react-icons/md";
import { AuthHeader } from "../services/auth.header";
import { Contexts } from "../services/Contexts";
import { useUserServices } from "../services/user.services";
import { FormTicket } from "./Form.ticket";

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
        <tr>
          <td className="text-left text-zinc-400 text-xs " colSpan={7}>
            {response.current &&
              `${title}. Mostrando ${
                response.current && (response.current - 1) * 5 + 1
              } - ${Math.min(response.current * 5, response.count)} de ${
                response.count
              }`}
            <div className="inline-flex gap-1 ">
              <button
                className="text-primary/60 hover:text-primary/80 "
                onClick={() => handlerPagination(response.previous, type)}
              >
                <GrFormPrevious size={16} />
              </button>

              <button
                className=" text-primary/60 hover:text-primary/80"
                onClick={() => handlerPagination(response.next, type)}
              >
                <GrFormNext size={16} />
              </button>
            </div>
          </td>
        </tr>
        {response?.results.map((ticket, index) => (
          <motion.tr
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 * index }}
            className={"h-16"}
            key={ticket.id}
          >
            <td className="w-4  p-2 md:p-4 bg-white rounded-l-lg">
              <div className="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  className="w-4 h-4 text-primary-blue  rounded focus:ring-primary-blue focus:ring-primary-blue ring-offset-gray-800 focus:ring-offset-gray-800 focus:ring-2  "
                />
                <label htmlFor="checkbox-table-search-1" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>

            {/*  */}
            <td className=" py-3 w-20  bg-white">
              {response.current && (response.current - 1) * 5 + index + 1}{" "}
              <br />
              <span></span>
            </td>
            <td className=" py-3  bg-white">
              <div className="grid sm:grid-cols-2 items-center justify-center max-full gap-3">
                <div
                  className={`p-2 max-w-10 rounded-full bg-amber-300 hidden sm:table-cell justify-self-end`}
                >
                  <MdAttachMoney className="text-white" size={20} />
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

            <td className=" py-5 bg-white hidden md:table-cell">
              {ticket.payment.type === "Efectivo" ? (
                <FcMoneyTransfer className="inline-block mx-1" size={16} />
              ) : (
                <BsCreditCard2Front
                  className="inline-block mx-1 text-primary"
                  size={16}
                />
              )}{" "}
              {ticket.payment.type}
            </td>

            <td className=" py-3 gap-2 bg-white w-34">
              <div className="grid sm:grid-cols-2 items-center justify-center gap-3">
                <div
                  className={`p-2 max-w-10 rounded-full hidden sm:block justify-self-end`}
                  style={{ backgroundColor: ticket.collaborator.color }}
                >
                  <FiUser className="text-white" size={20} />
                </div>
                <p className="text-left font-bold">
                  {ticket.collaborator.username}

                  <span className=" block text-xs text-gray-400 font-normal">
                    usuario
                  </span>
                </p>
              </div>
            </td>

            <td className=" py-5 bg-white">
              {new Date(ticket.created_at).toLocaleString()}
            </td>
            <td className=" py-3 gap-2  bg-white w-34">
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
                  <FaBullseye className="text-white" size={20} />
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
            <td className=" bg-white  rounded-r-lg">
              {state.auth.user?.roles.includes("user") ? (
                <>
                  <FcViewDetails
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
                  <FcDeleteRow
                    size={20}
                    className="inline mx-0.5 cursor-pointer"
                    onClick={() => {}}
                  />
                </>
              ) : (
                <>
                  <FcOk
                    className="inline mx-0.5"
                    size={20}
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
                  />
                  <FcCancel
                    className="inline mx-0.5"
                    size={20}
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
                  />
                  <FcMediumPriority
                    className="inline mx-0.5"
                    size={20}
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
                  />
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
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <MdDateRange className="text-gray-400" />
          </div>
          <input
            id="default-datepicker"
            type="date"
            className=" text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 bg-zinc-100 border border-zinc-200 placeholder-gray-400 "
            placeholder="desde"
            value={rangeDate.start}
            onChange={(e) => {
              setRangeDate({ ...rangeDate, start: e.target.value });
            }}
          />
        </div>
        <div className="relative max-w-sm">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <MdDateRange className="text-gray-400 " />
          </div>
          <input
            id="default-datepicker"
            type="date"
            className=" text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 bg-zinc-100 border border-zinc-200 placeholder-gray-400 "
            placeholder="hasta"
            value={rangeDate.end}
            onChange={(e) => {
              setRangeDate({ ...rangeDate, end: e.target.value });
            }}
          />
        </div>

        <button
          className="px-5 py-2 rounded-lg text-sm border border-green-500 text-green-500"
          onClick={fetchTickets}
        >
          Buscar
        </button>
        <button
          className="px-5 py-2 rounded-lg text-sm border border-violet-500 text-violet-500"
          onClick={() => {}}
        >
          Imprimir
        </button>
        <button
          className="px-5 py-2 rounded-lg text-sm bg-gradient-to-tr border border-blue-500 from-blue-600 to-blue-400 text-white s"
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
      </div>

      <div className="w-full h-full overflow-scroll bg-zinc-100 p-3 rounded-xl no-scrollbar ">
        <table className="table w-full border-separate border-spacing-y-1 text-xs lg:text-sm text-center  space-y-2 h-1/2 ">
          <thead className=" text-xs text-gray-700 uppercase sticky top-0">
            <tr>
              <th className="p-2 md:p-4 bg-white rounded-l-lg">
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
              <th className=" max-w-5 py-5 bg-white ">ID</th>
              <th className=" py-5 bg-white">Monto</th>
              <th className=" py-5 bg-white hidden md:block">Tipo</th>
              <th className=" py-5 bg-white">Usuario</th>
              <th className=" py-5 bg-white">Fecha</th>
              <th className=" py-5 bg-white">Estado</th>
              <th className=" py-5 bg-white rounded-r-lg">Acciones</th>
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
