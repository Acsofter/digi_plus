import { motion } from "framer-motion";
import React, { useContext, useEffect } from "react";
import { CiImageOff } from "react-icons/ci";
import { FcAddImage, FcRemoveImage } from "react-icons/fc";
import { Modal } from "../components/Modal";
import { General } from "../layouts/General";
import { Contexts } from "../services/Contexts";
import { useUserServices } from "../services/user.services";
import { useNavigate } from "react-router-dom";
const dark_theme = require("../assets/image/dark-theme.png");
const light_theme = require("../assets/image/light-theme.png");
const default_theme = require("../assets/image/default-theme.png");

export const Settings = () => {
  const { get_company_details, update_company } = useUserServices();
  const { state, dispatch } = useContext(Contexts);
  const navigate = useNavigate();

  const [form, setForm] = React.useState<UpdateCompany>({
    name: "",
    logo: "",
    darkMode: localStorage.getItem("darkMode") || "default",
    address: "",
    phone: "",
    email: "",
    created_at: "",
    updated_at: "",
    color: localStorage.getItem("color") || "#006dfa",
    transparent: localStorage.getItem("transparent") === "true" || false,
    collaborator_percentage: "",
  });

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    form.darkMode === "default"
      ? localStorage.removeItem("darkMode")
      : localStorage.setItem("darkMode", form.darkMode);
    localStorage.setItem("color", form.color);
    localStorage.setItem("transparent", form.transparent.toString());
    navigate(0);

    const response = await update_company(form);
    if (response) {
      dispatch({ type: "SET_COMPANY", payload: response });
    }
  };

  useEffect(() => {
    const fetchCompany = async () => {
      const response = await get_company_details();
      if (response) setForm({ ...form, ...response });
      dispatch({ type: "SET_COMPANY", payload: response });
    };
    fetchCompany();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="relative w-full h-screen overflow-scroll no-scrollbar p-5">
        <Modal />
        <div className="text-slate-400 dark:text-white">
          <h2 className="font-semibold text-xl">Ajustes</h2>
          <hr className="my-4 dark:border-white/20" />
          <div className="bg-[#fefefe]/50 dark:bg-white/5  text-sm p-4 rounded-md h-full w-full">
            <div className="w-full grid grid-cols-3 gap-2">
              <div className=" inline-block">
                <span className="font-semibold w-full block">Company Logo</span>
                <span> Actualiza el logo de la compañia</span>
              </div>

              <div className=" col-span-2">
                {form.logo ? (
                  <img src={form.logo} alt="logo de la empresa.jpg" />
                ) : (
                  <div className="w-32 h-32 bg-[url('./assets/image/placeholder.svg')] bg-no-repeat bg-center inline-block rounded-full" />
                )}
                {form.logo ? (
                  <FcRemoveImage
                    className="inline"
                    size={30}
                    onClick={() => setForm({ ...form, logo: "" })}
                  />
                ) : (
                  <div className="inline">
                    <input
                      id="logo"
                      type="file"
                      name="logo"
                      className="hidden"
                      alt="logo de la empresa"
                    />

                    <label htmlFor="logo" className="inline">
                      <FcAddImage className="inline" size={30} />
                    </label>
                  </div>
                )}
              </div>

              <div className="w-1/3 inline-block"></div>
            </div>

            <hr className="my-2 border-slate-200/5" />
            <div className="w-full grid grid-cols-3 ">
              <div>
                <span className="font-semibold w-full block">Detalles</span>
                <span>Actualiza las informaciones de la empresa</span>
              </div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-3 w-full mx-auto col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                // onSubmit={handleSubmit}
              >
                <div>
                  <label className="font-semibold block mb-0.5">Nombre:</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full dark:bg-white/5 py-0.5 bg-transparent rounded-sm outline-none ring-none border-b border-slate-200 dark:border-white/10 focus:border-b-2 focus:border-slate-300 duration-300"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-0.5">
                    Dirección:
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    className="w-full dark:bg-white/5 py-0.5 bg-transparent rounded-sm outline-none ring-none border-b border-slate-200 dark:border-white/10 focus:border-b-2 focus:border-slate-300 duration-300"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-0.5">
                    Teléfono:
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full dark:bg-white/5 py-0.5 bg-transparent rounded-sm outline-none ring-none border-b border-slate-200 dark:border-white/10 focus:border-b-2 focus:border-slate-300 duration-300"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-0.5">
                    Porcentaje Colaborador:
                  </label>
                  <input
                    type="text"
                    name="collaborator_percentage"
                    value={form.collaborator_percentage}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        collaborator_percentage: e.target.value,
                      })
                    }
                    className="w-full dark:bg-white/5 py-0.5 bg-transparent rounded-sm outline-none ring-none border-b border-slate-200 dark:border-white/10 focus:border-b-2 focus:border-slate-300 duration-300"
                  />
                </div>
              </motion.div>
            </div>
            <hr className="my-2 border-slate-200/5" />
            <div className="w-full  grid grid-cols-3 col-span-2">
              <div>
                <span className="font-semibold  block">
                  Seleccione un color
                </span>
                <span>Ajusta un color principal para tu aplicación</span>
              </div>

              <div className=" col-span-2">
                <div className=" inline-flex justify-between h-auto max-h-20 place-items-center gap-2">
                  <span className="h-7 w-7 bg-secondary rounded-full"></span>
                  <span className="h-7 w-7 bg-primary rounded-full"></span>
                  <span className="h-7 w-7 bg-slate-400 rounded-full"></span>
                  <span className="h-7 w-7 bg-green-500 rounded-full"></span>
                  <span className="h-7 w-7 bg--pink rounded-full"></span>
                  <span className="h-7 w-7 bg-primary-pink rounded-full"></span>
                </div>
                <div className="inline-flex  gap-2 place-items-center w-full">
                  <span className=" text-sm text-slate-600">
                    Color personalizado{" "}
                    <input
                      type="text"
                      className="w-20 shadow-sm border border-slate-100 rounded-md px-2 font-bold"
                      value={form.color}
                      onChange={(e) =>
                        setForm({ ...form, color: e.target.value })
                      }
                    />
                  </span>
                  <label htmlFor="color" className="font-semibold rounded-md">
                    <div
                      className="w-7 h-7 rounded-full cursor-pointer outline-none   "
                      style={{ backgroundColor: form.color }}
                    ></div>
                  </label>
                  <input
                    type="color"
                    name=""
                    id="color"
                    className="invisible"
                    onChange={(e) =>
                      setForm({ ...form, color: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <hr className="my-2 border-slate-200/5" />
            <div className="w-full grid grid-cols-3 ">
              <div className="inline-block">
                <span className="font-semibold w-full block">
                  Seleccione un tema
                </span>
                <span>Puedes elegir una tema para tu aplicacion</span>
              </div>
              <div className=" flex flex-wrap col-span-2 gap-2">
                <div
                  className={`py-4 px-7 border ${
                    form.darkMode === "default"
                      ? "border-secondary dark:border-white/50"
                      : "border-slate-200 dark:border-white/10"
                  } rounded-md max-w-60 cursor-pointer hover:border-secondary dark:hover:border-white/50 duration-300 `}
                  onClick={() => setForm({ ...form, darkMode: "default" })}
                >
                  <img src={default_theme} alt="" className="h-32" />
                  <p className="font-semibold py-1">Tema por defecto</p>
                  <span>
                    Este es el tema que se aplica dependiendo de tu sistema
                    operativo.
                  </span>
                </div>

                <div
                  className={`py-4 px-7 border ${
                    form.darkMode === "false"
                      ? "border-secondary dark:border-white/50"
                      : "border-slate-200 dark:border-white/10"
                  } rounded-md max-w-60 cursor-pointer hover:border-secondary dark:hover:border-white/50 duration-300 text-slate-400 dark:text-white`}
                  onClick={() => setForm({ ...form, darkMode: "false" })}
                >
                  <img src={light_theme} alt="" className="h-32" />
                  <p className="font-semibold py-1">Tema claro</p>
                  <span>El tema original para tu aplicacion. </span>
                </div>

                <div
                  className={`py-4 px-7 border ${
                    form.darkMode === "true"
                      ? "border-secondary dark:border-white/50"
                      : "border-slate-200 dark:border-white/10"
                  } rounded-md max-w-60 cursor-pointer hover:border-secondary dark:hover:border-white/50 duration-300 text-slate-400 dark:text-white`}
                  onClick={() => setForm({ ...form, darkMode: "true" })}
                >
                  <img src={dark_theme} alt="" className="h-32" />
                  <p className="font-semibold py-1">Tema oscuro</p>
                  <span>
                    Esta es la variante del tema claro para tu aplicacion que
                    puedes personalizar a tu antojo.{" "}
                  </span>
                </div>
              </div>
            </div>

            <hr className="my-2 border-slate-200/5" />
            <div className="w-full grid grid-cols-3   ">
              <div>
                <span className="font-semibold w-full block">
                  Barra de navegacion transparente
                </span>
                <span>Cambia la barra de navegacion transparente</span>
              </div>
              <div className="col-span-2">
                <label className="flex cursor-pointer select-none place-items-center md:place-content-start place-content-center h-full">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={form.transparent}
                      onChange={() =>
                        setForm({ ...form, transparent: !form.transparent })
                      }
                      className="sr-only"
                    />
                    <div
                      className={`block h-6 w-10 rounded-full ${
                        form.transparent ? "bg-primary" : "bg-slate-300"
                      }`}
                    ></div>
                    <div
                      className={`absolute  top-1 h-4 w-4 rounded-full bg-white transition left-1 ${
                        form.transparent && "translate-x-full "
                      }`}
                    ></div>
                  </div>
                </label>
              </div>
            </div>
            <div className="w-full py-5 inline-flex justify-end gap-2">
              <button
                className="bg-secondary hover:bg-secondary/80 text-white px-5 p-2 rounded-md "
                onClick={handleSubmit}
              >
                Guardar
              </button>
              <button className=" border border-slate-500 text-slate-500 px-5 p-2 rounded-md ">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
