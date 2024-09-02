import axios from "axios";
import { Ban, Eye, Trash2, UserRoundPlus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { IoSearchOutline } from "react-icons/io5";
import { AuthHeader } from "../services/auth.header";
import { Contexts } from "../services/Contexts";
import { useUserServices } from "../services/user.services";
import { FormPayment } from "./Form.payment";
import { DatePicker } from "./DatePicker";

export const AdmPayments = () => {
  const { get_payments, get_users } = useUserServices();
  const { state, dispatch } = useContext(Contexts);
  const [filter, setFilter] = useState<{
    user: User;
    users: User[];
    week: number;
  }>({
    user: {} as User,
    users: [],
    week: 0,
  });

  const [payments, setPayments] = useState<ResponsePayments>({
    count: 0,
    pages: 0,
    next: null,
    current: null,
    previous: null,
    results: [],
  });

  const printPayment = () => {
    console.log(payments.results);
    return payments.results;
  };

  const get_badge = (status: string) => {
    switch (status) {
      case "3":
        return (
          <span className=" bg-red-100 text-red-500  px-2 py-1 text-xs rounded-md font-semibold dark:bg-red-600/20">
            Rechazado
          </span>
        );
      case "2":
        return (
          <span className=" bg-green-100 text-green-500  px-2 py-1 text-xs rounded-md font-semibold dark:bg-green-600/20">
            Aceptado
          </span>
        );

      default:
        return (
          <span className=" bg-amber-100 text-amber-500  px-2 py-1 text-xs rounded-md font-semibold dark:bg-amber-600/20">
            Pendiente
          </span>
        );
    }
  };

  const handlerPagination = React.useCallback(async (url: string | null) => {
    if (!url) return;
    try {
      const response = await axios.get<ResponsePayments>(url, {
        headers: AuthHeader(),
      });
      setPayments(response.data);
    } catch (error) {
      console.error(`Error fetching tickets: ${error}`);
    }
  }, []);

  useEffect(() => {
    const fetchPayments = async () => {
      const response = await get_payments();
      if (response) setPayments(response);
    };

    const fetchUsers = async () => {
      const response = await get_users({ includeAdmins: false });
      if (response) setFilter({ ...filter, users: response });
    };

    if (payments.count === 0) fetchPayments();

    if (filter.users.length === 0) fetchUsers();

    const lastMessage = state.ws.lastMessage;
    if (!lastMessage) return;
    switch (lastMessage.type) {
      case "ticket_added":
      case "ticket_updated":
        fetchPayments();
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.ws.lastMessage]);

  const handleDateChange = (startDate: Date, endDate: Date) => {
    console.log("Semana seleccionada:", startDate, "-", endDate);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-5 ">
        <div className="inline-flex gap-3">
          <div className="relative ">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <IoSearchOutline className="inline-block text-md text-zinc-500 dark:text-white" />
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 ps-10 h-full text-sm  text-gray-800 shadow-sm border rounded-lg w-80 bg-white focus:ring-secondary focus:border-primary-blring-secondary   dark:placeholder-gray-400  dark:focus:ring-secondary dark:focus:border-primary-blring-secondary dark:text-white dark:bg-slate-800 dark:border-slate-700 dark:focus:outline-slate-500"
              placeholder="Buscar..."
            />
          </div>
          <div className="dark:bg-slate-800 p-2 rounded-lg border dark:border-slate-700 border-slate-400 text-sm">
            <label htmlFor="toggleUsers" className="p-1">
              <UserRoundPlus className="inline" size={20} />
            </label>
            <select
              className="bg-slate-800 h-full outline-none"
              name="users"
              id="toggleUsers"
            >
              <option value="all">Todos</option>
              {filter.users.length > 0 &&
                filter.users.map((user) => (
                  <option value={user.id || "all"} className="capitalize">
                    {user.username}
                  </option>
                ))}
            </select>
          </div>

          <DatePicker onChange={handleDateChange} />

          <button className="bg-blue-600 border border-blue-500 text-sm hover:inset-1 text-white px-5  rounded-md ">
            Buscar
          </button>
        </div>

        <div className="inline-flex gap-3">
          <button
            className="bg-gradient-to-tr from-blue-500/70 to-blue-700/90 border border-blue-600 shadow-sm shadow-blue-700 hover:inset-1 text-white px-5 p-2 rounded-xl "
            onClick={printPayment}
          >
            Exportar
          </button>
          <button
            className="bg-gradient-to-tr from-violet-500/70 to-violet-700/90 border border-violet-600 shadow-sm shadow-violet-700 text-white px-3 rounded-xl"
            onClick={printPayment}
          >
            Generar pagos
          </button>
        </div>
      </div>
      <div className="border rounded-xl shadow-sm bg-white/5 dark:border-none">
        <table className="w-full text-sm text-left rtl:text-right text-gray-600 border-collapse">
          <thead className="text-xs text-gray-700 uppercase bg-zinc-50 dark:bg-transparent sticky top-0 w-full dark:text-white">
            <tr>
              <th scope="col" className="p-4 "></th>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Usuario
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Descripcion
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="">
            {payments &&
              payments.results.map((payment, index) => (
                <tr className="bg-[#FEFEFE] dark:bg-slate-800/5 border-b dark:border-white/5 hover:bg-blue-50 hover:dark:bg-slate-800/20 dark:text-white/70 ">
                  <td className="w-4 p-4"></td>

                  <th
                    scope="row"
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-white  whitespace-nowrap "
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{payment.amount}</td>
                  <td className="px-6 py-4">
                    {payment.ticket?.collaborator &&
                      payment.ticket.collaborator.username}
                  </td>
                  <td className="px-6 py-4">{get_badge(payment.status)}</td>
                  <td className="px-6 py-4">{payment.ticket?.description}</td>

                  <td className="px-6 py-4">
                    {new Date(payment.created_at).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <Eye
                      className="text-xl inline-block text-secondary cursor-pointer w-4"
                      onClick={() =>
                        dispatch({
                          type: "SET_POPUP",
                          payload: {
                            isOpen: true,
                            title: "Pagos",
                            subtitle: "Editar",
                            content: <FormPayment payment_id={payment.id} />,
                          },
                        })
                      }
                    />
                    <Ban className="text-xl inline-block text- cursor-pointer ml-2 w-4" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {
          <div className=" p-3 text-primary/60 text-sm bg-white sticky bottom-0  inline-flex w-full dark:text-white/50 dark:bg-transparent ">
            <span className="   rounded-l-md  ">
              Mostrando{" "}
              {payments.current &&
                `${
                  payments.current && (payments.current - 1) * 10 + 1
                } - ${Math.min(payments.current * 10, payments.count)} de ${
                  payments.count
                }`}
            </span>

            <div className="inline-flex px-2 ">
              <button
                className="text-primary/60 hover:text-primary/80 w-5"
                onClick={() => handlerPagination(payments.previous)}
              >
                <GrFormPrevious size={16} />
              </button>

              <button
                className=" text-primary/60 hover:text-primary/80  w-5"
                onClick={() => handlerPagination(payments.next)}
              >
                <GrFormNext size={16} />
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  );
};
