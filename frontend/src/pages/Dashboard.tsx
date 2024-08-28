// import React from "react";
// import { Bar, Doughnut } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bell, Search, ChevronDown, MoreHorizontal, Plus } from "lucide-react";
// import { General } from "../layouts/General";
// import AnimatedCounter from "../components/AnimatedCounter";
// import { Line } from "../components/Line";

// ChartJS.register(
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const DashboardCard = ({
//   title,
//   value,
//   change,
//   isPositive,
// }: {
//   title: string;
//   value: number;
//   change: number;
//   isPositive: boolean;
// }) => (
//   <div className="bg-white p-4 rounded-lg shadow">
//     <div className="flex justify-between items-center mb-2">
//       <h3 className="text-sm font-medium text-gray-500">{title}</h3>
//       <MoreHorizontal className="w-5 h-5 text-gray-400" />
//     </div>
//     <p className="text-2xl font-bold">
//       $ <AnimatedCounter to={value} />
//     </p>
//     <p className={`text-sm ${isPositive ? "text-blue-500" : "text-red-500"}`}>
//       {isPositive ? "↑ +" : "↓ -"}
//       {<AnimatedCounter to={change} />}% de la semana anterior
//     </p>
//   </div>
// );

// const TransactionItem = ({
//   icon,
//   name,
//   status,
//   date,
// }: {
//   icon: React.ReactNode;
//   name: string;
//   status: string;
//   date: string;
// }) => (
//   <div className="flex items-center justify-between py-2">
//     <div className="flex items-center">
//       <span className="mr-3">{icon}</span>
//       <div>
//         <p className="font-medium">{name}</p>
//         <p className="text-sm text-gray-500">{date}</p>
//       </div>
//     </div>
//     <span
//       className={`px-2 py-1 rounded-full text-xs ${
//         status === "Completed"
//           ? "bg-blue-100 text-blue-800"
//           : "bg-yellow-100 text-yellow-800"
//       }`}
//     >
//       {status}
//     </span>
//   </div>
// );

// export const Dashboard = () => {
//   const revenueData = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May"],
//     datasets: [
//       {
//         label: "Income",
//         data: [65, 59, 80, 81, 56],
//         backgroundColor: "#223BC9",
//       },
//       {
//         label: "Expenses",
//         data: [45, 79, 50, 41, 36],
//         backgroundColor: "#067FD0",
//       },
//     ],
//   };

//   const performanceData = {
//     labels: ["Total Count", "View Count", "Percentage", "Sales"],
//     datasets: [
//       {
//         data: [565, 385, 130, 50],
//         backgroundColor: ["#E63B60", "#067FD0", "#223BC9", "#151A7B"],
//       },
//     ],
//   };

//   return (
//     <>
//       <div className="bg-zinc-100">
//         <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="mb-4">
//             <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//             <div className="bg-blue-600 p-4 rounded-lg text-white">
//               <p className="font-medium mb-2">Actualizacion</p>
//               <h3 className="text-xl font-bold mb-2">
//                 Esta semana ha aumentado un 40% el rendimiento en los tickets
//               </h3>
//               <p className="text-sm">Estadisticas →</p>
//             </div>
//             <DashboardCard
//               title="Total Neto"
//               value={193000}
//               change={33}
//               isPositive={true}
//             />
//             <DashboardCard
//               title="Total Bruto"
//               value={32000}
//               change={24}
//               isPositive={false}
//             />
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 content-center justify-center">
//             <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow ">
//               <h3 className="text-lg font-semibold mb-4 ">Esta semana </h3>
//               <div className="inline-flex justify-center w-full h-72">
//                <Line />
//               </div>
//             </div>
//             <div className="bg-white p-4 rounded-lg shadow">
//               <h3 className="text-lg text-center font-semibold mb-4">
//                 Total View Performance
//               </h3>
//               <div className="h-72 inline-flex justify-center w-full">
//                 <Doughnut data={performanceData} />
//               </div>
//               <p className="text-center mt-4 text-2xl font-bold">565K</p>
//               <p className="text-center text-sm text-gray-500">Total Count</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <div className="lg:col-span-2 ">
//               <div className="bg-white p-4 rounded-lg shadow overflow-scroll h-56 no-scrollbar">
//                 <h3 className="text-lg font-semibold mb-4">Transaction</h3>
//                 <TransactionItem
//                   icon="👕"
//                   name="Premium T-Shirt"
//                   status="Completed"
//                   date="Jul 12th 2024"
//                 />
//                 <TransactionItem
//                   icon="🎮"
//                   name="Playstation 5"
//                   status="Pending"
//                   date="Jul 12th 2024"
//                 />
//                 <TransactionItem
//                   icon="🧥"
//                   name="Hoodie Gembong"
//                   status="Pending"
//                   date="Jul 12th 2024"
//                 />
//                 <TransactionItem
//                   icon="📱"
//                   name="iPhone 15 Pro Max"
//                   status="Completed"
//                   date="Jul 12th 2024"
//                 />
//                 <TransactionItem
//                   icon="☕"
//                   name="Latte"
//                   status="Completed"
//                   date="Jul 12th 2024"
//                 />
//               </div>
//             </div>
//             <div>
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <h3 className="text-lg font-semibold mb-4">Sales Report</h3>
//                 <div className="space-y-2">
//                   <div className="flex justify-between items-center">
//                     <span>Product Launched</span>
//                     <span className="font-semibold">233</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2.5">
//                     <div
//                       className="bg-blue-500 h-2.5 rounded-full"
//                       style={{ width: "70%" }}
//                     ></div>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span>Ongoing Product</span>
//                     <span className="font-semibold">23</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2.5">
//                     <div
//                       className="bg-yellow-500 h-2.5 rounded-full"
//                       style={{ width: "30%" }}
//                     ></div>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span>Product Sold</span>
//                     <span className="font-semibold">462</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2.5">
//                     <div
//                       className="bg-blue-500 h-2.5 rounded-full"
//                       style={{ width: "90%" }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// };

import React, { useEffect, useState } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { MoreHorizontal, Users } from "lucide-react";
import AnimatedCounter from "../components/AnimatedCounter";
import { General } from "../layouts/General";
import { Loading } from "../components/Loading";
import { useUserServices } from "../services/user.services";
import { Contexts } from "../services/Contexts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

type DashboardProps = {
  data: UserData[];
};

export function Dashboard() {
  const { state } = React.useContext(Contexts);
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [data, setData] = useState({
    lineChartData: {} as any,
    barChartData: {} as any,
    doughnutChartData: {} as any,
    mostProductiveUser: { total: 0, name: "" },
    averageTicketsPerDay: 0,
    totalTickets: 0,
  });
  const { get_graph } = useUserServices();
  const [users, setUsers] = useState<UserData[]>([
    // {
    //   label: "User 1",
    //   data: [5, 20, 0, 0, 0, 0, 0],
    //   borderColor: "hsl(0, 100%, 50%)",
    //   backgroundColor: "hsla(0, 100%, 50%, 0.5)",
    //   fill: false,
    //   tension: 0.1,
    // },
    // {
    //   label: "User 2",
    //   data: [0, 0, 40, 50, 0, 0, 0],
    //   borderColor: "hsl(120, 100%, 50%)",
    //   backgroundColor: "hsla(120, 100%, 50%, 0.5)",
    //   fill: false,
    //   tension: 0.1,
    // },
    // {
    //   label: "User 3",
    //   data: [0, 0, 0, 0, 0, 0, 0],
    //   borderColor: "hsl(240, 100%, 50%)",
    //   backgroundColor: "hsla(240, 100%, 50%, 0.5)",
    //   fill: false,
    //   tension: 0.1,
    // },
  ]);

  const DashboardCard = ({
    title,
    value,
    change,
    isPositive,
  }: {
    title: string;
    value: number;
    change: number;
    isPositive: boolean;
  }) => (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <MoreHorizontal className="w-5 h-5 text-gray-400" />
      </div>
      <p className="text-2xl font-bold">
        $ <AnimatedCounter to={value} />
      </p>
      <p className={`text-sm ${isPositive ? "text-blue-500" : "text-red-500"}`}>
        {isPositive ? "↑ +" : "↓ -"}
        {<AnimatedCounter to={change} />}% de la semana anterior
      </p>
    </div>
  );

  const fetchData = async () => {
    await get_graph({ graphname: "line" }).then((metrics) => {
      if (metrics) {
        setUsers(metrics);
        const lineChartData = {
          labels,
          datasets: metrics,
        };

        const barChartData = {
          labels,
          datasets: metrics.map((user) => ({
            ...user,
            backgroundColor: user.backgroundColor
              .replace(")", ", 0.6)")
              .replace("hsl", "hsla"),
          })),
        };

        const doughnutChartData = {
          labels: metrics.map((user) => user.label),
          datasets: [
            {
              data: metrics.map((user) => user.data.reduce((a, b) => a + b, 0)),
              backgroundColor: metrics.map((user) => user.backgroundColor),
            },
          ],
        };

        const totalTickets = metrics.reduce(
          (total, user) => total + user.data.reduce((a, b) => a + b, 0),
          0
        );

        const averageTicketsPerDay =
          metrics.length > 1
            ? totalTickets / (metrics[0].data.length * metrics.length)
            : 0;

        const mostProductiveUser = metrics.reduce(
          (max, user) => {
            const userTotal = user.data.reduce((a, b) => a + b, 0);
            return userTotal > max.total
              ? { name: user.label, total: userTotal }
              : max;
          },
          { name: "", total: 0 }
        );

        setData({
          ...data,
          lineChartData,
          barChartData,
          doughnutChartData,
          mostProductiveUser,
          averageTicketsPerDay,
          totalTickets,
        });
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const msg = state.ws.lastMessage;
    switch (msg?.type) {
      case "ticket_added":
      case "ticket_deleted":
      case "ticket_updated":
      case "user_added":
      case "user_deleted":
      case "user_updated":
        fetchData();
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.ws.lastMessage]);

  return (
    <>
      {users ? (
        <div className=" px-4 py-4 no-scrollbar overflow-scroll h-screen flex flex-col gap-3 bg-zinc-50">
          <h1 className="text-xl font-bold">Dashboard</h1>

          <div className="w-full  grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-4 grid">
            <div className="bg-blue-600 p-4 rounded-lg text-white">
              <p className="font-medium mb-2">Actualizacion</p>
              <h3 className="text-xl font-bold mb-2">
                Esta semana ha aumentado un 40% el rendimiento en los tickets
              </h3>
              <p className="text-sm">Estadisticas →</p>
            </div>
            <DashboardCard
              title="Total Bruto"
              value={data.totalTickets}
              change={33}
              isPositive={true}
            />
            <DashboardCard
              title="Total Neto"
              value={
                data.totalTickets *
                (parseInt(state.company.collaborator_percentage) * 0.01)
              }
              change={24}
              isPositive={false}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
            <div className="bg-white px-6  py-2 rounded-lg shadow-md flex flex-col items-center ">
              <h2 className="text-md font-semibold">Actividad semanal</h2>
              <div className="h-72 w-full">
                {Object.keys(data.lineChartData).length ? (
                  <Line
                    data={data.lineChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "top" as const,
                        },
                        title: {
                          display: true,
                          text: "Usuario por monto semanal",
                        },
                      },
                    }}
                  />
                ) : (
                  <span className="text-gray-500 text-sm animate-pulse">
                    Cargando...
                  </span>
                )}
              </div>
            </div>
            <div className="bg-white px-3 py-2 rounded-lg shadow-md flex flex-col items-center">
              <h2 className="text-md font-semibold">Actividad diaria</h2>
              <div className="h-72 w-full">
                {Object.keys(data.barChartData).length ? (
                  <Bar
                    data={data.barChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "top" as const,
                        },
                        title: {
                          display: true,
                          text: "Usuarios por monto diario ",
                        },
                      },
                    }}
                  />
                ) : (
                  <span className="text-gray-500 text-sm animate-pulse">
                    Cargando...
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 justify-between ">
            <div className="bg-white p-3 rounded-lg shadow-md flex flex-col items-center w-full">
              <h2 className="text-xl font-semibold mb-4 ">
                Distribucion de usuarios
              </h2>
              <div className="h-full w-full max-w-lg">
                {Object.keys(data.doughnutChartData).length && (
                  <Doughnut
                    data={data.doughnutChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,

                      plugins: {
                        legend: {
                          position: "bottom" as const,
                        },
                        title: {
                          display: true,
                          text: "Porcentaje  por usuario",
                        },
                      },
                    }}
                  />
                )}
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg shadow-md w-full">
              <h2 className="text-xl font-semibold mb-4">Metricas</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Total:</p>
                  <p className="text-2xl font-bold">
                    {data.totalTickets.toFixed(1)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Promedio por dia:</p>
                  <p className="text-2xl font-bold">
                    {data.averageTicketsPerDay.toFixed(1)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Usuario mas productivo:</p>
                  <p className="text-2xl font-bold">
                    {data.mostProductiveUser.name}
                  </p>
                  <p className="text-lg">${data.mostProductiveUser.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg shadow-md w-full">
              <h2 className="text-xl font-semibold mb-4">
                Porcentages por usuario
              </h2>
              <div className="space-y-4">
                {users.map((user) => {
                  console.log("user", user);
                  const userTotal = user.data.reduce((a, b) => a + b, 0);
                  const percentage = (userTotal / data.totalTickets) * 100;
                  return (
                    <div key={user.label}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-600">{user.label}</span>
                        <span className="font-semibold">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="h-2.5 rounded-full"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: user.backgroundColor,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
