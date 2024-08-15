import React, { ReactNode } from "react";
import { Sidebar } from "../components/Sidebar";

export const General = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar />

      <div className="w-full">{children}</div>
    </div>
  );
};
