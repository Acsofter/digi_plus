import { motion } from "framer-motion";
import React, { useState } from "react";
import { SiContentstack } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../services/auth.services";
import { ChevronDownIcon } from "lucide-react";

export const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginForm>({ username: "", password: "" });

  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const isLoggedIn = await login(form);

      if (isLoggedIn) {
        navigate("/home");
      } else {
        toast.error("Error al iniciar sesion");
      }
    } catch (error) {
      toast.error("Error al conectar con el servidor, intentelo mas tarde");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="inline-flex w-screen h-screen p-5 place-content-center bg-gradient-to-tr from-secondary/40 to-light-50">
    //   <motion.div
    //     initial={{ translateX: -1000 }}
    //     animate={{ translateX: 0 }}
    //     transition={{ duration: 0.4 }}
    //     className="flex w-full rounded-3xl bg-base text-white max-w-[1300px] place-items-start shadow-xl shadow-black/30 place-content-center relative"
    //   >
    //     <div className="lg:w-1/2 w-full h-full">
    //       <div className="inline-flex justify-center">
    //         <SiContentstack
    //           size={75}
    //           className="text-white place-self-start m-10"
    //         />{" "}
    //       </div>
    //       <form
    //         onSubmit={formSubmited}
    //         className={`flex flex-col w-full place-items-center place-content-center h-3/5 px-16 gap-3 opacity-1 duration-500 ${
    //           position && "opacity-0 scale-50"
    //         } `}
    //       >
    //         <div className="w-full">
    //           <label className="font-semibold" htmlFor="user">
    //             Nombre de usuario
    //           </label>
    //           <input
    //             id="user"
    //             type="text"
    //             placeholder="ej; mandujar"
    //             className=" w-full bg-transparent border rounded-lg h-12 p-2 mt-2"
    //             value={form.username}
    //             onChange={(e) => setForm({ ...form, username: e.target.value })}
    //           />
    //         </div>
    //         <div className="w-full">
    //           <label className="font-semibold" htmlFor="pass">
    //             Contraseña
    //           </label>
    //           <input
    //             id="pass"
    //             type="password"
    //             placeholder="..."
    //             className=" w-full bg-transparent border rounded-lg h-12 p-2 mt-2"
    //             value={form.password}
    //             onChange={(e) => setForm({ ...form, password: e.target.value })}
    //           />
    //         </div>
    //         <div className="w-full">
    //           <input type="checkbox" />{" "}
    //           <span className="text-sm">Recuerdame</span>
    //         </div>
    //         <button
    //           type="submit"
    //           className="w-full bg-primary rounded-lg h-12 p-2 mt-8 text-white hover:bg-blue-700"
    //         >
    //           {loading ? "Cargando..." : "Iniciar sesión"}
    //         </button>
    //       </form>
    //     </div>
    //     <div
    //       // initial={{ opacity: 0, scale: 0.5 }}
    //       // animate={{ opacity: 1, scale: 1 }}
    //       // transition={{ duration: 0.4 }}
    //       className=" lg:w-1/2 w-full h-full"
    //     >
    //       <div className="inline-flex justify-center">
    //         <SiContentstack
    //           size={75}
    //           className="text-white place-self-start m-10"
    //         />{" "}
    //       </div>
    //       <form
    //         onSubmit={formSubmited}
    //         className={`flex flex-col w-full place-items-center place-content-center h-3/5 px-16 gap-3 opacity-1  duration-500 ${
    //           !position && "opacity-0 scale-50"
    //         } `}
    //       >
    //         <div className="w-full">
    //           <label className="font-semibold" htmlFor="user">
    //             Nombre de usuario
    //           </label>
    //           <input
    //             id="user"
    //             type="text"
    //             placeholder="ej; mandujar"
    //             className=" w-full bg-transparent border rounded-lg h-12 p-2 mt-2"
    //             value={form.username}
    //           />
    //         </div>
    //         <div className="w-full">
    //           <label className="font-semibold" htmlFor="pass">
    //             Contraseña
    //           </label>
    //           <input
    //             id="pass"
    //             type="password"
    //             placeholder="..."
    //             className=" w-full bg-transparent border rounded-lg h-12 p-2 mt-2"
    //             value={form.password}
    //             // onChange={(e) => setForm({ ...form, password: e.target.value })}
    //           />
    //         </div>
    //         <div className="w-full">
    //           <input type="checkbox" />{" "}
    //           <span className="text-sm">Recuerdame</span>
    //         </div>
    //         <button
    //           type="submit"
    //           className="w-full bg-primary rounded-lg h-12 p-2 mt-8 text-white hover:bg-blue-700"
    //         >
    //           {loading ? "Cargando..." : "Iniciar sesión"}
    //         </button>
    //       </form>
    //     </div>
    //     <motion.div
    //       initial={!position ? { left: 0 } : { right: 0 }}
    //       animate={{ left: position ? 0 : "", right: !position ? 0 : "" }}
    //       transition={{ duration: 0.4 }}
    //       className={`lg:flex bg-[#03328a]   w-1/2 h-full rounded-3xl p-10 hidden flex-col overflow-hidden absolute  justify-center`}
    //       onClick={() => setPosition(!position)}
    //     >
    //       {/* <div className="animate-bounce border-white/10 border rounded-lg rounded-tl-none bg-secondary backdrop-blur-sm w-auto max-w-[50%] text-sm p-5 my-3">
    //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
    //         quos illum quod porro? Mollitia saepe consectetur laborum cumque
    //         voluptatem aut!
    //       </div>
    //       <div className="animate-bounce border-white/10 border rounded-lg rounded-tr-none bg-secondary backdrop-blur-sm w-auto max-w-[50%] text-sm p-5 my-3 place-self-end">
    //         Lorem ipsum dolor sit amet.
    //       </div>
    //       <div className="animate-bounce border-white/10 border rounded-lg rounded-tl-none bg-secondary backdrop-blur-sm w-auto max-w-[50%] text-sm p-5 my-3">
    //         Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum,
    //         assumenda.
    //       </div>
    //       <div className="animate-bounce border-white/10 border rounded-lg rounded-tl-none bg-secondary backdrop-blur-sm w-auto max-w-[50%] text-sm p-5 my-3">
    //         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora
    //         veritatis repellendus assumenda voluptate. Neque, ea.
    //       </div>
    //       <div className="animate-bounce border-white/10 border rounded-lg rounded-tr-none bg-secondary backdrop-blur-sm w-auto max-w-[50%] text-sm p-5 my-3 place-self-end">
    //         Lorem, ipsum.
    //       </div>
    //       <div className="animate-bounce  border-white/10 border rounded-lg rounded-tr-none bg-secondary backdrop-blur-sm w-auto max-w-[50%] text-sm p-5 my-3 place-self-end">
    //         Lorem ipsum dolor sit amet.
    //       </div> */}
    //       <h2 className="text-6xl text-white my-2 animate">Bienvenido!</h2>
    //       <p className="text-xl">
    //         Por favor, ingrese sus credenciales para acceder a su cuenta.
    //       </p>
    //       <p className="text-xl">y sigue avanzando hacia tus objetivos.</p>
    //       <div className="size-72 rounded-full bg-amber-500 absolute top-1/2 left-1/2 -translate-x-2/2 -translate-y-2/2 filter blur-3xl opacity-60 "></div>
    //       <div className="size-80 rounded-full bg-violet-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 filter blur-3xl opacity-60"></div>
    //       <div className="size-60 rounded-full bg-green-500 absolute top-1/2 right-1/2 -translate-y-2/2 -translate-x-2/2 filter blur-3xl opacity-60 animate-pulse duration-1000"></div>
    //     </motion.div>
    //   </motion.div>
    // </div>
    <div className="min-h-screen h-screen bg-base flex items-center justify-center p-4 w-screen">
      <div className="bg-white rounded-3xl shadow-xl w-full h-full flex flex-col md:flex-row overflow-hidden">
        {/* Lado izquierdo */}
        <div className="w-full h-full lg:w-2/3 p-8 lg:p-16 hidden md:flex items-center relative ">
          <div>
            <div className="relative ">
              <div className="rounded-full bg-blue-500/15 size-72 absolute blur-xl " />
              <div className="rounded-full bg-green-500/10 size-72 absolute blur-xl -left-28 mx-1 top-16" />
              <div className="rounded-full bg-violet-500/10 size-72 absolute blur-xl left-28 -top-16" />
            </div>
            <h1 className="text-7xl font-bold mb-6">
              Bienvenido,
              <br />
              Sigue avanzando!
              <br />
            </h1>
            <p className="text-gray-600 mb-8">
              Por favor, ingrese sus credenciales para acceder a su cuenta.
            </p>
          </div>

          <div className="h-2/5 lg:h-3/5 w-1/2 bottom-0 right-0  bg-[url('./assets/image/login-img.svg')]  bg-cover absolute " />
        </div>

        {/* Lado derecho */}
        <div className="w-full h-full lg:w-1/3 p-8 lg:p-16 bg-gray-50 flex flex-col items-center justify-center">
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Usuario
              </label>
              <input
                type="text"
                id="username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full px-4 h-12 rounded-lg bg-gray-200 border  focus:bg-white focus:outline-blue-600"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 h-12  rounded-lg bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-blue-600"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Recuerdame
                </label>
              </div>
              <a href="/" className="text-sm text-blue-600 hover:underline">
                Olvidaste la contraseña?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-lg px-4 h-12 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Acceder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
