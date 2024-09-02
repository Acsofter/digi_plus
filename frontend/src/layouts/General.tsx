import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Sidebar } from "../components/Sidebar";

export const General = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-screen h-screen flex z-10 ">
     
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
