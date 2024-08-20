import React, { useEffect } from "react";
import {
  IoAlertCircle,
  IoCheckmarkCircleSharp,
  IoHelpCircleOutline,
} from "react-icons/io5";
import { useUserServices } from "../services/user.services";
import { Contexts } from "../services/Contexts";
import { motion } from "framer-motion";

export const FormTicket = ({ ticket_id }: { ticket_id?: number }) => {
  const { create_ticket, get_ticket, update_ticket, get_categories } =
    useUserServices();
  const [categories, setCategories] = React.useState<Category[]>([]);
  const { state, dispatch } = React.useContext(Contexts);
  const [form, setForm] = React.useState<Ticket>({
    id: 0,
    category: {} as Category,
    description: "",
    colaborator: {} as User,
    payment: {} as Payment,
    created_at: "",
    updated_at: "",
    company: 0,
  });

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let response: Ticket | false;
    if (ticket_id) {
      response = await update_ticket({
        details: {
          id: form.id,
          category: form.category.id,
          payment: {
            amount: parseInt(form.payment.amount),
          },
          description: form.description,
        },
      });

      if (response) {
        setForm(response);
      }
    } else {
      response = await create_ticket({
        category: form.category.id,
        payment: {
          amount: parseInt(form.payment.amount),
        },
        description: form.description,
      });

      if (response)
        setForm({
          id: 0,
          category: {} as Category,
          description: "",
          colaborator: {} as User,
          payment: {} as Payment,
          created_at: "",
          updated_at: "",
          company: 0,
        });
    }
    //  dispatch({ type: "SET_POPUP", payload: { open: false } });
  };

  const get_badge = (status: string) => {
    let color = "";
    let text = "";
    if (status === "1") {
      color = "from-amber-500 to-amber-300 border-amber-300 text-white";
      text = "Pendiente";
    } else if (status === "2") {
      color = "from-[#43C6AC] to-[#F8FFAE] border-[#43C6AC] text-white";
      text = "Aprobado";
    } else if (status === "3") {
      color = "from-[#FF7E5F] to-[#FEB47B] border-[#FF7E5F] text-white";
      text = "Rechazado";
    }
    return (
      <div
        className={`peer transition-all duration-200 w-1/3 h-6 border rounded-md inline-flex justify-between items-center py-5 px-3 shadow-md bg-gradient-to-tr hover:brightness-95  ${color}`}
      >
        <div>
          {!form.payment ? (
            <IoAlertCircle
              className={`peer-focus:cursor-pointer w-4 inline-block mr-2 `}
            />
          ) : (
            <IoCheckmarkCircleSharp
              className={`peer-focus:cursor-pointer w-4 inline-block mr-2 `}
            />
          )}
          <span className="text-sm">{text}</span>
        </div>
        <IoHelpCircleOutline className="w-4 h-4" />
      </div>
    );
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await get_categories();
      if (response) setCategories(response);
    };

    const fetchTicket = async () => {
      if (!ticket_id) return;
      const response = await get_ticket({ id: ticket_id });
      if (response) {
        setForm(response);
        dispatch({ type: "SET_POPUP", payload: { loading: false } });
      }
    };

    fetchTicket();
    fetchCategories();

    // TODO: detach
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticket_id]);

  return state.popup.loading ? (
    <div className="text-center text-slate-800">
      <div role="status" className="my-3">
        <svg
          aria-hidden="true"
          className="inline w-8 h-8 text-gray-100 animate-spin dark:text-white fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>

        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
    <motion.form
      className="w-full flex flex-col gap-5"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.1 }}
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm text-base pb-1">Total $</label>
          <input
            autoFocus={true}
            value={form.payment.amount ? form.payment.amount : NaN}
            onChange={(e) =>
              e.target.value &&
              setForm({
                ...form,
                payment: {
                  ...form.payment,
                  amount: e.target.value,
                },
              })
            }
            className="w-full px-2 text-sm py-6 h-5 border rounded-md focus:outline-none focus:ring-1 focus:ring-slate-200 peer transition-all duration-200"
            type="number"
            name="quantity"
            id="quantity"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-base pb-1">Categoria</label>
          <select
            defaultValue={"default"}
            value={form.category.id ? form.category.id : "default"}
            onChange={(e) =>
              e.target.value !== "default" &&
              setForm({
                ...form,
                category:
                  categories[
                    categories.findIndex(
                      (item) => item.id === parseInt(e.target.value)
                    )
                  ],
              })
            }
            className="w-full px-2 text-sm text-primary h-full  border rounded-md focus:outline-none focus:ring-1 focus:ring-slate-200 peer transition-all duration-200"
            name="category"
            id=""
          >
            <option value="default">Otros</option>
            {categories.map((item, index) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        
      </div>

      <div className="grid">
        <div className="flex flex-col">
          <label className="text-sm text-base pb-1">Comentario</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="no-scrollbar w-full px-2 text-sm py-3 min-h-20 border rounded-md focus:outline-none focus:ring-1 focus:ring-slate-200 peer  duration-50 max-h-72"
            name="comment"
            id="comment"
          />
        </div>
      </div>

      {ticket_id && get_badge(form.payment.status)}

      {ticket_id && (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col text-sm">
            <label className="text-sm text-base ">Creador por</label>
            <div className="w-full m ">
              <span>{form.colaborator.username}</span> ({" "}
              <span className="text-base">{form.colaborator.email}</span> )
            </div>
          </div>
          <div className="flex flex-col  text-sm place-items-end">
            <label className=" text-base pb-1">Fecha</label>
            <span>
              {new Date(form.updated_at).toLocaleDateString()},{" "}
              {new Date(form.updated_at).toLocaleTimeString()}
            </span>
          </div>
        </div>
      )}

      <button className="bg-primary hover:bg-primary/80 text-white px-5 p-2 rounded-md ">
        {ticket_id ? "Actualizar" : "Añadir"}
      </button>
    </motion.form>
  );
};
