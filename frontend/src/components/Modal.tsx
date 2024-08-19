import React, { useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { Contexts } from "../services/Contexts";
import { motion } from "framer-motion";

export const Modal = () => {
  const { state, dispatch } = useContext(Contexts);

  if (!state.popup.isOpen) return <></>;

  const handleClickOutside = (event: any) => {
    if (event.target.id === "modal-wrapper") {
      dispatch({
        type: "SET_POPUP",
        payload: {
          isOpen: false,
          loading: true,
          title: "",
          subtitle: "",
          content: undefined,
        },
      });
    }
  };

  window.addEventListener("click", handleClickOutside);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      id="modal-wrapper"
      className={`modal-wrapper absolute z-10 bg-gray-500/10 rounded-xl backdrop-blur-sm w-full h-full flex place-items-center justify-center ${
        state.popup.isOpen ? "visible" : "invisible"
      }`}
    >
      <div className="modal bg-white p-8 h-auto w-1/2 rounded-xl">
        <div className="flex justify-between">
          <h2 className="font-semibold text-2xl">
            {state.popup.title} /{" "}
            {state.popup.subtitle && (
              <span className="text-xl font-semibold text-zinc-400">
                {state.popup.subtitle}
              </span>
            )}
          </h2>
          <button
            className="text-slate-500 text-lg py-1 px-3 rounded-md  hover:bg-slate-100"
            onClick={() =>
              dispatch({
                type: "SET_POPUP",
                payload: {
                  isOpen: false,
                  loading: true,
                  title: "",
                  subtitle: "",
                  content: undefined,
                },
              })
            }
          >
            <RxCross2 />
          </button>
        </div>
        <hr className="my-4" />

        {state.popup.content}
      </div>
    </motion.div>
  );
};
