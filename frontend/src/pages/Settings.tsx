import { motion } from "framer-motion";
import React, { useContext, useEffect } from "react";
import { CiImageOff } from "react-icons/ci";
import { FcAddImage, FcRemoveImage } from "react-icons/fc";
import { Modal } from "../components/Modal";
import { General } from "../layouts/General";
import { Contexts } from "../services/Contexts";
import { useUserServices } from "../services/user.services";
const no_profile = require("../assets/image/default.png");
const dark_theme = require("../assets/image/dark-theme.png");
const light_theme = require("../assets/image/light-theme.png");
const default_theme = require("../assets/image/default-theme.png");



export const Settings = () => {
  const { get_company_details, update_company } = useUserServices();
  const { state, dispatch } = useContext(Contexts);

  const [form, setForm] = React.useState({
    name: "",
    logo: "",
    theme: "default",
    address: "",
    phone: "",
    email: "",
    created_at: "",
    updated_at: "",
    color: "#006dfa",
    transparent: false,
    colaborator_percentage: "",
    company_percentage: "",
  });

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // const response = await update_company(form);
    // if (response) setForm(response);
  }

  useEffect(() => {
    const fetchCompany = async () => {
      const response = await get_company_details();
      if (response) setForm({ ...form, ...response });
    };
    fetchCompany();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.company]);

  return (
    <General>
      <div className="relative w-full h-full ">
        <Modal />
        <div className="p-5">
          <h2 className="font-semibold text-xl">Ajustes</h2>
          <hr className="my-4" />
          <div className="bg-[#fefefe] text-sm p-4 rounded-md h-full">
            <div className="w-full h-20 max-h-20 ">
              <div className="w-1/3 inline-block">
                <span className="font-semibold w-full block">Company Logo</span>
                <span> Actualiza el logo de la compañia</span>
              </div>

              <div className="w-1/3 inline-block">
                {form.logo ? (
                  <img src={form.logo} alt="logo de la empresa.jpg" />
                ) : (
                  <CiImageOff size={90} className="inline text-slate-500" />
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

            <hr className="my-4 border-slate-200/40" />
            <div className="w-full inline-flex ">
              <div className="w-1/3 inline-block">
                <span className="font-semibold w-full block">Detalles</span>
                <span>Actualiza las informaciones de la empresa</span>
              </div>

              <motion.div
                className="bg-white p-5 rounded-lg grid grid-cols-3 gap-2 w-full mx-auto"
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
                    className="w-full  py-0.5 rounded-sm focus:outline-none focus:ring-2 focus:ring-none"
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
                    className="w-full  py-0.5 rounded-sm focus:outline-none focus:ring-2 focus:ring-none"
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
                    className="w-full  py-0.5 rounded-sm focus:outline-none focus:ring-2 focus:ring-none"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-0.5">
                    Porcentaje Colaborador:
                  </label>
                  <input
                    type="text"
                    name="colaborator_percentage"
                    value={form.colaborator_percentage}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        colaborator_percentage: e.target.value,
                      })
                    }
                    className="w-full  py-0.5 rounded-sm focus:outline-none focus:ring-2 focus:ring-none"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-0.5">
                    Porcentaje Empresa:
                  </label>
                  <input
                    type="text"
                    name="company_percentage"
                    value={form.company_percentage}
                    onChange={(e) =>
                      setForm({ ...form, company_percentage: e.target.value })
                    }
                    className="w-full  py-0.5 rounded-sm focus:outline-none focus:ring-2 focus:ring-none"
                  />
                </div>
              </motion.div>
            </div>
            <hr className="my-4 border-slate-200/40" />
            <div className="w-full  h-auto inline-flex  ">
              <div className="w-1/3 inline-block">
                <span className="font-semibold w-full block">
                  Seleccione un color
                </span>
                <span>Ajusta un color principal para tu aplicación</span>
              </div>

              <div className=" flex-col w-1/3">
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
                    />
                  </span>
                  <label htmlFor="color" className="font-semibold rounded-md">
                    <div
                      className="w-7 h-7 rounded-full cursor-pointer outline outline-slate-300  "
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

            <hr className="my-4 border-slate-200/40" />
            <div className="w-full h-auto inline-flex ">
              <div className="w-1/3 inline-block">
                <span className="font-semibold w-full block">
                  Seleccione un tema
                </span>
                <span>Puedes elegir una tema para tu aplicacion</span>
              </div>
              <div className="w-2/3 inline-flex gap-2">
                <div
                  className={`py-4 px-7 border ${
                    form.theme === "default"
                      ? "border-secondary"
                      : "border-slate-200"
                  } rounded-md max-w-60 cursor-pointer hover:border-secondary duration-300 text-slate-400`}
                  onClick={() => setForm({ ...form, theme: "default" })}
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
                    form.theme === "light"
                      ? "border-secondary"
                      : "border-slate-200"
                  } rounded-md max-w-60 cursor-pointer hover:border-secondary duration-300 text-slate-400`}
                  onClick={() => setForm({ ...form, theme: "light" })}
                >
                  <img src={light_theme} alt="" className="h-32" />
                  <p className="font-semibold py-1">Tema claro</p>
                  <span>El tema original para tu aplicacion. </span>
                </div>

                <div
                  className={`py-4 px-7 border ${
                    form.theme === "dark"
                      ? "border-secondary"
                      : "border-slate-200"
                  } rounded-md max-w-60 cursor-pointer hover:border-secondary duration-300 text-slate-400`}
                  onClick={() => setForm({ ...form, theme: "dark" })}
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

            <hr className="my-4 border-slate-200/40" />
            <div className="w-full h-16 inline-flex ">
              <div className="w-1/3 inline-block">
                <span className="font-semibold w-full block">
                  Barra de navegacion transparente
                </span>
                <span>Cambia la barra de navegacion transparente</span>
              </div>
              <div className="w-1/3 inline-flex">
                <label className="flex cursor-pointer select-none items-center">
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
              <button className="bg-secondary hover:bg-secondary/80 text-white px-5 p-2 rounded-md " onClick={handleSubmit}>
                Guardar
              </button>
              <button className=" border border-slate-500 text-slate-500 px-5 p-2 rounded-md ">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </General>
  );
};
