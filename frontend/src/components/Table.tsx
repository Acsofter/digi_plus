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
import { MdAttachMoney } from "react-icons/md";
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

  const format_tickets = ({
    title,
    response,
  }: {
    title: string;
    response: ResponseTickets;
  }) => {
    return (
      <>
        <tr>
          <td className="text-left text-zinc-400 text-xs " colSpan={3}>
            {title} ({response?.count})
          </td>
        </tr>
        {response?.results.map((ticket, index) => (
          <motion.tr
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 * index }}
            className={"h-20"}
            key={ticket.id}
          >
            <td className="w-4  p-2 md:p-4 bg-white rounded-l-lg">
              <div className="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  className="w-4 h-4 text-primary-blue  rounded focus:ring-primary-blue dark:focus:ring-primary-blue dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2  "
                />
                <label htmlFor="checkbox-table-search-1" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>

            {/*  */}
            <td className=" py-3 w-20  bg-white">
              {index + 1} <br />
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
                  style={{ backgroundColor: ticket.colaborator.color }}
                >
                  <FiUser className="text-white" size={20} />
                </div>
                <p className="text-left font-bold">
                  {ticket.colaborator.username}

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
                  <FcCancel className="inline mx-0.5" size={20} />
                  <FcMediumPriority className="inline mx-0.5" size={20} />
                </>
              )}
            </td>
          </motion.tr>
        ))}
      </>
    );
  };

  const fetchTickets = async () => {
    const ticketsApprovedResponse = await get_tickets({ status: "2" });
    const ticketsPendingResponse = await get_tickets({ status: "1" });
    const ticketsRejectedResponse = await get_tickets({ status: "3" });

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
      case "ticket_updated":
      case "ticket_deleted":
        (msg.user.id === state.auth.user.id ||
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
      <div className="flex justify-end items-center w-full py-2">
        <button
          className="px-5 py-2 rounded-lg bg-primary text-white"
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
                    className="w-4 h-4 rounded-xl text-primary-blue bg-gray-100 border-gray-300 focus:ring-primary-blue dark:focus:ring-primary-blue dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2  "
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
