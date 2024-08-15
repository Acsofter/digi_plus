import React, { useEffect } from "react";
import { useUserServices } from "../services/user.services";
import { MdAttachMoney, MdOutlineAttachMoney } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { FaBullseye } from "react-icons/fa";
import { format } from "path";
import { BsCreditCard2Front } from "react-icons/bs";
import { FcMoneyTransfer } from "react-icons/fc";
import { motion } from "framer-motion";

export const Table = () => {
  const { get_tickets } = useUserServices();
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
          transition={{ duration: 0.2*(index) }}
          key={ticket.id}>
            {/*  */}
            <td className="w-4 p-4 bg-white rounded-l-lg">
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
                <BsCreditCard2Front className="inline-block mx-1 text-primary" size={16}/>
              )}{" "}
              {ticket.payment.type}
            </td>

            <td className=" py-3 gap-2 bg-white w-34">
              <div className="grid sm:grid-cols-2 items-center justify-center gap-3">
                <div
                  className={`p-2 max-w-10 rounded-full hidden sm:block justify-self-end`}
                  style={{ backgroundColor: ticket.colaborator.color }}
                >
                  <FiUser className="text-white" size={20}/>
                </div>
                <p className="text-left font-bold">
                  {ticket.colaborator.username}

                  <span className=" block text-xs text-gray-400 font-normal">usuario</span>
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
                  <FaBullseye className="text-white" size={20}/>
                </div>
                <p className="text-left font-bold">
                  {ticket.payment.status === "1"
                    ? "Pendiente"
                    : ticket.payment.status === "2"
                    ? "Aprobado"
                    : "Cancelado"}

                  <span className=" block text-xs text-gray-400 font-light">default</span>
                </p>
              </div>
            </td>
            <td className=" bg-white  rounded-r-lg">
              <button className="btn btn-ghost btn-xs">Ver</button>
            </td>
          </motion.tr>
        ))}
      </>
    );
  };

  useEffect(() => {
    const fetchTickets = async () => {
      const ticketsApprovedResponse = await get_tickets({ status: "2" });
      const ticketsPendingResponse = await get_tickets({ status: "1" });
      const ticketsRejectedResponse = await get_tickets({ status: "3" });

      ticketsApprovedResponse &&
        setResponseTicketsApproved(ticketsApprovedResponse);
      ticketsPendingResponse &&
        setResponseTicketsPending(ticketsPendingResponse);
      ticketsRejectedResponse &&
        setResponseTicketsRejected(ticketsRejectedResponse);
    };
    fetchTickets();
  }, []);
  return (
    <div className="w-full h-full overflow-scroll bg-zinc-100 p-3 rounded-xl no-scrollbar ">
      <table className="table w-full border-separate border-spacing-y-1 text-xs lg:text-sm text-center  space-y-2 h-1/2 ">
        <thead className=" text-xs text-gray-700 uppercase sticky top-0">
          <tr>
            <th className="p-4 bg-white rounded-l-lg">
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
  );
};
