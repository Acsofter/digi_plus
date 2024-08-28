import React from "react";
import { AdmPayments } from "../components/Adm.payments";
import { AdmUsers } from "../components/Adm.users";
import { General } from "../layouts/General";
import { Modal } from "../components/Modal";
export const Administration = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const tabs = [
    {
      name: "Usuarios",
      content: <AdmUsers />,
    },
    {
      name: "Pagos",
      content: <AdmPayments />,
    },
  ];

  return (
    <>
      <Modal />
      <div className="relative h-full  bg-[#f9f9f9] flex flex-col">
        <div className="flex flex-col w-full h-full p-5">
          <h2 className="font-semibold text-xl">Administracion</h2>
          <hr className="my-4" />

          {/* <!--Tabs navigation--> */}
          <div
            className="mb-2 inline-flex gap-3"
            role="tablist"
            data-twe-nav-ref
          >
            {tabs.map((tab, index) => (
              <div
                key={index}
                onClick={() => setActiveTab(index)}
                className={` inline text-center text-sm px-5 py-1 hover:bg-primary hover:text-white rounded-xl cursor-pointer duration-200 border border-primary${
                  index === activeTab ? " bg-primary text-white" : ""
                }`}
              >
                {tab.name}
              </div>
            ))}
          </div>

          {/* <!--Tabs content--> */}
          <div className=" bg-[#FEFEFE] rounded-xl h-full p-4 ">
            {tabs[activeTab].content}
          </div>
        </div>
      </div>
    </>
  );
};
