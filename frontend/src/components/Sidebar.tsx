import { BadgeHelp, Gauge, House, MonitorCog, Shield } from "lucide-react";
import { cloneElement, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReadyState } from "react-use-websocket";
import { Contexts } from "../services/Contexts";

const noprofile = require("../assets/image/noprofile.jpg");

export const Sidebar = () => {
  const { state } = useContext(Contexts);
  const navigate = useNavigate();
  const [transparent, setTransparent] = useState(false);

  const menu = useMemo(
    () => [
      {
        name: "Inicio",
        icon: <House  size={24} />,
        notificaciones: 0,
        path: "/home",
      },
      {
        name: "Estadisticas",
        icon: <Gauge  size={24} />,
        notificaciones: 0,
        path: "/dashboard",
      },
      state.auth.user.roles && state.auth.user.roles.includes("staff")
        ? {
            name: "Administración",
            icon: <Shield  size={24} />,
            notificaciones: 0,
            path: "/admin",
          }
        : null,
      {
        name: "Ajustes",
        icon: <MonitorCog size={24} />,
        notificaciones: 2,
        path: "/settings",
      },
      {
        name: "Ayuda",
        icon: <BadgeHelp  size={24} />,
        notificaciones: 0,
        path: "/help",
      },
    ],
    [state.auth.user]
  );

  const getReadyState = () => {
    const readyStateColors = {
      [ReadyState.CONNECTING]: "#FBBF24", // to hex: #FBBF24,
      [ReadyState.OPEN]: "#34D399", // to hex: #34D399
      [ReadyState.CLOSING]: "#F87171", // to hex: #F87171
      [ReadyState.CLOSED]: "#F87171", // to hex: #F87171
    };

    return (
      readyStateColors[state.ws.readyState as keyof typeof readyStateColors] ||
      "#F87171"
    );
  };

  useEffect(() => {
    setTransparent(localStorage.getItem("transparent") === "true");
  }, []);

  return (
    <div
      className={`sidebar w-24 px-5 md:flex flex-col justify-between bg-base hidden ${
        transparent ? "bg-transparent" : "bg-base"
      }`}
    >
      {/* <button className=" relative text-white text-sm w-full bg-primary-blue py-2 rounded-xl duration-300 mb-3 ">
        <BiPlusCircle
          className="text-center text-white inline-block"
          size={30}
        />
      </button> */}
      <div></div>

      <div className="w-full h-auto">
        {menu.map((menuitem, index) =>
          !menuitem ? (
            <></>
          ) : (
            <button
              key={index}
              onClick={() => navigate(menuitem.path)}
              className={`group relative duration-300 ${window.location.pathname === menuitem.path ? "bg-secondary" : "bg-transparent"} transition-all  text-sm w-full hover:bg-gradient-to-br hover:from-secondary hover:to-primary shadow-sm shadow-slate-950/10 p-4 rounded-xl my-3`}
            >
              {cloneElement(menuitem.icon, {
                className:
                  "text-light text-center group-hover:text-primary-blue duration-300",
              })}
              {menuitem.notificaciones > 0 && (
                <span className="absolute top-[-.5em] right-[-.2em] text-xs text-white bg-primary px-2 py-.5 rounded-md inline-block duration-300">
                  {menuitem.notificaciones}
                </span>
              )}
              <span className=" absolute z-20 px-5 py-2 left-[5em] top-2 bg-slate-900/20  backdrop-blur-sm text-white   font-semibold text-xs rounded-md invisible group-hover:visible duration-200 transition-all ease-linear">
                {menuitem.name}
              </span>
            </button>
          )
        )}
      </div>

      <div className="group relative text-sm w-full  h-13  duration-100 border-1 place-items-center py-2">
        {/* <button className="bg-red-600 text-white w-10 h-10 hover:bg-red-800 duration-300 rounded-full text-center absolute ">
          <LogOut className="inline size-5" />
        </button> */}
        <img
          src={noprofile}
          alt="profile"
          onClick={() => navigate("/profile")}
          className="text-center text-zinc-300 inline group-hover:text-slate-100 duration-300 rounded-full cursor-pointer "
        />

        <span
          className={`block absolute top-0 right-[-2px] text-xs text-white rounded-xl duration-300 w-3 h-3`}
          style={{ backgroundColor: getReadyState() }}
        ></span>
      </div>
    </div>
  );
};
