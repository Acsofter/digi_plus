import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Sidebar } from "../components/Sidebar";

export const General = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-screen h-screen flex dark:bg-[#2b2e58]">
      <div>
        <div className="w-2/5 h-1/5  blur-3xl  bg-amber-300/5 z-0 absolute top-1/2 left-1/2 animate-pulse" />
        <div className="size-96 blur-3xl  bg-violet-400/20 z-0 rounded-full absolute top-1/3 animate-pulse" />
        <div className="size-96 blur-3xl  bg-blue-400/20 z-0 rounded-full absolute top-1/5" />
        <div className="size-96 blur-3xl  bg-green-400/10 z-0 rounded-full absolute top-2/4 right-20 animate-pulse" />
        <div className="w-1/2 h-2/5 blur-3xl  bg-red-400/5 z-0  absolute top-1/5 right-20 animate-pulse" />
        <div className="size-96 blur-3xl  bg-pink-500/10 z-0 rounded-full absolute top-1/3 right-20 animate-pulse" />
      </div>
      {["/login", "/register"].includes(window.location.pathname) ? (
        <>{children}</>
      ) : (
        <>
          <Sidebar />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            {children}
          </motion.div>
        </>
      )}
    </div>
  );
};
